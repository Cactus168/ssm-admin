package com.jo.interceptor;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.view.RedirectView;

import com.jo.sys.user.bean.User;

public class CoreInterceptor extends HandlerInterceptorAdapter {

	/* <p>Title: afterCompletion</p>
	 * <p>Description: </p> 
	 * @param request
	 * @param response
	 * @param handler
	 * @param ex
	 * @throws Exception 
	 * @see org.springframework.web.servlet.handler.HandlerInterceptorAdapter#afterCompletion(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, java.lang.Exception)
	 */
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		// TODO Auto-generated method stub
		super.afterCompletion(request, response, handler, ex);
	}

	/* <p>Title: afterConcurrentHandlingStarted</p>
	 * <p>Description: </p> 
	 * @param request
	 * @param response
	 * @param handler
	 * @throws Exception 
	 * @see org.springframework.web.servlet.handler.HandlerInterceptorAdapter#afterConcurrentHandlingStarted(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object)
	 */
	@Override
	public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		// TODO Auto-generated method stub
		super.afterConcurrentHandlingStarted(request, response, handler);
	}

	/* <p>Title: postHandle</p>
	 * <p>Description: </p> 
	 * @param request
	 * @param response
	 * @param handler
	 * @param modelAndView
	 * @throws Exception 
	 * @see org.springframework.web.servlet.handler.HandlerInterceptorAdapter#postHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, org.springframework.web.servlet.ModelAndView)
	 */
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		if(handler instanceof HandlerMethod) {
			HandlerMethod handle = (HandlerMethod)handler;
			System.out.println("2<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"+handle.getMethod().getName());
		}
		//modelAndView.setView(new RedirectView(request.getContextPath()+"/jsp/loginx.jsp"));
		/*if(modelAndView != null){
			System.out.println("2>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+modelAndView.getViewName());
			User user = (User) request.getSession().getAttribute("currUser");
			if(user == null){
				modelAndView.setViewName("loginx");
				new ModelAndView();
				modelAndView.addObject("sysName", "企业资源管理系统V1.0");
			}
		}*/
		super.postHandle(request, response, handler, modelAndView);
	}

	/* <p>Title: preHandle</p>
	 * <p>Description: </p> 
	 * @param request
	 * @param response
	 * @param handler
	 * @return
	 * @throws Exception 
	 * @see org.springframework.web.servlet.handler.HandlerInterceptorAdapter#preHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object)
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		if(handler instanceof HandlerMethod) {
			HandlerMethod handle = (HandlerMethod)handler;
			System.out.println("1<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"+handle.getMethod().getName());
		}else{
			return true;
		}
//		if(handle.getMethod().getName().equals("toLogin")){
//			System.out.println(request.getContextPath()+"/jsp/loginx.jsp");
//			response.sendRedirect(request.getContextPath()+"/jsp/loginx.jsp");
//			/*RequestDispatcher rd = request.getRequestDispatcher(request.getContextPath()+"/jsp/loginx.jsp");
//
//			rd.forward(request,response);*/
//			return false;
//		}
		return super.preHandle(request, response, handler);
	}

	
}
