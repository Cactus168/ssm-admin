package com.jo.shiro.filters;
import java.io.IOException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;

import com.jo.shiro.helper.ShiroSecurityHelper;

public class MyFormAuthenticationFilter extends FormAuthenticationFilter{

	/* <p>Title: redirectToLogin</p>
	 * <p>Description: </p> 
	 * @param request
	 * @param response
	 * @throws IOException 
	 * @see org.apache.shiro.web.filter.AccessControlFilter#redirectToLogin(javax.servlet.ServletRequest, javax.servlet.ServletResponse)
	 */
	@Override
	protected void redirectToLogin(ServletRequest request,ServletResponse response) throws IOException {
		String loginUrl = getLoginUrl();
		Session currSession = ShiroSecurityHelper.getSession();
		Session userSession = ShiroSecurityHelper.getSessionByUsername(request.getParameter("currUserName"));
		if(userSession != null){
			if(!StringUtils.equals(currSession.getId().toString(),userSession.getId().toString())){
				loginUrl = "commons/sessionFail";
			}
		}
		WebUtils.issueRedirect(request, response, loginUrl);
	}

}
