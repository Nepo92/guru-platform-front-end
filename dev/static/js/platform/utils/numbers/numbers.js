class Numbers {
  setWhiteSpace(value) {
    if (value === null || value === 0 || value.length <= 3) return value;

    const strArr = String(value).split('');
    const isFloat = strArr.includes('.');

    return !isFloat ? this.#setWhiteSpaceInNumber(strArr, '') : this.#setFloatNumber(strArr);
  }

  #setWhiteSpaceInNumber(array, result) {
    const digit = array.splice(-3);

    result = `${digit.join('')} ${result}`;

    return array.length ? this.#setWhiteSpaceInNumber(array, result) : result;
  }

  #setFloatNumber(array) {
    const indexFloat = array.indexOf('.');

    const afterFloat = array.splice(indexFloat, array.length - 1);

    const beforeFloat = array.length > 3 ? this.#setWhiteSpaceInNumber(array, '') : array.join('');

    return `${beforeFloat}${afterFloat.join('')}`;
  }
}

export default Numbers;
