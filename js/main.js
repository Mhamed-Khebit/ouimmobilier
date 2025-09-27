(function ($) {
    "use strict";
    

    // navbarCollapse
    $(document).ready(function () {
        var checkbox = $('#check'); // hamburger checkbox
    
        function closeNavbar() {
            $('.navbar-collapse').collapse('hide');
            if (checkbox.length) {
                checkbox.prop('checked', false); // reset hamburger
            }
            $('.navbar-toggler').addClass('collapsed');
            $('.navbar-toggler').attr('aria-expanded', 'false'); 
        }
    
        // Close menu when clicking on links (except Traduction)
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
    
    

    $(document).ready(function(){
        function adjustPadding(){
          var topbarHeight = $('.topbar').outerHeight() || 0;
          var navbarHeight = $('.navbar').outerHeight() || 0;
          $('body').css('padding-top', topbarHeight + navbarHeight + 'px');
        }
      
        adjustPadding();
        $(window).resize(adjustPadding); // update f resize
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

