(function ($) {
    "use strict";

    /*	Table OF Contents
	==========================
	
	1-Navigation
	2-Sticky
	3-sliders
	4-Blog layout
	5-Contact
	6-Portfolio Filtring/Popup
	7-Animations
	8-Statistics Handling (Records)
	9-Google Maps
  /*===================
    1-Navigation
    ===================*/

    var leftPos, newWidth, isNavClicked = false,
        $mainNav_animate = $(".navbar-nav");

    $mainNav_animate.append("<li id='XV-lamp'></li>");
    var $animation_tool = $("#XV-lamp");

    $animation_tool
        .width($(".active").width())
        .css("left", $(".active").position().left)
        .data("origLeft", $(".active").position().left)
        .data("origWidth", $animation_tool.width());

    function xv_lava($el, speed) {
        leftPos = $el.position().left;
        newWidth = $el.width();
        $animation_tool.stop().animate({
            left: leftPos,
            width: newWidth,
        }, speed);
    }

    $(".navbar-nav a[href^='#']").click(function () {
        isNavClicked = true;
        $('.navbar-nav li').removeClass('active');
        $(this).parent().addClass('active');
        xv_lava($(this).parent(), 1000);
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 30
        }, 1500, function () {
            isNavClicked = false;
        });
        return false;
    });

    $(window).scroll(function () {
        if (!isNavClicked) {
            xv_lava($(".navbar-nav li.active"), 800);
        }
        if ($(window).scrollTop() >= 100) {


            if (!$("#sticktop").hasClass('slideInDown')) {
                $("#sticktop").addClass('animated slideInDown nav-shadow').removeClass('stickyNav');
            }
        } else if ($(window).scrollTop() <= 1) {
            if ($("#sticktop").hasClass('slideInDown')) {
                $("#sticktop").removeClass('animated slideInDown nav-shadow').addClass('stickyNav');
            }
        }

    });

    $('.navbar-nav li').hover(
        function () {
            if (!$(this).parent().hasClass('dropdown-menu')) {
                xv_lava($(this), 400);
            }
        }, function () {
            xv_lava($(".navbar-nav li.active"), 400);
        });


    $('ul.nav li.dropdown').click(
        function () {

            var state = $(this).data('toggleState');
            if (state) {
                $(this).children('ul.dropdown-menu').slideUp();
            } else {
                $(this).children('ul.dropdown-menu').slideDown();
            }
            $(this).data('toggleState', !state);
        });


    /*===================
    2-Sticky
    ===================*/
    $(window).on("resize", function () {
        xv_lava($(".navbar-nav li.active"), 100);
        $("#sticktop").sticky({
            topSpacing: 0
        });
    }).resize();

    /*===================
    3- sliders
    ===================*/

    $('.about-wrapper').carouFredSel({
        width: "100%",
        circular: false,
        infinite: false,
        auto: false,
        scroll: {
            items: 1,
            easing: "linear"
        },
        prev: {
            button: "#phase-prev",
            key: "left"
        },
        next: {
            button: "#phase-next",
            key: "right"
        }
    });

    $('.team-wrapper').carouFredSel({
        width: "100%",
        circular: false,
        auto: false,
        scroll: {
            items: 1,
            easing: "linear"
        },
        prev: {
            button: "#member-prev",
            key: "left"
        },
        next: {
            button: "#member-next",
            key: "right"
        }
    });

    $('#home-slider').flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: true,
        pauseOnHover: true,
        slideshowSpeed: 4000,
        direction: "horizontal" //Direction of slides
    });



    /*===================
	4 - Blog layout
	===================*/

    function onImagesLoaded($container, callback) {
        $container.before("<div class='load-img'></div>");
        var $images = $container.find("img");
        var imgCount = $images.length;
        if (!imgCount) {
            $('.load-img').hide();
            callback();
        } else {
            $("img", $container).each(function () {
                $(this).one("load error", function () {
                    imgCount--;
                    if (imgCount === 0) {
                        $('.load-img').hide();
                        callback();
                    }
                });
                if (this.complete) $(this).load();
            });
        }
    }

    onImagesLoaded($(".masonry-container"), function () {

        var $container = $('.masonry-container');
        $container.show();
        $container.masonry({
            itemSelector: '.post-unit'
        });

    });

    $('a.add-reply').click(function () {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 70
        }, 1000);
        return false;
    });

    /*===================
    5 - Contact
    ===================*/

    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }


    $("#contactform").submit(function () {
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();
        var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;

        if (name === '' || !IsEmail(email) || subject === '' || message === '') {
            $('#valid-issue').html('Please Provide Valid Information').show();
        } else {
            $.ajax({
                type: "POST",
                url: "/contact",
                data: dataString,
                success: function () {
                    $('#contactform').hide();
                    $('#valid-issue').html('Your message has been sent,<BR> We will contact you back with in next 24 hours.').show();
                }
            });
        }
        return false;
    });


    /*===================
    6 -Portfolio Filtring/Popup
    ===================*/
    $('#Grid').mixitup({
        targetSelector: '.project',
        effects: ['scale'],
        easing: 'snap',
        transitionSpeed: 500,
    });

    $("a[data-rel^='prettyPhoto']").prettyPhoto();

    /*===================
    7 - Animations
    ===================*/


    $('.work-phase .hover').hover(function (e) {
        $(this).children('h2').addClass('fadeInDown animated');
        $(this).children('.btn').addClass('fadeInUpBig animated');
        $(this).children('span').addClass('bounceInDown animated');
    }, function (e) {
        $(this).children('h2').removeClass('fadeInDown animated');
        $(this).children('.btn').removeClass('fadeInUpBig animated');
        $(this).children('span').removeClass('bounceInDown animated');
    });

    $('.flip-container').eq(0).addClass('hover');

    $('.flip-container').hover(function () {
        $('.flip-container').removeClass('hover');
        $(this).addClass('hover');
    });


    $('.record').bind('inview', function (event, visible) {
        if (visible === true) {
            if (!$('.record').hasClass('animated')) {
                growRecords();
            }
            $('.record').addClass('fadeInRight animated');
        }
    });

    /*================================
	8 - Statistics Handling (Records)
	================================*/
    function growRecords() {
        $('#records .stat').each(function () {
            var container = $(this);
            var total = container.attr('data-total');
            looper(total, container, 1200);
        });
    }

    function looper(total, target, duration) {
        if (duration) {
            var counter = 1;
            var step = parseInt(total / 1000);
            var speed = parseInt(duration / total);
            var interval = setInterval(function () {
                if (counter <= total) {
                    target.html(counter);
                } else {
                    target.html(total);
                    clearInterval(interval);
                }
                counter+=(step+1);
            }, speed);
        } else {
            target.html(total);
        }
    }

    /*================================
	9-Google Maps
	================================*/

    if ($('#contact-map').length) {
        var contact_map = 'contact-map',
            mapAddress = $('#contact-map').data('address'),
            mapType = $('#contact-map').data('maptype'),
            zoomLvl = $('#contact-map').data('zoomlvl');
        contactemaps(contact_map, mapAddress, mapType, zoomLvl);

    }

    function contactemaps(selector, address, type, zoom_lvl) {
        var map = new google.maps.Map(document.getElementById(selector), {
            mapTypeId: google.maps.MapTypeId.type,
            scrollwheel: false,
            draggable: false,
            zoom: zoom_lvl,
        });
        var map_pin = "assets/img/basic/map-pin.png";
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
                'address': address
            },
            function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        icon: map_pin
                    });
                    map.setCenter(results[0].geometry.location);



                }
            });
    }



})(jQuery);