function clickExport() {
    var type = $('#type').val();
    window.location.href = "./api2/export/ledger_export/?type=" + type;

}
$(document).ready(function () {
    $("#btnLogout").on("click", function () {
        window.location.href = "api/logout";
    });
});
