jQuery(document).ready(function ($) {
  if (document.querySelector("#big-form")) {
    let title = document.title.split("–")

    document
      .querySelector(".wrap-f")
      .insertAdjacentHTML(
        "afterend",
        `<input type="hidden" name="page_title" value="${title[0]}" />\n`
      )
    $.datepicker.regional["ru"] = {
      closeText: "Закрыть",
      prevText: "Предыдущий",
      nextText: "Следующий",
      currentText: "Сегодня",
      monthNames: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      monthNamesShort: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ],
      dayNames: [
        "воскресенье",
        "понедельник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота",
      ],
      dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      weekHeader: "Не",
      dateFormat: "dd.mm.yy",
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: "",
    }
    $.datepicker.setDefaults($.datepicker.regional["ru"])

    $(function () {
      $("#datepicker").datepicker()
    })

    let add_form = $("#big-form")

    console.log(add_form, "add_form")
    // Сброс значений полей
    $("#big-form input, #big-form select").on("blur", function () {
      $("#big-form input, #big-form select").removeClass("error")
      $(
        ".error-organ,.error-dolz,.error-tel,.error-loc,.error-date,.error-select,.error-finish,.error-ves,.error-objem,.error-container-type-select,.error-gruz"
      ).remove()
      $("#big-sub-btn").text("Отправить сообщение")
    })

    // Отправка значений полей
    let options = {
      url: feedback_object.url,
      data: {
        action: "form_big_action",
        nonce: formB_object.nonce,
      },
      type: "POST",
      dataType: "json",
      beforeSubmit: function (xhr) {
        // При отправке меняем надпись на кнопке
        $("#big-sub-btn").text("Отправляем...")
      },
      success: function (request, xhr, status, error) {
        if (request.success === true) {
          // Если все поля заполнены, отправляем данные и меняем надпись на кнопке
          add_form
            .after('<div class="message-success">' + request.data + "</div>")
            .slideDown()
          $("#submit-feedback").text("Отправить сообщение")
        } else {
          // Если поля не заполнены, выводим сообщения и меняем надпись на кнопке
          $.each(request.data, function (key, val) {
            console.log(request.data)
            $(".art_" + key).addClass("error")
            $("#big-sub-btn").before(
              '<span class="error-' + key + '">' + val + "</span>"
            )
          })
          $("#big-sub-btn").text("Что-то пошло не так...")
        }
        // При успешной отправке сбрасываем значения полей
        $("#big-form")[0].reset()
      },
      error: function (request, status, error) {
        console.log(request.data)
        $("#big-sub-btn").text("Что-то пошло не так...")
      },
    }
    console.log(options, "options")
    // Отправка
    add_form.ajaxForm(options)
  }
})
