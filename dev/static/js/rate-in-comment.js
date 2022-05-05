function setRaitingInComment() {
  const item = $('.admin').last().find('.admin__inner');

  $(item).append($('<div/>').attr('class', 'homework.-rate').css({ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '15px' })
    .append($('<span/>').attr('class', 'homework.-rate__text').html('Оценка:').css({ marginRight: '10px', fontSize: '16px', }))
  )

  function setRate() {
    for (let i = 0; i < rate; i++) {
      $('.homework.-rate').append($('<span/>').attr('class', 'homework.-rate__score lesson-comment__icon'))
    }

    if ($('.homework.-rate__score').length !== 5) {
      for (let i = 0; i < 5 - rate; i++) {
        $('.homework.-rate').append($('<span/>').attr('class', 'homework.-rate__score-empty lesson-comment__icon'))
      }
    }
  }

  setRate();
}

setRaitingInComment();