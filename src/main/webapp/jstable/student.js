var HOST = '.';
var idUser = -1;
var organisation = '';
var mobileUnum = '';
var mobileM = '';
var mobileF = '';
var currentShift = '';
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
    if (alertType !== null && alertType !== 'undefined' && alertType !== 'null' && alertType !== '') {
        var alertTypeSMS = alertType.SMS;
        var alertTypeEmail = alertType.Email;
        var alertTypeNotification = alertType.Notification;
    }
    var html = '<img class = "action_show" src = "./asset/images/details-icon.png" onclick = "showFormModal('
            + "'" + row.sid + "',"
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
            + "'" + row.rollNo + "',"
            + "'" + row.enrollNo + "',"
            + "'" + row.caste + "',"
            + "'" + row.standard + "',"
            + "'" + row.sectionStd + "',"
            + "'" + row.blood + "',"
            + "'" + row.rfidNo + "',"
            + "'" + row.shiftsch + "',"
            + "'" + alertTypeSMS + "',"
            + "'" + alertTypeEmail + "',"
            + "'" + alertTypeNotification + "',"
            + "'" + row.gender + "',"
            + "'" + row.religion + "',"
            + "'" + row.picture + "',"
            + "'" + row.sessionStd + "',"
            + "'" + row.lastSch + "',"
            + "'" + row.classStd + "',"
            + "'" + row.marks + "',"
            + "'" + row.reason + "',"
            + "'" + row.fName + "',"
            + "'" + row.fMobile + "',"
            + "'" + row.fEmail + "',"
            + "'" + row.fOccupation + "',"
            + "'" + row.fIncome + "',"
            + "'" + row.fPic + "',"
            + "'" + row.mName + "',"
            + "'" + row.mMobile + "',"
            + "'" + row.mEmail + "',"
            + "'" + row.mOccupation + "',"
            + "'" + row.mIncome + "',"
            + "'" + row.mPic + "',"
            + "'" + row.valid + "',"
            + "'" + encodeURI(row.dor) + "',"
            + "'" + row.isDirty + "'"
            + ')" >'
            + '<img class = "action_edit" src = "./asset/images/edit-icon.png" onclick = "editFormModal('
            + "'" + row.sid + "',"
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
            + "'" + row.rollNo + "',"
            + "'" + row.enrollNo + "',"
            + "'" + row.caste + "',"
            + "'" + row.standard + "',"
            + "'" + row.sectionStd + "',"
            + "'" + row.blood + "',"
            + "'" + row.rfidNo + "',"
            + "'" + row.shiftsch + "',"
            + "'" + alertTypeSMS + "',"
            + "'" + alertTypeEmail + "',"
            + "'" + alertTypeNotification + "',"
            + "'" + row.gender + "',"
            + "'" + row.religion + "',"
            + "'" + row.picture + "',"
            + "'" + row.sessionStd + "',"
            + "'" + row.lastSch + "',"
            + "'" + row.classStd + "',"
            + "'" + row.marks + "',"
            + "'" + row.reason + "',"
            + "'" + row.fName + "',"
            + "'" + row.fMobile + "',"
            + "'" + row.fEmail + "',"
            + "'" + row.fOccupation + "',"
            + "'" + row.fIncome + "',"
            + "'" + row.fPic + "',"
            + "'" + row.mName + "',"
            + "'" + row.mMobile + "',"
            + "'" + row.mEmail + "',"
            + "'" + row.mOccupation + "',"
            + "'" + row.mIncome + "',"
            + "'" + row.mPic + "',"
            + "'" + row.valid + "',"
            + "'" + encodeURI(row.dor) + "',"
            + "'" + row.isDirty + "'"
            + ')" >';
    if (row.isDirty == 0) {
        html = html + '<img class = "action_delete" src = "./asset/images/delete-icon.png" onclick = "updateStatusDeleteRestore('
                + "'" + row.sid + "',"
                + "'" + 1 + "'"
                + ')" >';
    } else {
        html = html + '<img class = "action_delete" src = "./asset/images/restore-icon.png" onclick = "updateStatusDeleteRestore('
                + "'" + row.sid + "',"
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
    $('#account-modal-title').html('Add Student');
    $('#frmModal #actionType').val('ACTION_ADD');
    if (idUser != -1) {
        $('#frmModal #oid').val(idUser);
        $('#frmModal #oid').attr('disabled', true);
        getOrganisationById();
    } else {
        $('#frmModal #oid').val(-1);
    }
    $('#frmModal #sid').val('');
    $('#frmModal #userId').val('');
    $('#frmModal #login').val('');
    $('#frmModal #password').val('');

    $('#frmModal #organisation').val('');
    $('#frmModal #name').val('');
    $('#frmModal #dob').val('');
    $('#frmModal #mobile').val('');
    $('#frmModal #email').val('');
    $('#frmModal #address').val('');
    $('#frmModal #rollNo').val('');
    $('#frmModal #enrollNo').val('');
    $('#frmModal #caste').val('Caste');
    $('#frmModal #standard').val(-1);
    $('#frmModal #sectionStd').val(-1);
    $('#frmModal #blood').val('A+');
    $('#frmModal #rfidNo').val('');
    $('#frmModal #shiftsch').val(-1);
    $('#frmModal #gender').val('');
    $('#frmModal #religion').val(-1);
    $('#frmModal #picture').val('');
    $('#frmModal #sessionStd').val(-1);
    $('#frmModal #lastSch').val('');
    $('#frmModal #classStd').val('');
    $('#frmModal #marks').val('');
    $('#frmModal #reason').val('');
    $('#frmModal #fName').val('');
    $('#frmModal #fMobile').val('');
    $('#frmModal #fEmail').val('');
    $('#frmModal #fOccupation').val('');
    $('#frmModal #fIncome').val('');
    $('#frmModal #fPic').val('');
    $('#frmModal #mName').val('');
    $('#frmModal #mMobile').val('');
    $('#frmModal #mEmail').val('');
    $('#frmModal #mOccupation').val('');
    $('#frmModal #mIncome').val('');
    $('#frmModal #mPic').val('');
    $("#frmModal #alertTypeSMS").prop("checked", false);
    $("#frmModal #alertTypeEmail").prop("checked", false);
    $("#frmModal #alertTypeNotification").prop("checked", false);
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
                var $table = $('#tableStudent');
                $table.bootstrapTable('refresh');
            } else {
                notify('danger', '<strong>Error</strong> ' + data.error_message + ' !!!');
            }

        }
    });
});
function editFormModal(
        sid
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
        , rollNo
        , enrollNo
        , caste
        , standard
        , sectionStd
        , blood
        , rfidNo
        , shiftsch
        , alertTypeSMS
        , alertTypeEmail
        , alertTypeNotification
        , gender
        , religion
        , picture
        , sessionStd
        , lastSch
        , classStd
        , marks
        , reason
        , fName
        , fMobile
        , fEmail
        , fOccupation
        , fIncome
        , fPic
        , mName
        , mMobile
        , mEmail
        , mOccupation
        , mIncome
        , mPic
        , valid
        , dor
        , isDirty
        ) {
    mobileUnum = mobile;
    mobileF = fMobile;
    mobileM = mMobile;
    showFormModal(
            sid
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
            , rollNo
            , enrollNo
            , caste
            , standard
            , sectionStd
            , blood
            , rfidNo
            , shiftsch
            , alertTypeSMS
            , alertTypeEmail
            , alertTypeNotification
            , gender
            , religion
            , picture
            , sessionStd
            , lastSch
            , classStd
            , marks
            , reason
            , fName
            , fMobile
            , fEmail
            , fOccupation
            , fIncome
            , fPic
            , mName
            , mMobile
            , mEmail
            , mOccupation
            , mIncome
            , mPic
            , valid
            , dor
            , isDirty
            );
    var images = $("#images"); // in order to clear old input file, if not if still keeps old image when open modal
    images.replaceWith(images = images.clone(true));
    $('#account-modal-title').html('Edit Student');
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
    $('#frmModal #sid').attr("disabled", isEnable);
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
    $('#frmModal #rollNo').attr("disabled", isEnable);
    $('#frmModal #enrollNo').attr("disabled", isEnable);
    $('#frmModal #caste').attr("disabled", isEnable);
    $('#frmModal #standard').attr("disabled", isEnable);
    $('#frmModal #sectionStd').attr("disabled", isEnable);
    $('#frmModal #blood').attr("disabled", isEnable);
    $('#frmModal #rfidNo').attr("disabled", isEnable);
    $('#frmModal #shiftsch').attr("disabled", isEnable);
    $('#frmModal #gender').attr("disabled", isEnable);
    $('#frmModal #religion').attr("disabled", isEnable);
    $('#frmModal #picture').attr("disabled", isEnable);
    $('#frmModal #sessionStd').attr("disabled", isEnable);
    $('#frmModal #lastSch').attr("disabled", isEnable);
    $('#frmModal #classStd').attr("disabled", isEnable);
    $('#frmModal #marks').attr("disabled", isEnable);
    $('#frmModal #reason').attr("disabled", isEnable);
    $('#frmModal #fName').attr("disabled", isEnable);
    $('#frmModal #fMobile').attr("disabled", isEnable);
    $('#frmModal #fEmail').attr("disabled", isEnable);
    $('#frmModal #fOccupation').attr("disabled", isEnable);
    $('#frmModal #fIncome').attr("disabled", isEnable);
    $('#frmModal #fPic').attr("disabled", isEnable);
    $('#frmModal #mName').attr("disabled", isEnable);
    $('#frmModal #mMobile').attr("disabled", isEnable);
    $('#frmModal #mEmail').attr("disabled", isEnable);
    $('#frmModal #mOccupation').attr("disabled", isEnable);
    $('#frmModal #mIncome').attr("disabled", isEnable);
    $('#frmModal #mPic').attr("disabled", isEnable);
    $('#frmModal #alertType').attr("disabled", isEnable);
}
function showFormModal(
        sid
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
        , rollNo
        , enrollNo
        , caste
        , standard
        , sectionStd
        , blood
        , rfidNo
        , shiftsch
        , alertTypeSMS
        , alertTypeEmail
        , alertTypeNotification
        , gender
        , religion
        , picture
        , sessionStd
        , lastSch
        , classStd
        , marks
        , reason
        , fName
        , fMobile
        , fEmail
        , fOccupation
        , fIncome
        , fPic
        , mName
        , mMobile
        , mEmail
        , mOccupation
        , mIncome
        , mPic
        , valid
        , dor
        , isDirty
        ) {
    console.log('showFormModal is called with sid=' + sid);
    if (sid == null || sid == "") {
        return;
    }
    mobileUnum = mobile;
    //var modal = $('#editAccountModal');
    $('#account-modal-title').html('View student');
    $('#frmModal #actionType').val('ACTION_NONE');
    $('#frmModal #sid').val(sid);
    $('#frmModal #userId').val(userId);
    $('#frmModal #login').val(login);
    $('#frmModal #password').val(password);
    $('#frmModal #oid').val(oid);
    $('#frmModal #organisation').val(organisation);
    $('#frmModal #organisation').val(organisation);
    $('#frmModal #name').val(name);
    if (mobile === null) {
        mobile = '';
    }
    $('#frmModal #mobile').val(mobile);
    if (email === null) {
        email = '';
    }
    $('#frmModal #email').val(email);
    $('#frmModal #address').val(address);
    $('#frmModal #dob').val(dob);
    $('#frmModal #rollNo').val(rollNo);
    $('#frmModal #enrollNo').val(enrollNo);
    $('#frmModal #caste').val(caste);
    $('#frmModal #standard').val(standard);
    $('#frmModal #sectionStd').val(sectionStd);
    $('#frmModal #blood').val(blood);
    $('#frmModal #rfidNo').val(rfidNo);
    currentShift = shiftsch;
    $('#frmModal #shiftsch').val(shiftsch);
    $('#frmModal #gender').val(gender);
    $('#frmModal #religion').val(religion);
    $('#frmModal #picture').val(picture);
    $('#frmModal #sessionStd').val(sessionStd);
    if (checkNull(lastSch) && checkNull(classStd) && checkNull(marks) && checkNull(reason)) {
        $('#oldinfo').attr('checked', false);
        $('#olddiv1').hide();
        $('#olddiv2').hide();
        $('#olddiv5').hide();
    } else {
        $('#oldinfo').attr('checked', true);
        $('#olddiv1').show();
        $('#olddiv2').show();
        $('#olddiv5').show();

    }
    $('#frmModal #lastSch').val(lastSch);
    $('#frmModal #classStd').val(classStd);
    $('#frmModal #marks').val(marks);
    $('#frmModal #reason').val(reason);
    $('#frmModal #fName').val(fName);
    $('#frmModal #fMobile').val(fMobile);
    $('#frmModal #fEmail').val(fEmail);
    $('#frmModal #fOccupation').val(fOccupation);
    $('#frmModal #fIncome').val(fIncome);
    $('#frmModal #fPic').val(fPic);
    $('#frmModal #mName').val(mName);
    $('#frmModal #mMobile').val(mMobile);
    $('#frmModal #mEmail').val(mEmail);
    $('#frmModal #mOccupation').val(mOccupation);
    $('#frmModal #mIncome').val(mIncome);
    $('#frmModal #mPic').val(mPic);
    $("#frmModal #alertTypeSMS").prop("checked", $.parseJSON(alertTypeSMS));
    $("#frmModal #alertTypeEmail").prop("checked", $.parseJSON(alertTypeEmail));
    $("#frmModal #alertTypeNotification").prop("checked", $.parseJSON(alertTypeNotification));

    $('#frmModal #valid').val(valid);

    $('#frmModal #mobileU').val(mobile);
    $('#frmModal #mobileF').val(fMobile);
    $('#frmModal #mobileM').val(mMobile);

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

function updateStatusDeleteRestore(sid, isDirty) {
    console.log('updateStatusDeleteRestore is called with sid=' + sid);
    if (sid === null || sid === "") {
        return;
    }
    var dataString = 'sid=' + sid + '&isDirty=' + isDirty;
    $.ajax({
        type: "POST",
        url: "./api/student/delete/",
        data: dataString,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            //$("#submit").val('Connecting...');
        },
        success: function (data) {
            if (data.error_code == 0) {
                notify('success', '<strong>Success</strong> ' + data.error_message);
                var $table = $('#tableStudent');
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
    var actionType = $('#frmModal #actionType').val();
    if (!checkValidateStd(actionType)) {
        return;
    }
    checkMobileStd();
    var url_submit = '';

    switch (actionType) {
        case 'ACTION_ADD':
            url_submit = './api/student/insert/';
            break;
        case 'ACTION_UPDATE':
            url_submit = './api/student/update/';
            break;
        default :
            break;
    }
    var pass = $("#pass").val();
    var tmp = false;
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
                    if (checkNull(mobileUnum)) {
                        mobileUnum = $("#mobileU").val();
                    }
                    if (checkNull(mobileF)) {
                        mobileF = $("#mobileF").val();
                    }
                    if (checkNull(mobileM)) {
                        mobileM = $("#mobileM").val();
                    }
                    dataString = dataString + '&mobileUnum=' + mobileUnum + '&mobileF=' + mobileF + '&mobileM=' + mobileM + "&pass=" + pass;
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
                                var $table = $('#tableStudent');
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
    if (checkNull(mobileUnum)) {
        mobileUnum = $("#mobileU").val();
    }
    if (checkNull(mobileF)) {
        mobileF = $("#mobileF").val();
    }
    if (checkNull(mobileM)) {
        mobileM = $("#mobileM").val();
    }
    dataString = dataString + '&mobileUnum=' + mobileUnum + '&mobileF=' + mobileF + '&mobileM=' + mobileM + "&pass=" + pass;
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
                var $table = $('#tableStudent');
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
        var $table = $('#tableStudent');
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
                if (user.type != 'Student') {
                    $('.organisation').html(user.organisation);
                }
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

function changeOld() {
    $("#oldinfo").change(function () {
        if ($('#oldinfo').is(':checked')) {
            $('#olddiv1').show();
            $('#olddiv2').show();
            $('#olddiv5').show();
        } else {
            $('#olddiv1').hide();
            $('#olddiv2').hide();
            $('#olddiv5').hide();
            $('#lastSch').val('');
            $('#classStd').val('');
            $('#marks').val('');
            $('#reason').val('');
        }
    });
}

function checkValidateStd() {
    if (!checkUsername('#login', ' Your Login is not valid. Only characters A-Z, a-z and ' + ' are  acceptable. ')) {
        return false;
    }
    var actionType = $('#actionType').val();
    if (actionType === 'ACCOUNT_ADD') {
        if (!checkInput('#password', ' Password is empty ')) {
            return false;
        }
    }
    if ($('#email').val() !== null) {
        if (!isValidEmailAddress('#email', ' Email is validate ')) {
            return false;
        }
    }
    if (!checkInput('#oid', ' Organisation is empty ')) {
        return false;
    }
    if (!checkInput('#name', ' Fullname is empty ')) {
        return false;
    }

    if (!checkInput('#valid', '  Valid till is empty ')) {
        return false;
    }

    if (actionType === 'ACCOUNT_ADD') {
        if (!checkInput('#images', ' Picture is empty ')) {
            return false;
        }
    }

    if (!checkInput('#rollNo', ' Roll Number is empty ')) {
        return false;
    }
    if (!checkInput('#rfidNo', ' RFID Number is empty ')) {
        return false;
    }

    if (!checkInput('#shiftsch', ' Shift name is empty ')) {
        return false;
    }

    if (!checkInput('#standard', ' Standard is empty ')) {
        return false;
    }

    if (!checkInput('#sectionStd', ' Section  is empty ')) {
        return false;
    }

    if (!checkInput('#sessionStd', ' Session is empty ')) {
        return false;
    }

    if (!checkInput('#fName', ' Father Name is empty     ')) {
        return false;
    }

    if (!checkInput('#fMobile', ' Father Mobile Number  is empty ')) {
        return false;
    }

    if (!isValidEmailAddress('#fEmail', ' Father Email is validate ')) {
        return false;
    }
    return true;
}

function checkMobileStd() {
    $.mask.definitions['~'] = "[+-]";
    $("#mobile").mask("(+99) 9999999999");
    $("#mobile").blur(function () {
        mobileUnum = $("#mobile").mask();
    }).dblclick(function () {
        $(this).unmask();
    });
    $("#mMobile").mask("(+99) 9999999999");
    $("#mMobile").blur(function () {
        mobileM = $("#mMobile").mask();
    }).dblclick(function () {
        $(this).unmask();
    });
    $("#fMobile").mask("(+99) 9999999999");
    $("#fMobile").blur(function () {
        mobileF = $("#fMobile").mask();
    }).dblclick(function () {
        $(this).unmask();
    });
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
    getProfile();
    getDesignations();
    getDepartments();
    checkMobileStd();
    changeOld();
    requestGetOrganisationListToSelectBox();
    changeOrg();
    setActive('#student-page');
});