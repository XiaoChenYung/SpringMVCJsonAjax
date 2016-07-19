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
    if (!checkValidateStd()) {
        return;
    }
    checkMobileStd();
    var url_submit = './api/student/update/';
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
                                getProfileStudent();
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
                getProfileStudent();
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
    $("#oidStd").html(options);
    if (idUser != -1) {// not admin
        $('#frmModal #oidStd').val(idUser);
        $('#frmModal #oidStd').attr('disabled', true);
    }
}

function getShift(data) {
    var options = '<option value="-1" selected >Please select shift</option>';
    $.each(data, function (index, shift) {
        options += '<option value="' + shift.shiftsch + '">' + shift.shift + '</option>';
    });
    $("#shiftStd").html(options);
    if (currentShift != '') {
        $("#shiftStd").val(currentShift);
    }
}
function changeOrgById(oid) {
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
function getOrganisationById() {
    var oid = $("#oid").val();
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

function checkValidateStd(actionType) {
    if (!checkUsername('#login', ' Your Login is not valid. Only characters A-Z, a-z and ' + ' are  acceptable. ')) {
        return false;
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

function getProfileStudent() {
    var userId = $("#userId").val();
    //var dataString = $user_id;
    $.ajax({
        type: "GET",
        url: "./api/profile_student/getProfile/1?userId=" + userId,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            //$("#submit").val('Connecting...');
        },
        success: function (data) {
            if (data.error_code == 0) {
                var student = data.student;
                $('#frmModal #sid').val(student.sid);
                $('#frmModal #userId').val(userId);
                $('#frmModal #login').val(student.login);
                $('#frmModal #password').val('');
                $('#frmModal #oid').val(student.oid);
                $('#frmModal #oidStd').val(student.oid);
                $('#frmModal #organisation').val(student.organisation);
                $('#frmModal #name').val(student.name);
                if (student.mobile === null) {
                    student.mobile = '';
                }
                $('#frmModal #mobile').val(student.mobile);
                if (student.email === null) {
                    student.email = '';
                }
                $('#frmModal #email').val(student.email);
                $('#frmModal #address').val(student.address);
                $('#frmModal #dob').val(student.dob);
                $('#frmModal #valid').val(student.valid);
                $('#frmModal #rollNo').val(student.rollNo);
                $('#frmModal #enrollNo').val(student.enrollNo);
                $('#frmModal #caste').val(student.caste);
                $('#frmModal #standard').val(student.standard);
                $('#frmModal #sectionStd').val(student.sectionStd);
                $('#frmModal #blood').val(student.blood);
                $('#frmModal #rfidNo').val(student.rfidNo);
                changeOrgById(student.oid);
                currentShift = student.shiftsch;
                $('#frmModal #shiftsch').val(student.shiftsch);
                $('#frmModal #shiftStd').val(student.shiftStd);
                $('#frmModal #gender').val(student.gender);
                $('#frmModal #religion').val(student.religion);
                $('#frmModal #picture').val(student.picture);
                $('#frmModal #mobileU').val(student.mobile);
                $('#frmModal #mobileF').val(student.fMobile);
                $('#frmModal #mobileM').val(student.mMobile);
                $('#frmModal #sessionStd').val(student.sessionStd);
                $('#frmModal #lastSch').val(student.lastSch);
                $('#frmModal #classStd').val(student.classStd);
                $('#frmModal #marks').val(student.marks);
                $('#frmModal #reason').val(student.reason);
                $('#frmModal #fName').val(student.fName);
                $('#frmModal #fMobile').val(student.fMobile);
                $('#frmModal #fEmail').val(student.fEmail);
                $('#frmModal #fOccupation').val(student.fOccupation);
                $('#frmModal #fIncome').val(student.fIncome);
                $('#frmModal #fPic').val(student.fPic);
                $('#frmModal #mName').val(student.mName);
                $('#frmModal #mMobile').val(student.mMobile);
                $('#frmModal #mEmail').val(student.mEmail);
                $('#frmModal #mOccupation').val(student.mOccupation);
                $('#frmModal #mIncome').val(student.mIncome);
                $('#frmModal #mPic').val(student.mPic);
                if (student.alertType === null || student.alertType === '') {
                    $("#frmModal #alertTypeSMS").prop("checked", false);
                    $("#frmModal #alertTypeEmail").prop("checked", false);
                    $("#frmModal #alertTypeNotification").prop("checked", false);
                } else {
                    $("#frmModal #alertTypeSMS").prop("checked", student.alertType.SMS);
                    $("#frmModal #alertTypeEmail").prop("checked", student.alertType.Email);
                    $("#frmModal #alertTypeNotification").prop("checked", student.alertType.Notification);
                }
                if (checkNull(student.lastSch) && checkNull(student.classStd) && checkNull(student.marks) && checkNull(student.reason)) {
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
                checkMobileStd();
                if (student.picture !== '') {
                    $('#frmModal #prviewLogoDiv').show();
                    $('#frmModal #prviewLogo').attr('src', 'uploads/' + student.picture);
                    $('.logoHeader').attr('src', 'uploads/' + student.picture);
                    $('#logoLeft').attr('src', 'uploads/' + student.picture);
                } else {
                    $('#frmModal #prviewLogo').attr('src', '');
                }
                $('.organisation').text(student.name);
                $("#loginDiv").text(student.login);
                if (student.picture !== '') {
                    $('.logoHeader').attr('src', 'uploads/' + student.picture);
                    $('#logoLeft').attr('src', 'uploads/' + student.picture);
                }
            }

        }
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
        altField: '#valid',
        altFormat: 'yy-mm-dd'
    });
    $('#dob1').datetimepicker({
        viewMode: 'years',
        format: 'YYYY-MM-DD'
    });
    checkMobileStd();
    requestGetOrganisationListToSelectBox();
    changeOld();
    getProfileStudent();
});