class sorterApi {
  static async sorter(data, orderBy) {
    const { id, photographerId, title, image, video, likes, date, price } =
      data;
    if (orderBy === "title") {
      let sortedtitle = this.title.sort();
      return sortedtitle;
    } else if (orderBy === "popularity") {
      return new Promise((resolve) => {
        setTimeout(() => {
          const result = {
            key: orderBy,
            data: Array.from(data).sort(
              (a, b) => b.released_in - a.released_in
            ),
          };

          resolve(result);
        }, 1000);
      });
    } else {
      throw "unknow orderBy type";
    }
  }
}
