<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="asset/bootstrap/css/bootstrap-table.css" rel="stylesheet"/>

    <script type="text/javascript" src="/js/jquery.js"></script>
    <script type="text/javascript" src="/js/tablepage.js"></script>
    <script src="asset/script.js"></script>

</head>
<body>
<table data-toggle="table"
       id="tableProduct"
       class="table"
       data-url="/ajax/dataJson.html"
       data-pagination="true"
       data-search="true"
       data-show-columns="false"
       data-resizable="false"
       data-mobile-responsive="true"
       data-check-on-init="true"
       data-filter-control="false"
       data-key-events="false"
       data-show-toggle="false"
       data-show-refresh="false"
       data-show-export="false"
       data-cache="false"
       data-sort-name="person"
       data-sort-order="asc"
       data-height="400">

    <thead>
    <tr>
        <th data-filter-control="input" data-field="picture" data-formatter="previewImage" data-sortable="true">Image
        </th>
        <th data-filter-control="input" data-field="id" data-sortable="true">ID</th>
        <th data-filter-control="input" data-field="title" data-sortable="true">Title</th>
        <th data-filter-control="input" data-field="price" data-sortable="true">Price</th>
        <!-- hide fields -->
        <th data-filter-control="input" data-field="productId" data-sortable="true">productId</th>
        <!-- hide end -->
        <th data-field="action" data-formatter="actionFormatter" data-events="actionEvents"
            data-tableexport-display="none">Aciton
        </th>
    </tr>
    </thead>
</table>
<script src="jstable/jquery-ui.js"></script>
<script src="jstable/bootstrap-table.js"></script>
<script src="jstable/bootstrap-table-mobile.js"></script>
<!--<script src="js/bootstrap-table-filter-control.js"></script>-->
<script src="jstable/bootstrap-table-key-events.js"></script>
<!--<script src="bootstrap-table-editable.js"></script>-->
<script src="jstable/bootstrap-table-export.js"></script>
<script src="jstable/bootstrap-notify.min.js"></script>
<script src="jstable/jquery.sharrre.js"></script>
<script src="jstable/app.js"></script>
<script src="jstable/tableExport.js"></script>
<script src="asset/script.js"></script>
<script src="jstable/moment.js" type="text/javascript"></script>
<script src="jstable/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="jstable/jquery.md5.js" type="text/javascript"></script>
<script src="jstable/checkValidate.js" type="text/javascript"></script>
<script src="jstable/employee.js"></script>
<script src="jstable/jquery.jstepper.min.js"></script>
<script src="jstable/jquery.form.js"></script>
<script src="jstable/jquery.maskedinput.js" type="text/javascript"></script>
</body>
</html>
