function setActive(idactive) {
    var list = ['#organisation-page', '#shift-page', '#employee-page', '#holiday-page', '#leave-page', '#mark-page'];
    for (i = 0; i < list.length; i++) {
        if (idactive === list[i])
            $(idactive).addClass('active');
        else
            $(list[i]).removeClass('active');
    }
}