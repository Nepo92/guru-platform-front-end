import Utils from '../../../utils/utils.js';

const utils = new Utils();

class ApplyFilter {
	init() {
		const applyFilter = document.querySelector('.filter__apply');

		const form = document.querySelector('.filter__form');

		if (applyFilter) {
			const setFIlter = this.setFilter.bind(this, form);
			applyFilter.addEventListener('click', setFIlter);
		}

		const toggle = document.querySelector('.platform__showed-toggle .platform__toggle');

		if (toggle) {
			const hideItem = this.hideItem.bind(this);
			toggle.addEventListener('click', hideItem);
		}
	}

	setFilter(form) {
		form.submit();
	}

	hideItem(e) {
		const t = e.target;
		const form = utils.getParent(t, 'platform__showed-toggle');

		utils.showLoader();

		form.submit();
	}
}

export default ApplyFilter;
