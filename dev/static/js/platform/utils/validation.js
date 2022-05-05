/* eslint-disable */
import Utils from './utils.js';
import ValidateBillWithoutTemplate from './validation/bills/validateBillWithoutTemplate.js';
import ValidationWrapper from './validationWrapper.js';
import ValidateUpdateBills from './validation/bills/validateUpdateBills.js'
import Popup from '../modules/popup/popup.js';

const utils = new Utils();
const validateBillWithoutTemplate = new ValidateBillWithoutTemplate();
const validateUpdateBills = new ValidateUpdateBills();
const popup = new Popup();

class Validation extends ValidationWrapper {
    validateHomework(settings) {
        this.required = this.setValidateItemHomework(settings);

        let result;

        if (settings === 'admin') {
            result = this.required.map((item) => {
                const isArray = Array.isArray(item);
                const accepted = !isArray ? item.hasAttribute('accepted') : false;
                const textArea = !isArray ? item.classList.contains('homework-text__area') : false;
                const isRate = isArray ? item.some((el) => el.checked) : false;
                const isEmpty = !isArray ? item.value ? false : true : false;

                if (!isArray && accepted && isEmpty) {
                    this.setError(item);
                    return false;
                } else if (!isArray && accepted && !isEmpty) {
                    return true;
                }

                if (isArray && !isRate) {
                    const wrapper = document.querySelector('.homework-estimation__rate');
                    this.setError(wrapper);
                    return false;
                } else if (isArray && isRate) {
                    return true;
                }

                if (!isArray && textArea && isEmpty) {
                    this.setError(item);
                    return false;
                } else if (!isArray && textArea && !isEmpty) {
                    return true;
                }
            });
        }

        if (settings === 'client') {
            result = this.required.map((item) => {
                const textArea = item.classList.contains('content-input__textarea');
                const isEmpty = item.value ? false : true;

                if (textArea && isEmpty) {
                    this.setError(item);
                    return false;
                } else if (textArea && !isEmpty) {
                    return true;
                }
            });
        }

        return result.every(el => el === true);
    };

    removeMenuAfterClosed(menu, dealMenu = false) {
        setTimeout(() => {
            const isOpen = this.getCssProperty(menu, 'right') === '0px';

            if (!isOpen) {
                if (dealMenu) {
                    menu.querySelector('.nav__left').innerText = '';
                }

                this.setCloneElement(menu);
            }
        }, 800);
    }

    setValidateItemHomework(settings) {
        let required = [];

        if (settings === 'admin') {
            const accepted = document.querySelector('[accepted]');

            required.push(accepted);

            if (accepted.value === 'true') {
                const rate = Array.from(document.querySelectorAll('[name="rate"]'));
                required.push(rate);
            }

            const textAreaAdmin = document.querySelector('.homework-text__area');
            required.push(textAreaAdmin);
        }

        if (settings === 'client') {
            const textAreaClient = document.querySelector('.content-input__textarea');
            required.push(textAreaClient);
        }

        return required;
    }

    validateTask(form) {
        const date = form.querySelector('.menu-tasks__datepicker');
        const message = form.querySelector('.menu-tasks__text');

        const error = utils.getParent(form, 'menu-tasks__wrapper').querySelector('.menu-tasks__error');
        const taskAdd = document.querySelector('.menu-tasks__add');

        if (!date.value && !message.value) {
            this.setError(date);
            this.setError(message);
            return false;
        }

        if (!date.value) {
            this.setError(date);
            return false;
        }

        if (!message.value) {
            this.setError(message);
            return false;
        }

        const add = document.querySelector('.menu-tasks__add');

        if (date.value.split('.').length !== 3) {
            if (!error) {
                this.setErrorDDMMYYYY(add);
            }

            return false;
        } else if (date.value.split('.')[0].length !== 2) {
            if (!error) {
                this.setErrorDDMMYYYY(add);
            }

            return false;
        } else if (date.value.split('.')[1].length !== 2) {
            if (!error) {
                this.setErrorDDMMYYYY(add);
            }

            return false;
        } else if (date.value.split('.')[2].length !== 4) {
            if (!error) {
                this.setErrorDDMMYYYY(add);
            }

            return false;
        } else {
            if (error) {
                error.remove();
            }

            taskAdd.style.marginTop = '0';

            return true;
        }
    }

    validateSMS() {
        const wrapper = document.querySelector('.sms-add__item');

        const date = wrapper.querySelector('.sms-new__date');
        const message = wrapper.querySelector('.sms-new__message');

        if (!date.value && !message.value) {
            this.setError(date);
            this.setError(message);
            return false;
        } else if (!message.value) {
            this.setError(message);
            return false;
        } else if (!date.value) {
            this.setError(date);
            return false;
        }

        const day = date.value.split('.')[0];
        const month = date.value.split('.')[1];
        const year = date.value.split('.')[2];

        const ddmmyy = date.value.split('.').length === 3 && !isNaN(+day) && !isNaN(+month) && !isNaN(+year) && day.length === 2 && month.length === 2 && year.length === 2;
        const ddmmyyyy = date.value.split('.').length === 3 && !isNaN(+day) && !isNaN(+month) && !isNaN(+year) && day.length === 2 && month.length === 2 && year.length === 4;
        const setErrorDDMMYY = this.setErrorDDMMYYYY.bind(this);

        if (ddmmyy || ddmmyyyy) {
            const error = document.querySelector('.error-date');

            if (error) {
                error.remove();
            }

            return true;
        } else {
            setErrorDDMMYY(date);
            return false;
        }
    }

    setErrorDDMMYYYY(item) {
        if (!document.querySelector('.error-date')) {
            const div = document.createElement('div');
            div.classList.add('error-date');
            div.innerText = 'Дата должна быть в формате ДД.ММ.ГГГГ';

            const cbWrapper = item.parentNode;
            cbWrapper.style.flexDirection = 'column';

            cbWrapper.appendChild(div);
        }
    }

    validateClient(form) {
        const name = form.querySelector('[js-change-client-name]');
        const link = form.querySelector('[client-vk]');
        const phone = form.querySelector('[client-phone]');
        const telegram = form.querySelector('[client-telegram]');
        const email = form.querySelector('[client-email]');
    
        const isChangeNameMode = !name.classList.contains('hide');

        let validate;

        if (isChangeNameMode && !name.value) {
            validate = false;

            this.setError(name);
        } else {
            validate = true;
        }

        const contacts = [link, phone, telegram, email];

        const contactsIsNotEmpty = contacts.some((el) => el.value);

        if (!contactsIsNotEmpty) {
            validate = false;

            contacts.forEach((item) => {
                this.setError(item);
            });
        }

        return validate;
    }

    validateBill(form) {
        const required = Array.from(form.querySelectorAll('[required]'));

        const empty = [];

        required.forEach((item) => {
            const value = item.value;

            if (!value) {
                if (item.hasAttribute('[js-bill-planned-date]') && !this.validateDate(item.value)) {
                    empty.push(item);
                    this.setError(item);
                } else {
                    empty.push(item);
                    this.setError(item);
                }
            }
        });

        if (!empty.length) {
            empty.length = 0;
            return true;
        } else {
            empty.length = 0;
            return false;
        }
    }

    validateSection(form) {
        const name = form.querySelector('[js-theme-form-name]') ? form.querySelector('[js-theme-form-name]')
            : form.querySelector('[js-update-theme-form-name]');

        if (name.value) {
            return true;
        } else {
            this.setError(name);
            return false;
        }
    }

    validateSectionFile(form) {
        const name = form.querySelector('[js-update-article-form-name]');
        const link = form.querySelector('[js-update-article-form-link]');
        const file = form.querySelector('.input-file');

        const fields = [name, link, file];

        const empty = [];

        fields.forEach((item) => {
            if (!item.value) {
                empty.push(item);
                this.setError(item);
            }
        })

        if (empty.length) {
            return false;
        } else {
            return true;
        }
    }

    validateDate(date, item) {
        const dateArray = date.trim().split('.');

        if (dateArray.length === 3 && dateArray[2]) {
            if (dateArray[0].length !== 2) {

                if (item) {
                    this.setError(item, 'Формат даты: ДД.ММ.ГГГГ');
                }

                return false;
            }

            if (dateArray[1].length !== 2) {

                if (item) {
                    this.setError(item, 'Формат даты: ДД.ММ.ГГГГ');
                }

                return false;
            }

            if (dateArray[2].length !== 4) {

                if (item) {
                    this.setError(item, 'Формат даты: ДД.ММ.ГГГГ');
                }

                return false;
            }

            return true;
        } else {

            if (item) {
                this.setError(item, 'Формат даты: ДД.ММ.ГГГГ');
            }

            return false;
        }
    }

    validatePayBill(form) {
        return true;
    }

    validateUpdateBill(form) {
        const paymentMethod = form.querySelector('[js-bill-payment-method]');
        const payType = form.querySelector('[js-bill-payment-type]');
        const sum = form.querySelector('[js-bill-sum]');
        const accountNumber = form.querySelector('[js-bill-account-number]');

        const validateItems = [paymentMethod, payType, sum];

        const unrequired = ['Карта Сбербанка', 'PayPal Бизнес', 'LeeLoo (Юкасса)'];

        if (!unrequired.includes(paymentMethod.value)) {
            validateItems.push(accountNumber);
        }

        validateItems.forEach((item) => {
            if (!item.value) {
                this.setError(item);
            }
        });

        const validate = validateItems.every((el) => el.value);

        return validate;
    }

    validationWage(wage, menu) {
        const { motivationName, months } = wage;

        if (!motivationName) {
            const input = menu.querySelector('[js-motivation-name]');
            this.setError(input);

            return false;
        }

        if (!months.length) {
            alert('Выберите хотябы один месяц');
            return false;
        }

        return true
    }

    validationInputNuber(t, data = false, splitter = false, onlyDigit = false) {
        const { value } = t;

        const digits = value.split('.').length === 1 ? !Number.isNaN(+value) : null;
        const fraction = value.split('.').length === 2 ? !Number.isNaN(+value.split('.')[1]) : null;

        const validationData = {
            digits,
            fraction,
            t,
            data,
            onlyDigit,
        };

        if (splitter) {
            validationData.splitter = splitter;
            this.validationSplitter(validationData);
        } else {
            this.validationDigit(validationData)
        }
    }

    validationSplitter(validationData) {
        const { t, splitter, digits, fraction, onlyDigit } = validationData;

        let isValidate;

        if (t.hasAttribute('js-bill-layer-value')) {
            const isSplitter = t.value.split(splitter).length === 2;
            const endPercent = t.value.split('').filter(el => el === '%').length;

            if (onlyDigit) {
                isValidate = digits || (isSplitter && endPercent);
            } else {
                isValidate = digits || fraction || (isSplitter && endPercent);
            }
        } else {
            isValidate = digits || fraction;
        }

        if (!isValidate) {
            const valueInput = t.value.split('').splice(0, t.value.split('').length - 1).join('');

            t.value = valueInput;
        } else {
            const instance = t.value.split('');
            const index = instance.findIndex(el => (el !== '.' && el !== '%' && isNaN(+el)));

            if (index !== -1) {
                instance.splice(index, 1);
                t.value = instance.join('');
            }
        }
    }

    validationDigit(validationData) {
        const { data, t, digits, fraction } = validationData;

        const inData = digits ?? fraction;

        if (inData) {
            if (data) {
                data.regularRate = +t.value;
            }
        } else {
            const valueInput = t.value.split('').splice(0, t.value.split('').length - 1).join('');
            t.value = valueInput;

            if (data) {
                data.regularRate = +valueInput;
            }
        }
    }

    validateCourseBanner() {
        const name = document.querySelector('.banner__name');
        const link = document.querySelector('.banner__link');
        const mobileImg = document.querySelector('#banner-mobile');
        const desktopImg = document.querySelector('#banner-desktop');

        const items = [name, link, mobileImg, desktopImg];

        items.forEach((item) => {
            if (!item.value) {
                this.setError(item);
            }
        });

        return items.every((el) => el.value);
    }

    validateCourseBanner() {
        const name = document.querySelector('.banner__name');
        const link = document.querySelector('.banner__link');
        const mobileImg = document.querySelector('#banner-mobile');
        const desktopImg = document.querySelector('#banner-desktop');

        const items = [name, link, mobileImg, desktopImg];

        items.forEach((item) => {
            if (!item.value) {
                this.setError(item);
            }
        });

        return items.every((el) => el.value);
    }

    validatePublicFormContract(contract) {
        if (!contract.checked) {
            this.setError(document.querySelector('[private-contact]'), 'Согласитесь с договорами', 'contract');
        }

        return contract.checked;
    }

    toValidationError(e) {
        e.preventDefault();
        e.stopPropagation();

        const errors = document.querySelectorAll('.validate-error');

        if (errors.length) {
            const first = errors[0];

            const prevElement = first.previousElementSibling;

            const isHidden = prevElement.classList.contains('hide') || utils.getCssProperty(prevElement, 'display') === 'none';

            if (isHidden) {
                first.previousElementSibling.previousElementSibling.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                first.previousElementSibling.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }

    validateSection(input) {
        if (input.value.trim()) return true;

        this.setError(input);

        return false;
    }

    validateAboutArticle(form) {
        const name = form.querySelector('[js-article-form-name]') || form.querySelector('[js-update-article-form-name]');
        const link = form.querySelector('[js-article-form-link]') || form.querySelector('[js-update-article-form-link]');
        const file = form.querySelector('#file') || form.querySelector('#file2');

        const items = [name, link, file];

        const validate = items.every((el) => el.getAttribute('type') === 'file' ? el.files.length : el.value.trim());

        if (!validate) {
            items.forEach((item) => {
                if (item.getAttribute('type') === 'file' && !item.files.length) {
                    this.setError(item);
                } else if (!item.value) {
                    this.setError(item);
                }
            });

            return false;
        } else {
            return true;
        }
    }

    validateReglament(form) {
        const name = form.querySelector('[js-article-form-name]') || form.querySelector('[js-update-article-form-name]') || form.querySelector('[js-update-tutorial-form-name]');
        const type = form.querySelector('[js-article-form-type]') || form.querySelector('[js-update-article-form-type]') || form.querySelector('[js-update-tutorial-form-type]');
        const img = form.querySelector('#file') || form.querySelector('#fileUpdate');
        const link = form.querySelector('[js-article-form-link]') || form.querySelector('[js-update-article-form-link]');

        const items = [name, img];

        if (!utils.getParent(link, 'menu-input').classList.contains('menu-input_close')) {
            items.push(link);
        }

        if (type) {
            items.push(type);
        }

        const validate = items.every((el) => el.value);

        if (validate) return true;

        items.forEach((item) => {
            if (!item.value) {
                this.setError(item);
            }
        });

        return false;
    }

    validateTrainingCourse(form) {
        const name = form.querySelector('[js-update-tutorial-form-name]') || form.querySelector('[js-tutorial-form-name]');
        const type = form.querySelector('[js-update-tutorial-form-type]') || form.querySelector('[js-tutorial-form-type]');
        const file = form.querySelector('#file2') || form.querySelector('#file');

        const items = [name, type, file];

        const validate = items.every((el) => el.value);

        if (validate) return true;

        items.forEach((item) => {
            if (!item.value) {
                this.setError(item);
            }
        });

        return false;
    }

    validateLessonTrainingCentr(form) {
        const name = form.querySelector('[js-lesson-form-name]');
        const desc = form.querySelector('[js-lesson-form-desc]');
        const video = form.querySelector('[js-lesson-form-video-link]');

        const items = [name, desc, video];

        const validate = items.every(el => el.value);

        if (validate) return validate;

        items.forEach((item) => {
            if (!item.value) {
                this.setError(item);
            }
        });

        return validate;
    }

    validateBillTemplate(form, isUpdate = false) {
        const name = form.querySelector('[bill-template-name]');
        const datesItems = form.querySelectorAll('[js-bill-layer-date]');
        const dates = Array.from(datesItems).filter((el) => !utils.getParent(el, 'layers-item').classList.contains('hide'));
        const valueElems = form.querySelectorAll('[js-bill-layer-value]');
        const values = Array.from(valueElems).filter((el) => !utils.getParent(el, 'layers-item').classList.contains('hide'));
        const today = form.querySelector('[today]');
        const dateStart = form.querySelector('[date-start]');
        const dateStartSecond = form.querySelector('[date-start-second]');
        const dateStartSecondOther = form.querySelector('[date-start-second-other]');

        const items = [name, ...values, ...dates];

        if (today && dateStart) {
            const firstItem = [today, dateStart];
            items.push(firstItem);
        }

        if (dateStartSecond && dateStartSecondOther && !dateStart.checked) {
            const secondItem = [dateStartSecond, dateStartSecondOther];
            items.push(secondItem);
        }

        const renderedItems = items.filter((el) => el);

        const validateItems = renderedItems.every((el) => Array.isArray(el) ? el.some(item => item.checked) : el.value.trim());
        const uniqueName = this.uniqueName(form);

        let validate;

        if (isUpdate) {
            validate = validateItems;
        } else {
            validate = uniqueName && validateItems;
        }

        const valuesItems = this.setValuesItems(form);

        if (validate && valuesItems) return validate && valuesItems;

        items.forEach((item) => {
            if (Array.isArray(item)) {
                const validateRadio = item.some((el) => el.checked);

                if (!validateRadio) {
                    item.forEach((elem) => {
                        this.setError(elem);
                    })
                }
            } else {
                if (!item.value) {
                    this.setError(item);
                }
            }
        });

        if (!isUpdate && !uniqueName) {
            const popupProps = {
                text: 'Шаблон с таким именем уже сущестует',
                title: 'Ошибка!',
                settings: 'alert-close',
            };

            popup.init(popupProps);
            return false;
        }

        if (validate && document.querySelectorAll('[js-bill-layer-value]').length === 0) {
            const popupProps = {
                text: 'Добавьте хотябы один счет',
                title: 'Ошибка!',
                settings: 'alert-close',
            };

            popup.init(popupProps);
            return false;
        } else if (validate && !valuesItems) {
            const popupProps = {
                text: 'Сумма значений не равна 100%',
                title: 'Ошибка!',
                settings: 'alert-close',
            };

            popup.init(popupProps);
            return false;
        }

        return validate && valuesItems;
    }

    uniqueName(form) {
        const currentName = form.querySelector('[bill-template-name]').value.trim().toLowerCase();

        const names = Array.from(document.querySelectorAll('.templates__name'));

        const nameValues = names.map((item) => {
            return item.innerText.trim().toLowerCase();
        });

        return nameValues.includes(currentName) ? false : true;
    }

    setValuesItems(form) {
        const items = Array.from(form.querySelectorAll('[js-bill-layer-value]'));
        const values = [];

        let value;

        if (items.length && items[0].value.split('%').length > 1) {
            items.forEach((item) => {
                values.push(parseInt(item.value));
            });

            value = values.reduce((prev, current) => prev + current, 0);
        } else if (items.length && items[0].value.split('%').length === 1) {
            const withoutFirst = items.slice(1, items.length);

            withoutFirst.forEach((item) => {
                values.push(parseInt(item.value));
            });

            value = values.reduce((prev, current) => prev + current, 0);
        }

        return value === 100;
    }

    validateBuyProduct(form) {
        const streams = form.querySelector('[form-date]');

        if (streams && !streams.value) {
            this.setError(streams);
        }

        return streams ? Boolean(streams?.value) : true;
    }

    validateBillWithDate(menu, needDate = false, deal = false, bill, settings, sumValue) {
        const form = menu.querySelector('[pay-form]');
        const plannedPayDate = Array.from(menu.querySelectorAll('[js-bill-planned-date]'));
        const sum = Array.from(menu.querySelectorAll('[js-bill-sum]'));

        const checkSum = sum.filter((el) => el.value <= deal.price && el.value > 0);

        let checkFormatDate;

        const template = menu.querySelector('[js-bill-payment-template]');

        const type = menu.querySelector('[js-bill-payment-type]');

        if (!template?.value) {
            if (deal && plannedPayDate.length) {
                const firstPay = !Array.from(document.querySelectorAll('.bill__item')).filter((el) => !el.classList.contains('bill__create')).length;

                const dateCheck = plannedPayDate.every((el, index) => (index === 0 && firstPay) ? el.value && utils.compareDates(deal.startDate, el.value) && (this.validateBill(form) && this.validateDate(el.value, el)) : true);

                const validArray = plannedPayDate.map((el) => el.value && (this.validateBill(form) && this.validateDate(el.value, el) && utils.compareDates(deal.startDate, el.value)));

                if (!dateCheck) {
                    plannedPayDate.forEach((item, index) => {
                        validArray.forEach((elem, count) => {
                            if (count === index && index === 0) {
                                if (settings === 'bill-menu') {
                                    this.setError(item, 'Планируемая дата оплаты при\n первом расчете, должна быть\nменьше или равна дате\n старта продукта', 'planned-date-bill');
                                } else {
                                    this.setError(item, 'Планируемая дата оплаты при первом расчете,\nдолжна быть меньше или равна дате старта продукта', 'planned-date');
                                }
                            }
                        });
                    });

                    return false;
                }
            }
        }

        if (sum.length && !checkSum) {
            sum.forEach((item) => {
                if (item.hasAttribute('required') && !checkSum) {
                    this.setError(item, 'Сумма счета должна быть меньше или равна стоимости продукта');
                }
            });

            return false;
        }

        if (sumValue < 0) {
            utils.setPreRemoveWindow('Ошибка! Общая сумма счетов больше суммы продукта', 'alert-close');

            return false;
        }

        return needDate ? checkFormatDate : this.validateBill(form);
    }

    validateUpdateBill(props) {
        return validateUpdateBills.init(props);
    }

    validateBillWithoutTemplate(props) {
        return validateBillWithoutTemplate.init(props);
    }
}

export default Validation;
