class PageData {
  getPage(param) {
    const url = window.location.href;
    const page = url.split('/');

    return !param ? this.getPageName(page) : page[page.length - (param + 1)];
  }

  getPageName(page) {
    const last = page.pop();

    const banned = ['#', '?'];

    /* eslint-disable-next-line */
    const exception = (isNaN(last) && banned.includes(last)) || (last.split('?').length > 1 || last.split('#').length > 1);

    /* eslint-disable-next-line */
    const needPageName = !last || !isNaN(last) || exception;

    return needPageName ? this.getPageName(page) : last;
  }

  addHttps(link) {
    if (link) {
      const httpArray = link.split('http://');

      let gen;

      if (httpArray.length > 1) {
        const index = httpArray.indexOf('http://');

        gen = httpArray.splice(index, 1).join();
      }

      return link.split('https://').length > 1 ? link : `https://${gen || link}`;
    }
  }
}

export default PageData;
