<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Data table</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="/cssdatatable/jquery.dataTables.min.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="/js/jquery.js"></script>
    <script type="text/javascript" src="/jsdatatable/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="/js/datapage.js"></script>
</head>
<body>
    <table  id="tblData" class="display" cellspacing="0" width="100%">
        <thead>
        <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Hình ảnh</th>
        </tr>
        </thead>
        <tfoot>
        <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Hình ảnh</th>
        </tr>
        </tfoot>
    </table>
</body>
</html>
