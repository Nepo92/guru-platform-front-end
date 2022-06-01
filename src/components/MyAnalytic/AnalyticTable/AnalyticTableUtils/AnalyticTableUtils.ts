import {
	iCurrentProps,
	iGetPeriodItemsProps,
} from "../interfacesAnalyticTable/interfacesAnalyticTable";
import DateUtils from "@/utils/DateUtils/DateUtils";

const dateUtils = new DateUtils();

class AnalyticTableUtils {
	periodLength: number;

	getCurrentRows(props: iCurrentProps) {
		const { rows, activeTab, searchRow, colors, visibleSettings } = props;

		const current = rows.find((el) => el.tabs === activeTab)?.items;

		if (current) {
			const currentVisible = current.filter((el) => el.visible && el.visible !== undefined);

			const currentData = currentVisible.length
				? currentVisible
				: current.filter((el) => el.visible === undefined);

			const search = searchRow.value
				? current.filter((el) =>
						el.name.toLowerCase().trim().includes(searchRow.value.toLowerCase().trim())
				  )
				: false;

			const currentRows = search || currentData;

			currentRows.map((item) => {
				if (item.name === "КПД") {
					item.colors = colors.kpdColor;
				}

				if (item.name === "Рейтинг") {
					item.colors = colors.ratingColor;
				}
			});

			return search || currentData;
		}
	}

	getPeriodItems(props: iGetPeriodItemsProps) {
		const { periodSeparate, currentRows } = props;

		this.periodLength = <number>(
			currentRows.value.find((el) => el.main?.sums.length)?.main.sums.length
		);

		props.periodLength = this.periodLength;

		if (periodSeparate === 0) {
			return this.#getMonthsNames(props);
		} else if (periodSeparate === 1) {
			return this.#getWeeksNames(props);
		} else if (periodSeparate === 2) {
			return this.#getDaysNames(props);
		}
	}

	#getMonthsNames(props: iGetPeriodItemsProps) {
		const { start, months, periodLength } = props;

		const startMonthIndex = +dateUtils.formatDDMMYYYY(start).split(".")[1] - 1;

		if (periodLength) {
			if (periodLength > 12) {
				const period = Math.ceil(periodLength / 12) - 1;

				for (let index = 0; index < period; index++) {
					months.forEach((item) => months.push(item));
				}
			}

			const monthsNames = months.filter((el, index) => {
				if (index >= startMonthIndex && index < startMonthIndex + periodLength) {
					return el;
				}
			});

			return monthsNames;
		}
	}

	#getWeeksNames(props: iGetPeriodItemsProps) {
		const { start, periodLength } = props;

		const numberDayOfWeek = new Date(start).getDay();

		const monday = numberDayOfWeek === 1;
		const sunday = numberDayOfWeek === 0;

		const between = monday
			? 0
			: sunday
			? 24 * 60 * 60 * 1000
			: (6 - numberDayOfWeek + 2) * 24 * 60 * 60 * 1000;

		const names = [];

		names.push(dateUtils.formatDDMMYYYY(start));
		names.push(dateUtils.formatDDMMYYYY(start + between));

		if (periodLength) {
			for (let index = 1; index < periodLength - 1; index++) {
				const week = 7 * index * 24 * 60 * 60 * 1000;
				names.push(dateUtils.formatDDMMYYYY(start + between + week));
			}

			return names;
		}
	}

	#getDaysNames(props: iGetPeriodItemsProps) {
		const { start, periodLength } = props;

		const names = [];
		names.push(dateUtils.formatDDMMYYYY(start));

		if (periodLength) {
			for (let index = 1; index < periodLength; index++) {
				names.push(dateUtils.formatDDMMYYYY(start + index * 24 * 60 * 60 * 1000));
			}

			return names;
		}
	}

	get getPeriodLength() {
		return this.periodLength;
	}
}

export default AnalyticTableUtils;
