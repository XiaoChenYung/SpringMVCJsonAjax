var HOST = '.';
var idUser = -1;
var organisation = '';
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

    var alertTypeSMS = false;
    var alertTypeEmail = false;
    var alertTypeNotification = false;
    var alertType = row.alertType;
    if (alertType != null && alertType != 'undefined' && alertType != 'null' && alertType != '') {
        var alertTypeSMS = alertType.SMS;
        var alertTypeEmail = alertType.Email;
        var alertTypeNotification = alertType.Notification;
    }
    var html = '<img class = "action_show" src = "./asset/images/details-icon.png" onclick = "showFormModal('
            + "'" + row.tid + "',"
            + "'" + row.userId + "',"
            + "'" + row.login + "',"
            + "'" + row.password + "',"
            + "'" + row.oid + "',"
            + "'" + row.organisation + "',"
            + "'" + row.name + "',"
            + "'" + row.mobile + "',"
            + "'" + row.email + "',"
            + "'" + encodeURI(row.address) + "',"//encode address with special characters: ; , / ? : @ & = + $
            + "'" + row.dob + "',"
            + "'" + row.designation + "',"
            + "'" + row.department + "',"
            + "'" + row.standard + "',"
            + "'" + row.section + "',"
            + "'" + row.blood + "',"
            + "'" + row.teacherNo + "',"
            + "'" + row.rfidNo + "',"
            + "'" + row.shiftsch + "',"
            + "'" + alertTypeSMS + "',"
            + "'" + alertTypeEmail + "',"
            + "'" + alertTypeNotification + "',"
            + "'" + row.gender + "',"
            + "'" + row.religion + "',"
            + "'" + row.picture + "',"
            + "'" + row.qualification + "',"
            + "'" + row.martial + "',"
            + "'" + row.experience + "',"
            + "'" + row.medical + "',"
            + "'" + row.reference + "',"
            + "'" + encodeURI(row.court) + "',"
            + "'" + row.valid + "',"
            + "'" + encodeURI(row.dor) + "',"
            + "'" + row.isDirty + "'"
            + ')" >'
            + '<img class = "action_edit" src = "./asset/images/edit-icon.png" onclick = "editFormModal('
            + "'" + row.tid + "',"
            + "'" + row.userId + "',"
            + "'" + row.login + "',"
            + "'" + row.password + "',"
            + "'" + row.oid + "',"
            + "'" + row.organisation + "',"
            + "'" + row.name + "',"
            + "'" + row.mobile + "',"
            + "'" + row.email + "',"
            + "'" + encodeURI(row.address) + "',"
            + "'" + row.dob + "',"
            + "'" + row.designation + "',"
            + "'" + row.department + "',"
            + "'" + row.standard + "',"
            + "'" + row.section + "',"
            + "'" + row.blood + "',"
            + "'" + row.teacherNo + "',"
            + "'" + row.rfidNo + "',"
            + "'" + row.shiftsch + "',"
            + "'" + alertTypeSMS + "',"
            + "'" + alertTypeEmail + "',"
            + "'" + alertTypeNotification + "',"
            + "'" + row.gender + "',"
            + "'" + row.religion + "',"
            + "'" + row.picture + "',"
            + "'" + row.qualification + "',"
            + "'" + row.martial + "',"
            + "'" + row.experience + "',"
            + "'" + row.medical + "',"
            + "'" + row.reference + "',"
            + "'" + encodeURI(row.court) + "',"
            + "'" + row.valid + "',"
            + "'" + encodeURI(row.dor) + "',"
            + "'" + row.isDirty + "'"
            + ')" >';
    if (row.isDirty == 0) {
        html = html + '<img class = "action_delete" src = "./asset/images/delete-icon.png" onclick = "updateStatusDeleteRestore('
                + "'" + row.tid + "',"
                + "'" + 1 + "'"
                + ')" >';
    } else {
        html = html + '<img class = "action_delete" src = "./asset/images/restore-icon.png" onclick = "updateStatusDeleteRestore('
                + "'" + row.tid + "',"
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
    currentShift = '';
    var images = $("#images");
    images.replaceWith(images = images.clone(true));
    $('#account-modal-title').html('Add Teacher');
    $('#frmModal #actionType').val('ACTION_ADD');
    $('#frmModal #tid').val('');
    $('#frmModal #userId').val('');
    $('#frmModal #login').val('');
    $('#frmModal #password').val('');
    if (idUser != -1) {
        $('#frmModal #oid').val(idUser);
        $('#frmModal #oid').attr('disabled', true);
        getOrganisationById();
    } else {
        $('#frmModal #oid').val(-1);
    }
    $('#frmModal #organisation').val('');
    $('#frmModal #name').val('');
    $('#frmModal #dob').val('');
    $('#frmModal #mobile').val('');
    $('#frmModal #email').val('');
    $('#frmModal #address').val('');
    $('#frmModal #dob').val('');
    $('#frmModal #designation').val(-1);
    $('#frmModal #department').val(-1);
    $('#frmModal #standard').val('');
    $('#frmModal #section').val('');
    $('#frmModal #blood').val('');
    $('#frmModal #teacherNo').val('');
    $('#frmModal #rfidNo').val('');
    $('#frmModal #shiftsch').val('');
    $("#frmModal #alertTypeSMS").prop("checked", false);
    $("#frmModal #alertTypeEmail").prop("checked", false);
    $("#frmModal #alertTypeNotification").prop("checked", false);
    $('#frmModal #gender').val('');
    $('#frmModal #religion').val('');
    $('#frmModal #qualification').val('');
    $('#frmModal #martial').val('');
    $('#frmModal #experience').val('');
    $('#frmModal #medical').val('');
    $('#frmModal #reference').val('');
    $('#frmModal #court').val('');
    $('#frmModal #valid').val('');
    $('#btnSubmitEditFormYes').show();
    $('#uploading').hide();
    $('#frmModal #prviewLogo').attr('src', '');
    var options = '<option value="-1" selected >Please select shift</option>';
    $("#shiftsch").html(options);
    setReadOnlyFieldsOnForm(false);
    //$('#frmModal #prviewLogoDiv').hide();
    $('#editAccountModal').modal({show: true});
});
$("#btnDeleteAccountModelYes").on("click", function () {
    var modal = $('#deleteAccountModel');
    var cid = modal.find('.modal-body #cid').val();
    //var username = modal.find('.modal-body #username').val();
    var dataString = 'cid=' + cid;
    $.ajax({
        type: "POST",
        url: "./api/customer/delete/",
        data: dataString,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            //$("#submit").val('Connecting...');
        },
        success: function (data) {
            if (data.error_code == 0) {
                notify('success', '<strong>Success</strong> ' + data.error_message);
                var $table = $('#tableTeacher');
                $table.bootstrapTable('refresh');
            } else {
                notify('danger', '<strong>Error</strong> ' + data.error_message + ' !!!');
            }

        }
    });
});
function editFormModal(
        tid
        , userId
        , login
        , password
        , oid
        , organisation
        , name
        , mobile
        , email
        , address
        , dob
        , designation
        , department
        , standard
        , section
        , blood
        , teacherNo
        , rfidNo
        , shiftsch
        , alertTypeSMS
        , alertTypeEmail
        , alertTypeNotification
        , gender
        , religion
        , picture
        , qualification
        , martial
        , experience
        , medical
        , reference
        , court
        , valid
        , dor
        , isDirty
        ) {
    mobileUnum = mobile;
    showFormModal(
            tid
            , userId
            , login
            , password
            , oid
            , organisation
            , name
            , mobile
            , email
            , address
            , dob
            , designation
            , department
            , standard
            , section
            , blood
            , teacherNo
            , rfidNo
            , shiftsch
            , alertTypeSMS
            , alertTypeEmail
            , alertTypeNotification
            , gender
            , religion
            , picture
            , qualification
            , martial
            , experience
            , medical
            , reference
            , court
            , valid
            , dor
            , isDirty
            );
    var images = $("#images"); // in order to clear old input file, if not if still keeps old image when open modal
    images.replaceWith(images = images.clone(true));
    $('#account-modal-title').html('Edit Teacher');
    $('#uploading').hide();
    $('#frmModal #actionType').val('ACTION_UPDATE');
    $('#pass').val(password);
    var actionType = $('#frmModal #actionType').val();
    if (actionType == 'ACTION_UPDATE') {
        $('#password').val('');
    }
    if (picture != '') {
        //$('#frmModal #prviewLogoDiv').show();
        $('#frmModal #prviewLogo').attr('src', 'uploads/' + picture);
    } else {
        $('#frmModal #prviewLogo').attr('src', '');
        //$('#frmModal #prviewLogoDiv').hide();
    }
    setReadOnlyFieldsOnForm(false);
    $('#uploading').hide();
    checkMobile();
    $('#btnSubmitEditFormYes').show();
    $('#editAccountModal').modal({show: true});
}
function setReadOnlyFieldsOnForm(isEnable) {
    $('#frmModal #tid').attr("disabled", isEnable);
    $('#frmModal #userId').attr("disabled", isEnable);
    $('#frmModal #login').attr("disabled", isEnable);
    $('#frmModal #password').attr("disabled", isEnable);
    $('#frmModal #oid').attr("disabled", isEnable);
    if (idUser != -1) {
        $('#frmModal #oid').attr('disabled', true);
    } else {
        $('#frmModal #oid').attr("disabled", isEnable);
    }
    $('#frmModal #organisation').attr("disabled", isEnable);
    $('#frmModal #name').attr("disabled", isEnable);
    $('#frmModal #mobile').attr("disabled", isEnable);
    $('#frmModal #email').attr("disabled", isEnable);
    $('#frmModal #address').attr("disabled", isEnable);
    $('#frmModal #dob').attr("disabled", isEnable);
    $('#frmModal #designation').attr("disabled", isEnable);
    $('#frmModal #department').attr("disabled", isEnable);
    $('#frmModal #standard').attr("disabled", isEnable);
    $('#frmModal #section').attr("disabled", isEnable);
    $('#frmModal #blood').attr("disabled", isEnable);
    $('#frmModal #teacherNo').attr("disabled", isEnable);
    $('#frmModal #rfidNo').attr("disabled", isEnable);
    $('#frmModal #shiftsch').attr("disabled", isEnable);
    $('#frmModal #gender').attr("disabled", isEnable);
    $('#frmModal #religion').attr("disabled", isEnable);
    $('#frmModal #qualification').attr("disabled", isEnable);
    $('#frmModal #martial').attr("disabled", isEnable);
    $('#frmModal #experience').attr("disabled", isEnable);
    $('#frmModal #medical').attr("disabled", isEnable);
    $('#frmModal #reference').attr("disabled", isEnable);
    $('#frmModal #court').attr("disabled", isEnable);
    $('#frmModal #valid').attr("disabled", isEnable);
    $("#frmModal #alertTypeSMS").attr("disabled", isEnable);
    $("#frmModal #alertTypeEmail").attr("disabled", isEnable);
    $("#frmModal #alertTypeNotification").attr("disabled", isEnable);
    $("#frmModal #picture").attr("disabled", isEnable);
    $("#frmModal #images").attr("disabled", isEnable);
}
function showFormModal(
        tid
        , userId
        , login
        , password
        , oid
        , organisation
        , name
        , mobile
        , email
        , address
        , dob
        , designation
        , department
        , standard
        , section
        , blood
        , teacherNo
        , rfidNo
        , shiftsch
        , alertTypeSMS
        , alertTypeEmail
        , alertTypeNotification
        , gender
        , religion
        , picture
        , qualification
        , martial
        , experience
        , medical
        , reference
        , court
        , valid
        , dor
        , isDirty
        ) {
    console.log('showFormModal is called with tid=' + tid);
    if (tid == null || tid == "") {
        return;
    }
    mobileUnum = mobile;
    //var modal = $('#editAccountModal');
    $('#account-modal-title').html('View Teacher');
    $('#frmModal #actionType').val('ACTION_NONE');
    $('#frmModal #tid').val(tid);
    $('#frmModal #userId').val(userId);
    $('#frmModal #login').val(login);
    $('#frmModal #password').val(password);
    $('#frmModal #oid').val(oid);
    $('#frmModal #organisation').val(organisation);
    $('#frmModal #name').val(name);
    $('#frmModal #mobile').val(mobile);
    $('#frmModal #email').val(email);
    $('#frmModal #address').val(decodeURI(address)); // decode address with special characters
    $('#frmModal #dob').val(dob);
    $('#frmModal #designation').val(designation);
    $('#frmModal #department').val(department);
    $('#frmModal #standard').val(standard);
    $('#frmModal #section').val(section);
    $('#frmModal #blood').val(blood);
    $('#frmModal #teacherNo').val(teacherNo);
    $('#frmModal #rfidNo').val(rfidNo);
    $('#frmModal #shiftsch').val(shiftsch);
    currentShift = shiftsch;

    $("#frmModal #alertTypeSMS").prop("checked", $.parseJSON(alertTypeSMS));
    $("#frmModal #alertTypeEmail").prop("checked", $.parseJSON(alertTypeEmail));
    $("#frmModal #alertTypeNotification").prop("checked", $.parseJSON(alertTypeNotification));
    $('#frmModal #gender').val(gender);
    $('#frmModal #religion').val(religion);
    $('#frmModal #qualification').val(qualification);
    $('#frmModal #martial').val(martial);
    $('#frmModal #experience').val(experience);
    $('#frmModal #medical').val(medical);
    $('#frmModal #reference').val(reference);
    $('#frmModal #court').val(decodeURI(court));
    $('#frmModal #valid').val(valid);
    if (picture != '') {
        $('#frmModal #prviewLogo').attr('src', 'uploads/' + picture);
    } else {
        $('#frmModal #prviewLogo').attr('src', '');
    }
    checkMobile();
    setReadOnlyFieldsOnForm(true);
    $('#btnSubmitEditFormYes').hide();
    $('#uploading').hide();
    getOrganisationById();
    $('#editAccountModal').modal({show: true});
}
function updateStatusDeleteRestore(tid, isDirty) {
    console.log('updateStatusDeleteRestore is called with tid=' + tid);
    if (tid == null || tid == "") {
        return;
    }
    var dataString = 'tid=' + tid + '&isDirty= ' + isDirty;
    $.ajax({
        type: "POST",
        url: "./api/teacher/delete/",
        data: dataString,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            //$("#submit").val('Connecting...');
        },
        success: function (data) {
            if (data.error_code == 0) {
                notify('success', '<strong>Success</strong> ' + data.error_message);
                var $table = $('#tableTeacher');
                $table.bootstrapTable('refresh');
            } else {
                notify('danger', '<strong>Error</strong> ' + data.error_message);
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

checkEditAndSubmitForm = function ()
{
    if (!checkValidate('Teacher')) {
        return;
    }
    checkMobile();
    var url_submit = '';
    var actionType = $('#frmModal #actionType').val();
    switch (actionType) {
        case 'ACTION_ADD':
            url_submit = './api/teacher/insert/';
            break;
        case 'ACTION_UPDATE':
            url_submit = './api/teacher/update/';
            break;
        default :
            break;
    }
    var pass = $("#pass").val();
    if ($('#frmModal #images').get(0).files.length == 0) {
    } else {

        $('#frmModal').ajaxForm({
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
                    $("#picture").val(data.imglogo);
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
                                var $table = $('#tableTeacher');
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
                var $table = $('#tableTeacher');
                $table.bootstrapTable('refresh');
                getProfile();
            } else {
                notify('danger', '<strong>Error</strong> ' + data.error_message + ' !!!');
            }
        }
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
        var $table = $('#tableTeacher');
        $table.bootstrapTable('hideColumn', 'oid');
        $table.bootstrapTable('hideColumn', 'userId');
        $table.bootstrapTable('hideColumn', 'password');
        $table.bootstrapTable('hideColumn', 'address');
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
    $.each(dataList, function (index, organisations) {
        options += '<option value="' + organisations.oid + '">' + organisations.organisation + '</option>';
    });
    $("#oid").html(options);
    if (idUser != -1) {// not admin
        $('#frmModal #oid').val(idUser);
        $('#frmModal #oid').attr('disabled', true);
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
                $('.organisation').html(user.organisation);
            }

        }
    });
}

function getShift(data) {
    var options = '<option value="-1" selected >Please select shift</option>';
    $.each(data, function (index, shift) {
        options += '<option value="' + shift.shiftsch + '">' + shift.shift + '</option>';
    });
    $("#shiftsch").html(options);
    if (currentShift != '') {
        $("#shiftsch").val(currentShift);
    }
}
function changeOrg() {
    $("#oid").change(function () {
        var oid = $("#oid").val();
        //var dataString = $user_id;
        $.ajax({
            type: "GET",
            url: "./api/shift/viewByOid/1?oid=" + oid,
            cache: false,
            dataType: "json",
            beforeSend: function () {
                //$("#submit").val('Connecting...');
            },
            success: function (data) {
                getShift(data);
            }
        });
    });
}
function getOrganisationById() {
    var oid = $("#oid").val();
    //var dataString = $user_id;
    $.ajax({
        type: "GET",
        url: "./api/shift/viewByOid/1?oid=" + oid,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            //$("#submit").val('Connecting...');
        },
        success: function (data) {
            getShift(data);
        }
    });
}

function getDesignations() {
    $.ajax({
        type: 'GET', url: './api/designation/views/123',
        dataType: "json", // data type of response
        success: renderListDesignationToSelectBox
    });
}

function renderListDesignationToSelectBox(dataList) {
    var options = '<option value="-1" selected >Please select designations</option>';
    $.each(dataList, function (index, designations) {
        options += '<option value="' + designations.id + '">' + designations.name + '</option>';
    });
    $("#designation").html(options);
}

function getDepartments() {
    $.ajax({
        type: 'GET', url: './api/department/views/123',
        dataType: "json", // data type of response
        success: renderListDepartmentToSelectBox
    });
}

function renderListDepartmentToSelectBox(dataList) {
    var options = '<option value="-1" selected >Please select departments</option>';
    $.each(dataList, function (index, departments) {
        options += '<option value="' + departments.id + '">' + departments.name + '</option>';
    });
    $("#department").html(options);
}

$(document).ready(function () {
    try {
        getProfile();
    } catch (e) {
        console.log(e);
    }
    $("#btnLogout").on("click", function () {
        window.location.href = "api/logout";
    });
    $('#valid').datepicker({
        dateFormat: 'yy-mm-dd',
        altField: '#startDate',
        altFormat: 'yy-mm-dd'
    });
    $('#dob1').datetimepicker({
        viewMode: 'years',
        format: 'YYYY-MM-DD'
    });
    checkMobile();
    getProfile();
    getDesignations();
    getDepartments();
    requestGetOrganisationListToSelectBox();
    changeOrg();
    setActive('#teacher-page');
});