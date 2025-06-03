// AOS initialization
AOS.init({
    duration: 800,
    easing: 'slide'
});

// Wrapper untuk jQuery
(function($) {

    "use strict";

    // Stellar.js for parallax scrolling (Jika Anda tidak ingin parallax, Anda juga bisa menghapus bagian ini)
    $(window).stellar({
        responsive: true,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: 'scroll',
        horizontalOffset: 0,
        verticalOffset: 0
    });

    // Scrollax initialization (Jika Anda tidak menggunakan efek Scrollax, Anda juga bisa menghapus bagian ini)
    $.Scrollax();


    // Function to set full height elements
    var fullHeight = function() {
        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function(){
            $('.js-fullheight').css('height', $(window).height());
        });
    };
    fullHeight();

    // Loader function
    var loader = function() {
        setTimeout(function() {
            if($('#ftco-loader').length > 0) {
                $('#ftco-loader').removeClass('show');
            }
        }, 1);
    };
    loader();

    // Scrollax (duplicated, remove one if not needed) - MENGHAPUS SALAH SATU JIKA MEMANG DUPLIKAT
    // $.Scrollax(); // Sudah ada di atas

    // Carousel function (Owl Carousel)
    var carousel = function() {
        $('.home-slider').owlCarousel({
            loop:true,
            autoplay: true,
            margin:0,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav:false,
            autoplayHoverPause: false,
            items: 1,
            navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:false
                }
            }
        });
        $('.carousel-work').owlCarousel({
            autoplay: true,
            center: true,
            loop: true,
            items:1,
            margin: 30,
            stagePadding:0,
            nav: true,
            navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
            responsive:{
                0:{
                    items: 1,
                    stagePadding: 0
                },
                600:{
                    items: 2,
                    stagePadding: 50
                },
                1000:{
                    items: 3,
                    stagePadding: 100
                }
            }
        });
    };
    carousel();

    // Dropdown hover effect
    $('nav .dropdown').hover(function(){
        var $this = $(this);
        $this.addClass('show');
        $this.find('> a').attr('aria-expanded', true);
        $this.find('.dropdown-menu').addClass('show');
    }, function(){
        var $this = $(this);
        $this.removeClass('show');
        $this.find('> a').attr('aria-expanded', false);
        $this.find('.dropdown-menu').removeClass('show');
    });

    $('#dropdown04').on('show.bs.dropdown', function () {
        console.log('show');
    });

    // Scroll window effect (navbar hide/show)
    var scrollWindow = function() {
        $(window).scroll(function(){
            var $w = $(this),
                st = $w.scrollTop(),
                navbar = $('.ftco_navbar'),
                sd = $('.js-scroll-wrap');

            if (st > 150) {
                if ( !navbar.hasClass('scrolled') ) {
                    navbar.addClass('scrolled');
                }
            }
            if (st < 150) {
                if ( navbar.hasClass('scrolled') ) {
                    navbar.removeClass('scrolled sleep');
                }
            }
            if ( st > 350 ) {
                if ( !navbar.hasClass('awake') ) {
                    navbar.addClass('awake');
                }

                if(sd.length > 0) {
                    sd.addClass('sleep');
                }
            }
            if ( st < 350 ) {
                if ( navbar.hasClass('awake') ) {
                    navbar.removeClass('awake');
                    navbar.addClass('sleep');
                }
                if(sd.length > 0) {
                    sd.removeClass('sleep');
                }
            }
        });
    };
    scrollWindow();

    // One Page Navigation
    var OnePageNav = function() {
        $(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
            e.preventDefault();

            var hash = this.hash,
                navToggler = $('.navbar-toggler');
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, 'easeInOutExpo', function(){
                window.location.hash = hash;
            });

            if ( navToggler.is(':visible') ) {
                navToggler.click();
            }
        });
        $('body').on('activate.bs.scrollspy', function () {
            console.log('nice');
        })
    };
    OnePageNav();

    $('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: true,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1]
        },
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });

    // MENGHAPUS: .popup-gmaps dari selector
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });


    // notifikasi js
    const notification = document.getElementById('notification');
    const form = document.getElementById('saran'); 

    // Dapatkan URL saat ini
    const urlParams = new URLSearchParams(window.location.search);

    // Cek apakah ada parameter 'submit=true'
    if (urlParams.has('submit') && urlParams.get('submit') === 'true') {
        // Tampilkan pesan sukses
        notification.textContent = 'Pesan Anda berhasil terkirim! Terima kasih atas kritik dan saran Anda.';
        notification.classList.add('success');
        notification.style.display = 'block';

        // Opsional: Sembunyikan form setelah sukses, atau reset form
        // form.style.display = 'none';
        form.reset(); // Mengosongkan field form

        // Hapus parameter dari URL agar tidak muncul lagi saat di-refresh
        window.history.replaceState({}, document.title, window.location.pathname);
    }

})(jQuery); // Akhir dari jQuery wrapper