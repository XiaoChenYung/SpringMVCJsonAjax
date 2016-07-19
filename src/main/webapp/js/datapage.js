$(document).ready(function () {
    $.ajax({
        type: 'GET',
        headers: {
            Accept: 'application/json; charset=utf-8',
            "Content-Type": "application/json; charset=utf-8"
        },
        url: '/ajax/dataJson.html',
        success: function (data) {
            loadData(data);
        }, error: function (e) {
            alert('Error: ' + e);
        }
    });
});

function loadData(data) {
    $('#tblData').DataTable( {
        data: data,
        columns: [
            {  "data": "id" },
            {  "data": "title" },
            {  "data": "price" },
            {  "data": "image" }
        ]
    } );
}