$(document).bind('scroll', function () {
    var scroll = $(document).scrollTop();
    if(scroll > 40) {
        $('.header').css('padding', '15px');
        $('.header h3').css('margin-top', '-40px');
        $('.header h3').css('opacity', '0');
    } else {
        $('.header').css('padding', '50px');
        $('.header h3').css('margin-top', '0');
        $('.header h3').css('opacity', '1');
    }
});