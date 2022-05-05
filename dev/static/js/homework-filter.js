$(document).ready(function() {
    const $searchClient = $('.platform__input--search');
    const $searchClientForm = $('.platform__search');
    const $searchClientBtn = $('[search-client-btn]');
    const $searchClientClear = $('.platform__search--start.active');

    $searchClientBtn.on('click', function (event) {
        event.preventDefault();
        $searchClientForm.trigger('submit');
    });

    $searchClientClear.on('click', function (event) {
        event.preventDefault();
        $searchClient.val('');
        this.classList.remove('active');
        $searchClientForm.trigger('submit');
    });
});