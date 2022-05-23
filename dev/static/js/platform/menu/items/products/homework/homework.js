/* eslint-disable */
import Utils from "../../../../utils/utils.js";

const utils = new Utils();

class Homework {
  init() {
    let required = [];
    let preloads = [];
    let filterObj = filter;

    if (items) {
      const homeworksItems = items.concat();
      const table = document.querySelector(".platform-table__body");
      const filterMenu = document.querySelector(".platform__filter");
      const filterBtn = document.querySelector(".platform__filter--btn");
      const menu = document.querySelector("[rate-menu-homework]");

      if (filterBtn) {
        filterWorker(filterBtn, filterMenu, filterObj);
      }

      homework(homeworksItems, table, menu, preloads);
    } else {
      /* Отправка на проверку */
      const saveHomework = document.querySelector(
        ".homework-comments__send--btn"
      );

      if (saveHomework) {
        const uploadBtns = document.querySelectorAll(
          ".homework-comment__input--file"
        );
        const form = document.querySelector(".homework-comments__send");

        uploadBtns.forEach((item) => {
          if (item.getAttribute("id") === "imageFile") {
            const uploadClone = getCloneBefore(item);
            const uploadFilesForRate = uploadFiles.bind(this, preloads, form);
            uploadClone.addEventListener("change", uploadFilesForRate);
          } else {
            const uploadClone = getCloneAppend(item);
            const uploadFilesForRate = uploadFiles.bind(this, preloads, form);
            uploadClone.addEventListener("change", uploadFilesForRate);
          }
        });

        saveHomework.addEventListener("click", function (e) {
          const t = e.target;

          t.classList.add("disabled");

          if (validateHomework("admin", false)) {
            const form = document.querySelector("[save-homework-form]");
            const data = new FormData(form);
            setFilesToDataSend(data, preloads);

            let mainHref = "saveHomework";
            const checkArray = document.location.href.split("?");

            if (checkArray.length > 1) {
              mainHref = document.location.href.split("?")[0] + "/saveHomework";
            }

            $.ajax({
              type: "POST",
              url: mainHref + "/",
              data: data,
              processData: false,
              contentType: false,
              cache: false,
              success: function (data) {
                hideLoader();
                t.classList.remove("disabled");
                afterSaveHomework(data, form);
              },
              error: function (data) {
                hideLoader();
                t.classList.remove("disabled");
              },
              beforeSend: function () {
                showLoader();
              },
            });
          } else {
            setTimeout(() => {
              t.classList.remove("disabled");
            }, 1500);
          }
        });
      }

      function afterSaveHomework(data, form) {
        const li = document.createElement("li");
        li.classList.add("homework-comments__item");

        const div = document.createElement("div");
        div.classList.add("comments-item__wrapper");

        const p = document.createElement("p");

        const comments = document.createElement("ul");
        comments.classList.add("homework-comments__gallery");
        comments.classList.add("custom-scroll");

        const commentsData = data.comments.sort((a, b) => a.id - b.id);
        const lastComment = commentsData[commentsData.length - 1];
        const commentFiles = lastComment.homeworkFiles;

        p.innerText = lastComment.text;

        div.appendChild(p);

        if (commentFiles) {
          comments.classList.add("full");
          div.appendChild(comments);
        }

        li.appendChild(div);

        const commentsWrapper = document.querySelector(
          ".homework-comments__wrapper"
        );

        if (commentsWrapper) {
          commentsWrapper.appendChild(li);
        }

        setGalleryFiles(commentFiles, li);

        const notify = document.createElement("div");
        notify.classList.add("content-element__wrapper");
        notify.classList.add("homework__popup");

        const notifyText = document.createElement("p");
        notifyText.classList.add("homework__popup--text");
        notifyText.innerText =
          "Спасибо! Ваше домашнее задание принято на проверку, ответ получите в скором времени!";

        notify.appendChild(notifyText);

        form.parentNode.appendChild(notify);
        form.remove();
      }

      renderComments(comments, rate);
    }

    function renderComments(comments, rate) {
      console.log(comments);
      if (comments?.length) {
        const commentsWrapper = document.querySelector(
          ".homework-comments__wrapper"
        );

        utils.removeChildren(commentsWrapper);

        const commentItems = comments
          .sort((a, b) => b.id - a.id)
          .map((item, count) => {
            const files = item.homeworkFiles;

            return `
						<li class="homework-comments__item ${item.type === "admin" ? "admin" : ""}">
							<div class="comments-item__wrapper">
								<p>${item.text}</p>
									${
                    files.length
                      ? `<ul class="homework-comments__gallery custom-scroll ${
                          files.length ? "full" : ""
                        }">
											${files.map((file, index) => setCommentFiles(file, index, false)).join("")}
										</ul>`
                      : ""
                  }

									${
                    count == comments.comments.length - 1 && rate
                      ? `<div class="homework-rating">Оценка: ${rateInComment(
                          rate
                        )}</div>`
                      : ""
                  }
							</div>
						</li>
					`;
          })
          .join("");

        commentsWrapper.insertAdjacentHTML("afterbegin", commentItems);
      }
    }

    function rateInComment(rate) {
      const rates = [1, 2, 3, 4, 5];

      return rates
        .map((item, index) => {
          const isFull = item <= rate;

          console.log(isFull);

          return isFull
            ? `<span class="homework-rate__score ${
                index === 0 ? "ml_5" : ""
              }"></span>`
            : '<span class="homework-rate__score-empty"></span>';
        })
        .join("");
    }

    function getParent(element, cls) {
      while (
        (element = element.parentElement) &&
        !element.classList.contains(cls)
      );
      return element;
    }

    function homework(items, table, menu, preloads) {
      if (items && table && menu) {
        const renderTable = async function renderHomeworks(homeworks, table) {
          for (let i = 0; i < homeworks.length; i++) {
            const homework = homeworks[i];
            const tr = document.createElement("tr");
            tr.classList.add("platform-table__row");
            tr.classList.add("homework-table__row");
            tr.setAttribute("data-homework", homework.homework.id);
            tr.setAttribute("data-deal", homework.idDeal);
            tr.setAttribute("data-client", homework.client.id);
            tr.innerHTML = await templateHomeworkrow(homework);
            table.appendChild(tr);
          }
        };

        function templateHomeworkrow(item) {
          return `
            <td class="platform-table__column homework-table__column">${
              item.homework.createdDate ? item.homework.createdDate : ""
            }</td>
            <td js-client-id class="platform-table__column homework-table__column">
                <a href="" class="homework-table__link" js-client-card title="${
                  item.client.name
                }">${item.client.name ? item.client.name : ""}</a>
            </td>
            <td class="platform-table__column homework-table__column">${
              item.manager.name ? item.manager.name : ""
            }</td>
            <td class="platform-table__column homework-table__column">
                <a href="" title="${
                  item.course.name
                }" js-course-btn class="homework-table__link">${
            item.course.name ? item.course.name : ""
          }</a>
                <p class="homework-table__course-type">${
                  item.course.courseType ? item.course.courseType : ""
                }</p>
            </td>
            <td class="platform-table__column homework-table__column">
                <a href="" js-module class="homework-table__link" title="${
                  item.module.index + " | " + item.module.title
                }">${item.module.index + " | " + item.module.title}</a>
            </td>
            <td class="platform-table__column homework-table__column">${
              item.lessonRate ? item.lessonRate : "Нет"
            }</td>
            <td class="platform-table__column homework-table__column">${
              item.stream.id ? item.stream.id : ""
            }</td>
            <td class="platform-table__column homework-table__column">${
              item.stream.startDate ? item.stream.startDate : ""
            }</td>
            <td class="platform-table__column homework-table__column homework__rate" estimation>
                ${
                  item.homework.rate != 0
                    ? '<span class="homework__rate--icon"></span>'
                    : ""
                }
                <span class="homework__rate--value">${
                  item.homework.rate ? item.homework.rate : "Нет"
                }</span>
            </td>
            <td rate class="platform-table__column homework-table__column">
                <div rate-homework class="homework-rate 
                    ${
                      item.homework.rate == 0 && item.homework.checker == null
                        ? "homework-rate__check"
                        : item.homework.rate !== 0
                        ? "homework-rate__view"
                        : item.homework.rate == 0 &&
                          item.homework.checker != null
                        ? "homework-rate__check"
                        : ""
                    }">
                    ${
                      item.homework.rate == 0 && item.homework.checker == null
                        ? "Проверить"
                        : item.homework.rate !== 0
                        ? "Проверено"
                        : item.homework.rate == 0 &&
                          item.homework.checker != null
                        ? "Пересдача"
                        : ""
                    }
                </div>
            </td>
            <td checker class="platform-table__column homework-table__column">${
              item.homework.checker ? item.homework.checker : ""
            }</td>
        `;
        }

        renderTable(items, table).then(() => {
          const openMenuBtns = document.querySelectorAll("[rate-homework]");

          if (openMenuBtns) {
            openMenuBtns.forEach((item) => {
              const open = getCloneAppend(item);
              const doMenuOpened = openMenu.bind(this, menu);
              open.addEventListener("click", doMenuOpened);
            });
          }

          const closeBtn = menu.querySelectorAll("[close-menu]");

          if (closeBtn.length) {
            const doMenuClosed = closeHomework.bind(this, menu, preloads);

            closeBtn.forEach((item) => {
              const close = getCloneAppend(item);
              close.addEventListener("click", doMenuClosed);
            });
          }

          const saveBtn = menu.querySelector(".platform-modal__save");
          const save = getCloneBefore(saveBtn);
          const sendResponseHomework = sendResponse.bind(this, menu, preloads);
          save.addEventListener("click", sendResponseHomework);

          const uploadBtns = menu.querySelectorAll(
            ".homework-comment__input--file"
          );

          uploadBtns.forEach((item) => {
            if (item.getAttribute("id") === "imageFile") {
              const uploadClone = getCloneBefore(item);
              const uploadFilesForResponse = uploadFiles.bind(
                this,
                preloads,
                menu
              );
              uploadClone.addEventListener("change", uploadFilesForResponse);
            } else {
              const uploadClone = getCloneAppend(item);
              const uploadFilesForResponse = uploadFiles.bind(
                this,
                preloads,
                menu
              );
              uploadClone.addEventListener("change", uploadFilesForResponse);
            }
          });
        });
      }
    }

    function filterWorker(btn, menu, filter) {
      const openedFilter = openFilter.bind(this, menu);

      const open = getCloneBefore(btn);
      open.addEventListener("click", openedFilter);

      const closeFilterBtn = menu.querySelector(".platform__close--btn");

      if (closeFilterBtn) {
        const closedFilter = closeFilter.bind(this, menu);

        const close = getCloneAppend(closeFilterBtn);
        close.addEventListener("click", closedFilter);
      }

      const applyFilter = menu.querySelector(".filter__apply");

      if (applyFilter) {
        const apply = getCloneBefore(applyFilter);
        const form = menu.querySelector(".filter__form");

        const filteredApply = filterApply.bind(this, form);
        apply.addEventListener("click", filteredApply);
      }

      if (filter) {
        const idCourse = menu.querySelector("[js-course]");

        Array.from(idCourse.children).forEach((item) => {
          item.removeAttribute("selected");

          if (+item.value === filter.idCourse) {
            item.setAttribute("selected", "");
          }
        });

        const status = menu.querySelector("[js-status]");

        Array.from(status.children).forEach((item) => {
          item.removeAttribute("selected");

          if (item.value === filter.homeworkStatus) {
            item.setAttribute("selected", "");
          }
        });
      }
    }

    function filterApply(form) {
      form.submit();
    }

    function openFilter(filter) {
      checkBodyHidden();
    }

    function closeFilter(filter) {
      document.body.style.overflow = "auto";
      const wrapper = filter.querySelector(".filter__wrapper");
      closeModalAnimation(filter, wrapper, true, false);

      const filterBtn = document.querySelector(".platform__filter--btn");
      filterBtn.classList.remove("active");
    }

    function getCloneAppend(item) {
      const clone = item.cloneNode(true);
      item.parentNode.appendChild(clone);
      item.remove();

      return clone;
    }

    function getCloneBefore(item) {
      const clone = item.cloneNode(true);
      item.parentNode.insertBefore(clone, item.nextSibling);
      item.remove();

      return clone;
    }

    function openMenu(menu, e) {
      e.preventDefault();
      const json = {};

      const page = document.querySelector(".page");
      page.style.overflowY = "hidden";

      const t = e.target;

      // Получаем id урока
      json.id = Number($(t).closest(".platform-table__row").data("homework"));

      // Открываем меню, в зависимости от статуса урока (текста в кнопке)
      const text = $(t).text().trim();

      const comments = menu.querySelector(".homework-menu__comments");
      comments.innerHTML = "";

      if (text === "Проверено") {
        getHomework(menu, json, false);
      } else if (text === "Пересдача" || text === "Проверить") {
        getHomework(menu, json, true);
      }
    }

    // POST-запрос для получения данных о домашнем задании
    function getHomework(menu, json, isNeedFormBlocks) {
      checkBodyHidden();
      const getHomeworkData = async function (json) {
        const request = await $.ajax({
          type: "POST",
          contentType: "application/json",
          url: "getHomework",
          data: JSON.stringify(json),
          dataType: "json",
          cache: false,
          success: function (data) {},
          error: function () {},
        });

        return request;
      };

      getHomeworkData(json).then((data) =>
        openHomework(menu, data, isNeedFormBlocks).then(() => {
          const galleryItems = menu.querySelectorAll(".comments-gallery__link");

          adaptiveSlide(galleryItems);
          const chat = menu.querySelector(".homework-menu__comments");
          scrollChatToBottom(chat);
          hideLoader();

          const saveBtn = document.querySelector(".platform-modal__save");
          const responseHomework = document.querySelector(
            ".homework-menu__response"
          );

          if (data.rate) {
            saveBtn.style.display = "none";
            responseHomework.style.display = "none";
          } else {
            responseHomework.style.display = "block";
            saveBtn.style.display = "block";
          }
        })
      );
    }

    // Функция добавления оценки в комментарий
    function getHomeworkRate(menu, data) {
      const rate = data.rate;
      const comment = menu.querySelectorAll(".homework-comments__item");
      const lastComment = comment[comment.length - 1];

      if (rate !== 0) {
        const div = document.createElement("div");
        div.classList.add("homework-rating");

        const span = document.createElement("span");
        span.style.fontSize = "16px";
        span.style.marginRight = "5px";
        span.innerHTML = "Оценка:";

        div.appendChild(span);
        lastComment.appendChild(div);

        for (let i = 0; i < data.rate; i++) {
          // setRateStarInComment(menu, false);
        }

        for (let i = 0; i < 5 - data.rate; i++) {
          // setRateStarInComment(menu, true);
        }
      }
    }

    function clearHomeworkForm() {
      const rates = document.querySelectorAll(
        ".homework__estimation--checkbox"
      );

      rates.forEach((item) => {
        item.checked = false;
      });

      const textArea = document.querySelector(".homework-text__area");
      textArea.innerHTML = "";

      const gallery = document.querySelector(".homework-comments__gallery");

      Array.from(gallery.children).forEach((item) => {
        item.remove();
      });

      const inputs = document.querySelectorAll(
        ".homework-comment__input--file"
      );

      inputs.forEach((item) => {
        item.value = "";
      });

      const idHomework = document.querySelector("[id-homework]");
      idHomework.value = "";
    }

    async function openHomework(menu, data, isNeedFormBlocks) {
      clearHomeworkForm();

      const idHomework = menu.querySelector("[id-homework]");
      idHomework.value = data.id;

      const commentsWrapper = menu.querySelector(".homework-menu__comments");

      const comments = data.comments.sort((a, b) => a.id - b.id);

      comments.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("homework-comments__item");

        if (item.type === "admin") {
          li.classList.add("homework-comments__item--admin");
        }

        li.setAttribute("data-id", `${item.id}`);
        li.innerHTML = setHomeworkComments(item);
        commentsWrapper.appendChild(li);
      });

      const responseCurator = menu.querySelector(".homework-menu__response");

      if (isNeedFormBlocks) {
        responseCurator.classList.remove("hidden");
      } else {
        if (responseCurator.classList.contains("hidden")) {
          responseCurator.classList.add("hidden");
        }
      }

      openModalAnimation(menu);

      await checkBodyHidden();
    }

    function setHomeworkComments(item) {
      const files = item.homeworkFiles;

      const fileItems = files.map((file, index) => {
        return setCommentFiles(file, index, false);
      });

      return `
        <div class="comments-item__wrapper ${
          item.type === "admin" ? "admin" : ""
        }">
            ${item.text}
            <ul class="homework-comments__gallery custom-scroll ${
              item.homeworkFiles.length ? "full" : "empty"
            }">
                ${fileItems.join("")}
            </ul>
        </div>
    `;
    }

    function setCommentFiles(file, index, isNew) {
      let isImage;

      if (file.type === "png" || file.type === "jpg" || file.type === "jpeg") {
        isImage = true;
      } else {
        isImage = false;
      }

      file.name
        .split(".")
        .splice(file.name.split(".").length - 1, 1)
        .join("");

      let type, path;

      if (isNew) {
        type = file.name.split(".")[file.name.split(".").length - 1];
        path = URL.createObjectURL(file);
      }

      return `
            <li ${
              isNew ? `data-index="${index}"` : ""
            } class="comments-gallery__file">
                ${
                  isImage
                    ? `
                    <a data-fancybox href="${
                      isNew ? `${path}` : `/${file.path}`
                    }" class="comments-gallery__link">
                        <img class="comments-gallery__img" src="${
                          isNew ? `${path}` : `/${file.path}`
                        }">
                        ${
                          isNew
                            ? `<span class="comments-img__delete"></span>`
                            : ""
                        }
                    </a>`
                    : `<a class="comments-gallery__link ${
                        isNew ? `${type}` : `${file.type}`
                      }" downloads href="${
                        isNew ? `${path}` : `/${file.path}`
                      }">
                        <span class="comments-gallery__type">${
                          isNew ? `${type}` : `${file.type}`
                        }</span>
                        <span class="comments-gallery__name">${file.name}</span>
                        ${
                          isNew
                            ? `<span class="comments-img__delete"></span>`
                            : ""
                        }
                    </a>`
                }
            </li>`;
    }

    function setRateStarInComment(menu, isEmpty) {
      const commentRate = menu.querySelector(".homework-rating");
      const span = document.createElement("span");
      span.classList.add(
        isEmpty ? "homework-rate__score-empty" : "homework-rate__score"
      );
      span.classList.add(
        isEmpty
          ? "homework-menu__score-impty-icon"
          : "homework-menu__score-icon"
      );

      commentRate.appendChild(span);
    }

    function adaptiveSlide(items) {
      if (items && items.length) {
        items.forEach((item) => {
          const preview = item.querySelector(".gallery-item__preview");

          if (preview) {
            preview.style.visibility = "visible";
            preview.style.width = "auto";
            preview.style.height = "auto";
            preview.style.position = "fixed";
            preview.style.top = "0";

            preview.on("load", function () {
              const figureTypeImg = preview.offsetWidth / preview.offsetHeight;

              if (figureTypeImg < 1) {
                preview.style.width = "auto";
                preview.style.height = "100%";
                preview.style.position = "absolute";
                preview.style.left = "50%";
                preview.style.transform = "translateX(-50%)";
                preview.style.visibility = "visible";
              } else {
                preview.style.top = "0";
                preview.style.width = "100%";
                preview.style.position = "relative";
                preview.style.height = "100%";
                preview.style.visibility = "visible";
              }
            });
          }
        });
      }
    }

    // Функция авто-скроллинг вниз
    function scrollChatToBottom(item) {
      item.scrollTo({
        top: item.scrollHeight,
        behavior: "smooth",
      });
    }

    function sendResponse(menu, preloads, e) {
      const t = e.target;
      t.style.pointerEvents = "none";

      const form = menu.querySelector(".platform-modal__form");

      if (validateHomework("admin", menu)) {
        showLoader();
        const formData = new FormData(form);

        setFilesToDataSend(formData, preloads);
        saveRate(menu, formData, preloads, t);
      } else {
        setTimeout(() => {
          t.style.pointerEvents = "all";
        }, 1500);
      }
    }

    function saveRate(menu, formData, preloads, t) {
      const response = async function (formData) {
        const request = await $.ajax({
          type: "POST",
          url: "saveRateHomework/",
          data: formData,
          processData: false,
          contentType: false,
          dataType: "json",
          cache: false,
          success: function (data) {},
          error: function (data) {},
        });

        return request;
      };

      response(formData).then(
        (data) => {
          t.style.pointerEvents = "all";
          updateAfterSend(data);
          closeHomework(menu, preloads);
          clearHomeworkMenu(menu, preloads);
          hideLoader();

          const wrapper = menu.querySelector(".platform-modal__wrapper");
          closeModalAnimation(menu, wrapper, false, true);
        },
        () => {
          t.style.pointerEvents = "all";
          hideLoader();
        }
      );
    }

    function changeRatedCounter() {
      const ratedCounter = Number($("[rated-counter]").html()) + 1;
      $("[rated-counter]").html(ratedCounter);
    }

    function updateHomeworkRow(data) {
      const homeworkRow = $("[data-homework]");

      $.each(homeworkRow, (index, item) => {
        if (+$(item).attr("data-homework") === data.id) {
          const ratingCol = $(item).find("[homework-rate]");
          $(ratingCol).css({ display: "flex" });

          if (data.rate !== 0) {
            ratingCol.text(" ");
            ratingCol.append($("<div/>").attr("class", "homework-rate__score"));
            ratingCol.append(
              $("<span/>").attr("class", "homework-rate__text").html(data.rate)
            );
          } else {
            ratingCol.text("Нет");
          }

          $(item)
            .find(".btn_title-text_small")
            .html(
              data.rate == 0
                ? data.checker
                  ? "Пересдача"
                  : "Проверить"
                : "Проверено"
            );
          $(item).find("[homework-checker]").html(data.checker);

          if (data.accepted) {
            const btnClasses = $(item).find("[rate-homework]");
            $(btnClasses).removeClass("btn__content");
            $(btnClasses).addClass("btn_rated");

            $(btnClasses).css({
              backgroundColor: "#27ae60",
              color: "white",
            });
          } else {
            const btnClasses = $(item)
              .find("[rate-homework]")
              .css({ borderRadius: "5px" });
            $(btnClasses).removeClass("btn__content");
            $(btnClasses).find(".btn__content").addClass("btn__retake");

            $(btnClasses).css({
              backgroundColor: "rgb(255, 238, 1)",
              border: "1px solid rgb(255, 238, 1)",
              color: "black",
            });
          }
        }
      });
    }

    (function setFilterDefault() {
      $.each($("[filter-courses]").children(), (count, elem) => {
        if (+$(elem).attr("value") === filter.idCourse) {
          $(elem).prop("selected", true);
        }
      });
    })();

    function uploadFiles(preloads, menu, e) {
      const t = e.target;

      if (t.value) {
        Array.from(t.files).forEach((file) => {
          preloads.push(file);
        });

        if (preloads.length > 8) {
          preloads.length = 0;

          const gallery = getGallery();
          Array.from(gallery.children).forEach((item) => {
            item.remove();
          });

          const inputs = menu.querySelectorAll(
            ".homework-comment__input--file"
          );
          inputs.forEach((item) => {
            item.value = "";
          });
        }

        setGalleryFiles(preloads);
      }
    }

    function getGallery() {
      let gallery;

      const commentsGallery = document.querySelectorAll(
        ".homework-comments__gallery"
      );

      if (commentsGallery.length) {
        const galleryItems = document.querySelectorAll(
          ".homework-comments__gallery"
        );
        gallery = galleryItems[galleryItems.length - 1];
      }

      const adminGallery = document.querySelector(
        ".homework-comment__gallery--admin"
      );

      if (adminGallery) {
        gallery = document.querySelector(".homework-comment__gallery--admin");
      }

      const clientGallery = document.querySelector(
        ".homework-comment__gallery--client"
      );

      if (clientGallery) {
        gallery = document.querySelector(".homework-comment__gallery--client");
      }

      return gallery;
    }

    function setGalleryFiles(preloads, wrapper) {
      const gallery = getGallery();

      if (gallery) {
        Array.from(gallery.children).forEach((item) => {
          item.remove();
        });
      }

      const setPreloads = async function setPreloadsFiles(preloads, wrapper) {
        for (let i = 0; i < preloads.length; i++) {
          const file = preloads[i];
          const index = i;

          let path, type;

          if (!file.path) {
            path = URL.createObjectURL(file);
            type =
              file.type.split("/")[0] === "image"
                ? file.type.split("/")[0]
                : file.name.split(".")[file.name.split(".").length - 1];
          } else {
            path = file.path;
            type = file.type;
          }

          let isNew = path.split("blob").length > 1 ? true : false;

          if (
            type === "image" ||
            type === "jpg" ||
            type === "jpeg" ||
            type === "png"
          ) {
            const li = document.createElement("li");
            li.classList.add("comments-gallery__file");
            li.setAttribute("data-index", `${index}`);

            const a = document.createElement("a");
            a.setAttribute("data-fancybox", "");
            a.setAttribute("href", isNew ? path : "/" + path);
            a.classList.add("comments-gallery__link");

            const img = document.createElement("img");
            img.classList.add("comments-gallery__img");
            img.setAttribute("src", isNew ? path : "/" + path);

            a.appendChild(img);

            if (!wrapper) {
              const span = document.createElement("span");
              span.classList.add("comments-img__delete");
              a.appendChild(span);
            }

            li.appendChild(a);

            if (wrapper) {
              const galleryComment = wrapper.querySelector(
                ".homework-comments__gallery"
              );
              galleryComment.appendChild(li);
              galleryComment.classList.add("full");
            } else {
              const gallery = getGallery();
              gallery.classList.add("full");
              gallery.appendChild(li);
            }
          } else {
            const li = document.createElement("li");
            li.classList.add("comments-gallery__file");
            li.setAttribute("data-index", `${index}`);

            const a = document.createElement("a");
            a.setAttribute("href", isNew ? path : "/" + path);
            a.classList.add("comments-gallery__link");
            a.setAttribute("download", "");
            a.classList.add(type);

            const spanType = document.createElement("span");
            spanType.classList.add("comments-gallery__type");
            spanType.innerText = type;

            const spanName = document.createElement("span");
            spanName.classList.add("comments-gallery__name");
            spanName.innerText = file.name;

            a.appendChild(spanType);
            a.appendChild(spanName);

            if (!wrapper) {
              const spanDelete = document.createElement("span");
              spanDelete.classList.add("comments-img__delete");
              a.appendChild(spanDelete);
            }

            li.appendChild(a);

            if (wrapper) {
              const galleryComment = wrapper.querySelector(
                ".homework-comments__gallery"
              );
              galleryComment.appendChild(li);
              galleryComment.classList.add("full");
            } else {
              const gallery = getGallery();
              gallery.classList.add("full");
              gallery.appendChild(li);
            }
          }
        }
      };

      setPreloads(preloads, wrapper).then(() => {
        const deleteBtns = gallery.querySelectorAll(".comments-img__delete");

        deleteBtns.forEach((item) => {
          const remove = getCloneAppend(item);
          const deletePreloadImage = deleteFile.bind(this, gallery, preloads);
          remove.addEventListener("click", deletePreloadImage);
        });
      });
    }

    function deleteFile(wrapper, preloads, e) {
      e.preventDefault();
      e.stopPropagation();

      const t = e.target;

      const file = getParent(t, "comments-gallery__file");

      const index = +file.getAttribute("data-index");

      const gallery = getParent(file, "homework-comments__gallery");

      Array.from(gallery.children).forEach((item) => {
        item.remove();
      });

      if (gallery.children.length === 0) {
        gallery.classList.remove("full");
      }

      preloads.splice(file.getAttribute("data-index"), 1);

      const inputImage = document.querySelector("#imageFile");
      const inputFile = document.querySelector("#docFile");

      inputImage.value = "";
      inputFile.value = "";

      setGalleryFiles(preloads);
    }

    $(document).on(
      "click",
      ".homework-estimation__label--accept",
      function (e) {
        const block = document.querySelector(".homework-estimation__block");
        const input = document.querySelector("[accepted]");

        if (block.classList.contains("hidden")) {
          block.classList.remove("hidden");
        }

        const t = e.target;

        if (!t.classList.contains("accept")) {
          t.classList.add("accept");
          input.value = Boolean("true");
          const decline = document.querySelector(
            ".homework-estimation__label--decline"
          );
          decline.classList.remove("decline");
        }

        const accepted = Boolean(input.value);

        setRate(accepted);

        const sendBtn = document.querySelector(".platform-modal__save");
        sendBtn.innerText = "Проверить ДЗ";
      }
    );

    $(document).on(
      "click",
      ".homework-estimation__label--decline",
      function (e) {
        const block = document.querySelector(".homework-estimation__block");
        const input = document.querySelector("[accepted]");
        const t = e.target;

        if (!block.classList.contains("hidden")) {
          block.classList.add("hidden");
        }

        if (!t.classList.contains("decline")) {
          t.classList.add("decline");
          input.value = Boolean("");
          const accept = document.querySelector(
            ".homework-estimation__label--accept"
          );
          accept.classList.remove("accept");
        }

        const accepted = Boolean(input.value);

        setRate(accepted);

        const rated = document.querySelectorAll('[name="rate"]');

        rated.forEach((item) => {
          item.setAttribute("required", false);
        });

        const sendBtn = document.querySelector(".platform-modal__save");
        sendBtn.innerText = "Отправить на пересдачу";
      }
    );

    function setRate(accepted) {
      const rated = document.querySelectorAll(
        ".homework__estimation--checkbox"
      );
      const labels = document.querySelectorAll(".homework__estimation--label");

      rated.forEach((item) => {
        item.checked = false;
      });

      labels.forEach((item) => {
        item.classList.remove("active");
      });
    }

    function setFilesToDataSend(data, preloads) {
      const TEMP_FILES = [];

      const inputName = document
        .querySelector(".homework-comment__input--file")
        .getAttribute("data-name");

      preloads.forEach((item) => {
        const tmpFile = {};
        tmpFile["name"] = inputName;
        tmpFile["file"] = item;
        TEMP_FILES.push(tmpFile);
      });

      TEMP_FILES.forEach((item) => {
        data.append(item["name"], item["file"]);
      });
    }

    function validateHomework(settings, menu) {
      const required = setValidateItemHomework(settings, menu);

      let result;

      if (settings === "admin") {
        result = required.map((item) => {
          const isArray = Array.isArray(item);
          const accepted = !isArray ? item.hasAttribute("accepted") : false;
          const textArea = !isArray
            ? item.classList.contains("homework-text__area")
            : false;
          const isRate = isArray ? item.some((el) => el.checked) : false;
          const isEmpty = !isArray ? (item.value ? false : true) : false;

          if (!isArray && accepted && isEmpty) {
            setError(item);
            return false;
          } else if (!isArray && accepted && !isEmpty) {
            return true;
          }

          if (isArray && !isRate) {
            const wrapper = menu.querySelector(".homework-estimation__rate");
            setError(wrapper);
            return false;
          } else if (isArray && isRate) {
            return true;
          }

          if (!isArray && textArea && isEmpty) {
            setError(item);
            return false;
          } else if (!isArray && textArea && !isEmpty) {
            return true;
          }
        });
      }

      return result.every((el) => el === true);
    }

    function setValidateItemHomework(settings, menu = null) {
      let required = [];

      let modal;

      if (!menu) {
        modal = document.querySelector(".homework-comments__send");
      } else {
        modal = menu;
      }

      if (settings === "admin" && modal) {
        const accepted = modal.querySelector("[accepted]");

        if (accepted) {
          required.push(accepted);
        }

        if (accepted && accepted.value === "true") {
          const rate = Array.from(modal.querySelectorAll('[name="rate"]'));
          if (rate) {
            required.push(rate);
          }
        }

        const textArea = modal.querySelector(".homework-text__area");

        if (textArea) {
          required.push(textArea);
        }
      }

      return required;
    }

    function setError(item) {
      let elem = item.cloneNode(false);

      const error = document.createElement("div");
      error.classList.add("validate-error");
      error.innerText = "Заполните поле";

      const parent = item.parentElement;
      parent.classList.add("validate-error__wrapper");
      parent.appendChild(error);

      setTimeout(() => {
        parent.classList.remove("validate-error__wrapper");
        const error = document.querySelector(".validate-error");
        error.remove();
      }, 1500);
    }

    function updateAfterSend(data, t, settings = "admin") {
      if (settings === "admin") {
        const deal = document.querySelector(
          `.platform-table__row[data-homework="${data.id}"]`
        );

        const rate = Array.from(deal.children).filter((el) =>
          el.hasAttribute("rate")
        )[0];
        const rateBtn = Array.from(rate.children).filter((el) =>
          el.hasAttribute("rate-homework")
        )[0];

        if (data.accepted) {
          rateBtn.classList.remove("homework-rate__check");
          rateBtn.classList.add("homework-rate__view");
          rateBtn.innerText = "Проверено";
        } else {
          rateBtn.innerText = "Пересдача";
        }

        const checker = Array.from(deal.children).filter((el) =>
          el.hasAttribute("checker")
        )[0];
        checker.innerText = data.checker;

        const estimation = Array.from(deal.children).filter((el) =>
          el.hasAttribute("estimation")
        )[0];

        if (data.rate !== 0) {
          estimation.innerText = "";
          const spanIcon = document.createElement("span");
          spanIcon.classList.add("homework__rate--icon");

          const spanValue = document.createElement("span");
          spanValue.classList.add("homework__rate--value");
          spanValue.innerText = data.rate;

          estimation.appendChild(spanIcon);
          estimation.appendChild(spanValue);
        } else {
          estimation.innerText = "Нет";
        }
      }
    }

    function closeHomework(menu, preloads) {
      clearHomeworkMenu(menu, preloads);
      checkBodyHidden();
      const page = document.querySelector(".page");
      page.style.overflowY = "auto";

      const wrapper = menu.querySelector(".platform-modal__wrapper");

      console.log(menu);
      console.log(wrapper);

      closeModalAnimation(menu, wrapper, false, true);
    }

    function clearHomeworkMenu(menu, preloads) {
      const commentsWrapper = menu.querySelector(".comments__wrapper");

      if (commentsWrapper) {
        Array.from(commentsWrapper.children).forEach((item) => {
          item.remove();
        });
      }

      const accepted = menu.querySelector("[accepted]");

      accepted.value = "";

      const homeworkCheckedBtn = menu.querySelector(
        ".homework-estimation__label--accept"
      );
      homeworkCheckedBtn.classList.remove("accept");

      const homeworkUncheckedBtn = menu.querySelector(
        ".homework-estimation__label--decline"
      );
      homeworkUncheckedBtn.classList.remove("decline");

      const estimationBlock = menu.querySelector(".homework-estimation__block");
      estimationBlock.classList.add("hidden");

      const checkbox = menu.querySelectorAll(".homework__estimation--checkbox");
      checkbox.forEach((item) => {
        item.checked = false;
      });

      const rates = menu.querySelectorAll(".homework__estimation--label");

      if (rates) {
        rates.forEach((item) => {
          item.classList.remove("active");
        });
      }

      const textArea = menu.querySelector(".homework-text__area");
      textArea.value = "";

      const textAreaGallery = menu.querySelector(
        ".homework-comment__gallery--admin"
      );
      Array.from(textAreaGallery.children).forEach((item) => {
        item.remove();
      });

      textAreaGallery.classList.remove("full");

      const inputFiles = menu.querySelectorAll(
        ".homework-comment__input--file"
      );
      inputFiles.forEach((item) => {
        item.value = "";
      });

      preloads.length = 0;
    }

    function openModalAnimation(modal) {
      modal.classList.add("open");
      modal.classList.add("black");

      setTimeout(() => {
        modal.style.opacity = "1";
      }, 100);

      const filter = modal.querySelector(".filter__wrapper");

      if (filter) {
        setTimeout(() => {
          filter.style.top = "0";
        }, 100);
      } else {
        setTimeout(() => {
          const modalWindow = modal.querySelector(".platform-modal__wrapper");
          modalWindow.style.right = "0";
        }, 0);
      }
    }

    function closeModalAnimation(modal, wrapper, isFilter, isClientCard) {
      if (isFilter) {
        wrapper.style.top = "-150%";
      } else {
        wrapper.style.right = "-100%";
      }

      if (isClientCard) {
        setTimeout(() => {
          modal.style.opacity = "0";
        }, 400);

        setTimeout(() => {
          modal.classList.remove("open");
        }, 600);

        setTimeout(() => {
          modal.classList.remove("black");
        }, 600);
      } else {
        setTimeout(() => {
          modal.style.opacity = "0";
        }, 200);

        setTimeout(() => {
          modal.classList.remove("open");
        }, 400);

        setTimeout(() => {
          modal.classList.remove("black");
        }, 400);
      }
    }
  }
}

export default Homework;
