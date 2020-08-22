//Aos
$(document).ready(function() {
    AOS.init();
    ({
        duration: 1000
    })

})

//Fixed header backgroundcolor change
$(window).on('scroll', function() {

    if ($(window).scrollTop() > 100) {

        $('.navbar').addClass('header-solid animated fadeInDown');
    } else {

        $('.navbar').removeClass('header-solid animated fadeInDown');

    }

});

//navbar brand color change
$(window).on('scroll', function() {

    if ($(window).scrollTop() > 100) {

        $('.navbar-brand').addClass('navbarbrand-color span animated fadeInDown');
    } else {

        $('.navbar-brand').removeClass('navbarbrand-color span animated fadeInDown');

    }

});

//navbar brand color change when background change
$(window).on('scroll', function() {

    if ($(window).scrollTop() > 100) {

        $('.navbar-brand').addClass('navbarbrand-brand span animated fadeInDown');
    } else {

        $('.navbar-brand').removeClass('navbarbrand-brand span animated fadeInDown');

    }

});

//navbar active class color change
$(window).on('scroll', function() {

    if ($(window).scrollTop() > 100) {

        $('.current').addClass('navbar-item active a animated fadeInDown');
    } else {

        $('.current').removeClass('navbar-item active a animated fadeInDown');

    }

});

//humberger toogler
$(document).ready(function() {

    $('.first-button').on('click', function() {

        $('.animated-icon1').toggleClass('open');
    });
    $('.second-button').on('click', function() {

        $('.animated-icon2').toggleClass('open');
    });
    $('.third-button').on('click', function() {

        $('.animated-icon3').toggleClass('open');
    });
});

//
$(document).ready(function() {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        margin: 10,
        nav: true,
        smartSpeed: 800,
        autoplayHoverPause: true,
        loop: true,


        navText: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 2
            }
        }
    });
});


//for scroll fadeout
$(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
        $('.scrollup').fadeIn();
    } else {
        $('.scrollup').fadeOut();


    }
});

//for scroll to top
$('.scrollup').click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, 1000);
    return false;
});

//preloader
$(window).on("load", function() {


    $(".preloader").fadeOut();
});

//sidebar
$(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if (
      $(this)
        .parent()
        .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });
  
  $("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
  });
  
  