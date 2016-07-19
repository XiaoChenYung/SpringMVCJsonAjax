var selectMutiAccount = null;
$(document).ready(function () {
    $("#frmEditDevice #createDate").val(getCurrentDate());
    formatDateTimePicker();
    requestGetAccountList();
    try {
        selectMutiAccount = $('.account-list_selectbox-multi').select2();
    } catch (e) {
        console.log(e);
    }

});
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
function setActiveMode() {
    var selector = '.btn-group .btn btn-default btn-sm';
    $(selector).on('click', function () {
        $(selector).removeClass('active');
        $(this).addClass('active');
    });
}

function requestGetAccountList() {
    $.ajax({
        type: 'GET',
        url: '/rest/getAllAccounts',
        dataType: "json", // data type of response
        success: renderListAccount
    });
}
function renderListAccount(data) {
    var accountList_selectbox = $('#account-list_selectbox');
    var list = data == null ? [] : (data instanceof Array ? data : [data]);
    $.each(list, function (index, user) {
        //accountList_selectbox.append($('<option></option>').val(user.userId).html(user.username + ' - ' + user.fullName));
        accountList_selectbox.append($('<option></option>').val(user.username).html(user.username));
    });
}

function actionDeviceFormatter(value, device, index) {
    var html = '<img class = "action_show" src = "./asset/images/details-icon.png"  onclick = "showDevice('
            + "'" + device.userId + "',"
            + "'" + device.username + "',"
            + "'" + device.phone + "',"
            + "'" + device.deviceAddress + "',"
            + "'" + device.deviceId + "',"
            + "'" + device.deviceName + "',"
            + "'" + device.createDate + "',"
            + "'" + device.expiryDate + "',"
            + "'" + device.isActive + "'"
            + ')" >';
    if (device.role == 1) {
        html = html + '<img class = "action_edit" src = "./asset/images/edit-icon.png"  onclick = "editDevice('
                + "'" + device.userId + "',"
                + "'" + device.username + "',"
                + "'" + device.phone + "',"
                + "'" + device.deviceAddress + "',"
                + "'" + $.trim(device.deviceId) + "',"
                + "'" + device.deviceName + "',"
                + "'" + device.createDate + "',"
                + "'" + device.expiryDate + "',"
                + "'" + device.isActive + "'"
                + ')" >'
                + '<img style="display:none;" class = "action_delete" src = "./asset/images/delete-icon.png"  onclick = "removeDevice('
                + "'" + device.deviceId + "',"
                + "'" + device.deviceName + "'"
                + ')" >';
    }
    var result = [html].join('');
    return result;
}
function cellStyle() {
    return {classes: 'hidden'};
}
$(function () {
    try {
        var $table = $('#tableDevice');
        $table.bootstrapTable('hideColumn', 'userId');
    } catch (e) {
        console.log(e);
    }
});
$("#btnAddDevice").on("click", function () {
    $('#device-modal-title').html('Thêm thiết bị');
    $("#frmEditDevice #div-change_password").hide();
    $("#frmEditDevice #div-password").show();
    $("#frmEditDevice #div-password_confirm").show();
    $('#frmEditDevice #actionType').val('DEVICE_ADD');
    $('#frmEditDevice #deviceId').val('');
    $('#frmEditDevice #deviceName').val('');
    $('#frmEditDevice #username').val('');
    $('#frmEditDevice #password').val('');
    $('#frmEditDevice #password_confirm').val('');
    $('#frmEditDevice #email').val('');
    $('#frmEditDevice #fullName').val('');
    $('#frmEditDevice #deviceAddress').val('');
    $('#frmEditDevice #phone').val('');
    $("#frmEditDevice #createDate").val(getCurrentDate());
    $('#frmEditDevice #expiryDate').val('');
    $('#frmEditDevice #expiryDate').prop('disabled', false);
    setReadOnlyFieldsDevice(false);
    $('#frmEditDevice #isActive').prop('checked', true);
    $("#frmEditDevice #createDate").prop('disabled', true);
    $('#frmEditDevice #expiryDate').css("background-color", "#fff");
    setMutiAccountSelectBox(null);
    $('#editDeviceModal').modal({show: true});
});
function editDevice(userId, username, phone, deviceAddress, deviceId, deviceName, createDate, expiryDate, isActive) {
    console.log('editDevice is called with userId=' + userId + ';username=' + username);
    if (userId == null || userId == "") {
        return;
    }
    if (deviceId == null || deviceId == "") {
        return;
    }
    $('#device-modal-title').html('Sửa thiết bị');
    $('#frmEditDevice #actionType').val('DEVICE_UPDATE');
    $('#frmEditDevice #deviceId').val(deviceId);
    $('#frmEditDevice #deviceName').val(deviceName);
    $('#frmEditDevice #createDate').val(createDate);
    $('#frmEditDevice #deviceAddress').val(deviceAddress);
    $('#frmEditDevice #phone').val(phone);
    $('#frmEditDevice #expiryDate').val(expiryDate);
    setReadOnlyFieldsDevice(false);
    $('#frmEditDevice #createDate').prop('readonly', true);
    $('#frmEditDevice #deviceId').prop('readonly', true);
    $('#frmEditDevice #expiryDate').prop('disabled', false);
    $('#frmEditDevice #expiryDate').css("background-color", "#fff");
    if (isActive == 1) {
        isActive = true;
    } else {
        isActive = false;
    }
    setMutiAccountSelectBox(username);
    $('#frmEditDevice #isActive').prop('checked', isActive);
    $('#editDeviceModal').modal({show: true});
}
function setReadOnlyFieldsDevice(isEnable) {
    $("#frmEditDevice #username").prop('disabled', isEnable);
    $('#frmEditDevice #deviceId').prop('readonly', isEnable);
    $('#frmEditDevice #deviceName').prop('readonly', isEnable);
    $('#frmEditDevice #fullName').prop('readonly', isEnable);
    $('#frmEditDevice #deviceAddress').prop('readonly', isEnable);
    $('#frmEditDevice #phone').prop('readonly', isEnable);
    $('#frmEditDevice #createDate').prop('disabled', false);
    $('#frmEditDevice #expiryDate').prop('readonly', true);
    //$('#frmEditDevice #account-list_selectbox').prop('disabled', isEnable);
    $('#frmEditDevice #isActive').prop('disabled', isEnable);
    if (isEnable) {
        $('#btnEditDeviceModelYes').hide();
    } else {
        $('#btnEditDeviceModelYes').show();
    }
    $('.account-list_selectbox-multi').prop("disabled", isEnable);
}
function showDevice(userId, username, phone, deviceAddress, deviceId, deviceName, createDate, expiryDate, isActive) {
    console.log('showDevice is called with userId=' + userId + ';username=' + username);
    if (userId == null || userId == "") {
        return;
    }
    if (deviceId == null || deviceId == "") {
        return;
    }
    $('#device-modal-title').html('Xem thông tin thiết bị');
    $('#frmEditDevice #actionType').val('DEVICE_UPDATE');
    $("#frmEditDevice #div-change_password").show();
    $("#frmEditDevice #div-password").hide();
    $("#frmEditDevice #div-password_confirm").hide();
    $('#frmEditDevice #userId').val(userId);
    $('#frmEditDevice #username').val(username);
    $("#frmEditDevice #username").prop('disabled', true);
    $('#frmEditDevice #deviceId').val(deviceId);
    $('#frmEditDevice #deviceName').val(deviceName);
    $('#frmEditDevice #createDate').val(createDate);
    $('#frmEditDevice #deviceAddress').val(deviceAddress);
    $('#frmEditDevice #phone').val(phone);
    $('#frmEditDevice #expiryDate').val(expiryDate);
    setReadOnlyFieldsDevice(true);
    if (isActive == 1) {
        isActive = true;
    } else {
        isActive = false;
    }
    $('#frmEditDevice #isActive').prop('checked', isActive);
    $("#frmEditDevice #createDate").prop('disabled', true);
    $('#frmEditDevice #expiryDate').prop('disabled', true);
    $('#frmEditDevice #expiryDate').prop('readonly', true);
    $('#frmEditDevice #expiryDate').css("background-color", "#EEE");
    setMutiAccountSelectBox(username);

    $('#editDeviceModal').modal({show: true});
}
function setMutiAccountSelectBox(username) {
    if (username != null) {
        username = username.split(' - ').sort();
    }
    selectMutiAccount.val(username).trigger("change");

}
function formatDateTimePicker() {
//var currentDate = new Date();
//var nextDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + (currentDate.getDay());
    $("#expiryDate").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        onClose: function (dateText, inst) {

        },
        minDate: '+1w'
    }).bind("change", function () {

    });
    try {
// Since confModal is essentially a nested modal it's enforceFocus method
// must be no-op'd or the following error results
// "Uncaught RangeError: Maximum call stack size exceeded"
// But then when the nested modal is hidden we reset modal.enforceFocus
        var enforceModalFocusFn = $.fn.modal.Constructor.prototype.enforceFocus;
        $.fn.modal.Constructor.prototype.enforceFocus = function () {
        };
        $confModal.on('hidden', function () {
            $.fn.modal.Constructor.prototype.enforceFocus = enforceModalFocusFn;
        });
        $confModal.modal({backdrop: false});
    } catch (e) {
        console.log(e);
    }
}
function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
}
checkFormEditDevice = function ()
{
    $(document).ready(function () {

        var deviceId = $("#frmEditDevice #deviceId").val();
        var actionType = $("#frmEditDevice #actionType").val();
        var url_submit = './rest/updateDevice/';
        switch (actionType) {
            case 'DEVICE_ADD':
                if (deviceId == null || $.trim(deviceId) == '') {
                    notify('danger', '<strong>Missing</strong> Mã thiết bị không được bỏ trống !!!');
                    $("#frmEditDevice #deviceId").focus();
                    return;
                }
                break;
            case 'DEVICE_UPDATE':
                //url_submit = './rest/updateProfile/';
                break;
            default :
                return;
        }
        var deviceName = $("#frmEditDevice #deviceName").val();
        if (deviceName == '') {
            notify('danger', '<strong>Missing</strong> Tên thiết bị không được bỏ trống !!!');
            $("#frmEditDevice #deviceName").focus();
            return;
        }
        var phone = $("#frmEditDevice #phone").val();
        if (phone == '') {
            notify('danger', '<strong>Missing</strong> Số điện thiết bị không được bỏ trống !!!');
            $("#phone").focus();
            return;
        }
        var deviceAddress = $("#frmEditDevice #deviceAddress").val();
        if (deviceAddress == '') {
            notify('danger', '<strong>Missing</strong> Địa chỉ không được bỏ trống !!!');
            $("#deviceAddress").focus();
            return;
        }

        var expiryDate = $("#frmEditDevice #expiryDate").val();
        if (expiryDate == '') {
            notify('danger', '<strong>Missing</strong> Ngày hết hạn không được bỏ trống !!!');
            $("#expiryDate").focus();
            return;
        }
        var selectedUsername = document.getElementsByClassName("select2-selection__choice");
        if (selectedUsername.length == 0) {
            notify('danger', '<strong>Missing</strong> Chủ sở hữu chưa được xác định !!!');
            //$("#frmEditDevice .fstQueryInput").focus();
            return;
        }
        var username = '';
        for (i = 0; i < selectedUsername.length; i++) {
            if (username == '') {
                username = $.trim(selectedUsername[i].innerHTML).replace('×', '');
            } else {
                username = username + ' - ' + selectedUsername[i].innerHTML.replace('×', '');
            }
        }
        var isActive = document.getElementById('isActive').checked;
        $('#isActive2').val(isActive);
        var dataString = $("#frmEditDevice").serialize();
        dataString = dataString + '&username=' + username;
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
                    notify('success', '<strong>Success</strong> ' + data.error_message);
                    //$('#editAccountModal').modal({show: false});
                    $("#btnUpdateProfile").prop('disabled', false);
                    $('#editDeviceModal').modal('hide');
                    var $table = $('#tableDevice');
                    $table.bootstrapTable('refresh');
                } else {
                    notify('danger', '<strong>Error</strong> ' + data.error_message);
                }
            }
        });
    });
};

function stateDeviceFormatter(value, row, index) {
    if (value == 1) {
        return '<img src="./asset/images/icon-yes.gif">';
    } else {
        return '<img src="./asset/images/icon-no.gif">';
    }
}