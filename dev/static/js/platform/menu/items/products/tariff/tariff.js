import { tariffAPI } from '../../../../api/api.js';
import AfterGetTariffs from './events/afterGetTarrifs.js';

const afterGetTarrifs = new AfterGetTariffs();

class Tariff {
  getTariff(data) {
    const tariffs = tariffAPI.getTariffs({ id: data.id });

    tariffs.then((tariffsData) => {
      const after = afterGetTarrifs.init.bind(afterGetTarrifs);
      data.tariffs = tariffsData;
      data.tariffObs = new Tariff();

      after(data);
    });
  }
}

export default Tariff;
