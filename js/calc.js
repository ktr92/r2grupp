const feInit = () => {
  switcher()
  stickySidebar()
  fastBtn()
  termSelect()
  customSelect()
  changeTab()
  rangeSliderLoad()
  deliveryTypeChange()
  addSpot()
  autoCalc()
  switchDepend()
}

const stepitems = {
  properties: [],
  radio: [],
  set: [],
}

function checkExist(obj) {
  const objfound = stepitems.properties.filter(
      (item) => item.property === obj.property
  )

  if (objfound.length === 0) {
      stepitems.properties.push(obj)
  } else {
      objfound[0].value = obj.value
      objfound[0].text = obj.text
  }
}

function checkExistRadio(obj) {
  const objfound = stepitems.properties.filter(
      (item) => item.property === obj.property
  )

  if (objfound.length === 0) {
      stepitems.radio.push(obj)
  } else {
      objfound[0].value = obj.value
      objfound[0].text = obj.text
  }
}


function getInputData(selector) {
  $(`[data-stepvisible="${selector}"]`)
      .find(
          'input[type="text"][data-steptype="source"], input[type="tel"][data-steptype="source"], input[type="email"][data-steptype="source"]'
      )
      .each(function (index) {
          var obj = {}
          obj.property = $(this).data("stepdata")
          obj.value = $(this).val()
          obj.text = ""
          obj.type = "textinput"
          checkExist(obj)
      })
}

function getCheckboxData(selector) {
  $(`[data-stepvisible="${selector}"]`)
      .find('input[type="checkbox"][data-steptype="source"]')
      .each(function (index) {
          var obj = {}
          obj.property = $(this).data("stepdata")
          obj.value = $(this).is(":checked") ? 1 : 0
          obj.text = $(this)
              .parent()
              .find("[data-text]")
              .text()
              .replace(/\s+/g, " ")
          obj.type = "checkbox"
          checkExist(obj)
      })
}

function getRadioData(selector) {
  $(`[data-stepvisible="${selector}"]`)
      .find('input[type="radio"][data-steptype="source"]')
      .each(function (index) {
          var obj = {}
          obj.property = $(this).data("stepdata")
          obj.value = $(this).is(":checked") ? 1 : 0
          obj.text = $(this).siblings("[data-text]").text().replace(/\s+/g, " ")
          obj.type = "radio"
          checkExist(obj)
      })
}

function getSpanData(selector) {
  $(`[data-stepvisible="${selector}"]`)
      .find('span[data-steptype="source"]')
      .each(function (index) {
          var obj = {}
          obj.property = $(this).data("stepdata")
          obj.value = $(this).text().replace(/\s+/g, " ")
          obj.text = ""
          obj.type = "text"
          checkExist(obj)
      })
}

function initData() {
  selectInit()
  getInputData("anyway")
  getCheckboxData("anyway")
  getSpanData("anyway")
  getSelectData("anyway")
  getRadioData("anyway")

  $('input[type="radio"][data-radiotab="tab"]:checked').each(function (
      index
  ) {
      if ($(this).val()) {
          var obj = {}
          obj.property = $(this).attr("id")
          obj.value = $(this).val()
          obj.text = $(this).closest("label").text().replace(/\s+/g, " ")
          obj.type = "radio"
          checkExistRadio(obj)
      }
  })

  stepitems.radio.forEach((item) => {
      getInputData(item.property)
      getCheckboxData(item.property)
      getSpanData(item.property)
      getSelectData(item.property)
      getRadioData(item.property)
  })

  /*  console.log(stepitems) */
}


const fillStepData = (step) => {
  if (step == 2) {
      setData()
      isSizeSet()
  }

  //confirm.html
  if (step == 3) {
      setData()
  }

  if (step == 4) {
      $("#calcForm").prop("action", "/calc/save/")
      $("input:checkbox, input:text").prop("disabled", false)
      $("#calcForm").submit()
  }
}

const getMailData = () => {
  const $stepBlock = $('[data-entity="form-step-3"]')

  let _html = ""
  let from = ""
  let to = ""
  from += $stepBlock.find('.fromto__title[data-stepdata="f_otpravki"]').text()
  from += $stepBlock
      .find('.fromto__title[data-stepdata="f_otpravki"]')
      .next("div")
      .text()

  to += $stepBlock.find('.fromto__title[data-stepdata="f_otpravki"]').text()
  to += $stepBlock
      .find('.fromto__title[data-stepdata="f_otpravki"]')
      .next("div")
      .text()

  console.log("FROM")
  console.log(from)
  console.log("TO")
  console.log(to)
}

function validateEmail() {
  let valid = true
  const email = []
  const $email = $("input[type=email]:visible")
  console.log("$email: ", $email)

  $email.each(function () {
      const obj = {
          input: $(this),
          val: $(this).val().toString(),
      }
      email.push(obj)
  })

  email.forEach(function (item) {
      console.log("item: ", item)

      var emailReg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i

      if (!emailReg.test(item.val)) {
          valid = false
          item.input.addClass("error")
      } else {
          valid = true
          item.input.removeClass("error")
      }
  })
  return valid
}

function validateRequired() {
  let valid = true

  valid = validateEmail()

  const required = []
  const $required = $('input[data-required="required"]:visible')

  $required.each(function () {
      const obj = {
          input: $(this),
          val: $(this).val().toString(),
          min: +$(this).data("min") || 1,
          max: +$(this).data("max") || 9999,
      }
      required.push(obj)
  })

  required.forEach(function (item) {
      if (item.val.length < 1) {
          valid = false
          item.input.addClass("error")
      }
  })

  if ($(".checkbox_required:visible").length) {
      return false
  }

  if ($(".error").length) {
      $("html, body").animate(
          {
              scrollTop: $(".error").offset().top - 50,
          },
          500
      )
  }

  return valid
}

function validateDepending() {
  let valid = true
  const required = []
  const $required = $("input[data-isrequired]:checked")

  if ($required) {
      $required.each(function () {
          const obj = {
              input: $(this),
              val: $(this).val(),
              depinput: $(this).data("isrequired"),
          }
          required.push(obj)
      })
  }

  required.forEach(function (item) {
      const depending = $(`[data-mbrequired="${item.depinput}"]`)
      if (depending) {
          if (!depending.val().length) {
              valid = false
              depending.addClass("error")
          }
      }
  })

  return valid
}

const checkConfirm = () => {
  /*  console.log(123) */
  if ($('input[name="privacy"]').is(":checked")) {
      return true
  } else {
      $('input[name="privacy"]')
          .closest(".pageform__check")
          .find(".checkbox__box")
          .addClass("error")
      return false
  }
}

const validateStepData = (step) => {
  let validation = true
  $("input").removeClass("error")

  if (step == 2) {
      let isTerminal = true
      document
          .querySelectorAll(".dropdownJS__label .dropdownJS__text1")
          .forEach((item) => {
              if (item.textContent) {
                  item.closest(".dropdownJS__label").classList.remove("error")
              } else {
                  item.closest(".dropdownJS__label").classList.add("error")
                  isTerminal = false
              }
          })

      validation =
          /* validateDepending() && */
          validateRequired() && isTerminal
  }

  if (step == 3) {
      validation = /* validateDepending() && */ validateRequired()
  }
  if (step == 4) {
      validation = validateRequired() && checkConfirm()
  }

  return validation
}

const stepForm = () => {
  $(document).on("click", '[data-entity="step-next"]', function (e) {
      e.preventDefault()
      if (validateStepData(currentStep + 1)) {
          initData()
          $(".form-step").hide()
          ++currentStep
          fillStepData(currentStep)
          $('[data-entity="form-step-' + currentStep + '"]').show()
          $([document.documentElement, document.body]).animate(
              {
                  scrollTop: $(
                      '[data-entity="form-step-' + currentStep + '"]'
                  ).offset().top,
              },
              1000
          )
          if (currentStep === 1) {
              $('.form-step .calcpage__nav [data-entity="step-next"]').show()
              $('[data-entity="step-next"]').text("РћС„РѕСЂРјРёС‚СЊ Р·Р°СЏРІРєСѓ")
              $('[data-entity="step-prev"]').removeClass("active")
          }
          if (currentStep === 2) {
              $('.form-step .calcpage__nav [data-entity="step-next"]').show()
              $('[data-entity="step-next"]').text("РџСЂРѕРґРѕР»Р¶РёС‚СЊ")
              $('[data-entity="step-prev"]').addClass("active")
          }
          if (currentStep === 3) {
              $('[data-entity="step-next"]').text("РћС„РѕСЂРјРёС‚СЊ Р·Р°СЏРІРєСѓ")
              $('[data-entity="step-prev"]').addClass("active")
              $('.form-step .calcpage__nav [data-entity="step-next"]').hide()
          }
      }
  })

  $(document).on(
      "click",
      '[data-entity="step-prev"]',
      function (e) {
          e.preventDefault()
          /* if (validateStepData(currentStep - 1)) { */
          --currentStep
          if (currentStep < 1) {
              currentStep = 1
          }
          fillStepData(currentStep)
          $(".form-step").hide()
          $('[data-entity="form-step-' + currentStep + '"]').show()
          $([document.documentElement, document.body]).animate(
              {
                  scrollTop: $(
                      '[data-entity="form-step-' + currentStep + '"]'
                  ).offset().top,
              },
              1000
          )

          if (currentStep === 1) {
              $('[data-entity="step-prev"]').removeClass("active")
          }
          if (currentStep === 2) {
              $('[data-entity="step-prev"]').addClass("active")
          }
          if (currentStep === 3) {
              $('[data-entity="step-prev"]').addClass("active")
          }
      }
      /*  } */
  )
}


function setData() {
  $('[data-steptype="result"]').each(function () {
      const current = $(this).data("stepdata")
      let input = stepitems.properties.filter(
          (item) => item.property === current
      )
      if (
          input.length &&
          input[0].type === "textinput" &&
          input[0].value != ""
      ) {
          $(this).text(input[0].value)
      }
      if (input.length && input[0].type === "checkbox" && input[0].value != 0) {
          $(this).text(input[0].text)
      }
      if (input.length && input[0].type === "select" && input[0].value != "") {
          $(this).text(input[0].value)
      }
      if (input.length && input[0].type === "text" && input[0].value != "") {
          $(this).text(input[0].value)
      }

      let radio = stepitems.radio.filter((item) => item.property === current)
      if (radio.length && radio[0].type === "radio" && radio[0].value != 0) {
          $(this).text(radio[0].text)
      }
  })

  $("[data-if]").each(function () {
      const current = $(this).data("if")
      let input = stepitems.properties.filter(
          (item) => item.property === current
      )
      if (
          input.length &&
          input[0].type === "textinput" &&
          input[0].value != ""
      ) {
          $(this).show()
      } else {
          $(this).hide()
      }
  })

  $('[data-totaltype="fizyur"]').each(function () {
      const current = $(this).data("stepdata")
      if (stepitems.radio.filter((item) => item.property === current).length) {
          $(this).show()
      } else {
          $(this).hide()
      }
  })
}

const autoCalc = () => {

  const calcOver = function (e) {


    $('.calcform__inputs_spot').each(function() {
      let isover = false
      let len = +$(this).find('.calc_length').val().replace(/\s/g, '').match(/\d+/)[0]
      let wid = +$(this).find('.calc_width').val().replace(/\s/g, '').match(/\d+/)[0]
      let hei = +$(this).find('.calc_height').val().replace(/\s/g, '').match(/\d+/)[0]
      let weight  =
      (+$(this).find('.calc_weight').val().replace(/\s/g, '').match(/\d+/)[0])

      
      let weiover = $('input[name=delivery_type]:checked').data('overweight')
      let sizeover = $('input[name=delivery_type]:checked').data('oversize')

    

      let size = len + wid + hei
      console.log(size/100)
      if (size/100 > sizeover) {
        isover = true
      }


      if (weight > weiover) {
        isover = true
      }

      if (isover) {
        $(this).find('.warn_over').addClass('active')
      } else {
        $(this).find('.warn_over').removeClass('active')
      }
    })
  }


  const calcVolume = function (e) {

    let resVolume = 0 
   
    $('.calcform__inputs_spot').each(function() {

      let len = +$(this).find('.calc_length').val().replace(/\s/g, '').match(/\d+/)[0]
      let wid = +$(this).find('.calc_width').val().replace(/\s/g, '').match(/\d+/)[0]
      let hei = +$(this).find('.calc_height').val().replace(/\s/g, '').match(/\d+/)[0]

    
      let volume = len * wid * hei
      calcOver()
      resVolume += volume
    })
 
    $('.auto_volume').val(resVolume / 1000000)

  

  }
  const calcWeight = function (e) {
    let resWeigth = 0 

    $('.calcform__inputs_spot').each(function() {
      let result =
      (+$(this).find('.calc_weight').val().replace(/\s/g, '').match(/\d+/)[0])
      calcOver()
      
      resWeigth += result
    })
   
    $('.auto_weight').val(resWeigth)
   
  }

    $(document).on("change", ".calc_length", calcVolume)
    $(document).on("change", ".calc_width", calcVolume)
    $(document).on("change", ".calc_height", calcVolume)
    $(document).on("change", ".calc_weight", calcWeight)
 
}
const addSpot = () => {
  $(document).on('click', ".calctabs__remove", function (e) {
    e.preventDefault()
    const result = 1 /* window.confirm(`Вы уверены, что хотите удалить место №${count}?`) */
    if (result) {
      $(this).closest(`.calctabs__item-${count}`).remove()
      $(`.calcform__inputs-${count}`).remove();
      $(`.calcform__inputs-${(count-1)}`).find('.calctabs__remove').show()
      count--

    }
  })


  let count = $('.js-calcspot').length;
  $('.calctabs__add').on('click', function (e) {
    e.preventDefault()
    count++

    $('.calctabs__close').hide()

    $(this).closest('.calcpage__block').find('.calcform-js.active').find('.calcform__content').append(`
        <div class="calcform__inputs calcform__inputs_spot js-calcform__inputs calcform__inputs-${count}" data-inputset="${count}">
          <div class="calcform__titlespot js-calcspot"">
            <span class="calcform__titlespotname"> ${count} место</span><span class="calcform__titlespotremove">
              <a href="#" class="calctabs__remove">Удалить</a>
            </span>
         </div>
            <div class="calcform__items calcform__items_three">
              <div class="calcform__item">
                <div class="calcform__title">Длина</div>
                <div class=" form-control__wrapper" data-range-slider-type="size">
                  <input data-stepdata="ob_len-${count}" data-stepset="${count}"  data-steptype="source_set" class="calc_length form-control range-slider__control" data-max="1000" data-min="1" data-size-format=""
                  data-new-${count} name="boxLength[]"  type="text" inputmode="decimal" value="1">
                </div>
              </div>
              <div class="calcform__item">
                <div class="calcform__title">Ширина</div>
                <div class="form-control__wrapper" data-range-slider-type="size">
                  <input data-stepdata="ob_shir-${count}" data-stepset="${count}"  data-steptype="source_set" class="calc_width form-control range-slider__control" data-max="1000" data-min="1"
                  data-size-format="" data-new-${count} name="boxWidth[]"  type="text" inputmode="decimal" value="1">
                </div>
              </div>
              <div class="calcform__item">
                <div class="calcform__title">Высота</div>
                <div class="form-control__wrapper" data-range-slider-type="size">
                  <input data-stepdata="ob_h-${count}" data-stepset="${count}"  data-steptype="source_set" class="calc_height form-control range-slider__control" 
                  data-max="1000" data-min="1" data-size-format="" data-new-${count} name="boxHeight[]" placeholder="" type="text" inputmode="decimal" value="1">
                </div>
              </div>
              <div class="calcform__item calcform__item_xl">
              <div class="calcform__title">Вес места</div>
              <div class="form-control__wrapper range-slider range-slider-${count}" data-range-slider-type="weight">
                <input data-stepdata="ob_w-${count}" data-stepset="${count}"  data-steptype="source_set" class="form-control range-slider__control calc_weight" data-max="5000" data-min="1"
                 data-weight-format="" data-new-${count} name="boxWeight[]"type="text" inputmode="decimal" value="1">
                <div class="range-slider__ui"></div>
              </div>
            </div>
           
            </div>
            <div class="calcform__warn warn_over">
            <div class="warnmessage warnmessage_type2">
              <div class="warnmessage__icon">
                <img src="img/warnmessage.svg" alt="">
              </div>
              <div class="warnmessage__text">Данные размеры груза превышают максимально допустимые габариты и груз будет оценен как “Негабартиный” </div>
            </div>
          </div>
          </div>
        </div>
        </div>
        `)


    $(`.calcform__inputs-${(count)}`).addClass('active').siblings().removeClass('active');;

    $(`[data-weight-format][data-new-${count}]`).inputmask('integer', {
      mask: "( 999){+|1}",
      numericInput: true,
      showMaskOnHover: false,
      showMaskOnFocus: false,
      rightAlign: false
    });
    
    if ($(`.range-slider-${count}`).length) {
      var rangeSliders = $(`.range-slider-${count}`);
      rangeSliderInit(rangeSliders);
    }
  })
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

const deliveryTypeChange = () => {
  const setAuto = () => {
    $('.calcpage__main').addClass('delivery_auto')
    $('.calcpage__main').removeClass('delivery_zhd')
  }
  const setZhd = () => {
    $('.calcpage__main').addClass('delivery_zhd')
    $('.calcpage__main').removeClass('delivery_auto')
  }
  $('[name="delivery_type"]').on('change', function () {
    $(this).attr('id') === 'delivery_auto' ? setAuto() : setZhd()
  })
}

const rangeSliderLoad = () => {

  if ($('.range-slider').length) {
    var rangeSliders = $('.range-slider');
    rangeSliderInit(rangeSliders);

    $('[data-weight-format], [data-size-format]').inputmask('integer', {
      mask: "( 999){+|1}",
      numericInput: true,
      showMaskOnHover: false,
      showMaskOnFocus: false,
      rightAlign: false
    });

    $('[data-volume-format]').inputmask({
      rightAlign: false,
      alias: 'numeric',
      digits: 2,
      suffix: '',
      showMaskOnHover: false,
      showMaskOnFocus: false,
  });
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
  } else {
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

const switchDepend = () => {
  $('input[data-depend]').on('change', function(e) {
    let depend = $(this).data('depend')
    if ($(this).is(':checked')) {
      $(`[data-dependfrom=${depend}]`).addClass('active')
    } else {
      $(`[data-dependfrom=${depend}]`).removeClass('active')
    }
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
    jQuery(this).closest('.calcform__item').find("[data-fast] a").removeClass('active')
    let target = jQuery(this).parent().data('fast')
    jQuery(`input[name=${target}]`).val(jQuery(this).text())
    jQuery(this).addClass('active')
  })
}



const customSelect = () => {
  jQuery(document).on('click', '.customselect .customselect__button', function (e) {
    e.preventDefault()
    jQuery(this).closest('.customselect').find('.calcselect__list').addClass('active')
    jQuery(this).addClass('active')
  })
  jQuery(document).on('click', '.customselect li', function (e) {
    e.preventDefault()
    const $wrapper = $(this).closest('.customselect')
    let value = $(this).text()
    let code = $(this).data('value')
    $wrapper.find(`[data-calchidden]`).removeClass('active')
    $wrapper.find(`[data-calchidden=${code}]`).addClass('active')
    $wrapper.find('[data-customselect]').text(value)
    // что подставлять в инпут
    $wrapper.find('[data-input]').val(value)
    $wrapper.find('.calcselect__list').removeClass('active')
    $wrapper.find('.customselect__button').removeClass('active')
   
  })
}
const termSelect = () => {
  jQuery(document).on('click', '.calcselectblock:not(.disabled) .calcselect__button', function (e) {
    e.preventDefault()
    jQuery(this).closest('.calcselect').find('.calcselect__list').addClass('active')
  })
  jQuery(".calcselect__list li").on("click", function (e) {
    e.preventDefault()
    const $element = jQuery(this)
    const $wrapper = $element.closest('[data-calcselect]')
    let termname = $element.find('[data-terminalname]').data('terminalname')
    let termid = $element.find('[data-terminalid]').data('terminalid')

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