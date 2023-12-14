
const feInit = () => {
  switcher()
  stickySidebar()
  fastBtn()
  termSelect()
  changeTab()
  rangeSliderLoad()
}

const rangeSliderLoad = () => {
  
  if ($('.range-slider').length) {
    var rangeSliders = $('.range-slider');
    rangeSliderInit(rangeSliders);
}
}
var rangeTimeout;

const rangeSliderCreate = (slideIndex, slide) => {
    var rangeSliderOptions;
    var rangeSliderType = $(slide).attr('data-range-slider-type');
    var rangeSliderStart = parseFloat($(slide).closest('.range-slider').find('.form-control').val());
    var rangeSliderMin = parseFloat($(slide).closest('.range-slider').find('.form-control').data("min"));
    var rangeSliderMax = parseFloat($(slide).closest('.range-slider').find('.form-control').data("max"));

    if (rangeSliderType === 'weight') {
        rangeSliderOptions = {
            start: [rangeSliderStart],
            range: {
                'min': [rangeSliderMin, 1],
                '28%': [15, 1],
                '48%': [30, 5],
                '60%': [100, 10],
                '70%': [300, 50],
                '80%': [1000, 100],
                'max': [rangeSliderMax]
            },
            connect: 'lower'
        }
    } else if (rangeSliderType === 'volume') {
        rangeSliderOptions = {
            start: [rangeSliderStart],
            range: {
                'min': [rangeSliderMin, 0.01],
                '40%': [0.5, 0.05],
                '50%': [1, 0.1],
                '76%': [3, 0.5],
                '88%': [10, 1],
                'max': [rangeSliderMax]
            },
            connect: 'lower'
        }
    }   else {
      rangeSliderOptions = {
          start: [1],
          range: {
              'min': [rangeSliderMin],
              'max': [rangeSliderMax]
          },
          connect: 'lower'
      }
  }

  $(slide).attr('data-range-slider-index', slideIndex);

  var rangeSlidersItem = noUiSlider.create(slide.querySelector('.range-slider__ui'), rangeSliderOptions);

  $(slide.querySelector('.range-slider__ui')).data('slider', rangeSlidersItem);

  rangeSlidersItem.on('slide', function (values, handle) {
      clearTimeout(rangeTimeout);
      if (rangeSliderType === 'weight' || rangeSliderType === 'size' || rangeSliderType === 'height' || rangeSliderType === 'count') {
          $(this.target).closest('.range-slider').find('.form-control').val(Math.round(values[handle]));
      } else if (rangeSliderType === 'volume') {
          $(this.target).closest('.range-slider').find('.form-control').val(parseFloat(values[handle]).toFixed(2) /* + ' Р СР’С–'*/ );
      } else {
          $(this.target).closest('.range-slider').find('.form-control').val(values[handle]);
      }
  });
  rangeSlidersItem.on('change', function () {
      var target = $(this.target);
      rangeTimeout = setTimeout(function () {
          target.closest('.range-slider').find('.form-control').trigger("change");
      }, 500);
  });

}

function rangeSliderInit(rangeSliders) {
  for (var i = 0; i < rangeSliders.length; i++) {
      rangeSliderCreate(i, rangeSliders[i]);
  }

  $('.range-slider__control').on('change', function () {
      if ($(this).closest('.range-slider').attr('data-range-slider-type') === 'size' ) {
          if (this.value.replace(/[^0-9]/g, '') > parseInt(this.getAttribute('data-max'))) {
              this.value = parseInt(this.getAttribute('data-max'));
          } else if (this.value.replace(/[^0-9]/g, '') < parseInt(this.getAttribute('data-min')) || this.value.replace(/[^0-9]/g, '') === '') {
              this.value = parseInt(this.getAttribute('data-min'));
          }
          $(this).next().data('slider').set(parseInt(this.value.replace(/[^0-9]/g, '')));
      }

      if ($(this).closest('.range-slider').attr('data-range-slider-type') === 'weight' ) {
          if (this.value.replace(/[^0-9]/g, '') > parseInt(this.getAttribute('data-max'))) {
              this.value = parseInt(this.getAttribute('data-max'));
             
          } else if (this.value.replace(/[^0-9]/g, '') < parseInt(this.getAttribute('data-min')) || this.value.replace(/[^0-9]/g, '') === '') {
              this.value = parseInt(this.getAttribute('data-min'));
          }
          $(this).next().data('slider').set(parseInt(this.value.replace(/[^0-9]/g, '')));
        
          if (parseInt($('[name="max_weight"]').val().replace(/[^0-9]/g, '')) > parseInt($('[name="weight"]').val().replace(/[^0-9]/g, ''))) {
              $('[name="weight"]').val($('[name="max_weight"]').val())
              $('[name="weight"]').next().data('slider').set(parseInt(this.value.replace(/[^0-9]/g, '')));
          }

      } else if ($(this).closest('.range-slider').attr('data-range-slider-type') === 'volume') {
          if (parseFloat(this.value) > parseFloat(this.getAttribute('data-max'))) {
              this.value = parseFloat(this.getAttribute('data-max'));
          } else if (parseFloat(this.value) < parseFloat(this.getAttribute('data-min')) || parseFloat(this.value) === '') {
              this.value = parseFloat(this.getAttribute('data-min'));
          } if ( (!(parseFloat(this.value))) || (parseFloat(this.value) === 0)) {
              this.value = parseFloat(this.getAttribute('data-min'));
          }
          $(this).next().data('slider').set(parseFloat(this.value /*.replace(/[^0-9]/g, '')*/ ).toFixed(2));
      }
  });
}

const changeTab = () => {
  jQuery(".calctabs-js").on("click", "label:not(.active)", function () {
    jQuery(this).addClass("active").siblings().removeClass("active")
    jQuery(this)
      .closest("div.calcitem_tabs-js")
      .find("div.calcitem__content")
      .find("div.calcform-js")
      .removeClass("active")
      .eq(jQuery(this).index())
      .addClass("active")
  })
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
  feInit()
})