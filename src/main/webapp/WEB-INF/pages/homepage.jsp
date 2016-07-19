<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<html>
<head>
    <title>Home page</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="/css/content.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="/js/jquery.js"></script>
    <script type="text/javascript" src="/js/jquery.validate.js"></script>
    <script type="text/javascript" src="/js/homepage.js"></script>
</head>
<body>
<br>


<form>
    <input type="button" value="Hello" id="btnSubmit"><br/>
    <div id="relsult"></div>
    A: <input type="text" id="a"><br/>
    B: <input type="text" id="b"><br/>
    <input type="button" value="Sum" id="btnSum"><br/>
    <div id="relsultSum"></div>
    <input type="button" value="JsonObject" id="btnJson"><br/>
    <div id="relsultJson"></div>
    <img src="/img/bv.jpg" class="img-rounded" alt="Cinque Terre" width="304" height="236">
    <img src="/img/bv.jpg" class="img-circle" alt="Cinque Terre" width="304" height="236">
    <img src="/img/bv.jpg" class="img-thumbnail" alt="Cinque Terre" width="304" height="236">
</form>
<div class="container">
    <div class="row">

        <div class="col-md-12">
            <div class="alert alert-info-alt alert-dismissable" style = "width: 100%;">

                <div class="row bs-wizard" style="border-bottom:0;">
                    <div class="col-xs-3 bs-wizard-step complete">
                        <div class="text-center bs-wizard-stepnum" style="color:white;">Step 1</div>
                        <div class="progress">
                            <div class="progress-bar"></div>
                        </div>
                        <a href="#" class="bs-wizard-dot"></a>
                        <div class="bs-wizard-info text-center" style="color:white;">Đặt hàng</div>
                    </div>

                    <div class="col-xs-3 bs-wizard-step complete"><!-- complete -->
                        <div class="text-center bs-wizard-stepnum" style="color:white;">Step 2</div>
                        <div class="progress">
                            <div class="progress-bar"></div>
                        </div>
                        <a href="#" class="bs-wizard-dot"></a>
                        <div class="bs-wizard-info text-center" style="color:white;">Đóng gói</div>
                    </div>

                    <div class="col-xs-3 bs-wizard-step active"><!-- complete -->
                        <div class="text-center bs-wizard-stepnum" style="color:white;">Step 3</div>
                        <div class="progress">
                            <div class="progress-bar"></div>
                        </div>
                        <a href="#" class="bs-wizard-dot"></a>
                        <div class="bs-wizard-info text-center" style="color:white;">Giao hàng</div>
                    </div>

                    <div class="col-xs-3 bs-wizard-step disabled"><!-- active -->
                        <div class="text-center bs-wizard-stepnum" style="color:white;">Step 4</div>
                        <div class="progress">
                            <div class="progress-bar"></div>
                        </div>
                        <a href="#" class="bs-wizard-dot"></a>
                        <div class="bs-wizard-info text-center" style="color:white;">Nhận hàng</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
