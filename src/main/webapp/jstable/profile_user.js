var HOST = '.';
var mobileUnum = '';
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
function actionFormatter(value, row, index) {
    var html = '<img class = "action_show" src = "./asset/images/details-icon.png" id = "show_user_details" onclick = "showFormModal('
            + "'" + row.oid + "',"
            + "'" + row.uid + "',"
            + "'" + row.login + "',"
            + "'" + row.password + "',"
            + "'" + row.organisation + "',"
            + "'" + row.name + "',"
            + "'" + row.mobile + "',"
            + "'" + row.email + "',"
            + "'" + row.address + "',"
            + "'" + row.remark + "',"
            + "'" + row.motto + "',"
            + "'" + row.founder + "',"
            + "'" + row.timezone + "',"
            + "'" + row.logoimg + "',"
            + "'" + row.valid + "',"
            + "'" + row.dor + "',"
            + "'" + row.isDirty + "'"
            + ')" >'
            + '<img class = "action_edit" src = "./asset/images/edit-icon.png" id = "edit_users" onclick = "editFormModal('
            + "'" + row.oid + "',"
            + "'" + row.uid + "',"
            + "'" + row.login + "',"
            + "'" + row.password + "',"
            + "'" + row.organisation + "',"
            + "'" + row.name + "',"
            + "'" + row.mobile + "',"
            + "'" + row.email + "',"
            + "'" + row.address + "',"
            + "'" + row.remark + "',"
            + "'" + row.motto + "',"
            + "'" + row.founder + "',"
            + "'" + row.timezone + "',"
            + "'" + row.logoimg + "',"
            + "'" + row.valid + "',"
            + "'" + row.dor + "',"
            + "'" + row.isDirty + "'"
            + ')" >';
    if (row.isDirty == 0) {
        html = html + '<img class = "action_delete" src = "./asset/images/delete-icon.png" id = "remove_user" onclick = "updateStatusCustomer('
                + "'" + row.oid + "',"
                + "'" + 1 + "'"
                + ')" >';
    } else {
        html = html + '<img class = "action_delete" src = "./asset/images/restore-icon.png" id = "restore_user" onclick = "updateStatusCustomer('
                + "'" + row.oid + "',"
                + "'" + 0 + "'"
                + ')" >';
    }
    ;
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
function previewImage(value, banner, index) {
    var html = '<img style="width:60px; height:60px;" src = "uploads/noavatar.gif" />';
    if (value != null && value != '') {
        html = '<img style="width:60px; height:60px;" src = "uploads/' + value + '"  />';
    }
    return html;
}

function editFormModal(
        oid
        , uid
        , login
        , password
        , organisation
        , name
        , mobile
        , email
        , address
        , remark
        , motto
        , founder
        , timezone
        , logoimg
        , valid
        , dor
        , isDirty
        ) {
    mobileUnum = mobile;
    showFormModal(
            oid
            , uid
            , login
            , password
            , organisation
            , name
            , mobile
            , email
            , address
            , remark
            , motto
            , founder
            , timezone
            , logoimg
            , valid
            , dor
            , isDirty
            );
    var images = $("#images");
    images.replaceWith(images = images.clone(true));
    $('#account-modal-title').html('Edit Organisation');
    $('#uploading').hide();
    $('#frmModal #actionType').val('ACCOUNT_UPDATE');
    $('#frmModal #oid').val(oid);
    $('#frmModal #uid').val(uid);
    $('#frmModal #login').val(login);
    $('#frmModal #password').val(password);
    $('#frmModal #organisation').val(organisation);
    $('#frmModal #name').val(name);
    $('#frmModal #mobile').val(mobile);
    $('#frmModal #email').val(email);
    $('#frmModal #timezone').val(timezone);
    $('#frmModal #logoimg').val(logoimg);
    $('#frmModal #valid').val(valid);
    if (logoimg != '') {
        $('#frmModal #prviewLogoDiv').show();
        $('#frmModal #prviewLogo').attr('src', 'uploads/' + logoimg);
    } else {
        $('#frmModal #prviewLogo').attr('src', '');
        $('#frmModal #prviewLogoDiv').hide();
    }
    $('#frmModal #motto').val(motto);
    $('#frmModal #remark').val(remark);
    $('#frmModal #founder').val(founder);
    $('#frmModal #address').val(address);
    setReadOnlyFieldsOnForm(false);
    $('#uploading').hide();
    checkMobile();
    $('#btnEditAccountModelYes').show();
    $('#editAccountModal').modal({show: true});
}
function setReadOnlyFieldsOnForm(isEnable) {
    $('#frmModal #login').prop('disabled', isEnable);
    $('#frmModal #password').prop('disabled', isEnable);
    $('#frmModal #organisation').prop('disabled', isEnable);
    $('#frmModal #oid').prop('disabled', isEnable);
    $('#frmModal #uid').prop('disabled', isEnable);
    $('#frmModal #name').prop('disabled', isEnable);
    $('#frmModal #mobile').prop('disabled', isEnable);
    $('#frmModal #email').prop('disabled', isEnable);
    $('#frmModal #timezone').attr("disabled", isEnable);
    $('#frmModal #logoimg').prop('disabled', isEnable);
    $('#frmModal #images').prop('disabled', isEnable);
    $('#frmModal #valid').prop('disabled', isEnable);
    $('#frmModal #motto').prop('disabled', isEnable);
    $('#frmModal #remark').prop('disabled', isEnable);
    $('#frmModal #founder').prop('disabled', isEnable);
    $('#frmModal #address').prop('disabled', isEnable);
}
function showFormModal(
        oid
        , uid
        , login
        , password
        , organisation
        , name
        , mobile
        , email
        , address
        , remark
        , motto
        , founder
        , timezone
        , logoimg
        , valid
        , dor
        , isDirty
        ) {
    mobileUnum = mobile;
    $("#mobile").mask("(+99) 9999999999");
    console.log('showAccount is called with cid=' + cid);
    if (oid == null || oid == "") {
        return;
    }
    //var modal = $('#editAccountModal');
    $('#account-modal-title').html('View customer');

    $('#frmModal #actionType').val('ACCOUNT_NONE');

    $('#frmModal #login').val(login);
    $('#frmModal #password').val(password);
    $('#frmModal #organisation').val(organisation);
    $('#frmModal #oid').val(oid);
    $('#frmModal #uid').val(uid);
    $('#frmModal #name').val(name);
    $('#frmModal #mobile').val(mobile);
    $('#frmModal #email').val(email);
    $('#frmModal #timezone').val(timezone);
    $('#frmModal #logoimg').val(logoimg);
    $('#frmModal #valid').val(valid);
    if (logoimg != '') {
        $('#frmModal #prviewLogo').attr('src', 'uploads/' + logoimg);
    } else {
        $('#frmModal #prviewLogo').attr('src', '');
    }

    $('#frmModal #motto').val(motto);
    $('#frmModal #remark').val(remark);
    $('#frmModal #founder').val(founder);
    $('#frmModal #address').val(address);

    setReadOnlyFieldsOnForm(true);
    $('#btnEditAccountModelYes').hide();
    $('#uploading').hide();
    checkMobile();
    $('#editAccountModal').modal({show: true});

}
function updateStatusCustomer(oid, isDirty) {
    console.log('removeCustomer is called with cid=' + oid);
    if (oid == null || oid == "") {
        return;
    }
    var dataString = 'oid=' + oid + '&isDirty= ' + isDirty;
    $.ajax({
        type: "POST",
        url: "./api/organisation/delete/",
        data: dataString,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            //$("#submit").val('Connecting...');
        },
        success: function (data) {
            if (data.error_code == 0) {
                notify('success', '<strong>Success</strong> ' + data.error_message);
                var $table = $('#tableCustomers');
                $table.bootstrapTable('refresh');
            } else {
                notify('danger', '<strong>Error</strong> ' + data.error_message + ' !!!');
            }

        }
    });

}
function detailFormatter(index, row) {
    var html = [];
    $.each(row, function (key, value) {
        html.push('<p><b>' + key + ':</b> ' + value + '</p>');
    });
    return html.join('');
}
function stateFormatter(value, row, index) {
    if (value == 1) {
        return '<img src="./asset/images/icon-yes.gif">';
    } else {
        return '<img src="./asset/images/icon-no.gif">';
    }
}
function roleFormatter(value, row, index) {
    if (value == 1) {
        return 'Administrator';
    } else {
        return 'User';
    }
}

checkFormEditAccount = function ()
{
    $(document).ready(function () {
        if (!checkValidateOrg()) {
            return;
        }
        var url_submit = '';
        url_submit = './api/organisation/update/';
        var pass = $("#pass").val();
        if ($('#frmModal #images').get(0).files.length === 0) {
            //notify('danger', '<strong>Missing</strong> Logo is empty !!!');
            //return;
        } else {

            $('#frmModal').ajaxForm({
                //target:'#images_preview',
                dataType: 'json',
                beforeSubmit: function (e) {
                    $('#uploading').show();
                },
                success: function (data) {
                    $('#uploading').hide();
                    if (data.error_code == 0) {
                        if (data.imglogo != null) {
                            $('#logoimg').val(data.imglogo);
                        } else {
                            $('#logoimg').val('');
                        }
                        var dataString = $("#frmModal").serialize();
                        dataString = dataString + '&mobileUnum=' + mobileUnum + "&pass=" + pass;

                        $("#btnUpdateProfile").prop('disabled', true);
                        $.ajax({
                            type: "POST",
                            url: url_submit,
                            data: dataString,
                            cache: false,
                            dataType: "json",
                            beforeSend: function () {
                                //$("#btnUpdateProfile").val('Đang lưu...');
                            },
                            success: function (data) {
                                if (data.error_code == 0) {
                                    notify('success', '<strong>Success</strong> ' + data.error_message + ' !!!');
                                    //$('#editAccountModal').modal({show: false});
                                    $("#btnUpdateProfile").prop('disabled', false);
                                    $('#editAccountModal').modal('hide');
                                    var $table = $('#tableCustomers');
                                    $table.bootstrapTable('refresh');
                                    getProfile();
                                } else {
                                    notify('danger', '<strong>Error</strong> ' + data.error_message + ' !!!');
                                }
                            }
                        });
                    } else {
                        notify('danger', '<strong>Error</strong> ' + data.error_message);
                    }
                },
                error: function (e) {
                    notify('danger', '<strong>Error</strong> Banner uploaded failed');
                    $('#uploading').hide();

                }
            }).submit();
            return;
        }

        var dataString = $("#frmModal").serialize();
        dataString = dataString + '&mobileUnum=' + mobileUnum + "&pass=" + pass;
        $("#btnUpdateProfile").prop('disabled', true);
        $.ajax({
            type: "POST",
            url: url_submit,
            data: dataString,
            cache: false,
            dataType: "json",
            beforeSend: function () {
                //$("#btnUpdateProfile").val('Đang lưu...');
            },
            success: function (data) {
                if (data.error_code == 0) {
                    notify('success', '<strong>Success</strong> ' + data.error_message + ' !!!');
                    //$('#editAccountModal').modal({show: false});
                    $("#btnUpdateProfile").prop('disabled', false);
                    $('#editAccountModal').modal('hide');
                    var $table = $('#tableCustomers');
                    $table.bootstrapTable('refresh');
                    getProfile();
                } else {
                    notify('danger', '<strong>Error</strong> ' + data.error_message + ' !!!');
                }
            }
        });
    });
};
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
        var $table = $('#tableCustomers');
        $table.bootstrapTable('hideColumn', 'oid');
        $table.bootstrapTable('hideColumn', 'uid');
        $table.bootstrapTable('hideColumn', 'password');
        $table.bootstrapTable('hideColumn', 'address');
        $table.bootstrapTable('hideColumn', 'motto');
        $table.bootstrapTable('hideColumn', 'remark');
        $table.bootstrapTable('hideColumn', 'founder');
        $table.bootstrapTable('hideColumn', 'dor');
        $table.bootstrapTable('hideColumn', 'isDirty');
        $table.bootstrapTable('hideColumn', 'timezone');
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
});


function clickExport() {
    var type = $('#type').val();
    var startDate = $.trim($('#startDate').val());
    var endDate = $.trim($('#endDate').val());
    var bankName_selectbox = $('#bankName_selectbox').val();
    var mode_selectbox = $('#mode_selectbox').val();

    window.location.href = "./api2/export/customer_export/?type=" + type;

}
$(document).ready(function () {
    getProfile();
    $("#btnLogout").on("click", function () {
        window.location.href = "api/logout";
    });
    checkMobile();
});

function getProfile() {
    var userId = $("#userId").val();
    //var dataString = $user_id;
    $.ajax({
        type: "GET",
        url: "./api/profile_user/getProfile/1?userId=" + userId,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            //$("#submit").val('Connecting...');
        },
        success: function (data) {
            if (data.error_code == 0) {
                var user = data.user;
                $("#oid").val(user.oid);
                $("#uid").val(user.uid);
                $("#login").val(user.login);
                $("#password").val('');
                $("#pass").val(user.password);
                $("#organisation").val(user.organisation);
                $("#name").val(user.name);
                $("#mobile").val(user.mobile);
                mobileUnum = user.mobile;
                $("#email").val(user.email);
                $("#address").val(user.address);
                $("#remark").val(user.remark);
                $("#motto").val(user.motto);
                $("#founder").val(user.founder);
                $("#timezone").val(user.timezone);
                $("#logoimg").val(user.logoimg);
                $("#valid").val(user.valid);
                $("#loginDiv").text(user.login);
                if (user.type != "Administrator") {
                    $("#validDiv").show();
                } else {
                    $("#validDiv").hide();
                }
                $("#dor").val(user.dor);
                $("#isDirty").val(user.isDirty);
                $('#uploading').hide();
                $('.organisation').text(user.organisation);
                checkMobile();
                if (user.logoimg != '') {
                    $('#frmModal #prviewLogoDiv').show();
                    $('#frmModal #prviewLogo').attr('src', 'uploads/' + user.logoimg);
                    $('.logoHeader').attr('src', 'uploads/' + user.logoimg);
                    $('#logoLeft').attr('src', 'uploads/' + user.logoimg);
                } else {
                    $('#frmModal #prviewLogo').attr('src', '');
                    $('#frmModal #prviewLogoDiv').hide();
                }
            } else {

            }

        }
    });
}
