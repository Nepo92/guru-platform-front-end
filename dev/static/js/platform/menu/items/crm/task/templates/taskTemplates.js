import Utils from '../../../../../utils/utils.js';

const utils = new Utils();

class TaskTemplates {
    renderTask(task, isView) {
        const isDealCard = document.querySelector('[js-menu-deal]').classList.contains('open');

        // eslint-disable-next-line
        const taskStatus = task.done ? 'done' : task.reminderToday ? 'today' : task.reminderExpiration ? 'off' : 'on';

        return `
        <div class="task__left">
        <div class="task__status ${taskStatus}"></div>
        <div class="task__create-info">
            <p class="info__title">Создана</p>
            <div class="info__when">
                <span class="info__when--day">${utils.getDateFormatDDMMYYYY(task.reminderDate)}</span>
                <span class="info__when--time"></span>
            </div>
        </div>
        </div>
        <div class="task__action">
            <p class="action__title">Действие</p>
            <p class="action__name">${task.reminderMessage}</p>
        </div>
        ${isDealCard
            ? ''
            : `<div class="task__deal">
                <p class="deal__title">Сделка</p>
                <p class="deal__name">${task.course ? task.course : 'Продукт не выбран'}</p>
              </div>`
            }
            ${
                // eslint-disable-next-line
                isDealCard && !isView ?
                !task.done
                ? `
                    <div class="task__nav">
                        <div class="task__complete">Завершить</div>
                        <div class="task__remove"></div>
                    </div>
                `
                : `
            <div class="task__nav">
                <div class="task__remove"></div>
            </div>
            `
            : ''}
    `;
    }

    taskNav() {
        return `
        <div class="menu-tasks__wrapper">
            <div class="menu-tasks__add">
                <form class="menu-tasks__form">
                    <div class="menu-tasks__calendar">
                        <p class="menu-tasks__title">Новая задача</p>
                        <input autocomplete="off" js-task-date type="text" required name="taskDate"
                              placeholder="Выберите дату"
                              class="datepicker-here-start menu-tasks__datepicker menu-input__wrapper_cal">
                    </div>
                    <div class="menu-tasks__control">
                        <input autocomplete="off" type="text" js-task-message required name="taskMessage"
                              class="menu-tasks__text" placeholder="Введите текст">
                        <button type="button" task-new-btn class="menu-tasks__btn">Добавить задачу</button>
                    </div>
                </form>
            </div>
            </div>
        `;
    }
}

export default TaskTemplates;
