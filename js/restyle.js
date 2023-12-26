$(document).ready(function() {
  $('.mobilesearch').on('click', function(e) {
    e.preventDefault()
    console.log('fuckkkk')
    $(this).siblings('.header__search').slideToggle()
  })
})