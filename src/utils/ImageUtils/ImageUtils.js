class ImageUtils {
  adaptivePhotos(photos) {
    if (photos.length) {
      photos.forEach((item) => {
        this.setAdaptivePhoto(item);
      });
    } else {
      this.setAdaptivePhoto(photos);
    }
  }

  setAdaptivePhoto(item) {
    const resolution = item.naturalWidth / item.naturalHeight;

    if (resolution < 1) {
      item.style.width = '100%';
      item.style.height = 'auto';
    } else if (resolution === 1) {
      item.style.width = '100%';
      item.style.height = '100%';
    } else if (resolution > 1) {
      item.style.width = 'auto';
      item.style.height = '100%';
    }
  }
}

export default ImageUtils;
