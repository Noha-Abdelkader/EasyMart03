// import { createStore } from "vuex";
// import Cookies from "js-cookie";

// export const store = createStore({
//   state() {
//     return {
//       user: "",
//       isLoggedIn: false,
//     };
//   },
//   mutations: {
//     setAuth(state, payload) {
//       //   console.log(payload);
//       state.user = payload;
//       state.isLoggedIn = true;
//       Cookies.set("user", JSON.stringify({ ...payload, isLoggedIn: true }));
//     },
//     removeAuth(state) {
//       state.user = "";
//       state.isLoggedIn = false;
//       Cookies.remove("user");
//     },
//   },
//   actions: {
//     setAuthAction(context, payload) {
//       context.commit("setAuth", payload);
//     },
//     removeAuthAction(context) {
//       context.commit("removeAuth");
//     },
//   },
//   getters: {
//     authDetails: (state) => {
//       return { ...state.user, ...state.isLoggedIn };
//     },
//   },
// });

// // // import { createStore } from "vuex";

// // const maxAge = 2592000000;
// //  export const userInfo = useCookie("userInfo", {
// //   maxAge: maxAge,
// // });

// // // export const store = createStore({
// //     export const state =()=> {
// //     return {
// //       user: "",
// //       isAuth: false,
// //     };
// //   };

// // export const  mutations={
// //     setAuth(state, payload) {
// //     //   console.log(state, "mutation", payload);
// //       state.user = payload;
// //       userInfo.value = payload;
// //     },
// //   };
// //   export const actions= {
// //     setAuthAction(context, payload) {
// //     //   console.log(context, "snnnn", payload);
// //       context.commit("setAuth", payload);
// //     },
// //   };

// //  export const  getters= {
// //     getAuth: (state) => {
// //       return state.user;
// //     },
// //     isAuth: (state) => {
// //       return state.isAuth;
// //     },
// //   },

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

export const useUserStore = defineStore("userStore", () => {
  const maxAge = 2592000000;

  const marketUser = useCookie("marketUser", {
    maxAge: maxAge,
    default: () => {},
  });
  const marketUserIsLoggedIn = useCookie("marketUserIsLoggedIn", {
    maxAge: maxAge,
    default: () => false,
  });

  return {
    marketUser,
    marketUserIsLoggedIn,
  };
});
