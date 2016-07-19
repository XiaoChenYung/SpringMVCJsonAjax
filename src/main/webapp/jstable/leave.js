var HOST = '.';
var idUser = -1;
var organisation = '';
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
            + "'" + row.shiftsch + "',"
            + "'" + row.oid + "',"
            + "'" + row.shift + "',"
            + "'" + row.timeIn + "',"
            + "'" + row.timeOut + "',"
            + "'" + row.lunchOn + "',"
            + "'" + row.lunchOff + "',"
            + "'" + row.timeDiff + "',"
            + "'" + row.dor + "',"
            + "'" + row.isDirty + "'"
            + ')" >'
            + '<img class = "action_edit" src = "./asset/images/edit-icon.png" id = "edit_users" onclick = "editFormModal('
            + "'" + row.shiftsch + "',"
            + "'" + row.oid + "',"
            + "'" + row.shift + "',"
            + "'" + row.timeIn + "',"
            + "'" + row.timeOut + "',"
            + "'" + row.lunchOn + "',"
            + "'" + row.lunchOff + "',"
            + "'" + row.timeDiff + "',"
            + "'" + row.dor + "',"
            + "'" + row.isDirty + "'"
            + ')" >';
    if (row.isDirty == 0) {
        html = html + '<img class = "action_delete" src = "./asset/images/delete-icon.png" id = "remove_user" onclick = "updateStatusShift('
                + "'" + row.shiftsch + "',"
                + "'" + 1 + "'"
                + ')" >';
    } else {
        html = html + '<img class = "action_delete" src = "./asset/images/restore-icon.png" id = "restore_user" onclick = "updateStatusShift('
                + "'" + row.shiftsch + "',"
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
$("#btnAddAccount").on("click", function () {
    $('#account-modal-title').html('Add a Shift');
    $('#frmModal #actionType').val('ACCOUNT_ADD');

    $('#shift').val('');
    $("#frontend_shift_form_lunchonoff").prop("checked", true);
    if ($('#frontend_shift_form_lunchonoff').is(':checked')) {
        $('#divLuchOn').show();
        $('#divLuchOff').show();
    } else {
        $('#divLuchOn').hide();
        $('#divLuchOff').hide();
    }
    $('#frmModal #organisation_selectbox').val(-1);
    $('#timeIn').val('00:00');
    $('#timeOut').val('00:00');
    $('#lunchOn').val('00:00');
    $('#lunchOff').val('00:00');
    $('#timeDiff').val('00:00');
    $('#isDirty').val('00:00');
    $('#btnEditAccountModelYes').show();
    $('#uploading').hide();
    $('#frmModal #prviewLogo').attr('src', '');
    setReadOnlyFieldsOnForm(false);
    $('#frmModal #prviewLogoDiv').hide();
    $('#editAccountModal').modal({show: true});
});
function editFormModal(
        shiftsch
        , oid
        , shift
        , timeIn
        , timeOut
        , lunchOn
        , lunchOff
        , timeDiff
        , dor
        , isDirty
        ) {

    showFormModal(
            shiftsch
            , oid
            , shift
            , timeIn
            , timeOut
            , lunchOn
            , lunchOff
            , timeDiff
            , dor
            , isDirty
            );
    var images = $("#images");
    images.replaceWith(images = images.clone(true));
    $('#account-modal-title').html('Edit Organisation');
    $('#uploading').hide();
    $('#frmModal #shiftsch').val(shiftsch);
    $('#frmModal #actionType').val('ACCOUNT_UPDATE');
    $('#frmModal #organisation_selectbox').val(oid);
    $('#frmModal #shift').val(shift);
    $('#frmModal #timeIn').val(timeIn);
    $('#frmModal #timeOut').val(timeOut);
    $('#frmModal #lunchOn').val(lunchOn);
    $('#frmModal #lunchOff').val(lunchOff);
    $('#frmModal #timeDiff').val(timeDiff);
    $('#frmModal #isDirty').val(isDirty);
    setReadOnlyFieldsOnForm(false);
    $('#btnEditAccountModelYes').show();
    $('#editAccountModal').modal({show: true});
}
function setReadOnlyFieldsOnForm(isEnable) {
    $('#frmModal #shiftsch').prop('disabled', isEnable);
    $('#frmModal #shift').prop('disabled', isEnable);
    $('#frmModal #timeIn').prop('disabled', isEnable);
    $('#frmModal #timeOut').prop('disabled', isEnable);
    $('#frmModal #lunchOn').prop('disabled', isEnable);
    $('#frmModal #lunchOff').prop('disabled', isEnable);
    $('#frmModal #timeDiff').prop('disabled', isEnable);
    $('#frmModal #isDirty').prop('disabled', isEnable);
    $('#frontend_shift_form_lunchonoff').prop('disabled', isEnable);
    if (idUser != -1) {
        $('#frmModal #organisation_selectbox').val(idUser);
        $('#organisation_selectbox').attr('disabled', true);
    } else
        $('#organisation_selectbox').attr('disabled', isEnable);
}
function showFormModal(
        shiftsch
        , oid
        , shift
        , timeIn
        , timeOut
        , lunchOn
        , lunchOff
        , timeDiff
        , dor
        , isDirty
        ) {
    console.log('showAccount is called with cid=' + cid);
    if (oid == null || oid == "") {
        return;
    }
//var modal = $('#editAccountModal');
    $('#account-modal-title').html('View organisation');
    $('#frmModal #actionType').val('ACCOUNT_NONE');
    $('#frmModal #shiftsch').val(shiftsch);
    $('#frmModal #organisation_selectbox').val(oid);
    if (idUser != -1) {
        $('#frmModal #organisation_selectbox').val(idUser);
        $('#organisation_selectbox').attr('disabled', true);
    }
    $('#frmModal #shift').val(shift);
    $('#frmModal #timeIn').val(timeIn);
    $('#frmModal #timeOut').val(timeOut);
    if (lunchOn == null || lunchOn == '' || lunchOff == null || lunchOff == '') {
        $("#frontend_shift_form_lunchonoff").prop("checked", false);
        $('#divLuchOn').hide();
        $('#divLuchOff').hide();
    } else {
        $("#frontend_shift_form_lunchonoff").prop("checked", true);
        $('#divLuchOn').show();
        $('#divLuchOff').show();
    }
    $('#frmModal #lunchOn').val(lunchOn);
    $('#frmModal #lunchOff').val(lunchOff);
    $('#frmModal #timeDiff').val(timeDiff);
    setReadOnlyFieldsOnForm(true);
    $('#btnEditAccountModelYes').hide();
    $('#uploading').hide();
    $('#editAccountModal').modal({show: true});
}
function updateStatusShift(shiftsch, isDirty) {
    console.log('removeShift is called with shiftsch=' + shiftsch);
    if (shiftsch == null || shiftsch == "") {
        return;
    }
    var dataString = 'shiftsch=' + shiftsch + '&isDirty=' + isDirty;
    $.ajax({
        type: "POST",
        url: "./api/shift/delete/",
        data: dataString,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            //$("#submit").val('Connecting...');
        },
        success: function (data) {
            if (data.error_code == 0) {
                notify('success', '<strong>Success</strong> ' + data.error_message);
                var $table = $('#tableShift');
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
        if (!checkValidateShift()) {
            return;
        }
        var url_submit = '';
        var selectedOrganisationId = $('#organisation_selectbox').val();
        var actionType = $('#frmModal #actionType').val();
        switch (actionType) {
            case 'ACCOUNT_ADD':
                url_submit = './api/shift/insert/';
                break;
            case 'ACCOUNT_UPDATE':
                url_submit = './api/shift/update/';
                break;
            default :
                break;
        }
        var dataString = $("#frmModal").serialize();
        dataString = dataString + '&oidJs=' + selectedOrganisationId;
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
                    //$('#editPrModal').modal({show: false});
                    $('#editAccountModal').modal('hide');
                    var $table = $('#tableShift');
                    $table.bootstrapTable('refresh');
                    setTimeout(function () {
                        $table.bootstrapTable('resetView');
                    }, 1000);
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
        var $table = $('#tableShift');
        $table.bootstrapTable('hideColumn', 'shiftsch');
        $table.bootstrapTable('hideColumn', 'oid');
        $table.bootstrapTable('hideColumn', 'dor');
        $table.bootstrapTable('hideColumn', 'isDirty');
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
    window.location.href = "./api2/export/customer_export/?type=" + type;
}

function requestGetOrganisationListToSelectBox() {
    $.ajax({
        type: 'GET', url: './api/organisation/views/123',
        dataType: "json", // data type of response
        success: renderListOrganisationToSelectBox
    });
}
function renderListOrganisationToSelectBox(dataList) {
    var options = '<option value="-1" selected >Please select organisations</option>';
    $.each(dataList, function (index, organisations) {
        options += '<option value="' + organisations.oid + '">' + organisations.organisation + '</option>';
    });
    $("#organisation_selectbox").html(options);
    if (idUser != -1) {
        $('#frmModal #organisation_selectbox').val(idUser);
        $('#frmModal #organisation_selectbox').attr('disabled', true);
    }
}
function getProfile() {
    var userId = $("#userIdCurrent").val();
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
                if (user.type != 'Administrator') {
                    idUser = user.oid;
                    organisation = user.organisation;
                }
                if (user.type != 'Employee') {
                    $('.organisation').html(user.organisation);
                }
            }

        }
    });
}

function changeCheckbox() {
    $('#frontend_shift_form_lunchonoff').change(function () {
        if ($('#frontend_shift_form_lunchonoff').is(':checked')) {
            $('#lunchOn').val('00:00');
            $('#lunchOff').val('00:00');
            $('#divLuchOn').show();
            $('#divLuchOff').show();
        } else {
            $('#divLuchOn').hide();
            $('#divLuchOff').hide();
        }

    });
}
$(document).ready(function () {
    $("#btnLogout").on("click", function () {
        window.location.href = "api/logout";
    });
    $("input.timepicker").timepicker({
        showMeridian: false, showInputs: false
    });
    getProfile();
    changeCheckbox();
    requestGetOrganisationListToSelectBox();
    setActive('#leave-page');
});