$(document).ready(function() {
  $('.mobilesearch').on('click', function(e) {
    e.preventDefault()
    $(this).siblings('.header__search').slideToggle()
  })

  $('.contactselect').on('click', function(e) {
    e.preventDefault()
    $('.contacts-nav-column').slideToggle()
  })

  $('.cityInput_tab').on('input', function(e) {
    $('.caclform__popup').addClass('active')
  })


    jQuery("[data-tab]").on("click", function () {
      jQuery(this).addClass("active").siblings().removeClass("active")
      jQuery(this)
        .closest("[data-tabs]")
        .find("[data-tabcontent]")
        .removeClass("active")
        .eq(jQuery(this).index())
        .addClass("active")
    })


    function closeByClickOutside(element, button, callback) {
      $(document).click(function(event) {
          if (!$(event.target).closest(`${element},${button}`).length) {
              $(button).removeClass('active')
              $(element).removeClass('active')
              // or  
              //$(element).hide()
          }
      });
  
      $(document).keyup(function(e) {
          if (e.key === "Escape") { // escape key maps to keycode `27`
              $(button).removeClass('active')
              $(element).removeClass('active')
              // or  
              //$(element).hide()
          }
      });
  
      if (callback instanceof Function) { callback(); }
    }
  
  // usage
  closeByClickOutside('.caclform__popup', '[name="from_text_tab1"]')

})