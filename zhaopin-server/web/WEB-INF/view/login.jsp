<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
	<head>
		<title>test</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- 	<meta name="viewport" content="width=device-width, initial-scale=1.0" />-->
		<link href="${ctx }/resources/css/normalize.css" rel="stylesheet">
		<link href="${ctx }/resources/css/style.css" rel="stylesheet">
		<link rel="shortcut icon" type="image/x-icon" href="${ctx }/resources/favicon.ico" />
		
	</head>
	<!--
	<!-[if lte IE 9]>
	<script>window.location.href='https://www.baidu.com/';</script>
	<![endif]–>
	-->
	<!--
	<script>
	if ((!to3d()) || document.documentMode == 10 || document.documentMode == 11){ 		
		window.location.href='http://www.baidu.com/';
	}
	</script>
	-->
	<body>
		<div id="container">			
			<div id="login">
				<div class="title">
					<p class="title1">LOGIN</p>
					<p class="title2">REGISTER</p>
					<span id="flag" class="flag1"></span>
				</div>
				<span class="head">Login to your Account</span>
				<div class="user">
					<font class="iconfont">&#xe616;</font>
					<input type="text" class="username" maxlength="16" placeholder="Username" />
					<font class="iconfont" id="judge_true">&#xe6b0;</font>
					<font class="iconfont" id="judge_false">&#xf00b3;</font>
				</div>
				<div class="pass">
					<font class="iconfont">&#xe736;</font>
					<input type="password" class="password" maxlength="16" placeholder="Password" />
					<font class="iconfont" id="judge_true">&#xe6b0;</font>
					<font class="iconfont" id="judge_false">&#xf00b3;</font>
				</div>
				<div class="remember">
					<span class="choose"></span>
					<span class="txt">Remember the Password</span>
				</div>
				<input type="button" class="btn" value="LOGIN"  /> 
				<div class="forget_password">
					<font class="iconfont" style="cursor: pointer;font-size: 19px;">&#xe61f;</font>
					<span class="txt2">Forget the Password</span>
				</div>
			</div>
			<div id="register">
				<div class="title">
					<p class="title1">LOGIN</p>
					<p class="title2">REGISTER</p>
					<span id="flag" class="flag2"></span>
				</div>
				<span class="head"> Register for an Account</span>
				<div class="user">
					<font class="iconfont">&#xe616;</font>
					<input type="text" class="username" id="user" maxlength="16" placeholder="Username" />
					<font class="iconfont" id="judge_true">&#xe6b0;</font>
					<font class="iconfont" id="judge_false">&#xf00b3;</font>
				</div>
				<div class="pass">
					<font class="iconfont">&#xe736;</font>
					<input type="password" class="password" id="password1" maxlength="16" placeholder="Password" />
					<font class="iconfont" id="judge_true">&#xe6b0;</font>
					<font class="iconfont" id="judge_false">&#xf00b3;</font>
				</div>
				<div class="pass">
					<font class="iconfont">&#xe736;</font>
					<input type="password" class="password" id="password2" maxlength="16" placeholder="Password" />
					<font class="iconfont" id="judge_true">&#xe6b0;</font>
					<font class="iconfont" id="judge_false">&#xf00b3;</font>
				</div>
				<input type="button" class="btn" value="REGISTER"  /> 
			</div>
			<div id="success">
				<span class="text1">Authentication</span>
				<span class="text2">Success</span>
				<span class="text3">Welcome back</span>
			</div>
			<div id="register_success">
				<span class="text1">Business operations</span>
				<span class="text2">Success</span>
				<span class="text3">Welcome</span>
			</div>
		</div>
		<div class="box">
			<span class="loading1"></span>
			<span class="loading2"></span>
			<img src='${ctx }/resources/img/puff.svg' class="loading">
		</div>
		<div class="copyright">
			<p class="desc">© 2016 SG All Rights Reserved</p>
		</div>
	</body>
	<script src="${ctx }/resources/js/jquery-1.12.1.min.js"></script>
	<script src="${ctx }/resources/js/change.js"></script>
</html>
