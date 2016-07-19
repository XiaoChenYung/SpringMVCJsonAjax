var $table = $('#tableReports');
$(function () {
    $table.on('page-change.bs.table', function (e, number, size, search) {
        //getData(number, size, search);
    });
    //var options = $table.bootstrapTable('getOptions');
    //getData(options.pageNumber, options.pageSize, options.search);
});
function getData(number, size, search) {
    var device_id = $("#device-list_selectbox").val();
    var start_date = $("#from-date").val();
    var end_date = $("#to-date").val();
    $.get('./rest/getTemperatureByDeviceAndDateTimeForTable', {
        offset: (number - 1) * size,
        limit: size,
        search: search,
        device_id: device_id,
        start_date: start_date,
        end_date: end_date
    }, function (res) {
        $table.bootstrapTable('load', res);
    });
}
function queryParamsReport() {
    var device_id = $("#device-list_selectbox").val();
    var start_date = $("#from-date").val();
    var end_date = $("#to-date").val();
    //end_date = addDays(end_date, 1);
    var options = $table.bootstrapTable('getOptions');
    //getData(options.pageNumber, options.pageSize, options.search);
    return {
        type: 'owner',
        sort: 'updated',
        direction: 'desc',
        device_id: device_id,
        start_date: start_date,
        end_date: end_date,
        offset: (options.pageNumber - 1) * options.pageSize,
        limit: options.pageSize
    };
}

$(function () {

    $('#device-list_txtSearch').on('click', function () {
        var device_id = $("#device-list_selectbox").val();
        if (device_id == -1) {
            notify('danger', '<strong>Missing</strong> Bạn chưa chọn thiết bị !!!');
            return;
        }
        var start_date = $("#from-date").val();
        var end_date = $("#to-date").val();
        //end_date = addDays(end_date, 1);
        var $table = $('#tableReports');
        $table.bootstrapTable('refresh');
    });
    $('#device-list_txtExport').on('click', function () {
        var device_id = $("#device-list_selectbox").val();
        if (device_id == -1) {
            notify('danger', '<strong>Missing</strong> Bạn chưa chọn thiết bị !!!');
            return;
        }
        var start_date = $("#from-date").val();
        var end_date = $("#to-date").val();
        var min_temperature = $("#min-temperature").val();
        var max_temperature = $("#max-temperature").val();
        //end_date = addDays(end_date, 1);
        window.location.replace("./rest/exportTemperature?device_id=" + device_id + "&start_date=" + start_date + "&end_date=" + end_date
                + "&min-temperature=" + min_temperature + "&max-temperature=" + max_temperature);
    });
    $('#toolbar').find('select').change(function () {
        var $table = $('#tableReports');
        $table.bootstrapTable('refreshOptions', {
            exportDataType: $(this).val()
        });
        $table.bootstrapTable('togglePagination');
        $table.tableExport({type: 'excel', tableName: 'Bảng dữ liệu nhiệt độ theo thời gian',
            worksheetName: 'Báo cáo nhiệt độ',
            fileName: 'Báo cáo nhiệt độ'});
        $table.bootstrapTable('togglePagination');
    });
    formatDateTimePicker();
    requestGetDeviceListToSelectBox();
});
function requestGetDeviceListToSelectBox() {
    $.ajax({
        type: 'GET',
        url: '/rest/getDeviceByUser',
        dataType: "json", // data type of response
        success: renderListDeviceToSelectBox
    });
}
function renderListDeviceToSelectBox(dataList) {
    if (dataList.error_code == 0) {
        var list = dataList == null ? [] : (dataList.device instanceof Array ? dataList.device : [dataList.device]);
        var options = '<option value="-1" >Chọn thiết bị</option>';
        $.each(list, function (index, device) {

            //var deviceDiv = '#device-' + device.deviceId;
            //var temperatureDiv = '#temperature-' + device.deviceId;
            //var dateDiv = '#date-' + device.deviceId;
            //var $deviceId = $(deviceDiv);
            options += '<option value="' + device.deviceId + '">' + device.deviceName + '</option>';
            $("select#device-list_selectbox").html(options);
        });
    }
}
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toString();
}
function addZeroLeading(value) {
    if (value < 10) {
        return '0' + value;
    }
    return value;
}
function formatDateTimePicker() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var currentDay = currentDate.getDate();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();
    var currentSecond = currentDate.getSeconds();

    var today = currentYear + '-' + addZeroLeading(currentMonth + 1) + '-' + addZeroLeading(currentDay) + ' ' + addZeroLeading(currentHour) + ':' + addZeroLeading(currentMinute) + ':' + addZeroLeading(currentSecond);
    var previousDay = currentYear + '-' + addZeroLeading(currentMonth + 1) + '-' + addZeroLeading(currentDay - 1) + ' ' + addZeroLeading(currentHour) + ':' + addZeroLeading(currentMinute) + ':' + addZeroLeading(currentSecond);

    $("#to-date").val(today);
    $("#from-date").val(previousDay);

    $("#to-date").datetimepicker({
        dateFormat: "yy-mm-dd",
        timeFormat: "HH:mm:ss",
        maxDate: 0,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true
    }).bind("change", function () {
        var maxValue = $(this).val();
        maxValue = new Date(maxValue);
        //maxValue.setDate(maxValue.getDate());
        if (maxValue.getDate() > new Date($('#to-date').val())) {
            maxValue = $('#to-date').val();
        }
        $("#from-date").datepicker("option", "maxDate", maxValue);
    });
    $("#from-date").datetimepicker({
        dateFormat: 'yy-mm-dd',
        timeFormat: "HH:mm:ss",
        maxDate: 0,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true
    }).bind("change", function () {

        var minValue = $(this).val();
        minValue = new Date(minValue);
        if (minValue.getDate() < new Date($('#from-date').val())) {
            minValue = $('#from-date').val();
        }
//minValue = $.datepicker.parseDate("yy-mm-dd", minValue);
//("#to-date").datepicker("option", "minDate", minValue);
        /*var maxValue = $('#from-date').val();
         maxValue = $.datepicker.parseDate("yy-mm-dd", maxValue);
         $("#from-date").datepicker("option", "maxDate", maxValue - 1);*/
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

function rowStyle(row, index) {
    var minTemperature = parseFloat($('#min-temperature').val(), 1);
    if (minTemperature == null || minTemperature == '') {
        minTemperature = -20.0;
    }
    var maxTemperature = parseFloat($('#max-temperature').val(), 1);
    if (maxTemperature == null || maxTemperature == '') {
        maxTemperature = 100.0;
    }
    var temperature = parseFloat(row.temperature, 1);
    if ((temperature < minTemperature) || (temperature > maxTemperature)) {
        return {
            classes: 'over-limitation'
        };
    } else {
        return {};
    }

}
$(document).ready(function ()
{
    //$('#min-temperature').jStepper({minValue: -20, maxValue: 99.9, maxLength: 5, normalStep: 0.1, decimalSeparator: ".", maxDecimals: 1, allowDecimals: true});
    //$('#max-temperature').jStepper({minValue: -19.0, maxValue: 100.0, maxLength: 5, normalStep: 0.1, decimalSeparator: ".", maxDecimals: 1, allowDecimals: true});
    getConfig();
});
function getConfig() {
    $.ajax({
        type: 'GET',
        url: '/rest/getConfig',
        dataType: "json", // data type of response
        success: function (data) {
            if (data.error_code == 0) {
                if (data.config != null && data.config != 'undefined') {
                    var config = data.config;
                    $('#min-temperature').val(config.minTemperature);
                    $('#max-temperature').val(config.maxTemperature);
                }
            }
        }
    });
}