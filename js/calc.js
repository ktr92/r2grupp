
const appInit = () => {
  switcher()
  stickySidebar()
  fastBtn()
  termSelect()
}

const switcher = () => {
  jQuery(".switcher a").on("click", function (e) {
    e.preventDefault()
    let input1 = jQuery("#cityInput1").val()
    let input2 = jQuery("#cityInput2").val()
    jQuery("#cityInput1").val(input2)
    jQuery("#cityInput2").val(input1)

  })
}

const fastBtn = () => {
  jQuery("[data-fast] a").on("click", function (e) {
    e.preventDefault()
    let target = jQuery(this).parent().data('fast')
    jQuery(`input[name=${target}]`).val(jQuery(this).text())
  })
}
const termSelect = () => {
  jQuery(document).on('click', '.calcselectblock:not(.disabled) .calcselect__button', function(e) {
    e.preventDefault()
    jQuery(this).closest('.calcselect').find('.calcselect__list').addClass('active')
  })
  jQuery("[data-terminal]").on("click", function (e) {
    e.preventDefault()
    const $element = jQuery(this)
    const $wrapper =  $element.closest('[data-calcselect]')
    let termname = $element.find('[data-terminalname]').data('terminalname')
    let termid =  $element.find('[data-terminalid]').data('terminalid')

    $wrapper.addClass('selected')
    $wrapper.find('[data-ternimalresult]').text(termname).attr('data-ternimalresult', termname)
    $wrapper.find('[data-ternimalresult_id]').text(termid).attr('data-ternimalresult_id', termid)
    $wrapper.find('.calcselect__list').removeClass('active')
    $wrapper.find('.calcselect__buttontext').text("Другой терминал")

    if (jQuery('[data-calcselect="from"]').hasClass('selected')) {
      jQuery('[data-calcselect="to"]').removeClass('disabled')
    }

    // что подставлять в инпут
    $wrapper.find('[data-input="terminal"]').val(termid)
  })
}

const stickySidebar = () => {
  if (jQuery(document).width() > 1023) {
    if (document.querySelector(".calcpage__aside")) {
      var a = document.querySelector(".calcpage__aside"),
        b = null,
        P = 90 
      window.addEventListener("scroll", Ascroll, false)
      document.body.addEventListener("scroll", Ascroll, false)
      function Ascroll() {
        if (b == null) {
          var Sa = getComputedStyle(a, ""),
            s = ""
          for (var i = 0; i < Sa.length; i++) {
            if (
              Sa[i].indexOf("overflow") == 0 ||
              Sa[i].indexOf("padding") == 0 ||
              Sa[i].indexOf("border") == 0 ||
              Sa[i].indexOf("outline") == 0 ||
              Sa[i].indexOf("box-shadow") == 0 || 
              Sa[i].indexOf("background") == 0
            ) {
              s += Sa[i] + ": " + Sa.getPropertyValue(Sa[i]) + "; "
            }
          }
          b = document.createElement("div")
          b.style.cssText =
            s + " box-sizing: border-box; width: " + a.offsetWidth + "px;"
          a.insertBefore(b, a.firstChild)
          var l = a.childNodes.length
          for (var i = 1; i < l; i++) {
            b.appendChild(a.childNodes[1])
          }
          a.style.height = b.getBoundingClientRect().height + "px"
          a.style.padding = "0"
          a.style.border = "0"
        }
        var Ra = a.getBoundingClientRect(),
          R = Math.round(
            Ra.top +
              b.getBoundingClientRect().height -
              document.querySelector("footer").getBoundingClientRect().top +
              0
          )
        if (Ra.top - P <= 0) {
          if (Ra.top - P <= R) {
            b.className = "stop"
            b.style.top = -R + "px"
          } else {
            b.className = "sticky"
            b.style.top = P + "px"
          }
        } else {
          b.className = ""
          b.style.top = ""
        }
        window.addEventListener(
          "resize",
          function () {
            a.children[0].style.width = getComputedStyle(a, "").width
          },
          false
        )
      }
    }
  }
}


jQuery(function (jQuery) {
  appInit()
})