<template>
  <div class="action-banner">
    <Carousel>
      <Slide
        v-for="(item, index) of ['1', '2']"
        :key="index"
      >
        <ul class="action-banner__slide">
          <li class="action-banner__left">
            <p class="action-banner__info action-banner__info--icon">
              Акции
            </p>
            <h3 class="action-banner__title">
              Командный бой
            </h3>
            <span class="action-banner__type">Командная акция</span>

            <div class="action-banner__progress action-progress">
              <div class="action-progress__bar" />
              <span class="action-progress__current">1%</span>
              <span class="action-progress__remain">Осталось 99 ₽</span>
            </div>
            <p class="action-banner__plan action-plan">
              План: <span class="action-plan__text">100 ₽</span>
            </p>
          </li>
          <li class="action-banner__center">
            <img
              src=""
              alt="action-img"
            >
          </li>
          <li class="action-banner__right">
            <span class="action-banner__tooltip tooltip">
              <span class="tooltip__wrapper">
                Информация о акции
              </span>
              ?
            </span>
            <div class="action-banner__reward">
              <div class="action-banner__name">
                Награда
              </div>
              <div class="action-banner__reward--value">
                5 000 ₽
              </div>
            </div>
            <ul class="actiob-banner__nav">
              <li class="action-nav__left" />
              <li class="action-nav__right" />
            </ul>
            <p class="action-banner__end">
              Завершится через <span>1 день</span>
            </p>
          </li>
        </ul>
      </Slide>
      <!-- <template #addons>
        <Pagination />
        <Navigation />
      </template> -->
    </Carousel>
  </div>


  <!-- <div class="action-banner">
      <div class="action-banner__wrapper carousel slide" id="actionSlider" data-ride="carousel">
        <div class="action-banner__controls action-banner__controls_dark">
          <a class="action-banner__control-prev" href="#actionSlider" role="button" data-slide="prev"></a>
          <a class="action-banner__control-next" href="#actionSlider" role="button" data-slide="next"></a>
        </div>
        <ol class="action-banner__indicators carousel-indicators">
          <th:block th:each="actionBanner, stat : ${actionBanners}">
            <li data-target="#actionSlider" th:attr="data-slide-to=${stat.index}"
              th:classappend="${stat.index == 0} ? active : ''"></li>
          </th:block>
        </ol>
        <div class="carousel-inner">
          <th:block th:each="actionBanner, stat : ${actionBanners}">
            <div class="carousel-item" th:style="${'background: ' + actionBanner.bgColor + ';'}"
              th:classappend="${stat.index == 0} ? active : ''">
              <div class="action-banner__item" th:classappend="${'action-banner__item_' + actionBanner.theme}">
                <div class="tile__tooltip c-tooltip inherit right">
                  <div class="tooltip-content">
                    <div class="c-tooltip__text inherit">Активная акция, в которой вы
                      принимаете
                      участие
                    </div>
                  </div>
                  <span class="inherit">?</span>
                </div>
                <div class="action-banner__info">
                  <div class="tile__title tile__title_mb35 tile__title_flash">Акции</div>
                  <div class="action-info__title" th:utext="${actionBanner.name}"></div>
                  <div class="action-info__type" th:utext="${actionBanner.actionTypeName}">
                  </div>
                  <th:block th:if="${actionBanner.actionType == 2}">
                    <div class="action-info__rating">
                      <div class="action-rating" th:each="member, stat : ${actionBanner.members}">
                        <div class="action-rating__place action-caption "
                          th:classappend="${member.place == 1 ? 'place_first' : (member.place == 2 ? 'place_second' : (member.place == 3 ? 'place_third' : '')) }"
                          th:utext="${(member.place != 0) ? (member.place + ' место') : ''}">
                        </div>
                        <div class="action-rating__member">
                          <div class="avatar">
                            <div class="avatar__wrapper avatar__wrapper_medium">
                              <span class="avatar-image"
                                th:classappend="${(member.manager.avatar == null || #strings.isEmpty(member.manager.avatar)) ? 'avatar-image_default' : ''}">
                                <img th:if="${member.manager.avatar}" th:src="'/' + ${member.manager.avatar}" alt="">
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="action-rating__value" th:utext="${member.fact}">
                        </div>
                      </div>
                    </div>
                  </th:block>

                  <th:block th:if="${actionBanner.actionType != 2}">
                    <div class="action-info__value" th:utext="${actionBanner.fact}"></div>
                    <div class="progress-bar progress-bar_large">
                      <div class="progress-bar__wrapper">
                        <div class="progress-bar__progress"
                          th:classappend="${actionBanner.percent > 99 ? 'progress_green' : (actionBanner.percent > 69 ? 'progress_yellow' : 'progress_red')}"
                          th:style="${'width: ' + actionBanner.percent + '%;'}">
                        </div>
                        <div class="progress-bar__title inherit"
                          th:classappend="${actionBanner.percent >= 12 ? 'progress-bar__title_white' : ''}"
                          th:utext="${actionBanner.percent + '%'}"></div>
                      </div>
                      <div class="progress-bar__description action-caption">
                        План
                        <span th:utext="${actionBanner.target}"></span>
                      </div>
                    </div>
                  </th:block>
                </div>
                <div class="action-banner__img">
                  <img th:src="@{${actionBanner.imgPath}}" alt="">
                </div>
                <div class="action-banner__info action-banner__info_center ">
                  <div class="action-info_prize-title action-caption">Награда</div>
                  <th:block>
                    <div class="action-info_prize c-tooltip">
                      <div class="tooltip-content">
                        <th:block th:if="${#lists.size(actionBanner.prizes) > 1}">
                          <table class="c-tooltip-table">
                            <th:block th:if="${actionBanner.actionType == 2}">
                              <thead class="c-tooltip-table__head">
                                <tr class="c-tooltip-table__head-row">
                                  <td class="c-tooltip-table__head-col"></td>
                                  <td class="c-tooltip-table__head-col c-tooltip__text inherit c-tooltip__text_title">
                                    Награда
                                  </td>
                                </tr>
                              </thead>
                              <tbody class="c-tooltip-table__body">
                                <tr class="c-tooltip-table__body-row" th:each="prize,stat : ${actionBanner.prizes}">
                                  <td class="c-tooltip-table__body-col c-tooltip__text inherit"
                                    th:utext="${stat.count + 'м.'}">
                                  </td>
                                  <td class="c-tooltip-table__body-col c-tooltip__text inherit"
                                    th:if="${actionBanner.bonusType == 1}"
                                    th:utext="${#numbers.formatInteger(prize.bonus,0,'WHITESPACE') + prize.bonusPostfix}">
                                  </td>
                                  <td class="c-tooltip-table__body-col c-tooltip__text inherit"
                                    th:unless="${actionBanner.bonusType == 1}"
                                    th:utext="${prize.bonus + prize.bonusPostfix}">
                                  </td>
                                </tr>
                              </tbody>
                            </th:block>
                            <th:block th:if="${actionBanner.actionType == 3}">
                              <thead class="c-tooltip-table__head">
                                <tr class="c-tooltip-table__head-row">
                                  <td class="c-tooltip-table__head-col"></td>
                                  <td class="c-tooltip-table__head-col c-tooltip__text inherit c-tooltip__text_title">
                                    Значение
                                  </td>
                                  <td class="c-tooltip-table__head-col c-tooltip__text inherit c-tooltip__text_title">
                                    Награда
                                  </td>
                                </tr>
                              </thead>
                              <tbody class="c-tooltip-table__body">
                                <tr class="c-tooltip-table__body-row" th:each="prize,stat : ${actionBanner.prizes}">
                                  <td class="c-tooltip-table__body-col c-tooltip__text inherit"
                                    th:utext="${stat.count + 'ур.'}"></td>
                                  <td class="c-tooltip-table__body-col c-tooltip__text inherit"
                                    th:utext="${#numbers.formatInteger(prize.value,0,'WHITESPACE') + prize.valuePostfix}">
                                  </td>
                                  <td class="c-tooltip-table__body-col c-tooltip__text inherit"
                                    th:if="${actionBanner.bonusType == 1}"
                                    th:utext="${#numbers.formatInteger(prize.bonus,0,'WHITESPACE') + prize.bonusPostfix}">
                                  </td>
                                  <td class="c-tooltip-table__body-col c-tooltip__text inherit"
                                    th:unless="${actionBanner.bonusType == 1}"
                                    th:utext="${prize.bonus + prize.bonusPostfix}">
                                  </td>
                                </tr>
                              </tbody>
                            </th:block>
                          </table>
                        </th:block>
                        <div class="c-tooltip__text c-tooltip__text_title inherit">
                          Дополнительные условия:
                        </div>
                        <th:block th:each="conditional : ${actionBanner.conditionals}">
                          <div class="c-tooltip__text c-tooltip__text_nowrap inherit"
                            th:utext="${conditional.title + conditional.value}">
                          </div>
                        </th:block>
                      </div>
                      <th:block th:if="${actionBanner.bonusType == 1}">
                        <th:block th:if="${#lists.size(actionBanner.prizes) > 1}">
                          <span
                            th:utext="${#numbers.formatInteger(actionBanner.prizes[0].bonus,0,'WHITESPACE') + actionBanner.prizes[0].bonusPostfix + ' - '  + #numbers.formatInteger(actionBanner.prizes[#lists.size(actionBanner.prizes) - 1].bonus,0,'WHITESPACE') + actionBanner.prizes[#lists.size(actionBanner.prizes) - 1].bonusPostfix}"></span>
                        </th:block>
                        <th:block th:unless="${#lists.size(actionBanner.prizes) > 1}">
                          <span
                            th:utext="${#numbers.formatInteger(actionBanner.prizes[0].bonus,0,'WHITESPACE') + actionBanner.prizes[0].bonusPostfix}"></span>
                        </th:block>
                      </th:block>
                      <th:block th:unless="${actionBanner.bonusType == 1}">
                        <th:block th:if="${#lists.size(actionBanner.prizes) > 1}">
                          <span
                            th:utext="${actionBanner.prizes[0].bonus + actionBanner.prizes[0].bonusPostfix + ' - '  + actionBanner.prizes[#lists.size(actionBanner.prizes) - 1].bonus + actionBanner.prizes[#lists.size(actionBanner.prizes) - 1].bonusPostfix}"></span>
                        </th:block>
                        <th:block th:unless="${#lists.size(actionBanner.prizes) > 1}">
                          <span th:utext="${actionBanner.prizes[0].bonus + actionBanner.prizes[0].bonusPostfix}"></span>
                        </th:block>
                      </th:block>
                      <div class="action-info_prize-title action-caption">
                        (условия акции)
                      </div>
                    </div>
                  </th:block>
                  <div class="action-banner__timer">
                    <div class="timer">
                      <th:block th:unless="${actionBanner.wasStarted}">
                        <div class="timer__description action-caption">Акция начнется
                        </div>
                        <div class="timer__wrapper">
                          <div class="timer__value">
                            <div class="timer-value" th:utext="${actionBanner.startDate}"></div>
                          </div>
                        </div>
                      </th:block>
                      <th:block th:if="${actionBanner.wasStarted}">
                        <div class="timer__description action-caption">Завершится через
                        </div>
                        <div class="timer__wrapper" th:id="${actionBanner.id}">
                          <div class="timer__value">
                            <div class="timer-value days">0</div>
                            <div class="timer-description">д</div>
                          </div>
                          <div class="timer__dots"></div>
                          <div class="timer__value">
                            <div class="timer-value hours">00</div>
                            <div class="timer-description">ч</div>
                          </div>
                          <div class="timer__dots"></div>
                          <div class="timer__value">
                            <div class="timer-value minutes">00</div>
                            <div class="timer-description">м</div>
                          </div>
                          <div class="timer__dots"></div>
                          <div class="timer__value">
                            <div class="timer-value seconds">00</div>
                            <div class="timer-description">с</div>
                          </div>
                        </div>
                      </th:block>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </th:block>
        </div>
      </div>
    </div> -->
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import './ActionBanner.scss';
import { Carousel, Slide } from 'vue3-carousel';
// import { Pagination, Navigation  } from 'vue3-carousel';

export default {
  name: 'ActionBanner',
  components: {
    Carousel,
    Slide,
    // Pagination,
    // Navigation,
  },
  data() {
    return {
      // eslint-disable-next-line
      actionBanners: actionBanners || null,
    }
  },
}
</script>
