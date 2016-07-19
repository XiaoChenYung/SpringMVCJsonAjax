function isValidEmailAddress(id, message) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    var email = $(id).val();
    if (!pattern.test(email)) {
        notify('danger', '<strong>Missing</strong> ' + message + '!!!');
        return false;
    }
    return true;
}
function isValidDomain(domain) {
    if (domain.indexOf('http://') == -1) {
        domain = 'http://' + domain;
    } else if (domain.indexOf('https') == -1) {
        domain = 'http://' + domain;
    }
    var pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return pattern.test(domain);
}

function checkUsername(id, message) {
    var ck_username = /^[a-zA-Z0-9\-.]+$/;
    var username = $(id).val();
    if (!ck_username.test(username)) {
        notify('danger', '<strong>Missing</strong> ' + message + '!!!');
        return false;
    }
    return true;
}
function checkInput(id, message) {
    var value = $(id).val();
    if (value === '' || value === null || value === '-1') {
        notify('danger', '<strong>Missing</strong> ' + message + '!!!');
        $(id).focus();
        return false;
    }
    return true;
}

function  checkFileName(fileName) {
    if (fileName === "jpg" ||
            fileName === "gif" ||
            fileName === "png") {
        return true;
    }
    return false;
}
function checkMobileForm(id) {
    $.mask.definitions['~'] = "[+-]";
    $(id).mask("(+99) 9999999999");
    $(id).blur(function () {
        return $(id).mask();
    }).dblclick(function () {
        $(this).unmask();
    });
}
function checkMobile() {
    $.mask.definitions['~'] = "[+-]";
    $("#mobile").mask("(+99) 9999999999");
    $("#mobile").blur(function () {
        mobileUnum = $("#mobile").mask();
    }).dblclick(function () {
        $(this).unmask();
    });
    $("#fMobile").mask("(+99) 9999999999");
    $("#fMobile").blur(function () {
        mobileF = $("#fMobile").mask();
    }).dblclick(function () {
        $(this).unmask();
    });
    $("#mMobile").mask("(+99) 9999999999");
    $("#mMobile").blur(function () {
        mobileM = $("#mMobile").mask();
    }).dblclick(function () {
        $(this).unmask();
    });
}
function setActive(idactive) {
    var list = ['#organisation-page', '#shift-page', '#employee-page', '#holiday-page', '#leave-page', '#mark-page'];
    for (i = 0; i < list.length; i++) {
        if (idactive === list[i])
            $(idactive).addClass('active');
        else
            $(list[i]).removeClass('active');
    }
}

function checkNull(input) {
    if (input === null || input === '')
        return true;
    else
        return false;
}
function checkValidateOrg() {
    if (!checkUsername('#login', ' Your Login is not valid. Only characters A-Z, a-z and ' + ' are  acceptable.')) {
        return false;
    }
    var actionType = $('#frmModal #actionType').val();
    if (actionType === 'ACCOUNT_ADD') {
        if (!checkInput('#password', ' Password is empty ')) {
            return false;
        }
    }
    if (!checkInput('#organisation', ' Organisation name is empty ')) {
        return false;
    }
    if (!checkInput('#mobile', ' Mobile is empty ')) {
        return false;
    }
    if (!isValidEmailAddress('#email', ' Email is empty ')) {
        return false;
    }
    if (!checkInput('#timezone', ' Timezone is empty ')) {
        return false;
    }
    if (!checkInput('#valid', ' Valid till is empty ')) {
        return false;
    }
    if (!checkInput('#name', ' Head Name is empty ')) {
        return false;
    }
    return true;
}
function checkValidateShift() {
    if (!checkInput('#organisation_selectbox', ' Organisation  is empty ')) {
        return false;
    }
    if (!checkInput('#shift', ' Shift is empty ')) {
        return false;
    }
    if (!checkInput('#timeIn', ' Time In is empty ')) {
        return false;
    }
    if (!checkInput('#timeOut', ' Time Out is empty ')) {
        return false;
    }
    if (!checkInput('#shift', ' Shift is empty ')) {
        return false;
    }

    if ($('#frontend_shift_form_lunchonoff').is(':checked')) {
        if (!checkInput('#lunchOn', ' Lunch On is empty ')) {
            return false;
        }
        if (!checkInput('#lunchOff', ' Lunch Off is empty ')) {
            return false;
        }

    }
    if (!checkInput('#timeDiff', ' Time Break  is empty ')) {
        return false;
    }

    if (!$('#frontend_shift_form_lunchonoff').is(':checked')) {
        $('#lunchOn').val('-1');
        $('#lunchOff').val('-1');
    }
    return true;

}

function encryptionMd5(input) {
    var strMD5 = $.md5(input);
    return strMD5;
}
function checkValidate(type) {
    if (!checkInput('#oid', ' Organisation is empty ')) {
        return false;
    }
    if (!checkUsername('#login', ' Your Login is not valid. Only characters A-Z, a-z and ' + ' are  acceptable. ')) {
        return false;
    }
    var actionType = $('#frmModal #actionType').val();
    if (actionType == 'ACCOUNT_ADD') {
        if (!checkInput('#password', ' Password is empty ')) {
            return false;
        }
    }
    if (!checkInput('#name', ' Fullname is empty ')) {
        return false;
    }

    if (!checkInput('#rfidNo', ' RFID Number is empty ')) {
        return false;
    }

    if (!checkInput('#mobile', ' Mobile is empty ')) {
        return false;
    }

    if (!isValidEmailAddress('#email', ' Email wrong format ')) {
        return false;
    }

    if (!checkInput('#dob', ' Birthday is empty ')) {
        return false;
    }

    if (!checkInput('#shiftsch', ' Shift name is empty ')) {
        return false;
    }

    if (!checkInput('#valid', '  Valid till is empty ')) {
        return false;
    }
    if (type === 'Employee') {
        if (!checkInput('#employeeNo', ' Employee ID is empty ')) {
            return false;
        }
    } else if (type === 'Teacher') {
        if (!checkInput('#teacherNo', ' Teacher ID is empty ')) {
            return false;
        }
    }
    return true;
}

