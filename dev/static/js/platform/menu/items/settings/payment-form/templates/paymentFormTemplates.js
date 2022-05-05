import Utils from '../../../../../utils/utils.js';
import { paymentFormAPI } from '../../../../../api/api.js';

const utils = new Utils();

class PaymentFormTemplates {
  async renderPaymentForms(data) {
    const { pack } = data;
    const { paymentForms } = pack;

    const wrapper = document.querySelector('[js-payment-forms]');

    utils.removeChildren(wrapper);

    if (wrapper && paymentForms.length) {
      paymentForms.forEach(async (form) => {
        const div = document.createElement('div');
        div.classList.add('payment-form');
        div.setAttribute('data-id', form.id);
        div.innerHTML = this.paymentForm(form);

        await wrapper.appendChild(div);
      });

      const forms = document.querySelectorAll('.payment-form');

      if (forms.length) {
        const setLink = this.setLink.bind(this);
        utils.changeItemsAccess(forms, setLink, false);
      }
    }
  }

  setLink(form) {
    paymentFormAPI.getLink(+form.getAttribute('data-id')).then((link) => {
      const linkItem = form.querySelector('.payment-form__cut');

      if (linkItem) {
        linkItem.setAttribute('href', link);
      }

      const copy = form.querySelector('.payment-form__copy');

      if (copy) {
        copy.setAttribute('data-link', link);
      }
    });
  }

  paymentForm(form) {
    return `
      <div class="payment-form__wrapper">
        <div class="payment-form__delete"></div>
        <div class="payment-form__name">${form.name}</div>
        <div class="payment-form__product">${form.withChoice ? form.course.name : 'Без выбора продукта'}</div>
        <div class="payment-form__bottom">
          <span class="payment-form__date">${form.streams && form.streams.length === 1 ? utils.getDateFormatDDMMYYYY(form.streams[0].startDate) : `${form.streams.length} даты`}</span>
        <div>
        <span class="payment-form__copy"></span>
      </div>
    `;
  }

  menuWithChoiceProduct() {
    return `
      <li class="payment-form__item">
        <div class="payment-form__title">Название *</div>
        <input payment-form-name class="platform-form__input mt_10" placeholder="Введите название формы">
      </li>
      <li class="payment-form__item bt_1" select-here data-select-type="select-deal-type">
        <p class="platform-form__name">Тип сделки *</p>
      </li>
      <li class="payment-form__item" select-here data-select-type="select-funnel">
        <p class="platform-form__name">Воронка *</p>
      </li>
      <li class="payment-form__item bt_1" select-here data-select-type="select-product">
        <p class="platform-form__name">Продукт *</p>
      </li>
      <li class="payment-form__item tariff-content hide" select-here data-select-type="select-tariff">
          <p class="platform-form__name">Тариф</p>
      </li>
      <li start-date-wrapper class="payment-form__item form__dates bt_1">
        <div class="form__dates-wrapper">
            <input streams-choice name="startDate" data-type="one-date" checked type="radio" id="one-date" class="platform__checkbox form__checkbox">
            <label for="one-date" class="platform-checkbox__label form__label">Одна дата</label>
            <input streams-choice name="startDate" data-type="multiply-date" type="radio" id="date-multiply" class="platform__checkbox form__checkbox">
            <label for="date-multiply" class="platform-checkbox__label form__label">Несколько ближайших</label>
        </div>
        <div class="payment-form__date-wrapper">
        </div>
      </li>
      <li class="payment-form__item form__dates bt_1" select-here data-select-type="select-payment-method">
        <p class="platform-form__name">Выберите способ оплаты *</p>
      </li>
      <li outside-link-wrapper class="payment-form__item form__dates bt_1">
        <div class="payment-form__title">Ссылка *</div>
        <div class="form__dates-wrapper">
          <input type="text" links-search class="platform-form__input mt_10" placeholder="Введите название ссылки">
        </div>
        <div class="payment-form__links-wrapper custom-scroll">
        </div>
      </li>
    `;
  }

  tariffWrapper() {
    return `
        <div class="payment-form__title">Тариф</div>
        <div class="platform-select__wrapper tariff">
        <div select-tariff
            class="select select--tariff platform__select update-deal__select-wrapper">
            <input type="hidden" class="tariffValue" id="tariffValue" value id-tariff
                name="tariffValue" required>
            <div tariff-selected class="select__head select__head--tariff">
              <span class="select-head__placeholder">Выберите тариф</span>
            </div>
            <div id="tariff-update" class="select__body select-tariff__body">
                <div class="select__option select__option--tariff"><span
                        class="tariff__name no-selector">Выберите тариф</span></div>
            </div>
          </div>
        </div>
    `;
  }

  startDateCheckbox(item) {
    return `
      <input one-date-select name="start-date" checked id="date_${item.id}" data-id="${item.id}" value="${item.id}" type="radio" class="platform__checkbox">
      <label for="date_${item.id}" class="platform-checkbox__label">
        <span class="platform__checkbox--fake radio-fake"></span>
        <span class="platform__checkbox--text date__text">
          ${item.startDate}
        </span>
      </label>
    `;
  }

  startDateWihChoice() {
    return `
      <p class="platform-form__name">Сколько ближайших дат отображать *</p>
      <div class="platform-select__wrapper">
        <div select class="select platform__select update-deal__select-wrapper">
          <input type="hidden" value id-selected required>
          <div select-head class="select__head">
            <span class="select-head__placeholder">Выберите количество дат</span></div>
          <div select-body class="select__body">
            <div value class="select__option no-icon pl_10">
              Выберите количество дат
            </div>
          </div>
        </div>
      </div>
    `;
  }

  menuWithoutChoice() {
    return `
      <li class="payment-form__item">
        <p class="payment-form__title">Название *</p>
        <input payment-form-name class="platform-form__input mt_10" placeholder="Введите название формы">
      </li>
      <li class="payment-form__item bt_1">
        <div class="payment-form__title">Тип сделки *</div>
        <div class="platform-select__wrapper form__angle">
          <select deal-type class="platform__select platform-form__input mt_10">
            <option class="platform__option" value="">Выберите тип сделки</option>
            <option class="platform__option" value="additional">База</option>
            <option class="platform__option" value="traffic">Трафик</option>
          </select>
        </div>
      </li>
      <li class="payment-form__item">
        <div class="payment-form__title">Воронка *</div>
        <div class="platform-select__wrapper form__angle">
          <select funnel class="platform__select platform-form__input mt_10">
            <option class="platform__option" value="">Выберите воронку</option>
          </select>
        </div>
      </li>
      <li outside-link-wrapper class="payment-form__item form__dates bt_1">
        <div class="payment-form__title">Ссылка *</div>
        <div class="form__dates-wrapper">
          <input type="text" links-search class="platform-form__input mt_10" placeholder="Введите название ссылки">
        </div>
        <div class="payment-form__links-wrapper">
        </div>
      </li>
    `;
  }

  loginFormTemplate(props) {
    const { pack } = props;
    const { form } = pack;

    const streamsOptions = this.setStreamsOptionsToPublicForm(props);

    return `
    ${form?.streams?.length > 1 ? `
      <div class="form__item">
        <p class="form-item__name">Выберите дату старта *</p>
        <div class="platform-select__wrapper mt_5">
          <select form-date class="platform__select form__select">
            ${streamsOptions ? streamsOptions.join('') : ''}
          </select>
        </div>
      </div>
  ` : ''}
    `;
  }

  paymentFormTemplate() {
    return `
      <div class="form__item">
        <p class="form-item__name">Имя и фамилия *</p>
        <input required name="name" form-name placeholder="Введите имя и фамилию" type="text" class="form-item__input">
      </div>
      <div class="form__item">
        <p class="form-item__name">Номер телефона *</p>
        <input required form-tel name="phone" placeholder="Введите номер телефона" type="text" class="form-item__input">
      </div>
      <div class="form__item">
        <p class="form-item__name">E-mail *</p>
        <input required form-email name="email" placeholder="Введите e-mail" type="text" class="form-item__input">
      </div>
    `;
  }

  setStreamsOptionsToPublicForm(props) {
    const { pack } = props;
    const { form } = pack;

    if (form?.streams?.length) {
      return form.streams.map((item) => {
        return `
          <option value="${item.id}">${utils.getDateFormatDDMMYYYY(item.startDate)}</option>
        `;
      });
    }
  }

  async setRegistrationTemplate(props, isRegistration) {
    const { pack } = props;
    const { form } = pack;

    if (form) {
      const script = document.querySelector('.transition-loader');

      const formTemplate = this.publicRegistrationForm(props, isRegistration);

      await script.insertAdjacentHTML('afterend', formTemplate);
    }
  }

  publicRegistrationForm(props, isRegistration) {
    const { pack } = props;
    const { form, docs } = pack;

    const streamsOptions = this.setStreamsOptionsToPublicForm(props);

    const regProps = {
      form,
      isRegistration,
      streamsOptions,
      docs,
    };

    return this.registrationForm(regProps);
  }

  registrationForm(regProps) {
    const {
      form,
      isRegistration,
      streamsOptions,
      docs,
    } = regProps;

    let oferta;
    let coinfedence;

    if (docs) {
      oferta = docs.find((el) => el.type === 0);
      coinfedence = docs.find((el) => el.type === 1);
    }

    return `
    <div class="form public__form ${(form.streams.length === 1 && !isRegistration) ? 'no-selector' : ''}" data-id="${form.id}">
      <h1 class="form__title">${isRegistration ? 'Регистрация' : 'Покупка курса'}</h1>
        ${form.withChoice ? `
          <div class="form__course ${isRegistration ? 'hide' : ''}">
            <img src="${(form.course.backgroundImage !== null) ? `/${form.course.backgroundImage}` : '/'}" alt="course_image" class="course__img">
            <div class="course__info">
              <p class="course__name" title="${form.course.name}">${form.course.name}</p>
              <p class="course__type">${form.course.courseType}</p>
              <div class="course__prop ${form.tarrif ? '' : 'without-tariff'}">
                ${form.tariff ? `
                  <div class="prop__tariff ${form?.streams?.length !== 1 ? 'overflowed' : 'one-date'}">
                    <p class="tariff__name no-selector">
                      <span>Тариф:</span> 
                      <span class="tariff__name--value" title="${form.tariff.name}">${form.tariff.name}</span>
                    </p>
                    <p class="tariff__cost">${form.tariff.price} ₽</p>
                  </div>
                ` : ''}
                ${form?.streams?.length === 1 ? `
                <div class="tariff__date-start">
                  <p class="date-start__name">Дата старта: </p>
                  <p class="date-start">
                    <span class="date-start__value">${utils.getDateFormatDDMMYYYY(form.streams[0].startDate)}</span>
                    <span class="date-start__value">${form.streams[0].startTime}</span>
                  </p>
                </div>
                ` : ''} 
              </div>
            </div>
          </div>
        ` : ''}
      <form action="${isRegistration ? '/public-registration/new-client' : ''}" payment-form method="post" class="client__info mt_15 ${!form.withChoice ? 'no-product' : ''}">
      ${isRegistration ? `
          <p class="info__warning">Пожалуйста, вводите данные внимательно и корректно!</p>
          <div class="form__item have-login">
            <input type="checkbox" id="client-type" class="platform__checkbox"/>
            <label for="client-type" class="platform-checkbox__label">
              <span class="platform__checkbox--fake"></span>
              <span class="form-item__name type-client ml_10">У меня уже есть логин/пароль</span>
            </label>
          </div>
          <div class="form__content ${!form.withChoice ? 'no-product' : ''}"></div>
          <div class="client__nav">
            <input type="hidden" id-company >
            <a href="" class="client__info--button registration">Зарегистрироваться</a>
            <a href="" class="client__info--button pay hide">Авторизироваться</a>
          </div>
          <div class="client__nav private">
            <input name="agree" id="private" required type="checkbox" checked class="platform__checkbox">
            <label for="private" class="platform-checkbox__label private__label">
              <span class="platform__checkbox--fake private__checkbox"></span>
              <span private-contact class="form-item__name type-client ml_10 lh_16">
                Вы соглашаетесь с <a class="private__link" target="_blank" rel="noreferrer noopener" href="${oferta ? oferta.link : '#'}">Договором оферты</a> и <a target="_blank" class="private__link" rel="noreferrer noopener" href="${coinfedence ? coinfedence.link : '#'}">Политикой конфиденциальности</a> 
              </span> 
            </label>
          </div>
        ` : `
        ${form.streams.length > 1 ? `
        <div class="client__streams">
          <div class="form__item">
            <p class="form-item__name">Выберите дату старта *</p>
            <div class="platform-select__wrapper mt_5">
              <select form-date class="platform__select form__select">
                <option value="">Выберите дату старта</option>
                ${streamsOptions ? streamsOptions.join('') : ''}
              </select>
            </div>
        </div>
    ` : ''}
        <div class="client__nav ${form.streams.length === 1 ? 'no-selector' : ''}">
          <button type="submit" class="client__info--button pay">Перейти к оплате</button>
        </div>
      `}
      </form>
    </div>`;
  }
}

export default PaymentFormTemplates;
