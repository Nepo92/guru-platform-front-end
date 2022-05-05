import Utils from '../../../../../../../utils/utils.js';

const utils = new Utils();

class SetLinks {
  init(props) {
    this.setLinks(props);
  }

  setLinks(props) {
    const { menu, pack, currentForm } = props;
    const { outsideLinks } = pack;

    const linksWrapper = menu.querySelector('.payment-form__links-wrapper');

    if (linksWrapper) {
      utils.removeChildren(linksWrapper);

      const chooseLink = this.chooseLink.bind(this, props);

      outsideLinks.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('link__item');
        div.setAttribute('data-id', item.id);
        div.innerText = item.name;

        linksWrapper.appendChild(div);

        div.addEventListener('click', chooseLink);
      });

      const searchInput = document.querySelector('[links-search]');

      const searchLinks = this.searchLinks.bind(this, props);

      const sInput = utils.setCloneElement(searchInput);
      sInput.addEventListener('input', searchLinks);

      if (currentForm?.outsideLink?.id) {
        const links = Array.from(menu.querySelectorAll('.link__item'));

        links.forEach((item) => {
          if (+item.getAttribute('data-id') === currentForm.outsideLink.id) {
            item.parentNode.insertBefore(item, links.filter((el, index) => index === 0)[0]);
            item.classList.add('active');
          }
        });
      }
    }
  }

  chooseLink(props, e) {
    const t = e.target;

    const links = document.querySelectorAll('.link__item');

    links.forEach((item) => {
      item.classList.remove('active');
    });

    t.classList.add('active');
  }

  searchLinks(props, e) {
    const t = e.target;
    const { menu } = props;
    const value = t.value.toLowerCase();

    const links = menu.querySelectorAll('.link__item');

    links.forEach((item) => {
      if (!(~item.innerText.toLowerCase().indexOf(value))) {
        item.classList.add('hide');
      } else {
        item.classList.remove('hide');
      }
    });
  }
}

export default SetLinks;
