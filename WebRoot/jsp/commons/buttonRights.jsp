<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<a id="search" class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="${param.actionName}.search()">查询</a>
<c:forEach items="${buttons }" var="button">
	<c:if test="${button.buttonType != 'splitbutton' &&  button.parentId == 0}">
		<a id="${button.buttonNo}" class="easyui-${button.buttonType}" iconCls="${button.buttonIcon}" plain="true" onclick="${param.actionName}.${button.buttonEvent}">${button.buttonName}</a>
	</c:if>
	<c:if test="${button.buttonType == 'splitbutton' }">
	<a id="${button.buttonNo}" class="easyui-${button.buttonType}" iconCls="${button.buttonIcon}" menu="#mm${button.buttonNo}" plain="true" onclick="${param.actionName}.${button.buttonEvent}">${button.buttonName}</a>
		<div id="mm${button.buttonNo}" style="width:100px;">
			<c:forEach items="${buttons }" var="buttonx">
				<c:if test="${button.buttonId == buttonx.parentId }">
			    	<a id="${buttonx.buttonNo}" class="easyui-${buttonx.buttonType}" iconCls="${buttonx.buttonIcon}" plain="true" onclick="${param.actionName}.${buttonx.buttonEvent}">${buttonx.buttonName}</a>
		    	</c:if>
		    </c:forEach>
		</div>
	</c:if>
</c:forEach>