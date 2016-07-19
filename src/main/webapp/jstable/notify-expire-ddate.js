$(document).ready(function () {
    getDeviceByUserForNotification();
});

function getDeviceByUserForNotification() {
    $.ajax({
        type: 'GET',
        url: '/rest/getDeviceByUserForNotification',
        dataType: "json", // data type of response
        success: showRemainingOfDevicesForEachUser
    });
}
function showRemainingOfDevicesForEachUser(dataList) {
    if (dataList != null && dataList.error_code != null && dataList.error_code == 0) {
        var list = dataList == null ? [] : (dataList.device instanceof Array ? dataList.device : [dataList.device]);
        if (list.length == 0) {
            return;
        }
        var notifyMessage = '';
        $.each(list, function (index, device) {
            var remainingDay = 0;
            try {
                var oldDateDevice = device.expiryDate.split("-");
                var oldDateDeviceReformat = oldDateDevice[0] + "/" + oldDateDevice[1] + "/" + oldDateDevice[2];
                var datetimeDeviceUnixTime = new Date(oldDateDeviceReformat).getTime();
                var currentUnixTime = new Date().getTime();
                var distance = datetimeDeviceUnixTime - currentUnixTime;
                remainingDay = Math.floor(distance / (24 * 60 * 60 * 1000));
            } catch (e) {
                console.log(e);
            }

            if (remainingDay >= 0) {
                notifyMessage = notifyMessage + 'Thiết bị <strong>' + device.deviceName + '</strong> còn <strong style="color:blue">' + remainingDay + '</strong> ngày sử dụng. </br>';
            }

        });
        if (notifyMessage != '') {
            notify('success', notifyMessage);
        }
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
        timer: 9000,
        z_index: 9999
    });
}