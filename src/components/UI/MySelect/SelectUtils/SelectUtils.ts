import { iFilterColumnItem } from "@/components/Platform/MyFilter/interfacesMyFilter/interfacesMyFilter";
import { iSelectSideEffectProps } from "@/components/MyMonitor/MonitorFilter/interfacesMonitorFilter/interfacesMonitorFilter";
import {
  iChangeDealTypeProps,
  FunnelsTypes,
  iFunnel,
  iMySelect,
} from "@/components/UI/MySelect/interfacesMySelect/interfacesMySelect";
import { iMyInput } from "../../MyInput/interfacesMyInput/interfacesMyInput";
import {
  Entries,
  iPlatformFilter,
} from "@/components/Platform/interfacesPlatform/interfacesPlatform";
import { ref, watch, Ref } from "vue";

class SelectUtils {
  updateValueSideEffect(props: iSelectSideEffectProps) {
    const { columns, selectName, value } = props;

    (columns as Array<iFilterColumnItem>).forEach((item) => {
      item.items = [
        ...item.items.map((el) => {
          if (el.name === selectName) {
            el.selected = value;
          }

          return el;
        }),
      ];
    });
  }

  changeDealType(props: iChangeDealTypeProps) {
    const { funnels, value } = props;
    let { columns } = props;

    funnels.then((funnelsMap) => {
      const currentFunnels = this.#getCurrentFunnels(props, funnelsMap);

      columns.forEach((el) => {
        el.items.forEach((item) => {
          if (item.name === "Воронка") {
            item.options = () => {
              return [
                {
                  name: "Все воронки",
                  value: 0,
                },
                ...(currentFunnels || []).map((elem) => {
                  return {
                    name: elem.funnelName,
                    value: elem.idFunnel,
                  };
                }),
              ];
            };

            item.selected = 0;
          }
        });
      });
    });
  }

  #getCurrentFunnels(props: iChangeDealTypeProps, funnelsMap: FunnelsTypes) {
    const { value } = props;

    const funnels = <Entries<FunnelsTypes>>Object.entries(funnelsMap);

    const currentFunnels = <[string, iFunnel[]]>(
      funnels.find((el) => el[0] === value)
    );

    if (currentFunnels) {
      const [, data] = currentFunnels;

      return data;
    }
  }

  initSelectAfetComponentLoad(
    columns: Array<iFilterColumnItem>,
    filter: iPlatformFilter
  ) {
    let funnelSelect = ref({} as Ref<iMySelect | iMyInput>);

    columns.forEach((item) => {
      item.items.forEach((el) => {
        if (el.name === "Воронка") {
          funnelSelect.value = el;
        }
      });
    });

    let setPlaceholderToFunnelSelect = true;

    if (funnelSelect.value) {
      watch(funnelSelect.value, (funnel) => {
        if (setPlaceholderToFunnelSelect) {
          const selectProps = {
            columns: <object>columns,
            selectName: "Воронка",
            value: <null | boolean | string | number>filter.idFunnel,
          };

          this.updateValueSideEffect(selectProps);

          setPlaceholderToFunnelSelect = false;
        }
      });
    }
  }
}

export default SelectUtils;
