var HOST = '.';
var error = 0;
function queryParams() {
    return {
        type: 'owner',
        sort: 'updated',
        direction: 'desc',
        per_page: 100,
        page: 1
    };
}
showHideChangePasswordField();
function showHideChangePasswordField() {
    $(document).ready(function () {
        $("#change_password").change(function () {
            if (this.checked) {
                $("#div-password").show();
                $("#div-password_confirm").show();
            } else {
                $("#div-password").hide();
                $("#div-password_confirm").hide();
            }
        });
    });
}
function actionFormatter(value, banner, index) {
    var html = '<img style="display:none;" class = "action_show" src = "./asset/images/details-icon.png" id = "show_user_details" onclick = "showBanner('
            + "'" + banner.userId + "',"
            + "'" + banner.username + "',"
            + "'" + banner.email + "',"
            + "'" + banner.fullName + "',"
            + "'" + banner.address + "',"
            + "'" + banner.phone + "',"
            + "'" + banner.isActive + "',"
            + "'" + banner.role + "'"
            + ')" >'
            + '<img style="display:none;" class = "action_edit" src = "./asset/images/edit-icon.png" id = "edit_users" onclick = "editBanner('
            + "'" + banner.userId + "',"
            + "'" + banner.username + "',"
            + "'" + banner.email + "',"
            + "'" + banner.fullName + "',"
            + "'" + banner.address + "',"
            + "'" + banner.phone + "',"
            + "'" + banner.isActive + "',"
            + "'" + banner.role + "'"
            + ')" >'
            + '<img class = "action_delete" src = "./asset/images/delete-icon.png" id = "remove_user" onclick = "removeBanner('
            + "'" + banner.id + "',"
            + "'" + banner.name + "'"
            + ')" >';
    var result = [html].join('');
    return result;
}

window.actionEvents = {
    'click .like': function (e, value, row, index) {
        alert('You click like icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    },
    'click .edit': function (e, value, row, index) {
        alert('You click edit icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    },
    'click .remove': function (e, value, row, index) {
        alert('You click remove icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    }
};

$("#btnAddBanner").on("click", function () {
    $('#banner-modal-title').html('Thêm tài khoản');

    $("#frmEditBanner #div-change_password").hide();
    $("#frmEditBanner #div-password").show();
    $("#frmEditBanner #div-password_confirm").show();

    $('#frmEditBanner #actionType').val('ACCOUNT_ADD');
    $("#frmEditBanner #username").prop('disabled', false);
    $('#frmEditBanner #userId').val('');
    $('#frmEditBanner #username').val('');
    $('#frmEditBanner #password').val('');
    $('#frmEditBanner #password_confirm').val('');
    $('#frmEditBanner #email').val('');
    $('#frmEditBanner #fullName').val('');
    $('#frmEditBanner #address').val('');
    $('#frmEditBanner #phone').val('');
    $('#frmEditBanner #isActive').prop('checked', true);
    setReadOnlyFieldsBanner(false);
    $('#editBannerModal').modal({show: true});
});

$("#btnDeleteBannerModelYes").on("click", function () {
    var modal = $('#deleteBannerModel');
    var userId = modal.find('.modal-body #id').val();
    //var username = modal.find('.modal-body #username').val();
    var dataString = 'id=' + userId;
    $.ajax({
        type: "POST",
        url: "./rest/deleteBanner/",
        data: dataString,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            //$("#submit").val('Connecting...');
        },
        success: function (data) {
            if (data.error_code == 0) {
                notify('success', '<strong>Success</strong> ' + data.error_message);
                var $table = $('#tableBanners');
                $table.bootstrapTable('refresh');
            } else {
                notify('danger', '<strong>Error</strong> ' + data.error_message + ' !!!');
            }

        }
    });
});
function editBanner(userId, username, email, fullName, address, phone, isActive, role) {
    console.log('editBanner is called with userId=' + userId + ';username=' + username);
    if (userId == null || userId == "") {
        return;
    }
    //var modal = $('#editBannerModal');
    $('#banner-modal-title').html('Sửa tài khoản');

    $('#frmEditBanner #actionType').val('ACCOUNT_UPDATE');
    $("#frmEditBanner #div-change_password").show();
    $("#frmEditBanner #div-password").hide();
    $("#frmEditBanner #div-password_confirm").hide();

    $('#frmEditBanner #userId').val(userId);
    $('#frmEditBanner #username').val(username);

    $('#frmEditBanner #email').val(email);
    $('#frmEditBanner #fullName').val(fullName);
    $('#frmEditBanner #address').val(address);
    $('#frmEditBanner #phone').val(phone);
    $('#frmEditBanner #role_selectbox').val(role);
    if (isActive == 1) {
        isActive = true;
    } else {
        isActive = false;
    }
    $('#frmEditBanner #isActive').prop('checked', isActive);
    setReadOnlyFieldsBanner(false);
    $("#frmEditBanner #username").prop('disabled', true);
    $('#editBannerModal').modal({show: true});
}
function setReadOnlyFieldsBanner(isEnable) {
    $("#frmEditBanner #username").prop('disabled', isEnable);
    $('#frmEditBanner #email').prop('readonly', isEnable);
    $('#frmEditBanner #fullName').prop('readonly', isEnable);
    $('#frmEditBanner #address').prop('readonly', isEnable);
    $('#frmEditBanner #phone').prop('readonly', isEnable);
    $('#frmEditBanner #role_selectbox').prop('disabled', isEnable);
    $('#frmEditBanner #change_password').prop('disabled', isEnable);
    $('#frmEditBanner #isActive').prop('disabled', isEnable);

    if (isEnable) {
        $('#btnEditBannerModelYes').hide();
    } else {
        $('#btnEditBannerModelYes').show();
    }
}
function showBanner(userId, username, email, fullName, address, phone, isActive, role) {
    console.log('showBanner is called with userId=' + userId + ';username=' + username);
    if (userId == null || userId == "") {
        return;
    }
    //var modal = $('#editBannerModal');
    $('#banner-modal-title').html('Sửa tài khoản');

    $('#frmEditBanner #actionType').val('ACCOUNT_UPDATE');
    $("#frmEditBanner #div-change_password").show();
    $("#frmEditBanner #div-password").hide();
    $("#frmEditBanner #div-password_confirm").hide();

    $('#frmEditBanner #userId').val(userId);
    $('#frmEditBanner #username').val(username);
    $("#frmEditBanner #username").prop('disabled', true);
    $('#frmEditBanner #email').val(email);
    $('#frmEditBanner #fullName').val(fullName);
    $('#frmEditBanner #address').val(address);
    $('#frmEditBanner #phone').val(phone);
    $('#frmEditBanner #role_selectbox').val(role);
    if (isActive == 1) {
        isActive = true;
    } else {
        isActive = false;
    }
    $('#frmEditBanner #isActive').prop('checked', isActive);

    setReadOnlyFieldsBanner(true);
    $('#editBannerModal').modal({show: true});

}
function previewImage(value, banner, index) {
    var html = '<img style="width:100px; height:60px;" src = "./rest/' + "" + banner.path + "" + '" id = "showBanner" onclick = "showBanner('
            + "'" + banner.id + "',"
            + "'" + banner.name + "'"
            + "'" + banner.path + "'"
            + ')" >';
    return html;
}
function showBanner(id, name) {

}
function removeBanner(id, name) {
    console.log('removeBanner is called with id=' + id + ';image=' + name);
    if (id == null || id == "") {
        return;
    }
    var modal = $('#deleteBannerModel');
    modal.find('.modal-body p').html('Bạn thực sự muốn xóa file: <b>' + name + '</b>');
    modal.find('.modal-body #id').val(id);
    modal.find('.modal-body #name').val(name);
    modal.modal('show');

}
function detailFormatter(index, row) {
    var html = [];
    $.each(row, function (key, value) {
        html.push('<p><b>' + key + ':</b> ' + value + '</p>');
    });
    return html.join('');
}
function stateFormatter(value, banner, index) {
    if (value == 1) {
        return '<a href="#" ><img src="./asset/images/icon-yes.gif" onclick = "setActiveBanner('
                + "'" + banner.id + "',"
                + "'0'"
                + ')" >  </a>';
    } else {
        return '<a href="#" > <img src="./asset/images/icon-no.gif" onclick = "setActiveBanner('
                + "'" + banner.id + "',"
                + "'1'"
                + ')" > </a>';
    }
}
function setActiveBanner(id, isActive) {
    var dataString = 'id=' + id + '&isActive=' + isActive;
    $.ajax({
        type: "POST",
        url: "./rest/setActiveBanner/",
        data: dataString,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            //$("#submit").val('Connecting...');
        },
        success: function (data) {
            if (data.error_code == 0) {
                notify('success', '<strong>Success</strong> ' + data.error_message);
                var $table = $('#tableBanners');
                $table.bootstrapTable('refresh');
            } else {
                notify('danger', '<strong>Error</strong> ' + data.error_message + ' !!!');
            }

        }
    });
}
function roleFormatter(value, row, index) {
    if (value == 1) {
        return 'Administrator';
    } else {
        return 'User';
    }
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
$(function () {
    try {
        var $table = $('#tableBanners');
        $table.bootstrapTable('hideColumn', 'id');
    } catch (e) {
        console.log(e);
    }
});
$(document).ready(function () {
    $('#btnUploadImage').on('click', function () {
        if (error == 1) {
            return;
        }
        $('#multiple_upload_form').ajaxForm({
            //target:'#images_preview',
            dataType: 'json',
            beforeSubmit: function (e) {
                $('#btnUploadImage').prop('disabled', true);
                $('.uploading').show();
            },
            success: function (data) {
                if (data.error_code == 0) {
                    notify('success', '<strong>Success</strong> ' + data.error_message);
                } else {
                    notify('danger', '<strong>Error</strong> ' + data.error_message);
                }
                $('#btnUploadImage').prop('disabled', false);
                $('.uploading').hide();
                var $table = $('#tableBanners');
                $table.bootstrapTable('refresh');
            },
            error: function (e) {
                $('#btnUploadImage').prop('disabled', false);
                notify('danger', '<strong>Error</strong> Thêm banner thất bại');
                $('.uploading').hide();
            }
        }).submit();
    });
});


$(function () {

// Add events
    $('input[type=file]').on('change', fileUpload);
    // File uploader function

    function fileUpload(event) {
        error = 0;
        files = event.target.files;
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            console.log(file.size);
            if (!file.type.match('image.*')) {
                notify('danger', '<strong>Error</strong> Định dạng file không hợp lệ. Vui lòng chọn file ảnh( .png, .jpg, .gif ) làm banner !!!');
                error = 1;
                return;
            } else if (file.size > 1048576) {
                //notify('danger', '<strong>Error</strong> Dung lượng file quá lớn !!!');
                //error = 1;
            } else {

            }
        }
    }
});