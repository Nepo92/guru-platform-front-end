import LoaderUtils from "@/components/UI/MyLoader/LoaderUtils/LoaderUtils";
import ModalUtils from "@/components/Platform/MyModal/ModalUtils/ModalUtils";
import { monitorAPI } from "@/api/api";
import { iModal } from "@/components/Platform/MyModal/interfacesMyModal/interfacesMyModal";
import {
	saveChangeBackgroundProps,
	openMenuProps,
} from "../interfacesBackgroundSettings/interfacesBackgroundSettings";

const loaderUtils = new LoaderUtils();
const modalUtils = new ModalUtils();

class ChangeBackgroundColor {
	openMenu(props: openMenuProps) {
		const { e, company, loader, inputColor, backgroundSettings } = props;
		const t = e.target;

		const data = {
			id: company.id,
		};

		const getBackground = monitorAPI.getCompanyBg(data);

		const showLoader = setTimeout(() => {
			loaderUtils.showLoader(loader);
		}, 400);

		(t as Element).classList.add("disable");

		getBackground.then(
			(backgroundInfo) => {
				clearTimeout(showLoader);
				loaderUtils.hideLoader(loader);
				(t as Element).classList.remove("no-active");

				const { color } = backgroundInfo;

				inputColor.value = color;

				modalUtils.openMenu(backgroundSettings);
			},
			() => {
				clearTimeout(showLoader);
				loaderUtils.hideLoader(loader);
				(t as Element).classList.remove("no-active");
			}
		);
	}

	async saveChanges(props: saveChangeBackgroundProps, e: MouseEvent) {
		const { loader, company, inputColor, backgroundSettings } = props;
		const t = e.target;

		(t as Element).classList.add("no-active");

		const showLoader = setTimeout(() => {
			loaderUtils.showLoader(loader);
		}, 400);

		try {
			const data = {
				color: inputColor.value,
				idCompany: company.id,
			};

			await monitorAPI.changeBackground(data);

			clearTimeout(showLoader);
			loaderUtils.hideLoader(loader);

			(t as Element).classList.remove("no-active");

			const closeMenuProps = {
				modal: backgroundSettings.modal,
				wrapper: backgroundSettings.wrapper,
				isOverflowed: !backgroundSettings.isOverflowed,
			};

			this.closeMenu(closeMenuProps);

			return data.color;
		} catch {
			clearTimeout(showLoader);
			loaderUtils.hideLoader(loader);
			(t as Element).classList.remove("no-active");

			return false;
		}
	}

	closeMenu(props: iModal) {
		modalUtils.closeMenu(props);
	}
}

export default ChangeBackgroundColor;
