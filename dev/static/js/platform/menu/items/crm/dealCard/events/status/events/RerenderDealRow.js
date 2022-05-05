class RerenderDealRow {
  init(props) {
    const { rowEventsObs, clientCardObs, rerenderContent } = props;

    if (rowEventsObs && clientCardObs && rerenderContent) {
      rerenderContent.init(props).then(() => {
        rowEventsObs.init(props);
        clientCardObs.init(props);
      });
    }
  }
}

export default RerenderDealRow;
