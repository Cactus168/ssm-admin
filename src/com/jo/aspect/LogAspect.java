package com.jo.aspect;

import java.lang.reflect.Method;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.jo.annotation.SysLogAnnotation;
import com.jo.commons.CommonConstant;
import com.jo.commons.CommonDataUtils;
import com.jo.sys.log.bean.Log;
import com.jo.sys.log.service.LogService;
import com.jo.sys.user.bean.User;
/**
 * 日志aop类
 * @author huixiaoke 
 * @date 2017-4-1
 */
@Aspect
@Component
public class LogAspect {

    @Autowired
    private LogService logService;

    protected Logger logger = Logger.getLogger(this.getClass());
    
    /******开始定义切入点*********************/
    /****登录切入点******/
    @Pointcut("execution(* com.jo..controller..*Controller.loginCheck(..))")
    public void loginControllerCall() {}
    /****退出切入点******/
    @Pointcut("execution(* com.jo..controller..*Controller.logout(..))")
    public void logoutControllerCall() {}
    /****添加切入点******/
    @Pointcut("execution(* com.jo..service..*Service.add*(..))")
    public void addServiceCall() {}
    /****修改切入点******/
    @Pointcut("execution(* com.jo..service..*Service.modify*(..))")
    public void modifyServiceCall() {}
    /****删除切入点******/
    @Pointcut("execution(* com.jo..service..*Service.remove*(..))")
    public void removeServiceCall() {}
    /****未处理的异常切入点******/
    @Pointcut("execution(* com.jo..service..*.*(..))")
    public void allServiceCall() {}
    /******定义切入点结束*********************/
    
    /****在登录方法执行之后插入日志******/
    @After("loginControllerCall()")
    public void loginAfter(JoinPoint joinPoint) {
        common(joinPoint,CommonConstant.LOG_LOGIN);
    }
    /****在退出系统方法执行之前插入日志******/
    @Before("logoutControllerCall()")
    public void logoutBefore(JoinPoint joinPoint) {
        common(joinPoint,CommonConstant.LOG_LOGINOUT);
    }
    /****在添加方法执行之前插入日志******/
    @Before("addServiceCall()")
    public void addBefore(JoinPoint joinPoint) {
        common(joinPoint,CommonConstant.LOG_ADD);
    }
    /****在修改方法执行之前插入日志******/
    @Before("modifyServiceCall()")
    public void modifyBefore(JoinPoint joinPoint) {
        common(joinPoint,CommonConstant.LOG_MODEIFY);
    }
    /****在删除方法执行之前插入日志******/
    @Before("removeServiceCall()")
    public void removeBefore(JoinPoint joinPoint) {
        common(joinPoint,CommonConstant.LOG_REMOVE);
    }
   /**
    * 组装日志信息打印并入库
    * 
    */
    private void common(JoinPoint joinPoint, String logContent) {
        if(!StringUtils.equals("com.jo.sys.log.service.impl.LogServiceImpl", joinPoint.getTarget().getClass().getName())){
        	try {
        		RequestAttributes ra = RequestContextHolder.getRequestAttributes();
                ServletRequestAttributes sra = (ServletRequestAttributes) ra;
                HttpServletRequest request = sra.getRequest();
                Subject currentUser = SecurityUtils.getSubject();  
                Session session = currentUser.getSession();
                User user = (User)session.getAttribute(CommonConstant.SESSION_USER_CODE);//获取登录用户
                if(user != null) {
                	String ip = CommonDataUtils.getIpAddr(request);// 获取请求ip
                    Map<String, Object> params = parseParames(request); //解析目标方法体的参数   
                    // *========控制台输出=========*//
                    logger.info("请求方法:" + (joinPoint.getTarget().getClass().getName() + "." + joinPoint.getSignature().getName() + "()"));
                    logger.info("请求人:" + (user == null ? "" : user.getRealName()));
                    logger.info("请求IP:" + ip);
                    logger.info("请求参数:" + params);
                    logger.info("时间:" + new Date());
                    logger.info("操作名字:" + joinPoint.getTarget().getClass().getName() + "." + joinPoint.getSignature().getName() + "()");
                    // *========存到数据库=========*//
                    Log log = new Log();
                    log.setUserId(user.getUserId());
                    log.setLogIp(ip);
                    log.setMenuId(params.get("modId") == null ? 1 : Integer.parseInt(params.get("modId").toString()));
                    log.setLogContent(logContent);
                    logService.add(log);
                }
        	} catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 输出异常信息并保存到数据库
     */
    @AfterThrowing(pointcut = "allServiceCall()", throwing = "e")
    public void doAfterThrowing(JoinPoint joinPoint, Throwable e) {
        try {
            RequestAttributes ra = RequestContextHolder.getRequestAttributes();
            ServletRequestAttributes sra = (ServletRequestAttributes) ra;
            HttpServletRequest request = sra.getRequest();
            Subject currentUser = SecurityUtils.getSubject();  
            Session session = currentUser.getSession();
            User user = (User)session.getAttribute(CommonConstant.SESSION_USER_CODE);//获取登录用户
            String ip = CommonDataUtils.getIpAddr(request);// 获取请求ip
            Map<String, Object> params = parseParames(request); //解析目标方法体的参数   
            // *========控制台输出=========*//
            logger.debug("请求人:" + (user == null ? "" : user.getRealName()));
            logger.debug("请求IP:" + ip);
            logger.debug("异常代码:" + e.getClass().getName());
            logger.debug("异常信息:" + e.getMessage());
            logger.debug("异常方法:" + (joinPoint.getTarget().getClass().getName() + "." + joinPoint.getSignature().getName() + "()"));
            logger.debug("方法描述:" + getServiceMthodDescription(joinPoint));
            logger.debug("请求人:" + user.getRealName());
            logger.debug("请求IP:" + ip);
            logger.debug("请求参数:" + params);
            /* ==========保存到数据库========= */
           /* PageData pd = new PageData();
            pd.put("ID", this.get32UUID()); //主键
            pd.put("USERID",user.getNAME());//用户名
            pd.put("LOGTIME", new Date());//操作时间
            pd.put("OPERATENAME",(joinPoint.getTarget().getClass().getName() + "."
            + joinPoint.getSignature().getName() + "()"));//方法名
            pd.put("OPERATEPARAMS",params);//参数
            pd.put("LOGREQIP",ip);//请求ID
            pd.put("ERRORCODE",e.getClass().getName());//错误码
            pd.put("ERRORMSG",getServiceMthodDescription(joinPoint));//错误信息
            syslogService.generateLog(pd);*/
        } catch (Exception ex) {
            ex.printStackTrace();
            // 记录本地异常日志
            logger.error("==异常通知异常==");
            logger.error("异常信息:{}"+ex.getMessage());
        }
        /* ==========记录本地异常日志========== */
        logger.error("异常方法:{}异常代码:{}异常信息:{}参数:{}"+joinPoint.getTarget().getClass().getName() +joinPoint.getSignature().getName() + e.getClass().getName() + e.getMessage());

    }

    /**
     * 功能: 异常信息
     * @param ex
     * @return
     */
    @SuppressWarnings("unused")
    private String getExceptionAllinformation(Throwable ex) {
        String sOut = "";
        StackTraceElement[] trace = ex.getStackTrace();
        for (StackTraceElement s : trace) {
            sOut += "\tat " + s + "\r\n";
        }
        return sOut;
    }

    /**
     * 功能: 获取描述信息
     * @param joinPoint
     * @return
     * @throws Exception
     */
    public static String getServiceMthodDescription(JoinPoint joinPoint) throws Exception {
        String methodName = joinPoint.getSignature().getName();
        Object[] arguments = joinPoint.getArgs();
        Class<?> targetClass = joinPoint.getTarget().getClass();
        Method[] methods = targetClass.getMethods();
        String description = "该方法没有设置日志注解";
        for (Method method : methods) {
            if (method.getName().equals(methodName)) {
                Class<?>[] clazzs = method.getParameterTypes();
                if (clazzs.length == arguments.length) {
                	if(method.getAnnotation(SysLogAnnotation.class) != null){
                		description = method.getAnnotation(SysLogAnnotation.class).description();
                		break;
                	}else{
                		break;
                	}
                }
            }
        }
        return description;
    }

    /**
     * 功能: 解析方法参数
     * @param parames
     * @return
     */
    private Map<String, Object> parseParames(HttpServletRequest request) {   
    	Map<String, String[]>  pms = request.getParameterMap();
		Map<String, Object> returnPms = new HashMap<String, Object>();
		String name = "", value = "";
		for(Map.Entry<String, String[]> entry : pms.entrySet()){
			name = entry.getKey();
			if(entry.getValue() != null){
				if ((entry.getValue() instanceof String[])){
					for(int i = 0; i < entry.getValue().length; i++){
				         value = entry.getValue()[i] + ",";
				    }
					value = value.substring(0, value.length() - 1);
				}
			}
			returnPms.put(name, value.trim());
		}
		return returnPms;
    }   


}
