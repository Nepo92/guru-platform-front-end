import Utils from './utils.js';

const utils = new Utils();

class ValidationWrapper {
  setError(item, text = 'Заполните поле', settings = false) {
    const error = document.createElement('div');
    error.classList.add('validate-error');
    error.innerText = text;

    const parent = item.parentElement;
    parent.classList.add('validate-error__wrapper');
    parent.appendChild(error);

    const contractError = this.contractError.bind(this, error);
    const plannedDateError = this.plannedDateError.bind(this, error);
    const plannedDateBillError = this.plannedDateBillError.bind(this, error);
    const paymentError = this.paymentError.bind(this, error);
    const billPaymentAgreementsError = this.billPaymentAgreementsError.bind(this, error);
    const checkPasswordError = this.checkPasswordError.bind(this, error, item);
    const noSettingError = this.noSettingError.bind(this, error);

    const nosettingType = [false, null, undefined].find((el) => el === settings);

    const settingsAction = [
      {
        type: 'contract',
        action: contractError,
      },
      {
        type: 'planned-date',
        action: plannedDateError,
      },
      {
        type: 'planned-date-bill',
        action: plannedDateBillError,
      },
      {
        type: 'payment',
        action: paymentError,
      },
      {
        type: 'bill-payment-agreements',
        action: billPaymentAgreementsError,
      },
      {
        type: 'check-password',
        action: checkPasswordError,
      },
      {
        type: nosettingType,
        action: noSettingError,
      },
    ];

    const currentError = settingsAction.find((el) => el.type === settings);

    currentError?.action();

    setTimeout(() => {
      parent.classList.remove('validate-error__wrapper');
      const errorElem = document.querySelector('.validate-error');

      errorElem?.remove();
    }, 1500);
  }

  noSettingError(error) {
    error.style.transform = 'translateY(0)';
  }

  contractError(error) {
    error.style.transform = 'translateY(5px)';
  }

  plannedDateError(error) {
    error.style.transform = 'translateY(15px)';
  }

  plannedDateBillError(error) {
    error.style.transform = 'translateY(30px)';
  }

  paymentError(error) {
    error.style.transform = 'translateY(15px)';
  }

  billPaymentAgreementsError(error) {
    error.style.transition = 'all 0s linear';

    if (window.innerWidth <= 328) {
      error.style.transform = 'translateY(-19px)';
    } else {
      error.style.transform = 'translateY(0)';
    }
  }

  checkPasswordError(error, item) {
    const dialogWrapper = utils.getParent(item, 'dialog__wrapper');

    if (dialogWrapper) {
      error.style.position = 'fixed';
      error.style.height = '40px';
      error.style.left = '48px';
      error.style.transition = 'all 0s linear';
      error.style.top = `calc(0px + ${item.getBoundingClientRect().top - dialogWrapper.getBoundingClientRect().top}px + ${error.offsetHeight}px)`;
    }
  }

  validateDate(date, item) {
    const dateArray = date.trim().split('.');

    const checkDate = dateArray.length === 3 && dateArray[2];
    const validateDate = this.checkDate.bind(this);
    const isError = this.setError.bind(this);

    return checkDate ? validateDate(dateArray, item) : isError(item);
  }

  isError(item) {
    if (item) {
      this.setError(item, 'Формат даты: ДД.ММ.ГГГГ');
    }

    return false;
  }

  checkDate(dateArray, item) {
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
  }

  checkEmail(email) {
    return email && email.value.trim().split('@').length === 2 && email.value.trim().split('.').length >= 2;
  }

  validTel(tel) {
    const plus = tel.value.trim()[0] === '+' || tel.value.trim()[0] === '8';

    /* eslint-disable-next-line */
    const value = tel.value.trim().split('').filter((el) => el !== ' ').filter((el) => el !== '-').filter((el) => el !== '(').filter((el) => el !== ')').join('');
    /* eslint-disable-next-line */
    const allNumbers = value.split('').splice(1, tel.value.trim().length).every((el) => !isNaN(+el));

    return tel && plus && allNumbers;
  }

  validateUserName(name) {
    if (!name) return false;

    const smallCharsEng = [];

    for (let i = 'a'.codePointAt(0); i <= 'z'.codePointAt(0); i++) {
      smallCharsEng.push(i);
    }

    const capitalCharsEng = [];

    for (let i = 'A'.codePointAt(0); i <= 'Z'.codePointAt(0); i++) {
      capitalCharsEng.push(i);
    }

    const smallCharsRu = [];

    for (let i = 'А'.codePointAt(0); i <= 'Я'.codePointAt(0); i++) {
      smallCharsRu.push(i);
    }

    const capitalCharsRu = [];

    for (let i = 'а'.codePointAt(0); i <= 'я'.codePointAt(0); i++) {
      capitalCharsRu.push(i);
    }

    const nbsp = ' '.codePointAt(0);

    const nameArr = name.value.trim().split('');

    if (nameArr.length) {
      let validName;

      for (let i = 0; i < nameArr.length; i++) {
        const item = nameArr[i];

        const smallEng = smallCharsEng.includes(`${item}`.codePointAt(0));
        const smallRu = smallCharsRu.includes(`${item}`.codePointAt(0));
        const capitalEng = capitalCharsEng.includes(`${item}`.codePointAt(0));
        const capitalRu = capitalCharsRu.includes(`${item}`.codePointAt(0));
        const isNbsp = `${item}`.codePointAt(0) === nbsp;

        if (smallEng || smallRu || capitalEng || capitalRu || isNbsp) {
          validName = true;
        } else {
          validName = false;
          break;
        }
      }

      return validName;
    }
  }

  setErrorTelephone(tel) {
    let textError;

    if (window.innerWidth < 500) {
      textError = 'Формат телефона: +71234567889\nили 81234567889';

      this.setError(tel, textError, 'payment');
    } else {
      textError = 'Формат телефона: +71234567889 или 81234567889';

      this.setError(tel, textError);
    }
  }

  setErrorClientName(name) {
    let textError;

    if (window.innerWidth < 500) {
      textError = 'Имя и фамилия - только буквы.\nПример: Иванов Иван Иванович';

      this.setError(name, textError, 'payment');
    } else {
      textError = 'Имя и фамилия - только буквы. Пример: Иванов Иван Иванович';

      this.setError(name, textError);
    }
  }

  checkUniqName(namesValues, name) {
    const isNotUniqueName = Array.from(namesValues).includes(name.value.trim().toLowerCase());

    if (isNotUniqueName) {
      this.setError(name, 'Имя должно быть уникальным');

      return false;
    }
  }
}

export default ValidationWrapper;
