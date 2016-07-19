var HOST = '.';
var idUser = -1;
var organisation = '';
var typeEpl = '';
var selectedDate = '';
var oid = -1;
var section = -1;
var standard = -1;
var i = 0;
function queryParams() {
    return {
        type: 'owner',
        sort: 'updated',
        direction: 'desc',
        per_page: 100,
        oid: oid,
        typeEpl: typeEpl,
        selectedDate: selectedDate,
        section: section,
        standard: standard,
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
function actionFormatter(currentPeriod, row, index) {
    var html = '<input type="radio" name="'
            + "'eid_" + row.eid + "'"
            + '"class = "action_show" id = "show_user_details" onChange = "updatePeriodMarkAttendance('
            + "'eid_1_" + row.eid + "',"
            + "'" + row.rfidNo + "',"
            + "'" + row.timeInShift + "',"
            + "'" + row.timeOutShift + "',"
            + "'" + row.lunchOnShift + "',"
            + "'" + row.lunchOffShift + "',"
            + "'FD')" + '"';
    if (currentPeriod == 'FD') {
        html = html + ' checked';
    }
    html = html + '/>FD';
    html = html + ' <input type = "radio" name = "'
            + "'eid_" + row.eid + "'"
            + '"class = "action_show" onChange = "updatePeriodMarkAttendance('
            + "'eid_2_" + row.eid + "',"
            + "'" + row.rfidNo + "',"
            + "'" + row.timeInShift + "',"
            + "'" + row.timeOutShift + "',"
            + "'" + row.lunchOnShift + "',"
            + "'" + row.lunchOffShift + "',"
            + "'FHD')" + '"';
    if (currentPeriod == 'FHD') {
        html = html + ' checked';
    }
    html = html + '/>FHD';
    html = html + ' <input type = "radio" name = "'
            + "'eid_" + row.eid + "'"
            + '"class = "action_show" onChange = "updatePeriodMarkAttendance('
            + "'eid_3_" + row.eid + "',"
            + "'" + row.rfidNo + "',"
            + "'" + row.timeInShift + "',"
            + "'" + row.timeOutShift + "',"
            + "'" + row.lunchOnShift + "',"
            + "'" + row.lunchOffShift + "',"
            + "'SHD')" + '"';
    if (currentPeriod == 'SHD') {
        html = html + ' checked';
    }
    html = html + '/>SHD';
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

    updatePeriodMarkAttendance(
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
function updatePeriodMarkAttendance(
        eidTagRadio
        , rfidNo
        , timeInShift
        , timeOutShift
        , lunchOnShift
        , lunchOffShift
        , period
        ) {
    console.log('updatePeriodMarkAttendance is called with eidTagRadio=' + eidTagRadio);
    var selectedDate = $('#selectedDate').val();
    var dataString = 'rfidNo=' + rfidNo
            + '&timeInShift=' + timeInShift
            + '&timeOutShift=' + timeOutShift
            + '&lunchOnShift=' + lunchOnShift
            + '&lunchOffShift=' + lunchOffShift
            + '&period=' + period
            + '&selectedDate=' + selectedDate;
    $.ajax({
        type: "POST",
        url: "./api/mark/update/",
        data: dataString,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            //$("#submit").val('Connecting...');
        },
        success: function (data) {
            if (data.error_code == 0) {
                notify('success', '<strong>Success</strong> ' + data.error_message);
                var $table = $('#tableMark');
                $table.bootstrapTable('refresh');
            } else {
                notify('danger', '<strong>Error</strong> ' + data.error_message + ' !!!');
            }

        }
    });

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
                var $table = $('#tableMark');
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
        var $table = $('#tableMark');
        $table.bootstrapTable('hideColumn', 'mark');
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
    $("#organisation").html(options);
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

function getProfile() {
    var userId = $("#userIdCurrent").val();
    $.ajax({
        type: "GET",
        url: "./api/profile_user/getProfile/1?userId=" + userId,
        cache: false,
        dataType: "json",
        beforeSend: function () {
        },
        success: function (data) {
            if (data.error_code == 0) {
                var user = data.user;
                $('.organisation').html(user.organisation);
            }

        }
    });
}

function changeType() {
    $('#sectionDiv').hide();
    $('#standartDiv').hide();
    $("select#type").change(function () {
        typeEpl = $('select#type').val();
        if (typeEpl === 'Student') {
            $('#sectionDiv').show();
            $('#standartDiv').show();
        } else {
            $('#sectionDiv').hide();
            $('#standartDiv').hide();
        }
    });
}


function fetchMark() {
    if (typeEpl == null || typeEpl == -1) {
        $('#type').focus();
        notify('danger', '<strong>Missing</strong> Please select a group !!!');
        return;
    }
    selectedDate = $('#selectedDate').val();
    if (selectedDate == null || selectedDate == '') {
        $('#selectedDate').focus();
        notify('danger', '<strong>Missing</strong> Please select a date !!!');
        return;
    }
    oid = $('#organisation').val();
    typeEpl = $('select#type').val();
    section = $('#section').val();
    standard = $('#standard').val();
    var $table = $('#tableMark');
    $table.bootstrapTable('refresh');
}

$(document).ready(function () {
    $("#btnLogout").on("click", function () {
        window.location.href = "api/logout";
    });
    changeType();
    getProfile();
    requestGetOrganisationListToSelectBox();
    setActive('#mark-page');
    $('#dateMark').datetimepicker({
        viewMode: 'years',
        format: 'YYYY-MM-DD'
    });
});
