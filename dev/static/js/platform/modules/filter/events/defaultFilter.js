class DefaultFilter {
	init(props) {
		const { pack } = props;
		const { filter } = pack;

		this.filterItems(filter);
	}

	filterItems(filter) {
		const form = document.querySelector('.filter__form');

		if (!form) return false;

		const items = form.querySelectorAll('.filter__item');

		const filterItems = [];

		items.forEach((item) => {
			const selects = item.querySelectorAll('select');
			const radios = item.querySelectorAll('input[type="radio"]');
			const inputs = item.querySelectorAll('input[type="text"]');
			const checkbox = item.querySelectorAll('input[type="checkbox"]');

			selects.forEach((elem) => {
				filterItems.push(elem);
			});

			radios.forEach((elem) => {
				filterItems.push(elem);
			});

			inputs.forEach((elem) => {
				filterItems.push(elem);
			});

			checkbox.forEach((elem) => {
				filterItems.push(elem);
			});
		});

		if (filter) {
			const filterData = Object.entries(filter);

			filterData.forEach((item) => {
				const field = item[0];
				const value = item[1];

				filterItems.forEach((elem) => {
					if (elem.getAttribute('name') === field) {
						this.setFilterItems(elem, value);
					}
				});
			});
		}
	}

	setFilterItems(item, value) {
		const type = item.tagName;

		/* Селект */
		if (type === 'SELECT') {
			Array.from(item.children).forEach((elem) => {
				elem.removeAttribute('selected');

				// eslint-disable-next-line
				if (elem.value == value) {
					item.value = elem.value;
				}

				if (elem.value === 'true' && value) {
					item.value = elem.value;
				}

				if (elem.value === 'false' && !value && value !== null) {
					item.value = elem.value;
				}

				if ((elem.value === '' && value === null) || (elem.value === '' && value === '0')) {
					item.value = elem.value;
				}
			});
		}

		/* Инпут */
		if (type === 'INPUT' && item.getAttribute('type') === 'text') {
			setTimeout(() => {
				item.value = value;
			}, 200);
		}

		/* Чекбокс */
		if (type === 'INPUT' && item.getAttribute('type') === 'checkbox' && Array.isArray(value)) {
			if (value[0] === 'firstPaymentSearch' && item.getAttribute('value') === 'firstPaymentSearch') {
				item.checked = true;
			} else {
				value.forEach((elem) => {
					// eslint-disable-next-line
					if (item.getAttribute('value') == elem) {
						item.setAttribute('checked', '');
					}
				});
			}
		}

		/* Радио */
		if (type === 'INPUT' && item.getAttribute('type') === 'radio') {
			item.removeAttribute('checked');

			if (value === item.getAttribute('value')) {
				item.setAttribute('checked', '');
			}
		}
	}
}

export default DefaultFilter;
