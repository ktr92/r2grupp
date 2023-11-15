jQuery(document).ready(function ($) {
  if (document.querySelector("#contact-form-p")) {
    var add_form = $("#contact-form-p")

    // Сброс значений полей
    $("#contact-form-p input, #contact-form-p textarea").on(
      "blur",
      function () {
        $("#contact-form-p input, #contact-form-p textarea").removeClass(
          "error"
        )
        $(".error-name,.error-email,.error-pol").remove()
        $("#btn-contact-form-p").text("Отправить сообщение")
      }
    )

    // Отправка значений полей
    var options = {
      url: feedback_object.url,
      data: {
        action: "contact_action",
        nonce: contact_object.nonce,
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
          $("#btn-contact-form-p").text("Отправить сообщение")
        } else {
          // Если поля не заполнены, выводим сообщения и меняем надпись на кнопке
          $.each(request.data, function (key, val) {
            console.log(request.data)
            $(".art_" + key).addClass("error")
            $("#btn-contact-form-p").before(
              '<span class="error-' + key + '">' + val + "</span>"
            )
          })
          $("#btn-contact-form-p").text("Что-то пошло не так...")
        }
        // При успешной отправке сбрасываем значения полей
        $("#contact-form-p")[0].reset()
      },
      error: function (request, status, error) {
        console.log(request.data)
        $("#btn-contact-form-p").text("Что-то пошло не так...")
      },
    }

    // Отправка
    add_form.ajaxForm(options)
  }
})
