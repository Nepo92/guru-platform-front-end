$(document).on("click", "[settings-close]", function () {
  $("body").css({ overflow: "auto" });
  const menu = document.querySelector("[tracker-settings]");
  const wrapper = menu.querySelector(".platform-modal__wrapper");
  closeModalAnimation(menu, wrapper, false, true);
});

let user = {};

let regular;
let holiday;
let counter;

let id;

$(document).on("click", ".tracker-table__settings", function (e) {
  const name = $(e.target)
    .closest(".tracker-table__row")
    .find("[settings-name]")
    .html();
  const month = $("[tracker-month] option:selected").html();

  regular = $(e.target).closest(".tracker-table__row").find(".regular").html();
  holiday = $(e.target).closest(".tracker-table__row").find(".holiday").html();
  id = +$(e.target).closest(".tracker-table__row").data("id");

  if (regular !== "0") {
    const regularHour = regular.split("ч")[0].trim();
    const regularMin = regular.split("ч")[1].split("мин")[0].trim();

    $(".settings__regular--hour").val(regularHour);
    $(".settings__regular--min").val(regularMin);
  } else {
    $(".settings__regular--hour").val("");
    $(".settings__regular--min").val("");
  }

  if (holiday !== "0") {
    const holidayHour = holiday.split("ч")[0].trim();
    const holidayMin = holiday.split("ч")[1].split("мин")[0].trim();

    $(".holiday__input--hour").val(holidayHour);
    $(".holiday__input--min").val(holidayMin);
  } else {
    $(".holiday__input--hour").val("");
    $(".holiday__input--min").val("");
  }

  $(".settings-form__personal").html(name);
  $(".settings-form__month").html(month);

  user.idByType = +$(e.target)
    .closest(".tracker-table__row")
    .find(".user__id")
    .val();
  user.idCompany = +$(e.target)
    .closest(".tracker-table__row")
    .find(".user__idCompany")
    .val();
  user.idDepartment = +$(e.target)
    .closest(".tracker-table__row")
    .find(".user__idDepartment")
    .val();
  user.idPosition = +$(e.target)
    .closest(".tracker-table__row")
    .find(".user__idPosition")
    .val();
  user.idUser = +$(e.target)
    .closest(".tracker-table__row")
    .find(".user__idUser")
    .val();
  user.name = $(e.target)
    .closest(".tracker-table__row")
    .find(".user__name")
    .val();
  user.positionName = $(e.target)
    .closest(".tracker-table__row")
    .find(".user__positionName")
    .val();

  $("body").css({ overflow: "hidden" });
  const menu = document.querySelector("[tracker-settings]");
  openModalAnimation(menu);
});

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

$(document).on(
  "click",
  "[save-settings]",
  saveSetting.bind(null, user, regular, holiday, counter)
);

let valueReg;
let valueHol;

function saveSetting(user, regular, holiday, counter = null) {
  const data = {};
  data.regularTime =
    +($(".settings__regular--hour").val() * 60 * 60 * 1000) +
    $(".settings__regular--min").val() * 60 * 1000;
  data.holidayTime =
    +($(".holiday__input--hour").val() * 60 * 60 * 1000) +
    $(".holiday__input--min").val() * 60 * 1000;
  data.id = +$(".personal__id").val();

  if ($(".counter__input").get(0)) {
    data.count = +$(".counter__input").val();
  }

  data.year = +$("[tracker-year]").val();
  data.month = +$("[tracker-month]").val();
  data.user = user;
  $(regular).html($(".settings__regular").val());
  $(holiday).html(+$(".holiday__input").val());

  if ($(counter).get(0) && counter !== null) {
    $(counter).html(data.count);
  }

  valueReg = +data.regularTime;
  valueHol = +data.holidayTime;

  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "saveWorkInfo",
    data: JSON.stringify(data),
    dataType: "json",
    cache: false,
    success: function (data) {
      $.each($(".tracker-table__row"), (index, item) => {
        const name = $(item).find("[settings-name]").html();

        if (name === user.name && +$(item).data("id") === id) {
          $(item).find(".regular").html(getHoursWithMinutes(valueReg));
          $(item).find(".holiday").html(getHoursWithMinutes(valueHol));
        }
      });

      $("body").css({ overflow: "auto" });
      const menu = document.querySelector("[tracker-settings]");
      const wrapper = menu.querySelector(".platform-modal__wrapper");
      closeModalAnimation(menu, wrapper, false, true);
    },
    error: function (data) {},
  });
}

function getHoursWithMinutes(ms) {
  const hour = Math.floor(ms / 60 / 60 / 1000);
  const min = (ms - hour * 60 * 60 * 1000) / 60 / 1000;

  return ms / 60 / 60 / 1000 !== 0
    ? hour + "ч" + " " + (min ? min + "мин" : "")
    : ms / 60 / 60 / 1000;
}

showLoader();

$(document).ready(() => {
  $.each($("[tracker-year]").children(), (index, item) => {
    if (+$(item).attr("value") === filter.year) {
      $(item).prop("selected", true);
    }
  });

  $.each($("[tracker-month]").children(), (index, item) => {
    if (+$(item).attr("value") === filter.month) {
      $(item).prop("selected", true);
    }
  });

  hideLoader();
  getTemplates(personal);
});

function getTemplates(pesonal) {
  const personalValue = Object.values(pesonal);
  const personalKeys = Object.keys(personal);

  const departments = [];

  personalKeys.forEach((item) => {
    let field = item.split("Department")[1];

    field = field.replaceAll("id", '"id"');
    field = field.replaceAll("title", '"title"');
    field = field.replaceAll("department", '"department"');
    field = field.replaceAll("=", ":");
    field = field.replaceAll("'", '"');

    departments.push(JSON.parse(field));
  });

  const tableWrapper = document.querySelector("[tables-wrapper]");

  departments.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("tracker__item");
    div.setAttribute("data-department", item.id);
    div.innerHTML = getTemplateTable(item);
    tableWrapper.appendChild(div);
  });

  console.log(personalValue);

  personalValue.forEach((item, index) => {
    const pers = item || null;

    if (pers) {
      pers.forEach((el) => {
        const currentDep = departments.find(
          (elem) => elem.id === el.user.idDepartment
        );

        if (currentDep) {
          console.log(currentDep);

          const tr = document.createElement("tr");
          tr.classList.add("tracker-table__row");
          tr.setAttribute("data-id", el.user.idUser);
          tr.innerHTML = getTemplateRow(el, currentDep);
          const dep = document.querySelector(
            `.tracker__item[data-department="${currentDep.id}"] [tracker-list]`
          );

          dep.appendChild(tr);
        }
      });
    }
  });
}

function getTemplateTable(item) {
  return `
        <h2 class = "tracker__title">${item.title}</h2>
          <table class="tracker__table">
              <thead>
                  <tr class="tracker-table__row--head">
                      <td class="tracker-table__column--head">Имя и фамилия</td>
                      <td class="tracker-table__column--head">Должность</td>
                      <td class="tracker-table__column--head">Обычные часы</td>
                      <td class="tracker-table__column--head">Праздничные часы</td>
                      ${
                        item.title === "Кураторство" ||
                        item.title === "Контроль"
                          ? `<td class="tracker-table__column--head">Count</td>`
                          : ""
                      }
                  </tr>
              </thead>
              <tbody tracker-list>
              </tbody>
          </table>
          `;
}

function getTemplateRow(item, elem) {
  const workRegularTime = getHoursWithMinutes(item.regularTime);
  const workHolidayTime = getHoursWithMinutes(item.holidayTime);

  return `
      <input type="hidden" name="id" class="personal__id" value="${item.id}">
      <input type="hidden" name="count" class="personal__count" value="${
        item.count
      }">
      <input type="hidden" name="year" class="personal__year" value="${
        item.year
      }">
      <input type="hidden" name="month" class="personal__month" value="${
        item.month
      }">
      <input type="hidden" name="user" class="personal__user" value="${
        item.user
      }">
      <input type="hidden" name="idByType" class="user__id" value="${
        item.user.idByType
      }">
      <input type="hidden" name="idCompany" class="user__idCompany" value="${
        item.user.idCompany
      }">
      <input type="hidden" name="idDepartment" class="user__idDepartment" value="${
        item.user.idDepartment
      }">
      <input type="hidden" name="idPosition" class="user__idPosition" value="${
        item.user.idPosition
      }">
      <input type="hidden" name="idUser" class="user__idUser" value="${
        item.user.idUser
      }">
      <input type="hidden" name="name" class="user__name" value="${
        item.user.name
      }">
      <input type="hidden" name="positionName" class="user__positionName" value="${
        item.user.positionName
      }">
      <td settings-name class="tracker-table__column">${item.user.name}</td>
      <td class="tracker-table__column">${item.user.positionName}</td>
      <td class="tracker-table__column regular">${workRegularTime}</td>
      <td class="tracker-table__column holiday">${workHolidayTime}</td>
      ${
        elem.title === "Контроль" || elem.title === "Кураторство"
          ? `<td class="tracker-table__column counter">${item.count}</td>`
          : ""
      }
      <td class="tracker-table__column">
          <span class="tracker-table__settings"></span>
      </td>
  `;
}

$(document).on("change", "[tracker-month]", function () {
  if (+$("[tracker-month] option:selected").attr("value") !== 0) {
    $(".tracker-filter__form").trigger("submit");
  }
});
