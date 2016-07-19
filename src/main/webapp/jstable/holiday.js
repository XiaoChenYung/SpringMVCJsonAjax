var HOST = '.';
var idUser = -1;
var organisation = '';
var oid = -1;
function queryParams() {
    return {
        type: 'owner',
        sort: 'updated',
        direction: 'desc',
        per_page: 100,
        oid: oid,
        page: 1
    };
}
// Show detail
function actionFormatter(value, row, index) {
    var html = '<img class = "action_show" src = "./asset/images/details-icon.png" id = "show_user_details" onclick = "showFormModal('
            + "'" + row.id + "',"
            + "'" + row.category + "',"
            + "'" + row.oid + "',"
            + "'" + row.holidayname + "',"
            + "'" + row.holidaykind + "',"
            + "'" + row.holidaydate + "',"
            + "'" + row.dor + "',"
            + "'" + row.isDirty + "'"
            + ')" >'
            + '<img class = "action_edit" src = "./asset/images/edit-icon.png" id = "edit_users" onclick = "editFormModal('
            + "'" + row.id + "',"
            + "'" + row.category + "',"
            + "'" + row.oid + "',"
            + "'" + row.holidayname + "',"
            + "'" + row.holidaykind + "',"
            + "'" + row.holidaydate + "',"
            + "'" + row.dor + "',"
            + "'" + row.isDirty + "'"
            + ')" >';
    if (row.isDirty == 0) {
        html = html + '<img class = "action_delete" src = "./asset/images/delete-icon.png" id = "remove_user" onclick = "updateStatusHoliday('
                + "'" + row.id + "',"
                + "'" + 1 + "'"
                + ')" >';
    } else {
        html = html + '<img class = "action_delete" src = "./asset/images/restore-icon.png" id = "restore_user" onclick = "updateStatusHoliday('
                + "'" + row.id + "',"
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
    $('#account-modal-title').html('Add a Holiday');
    if (idUser != -1) {
        $('#frmModal #oid').val(idUser);
        $('#frmModal #oid').attr('disabled', true);
    } else {
        $('#frmModal #oid').val(-1);
    }
    $('#frmModal #actionType').val('ACCOUNT_ADD');
    $('#frmModal #category').val('All');
    $('#holidayname').val('');
    $('#holidaykind').val('FD');
    $('#btnEditAccountModelYes').show();
    setReadOnlyFieldsOnForm(false);
    $('#frmModal #prviewLogoDiv').hide();
    $('#editAccountModal').modal({show: true});
});
function editFormModal(
        id
        , category
        , oid
        , holidayname
        , holidaykind
        , holidaydate
        , dor
        , isDirty
        ) {

    showFormModal(
            id
            , category
            , oid
            , holidayname
            , holidaykind
            , holidaydate
            , dor
            , isDirty
            );
    var images = $("#images");
    images.replaceWith(images = images.clone(true));
    $('#account-modal-title').html('Edit Organisation');
    $('#uploading').hide();
    $('#frmModal #id').val(id);
    $('#frmModal #oid').val(oid);
    $('#frmModal #category').val(category);
    $('#frmModal #actionType').val('ACCOUNT_UPDATE');
    $('#frmModal #holidayname').val(holidayname);
    $('#frmModal #holidaykind').val(holidaykind);
    $('#frmModal #holidaydate').val(holidaydate);
    $('#frmModal #holidaydateOld').val(holidaydate);
    $('#frmModal #isDirty').val(isDirty);
    setReadOnlyFieldsOnForm(false);
    $('#btnEditAccountModelYes').show();
    $('#editAccountModal').modal({show: true});
}

function setReadOnlyFieldsOnForm(isEnable) {
    $('#frmModal #id').prop('disabled', isEnable);
    if (idUser != -1) {
        $('#frmModal #oid').attr('disabled', true);
    } else {
        $('#frmModal #oid').attr("disabled", isEnable);
    }
    $('#frmModal #category').prop('disabled', isEnable);
    $('#frmModal #holidayname').prop('disabled', isEnable);
    $('#frmModal #holidaykind').prop('disabled', isEnable);
    $('#frmModal #holidaydate').prop('disabled', isEnable);
    $('#frmModal #isDirty').prop('disabled', isEnable);
    $('#frontend_shift_form_lunchonoff').prop('disabled', isEnable);
}

function showFormModal(
        id
        , category
        , oid
        , holidayname
        , holidaykind
        , holidaydate
        , dor
        , isDirty
        ) {
    $('#account-modal-title').html('View Holiday');
    $('#frmModal #actionType').val('ACCOUNT_NONE');
    $('#frmModal #id').val(id);
    $('#frmModal #oid').val(oid);
    $('#frmModal #category').val(category);
    $('#frmModal #holidayname').val(holidayname);
    $('#frmModal #holidaykind').val(holidaykind);
    $('#frmModal #holidaydate').val(holidaydate);
    $('#frmModal #holidaydateOld').val(holidaydate);
    setReadOnlyFieldsOnForm(true);
    $('#btnEditAccountModelYes').hide();
    $('#uploading').hide();
    $('#editAccountModal').modal({show: true});
}

function updateStatusHoliday(id, isDirty) {
    console.log('removeShift is called with shiftsch=' + id);
    if (id == null || id == "") {
        return;
    }
    var dataString = 'id=' + id + '&isDirty=' + isDirty;
    $.ajax({
        type: "POST",
        url: "./api/holiday/delete/",
        data: dataString,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            //$("#submit").val('Connecting...');
        },
        success: function (data) {
            if (data.error_code == 0) {
                notify('success', '<strong>Success</strong> ' + data.error_message);
                var $table = $('#tableHoliday');
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


function checkValidateHoliday() {
    if ($('#oid').val() == '-1') {
        notify('danger', '<strong>Missing</strong> ' + 'Organisation is empty' + '!!!');
        $('#oid').focus();
        return false;
    }

    if (!checkInput('#holidayname', ' Holiday Name is empty ')) {
        return false;
    }

    if (!checkInput('#holidaydate', ' Time Out is empty ')) {
        return false;
    }
    return true;
}
checkFormEditAccount = function ()
{
    $(document).ready(function () {
        if (!checkValidateHoliday()) {
            return;
        }
        var url_submit = '';
        var actionType = $('#frmModal #actionType').val();
        switch (actionType) {
            case 'ACCOUNT_ADD':
                url_submit = './api/holiday/insert/';
                break;
            case 'ACCOUNT_UPDATE':
                url_submit = './api/holiday/update/';
                break;
            default :
                break;
        }
        var dataString = $("#frmModal").serialize();
        var holidayDateOld = $('#holidaydateOld').val();
        dataString = dataString + "&holidaydateOld=" + holidayDateOld;
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
                    var $table = $('#tableHoliday');
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
        var $table = $('#tableHoliday');
        $table.bootstrapTable('hideColumn', 'id');
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


function requestGetOrganisationListToSelectBox() {
    $.ajax({
        type: 'GET', url: './api/organisation/views/123',
        dataType: "json", // data type of response
        success: renderListOrganisationToSelectBox
    });
}
function renderListOrganisationToSelectBox(dataList) {
    var options = '<option value="-1" selected >Please select organisations</option>';
    if (idUser != -1) {
        $('#frmModal #oid').val(idUser);
        $('#frmModal #oid').attr('disabled', true);
    }
    $.each(dataList, function (index, organisations) {
        options += '<option value="' + organisations.oid + '">' + organisations.organisation + '</option>';
    });
    $("#oid").html(options);
    var organisation = $("#organisation").val();
    if (typeof organisation !== 'undefined') {//for list on table, just show for admin
        $("#organisation").html(options);
    }
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
                if (user.type == 'Organisation') {
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

function changeOrganisation() {
    var $table = $('#tableHoliday');
    //var oid = -1;
    $("select#organisation").change(function () {
        oid = $('select#organisation').val();
        $table.bootstrapTable('refresh');
    });
}
$(document).ready(function () {
    $("#btnLogout").on("click", function () {
        window.location.href = "api/logout";
    });
    $('#date').datetimepicker({
        viewMode: 'years',
        format: 'YYYY-MM-DD'
    });
    getProfile();
    requestGetOrganisationListToSelectBox();
    changeOrganisation();
    setActive('#holiday-page');
});