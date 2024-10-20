// import { createStore } from "vuex";
// import Cookies from "js-cookie";

// export const cartStore = createStore({
//   state() {
//     return {
//       cartList: Cookies.get("cartList") ?? [],
//     };
//   },
//   mutations: {
//     setCart(state, payload) {
//       console.log(payload, "payload");
//       console.log(state.cartList, "state");
//       if (payload) {
//         console.log(payload, "dd");
//         // console.log([...state.cartList ,payload] , 'mutation store');
//         // return
//         if (!state.cartList.length) {
//           console.log("ddw");
//           let product = {
//             ...payload,
//             count: 1,
//           };
//           state.cartList = [...product];
//           console.log(product  , 'product');
//           console.log(state.cartList, "state cart list");
//           return;
//           return;
//           state.cartList = state.cartList.push(product);
//         } else {
//             if (state.cartList.filter((el) => el.id == payload.id).length) {
//                 state.cartList.filter((el) => el.id == payload.id)[0].count++;
//                 console.log(state.cartList, "mi=utailo");
//                 Cookies.set("cartList", JSON.stringify(state.cartList));
//             }
//         }
//         Cookies.set("cartList", JSON.stringify(state.cartList));
//       }
//     },
//     clearCart(state) {
//       state.cartList = [];
//       Cookies.remove("cartList");
//     },
//   },
//   actions: {
//     setCartAction(context, payload) {
//       context.commit("setCart", payload);
//     },
//     removeCartAction(context) {
//       context.commit("clearCart");
//     },
//   },
//   getters: {
//     cartDetails: (state) => {
//       if (Cookies.get("cartList")) {
//         console.log(state.cartList, "state cart list");
//         // console.log(JSON.parse(state.cartList) , ' jsonstate cart list');
//         return JSON.parse(state.cartList);
//       } else {
//         return [];
//       }
//     },
//   },
// });

// store
import { useUserStore } from "./auth";

export const useCartStore = defineStore("cartStore", () => {
  const maxAge = 2592000000;
  const cartList = useCookie("cartList", {
    maxAge: maxAge,
    default: () => [],
  });

  const { marketUser , marketUserIsLoggedIn } = useUserStore();

  const productList = ref([]);
  const productsLoading = ref(false);
  async function getAllProducts() {
    let headers = new Headers();
    if(marketUserIsLoggedIn){
      headers.append('token' , marketUser.accessToken)
    }
    productsLoading.value = true;
    const res = await fetch("https://dummyjson.com/products", {
      headers,
    });
    const response = await res.json();
    productsLoading.value = false;
    if (res.ok) {
      productList.value = response.products.map((el) => {
        if (el.id == 1 || el.id == 5) {
          return {
            ...el,
            stock: 0,
          };
        } else return { ...el };
      });
    } else {
      notification.error({
        message: "Error",
        description: `${response.message}`,
      });
    }
  }

  // add to cart
  async function addToCart(prod) {
    // console.log("in");
    if (
      !cartList.value.length ||
      !cartList.value.filter((el) => el.id == prod.id).length
    ) {
      //   console.log("in add 1st");

      return cartList.value.push({ ...prod, count: 1 });
    } else {
      if (cartList.value.filter((el) => el.id == prod.id).length) {
        // console.log("in add nd");
        return cartList.value.map((el) => {
          if (el.id == prod.id) {
            return { ...el, count: el.count++ };
          } else return { ...el };
        });
      }
      // console.log(cartList.value , 'card list' );
    }
  }
  // remove from cart
  async function removeFromCart(prod) {
    if (cartList.value.length) {
      const selectedProd = cartList.value.filter((el) => el.id == prod.id);
      if (selectedProd.length) {
        if (selectedProd[0].count > 1) {
          return selectedProd[0].count--;
        } else if (selectedProd[0].count == 1) {
          const selectedProdIndex = cartList.value.findIndex(
            (el) => el.id == prod.id
          );
          return cartList.value.splice(selectedProdIndex, 1);
        }
      }
    } else return;
  }

  const totalPriceCart = computed(() => {
    let list = cartList.value.map((el) => {
      return {
        price: el.price,
        count: el.count,
      };
    });
    let total = list.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    return total;
  });

  const totalCountCart = computed(() => {
    let list = cartList.value.map((el) => el.count);
    let total = list.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return total;
    return;
  });

  let poynt = {
    entryDetails: {
      customerPresenceStatus: "ECOMMERCE",
      entryMode: "KEYED",
    },
    type: "CREDIT_DEBIT",
    references: [
      {
        id: "e1cb771c-1078-0010-88a1-43abc12ba121",
        customType: "CUSTOM",
        type: "CUSTOM",
      },
    ],
  };

  return {
    getAllProducts,
    productsLoading,
    productList,
    addToCart,
    cartList,
    totalPriceCart,
    totalCountCart,
    removeFromCart,
    poynt,
  };
});
