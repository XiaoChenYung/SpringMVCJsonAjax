function queryParams() {
    return {
        type: 'owner',
        sort: 'updated',
        direction: 'desc',
        per_page: 100,
        page: 1
    };
}

$(document).ready(function () {
    try {
        var $table = $('#tblData');
        $table.bootstrapTable('hideColumn', 'productId');
        setTimeout(function () {
            $table.bootstrapTable('resetView');
        }, 1000);
    } catch (e) {
        console.log(e);
    }
    $(window).resize(function () {
        try {
            $table.bootstrapTable('resetView');
        } catch (e) {
            console.log(e);
        }
    });
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