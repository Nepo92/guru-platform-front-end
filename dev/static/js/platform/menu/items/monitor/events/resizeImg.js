import Utils from '../../../../utils/utils.js';

const utils = new Utils();

class ResizeImg {
  init(props) {
    this.checkSizeImg(props);
  }

  checkSizeImg() {
    const monitor = ['monitor', 'monitor-control', 'manager-monitor', 'examiner-control'];

    const page = utils.getPage();

    if (monitor.includes(page)) {
      const preview = document.querySelectorAll('.avatar img');
      const photos = document.querySelectorAll('.c-tooltip__avatar img');
      const logoutAvatar = document.querySelector('.platform-logout__image img');

      if (preview.length) {
        utils.adaptivePhotos(preview);
      }

      if (photos.length) {
        utils.adaptivePhotos(photos);
      }

      if (logoutAvatar) {
        utils.adaptivePhotos(logoutAvatar);
      }
    } else {
      return false;
    }
  }
}

export default ResizeImg;
