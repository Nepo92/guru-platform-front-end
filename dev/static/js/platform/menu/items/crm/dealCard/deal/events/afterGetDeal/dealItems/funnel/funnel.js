import DealFields from '../dealFields.js';
import Utils from '../../../../../../../../../utils/utils.js';

const utils = new Utils();

class Funnel extends DealFields {
	constructor() {
		super();
	}

	init(dealPack) {
		const props = this.getProps(dealPack);

		const {
			menu,
			pack,
			deal,
			selectTypeValue,
			isView,
			isChanged,
		} = props;

		const { funnels } = pack;

		const select = (menu || document)?.querySelector('[data-select-type="select-funnel"]');

		if (select && isChanged) {
			const body = select.querySelector('[select-body]');

			utils.removeChildren(body, 0);

			const funnelsData = Object.entries(funnels);

			props.select = select.querySelector('[select]');
			props.funnels = funnelsData;

			if (deal) {
				const { type, idFunnel } = deal;
				props.type = selectTypeValue || type || deal.dealType;
				props.idFunnel = idFunnel || deal?.funnel?.idFunnel;
			} else {
				props.type = menu.querySelector('[select-types] [id-selected]')?.value;
			}

			this.initFunnels(props);
		}

		const change = this.change.bind(this, dealPack);

		const selectWrapper = select.querySelector('[id-selected]');

		selectWrapper.addEventListener('change', change);

		this.dispatchViewMode(select, isView);
	}

	initFunnels(dealPack) {
		const {
			idFunnel,
			isChanged,
			select,
			isAnalyticFilter,
		} = dealPack;

		this.setOptionToSelect(dealPack);

		const idSelected = select.querySelector('[id-selected]');
		const body = select.querySelector('[select-body]');
		const head = select.querySelector('[select-head] .select-head__placeholder');

		if (isChanged) {
			idSelected.value = isAnalyticFilter ? '0' : '';
			const options = Array.from(body.children);

			if (options.length) {
				head.innerText = options[0].innerText.trim();
			}
		} else {
			const option = Array.from(body.children).filter((el) => +el.value === idFunnel)[0];

			if (option) {
				idSelected.value = option ? idFunnel : '';

				head.innerText = option.innerText.trim();
				head.parentNode.setAttribute('title', option.innerText.trim());
			}
		}
	}

	dispatchViewMode(selectWrapper, isView) {
		if (isView) {
			selectWrapper?.classList.add('disable');
		} else {
			selectWrapper?.classList.remove('disable');
		}
	}

	setOptionToSelect(dealPack) {
		const {
			select,
			funnels,
			type,
			deal,
		} = dealPack;

		const body = select.querySelector('[select-body]');

		let selected;

		funnels.forEach((data) => {
			const dealType = data[0];
			const funnel = data[1];

			if (type === dealType) {
				funnel.forEach((elem) => {
					const option = document.createElement('div');
					option.classList.add('select__option');
					option.classList.add('no-icon');
					option.setAttribute('value', elem.idFunnel);
					option.innerText = elem.funnelName;

					if (elem.idFunnel === (deal.idFunnel || deal.funnel?.idFunnel)) {
						selected = elem;
					}

					body.appendChild(option);
				});
			}
		});

		if (selected) {
			const head = select.querySelector('[select-head] .select-head__placeholder');
			head.innerText = selected.funnelName;
			head.parentNode.setAttribute('title', selected.funnelName);

			const id = select.querySelector('[id-selected]');
			id.value = selected.idFunnel;
		}
	}

	getProps(props) {
		return utils.getDeepCopy(props);
	}
}

export default Funnel;
