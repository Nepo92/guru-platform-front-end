$(document).on('click', '[js-tab]', function(event) {
    var $currentTab = $(this);
    var currentActiveId = $currentTab.data('tab');

    $currentTab.closest('.tabs__wrapper').find('[js-tab]').removeClass('active');
    $currentTab.closest('.tabs__wrapper').find('[lesson-tab]').removeClass('active');
    $currentTab.addClass('active');

    $currentTab.closest('.tabs__wrapper').find('[js-tab-panel]').removeClass('is-open');
    $currentTab.closest('.tabs__wrapper').find('[js-tab-panel]').filter('[data-tab=' + currentActiveId + ']').addClass('is-open');

    $currentTab.closest('.tabs__wrapper').find('[js-tab-panel]').find('[modules-list]').children().remove();
});

$(document).ready(function(context) {
    if ($('[js-tabby-tab]', context).length !== 0) {
        $('[js-tabby-tab]', context).tabby();
    }
});