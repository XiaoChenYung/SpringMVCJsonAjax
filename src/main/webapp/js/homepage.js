$(document).ready(function () {

    $('#formS').validate({
        rules: {
            'keySearch': {
                required: true
            }
        }
    });
    $('#btnSubmit').click(function () {
        $.ajax({
            type: 'GET',
            url: '/ajax/resultajax.html',
            success: function (data) {
                $('#relsult').html(data);
            }
        });
    });

    // click button result sum
    $('#btnSum').click(function () {
        var a = $('#a').val();
        var b = $('#b').val();
        $.ajax({
            type: 'GET',
            data: {
                a: a,
                b: b
            },
            url: '/ajax/sumajax.html',
            success: function (data) {
                $('#relsultSum').html(data);
            }
        });
    });

    //  click button result json
    $('#btnJson').click(function () {
        $.ajax({
            type: 'GET',
            headers: {
                Accept: 'application/json; charset=utf-8',
                "Content-Type": "application/json; charset=utf-8"
            },
            url: '/ajax/jsonObject.html',
            success: function (data) {
                var result = '';
                for (var i = 0; i < data.length; i++) {
                    result += '<br/>' + data[i].id + "-" + data[i].title + "-" + data[i].price + "-" + data[i].image;
                }
                $('#relsultJson').html(result);

            }, error: function (e) {
                alert('Error: ' + e);
            }
        });
    });
});