package com.jo.shiro;

import javax.security.auth.login.AccountException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import com.jo.sys.user.bean.User;
/**
 * shiro权限认证
 * @author huixiaoke 
 * @date 2016-4-14
 *   
 */
public class ShiroRealm extends AuthorizingRealm {	
	
    public final static String REALM_NAME = "ShiroRealm";  
      
    public ShiroRealm() {  
        setName(REALM_NAME);
    }  
      
    /** 
     * 认证 
     */  
    @Override  
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {  
    	AuthenticationInfo authenticationInfo = null;
		//UsernamePasswordToken对象用来存放提交的登录信息  
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        String userName = token.getUsername();
        String passWord = new String(token.getPassword());
        System.out.println("开始认证 "+ userName); 
        try{
	        if(null != userName && null != passWord){
	        	//若存在，将此用户存放到登录认证info中  
				authenticationInfo = new SimpleAuthenticationInfo(userName, passWord, getName()); 
	        }else{
	        	 throw new AccountException("can not handle this login");  
	        }
	    } catch (Exception e) {  
	        throw translateAuthenticationException(e);  
	    }  
		return authenticationInfo;
    }  
      
    /** 
     * 授权 
     */  
    @Override  
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {  
        String username = (String)getAvailablePrincipal(principals);  
        System.out.println("开始授权 "+ username);  
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();  
       /* Set<String> rolesAsString = user.getRolesAsString();  
        info.addRoles(rolesAsString);   
        nfo.addStringPermissions(user.getAuthAsString());  */
        return info;  
    }  
  
    /** 
     * 异常转换 
     * @param e 
     * @return 
     */  
    private AuthenticationException translateAuthenticationException(Exception e) {  
        if (e instanceof AuthenticationException) {  
            return (AuthenticationException) e;  
        }  
        if(e instanceof DisabledAccountException){  
            return (DisabledAccountException)e;  
        }  
        if(e instanceof UnknownAccountException){  
            return (UnknownAccountException)e;  
        }  
        return new AuthenticationException(e);  
    }  
    /**
	 * 检查用户
	 * @param user
	 * @param username
	 */
	private void checkUser(User user,String username){
		/*if(null == user){
			throw new UnknownAccountException(username + " can not find "+username+" from system");
		}
		if(user.isLocked()){
			throw new LockAccountException("the account is locked now");
		}*/
	}
}
