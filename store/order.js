export const useOrderStore = defineStore("orderStore", () => {
  const maxAge = 25920000000000000;
  //   const orderList = null;
  // for (let i=0 ; i <= 10 ; i ++){
  //     [`orderList_${i}`] = useCookie(`orderList_[${i}]`, {
  //         maxAge: maxAge,
  //         default: () => [],
  //     });
  // }

  const orderList = useCookie("orderList", {
    maxAge: maxAge,
    default: () => [],
  });
  const orderID = useCookie("orderID", {
    maxAge: maxAge,
    default: () => 0,
  });
  const succes_failure = useCookie("succes_failure", {
    maxAge: maxAge,
    default: () => true,
  });

  const selectedOrder = useCookie("selectedOrder", {
    maxAge: maxAge,
    default: () => {},
  });
  return {
    orderList,
    orderID,
    succes_failure,
    selectedOrder,
  };
});
