(function ($) {
    "use strict";
    

document.addEventListener('contextmenu', function(e) {
    if(e.target.tagName === 'IMG') {
        e.preventDefault(); // kimnna3 right-click
    }
});


    $(document).ready(function () {
    var checkbox = $('#check'); // if you have hamburger checkbox
    
    function closeNavbar() {
        $('.navbar-collapse').collapse('hide');
        if (checkbox.length) {
            checkbox.prop('checked', false); // reset hamburger
        }
        $('.navbar-toggler').addClass('collapsed').attr('aria-expanded', 'false');
        $('body').removeClass('menu-open-overlay');
    }

    // Toggle overlay on menu open/close
    $('#navbarCollapse').on('show.bs.collapse', function() {
        $('body').addClass('menu-open-overlay');
    });
    $('#navbarCollapse').on('hide.bs.collapse', function() {
        $('body').removeClass('menu-open-overlay');
    });

    // Close menu when clicking on links
    $('.navbar-nav a').on('click', function(e) {
        var link = $(this);
        if(!link.hasClass('dropdown-toggle')) {
            if($('.navbar-collapse').hasClass('show')) {
                closeNavbar();
            }
        }
    });

    // Close menu when clicking outside
    $(document).on('click', function(e) {
        var target = $(e.target);
        if(!target.closest('.navbar').length && $('.navbar-collapse').hasClass('show')) {
            closeNavbar();
        }
    });

    // Close menu when scrolling
    $(window).on('scroll', function() {
        if($('.navbar-collapse').hasClass('show')) {
            closeNavbar();
        }
    });
});

    






    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // // Facts counter
    // $('[data-toggle="counter-up"]').counterUp({
    //     delay: 10,
    //     time: 2000
    // });


    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });




    // Service carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        dots: false,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });


    // Pricing carousel
    $(".pricing-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        loop: true,
        dots: false,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);

