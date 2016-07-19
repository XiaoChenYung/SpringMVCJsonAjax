$('.left-sidebar-act').on('click', function() {
    var left = '#left-sidebar';
    var main = '#main-content';
    var lact = '#main-content .left-sidebar-act';
    if ($(left).is(":visible"))
    {
        $(left).hide();
        $(main).removeClass();
        $(main).addClass('col-lg-12');
        $(lact).show();
    }
    else
    {
        $(left).show();
        $(main).removeClass();
        $(main).addClass('col-lg-9');
        $(lact).hide();
    }
});