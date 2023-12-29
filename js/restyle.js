$(document).ready(function() {
  $('.mobilesearch').on('click', function(e) {
    e.preventDefault()
    $(this).siblings('.header__search').slideToggle()
  })

  $('.contactselect').on('click', function(e) {
    e.preventDefault()
    $('.contacts-nav-column').slideToggle()
  })
})