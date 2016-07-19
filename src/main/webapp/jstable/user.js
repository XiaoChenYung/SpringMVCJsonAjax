$(document).ready(function () {
    $('#btnLogin').click(function () {
        login();
    });
});
// Hàm tính kết quả
function login()
{
    $(document).ready(function () {
        var username = $('#username').val();
        console.log('login');
        if ((username == null) || (username == '')) {
            //$('#error_message').text('Bạn chưa nhập tên tài khoản!');
            //return;
            notify('danger', '<strong>Missing</strong> Username is missing !!!');
            $("#username").focus();
            return;
        }
        var password = $('#password').val();
        if ((password == null) || (password == '')) {
            //$('#error_message').text('Bạn chưa nhập mật khẩu!');
            //return;
            notify('danger', '<strong>Missing</strong> Password is missing !!!');
            $("#password").focus();
            return;
        }
        var dataString = 'username=' + username + '&password=' + password;
        $.ajax({
            url: '/api/login/',
            type: 'POST',
            cache: false,
            data: dataString,
            dataType: 'json',
            success: function (data) {
                if ((data != null) && (data.error_code == 0)) {
                    window.location.href = "/";
                } else if ((data != null) && (data.error_code == -2)) {
                    notify('danger', '<strong>Error</strong> You don\'t have permission to access on this server !!!');
                }
                else {
                    notify('danger', '<strong>Error</strong> ' + data.error_message);
                }
                console.log(data);

            },
            error: function () {

            }
        });
    });
}
function notify(type, message) {
    $.notify({
// options
        message: message
    }, {
// settings
        type: type,
        delay: 1000,
        timer: 1000,
        z_index: 9999
    });
}