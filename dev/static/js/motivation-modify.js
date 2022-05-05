const position = positions;
const department = departments;
const monthsMain = months;
let allPack = allPacks;

$('.motivation-add__position').prop('disabled', true);
$('.motivation-add__employed').prop('disabled', true);
$('.motivation-add__year').prop('disabled', true);
$('[motivation-add]').prop('disabled', true);

position.marketing = advertiser;
position.sales = managers;

let wageBlocks = [];
let monthsUse = [];
let monthsUseAdd = [];
let deletedLevels = [];
let deletedMonths = [];
let selectedMonthForSelf = [];

const selectedMotivation = [];

function setCloneElement(item) {
    const itemClone = item.cloneNode(true);

    if (item.parentNode && item.nextElementSibling) {
        item.parentNode.insertBefore(itemClone, item.nextElementSibling);
        item.remove();

        return itemClone;
    } else {
        item.parentNode.appendChild(itemClone);
        item.remove();

        return itemClone;
    }
}

$(document).ready(() => {
    $('.motivation-add__year').children().remove();

    $('.motivation-add__year').append($('<option>').attr('value', '0').html('Выберите год'))

    $.each(monthsMain.reverse(), (index, item) => {
        $('.motivation-add__year').append($('<option>').attr('value', item).html(item));
    });

    renderMotivation(allPack);
    setWage(allPack, 'main');
    defaultTabs();
    chooseTabs();
});

function defaultTabs() {
    let selected;

    $.each($('.top-nav__link'), (index, item) => {
        if ($(item).is('.active')) {
            selected = $(item).data('tab');
        }
    });

    selectTab(selected);
}

function chooseTabs() {
    const tabs = $('.top-nav__link');

    $.each(tabs, (index, item) => {
        $(item).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if ($(item).is('active')) {
                return false;
            } else {
                $.each(tabs, (count, elem) => {
                    $(elem).removeClass('active');
                });

                $(item).addClass('active');

                const selected = $(item).data('tab');

                selectTab(selected);
            }
        });
    });
}

function selectTab(str) {
    $.each($('.motivation-tab__content'), (index, item) => {
        if ($(item).data('tab') === str) {
            $(item).css({ display: 'block' });
        } else {
            $(item).css({ display: 'none' });
        }
    });
}

function renderMotivation(blocks) {
    if (!$('[blocks]').get(0)) {
        $('[js-motivation-now__block]').append($('<div>').attr('blocks', '').attr('class', 'm_blocks'))
    }

    const block = $.map(blocks, (item) => {

        let dep;
        let depEng;

        $.each(department, (count, elem) => {
            if (elem.id === item.idDepartment) {
                dep = elem.title;
                depEng = elem.department;
            }
        });

        const positionsArr = Object.entries(position);

        let pos;

        $.each(positionsArr, (count, elem) => {
            const title = elem[0];
            const content = elem[1];

            if (title === depEng) {
                $.each(content, (iter, subj) => {
                    if (subj.id === item.idPosition) {
                        pos = subj.title;
                    }
                });
            }
        });

        return `
      <div class="motivation-now__block motivation__block main-block">
        <div class="motivation-now__head">
          <span class="motivation-now__name motivation__title" title="${item.motivationName}">${item.motivationName}</span>
          <span class="motivation-now__icon"></span>
        </div>
        <div class="motivation-now__department">${dep}</div>
        <div class="motivation-now__position">${pos}</div>
        <div class="motivation-now__control">
          <input type="hidden" name="idCompany" value="${item.idCompany}" class="motivation-now__company">
          <input type="hidden" name="id" value="${item.id}" class="motivation-now__wage">
          <input type="hidden" name="position" value="${item.idPosition}" class="motivation-now__position-id">
          <input type="hidden" name="department" value="${item.idDepartment}" class="motivation-now__department-id">
        </div>
      </div>
    `;
    });

    $('[blocks]').append(block);
}

/* Добавление должностей в селект */

$(document).on('change', '.motivation-add__department', changeDepartment);

function changeDepartment(e) {
    const t = e.target;

    /* Должности взависимости от департамента */
    const selectPos = $('.motivation-add__department option:selected').attr('value');

    if (+selectPos === 0) {
        $('[motivation-add]').prop('disabled', true);
    }

    if ($('.motivation-add__position').children().length > 1) {
        $('.motivation-add__position').children().remove();
        $('.motivation-add__position').append($('<option/>').attr('value', '0').html('Выберите отдел'));
    }

    $('[js-motivation-now__block]').children().remove();


    $('.motivation-add__year').val('0')
    $('.motivation-add__employed').val('');
    $('.motivation-add__employed').prop('disabled', true);
    $('.motivation-add__year').prop('disabled', true);
    $('[motivation-add]').prop('disabled', true);


    const selected = $('.motivation-add__department option:selected').data('department');

    $.each(department, (index, item) => {
        const dep = item.department;

        if (dep === selected) {
            const post = Object.entries(position);

            for (let pos of post) {
                if (pos[0] === selected) {
                    const selectPos = $('.motivation-add__position');
                    $(selectPos).children().remove();
                    let options;

                    $(selectPos).append($('<option>').attr('value', '0').attr('class', 'motivation-add__pos motivation-add__pos-empty').html('Выберите должность'))

                    $.each(pos[1], function (index, item) {
                        options += '<option class="motivation-add__pos" value="' + item.id + '">' + item.title + '</option>';
                    });

                    $(selectPos).append(options);
                }
            }
        }
    });

    $('[js-motivation-now__block]').children().remove();

    if (+$(t).val() === 0) {
        renderMotivation(allPacks);
        $('.motivation-add__position').prop('disabled', true).val('0');
        $('.motivation-add__employed').prop('disabled', true).val('');
        $('.motivation-add__year').prop('disabled', true).val('0');
        $('[motivation-add]').prop('disabled', true);
    } else {
        let selected = allPacks.filter((el) => +$(t).val() === el.idDepartment);
        renderMotivation(selected);
        $('.motivation-add__position').prop('disabled', false);
    }
}

$(document).on('change', '.motivation-add__position', changePosition);

function changePosition(e) {
    const t = e.target;

    $('[js-motivation-now__block]').children().remove();

    let selected;

    const forSelf = $('.motivation-add__employed').val() === '' ? null :
        $('.motivation-add__employed').val() === 'false' ? false : true;


    if (+$(t).val() === 0) {
        selected = allPacks.filter((el) => el.idDepartment === +$('.motivation-add__department').val());
        renderMotivation(selected);

        $('.motivation-add__employed').prop('disabled', true).val('');
        $('.motivation-add__year').prop('disabled', true).val('0');
        $('[motivation-add]').prop('disabled', true);
    } else {
        selected = allPacks.filter((el) => el.idDepartment === +$('.motivation-add__department').val()
            && el.idPosition === +$('.motivation-add__position').val()
        );

        $('.motivation-add__employed').prop('disabled', false).val('');
        $('.motivation-add__year').prop('disabled', true).val('0');
        $('[motivation-add]').prop('disabled', true);

        renderMotivation(selected);
    }
}

$(document).on('change', '[name="forSelfEmployed"]', function (e) {
    const t = e.target;

    const selectPos = $(this).val() === '' ? null : $(this).val() === 'false' ? false : true;

    $('[blocks]').children().remove();

    const idDepartment = +$('.motivation-add__department').val();
    const idPosition = +$('.motivation-add__position').val();
    const year = +$('.motivation-add__year').val();

    $('[motivation-add]').prop('disabled', true);

    let selected;

    $('[js-motivation-now__block]').children().remove();


    if (selectPos === null) {
        selected = allPacks.filter((el) => el.idDepartment === +$('.motivation-add__department').val()
            && el.idPosition === +$('.motivation-add__position').val()
        )

        $('.motivation-add__year').prop('disabled', true).val('0');
        $('[motivation-add]').prop('disabled', true);

        renderMotivation(selected);
    } else if (selectPos === false || selectPos === true) {
        selected = allPacks.filter((el) => el.idDepartment === +$('.motivation-add__department').val() &&
            el.idPosition === +$('.motivation-add__position').val() && el.forSelfEmployed === selectPos);

        $('.motivation-add__year').prop('disabled', false);

        $('.motivation-add__year').prop('disabled', false).val('0');
        $('[motivation-add]').prop('disabled', true);

        renderMotivation(selected);
    }
});

/* Запрос на получение зарплаты */
$(document).on('change', '.motivation-add__year', function () {
    $('[js-motivation-now__block]').children().remove();

    monthsUse.length = 0;
    monthsUseAdd.length = 0;

    const dataWage = {
        idCompany: +$('[id-company]').val(),
        idDepartment: +$('.motivation-add__department option:selected').attr('value'),
        idPosition: +$('.motivation-add__position option:selected').attr('value'),
        forSelfEmployed: $('.motivation-add__employed option:selected').attr('value') === '' ?
            null : $('.motivation-add__employed option:selected').attr('value') === 'false' ? false : true,
        year: +$('.motivation-add__year option:selected').attr('value'),
    }

    const selectPos = +$('.motivation-add__year option:selected').attr('value');

    if (dataWage.idDepartment !== 0 && dataWage.idPosition !== 0 && dataWage.forSelfEmployed !== null && dataWage.year !== 0) {
        $('[motivation-add]').prop('disabled', false);
    }

    if (selectPos !== 0) {

        const getWagesData = getWages();

        getWagesData.then((data) => {
            if (data.length !== 0) {
                const forSelfEmployed = $('.motivation-add__employed').val() === '' ? null :
                    $('.motivation-add__employed').val() === 'false' ? false : true;

                setWage(forSelfEmployed === null ? data : data.filter((el) => el.forSelfEmployed === forSelfEmployed));

                $.each(data, (index, item) => {
                    if (index === 0) {
                        $('[id-company]').val(item.idCompany);
                    }
                });
            }

            $('[motivation-add]').prop('disabled', false);
        });
    } else {
        let selected = allPacks.filter((el) => {
            el.idDepartment === +$('.motivation-add__department').val() &&
                el.idPosition === +$('.motivation-add__position').val() &&
                el.forSelfEmployed === $('.motivation-add__employed').val()
        })

        $('[motivation-add]').prop('disabled', true);

        renderMotivation(selected);
    }
});

function setWage(data, str = null) {
    const dep = $('.motivation-add__department option:selected').html();
    const pos = $('.motivation-add__position option:selected').html();

    if (str === null) {
        const wage = $.map(data, (item) => {
            return `
        <div class="motivation-now__block motivation__block">
          <div class="motivation-now__head">
            <span class="motivation-now__name motivation__title">${item.motivationName}</span>
            <span class="motivation-now__icon"></span>
          </div>
          <div class="motivation-now__department">${dep}</div>
          <div class="motivation-now__position">${pos}</div>
          <div class="motivation-now__control">
            <input type="hidden" name="id" value="${item.id}" class="motivation-now__wage">
            <input type="hidden" name="position" value="${item.idPosition}" class="motivation-now__position-id">
            <input type="hidden" name="department" value="${item.idDepartment}" class="motivation-now__department-id">
          </div>
        </div>
      `;
        });

        $('[js-motivation-now__block]').append(wage);
    }

    $.each(data, (index, item) => {
        $.each(item.months, (count, elem) => {
            monthsUse.push(elem);
        });
    });

    monthsUse = monthsUse.filter((val, i) => monthsUse.indexOf(val) === i);

    const openRedactorMenu = openRedactor.bind(null, data, dep, pos, 'main')

    $('.motivation-now__block').off('click');
    $(document).on('click', '.motivation-now__block', openRedactorMenu);
}

let oldBlocks;

let deleteId;

let selectedMonths = [];

function openModalAnimation(modal) {
    $(modal).get(0).classList.add('open');
    $(modal).get(0).classList.add('black');

    setTimeout(() => {
        $(modal).get(0).style.opacity = '1';
    }, 100);

    const filter = $(modal).get(0).querySelector('.filter__wrapper');

    if (filter) {
        setTimeout(() => {
            filter.style.top = '0'
        }, 100);
    } else {
        setTimeout(() => {
            const modalWindow = $(modal).get(0).querySelector('.platform-modal__wrapper');
            modalWindow.style.right = '0';
        }, 0);
    }
}

async function getWages() {
    const request = await $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "getWageRates",
        data: null,
        dataType: 'json',
        cache: false,
        success: function result(data) {
        },
        error: function () {
        }
    });

    return request;
}

function setEditableMotivation(data, wages) {
    const menu = $('[js-menu-motivation-modify]');

    const name = menu.find('[js-motivation-name]');
    name.val(data.motivationName);

    const departmentInput = menu.find('[js-motivation-department]');

    let departmentTitle;
    let departmentValue;
    let positionName;

    $.each(department, (index, item) => {
        if (item.id === data.idDepartment) {
            departmentTitle = item.title;
            departmentValue = item.department
        }
    });

    const positionData = Object.entries(position);

    $.each(positionData, (index, item) => {
        const dep = item[0];
        const pos = item[1];

        if (dep === departmentValue) {
            $.each(pos, (count, elem) => {
                if (dep === elem.department && elem.id === data.idPosition) {
                    positionName = elem.title;
                }
            })
        }
    });

    departmentInput.val(departmentTitle);

    let positionInput = menu.find('[js-motivation-position]');
    positionInput.val(positionName);

    let yearInput = menu.find('[js-motivation-year]');
    yearInput.val(data.year);

    const typeEmployed = [];

    $.each(wages, (index, item) => {
        if (item.forSelfEmployed === data.forSelfEmployed) {
            $.each(item.months, (count, elem) => {
                typeEmployed.push(elem);
            });
        }
    });

    $.each($('.motivation-months__checkbox--modify'), (index, item) => {
        $.each(typeEmployed, (count, elem) => {
            if (elem === +$(item).attr('value')) {
                $(item).attr('disabled', true);
            }
        })
    })

    $.each(data.months, (index, item) => {
        $.each($('.motivation-months__checkbox--modify'), (count, elem) => {
            if (item === +$(elem).attr('value')) {
                $(elem).prop('disabled', false);
                $(elem).prop('checked', true);
            }
        })
    });
}

function openRedactor(data, dep, pos, str, e) {
    const t = e.target;

    if ($(t).is('.main-block')) {
        $('[js-motivation-delete]').off('click');
        $('[js-motivation-delete]').attr('class', 'motivation-menu__delete--from-main');

        $('.motivation-menu__delete--from-main').on('click', deleteFromMain);

        const aboutWage = {
            idCompany: +$(t).find('.motivation-now__company').val(),
            idWage: +$(t).find('.motivation-now__wage').val(),
            idDepartment: +$(t).find('.motivation-now__position-id').val(),
            idPosition: +$(t).find('.motivation-now__department-id').val(),
        }

        const getWage = getWages();

        getWage.then((data) => {
            $.each(data, (index, item) => {
                if (item.id === aboutWage.idWage) {
                    setEditableMotivation(item, data);
                }
            });
        });
    } else {
        $('.motivation-menu__delete--from-main').attr('js-motivation-delete', '');
        $('.motivation-menu__delete--from-main').attr('class', 'motivation-menu__delete motivation-delete');
        $('.motivation-menu__delete--from-main').off('click');
        $('.motivation-menu__delete--from-main').removeClass('motivation-menu__delete--from-main');

        $.each($('[js-motivation-delete]'), (index, item) => {
            const btn = setCloneElement(item);
            $(btn).on('click', deleteMotivation);
        });
    }

    const menu = $('[js-menu-motivation-modify]');
    openModalAnimation(menu);

    $(menu).find('[js-motivation-employment]').val($('select[name="forSelfEmployed"]').val() === 'false' ? 'В штате' : 'Самозанятый');

    const targetClass = $(e.target).attr('class');
    $('body').css({ overflow: 'hidden' });

    deleteId = $(e.target).closest('.motivation__block').find('.motivation-now__wage').val();

    if (targetClass === 'motivation-now__toggle motivation__toggle' || targetClass === 'motivation-now__checkbox motivation__checkbox') {
        e.stopPropagation();
    } else {
        wageBlocks.length = 0;
        $('[js-motivation-modify-blocks]').children().remove();

        $('[js-motivation-name]').val('');

        if (targetClass === 'motivation-now__toggle motivation__toggle'
            || targetClass === 'motivation-now__checkbox motivation__checkbox') {
            e.stopPropagation();
        } else {
            $('[js-menu-motivation-modify]').addClass('is-open');
            wageBlocks.length = 0;
            $('[js-motivation-modify-blocks]').children().remove();

            const idWage = +$(e.target).closest('.motivation__block').find('.motivation-now__wage').val();
            const idDepartment = +$(e.target).closest('.motivation__block').find('.motivation-now__department-id').val();
            const idPosition = +$(e.target).closest('.motivation__block').find('.motivation-now__position-id').val();

            $.each($('.motivation-months__checkbox'), (iter, subj) => {
                $(subj).prop('disabled', false);
                $(subj).prop('checked', false);
            });

            const forSelfEmployed = $('.motivation-add__employed').val() === '' ? null : $('.motivation-add__employed').val() === 'false' ? false : true;

            $.each(data, (index, item) => {
                $.each(item.months, (count, elem) => {
                    $.each($('.motivation-months__checkbox--modify'), (iter, subj) => {
                        if (+$(subj).attr('value') === elem) {
                            $(subj).prop('disabled', true);
                        }
                    });
                });

                if (item.id === idWage) {
                    $('[js-motivation-name]').val(item.motivationName);

                    if (str === 'main') {
                        const depart = $(e.target).find('.motivation-now__department').html();
                        const posit = $(e.target).find('.motivation-now__position').html();

                        $('[js-motivation-department]').val(depart);
                        $('[js-motivation-position]').val(posit);
                        $('[js-motivation-year]').val(item.year);
                    } else {
                        if (!dep || !pos) {
                            $('[js-motivation-department]').val($(t).find('.motivation-now__department').html());
                            $('[js-motivation-position]').val($(t).find('.motivation-now__position').html());
                        }

                        $('[js-motivation-year]').val(`${$('.motivation-add__year option:selected').html()}`);
                    }

                    $('.motivation__id').val(item.id);

                    selectedMonths.length = 0;

                    $.each(item.months, (count, elem) => {
                        $.each($('.motivation-months__checkbox--modify'), (iterator, subject) => {
                            if (+$(subject).attr('value') === elem) {
                                $(subject).prop('disabled', false);
                                $(subject).prop('checked', true);
                                selectedMonthForSelf.push(+$(subject).attr('value'));
                            }
                        });
                    });

                    const blocks = $.map(item.blocks, (elem) => {
                        return `
                                <div modify class="motivation-modify__block motivation__block motivation-${elem.className}-${elem.typeCode}">
                                    <div class="motivation__image motivation-${elem.className}-${elem.typeCode}__image"></div>
                                    <div class="motivation__info">
                                        <span class="motivation__title">${elem.typeName}</span>
                                        <div class="motivation__control">
                                            <input type="checkbox" class="motivation-modify__checkbox motivation__checkbox" value="${elem.className}" id="${elem.className + '_' + elem.typeCode}" ${(elem.active) ? 'checked' : ''}>
                                            <label for="${elem.className + '_' + elem.typeCode}" class="motivation-modify__toggle motivation__toggle"></label>
                                            <input type="hidden" class="motivation__type" value="${elem.typeCode}">
                                        </div>
                                    </div>
                                </div>
                            `
                    });

                    $('[js-motivation-modify-blocks]').append(blocks);

                    oldBlocks = item.blocks;

                    $('[js-motivation-save]').removeClass('motivation__new');
                    $('[js-motivation-save]').removeClass('motivation__new--menu');
                    $('[js-motivation-save]').addClass('motivation__redacted');

                    $(document).off('click', '.motivation-modify__block');
                    $(document).on('click', '.motivation-modify__block', viewBlocks.bind(null, item));
                }
            });
        }
    }
}

function closeModalAnimation(modal, wrapper, isFilter, isClientCard) {
    if (isFilter) {
        wrapper.style.top = '-150%';
    } else {
        wrapper.style.right = '-100%';
    }

    if (isClientCard) {
        setTimeout(() => {
            modal.style.opacity = '0';
        }, 400);

        setTimeout(() => {
            modal.classList.remove('open');
        }, 600);

        setTimeout(() => {
            modal.classList.remove('black');
        }, 600);
    } else {
        setTimeout(() => {
            modal.style.opacity = '0';
        }, 200);

        setTimeout(() => {
            modal.classList.remove('open');
        }, 400);

        setTimeout(() => {
            modal.classList.remove('black');
        }, 400);
    }
}

$(document).on('click', '[close-motivation-modify-menu]', function () {
    $('body').css({ overflow: 'auto' });

    const menu = document.querySelector('[js-menu-motivation-modify]');
    const wrapper = menu.querySelector('.platform-modal__wrapper');
    closeModalAnimation(menu, wrapper, false, true);
});

function viewBlocks(data, e) {
    const targetClass = $(e.target).attr('class');

    if (targetClass === 'motivation-now__block-toggle motivation__toggle' || targetClass === 'motivation-now__block-checkbox motivation__checkbox' || targetClass === 'motivation-modify__checkbox motivation__checkbox' || targetClass === 'motivation-modify__toggle motivation__toggle' || targetClass === 'motivation-add__block-checkbox motivation__checkbox' || targetClass === 'motivation-add__block-toggle motivation__toggle') {
        e.stopPropagation();

        $.each($('.motivation-modify__checkbox'), (index, item) => {
            $.each(data.blocks, (count, elem) => {
                if ($(item).val() === elem.className) {
                    $(item).on('change', () => {
                        if ($(item).is(':checked')) {
                            elem.active = true;
                        } else {
                            elem.active = false;
                        }
                    });
                }
            });
        });
    } else {
        if (targetClass === 'motivation-modify__block motivation__block' || targetClass === 'motivation-modify__info') {
            $('[cancel-block]').addClass('modify-cancel');
            $('[cancel-block]').removeClass('add-cancel');
        }

        if (targetClass === 'motivation-add__block motivation__block' || targetClass === 'motivation-add__info') {
            $('[cancel-block]').addClass('add-cancel');
            $('[cancel-block]').removeClass('modify-cancel');
        }

        modifyBlock(data, e);
    }
}

let modifyWageBlock;

let type;
let wageBlockName;

function setInputTypeNumber(inputs) {
    const inputItems = $(`${inputs}`);

    $.each(inputItems, (index, item) => {
        $(item).on('keyup', function () {
            const valueArr = $(this).val().split('');
            const value = valueArr[valueArr.length - 1];

            const regExp = new RegExp(/^\d*[\.]?\d*$/);

            if (!regExp.test(value)) {
                $(this).val('');
            } else if ($(this).val().split('.').length > 2) {
                $(this).val('');
            }
        });
    });
}

$(document).on('click', '[close-motivation-modify-template-menu]', function () {
    const menu = document.querySelector('[js-menu-motivation-modify-template]');
    const wrapper = menu.querySelector('.platform-modal__wrapper')
    closeModalAnimation(menu, wrapper, false, false);
})

function modifyBlock(data, e) {
    $('[menu-modify-template__form]').children().remove();

    $('[modify-title]').html($(e.target).closest('.motivation__block').find('.motivation__title').html());

    const block = $(e.target).closest('.motivation__block');
    const blockName = $(block).find('.motivation__checkbox').attr('value');
    const typeCode = $(block).find('.motivation__type').val();
    wageBlockName = $(block).find('.motivation__checkbox').attr('value');

    type = typeCode;

    if ($.isArray(data)) {
        $.each(data, (index, item) => {
            if (item.className === blockName && item.typeCode == typeCode) {
                settingsWageBLock(item);
                modifyWageBlock = item;
            }
        });
    } else {
        $.each(data.blocks, (index, item) => {
            if (item.className === blockName && item.typeCode == typeCode) {
                settingsWageBLock(item);
                modifyWageBlock = item;
            }
        });
    }

    $('[save-block]').removeClass('save__template--add');
    $('[save-block]').addClass('save__template--modify');

    const menu = document.querySelector('[js-menu-motivation-modify-template]');
    openModalAnimation(menu);
}

function settingsWageBLock(item) {
    $('[menu-modify-template__form]').children().remove();

    const name = item.className;

    if (name === 'FixedWageRate') {

        const redactor = () => {
            if (item.typeCode === 0) {
                return `
            <div class="fixed-item">
              <span class="fixed-item__icon">&#8381;</span>
              <div class="motivation-modify-template__title motivation-wage__title regular-title">Ставка в час <span class="motivation-modify-template__icon"></span></div>
              <input autocomplete="off" placeholder="0" class="motivation-modify-template__regular menu-input__input menu-wage__input menu-input__input_small motivation__input input-number" type="text" name="regularRate">
            </div>
            <div class="fixed-item">
              <span class="fixed-item__icon">&#8381;</span>
              <div class="motivation-modify-template__title motivation-wage__title">Ставка в час праздничная <span class="motivation-modify-template__icon"></span></div>
              <input autocomplete="off" placeholder="0" class="motivation-modify-template__holiday menu-input__input menu-wage__input menu-input__input_small motivation__input input-number" type="text" name="holidayRate">
            </div>
            `
            }
        };

        $('[menu-modify-template__form]').append(redactor);

        $('.motivation-modify-template__regular').val(`${(item.regularRate === 0) ? null : item.regularRate}`);
        $('.motivation-modify-template__holiday').val(`${(item.holidayRate === 0) ? null : item.holidayRate}`);

        const inputs = ['.motivation-modify-template__regular', '.motivation-modify-template__holiday'];
        setInputTypeNumber(inputs);
    }

    if (name === 'OneValueWageRate') {
        const redactor = () => {
            if (item.typeCode === 3) {
                return `
            <div class="fixed-item fixed-homework">
              <span class="fixed-item__icon">&#8381;</span>
              <div class="motivation-modify-template__title motivation-wage__title regular-title">Ставка за одно проверенное ДЗ</div>
              <input autocomplete="off" placeholder="0" class="motivation-modify-template__coef menu-input__input menu-wage__input menu-input__input_small input-number" type="text" name="value">
            </div>
          `
            }

            if (item.typeCode === 4) {
                return `
              <div class="fixed-item fixed-homework">
                <span class="fixed-item__icon">&#8381;</span>
                <div class="motivation-modify-template__title motivation-wage__title regular-title">Ставка за одну проверенную сделку</div>
                <input autocomplete="off" placeholder="0" class="motivation-modify-template__coef menu-input__input menu-wage__input menu-input__input_small input-number" type="text" name="value">
              </div>
          `
            }

            if (item.typeCode === 7) {
                return `
            <div class="fixed-item fixed-homework">
              <span class="fixed-item__icon">&#8381;</span>
              <div class="motivation-modify-template__title motivation-wage__title regular-title">Коэффициент</div>
              <input autocomplete="off" placeholder="0" class="motivation-modify-template__coef menu-input__input menu-wage__input menu-input__input_small input-number" type="text" name="value">
            </div>
          `
            }
        }

        $('[menu-modify-template__form]').append(redactor);
        $('.motivation-modify-template__coef').val(`${(item.value === 0) ? null : item.value}`)

        const inputs = ['.motivation-modify-template__coef', '.motivation-modify-template__coef', '.motivation-modify-template__coef']

        setInputTypeNumber(inputs);
    }

    if (name === 'ControlWageRate') {
        const redactor = () => {
            if (item.typeCode === 3) {
                return `
            <div class="fixed-item fixed-homework">
              <span class="fixed-item__icon">&#8381;</span>
              <div class="motivation-modify-template__title motivation-wage__title">Ставка за одно проверенное домашнее задание </div>
              <input autocomplete="off" placeholder="0" class="motivation-modify-template__control menu-input__input menu-wage__input menu-input__input_small input-number" type="text" name="regularRate">
            </div>
          `
            }
            if (item.typeCode === 4) {
                return `
            <div class="fixed-item fixed-deal">
              <span class="fixed-item__icon">&#8381;</span>
              <div class="motivation-modify-template__title motivation-wage__title">Ставка за оценку сделок</div>
              <input autocomplete="off" placeholder="0" class="motivation-modify-template__control menu-input__input menu-wage__input menu-input__input_small input-number" type="text" name="regularRate">
            </div>
          `
            }
        }
        $('[menu-modify-template__form]').append(redactor);
        $('.motivation-modify-template__control').val(`${(item.regularRate === 0) ? null : item.regulaRate}`);

        const inputs = ['.motivation-modify-template__control--hw', '.motivation-modify-template__control--deals'];

        setInputTypeNumber(inputs);
    }

    if (name === 'LeveledWageRate') {

        const redactor = () => {
            if (item.typeCode === 1) {
                return `
              <div class="levels-rate">
                <div class="levels__top">
                  <span class="levels__title"></span>
                  <span class="levels__delete"></span>
                </div>
                <ul class="levels__list">
                  ${(item.levels.length) ? setLevel(item.levels, 'estimation') : newLevel('level', null, 'estimation')}
                </ul>
                <div class="levels__bottom">
                  <a class="levels-bottom__btn--modify">Добавить уровень</a>
                </div>
              </div>
            `
            }

            if (item.typeCode === 2) {
                return `
              <div class="levels-rate">
                <div class="levels__top">
                  <span class="levels__title"></span>
                  <span class="levels__delete"></span>
                </div>
                <ul class="levels__list">
                  ${(item.levels.length) ? setLevel(item.levels, 'ad') : newLevel('level', null, 'ad')}
                </ul>
                <div class="levels__bottom">
                  <a class="levels-bottom__btn--modify">Добавить уровень</a>
                </div>
              </div>
            `
            }
        }

        $('[menu-modify-template__form]').append(redactor);

        const inputs = ['.value-from__value', '.value-to__value', '.value-reward__value'];

        setInputTypeNumber(inputs);
    }

    if (name === 'TypedLeveledWageRate') {
        const redactor = () => {
            if (item.typeCode === 5) {
                return `
          <div class="levels">
          </div>
        `
            }

            if (item.typeCode === 6) {
                return `
          <div class="levels">
          </div>
        `
            }
        }
        $('[menu-modify-template__form]').append(redactor);

        setLadderModify(item);

        const inputs = ['.value-from__value', '.value-to__value', '.value-reward__value'];

        setInputTypeNumber(inputs);
    }
}

/* Устанавливаем уровень по умолчанию */
function setLevel(arr, str) {
    if (str === 'estimation') {
        const level = $.map(arr, (item) => {
            return `
        <li class="levels__item">
          <form class="level">
            <input type="hidden" class="level-id" value="${item.id}">
            <div class="level__id">
              <div class="level-id__title">Lvl</div>
              <div class="level-id__count">${item.level}</div>
            </div>
            <div class="level__value-from">
              <div class="value-from__title">Балы от</div>
              <input autocomplete="off"  class="value-from__value input-number" name="valueFrom" type="text" value="${item.valueFrom}" placeholder="0">
            </div>
            <span class="levels-interval__icon"></span>
            <div class="level__value-to">
              <div class="value-to__title">Балы до</div>
              <input autocomplete="off" class="value-to__value input-number" name="valueTo" type="text" value="${item.valueTo}" placeholder="0">
            </div>
            <div class="level__reward">
              <div class="value-reward__title">Коэф</div>
              <input autocomplete="off" class="value-reward__value input-number" name="multiplier" type="text" value="${item.multiplier}" placeholder="0">
            </div>
            <div class="level__delete--modify"></div>
          </form>
        </li>
      `
        }).join('');

        return level;
    }

    if (str === 'ad') {
        const level = $.map(arr, (item) => {
            return `
        <li class="levels__item">
          <form class="level">
          <input type="hidden" class="level-id" value="${item.id}">
            <div class="level__id">
              <div class="level-id__title">Lvl</div>
              <div class="level-id__count">${item.level}</div>
            </div>
            <div class="level__value-from">
              <div class="value-from__title">% от</div>
              <input autocomplete="off"  class="value-from__value input-number" name="valueFrom" type="text" value="${item.valueFrom}" placeholder="0">
              <div class="level-input__icon">&#8381;</div>
            </div>
            <span class="levels-interval__icon"></span>
            <div class="level__value-to">
              <div class="value-to__title">% до</div>
              <input autocomplete="off" class="value-to__value input-number" name="valueTo" type="text" value="${item.valueTo}" placeholder="0">
              <div class="level-input__icon">&#8381;</div>
            </div>
            <div class="level__reward">
              <div class="value-reward__title">Награда</div>
              <input autocomplete="off" class="value-reward__value input-number" name="multiplier" type="text" value="${item.multiplier}" placeholder="0">
              <div class="level-input__icon">%</div>
            </div>
            <div class="level__delete--modify"></div>
          </form>
        </li>
      `
        }).join('');

        return level;
    }
}

/* Создаем лестницу */
function setLadderModify(item) {
    if (!$('.ladder__separator').get(0)) {
        $('<div>').attr('class', 'ladder__separator').insertBefore($('.ladder__create'));
    }

    $('.levels').append($('<div>').attr('class', 'levels-additional')
        .append($('<div>').attr('class', 'levels-additional__top')
            .append($('<span>').attr('class', 'levels-additional__title').html('База'))
        )
        .append($('<ul>').attr('class', 'levels-additional__list')
            .append(item.levels.additional.length != 0 ? renderLevels(item.levels.additional, 'additional') : newLevel('additional'))
        )
        .append($('<div>').attr('class', 'level-additional__add')
            .append($('<a>').attr('class', 'level-additional__button').html('Добавить уровень'))
        ))

    $('.levels').append($('<div>').attr('class', 'levels-traffic')
        .append($('<div>').attr('class', 'levels-traffic__top')
            .append($('<span>').attr('class', 'levels-traffic__title').html('Траффик'))
        )
        .append($('<ul>').attr('class', 'levels-traffic__list')
            .append(item.levels.additional.length != 0 ? renderLevels(item.levels.traffic, 'traffic') : newLevel('traffic'))
        )
        .append($('<div>').attr('class', 'level-traffic__add')
            .append($('<a>').attr('class', 'level-traffic__button').html('Добавить уровень'))
        )
    )
}

$(document).on('click', '.save__template--modify', saveBlock);

function saveBlock() {
    if (modifyWageBlock.className === 'FixedWageRate') {
        if (modifyWageBlock.typeCode === 0) {
            modifyWageBlock.regularRate = +$('.motivation-modify-template__regular').val();
            modifyWageBlock.holidayRate = +$('.motivation-modify-template__holiday').val();
            wageBlocks.push(modifyWageBlock);
        }
    }

    if (modifyWageBlock.className === 'OneValueWageRate') {
        if (modifyWageBlock.typeCode === 3) {
            modifyWageBlock.value = +$('.motivation-modify-template__coef').val();

            wageBlocks.push(modifyWageBlock);
        }

        if (modifyWageBlock.typeCode === 4) {
            modifyWageBlock.value = +$('.motivation-modify-template__coef').val();

            wageBlocks.push(modifyWageBlock);
        }

        if (modifyWageBlock.typeCode === 7) {
            modifyWageBlock.value = +$('.motivation-modify-template__coef').val();

            wageBlocks.push(modifyWageBlock);
        }
    }

    if (modifyWageBlock.className === 'ControlWageRate') {

        if (modifyWageBlock.typeCode === 3) {
            modifyWageBlock.regularRate = +$('.motivation-modify-template__control').val();
            wageBlocks.push(modifyWageBlock);
        }

        if (modifyWageBlock.typeCode === 4) {
            modifyWageBlock.regularRate = +$('.motivation-modify-template__control').val();
            wageBlocks.push(modifyWageBlock);
        }
    }

    if (modifyWageBlock.className === 'LeveledWageRate') {

        if (modifyWageBlock.typeCode === 1) {
            modifyWageBlock.levels = [];
            modifyWageBlock.levels.length = 0;

            $.each($('.levels__item'), (index, item) => {
                const data = {
                    id: +$(item).find('.level-id').val(),
                    level: +$(item).find('.level-id__count').html(),
                    valueFrom: +$(item).find('.value-from__value').val(),
                    valueTo: +$(item).find('.value-to__value').val(),
                    multiplier: +$(item).find('.value-reward__value').val(),
                }

                modifyWageBlock.levels.push(data);
            });

            wageBlocks.push(modifyWageBlock);
        }

        if (modifyWageBlock.typeCode === 2) {
            modifyWageBlock.levels = [];
            modifyWageBlock.levels.length = 0;

            $.each($('.levels__item'), (index, item) => {
                const data = {
                    id: +$(item).find('.level-id').val(),
                    level: +$(item).find('.level-id__count').html(),
                    valueFrom: +$(item).find('.value-from__value').val(),
                    valueTo: +$(item).find('.value-to__value').val(),
                    multiplier: +$(item).find('.value-reward__value').val(),
                }

                modifyWageBlock.levels.push(data);
            });

            wageBlocks.push(modifyWageBlock);
        }
    }

    if (modifyWageBlock.className === 'TypedLeveledWageRate' && modifyWageBlock.typeCode === 5) {
        modifyWageBlock.levels = {};
        modifyWageBlock.levels.additional = [];
        modifyWageBlock.levels.traffic = [];
        modifyWageBlock.levels.additional.length = 0;
        modifyWageBlock.levels.traffic.length = 0;

        $.each($('.levels-additional__list').children(), (index, item) => {
            const data = {
                id: +$(item).find('.level-id').val(),
                level: +$(item).find('.level-id__count').html(),
                valueFrom: +$(item).find('.value-from__value').val(),
                valueTo: +$(item).find('.value-to__value').val(),
                multiplier: +$(item).find('.value-reward__value').val(),
            }

            modifyWageBlock.levels.additional.push(data);
        });

        $.each($('.levels-traffic__list').children(), (index, item) => {
            const data = {
                id: +$(item).find('.level-id').val(),
                level: +$(item).find('.level-id__count').html(),
                valueFrom: +$(item).find('.value-from__value').val(),
                valueTo: +$(item).find('.value-to__value').val(),
                multiplier: +$(item).find('.value-reward__value').val(),
            }

            modifyWageBlock.levels.traffic.push(data);
        });

        wageBlocks.push(modifyWageBlock);
    }

    if (modifyWageBlock.className === 'TypedLeveledWageRate' && modifyWageBlock.typeCode === 6) {
        modifyWageBlock.levels = {};
        modifyWageBlock.levels.additional = [];
        modifyWageBlock.levels.traffic = [];
        modifyWageBlock.levels.additional.length = 0;
        modifyWageBlock.levels.traffic.length = 0;

        $.each($('.levels-additional__list').children(), (index, item) => {
            const data = {
                id: +$(item).find('.level-id').val(),
                level: +$(item).find('.level-id__count').html(),
                valueFrom: +$(item).find('.value-from__value').val(),
                valueTo: +$(item).find('.value-to__value').val(),
                multiplier: +$(item).find('.value-reward__value').val(),
            }

            modifyWageBlock.levels.additional.push(data);
        });

        $.each($('.levels-traffic__list').children(), (index, item) => {
            const data = {
                id: +$(item).find('.level-id').val(),
                level: +$(item).find('.level-id__count').html(),
                valueFrom: +$(item).find('.value-from__value').val(),
                valueTo: +$(item).find('.value-to__value').val(),
                multiplier: +$(item).find('.value-reward__value').val(),
            }

            modifyWageBlock.levels.traffic.push(data);
        });

        wageBlocks.push(modifyWageBlock);
    }

    $('[menu-modify-template__form]').children().remove();

    const menu = document.querySelector('[js-menu-motivation-modify-template]');
    const wrapper = menu.querySelector('.platform-modal__wrapper')
    closeModalAnimation(menu, wrapper, false, false);
}

$(document).on('click', '[close-motivation-modify-menu]', function () {
    $('[js-menu-motivation-modify]').removeClass('is-open');

    $.each($('.motivation-months__checkbox--modify'), (index, item) => {
        $(item).prop('checked', false);
        $(item).prop('disabled', false);
    });

    $('body').css({ overflow: 'auto' });
});

$(document).on('click', '[close-motivation-templates-menu]', function () {
    $('[js-menu-motivation-templates]').removeClass('is-open');
});

$(document).on('click', '[close-motivation-modify-template-menu]', function () {
    $('[js-menu-motivation-modify-template]').removeClass('is-open');
});

$(document).on('click', '[close-motivation-add-menu]', function () {
    $('[js-menu-motivation-add]').removeClass('is-open');
});

$(document).on('click', '.level-additional__button', function () {
    $('.levels-additional__list').append(newLevel('additional'));
});

$(document).on('click', '.level-traffic__button', function () {
    $('.levels-traffic__list').append(newLevel('traffic'));
});

$(document).on('click', '.levels-bottom__btn--modify', function () {
    $('.levels__list').append(newLevel('level', null, 'estimation'));
});

function renderLevels(arr, setting) {
    let type;

    if (setting === 'additional') {
        type = "additional";
    }

    if (setting === 'traffic') {
        type = "traffic";
    }

    if (setting === 'level') {
        type = 'level';
    }

    let result = $.map(arr, (item) => {
        return `
    <li class="levels__item">
    <form class="${type}">
    <input type="hidden" class="level-id" value="${item.id}">
    <div class="level__id">
      <div class="level-id__title">Lvl</div>
      <div class="level-id__count">${item.level}</div>
    </div>
    <div class="level__value-from">
      <div class="value-from__title">% от</div>
      <input autocomplete="off" placeholder="0" class="value-from__value input-number" type="text" name="valueFrom" value="${item.valueFrom}">
      <div class="level-input__icon">&#8381;</div>
    </div>
    <span class="levels-interval__icon"></span>
    <div class="level__value-to">
      <div class="value-to__title">% до</div>
      <input autocomplete="off" placeholder="0" class="value-to__value input-number" type="text" name="valueTo" value="${item.valueTo}">
      <div class="level-input__icon">&#8381;</div>
    </div>
    <div class="level__reward">
      <div class="value-reward__title">Награда</div>
      <input autocomplete="off" placeholder="0" class="value-reward__value input-number" type="text" name="multiplier" value="${item.multiplier}">
      <div class="level-input__icon">%</div>
    </div>
    <div class="level__delete--modify"></div>
    </form>
  </li>

    `
    }).join('');

    return result;
}

function newLevel(setting, item = null, str) {
    let countAdd;
    let countTr;
    let countLvl;

    let type;

    if (setting === 'additional') {
        type = "additional";
        countAdd = $('.additional').length + 1;
    }

    if (setting === 'traffic') {
        type = "traffic";
        countTr = $('.traffic').length + 1;
    }

    if (setting === 'level') {
        type = 'level';
        countLvl = $('.levels__item').length + 1;
    }

    if (str === 'estimation') {
        return `
    <li class="levels__item">
      <form class="${type}">
      <div class="level__id">
        <div class="level-id__title">Lvl</div>
        <div class="level-id__count">${(type === 'additional') ? countAdd : (type === 'traffic') ? countTr : countLvl}</div>
      </div>
      <div class="level__value-from">
        <div class="value-from__title">Балы от</div>
        <input autocomplete="off" class="value-from__value input-number" name="valueFrom" type="text" placeholder="0">
      </div>
      <span class="levels-interval__icon"></span>
      <div class="level__value-to">
        <div class="value-to__title">Балы до</div>
        <input autocomplete="off" class="value-to__value input-number" name="valueTo" type="text" placeholder="0">
      </div>
      <div class="level__reward">
        <div class="value-reward__title">Коэф</div>
        <input autocomplete="off" class="value-reward__value input-number" name="multiplier" type="text" placeholder="0">
      </div>
      <div class="level__delete--modify"></div>
      </form>
    </li>
  `;
    }

    if (str === 'ad') {
        return `
    <li class="levels__item">
      <form class="${type}">
      <div class="level__id">
        <div class="level-id__title">Lvl</div>
        <div class="level-id__count">${(type === 'additional') ? countAdd : (type === 'traffic') ? countTr : countLvl}</div>
      </div>
      <div class="level__value-from">
        <div class="value-from__title">% от</div>
        <input autocomplete="off" class="value-from__value input-number" name="valueFrom" type="text" placeholder="0">
        <div class="level-input__icon">%</div>
      </div>
      <span class="levels-interval__icon"></span>
      <div class="level__value-to">
        <div class="value-to__title">% до</div>
        <input autocomplete="off" class="value-to__value input-number" name="valueTo" type="text" placeholder="0">
        <div class="level-input__icon">%</div>
      </div>
      <div class="level__reward">
        <div class="value-reward__title">Награда</div>
        <input autocomplete="off" class="value-reward__value input-number" name="multiplier" type="text" placeholder="0">
        <div class="level-input__icon">%</div>
      </div>
      <div class="level__delete--modify"></div>
      </form>
    </li>
  `;
    }

    if (str === 'revenue') {
        return `
    <li class="levels__item">
      <form class="${type}">
      <div class="level__id">
        <div class="level-id__title">Lvl</div>
        <div class="level-id__count">${(type === 'additional') ? countAdd : (type === 'traffic') ? countTr : countLvl}</div>
      </div>
      <div class="level__value-from">
        <div class="value-from__title">% от</div>
        <input autocomplete="off" class="value-from__value input-number" name="valueFrom" type="text" placeholder="0">
        <div class="level-input__icon">%</div>
      </div>
      <span class="levels-interval__icon"></span>
      <div class="level__value-to">
        <div class="value-to__title">% до</div>
        <input autocomplete="off" class="value-to__value input-number" name="valueTo" type="text" placeholder="0">
        <div class="level-input__icon">%</div>
      </div>
      <div class="level__reward">
        <div class="value-reward__title">Награда</div>
        <input autocomplete="off" class="value-reward__value input-number" name="multiplier" type="text" placeholder="0">
        <div class="level-input__icon">%</div>
      </div>
      <div class="level__delete--modify"></div>
      </form>
    </li>
  `;
    }

    return `
  <li class="levels__item">
    <form class="${type}">
    <div class="level__id">
      <div class="level-id__title">Lvl</div>
      <div class="level-id__count">${(type === 'additional') ? countAdd : (type === 'traffic') ? countTr : countLvl}</div>
    </div>
    <div class="level__value-from">
      <div class="value-from__title">Сумма от</div>
      <input autocomplete="off" class="value-from__value input-number" name="valueFrom" type="text" placeholder="0">
      <div class="level-input__icon">&#8381;</div>
    </div>
    <span class="levels-interval__icon"></span>
    <div class="level__value-to">
      <div class="value-to__title">Сумма до</div>
      <input autocomplete="off" class="value-to__value input-number" name="valueTo" type="text" placeholder="0">
      <div class="level-input__icon">&#8381;</div>
    </div>
    <div class="level__reward">
      <div class="value-reward__title">Награда</div>
      <input autocomplete="off" class="value-reward__value input-number" name="multiplier" type="text" placeholder="0">
      <div class="level-input__icon">%</div>
    </div>
    <div class="level__delete--modify"></div>
    </form>
  </li>
`;
}

$(document).on('click', '.levels-additional__delete', function () {
    $('.levels-additional').remove();

    if (!$('.levels-additional').get(0) && !$('.levels-traffic').get(0)) {
        $('.ladder__separator').remove();
    }
});

$(document).on('click', '.levels-traffic__delete', function () {
    $('.levels-traffic').remove();

    if (!$('.levels-additional').get(0) && !$('.levels-traffic').get(0)) {
        $('.ladder__separator').remove();
    }
});

$(document).on('click', '.level__delete--modify', function (e) {
    if ($(e.target).closest('.levels__item').get(0)) {
        const id = $(e.target).closest('.levels__item').find('.level-id');

        if ($(id).get(0)) {
            deletedLevels.push(+id.val());
        }

        $(e.target).closest('.levels__item').remove();

        $.each($('.additional'), (index, item) => {
            $(item).find('.level-id__count').html(index + 1);
        });

        $.each($('.traffic'), (index, item) => {
            $(item).find('.level-id__count').html(index + 1);
        });

        $.each($('.level'), (index, item) => {
            $(item).find('.level-id__count').html(index + 1);
        });
    }
});

function deleteFromMain() {
    let counter = allPack.findIndex(el => el.id === +deleteId);

    allPack.splice(counter, 1);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "deleteWageRate",
        data: JSON.stringify(deleteId),
        dataType: 'json',
        cache: false,
        success: function () {
            const menu = document.querySelector('[js-menu-motivation-modify]')
            const wrapper = menu.querySelector('.platform-modal__wrapper');
            closeModalAnimation(menu, wrapper, false, true);

            renderAfterDelete(deleteId);
        },
        error: function () {
        }
    });
}

function deleteMotivation() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "deleteWageRate",
        data: JSON.stringify(deleteId),
        dataType: 'json',
        cache: false,
        success: function () {
            renderAfterDelete(deleteId);

            $('body').css({ overflow: 'auto' });

            const menu = document.querySelector('[js-menu-motivation-modify]');
            const wrapper = menu.querySelector('.platform-modal__wrapper');

            closeModalAnimation(menu, wrapper, false, true);
        },
        error: function () {
        }
    });
}

function renderAfterDelete(id) {
    $.each($('[blocks]').children(), (index, item) => {
        if (+$(item).find('.motivation-now__wage').attr('value') === +id) {
            $(item).remove();
        }
    });
}

$(document).on('click', '.modify-cancel', function () {
    const data = {
        idCompany: +$('[id-company]').val(),
        idDepartment: +$('.motivation-add__department option:selected').attr('value'),
        idPosition: +$('.motivation-add__position option:selected').attr('value'),
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "getWageRates",
        data: JSON.stringify(data),
        dataType: 'json',
        cache: false,
        success: function result(data) {
            if (data.length != 0) {
                $.each(data, (index, item) => {
                    if (item.id == +$('.motivation__id').val()) {
                        $('[menu-modify-template__form]').children().remove();
                        $.each(item.blocks, (count, elem) => {
                            if (elem.className === wageBlockName && elem.typeCode == type) {
                                if ($('[menu-modify-template__form]').children().length == 0) {
                                    settingsWageBLock(elem);
                                }
                            }
                        });
                    }
                });
            }
        },
        error: function () {
        }
    });
});

/* Выводим блоки для создания новой ЗП */
function renderWageBlock(data) {
    let wageBlock;
    let emptyWage = [];

    if ($.isArray(data)) {
        $.each(data, (index, item) => {
            emptyWage.length = 0;

            wageBlock = $.map(item.blocks, (part) => {
                let obj = {};

                const element = Object.entries(part);

                if (part.className === 'FixedWageRate') {
                    $.each(element, (count, elem) => {
                        if (elem[0] !== 'className' && elem[0] !== 'typeCode' && elem[0] !== 'active' && elem[0] !== 'idRatePack' && elem[0] !== 'id' && elem[0] !== 'typeName') {
                            elem[1] = null;
                        }

                        if (elem[0] === 'active') {
                            elem[1] = true;
                        }

                        obj[elem[0]] = elem[1];
                    });
                }

                if (part.className === 'OneValueWageRate' && part.typCode === 3) {
                    $.each(element, (count, elem) => {
                        if (elem[0] !== 'className' && elem[0] !== 'typeCode' && elem[0] !== 'active' && elem[0] !== 'idRatePack' && elem[0] !== 'id' && elem[0] !== 'typeName') {
                            elem[1] = null;
                        }

                        if (elem[0] === 'active') {
                            elem[1] = true;
                        }

                        obj[elem[0]] = elem[1];
                    });
                }

                if (part.className === 'OneValueWageRate' && part.typCode === 4) {
                    $.each(element, (count, elem) => {
                        if (elem[0] !== 'className' && elem[0] !== 'typeCode' && elem[0] !== 'active' && elem[0] !== 'idRatePack' && elem[0] !== 'id' && elem[0] !== 'typeName') {
                            elem[1] = null;
                        }

                        if (elem[0] === 'active') {
                            elem[1] = true;
                        }

                        obj[elem[0]] = elem[1];
                    });
                }

                if (part.className === 'OneValueWageRate' && part.typCode === 7) {
                    $.each(element, (count, elem) => {
                        if (elem[0] !== 'className' && elem[0] !== 'typeCode' && elem[0] !== 'active' && elem[0] !== 'idRatePack' && elem[0] !== 'id' && elem[0] !== 'typeName') {
                            elem[1] = null;
                        }

                        if (elem[0] === 'active') {
                            elem[1] = true;
                        }

                        obj[elem[0]] = elem[1];
                    });
                }

                if (part.className === 'ControlWageRate') {
                    $.each(element, (count, elem) => {
                        if (elem[0] !== 'className' && elem[0] !== 'typeCode' && elem[0] !== 'active' && elem[0] !== 'idRatePack' && elem[0] !== 'id' && elem[0] !== 'typeName') {
                            elem[1] = null;
                        }

                        if (elem[0] === 'active') {
                            elem[1] = true;
                        }

                        obj[elem[0]] = elem[1];
                    });
                }

                if (part.className === 'LeveledWageRate' && part.typeCode === 1) {
                    $.each(element, (count, elem) => {
                        if (elem[0] !== 'className' && elem[0] !== 'typeCode' && elem[0] !== 'active' && elem[0] !== 'idRatePack' && elem[0] !== 'id' && elem[0] !== 'typeName') {
                            elem[1] = null;
                        }

                        if (elem[0] === 'active') {
                            elem[1] = true;
                        }

                        obj[elem[0]] = elem[1];
                    });

                    obj.levels = [];
                }

                if (part.className === 'LeveledWageRate' && part.typeCode === 2) {
                    $.each(element, (count, elem) => {
                        if (elem[0] !== 'className' && elem[0] !== 'typeCode' && elem[0] !== 'active' && elem[0] !== 'idRatePack' && elem[0] !== 'id' && elem[0] !== 'typeName') {
                            elem[1] = null;
                        }

                        if (elem[0] === 'active') {
                            elem[1] = true;
                        }

                        obj[elem[0]] = elem[1];
                    });

                    obj.levels = [];
                }

                if (part.className === 'TypedLeveledWageRate' && part.typeCode === 5) {
                    $.each(element, (count, elem) => {
                        if (elem[0] !== 'className' && elem[0] !== 'typeCode' && elem[0] !== 'active' && elem[0] !== 'idRatePack' && elem[0] !== 'id' && elem[0] !== 'typeName') {
                            elem[1] = null;
                        }

                        if (elem[0] === 'active') {
                            elem[1] = true;
                        }

                        obj[elem[0]] = elem[1];
                    });

                    obj.levels = {};
                    obj.levels.additional = [];
                    obj.levels.traffic = [];
                }

                if (part.className === 'TypedLeveledWageRate' && part.typeCode === 6) {
                    $.each(element, (count, elem) => {
                        if (elem[0] !== 'className' && elem[0] !== 'typeCode' && elem[0] !== 'active' && elem[0] !== 'idRatePack' && elem[0] !== 'id' && elem[0] !== 'typeName') {
                            elem[1] = null;
                        }

                        if (elem[0] === 'active') {
                            elem[1] = true;
                        }

                        obj[elem[0]] = elem[1];
                    });

                    obj.levels = {};
                    obj.levels.additional = [];
                    obj.levels.traffic = [];
                }

                emptyWage.push(obj);

                if ($('[js-motivation-add-blocks]').children().length === 0) {
                    return `
          <div class="motivation-new__block motivation__block motivation-${part}">
            <div class="motivation-new__image motivation-${part}__block"></div>
            <div class="motivation-new__info">
              <span class="motivation-new__title motivation__title">${obj.typeName}</span>
              <div>
                <input type="checkbox" class="motivation-new__block-checkbox motivation__checkbox" value="${obj.className}" id="${obj.className + '_' + obj.typeCode + '_' + ($('wage-rates__item').length + 2)}" ${(obj.active) ? 'checked' : ''} data-type="${obj.typeCode + '_' + ($('wage-rates__item').length + 2)}">
                <label for="${obj.className + '_' + obj.typeCode + '_' + ($('wage-rates__item').length + 2)}" class="motivation-new__block-toggle motivation__toggle">
                <input type="hidden" class="motivation__type" value="${obj.typeCode}">
              </div>
            </div>
          </div>
        `
                }
            });

            let newWage = Object.assign({}, item);
            newWage.blocks = [];
            newWage.blocks.length = 0;
            newWage.blocks = emptyWage;

            if (newWage.motivationName === '') {
                newWage.motivationName = null;
            }

            if ($('[wage-rates]').children().length === 0) {
                $(document).off('click', '.motivation-add__block');
                $(document).on('click', '.motivation-add__block', viewBlocks.bind(null, wage));

            } else {
                $.each($('.wage-rates__item'), (count, elem) => {
                    if (count === index) {
                        $.each($(elem).find($('.motivation-add__block')), (iterator, subject) => {
                            $(subject).on('click', function () {
                                $(document).off('click', '.motivation-add__block');
                                $(document).on('click', '.motivation-add__block', viewBlocks.bind(null, item));
                            });
                        });
                    }
                });
            }

            setTimeout(() => {
                $.each(newWage.blocks, (count, elem) => {
                    $.each($('.motivation-mofidy__block-checkbox'), (index, item) => {
                        if ($(item).val() === elem.className) {
                            $(item).on('change', () => {
                                if ($(item).is(':checked')) {
                                    elem.active = true;
                                } else {
                                    elem.active = false;
                                }
                            });
                        }
                    });
                });
            }, 10);

            $(document).off('click', '.motivation-new__block');

            $(document).on('click', '.motivation-new__block', viewBlocks.bind(null, newWage));
        });
    }

    $('[js-motivation-add-blocks]').append(wageBlock);
}

$(document).on('click', '.add-cancel', function () {
    $('[menu-modify-template__form]').get(0).reset();

    let add = $('.levels-additional').find('.levels__item');
    let traffic = $('.levels-traffic').find('.levels__item');
    let lvl = $('.levels-rate').find('.levels__item');

    if (add.length > 1) {
        $.each(add, (index, item) => {
            if (index != 0) {
                $(item).remove();
            }
        });
    }

    if ($('.additional').get(0)) {
        $('.additional').get(0).reset();
    }

    if (traffic.length > 1) {
        $.each(traffic, (index, item) => {
            if (index != 1) {
                $(item).remove();
            }
        });
    }

    if ($('.traffic').get(0)) {
        $('.traffic').get(0).reset();
    }

    if (lvl.length > 1) {
        $.each(lvl, (index, item) => {
            if (index != 0) {
                $(item).remove();
            }
        });
    }

    if ($('.level').get(0)) {
        $('.level').get(0).reset();
    }

    $.each($('.additional'), (index, item) => {
        $(item).find('.level-id__count').html(index + 1);
    });

    $.each($('.traffic'), (index, item) => {
        $(item).find('.level-id__count').html(index + 1);
    });

    $.each($('.level'), (index, item) => {
        $(item).find('.level-id__count').html(index + 1);
    });

    if ($('.ladder__separator').get(0)) {
        $('.ladder__separator').remove();
    }
})

$(document).on('click', '.menu-modify-template__cancel', function () {
    const menu = document.querySelector('[js-menu-motivation-modify-template]');
    const wrapper = menu.querySelector('.platform-modal__wrapper')
    closeModalAnimation(menu, wrapper, false, false);
});

$(document).on('click', '.motivation__redacted', function () {

    data = null;
    data = $('[js-menu-motivation-modify__form]').serializeObject();

    if (!data.motivationName) return false;

    let motivation;

    $.each(allPack, (index, item) => {
        if (+deleteId === item.id) {
            motivation = item;
        }
    });

    /* Формируем объект для отправки */

    data.idCompany = motivation.idCompany;
    data.idDepartment = motivation.idDepartment;
    data.idPosition = motivation.idPosition;
    data.id = +deleteId;
    data.year = motivation.year;

    if (data.months) {
        if (!$.isArray(data.months)) {
            const months = [];
            months.push(`${data.months}`);
            data.months = months;
        } else {
            const months = [];
            $.each(data.months, (index, item) => {
                months.push(+item);
            });
            data.months = months;
        }
    }

    if (!data.months) return false;

    data.blocks = [];
    data.blocks.length = 0;

    const classNames = [];

    $.each(oldBlocks, (index, item) => {
        classNames.push(item.className);
    });

    const classType = [];

    $.each(oldBlocks, (index, item) => {
        classType.push(item.typeCode);
    });

    if (wageBlocks.length != 0) {
        $.each(oldBlocks, (index, item) => {
            $.each(wageBlocks, (count, elem) => {
                if (item.className === elem.className && item.typeCode === elem.typeCode) {
                    var iterator = classNames.indexOf(elem.className);

                    if (iterator !== -1) {
                        let counter = classType.indexOf(elem.typeCode);

                        oldBlocks[counter] = elem;
                    }
                }
            });
        });
    } else {
        $.each(oldBlocks, (index, item) => {
            data.blocks.push(item);
        });
    }

    data.blocks = oldBlocks;

    const deleted = [];

    $.each(selectedMonthForSelf, (index, item) => {
        $.each($('.motivation-months__checkbox--modify'), (count, elem) => {
            if (+$(elem).attr('value') === item && !$(elem).is(':checked')) {
                deleted.push(+$(elem).attr('value'));
            }
        });
    });

    updatingBox.keyField = data;
    updatingBox.valueField.deletedMonths = deleted;
    updatingBox.valueField.deletedLevels = deletedLevels;

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "saveWageRate",
        data: JSON.stringify(updatingBox),
        dataType: 'json',
        cache: false,
        success: function () {

            afterActionMotivation();

            $('body').css({ overflow: 'auto' });
            const menu = document.querySelector('[js-menu-motivation-modify]');
            const wrapper = menu.querySelector('.platform-modal__wrapper');
            closeModalAnimation(menu, wrapper, false, true);
        },
        error: function () {
        }
    })
})


function afterActionMotivation() {
    selectedMonths.length = 0;

    const getWagesData = getWages();

    getWagesData.then((data) => {
        $('[js-motivation-now__block]').children().remove();

        $.each(data, (index, item) => {
            if (+deleteId === item.id) {
                motivation = item;
            }
        });

        const selectedDep = +$('.motivation-add__department option:selected').val();
        const selectedPos = +$('.motivation-add__position option:selected').val();
        const selectedType = $('select[name="forSelfEmployed"]').val();
        const selectedYear = $('.motivation-add__year option:selected').val();

        const settings = getSelectChoose(selectedDep, selectedPos, selectedType, selectedYear);

        renderAfterAction(settings);
        openRedactorWrapper()
    })
}

function getSelectChoose(dep, pos, type, year) {
    const noOne = (!dep && !pos && !type && !year) ? 'no-one' : '';
    const chooseDep = (dep && !pos && !type && !year) ? 'dep' : '';
    const depAndPos = (dep && pos && !type && !year) ? 'dep&pos' : '';
    const depAndPosAndType = (dep && pos && type && !year) ? 'dep&pos&type' : '';
    const all = (dep && pos && type && year) ? 'all' : '';

    return noOne || chooseDep || depAndPos || depAndPosAndType || all;
}

function renderAfterAction(settings) {
    switch (settings) {
        case 'no-one': {
            renderMotivation(data);
            break;
        }
        case 'dep': {
            const selected = data.filter(el => el.idDepartment === selectedDep);
            renderMotivation(selected);

            break;
        }
        case 'dep&pos': {
            const selected = data.filter(el => el.idDepartment === selectedDep && el.idPosition === selectedPos);
            renderMotivation(selected);

            break;
        }
        case 'dep&pos&type': {
            const selected = data.filter(el => el.idDepartment === selectedDep && el.idPosition === selectedPos && el.forSelfEmployed === selectedType);
            renderMotivation(selected);
            break;
        }
        case 'all': {
            const selected = data.filter(el => el.idDepartment === selectedDep && el.idPosition === selectedPos && el.forSelfEmployed === selectedType && el.year === selectedYear);
            renderMotivation(selected);

            break;
        }
        default: {
            break;
        }
    }
}

function openRedactorWrapper() {
    let openRedactorMenu = openRedactor.bind(null, data, null, null, null);

    $.each($('.motivation-now__block'), (index, item) => {
        const block = setCloneElement(item);
        $(block).on('click', openRedactorMenu)
    });
}
