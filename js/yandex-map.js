jQuery(function ($) {
  function changeCity(city) {
    console.log('city', city)
/* 
    city.object_fil.forEach(el => {

    }) */
  }
  function changeItemMap(item) {
    console.log('item', item)
  }
  function changeRegion(region) {
    console.log('region', region)
  }

  if (document.querySelector("#map")) {
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
      var myMap = new ymaps.Map("map", mapInitial)

      const myGeoObjects = {
        type: "FeatureCollection",
        features: [],
      }
      //получаем с бека данные по филиалам, парсим их в отдельный массив
      const dataIcons = document.querySelectorAll(".region-elem")
      const bigData = []

      dataIcons.forEach((el) => {
        let dataParse = JSON.parse(el.dataset.city)
        bigData.push(dataParse)
      })

      //выводим метки на карте по дынным из массива
      bigData.forEach((elem) => {
        elem.object_fil.forEach((el) => {
          let officeCoord = []
          let iconSrc = ""
          if (el.object_type === "Офис и склад") {
            officeCoord = el.ofice_coord
              .slice(1, -1)
              .replace(/\s+/g, "")
              .split(",")
            iconSrc =
              "/wp-content/themes/intentionally-blank/assets/img/svg/office-and-sklad-icon.svg"
          } else if (el.object_type === "Офис") {
            officeCoord = el.ofice_coord
              .slice(1, -1)
              .replace(/\s+/g, "")
              .split(",")
            iconSrc =
              "/wp-content/themes/intentionally-blank/assets/img/svg/office-icon.svg"
          } else if (el.object_type === "Склад") {
            officeCoord = el.sklad_coord
              .slice(1, -1)
              .replace(/\s+/g, "")
              .split(",")
            iconSrc =
              "/wp-content/themes/intentionally-blank/assets/img/svg/sklad-icon.svg"
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

      function filterIcon(filtr, parent) {
        var showObjects,
          filIcon = new ymaps.GeoQueryResult()

        filIcon = myObjects.search(`options.${parent} = "${filtr}"`)
        shownObjects = filIcon.addToMap(myMap)
        myObjects.remove(shownObjects).removeFromMap(myMap)
        myMap.setZoom(4)

        if (window.innerWidth < 1200 && window.innerWidth > 600) {
          myMap.setZoom(3)
        } else if (window.innerWidth <= 600) {
          myMap.setZoom(2)
        }
        myMap.setCenter([49.624598, 87.691358])
      }

      ///область отвечает за логику карточек

      const regionElem = document.querySelectorAll(".region-elem")

      const skladAndOffice = document.querySelector(".box-sklad-and-office")
      const office = document.querySelector(".box-office")
      const sklad = document.querySelector(".box-sklad")

      const createCardElem = (el, name, multi, cInd) => {
        const adressWrap = document.createElement("div")
        adressWrap.classList.add("card-adress-wrap")
        const adressTitle = document.createElement("p")

        adressTitle.classList.add("card-adress-title")
        adressWrap.append(adressTitle)

       

        const adressLink = document.createElement("a")
        adressLink.classList.add("card-adress-link")
        const coord = el[name + "_" + "coord"]
          .slice(1, -1)
          .replace(/\s+/g, "")
          .split(",")
        adressLink.href = `https://yandex.ru/maps/?ll=${
          Number(coord[1]) + "," + Number(coord[0])
        }&z=18&l=map`
        adressLink.innerText = el[name + "_" + "adress"]
        adressLink.target = "_blank"
        adressWrap.append(adressLink)

        if (el.sklad_ps) {
          const adressPs = document.createElement("p")
          adressPs.classList.add("card-adress-ps")
          adressWrap.append(adressPs)
          adressPs.innerText = el.sklad_ps
        }

        const cardMapBtn = document.createElement("button")
        cardMapBtn.classList.add("card-map-btn")
        cardMapBtn.addEventListener("click", () => {
          myMap.setCenter([Number(coord[0]), Number(coord[1])], 12)
          window.scrollTo(0, 0)
        })
        cardMapBtn.setAttribute("data-clikmap", `${coord}`)

        adressWrap.append(cardMapBtn)

        const cardMapRow = document.createElement("div")
        cardMapRow.classList.add('card_map_row')
        adressWrap.append(cardMapRow)

        /* const cardMapBtnSpan = document.createElement("span")
        cardMapBtnSpan.innerText = "Показать на карте"
        cardMapBtn.append(cardMapBtnSpan) */

        if (el[name + "_" + "tel_people"]) {
          const bossName = document.createElement("p")
          bossName.innerText = el[name + "_" + "tel_people"]
          adressWrap.append(bossName)
        }

        const cardTel = document.createElement("a")
        cardTel.classList.add("card-tel")
        cardTel.href = `tel:${el[name + "_" + "tel"]}`
        cardTel.innerText = `${el[name + "_" + "tel"]}`
        cardMapRow.append(cardTel)

        if (el.boss_name) {
          const bossName = document.createElement("p")
          bossName.innerText = el.boss_name
          adressWrap.append(bossName)

          const bossTel = document.createElement("a")
          bossTel.classList.add("card-tel")
          bossTel.href = `tel:${el.boss_tel}`
          bossTel.innerText = `${el.boss_tel}`
          adressWrap.append(bossTel)
        }

        if (el.market_people) {
          const marketPeople = document.createElement("p")
          marketPeople.innerText = el.market_people
          adressWrap.append(marketPeople)

          const marketTel = document.createElement("a")
          marketTel.classList.add("card-tel")
          marketTel.href = `tel:${el.market_tel}`
          marketTel.innerText = ` ${el.market_tel}`
          adressWrap.append(marketTel)
        }

        const cardTime = document.createElement("p")
        cardTime.classList.add("card-time")
        cardTime.innerHTML = el[name + "_" + "time"]
        cardMapRow.append(cardTime)

        const cardTimeTitle = document.createElement("p")
        cardTimeTitle.classList.add("card-time-title")
        cardTimeTitle.innerText = "Время работы"
        cardTime.prepend(cardTimeTitle)


       

        if (name === "ofice") {
          adressTitle.innerText = "Главный офис"
        } else if (name === "sklad") {
          adressTitle.innerText = "Адрес склада"

          const skladWrap = document.createElement("div")
          skladWrap.classList.add("card-sklad-wrap")
          if (!multi) {
            skladWrap.classList.add("disabled")
          }
          /* adressWrap.append(skladWrap) */

      /*     const skladTitle = document.createElement("p")
          skladTitle.classList.add("card-sklad-title")
          skladTitle.innerText = "Прием груза:"
          skladWrap.append(skladTitle) */

          const skladBtnWrap = document.createElement("div")
          skladBtnWrap.classList.add("card-sklad-btn-wrap")
          skladWrap.append(skladBtnWrap)

        /*   const iconDocument = document.createElement("img")
          iconDocument.src =
            "/img/PDFdoc.svg"
          skladBtnWrap.append(iconDocument)
 */
          const btnDocument = document.createElement("p")
          btnDocument.classList.add("card-btn-doc")
          btnDocument.classList.add("generate-pdf")
          if (el.shemy_img_sklad) {
            btnDocument.setAttribute("data-shema", `${el.shemy_img_sklad}`)
          } else {
            btnDocument.setAttribute("data-shema", ``)
          }
          btnDocument.setAttribute("data-shema", `${el.shemy_img_sklad}`)
          btnDocument.addEventListener("click", (ev) => {
            createPDF(ev.target, cInd)
          })
          btnDocument.innerText = `Открыть в формате PDF`
          btnDocument.append = `Открыть в формате PDF`
          skladBtnWrap.append(btnDocument)


          /* const cardPdf = document.createElement("p")
          cardPdf.classList.add("cardPdfButton")
          cardPdf.innerHTML = el[name + "_" + "time"] */
          cardMapRow.append(btnDocument)
        }
        return adressWrap
      }

      const contentNav = document.querySelector(".contacts-nav-content")

      const createCardContact = (arr) => {
        contentNav.innerHTML = ""
        let cityInd = 0
        let cityName = ""

        arr.forEach((arrEl, arrInd) => {
          let newArrayOne = arrEl.elem.filter((each) => {
            return each.object_type === "Склад"
          })
          let newArray = newArrayOne[newArrayOne.length - 1]
          arrEl.elem.forEach((el) => {
            if (cityName !== el.city) {
              cityInd++
              cityName = el.city
            }

            if (!document.querySelector(`.city-${cityInd}`)) {
              let contentCityWrapper = document.createElement("div")
              contentCityWrapper.classList.add("city-wrapper")
              contentCityWrapper.classList.add(`city-${cityInd}`)
              contentNav.append(contentCityWrapper)

              const cardWrapHead = document.createElement("div")
              cardWrapHead.classList.add("card-wrap-head")
              contentCityWrapper.append(cardWrapHead)

             /*  const iconCity = document.createElement("img")
              iconCity.src = el.icon
              cardWrapHead.append(iconCity) */

              const cardTitle = document.createElement("p")
              cardTitle.classList.add("card-title")
              cardTitle.innerText = el.city
              cardWrapHead.append(cardTitle)

              const wrapS = document.createElement("div")
              wrapS.classList.add("wrap-wrap")
              contentCityWrapper.append(wrapS)
            }

            let cityActWrap = document.querySelector(
              `.city-${cityInd} .wrap-wrap`
            )

            const cardWrap = document.createElement("div")
            cardWrap.classList.add("card-wrap")
            cardWrap.setAttribute("data-obj", el.object_type)
            cardWrap.setAttribute("data-city", el.city)

            const allCardWrap = document.querySelectorAll(".card-wrap")

            let isWrap = true

            allCardWrap.forEach((cardEl) => {
              if (
                cardEl.getAttribute("data-obj") === el.object_type &&
                cardEl.getAttribute("data-city") === el.city
              ) {
                if (el.ofice_adress) {
                  cardEl.append(createCardElem(el, "ofice"))
                }
                if (el.sklad_adress) {
                  if (el.big_ind === newArray.big_ind) {
                    cardEl.append(createCardElem(el, "sklad", true, cityInd))
                  } else {
                    cardEl.append(createCardElem(el, "sklad", false, cityInd))
                  }
                }
                isWrap = false
              }
            })

            if (isWrap) {
              cityActWrap.append(cardWrap)

              if (el.ofice_adress) {
                cardWrap.append(createCardElem(el, "ofice"))
              }
              if (el.sklad_adress) {
                if (newArrayOne.length < 2) {
                  cardWrap.append(createCardElem(el, "sklad", true, cityInd))
                } else {
                  cardWrap.append(createCardElem(el, "sklad", false, cityInd))
                }
              }
            }
          })

          /* if (arrEl.img) {
            let dataImg = arrEl.img
            let cityActWrap = document.querySelector(
              `.city-${cityInd} .wrap-wrap`
            )

            const cardWrap = document.createElement("div")
            cardWrap.classList.add("card-wrap")
            cityActWrap.append(cardWrap)

            const cardImgWrap = document.createElement("div")
            cardImgWrap.classList.add("card-img-wrap")
            cardWrap.append(cardImgWrap)

            dataImg.forEach((el, ind) => {
              const imgWrap = document.createElement("a")
              imgWrap.setAttribute(`data-fancybox`, `city-img-${cityInd}`)
              imgWrap.setAttribute("data-src", `${el[0].full}`)
              cardImgWrap.append(imgWrap)

              const imgEl = document.createElement("img")
              imgEl.src = el[0].thumb

              imgWrap.append(imgEl)
            })
          } */
        })
      }

      const regions = document.querySelectorAll(".region")
      const btnFilter = document.querySelectorAll(".btn-filter-box p")

      btnFilter.forEach((btnElemF) => {
        btnElemF.addEventListener("click", () => {
          regions.forEach((elem) => {
            if (elem.classList.contains("region-active")) {
              for (key of elem.children[1].children) {
                key.classList.remove("elem-active")
              }
              elem.classList.remove("region-active")
            }
          })

          let filContent = ""

          if (btnElemF.innerText === "Филиал") {
            filContent = "Офис"
          } else if (btnElemF.innerText === "Филиал и склад") {
            filContent = "Офис и склад"
          } else if (btnElemF.innerText === "Склад") {
            filContent = "Склад"
          } else if (btnElemF.innerText === "Главный офис") {
            filContent = "Главный офис"
          }
          let arrFiltr = []
          regionElem.forEach((el) => {
            let newObjData = {}

            const regData = JSON.parse(el.dataset.city)
            regData.object_fil.forEach((elemReg) => {
              if (elemReg.object_type === filContent) {
                newObjData.elem = []
                newObjData.elem.push(elemReg)
              }

              if (regData.gallery_fil && !newObjData.img) {
                newObjData.img = regData.gallery_fil
              }
            })

            if (newObjData.elem) {
              arrFiltr.push(newObjData)
            }
          })
          console.log(arrFiltr)

          createCardContact(arrFiltr)
          filterIcon(filContent, "keyType")
          ymaps
        })
      })

      // клик на карте
      window.myObjects = ymaps
        .geoQuery(myGeoObjects)
        .addEvents("click", function (e) {
          let target = e.get("target").options.get("big_ind")
          changeItemMap(target)
          let newObjData = {
            elem: [],
          }
          bigData.forEach((el) => {
            el.object_fil.forEach((elem) => {
              if (target === elem.big_ind) {
                newObjData.elem.push(elem)
                newObjData.img = el.gallery_fil
              }
            })
          })
          createCardContact([newObjData])
        })
        .addToMap(myMap)

      // клик на город слева
      regionElem.forEach((el, ind) => {
        el.addEventListener("click", () => {
          
          regions.forEach((elem) => {
            if (elem.classList.contains("region-active")) {
              for (key of elem.children[1].children) {
                key.classList.remove("elem-active")
              }
              elem.classList.remove("region-active")
            }
          })
          el.parentElement.parentElement.classList.add("region-active")
          el.parentElement.parentElement.style.maxHeight =
            el.parentElement.parentElement.children[0].clientHeight +
            el.parentElement.parentElement.children[1].clientHeight +
            "px"
          el.classList.add("elem-active")
          let elemData = JSON.parse(el.dataset.city)

          changeCity(elemData)
          ymaps
            .geocode(elemData.object_fil[0].city, {
              results: 1,
            })
            .then(function (res) {
              // Выбираем первый результат геокодирования.
              var firstGeoObject = res.geoObjects.get(0),
                // Координаты геообъекта.
                coords = firstGeoObject.geometry.getCoordinates(),
                // Область видимости геообъекта.
                bounds = firstGeoObject.properties.get("boundedBy")

              myMap.setCenter(coords, 10)
              window.scrollTo(0, 0)
            })
          filterIcon(elemData.object_fil[0].city, "city")
          createCardContact([
            { elem: elemData.object_fil, img: elemData.gallery_fil },
          ])
        })
      })

      //блок отвечает ховер по федеральным округам

      const regionsB = document.querySelectorAll(".region")
      regionsB.forEach((el, ind) => {
        el.style.maxHeight =
          el.querySelector(".region-title").clientHeight + "px"
        el.addEventListener("mouseenter", (ev) => {
          if (!el.classList.contains("region-active")) {
            el.style.maxHeight =
              el.querySelector(".region-title").clientHeight +
              el.querySelector(".region-elem-wrap").clientHeight +
              "px"
          }
        })

        el.addEventListener("mouseleave", () => {
          if (!el.classList.contains("region-active")) {
            el.style.maxHeight =
              el.querySelector(".region-title").clientHeight + "px"
          }
        })
      })

      //клик по навигации округов

      const regionTitle = document.querySelectorAll(".region-title")
      regionTitle.forEach((el, ind) => {
        el.addEventListener("click", () => {
       
          regionTitle.forEach((elem, index) => {
            if (
              elem.parentElement.classList.contains("region-active") &&
              index !== ind
            ) {
              elem.parentElement.classList.remove("region-active")
              for (key of elem.parentElement.querySelector(".region-elem-wrap")
                .children) {
                key.classList.remove("elem-active")
              }
              elem.parentElement.style.maxHeight = elem.clientHeight + "px"

              el.parentElement.classList.add("region-active")
              el.parentElement.style.maxHeight =
                el.clientHeight +
                el.parentElement.querySelector(".region-elem-wrap")
                  .clientHeight +
                "px"
            }
          })
          el.parentElement.classList.add("region-active")
          el.parentElement.style.maxHeight =
            el.clientHeight +
            el.parentElement.querySelector(".region-elem-wrap").clientHeight +
            "px"

          const regionActive = el.textContent

          const regionSendArr = []

          bigData.forEach((regionData) => {
            const regionSendData = {}
            if (regionData.object_fil[0].region === regionActive) {
              regionSendData.elem = regionData.object_fil

              if (regionData.gallery_fil) {
                regionSendData.img = regionData.gallery_fil
              }
              regionSendArr.push(regionSendData)
            }
          })

          filterIcon(regionActive, "region")

          changeRegion(regionSendArr)

          console.log('regionSendArr: ', regionSendArr)

          createCardContact(regionSendArr)
        })
      })
      let navStr = window.location.search.substring(6)

      bigData.forEach((el, ind) => {
        if (navStr && el.id == navStr) {
          createCardContact([{ elem: el.object_fil, img: el.gallery_fil }])
        } else if (el.object_fil[0].city === "Москва") {
          createCardContact([{ elem: el.object_fil, img: el.gallery_fil }])
        }
      })
    }

    // const createPDF = (el, cI) => {
    //
    //
    //
    //     // const btnId = el.getAttribute('id').split('-');
    //
    //
    //
    //
    //
    // }

    var buttons = document.querySelectorAll(".generate-pdf")

    const createPDF = (el, cI) => {
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
          headerLitle: {
            bold: true,
            fontSize: 20,
          },
          psHead: {
            bold: true,
            fontSize: 20,
            color: "#D41D12",
          },
        },
      }

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

      const parentBtn =
        el.parentElement.parentElement.parentElement.parentElement.parentElement
          .parentElement

      const objectTies = parentBtn.querySelectorAll(".card-adress-title")

      const objectTel = parentBtn.querySelectorAll(`.card-tel`)

      const objectAdress = parentBtn.querySelectorAll(`.card-adress-link`)

      const objectTimeBox = parentBtn.querySelectorAll(`.card-time`)

      const title = parentBtn.querySelector(".card-title").innerText
      let arrPromise = []

      toDataURL(
        `${window.location.origin}/wp-content/themes/intentionally-blank/assets/img/logo-for-pdf.png`
      )
        .then((dataUrl) => {
          docDefinition.content.push({
            alignment: "justify",
            columns: [
              {
                image: dataUrl,
                width: 150,
              },
              {
                text: "Схема проезда" + "\n" + title,
                style: "anotherStyle",
              },
            ],
          })
          docDefinition.content.push({ text: ["\n\n"] })
        })
        .then((dataUrl) => {
          objectTies.forEach((objectEl, objectInd) => {
            let imgShemy = false
            if (objectEl.parentElement.querySelector(".card-btn-doc")) {
              imgShemy =
                objectEl.parentElement.querySelector(".card-btn-doc").dataset
                  .shema
            }

            if (!imgShemy || imgShemy === "false") {
              docDefinition.content.push({
                text: [objectEl.innerText + "\n\n"],
                style: "headerLitle",
              })
              if (
                objectEl.nextElementSibling.classList.contains("card-adress-ps")
              ) {
                docDefinition.content.push({
                  text: [objectEl.nextElementSibling.innerText + "\n"],
                  style: "psHead",
                })
              }
              docDefinition.content.push({
                text: [objectAdress[objectInd].innerText + "\n"],
              })
              docDefinition.content.push({
                text: [objectTel[objectInd].innerText + "\n\n"],
              })
              docDefinition.content.push({ text: ["Время работы" + "\n\n"] })

              for (let childEl of objectTimeBox[objectInd].children) {
                if (!childEl.classList.contains("object-title")) {
                  docDefinition.content.push({
                    text: [childEl.innerText + "\n"],
                  })
                }
              }
              docDefinition.content.push({ text: ["\n\n"] })
            } else {
              arrPromise.push(
                toDataURL(imgShemy).then((dataUrl) => {
                  docDefinition.content.push({
                    text: [objectEl.innerText + "\n\n"],
                    style: "headerLitle",
                  })
                  docDefinition.content.push({
                    text: [objectAdress[objectInd].innerText + "\n"],
                  })
                  docDefinition.content.push({
                    text: [objectTel[objectInd].innerText + "\n\n"],
                  })
                  docDefinition.content.push({
                    text: ["Время работы" + "\n\n"],
                  })

                  for (let childEl of objectTimeBox[objectInd].children) {
                    if (!childEl.classList.contains("object-title")) {
                      docDefinition.content.push({
                        text: [childEl.innerText + "\n"],
                      })
                    }
                  }
                  docDefinition.content.push({ text: ["\n\n"] })
                  docDefinition.content.push({ image: dataUrl, width: 450 })
                  docDefinition.content.push({ text: ["\n\n"] })
                })
              )
            }
          })
        })
        .then((res) => {
          Promise.all(arrPromise).then((res) => {
            pdfMake.createPdf(docDefinition).open()
          })
        })
    }
  }
})
