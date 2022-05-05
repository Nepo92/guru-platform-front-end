
var TEMP_ITEM_FILES = [];
let files = [];

const typesFile = [
    'pdf', 'PDF',
    'doc', 'DOC',
    'docx', 'DOCX',
    'psd', 'PSD',
    'ppt', 'PPT',
    'pptx', 'PPTX',
    'xls', 'XLS',
    'xlsx', 'XLSX',
];

const typesImg = [
    'jpg', 'JPG',
    'jpeg', 'JPEG',
    'png', 'PNG',
];

$(document).on('change', '.upload-btn__item-file', function (element) {
    if (element.target.value) {
        var $filesGallery = $(this).closest('[upload-block]').find('[upload-list]').attr('class', 'gallery__list--comment'),
            $name = $(this).data('name');

        $.each(element.target.files, (index, item) => {

            files.push(item);
        });

        const setPreloader = setPreloaderFiles.bind(this);

        const name = $(element.target).data('name');

        $filesGallery.append(setPreloader(files, element.target.value, name));
        $(this).val('');
    }
});

function setPreloaderFiles(data, value, name = null) {

    $.each($('.gallery').last().find('[upload-list]').children(), (index, item) => {
        $(item).remove();
    });

    TEMP_ITEM_FILES.length = 0;

    const preload = data.map((elem) => {
        const tmpPath = URL.createObjectURL(elem);
        const id = tmpPath.split('\\').pop();

        const fl = value.split('\\').pop();
        const fileType = elem.name.split('.')[elem.name.split('.').length - 1];

        let fileName;

        if (elem.name.split('.').length < 3) {
            fileName = elem.name.split('.')[0];
        } else {
            fileName = elem.name.split('.').splice(0, elem.name.split('.').length - 2).join('.');
        }
  
        const tmpFile = {};
        tmpFile['name'] = name;
        tmpFile['file'] = elem;

        TEMP_ITEM_FILES.push(tmpFile);

        if ($.inArray(fileType, typesFile) !== -1) {
            return `
            <div id=${id} class="gallery__item gallery__item-comment">
                <div class="gallery-item gallery-item_small gallery-item_${fileType}">
                    <div class="gallery-item__title">${fileType}</div>
                    <div class="gallery-item__subtitle">${fileName}</div>
                </div>
                <span class="gallery__delete-btn"></span>
            </div>
            `
        }

        if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
            return `
                <div id=${id} class="gallery__item gallery__item-comment">
                    <a href=${tmpPath} data-fancybox=${fileName} class="gallery-item gallery-item_small">
                        <img class="gallery-item__preview" src=${tmpPath}>
                    </a>
                    <span class="gallery__delete-btn"></span>
                </div>
            `
        }
    });

    return preload;
}

$(document).on('click', '.gallery__delete-btn', function (element) {
    const current = $(this).parent();
    const items = $(this).parent().parent().parent().parent().parent().find('.gallery__item');
    const position = $(items).index($(current).get(0));
    const currentId = $(this).parent().attr('id');

    files = files.filter((item, index) => index !== position);
    TEMP_ITEM_FILES = TEMP_ITEM_FILES.filter((item, index) => index !== position);

    current.remove();
});

function setFilesToFormData(formData) {
    $.each(TEMP_ITEM_FILES, function (index, file) {
        formData.append(file['name'], file['file']);
    });

    TEMP_ITEM_FILES.length = 0;
    files.length = 0;
}
