export const useUtils = () => {
    // const nuxtApp = useNuxtApp()
    ;
  // formate for price as doller
  function formatPrice(number) {
    if (number) {
      let rounded = number.toFixed(2);
      let currency =
        "$" + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return currency;
    } else return "$0.0";
  }

  function totalItems(order) {
    return order.map((el) => el.count).reduce((sum, obj) => sum + obj, 0);
  }
  function totalOrder(order) {
    let list = order.map((el) => {
      return {
        price: el.price,
        count: el.count,
      };
    });
    let total = list.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    return total;
  }
  // split arr into multi arr
  // chunkSize => size of each one arr
  function splitArrayIntoChunks(arr, chunkSize) {
    let result = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
      let chunk = arr.slice(i, i + chunkSize);
      result.push(chunk);
    }

    return result;
  }
  return {
    formatPrice,
    totalItems,
    totalOrder,
    splitArrayIntoChunks,
  };
};
