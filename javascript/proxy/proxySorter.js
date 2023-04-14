class ProxyRatingSorter {
  constructor() {
    this.cache = [];
  }

  async sorter(media, orderBy) {
    const cachedResult = this.cache.find((elt) => elt.key === orderBy);
    if (cachedResult) {
      console.log("Get cache");
      return cachedResult;
    }

    const data = await sorterApi.sorter(media, orderBy);
    this.cache.push(data);
    return data;
  }
}
