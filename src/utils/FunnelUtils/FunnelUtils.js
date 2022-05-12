class FunnelUtils {
  getFunnels(dealType, funnels) {
    const funnelsData = Object.entries(funnels);

    const currentFunnels = funnelsData.find((el) => el[0] === dealType);

    return currentFunnels ? currentFunnels[1] : null;
  }
}

export default FunnelUtils;
