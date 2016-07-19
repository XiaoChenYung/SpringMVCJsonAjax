$(document).ready(function ()
{
    $('#min-temperature').jStepper({minValue: -20, maxValue: 99.9, maxLength: 5, normalStep: 0.1, decimalSeparator: ".", maxDecimals: 1, allowDecimals: true});
    $('#max-temperature').jStepper({minValue: -19.9, maxValue: 100.0, maxLength: 5, normalStep: 0.1, decimalSeparator: ".", maxDecimals: 1, allowDecimals: true});
    $('#max-device-on-chart').jStepper({minValue: 0, maxValue: 10, maxLength: 2, minLength: 1, normalStep: 1, allowDecimals: false});
    getConfig();
});
checkFormConfig = function ()
{
    $(document).ready(function () {
        updateConfig();
    });
}
function updateConfig() {
    var minTemperature = $('#min-temperature').val();
    var maxTemperature = $('#max-temperature').val();
    if (minTemperature != '' && maxTemperature != '') {
        if (minTemperature > maxTemperature) {
            notify('danger', '<strong>Error</strong> Gía trị nhiệt độ thấp nhất không được vượt quá nhiệt độ cao nhất !!!');
            return;
        }
    }
    var dataString = $("#frmConfig").serialize();
    $("#btnUpdateConfig").prop('disabled', true);
    $.ajax({
        type: "POST",
        url: '/rest/updateConfig',
        data: dataString,
        cache: false,
        dataType: "json",
        beforeSend: function () {
            //$("#btnUpdateProfile").val('Đang lưu...');
        },
        success: function (data) {
            $("#btnUpdateConfig").prop('disabled', false);
            if (data.error_code == 0) {
                notify('success', '<strong>Success</strong> ' + data.error_message + ' !!!');
            } else {
                notify('danger', '<strong>Error</strong> ' + data.error_message + ' !!!');
            }
        }
    });
}
function getConfig() {
    $.ajax({
        type: 'GET',
        url: '/rest/getConfig',
        dataType: "json", // data type of response
        success: function (data) {
            if (data.error_code == 0) {
                if (data.config != null && data.config != 'undefined') {
                    var config = data.config
                    $('#min-temperature').val(config.minTemperature);
                    $('#max-temperature').val(config.maxTemperature);
                    $('#max-device-on-chart').val(config.maxDeviceDisplay);
                }
            }
        }
    });
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