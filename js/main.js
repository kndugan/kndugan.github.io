$(document).ready(function(){

  //Preloader
  $(window).load(function() {
    $("#loader").delay(500).fadeOut();
    $("#mask").delay(1000).fadeOut("slow");
  });

  //Navigation Scrolling
  $('a[href*=#]').not('[data-toggle="tab"]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  //Header Animation
  $(document).scroll(function() {
    if ($(document).scrollTop() >= 50) {
      $('#topnav').addClass('scrolled');
    } else {
      $('#topnav').removeClass('scrolled');
    }
  });

  //Close navbar on click
  $('#topnav a').on('click', function(){
    if ($(window).width() < 768) {
      $(".navbar-toggle").click();
    }
  });

  // Home Section Slider
  $('#home-slider').flexslider({
    animation: "fade",
    controlNav: false,
    directionNav: false,
    prevText: "",
    nextText: "",
    slideshowSpeed: 5000,
    before: function () {
      $('#home-slider').find(".slides > li").each(function () {
        var $content = $(this);
        $content.animate({opacity: 0}, 200).animate({top: '-50px'}, 500);
      })
    },
    after: function () {
      $('#home-slider').find(".slides > li.flex-active-slide").each(function () {
        var $content = $(this);
        $content.animate({opacity: 1, top: '0'}, 500);
      })
    },
  });

  //Background Slideshow
  $('#backgrounds img').each(function() {
    var image = $(this).attr('src');
    $(this).parents('li').append('<div class="slide"></div>');
    $(this).parents('li').find('.slide').css('background-image', 'url('+image+')');
    $(this).remove();
  });

  $('#backgrounds').flexslider({
    controlNav: false,
    directionNav: false,
    slideshowSpeed: 5000
  });
  
  //Nav Selection
  $('#nav').onePageNav({
    currentClass: 'active',
    scrollOffset: 50
  });

  //Elements Animation
  $('.animated').appear(function(){
    var element = $(this);
    var animation = element.data('animation');
    var animationDelay = element.data('delay');
    if (animationDelay) {
      setTimeout(function(){
        element.addClass( animation + " visible" );
        element.removeClass('hiding');        
      }, animationDelay);
    }else {
      element.addClass( animation + " visible" );
      element.removeClass('hiding');      
    }    
  },{accY: -150});

  //Overview Tabs
  $('.services li a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  //Portfolio Filters
  $('#projects').mixitup({
    effects: ['fade','scale', 'rotateX'],
    easing: 'windup'
  });

  //Contact form validation and submit with ajax
  $('#contact-form').validate({
    errorPlacement: function(error, element) {},
    highlight: function(element, errorClass) {        
        $(element).parent().removeClass('success').addClass('error');
    },
    unhighlight: function(element, errorClass) {
        $(element).parent().removeClass('error').addClass('success');
    },
    rules: {
      fullname:{
        required: true
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true
      },
      message: {
        required: true
      }
    },
    submitHandler: function(form) {
      var url = $(form).attr('action');
      $.ajax({
        type: "POST",
        url: url,
        data: $(form).serialize(), // serializes the form's elements.
        success: function(data)
        {
            $('.sent').slideDown(600);
            $('html,body').animate({
              scrollTop: $('.sent').offset().top
            }, 1000);
        }
      });
    }
  });
  
});