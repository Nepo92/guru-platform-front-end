import Utils from '../../../../../../utils/utils.js';
import WithChoiceProduct from './formTypes/withChoice/withChoiceProduct.js';
import WithoutChoiceProduct from './formTypes/withoutChoice/withoutChoiceProduct.js';

const withChoiceProduct = new WithChoiceProduct();
const withoutChoiceProduct = new WithoutChoiceProduct();

const utils = new Utils();

class ChooseFormType {
  init(props) {
    const { menu } = props;

    this.formTypeDefault(props);
    const choiceBtn = menu.querySelectorAll('[form-choice]');

    if (choiceBtn.length) {
      const doChoice = this.doChoice.bind(this, props);

      choiceBtn.forEach((item) => {
        const choice = utils.setCloneElement(item);
        choice.addEventListener('change', doChoice);
      });
    }
  }

  formTypeDefault(choosenPack) {
    const { menu } = choosenPack;

    const formTypes = menu.querySelectorAll('[form-choice]');

    if (formTypes.length) {
      const selected = Array.from(formTypes).filter((el) => el.checked)[0];

      if (selected) {
        const choice = selected.getAttribute('data-type');
        choosenPack.choice = choice;

        this.doChoice(choosenPack);
      }
    }
  }

  doChoice(props, e) {
    let choice;

    if (e) {
      const t = e.target;

      choice = t.getAttribute('data-type');
    } else {
      choice = null;
    }

    props.choice = choice ?? props.choice;

    switch (props.choice) {
      case 'with-choice': {
        const withChoice = withChoiceProduct.init.bind(withChoiceProduct);
        withChoice(props);
        break;
      }
      case 'without-choice': {
        const withoutChoice = withoutChoiceProduct.init.bind(withoutChoiceProduct);
        withoutChoice(props);
        break;
      }
      default: {
        break;
      }
    }
  }
}

export default ChooseFormType;
