import DealFields from '../dealFields.js';

class Comment extends DealFields {
  constructor() {
    super();
  }

  init(dealPack) {
    const { menu, isView } = dealPack;

    const textArea = menu.querySelector('[comment]');

    if (isView) {
      textArea.classList.add('disable');
    } else {
      textArea.classList.remove('disable');
    }

    const commentData = this.commentData.bind(this);
    commentData(dealPack);

    const changeTextAreaValue = this.change.bind(this, dealPack);
    textArea.addEventListener('input', changeTextAreaValue);
  }

  commentData(dealPack) {
    const { menu, deal } = dealPack;

    const textArea = menu.querySelector('[comment]');

    if (deal) {
      const { comment } = deal;
      textArea.value = comment || '';
    } else {
      textArea.value = '';
    }
  }
}

export default Comment;
