jQuery(function ($) {
  //////
  if (document.querySelector(".map-interactive")) {
    const mapNavBtns = document.querySelectorAll(".map-okrug-btn")

    const activeRegion = (param) => {
      console.log(param)

      mapNavBtns.forEach((allE) =>
        allE.classList.remove("map-okrug-btn-active")
      )
      document
        .querySelectorAll(".map-city-active")
        .forEach((cE) => cE.classList.remove("map-city-active"))
      document
        .querySelectorAll(".map-region-active")
        .forEach((cE) => cE.classList.remove("map-region-active"))

      document
        .querySelector(`#btn-${param}`)
        .classList.add("map-okrug-btn-active")

      document
        .querySelector(`#region-${param}`)
        .classList.add("map-region-active")
      if (document.querySelectorAll(`.map-city-${param}`)) {
        document
          .querySelectorAll(`.map-city-${param}`)
          .forEach((ee) => ee.classList.add("map-city-active"))
      }
    }

    mapNavBtns.forEach((actE) => {
      if (actE.classList.contains("map-okrug-btn-active")) {
        let actEId = actE.getAttribute("id")
        activeRegion(actEId[actEId.length - 1])
      }
    })

    const navBtn = document.querySelectorAll(".interactive-btn")
    const btnOverlay = document.querySelector(".interactive-btn-overlay")
    navBtn.forEach((e) => {
      e.addEventListener("click", () => {
        if (e.classList.contains("interactive-btn-left")) {
          btnOverlay.classList.remove("overlay-right")
          document.querySelector(".map-export").classList.remove("map-active")

          document.querySelector(".map-import").classList.add("map-active")
          btnOverlay.classList.add("overlay-left")
        } else {
          btnOverlay.classList.remove("overlay-left")
          btnOverlay.classList.add("overlay-right")
          document.querySelector(".map-export").classList.add("map-active")

          document.querySelector(".map-import").classList.remove("map-active")
        }
        navBtn.forEach((el) => el.classList.remove("interactive-btn-active"))
        e.classList.add("interactive-btn-active")
      })
    })

    mapNavBtns.forEach((navE, navI) => {
      navE.addEventListener("click", () => {
        let navEdata = navE.getAttribute("id")
        activeRegion(navEdata[navEdata.length - 1])
      })
    })

    const allReg = document.querySelectorAll(".reg")

    allReg.forEach((reg, indReg) => {
      reg.addEventListener("mouseenter", () => {
        if (!reg.classList.contains("map-region-active")) {
          let regionId = reg.getAttribute("id")
          activeRegion(regionId[regionId.length - 1])
        }
      })
    })
  }

  if (document.querySelector(".sect-head-swip")) {
    let i = 0
    const slides = document.querySelectorAll(".slider-box img")
    const slidesInfo = document.querySelectorAll(".swiper-big-info")
    const pagi = document.querySelectorAll(".pagi-custom")
    let loop = true

    const checkSlide = (data) => {
      slides.forEach((el, ind) => {
        if (ind !== data) {
          ind % 2 === 0
            ? el.classList.add("animation-left")
            : el.classList.add("animation-right")
          el.classList.remove("slide-act")
        } else {
          ind % 2 === 0
            ? el.classList.remove("animation-left")
            : el.classList.remove("animation-right")
          el.classList.add("slide-act")
        }
      })

      slidesInfo.forEach((elInfo, indInfo) => {
        if (indInfo !== data) {
          elInfo.classList.remove("slide-act-info")
        } else {
          elInfo.classList.add("slide-act-info")
        }
      })

      pagi.forEach((elPagi, indPagi) => {
        if (indPagi !== data) {
          elPagi.classList.remove("pagi-act")
        } else {
          elPagi.classList.add("pagi-act")
        }
      })
      i++

      if (i > slides.length - 1) {
        i = 0
      }
    }
    setInterval(() => {
      if (loop) {
        checkSlide(i)
        if (i === slides.length - 1) {
          i = 0
        }
      }
    }, 5000)
    checkSlide(i)

    pagi.forEach((el) => {
      el.addEventListener("click", () => {
        i = +el.dataset.ind
        checkSlide(i)
        loop = false
        setInterval(() => {
          loop = true
        }, 4000)
      })
    })
  }

  ///////

  if (document.querySelector("#menu-desc")) {
    document.querySelectorAll("#menu-desc li").forEach((el, ind) => {
      for (let key of el.children) {
        if (key.classList.contains("sub-menu")) {
          el.classList.add("menu-flat")
        }
      }
    })
  }

  if (document.querySelector(".swiper-little")) {
    const toggleBtn = document.querySelectorAll(".toggle-btn")
    const toggleOverlay = document.querySelector(".toggle-overlay")

    const inputHidden = document.querySelector(".inputTypePost")

    let checkBtnActive = false

    toggleBtn.forEach((el, ind) => {
      el.addEventListener("click", () => {
        if (el.dataset.post === "uslugi") {
          toggleOverlay.classList.remove("overlay-right")
          toggleOverlay.classList.add("overlay-left")
          el.classList.add("toggle-btn-text")
          el.nextElementSibling.classList.remove("toggle-btn-text")
          inputHidden.value = el.dataset.post

          if (checkBtnActive) {
            $.ajaxLoad()
            checkBtnActive = false
          }
        } else {
          toggleOverlay.classList.remove("overlay-left")
          toggleOverlay.classList.add("overlay-right")
          el.classList.add("toggle-btn-text")
          el.previousElementSibling.classList.remove("toggle-btn-text")
          inputHidden.value = el.dataset.post
          if (!checkBtnActive) {
            $.ajaxLoad()
            checkBtnActive = true
          }
        }
      })
    })

    $.ajaxLoad = function () {
      var slides = $("#slider")
      $.ajax({
        url: slides.attr("action"),
        data: slides.serialize(), // form data
        type: slides.attr("method"), // POST
        success: function (data) {
          $("#response-little-slider").html(data) // insert data
        },
      })
      return false
    }
  }

  const btnUp = document.querySelector(".btn-up")
  btnUp.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  })

  if (document.querySelector(".news-filter")) {
    const btnFilter = document.querySelectorAll(".filter-label")
    const inputHidden = document.querySelector(".inputDatePost")
    console.log(inputHidden)
    btnFilter.forEach((el) => {
      el.addEventListener("click", () => {
        btnFilter.forEach((elem) =>
          elem.classList.remove("filter-label-active")
        )
        el.classList.add("filter-label-active")
        inputHidden.value = el.innerText
        $.ajaxLoadFilt()
      })
    })

    $.ajaxLoadFilt = function () {
      var slides = $("#filter-news")
      $.ajax({
        url: slides.attr("action"),
        data: slides.serialize(), // form data
        type: slides.attr("method"), // POST
        success: function (data) {
          $("#response-news-filter").html(data) // insert data
        },
      })
      return false
    }
  }

  if (document.querySelector(".swiper-news")) {
    var swiper = new Swiper(".swiper-news", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + "</span>"
        },
      },
      breakpoints: {
        1440: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 30,
        },
      },
    })
  }

  if (document.querySelector(".swiper-clients")) {
    var swiper = new Swiper(".swiper-clients", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + "</span>"
        },
      },
      breakpoints: {
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        320: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 30,
        },
      },
    })
  }

  if (document.querySelector(".speed")) {
    function format(value) {
      let res

      value.indexOf(",") != -1
        ? (res = new Intl.NumberFormat("ru-RU")
            .format(value.replace(",", "."))
            .replace(".", ","))
        : (res = new Intl.NumberFormat("ru-RU").format(value).replace(",", "."))

      return res
    }

    function speed() {
      let counter = document.querySelectorAll(".speed")
      let limit = 0 // Переменная, чтобы останавливать функцию, когда всё запустится.

      if (limit == counter.length) {
        return
      }
      for (let i = 0; i < counter.length; i++) {
        let pos = counter[i].getBoundingClientRect().top //Позиция блока, считая сверху окна
        let win = window.innerHeight - 40 // На 40 пикселей меньше, чем высота окна
        if (pos < win && counter[i].dataset.stop === "0") {
          counter[i].dataset.stop = 1 // Останавливаем перезапуск счета в этом блоке
          let x = 0
          limit++ // Счетчик будет запущен, увеличиваем переменную на 1
          let int = setInterval(function () {
            // Раз в 60 миллисекунд будет прибавляться 50-я часть нужного числа
            x = x + Math.ceil(counter[i].dataset.to / 20)
            counter[i].innerText = x.toLocaleString("ru-RU")
            if (x > counter[i].dataset.to) {
              //Как только досчитали - стираем интервал.
              counter[i].innerText = counter[i].dataset.to
              clearInterval(int)
              counter[i].innerText = format(counter[i].innerText)
            }
          }, 60)
        }
      }
    }

    window.addEventListener("DOMContentLoaded", function () {
      speed()
    })

    window.addEventListener("scroll", function () {
      speed()
    })
  }

  if (document.querySelector(".category-nav")) {
    if (window.innerWidth < 600) {
      window.scrollBy(
        0,
        document.querySelector(".check-scroll").getBoundingClientRect().top -
          500
      )
    }

    const categoryItems = document.querySelectorAll(".category-nav-item")

    categoryItems.forEach((el, ind) => {
      let clickMob = false
      if (
        el.classList.contains("active-cat") &&
        el.querySelector(".child-post")
      ) {
        let childPost = el.querySelectorAll(".child-post a")
        let postsHeight = 0

        window.onload = function () {
          childPost.forEach((e) => {
            console.log(e.offsetHeight)
            postsHeight += e.clientHeight
          })
          postsHeight += childPost.length * 16
          el.querySelector(".child-post").style.height = postsHeight + "px"
        }
      }

      if (window.innerWidth >= 1200) {
        el.addEventListener("mouseenter", () => {
          if (
            !el.classList.contains("active-cat") &&
            el.querySelector(".child-post")
          ) {
            let childPost = el.querySelectorAll(".child-post a")
            let postsHeight = 0

            childPost.forEach((e) => {
              console.log(e.offsetHeight)
              postsHeight += e.clientHeight
            })
            postsHeight += childPost.length * 16
            el.querySelector(".child-post").style.height = postsHeight + "px"
            el.querySelector(".child-post").style.paddingTop = 15 + "px"
          }
        })

        el.addEventListener("mouseleave", () => {
          if (
            !el.classList.contains("active-cat") &&
            el.querySelector(".child-post")
          ) {
            el.querySelector(".child-post").style.height = 0 + "px"
            el.querySelector(".child-post").style.paddingTop = 0 + "px"
          }
        })
      } else {
        el.addEventListener("click", (event) => {
          if (
            event.target.classList.contains("top-nav") &&
            el.classList.contains("active-cat")
          ) {
            event.preventDefault()
          } else if (
            event.target.classList.contains("top-nav") &&
            !event.target.getAttribute("rel")
          ) {
            categoryItems.forEach((elem, index) => {
              if (
                elem !== event.currentTarget &&
                !elem.classList.contains("active-cat")
              ) {
                elem.classList.remove("second-cat")

                if (elem.querySelector(".child-post")) {
                  elem.querySelector(".child-post").style.height = 0 + "px"
                  elem.querySelector(".child-post").style.paddingTop = 0 + "px"
                }
              }
            })

            if (
              event.currentTarget.querySelector(".child-post") &&
              !event.currentTarget.classList.contains("second-cat")
            ) {
              let childPost =
                event.currentTarget.querySelectorAll(".child-post a")
              let postsHeight = 0

              childPost.forEach((e) => {
                console.log(e.offsetHeight)
                postsHeight += e.clientHeight
              })
              postsHeight += childPost.length * 16
              event.currentTarget.querySelector(".child-post").style.height =
                postsHeight + "px"
              event.currentTarget.querySelector(
                ".child-post"
              ).style.paddingTop = 15 + "px"
              event.currentTarget.classList.add("second-cat")
            } else {
              clickMob = true
            }

            if (!clickMob) {
              event.preventDefault()
            }
            // clickMob = true
          }
        })
      }
    })
  }

  if (document.querySelector(".map-svg")) {
    const pathLine = document.querySelectorAll(".path-line")

    const pathText = document.querySelectorAll(".path-text")
    const pathCounter = document.querySelectorAll(".path-counter")
    const svgMAp = document.querySelector(".map-svg")

    window.addEventListener("scroll", () => {
      if (svgMAp.getBoundingClientRect().top < (window.innerHeight / 3) * 2) {
        pathLine.forEach((el, ind) => {
          const length = el.getTotalLength()
          el.style.strokeDasharray = length
          el.style.strokeDashoffset = length
          el.classList.add("path-line-active")
        })
        pathCounter.forEach((element) =>
          element.classList.add("path-counter-active")
        )

        setTimeout(() => {
          pathText.forEach((el) => el.classList.add("path-text-active"))
        }, 1000)
      }
    })
  }

  if (document.querySelector(".header")) {
    const header = document.querySelector(".header")
    const mobileMenu = document.querySelector(".mobile-menu")

    const menuItems = document.querySelectorAll(".menu-item")

    menuItems.forEach((el, ind) => {
      el.addEventListener("click", (event) => {
        menuItems.forEach((elem, index) => {
          if (event.currentTarget !== elem) {
            elem.classList.remove("nav-item-active")
          }
        })

        for (child of el.children) {
          if (child.classList.contains("sub-menu")) {
            el.classList.toggle("nav-item-active")
            el.children[0].href = "#"
          }
        }
      })
    })

    mobileMenu.addEventListener("click", () => {
      header.classList.toggle("header-active")
    })
  }

  if (document.querySelector(".hrono-sect")) {
    const hronoBox = document.querySelectorAll(".hrono-box")

    let indx = 200
    function animatedHistory() {
      for (let i = 0; i < hronoBox.length; i++) {
        let pos = hronoBox[i].getBoundingClientRect().top
        let win = window.innerHeight - 40
        if (pos < win) {
          if (indx === 800) {
            indx = 200
          }
          setTimeout(() => {
            hronoBox[i].classList.add("hrono-box-active")
          }, indx)

          indx += 200
        }
      }
    }

    window.addEventListener("scroll", () => {
      animatedHistory()
    })

    window.onload = function () {
      animatedHistory()
    }
  }

  if (document.querySelector("#perevozka-map")) {
    ymaps.ready(init)
    function init() {
      const mapInitial = {
        center: [49.624598, 87.691358],
        controls: ["zoomControl"],
        zoom: 4,
      }

      if (window.innerWidth < 1200 && window.innerWidth > 600) {
        mapInitial.zoom = 3
      } else if (window.innerWidth <= 600) {
        mapInitial.zoom = 2
      }

      // Создание карты.
      var myMap = new ymaps.Map("shemy-map", mapInitial)

      const myGeoObjects = {
        type: "FeatureCollection",
        features: [],
      }
      //получаем с бека данные по филиалам, парсим их в отдельный массив
      const dataIcons = document.querySelectorAll(
        ".table-content-fil-btn-shemy"
      )
      const bigData = []

      dataIcons.forEach((el) => {
        let dataParse = JSON.parse(el.dataset.city)
        bigData.push(dataParse)
      })

      //выводим метки на карте по дынным из массива
      bigData.forEach((elem) => {
        elem.forEach((el) => {
          let officeCoord = []
          let iconSrc = ""
          if (el.object_type === "Офис и склад") {
            officeCoord = el.sklad_coord
              .slice(1, -1)
              .replace(/\s+/g, "")
              .split(",")
            iconSrc =
              "wp-content/themes/intentionally-blank/assets/img/svg/office-and-sklad-icon.svg"
          } else if (el.object_type === "Офис") {
            officeCoord = el.ofice_coord
              .slice(1, -1)
              .replace(/\s+/g, "")
              .split(",")
            iconSrc =
              "wp-content/themes/intentionally-blank/assets/img/svg/office-icon.svg"
          } else if (el.object_type === "Склад") {
            officeCoord = el.sklad_coord
              .slice(1, -1)
              .replace(/\s+/g, "")
              .split(",")
            iconSrc =
              "wp-content/themes/intentionally-blank/assets/img/svg/sklad-icon.svg"
          }

          const geoItem = {
            type: "Feature",
            id: el.big_ind,
            geometry: {
              type: "Point",
              coordinates: [Number(officeCoord[0]), Number(officeCoord[1])],
            },
            options: {
              iconImageSize: [48, 48],
              iconLayout: "default#image",
              iconImageHref: iconSrc,
              iconImageOffset: [-5, -38],
              keyType: el.object_type,
              city: el.city,
              big_ind: el.big_ind,
              region: el.region,
            },
          }

          myGeoObjects.features.push(geoItem)
        })
      })
      window.myObjects = ymaps.geoQuery(myGeoObjects).addToMap(myMap)

      const leftNav = document.querySelectorAll(
        ".table_nav_sbor .category-nav-item"
      )
      const tableBtnBox = document.querySelectorAll(".table-box-btn")
      const tableSection = document.querySelector("#perevozka-map")
      const tableChildContent = document.querySelectorAll(
        ".table-child-content"
      )

      const shemyChildContent = document.querySelectorAll(
        ".table-child-content-shemy"
      )

      const tableChildNavBtn = document.querySelectorAll(
        ".table-content-fil-btn"
      )

      const shemyChildBtn = document.querySelectorAll(
        ".table-content-fil-btn-shemy"
      )

      const tableContentWrap = document.querySelectorAll(
        ".table-content-wrapper"
      )

      const removeTableNavActive = () => {
        tableBtnBox.forEach((el) => el.classList.remove("table-btn-active"))
        tableContentWrap.forEach((el) =>
          el.classList.remove("active-table-content-wrapper")
        )
      }

      const removeChildNavActive = (data) => {
        tableChildNavBtn.forEach((el) =>
          el.classList.remove("table-content-fil-btn-active")
        )
        if (data) {
          document
            .getElementById(`child-btn-${data}`)
            .classList.add("table-content-fil-btn-active")
        }
      }

      const removeShemyNavActive = (data) => {
        shemyChildBtn.forEach((el) =>
          el.classList.remove("table-content-fil-btn-active")
        )
        if (data) {
          const activeBtn = document.getElementById(`child-btn-shemy-${data}`)
          activeBtn.classList.add("table-content-fil-btn-active")
          const coord = activeBtn.dataset.clickmap.split(",")
          myMap.setCenter([Number(coord[0]), Number(coord[1])], 16)
        }
      }

      const tableChild = (data) => {
        tableChildContent.forEach((el) =>
          el.classList.remove("table-child-content-active")
        )
        if (data) {
          document
            .getElementById(`child-content-${data}`)
            .classList.add("table-child-content-active")
        }
      }

      const activatetable = (data) => {
        tableContentWrap.forEach((el) =>
          el.classList.remove("active-table-content-wrapper")
        )
        document
          .getElementById(`table-nav${data}`)
          .classList.add("active-table-content-wrapper")
      }

      const shemyChild = (data) => {
        shemyChildContent.forEach((el) =>
          el.classList.remove("table-child-content-active")
        )
        if (data) {
          document
            .getElementById(`child-content-shemy-${data}`)
            .classList.add("table-child-content-active")
        }
      }

      leftNav.forEach((navEl, navInd) => {
        navEl.addEventListener("click", (ev) => {
          ev.preventDefault()
          tableBtnBox.forEach((el) => el.classList.remove("table-btn-active"))
          let dataNav = navEl.dataset.nav
          document
            .getElementById(`nav${dataNav}`)
            .classList.add("table-btn-active")
          activatetable(dataNav)
          window.scrollBy(0, tableSection.getBoundingClientRect().top - 150)

          console.log(dataNav)
          if (dataNav === "3") {
            tableChild(1)
            removeChildNavActive(1)
          } else if (dataNav === "6") {
            removeShemyNavActive(1)
            shemyChild(1)
          } else if (dataNav === "1") {
            tableChild("jd1")
            removeChildNavActive("jd1")
          } else if (dataNav === "2") {
            tableChild("auto1")
            removeChildNavActive("auto1")
          } else {
            tableChild()
            removeChildNavActive(1)
            removeShemyNavActive(1)
            shemyChild()
          }
        })
      })

      tableBtnBox.forEach((tableNavEl, tebleNavInd) => {
        tableNavEl.addEventListener("click", () => {
          if (!tableNavEl.classList.contains("table-btn-active")) {
            removeTableNavActive()
            tableNavEl.classList.add("table-btn-active")
            let tableNavId = tableNavEl.getAttribute("id")
            activatetable(tableNavId[tableNavId.length - 1])

            if (tableNavId === "nav3") {
              tableChild(1)
              removeChildNavActive(1)
            } else if (tableNavId === "nav6") {
              removeShemyNavActive(1)
              shemyChild(1)
            } else if (tableNavId === "nav1") {
              tableChild("jd1")
              removeChildNavActive("jd1")
            } else if (tableNavId === "nav2") {
              tableChild("auto1")
              removeChildNavActive("auto1")
            }
          }
        })
      })

      tableChildNavBtn.forEach((el, ind) => {
        el.addEventListener("click", () => {
          if (!el.classList.contains("table-content-fil-btn-active")) {
            let tableChildId = el.getAttribute("id").split("-")

            removeChildNavActive(tableChildId[tableChildId.length - 1])
            tableChild(tableChildId[tableChildId.length - 1])
          }
        })
      })

      shemyChildBtn.forEach((el, ind) => {
        el.addEventListener("click", () => {
          if (!el.classList.contains("table-content-fil-btn-active")) {
            let tableChildId = el.getAttribute("id").split("-")
            removeShemyNavActive(tableChildId[tableChildId.length - 1])
            shemyChild(tableChildId[tableChildId.length - 1])
          }
        })
      })
      activatetable(1)
      tableChild("jd1")
      removeChildNavActive("jd1")
    }
    //массив всех кнопок открытия pdf
    var buttons = document.querySelectorAll(".generate-pdf")
    var makepdf = document.querySelectorAll(".content-shemy-left")

    var shemyTime = document.querySelectorAll(".content-shemy-time")

    buttons.forEach((el, ind) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault()
        //формируем содержимое документа
        var docDefinition = {
          content: [],

          styles: {
            header: {
              fontSize: 22,
              bold: true,
              color: "#D41D12",
              alignment: "center",
            },
            anotherStyle: {
              fontSize: 29,
              bold: true,
              color: "#D41D12",
              alignment: "center",
            },
          },
        }
        //формируем заголовок, тел и адрес слева от кнопки
        const btnId = el.getAttribute("id").split("-")

        const objectTies = document.querySelectorAll(
          `#shemy-left-${btnId[btnId.length - 1]} .pdf-object-title`
        )

        const objectTel = document.querySelectorAll(
          `#shemy-left-${btnId[btnId.length - 1]} .pdf-tel`
        )

        const objectAdress = document.querySelectorAll(
          `#shemy-left-${btnId[btnId.length - 1]} .card-adress-link b`
        )

        const objectTimeBox = document.querySelectorAll(
          `#shemy-right-${btnId[btnId.length - 1]} .content-shemy-time-box`
        )

        let title = document.querySelector(
          ".table-content-fil-btn-active.driving_directions"
        ).innerText

        const toDataURL = (url) =>
          fetch(url)
            .then((response) => response.blob())
            .then(
              (blob) =>
                new Promise((resolve, reject) => {
                  const reader = new FileReader()
                  reader.onloadend = () => resolve(reader.result)
                  reader.onerror = reject
                  reader.readAsDataURL(blob)
                })
            )

        //подставляем поля в содержимое документа
        let arrPromise = [
          toDataURL(
            `${window.location.origin}/wp-content/themes/intentionally-blank/assets/img/logo-for-pdf.png`
          ).then((dataUrl) => {
            docDefinition.content.push({ image: dataUrl, width: 150 })
            docDefinition.content.push({ text: ["\n\n"] })
            docDefinition.content.push({
              text: "Схема проезда" + "\n\n",
              style: "anotherStyle",
            })
            docDefinition.content.push({
              text: [title + "\n\n"],
              style: "header",
            })
          }),
        ]

        objectTies.forEach((objectEl, objectInd) => {
          console.log(objectAdress[objectInd], "objectAdress[objectInd]")
          console.log(objectTel[objectInd], "objectTel[objectInd]")

          let imgShemy = objectAdress[objectInd].dataset.mapimg

          if (!objectAdress[objectInd].dataset.mapimg) {
            imgShemy = `${window.location.origin}/wp-content/themes/intentionally-blank/assets/img/logo-for-pdf.png`
          }

          arrPromise.push(
            toDataURL(imgShemy).then((dataUrl) => {
              docDefinition.content.push({ text: [objectEl.innerText + "\n"] })
              docDefinition.content.push({
                text: [objectTel[objectInd].innerText + "\n"],
              })
              docDefinition.content.push({
                text: [objectAdress[objectInd].innerText + "\n\n"],
              })
              docDefinition.content.push({ image: dataUrl, width: 450 })
              docDefinition.content.push({ text: ["\n"] })
              docDefinition.content.push({ text: ["Время работы" + "\n\n"] })

              for (let childEl of objectTimeBox[objectInd].children) {
                if (!childEl.classList.contains("object-title")) {
                  docDefinition.content.push({
                    text: [childEl.innerText + "\n"],
                  })
                }
              }

              // docDefinition.content.push({text:['\n\n']})
            })
          )
        })

        Promise.all(arrPromise)
          .then((dataUrl) => {
            pdfMake.createPdf(docDefinition).open()
          })
          .then(() => {
            console.log(docDefinition.content, "docDefinition.content")
          })
      })
    })
  }

  if (document.querySelector(".animation__block")) {
    const animationBlock = document.querySelectorAll(".animation__block")

    const animationBlockRun = () => {
      animationBlock.forEach((block) => {
        if (
          block.getBoundingClientRect().top < window.innerHeight - 40 &&
          !block.classList.contains("animation__stop")
        ) {
          let indSecond = 200
          block.querySelectorAll(".animation__block__elem").forEach((elem) => {
            indSecond += 200
            setTimeout(() => {
              elem.classList.remove("animation__block__elem__start")
            }, indSecond)
          })
          block.classList.add("animation__stop")
        }
      })
    }
    window.addEventListener("scroll", () => {
      animationBlockRun()
    })

    window.onload = function () {
      animationBlockRun()
    }
  }

  if (document.querySelector(".btn-show-text")) {
    let text = document.querySelector(".text-hidd")
    let textH = document.querySelector(".ch-t").clientHeight

    let isText = false

    document.querySelector(".btn-show-text").addEventListener("click", (ev) => {
      isText = !isText
      if (isText) {
        text.style.maxHeight = textH + "px"
      } else {
        text.style.maxHeight = 0 + "px"
      }

      ev.target.classList.toggle("btn-show-text-active")
    })
  }

  if (document.querySelector(".big-inf-map")) {
    const mapSvg = document.querySelector(".big-inf-map")
    window.addEventListener("scroll", () => {
      if (
        mapSvg.getBoundingClientRect().top < window.innerHeight - 40 &&
        !mapSvg.classList.contains("stop")
      ) {
        mapSvg.classList.add("stop")

        let allRegion = document.querySelectorAll(".reg")

        let allMapIcon = document.querySelectorAll(".map-city")

        let indSecond = 200
        for (let i = 1; i <= allRegion.length; i++) {
          indSecond += 200
          setTimeout(() => {
            mapSvg
              .querySelector(`#region-${i}`)
              .classList.add("map-region-active")
            document
              .querySelectorAll(`.map-city-${i}`)
              .forEach((elPoit) => elPoit.classList.add("map-city-active"))
            console.log(document.querySelectorAll(`.map-city-${i}`))
          }, indSecond)
        }

        setTimeout(() => {
          allRegion.forEach((ele) => {
            if (ele.getAttribute("id") !== "region-1") {
              document.querySelectorAll(`.map-city`).forEach((elREm) => {
                if (!elREm.classList.contains("map-city-1")) {
                  elREm.classList.remove("map-city-active")
                }
              })
              ele.classList.remove("map-region-active")
            }
          })
        }, 1500)
      }
    })
  }

  //video modal
  $(".show_video").click(function () {
    $(".popup-black.video_modal_main").addClass("d-flex")
    console.log("show_video")
    return false
  })
  let video = document.querySelectorAll(".video_presentation")
  function stopVideo() {
    video.forEach((i) => {
      i.pause()
      //  i.currentTime = 0;
      console.log(video, "video")
    })
  }
  $(".close_video_modal").click(function () {
    console.log("stopVideo")
    stopVideo()
    $(this).parents(".popup-black", ".close_video_modal").removeClass("d-flex") //.fadeOut();
    return false
  })
  $(".close_modal").click(function () {
    $(this).parents(".popup-black", ".close_modal").removeClass("d-flex") //.fadeOut();
    stopVideo()
    return false
  })

  $(".close_modal").click(function () {
    $(this).parents(".form-popup-black", ".close_modal").removeClass("d-flex") //.fadeOut();
    stopVideo()
    return false
  })
  $(document).keydown(function (e) {
    if (e.keyCode === 27) {
      e.stopPropagation()
      stopVideo()
      $(".popup-black").removeClass("d-flex") //.fadeOut();
    }
  })

  $(".popup-black").click(function (e) {
    if ($(e.target).closest(".popup").length == 0) {
      stopVideo()
      $(this).removeClass("d-flex") //.fadeOut();
    }
  })
  $(document).keydown(function (e) {
    if (e.keyCode === 27) {
      e.stopPropagation()
      $(".form-popup-black").removeClass("d-flex") //.fadeOut();
    }
  })

  $(".form-popup-black").click(function (e) {
    if ($(e.target).closest(".popup").length == 0) {
      $(this).removeClass("d-flex") //.fadeOut();
    }
  })
})
