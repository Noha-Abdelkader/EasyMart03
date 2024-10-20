<template>
  <section class="p-2 md:py-5 md:px-10">
    <!-- wrapper -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-24 mx-auto"
      style="width: 90%"
    >
      <!-- details -->
      <div>
        <h4 class="font-semibold text-2xl mb-6">Order Details</h4>
        <!-- single card -->
        <div v-if="cartList.length">
          <div
            v-for="prod in cartList"
            :key="prod.id"
            class="grid grid-cols-2 lg:grid-cols-6 gap-4 pb-2 mb-10"
            :class="!prod.stock && 'bg-opacity-50 bg-black'"
          >
            <!-- image -->
            <div class="col-span-2 xl:col-span-2 shadow-md center-center">
              <NuxtImg
                :src="prod.image"
                lazy="true"
                class="w-100 max-h-[100px]"
              />
            </div>
            <!-- details -->
            <div class="col-span-5 xl:col-span-4">
              <h5 class="font-semibold text-lg">
                {{ prod.title }}
              </h5>
              <h6 class="text-zinc-600">
                {{
                  productList.filter((el) => el.id == prod.id)[0]?.description
                }}
              </h6>
              <p class="font-semibold text-red-700">
                <span class="font-medium"> price: </span>
                {{ formatPrice(prod.price) }}
              </p>

              <div class="grid grid-cols-5">
                <!-- tags -->
                <div
                  v-if="
                    productList.filter((el) => el.id == prod.id)[0]?.tags
                      ?.length
                  "
                  class="space-x-2 tags col-span-3 xl:col-span-2"
                >
                  <span
                    v-for="tag in productList.filter(
                      (el) => el.id == prod.id
                    )[0]?.tags"
                    :key="tag"
                    class="capitalize"
                  >
                    <a-badge status="success" :count="tag" />
                  </span>
                </div>
                <!-- add/remove -->
                <div
                  class="flex items-center justify-center gap-2 col-span-1 xl:col-span-2"
                >
                  <i
                    class="fi fi-rr-square-plus cursor-pointer"
                    @click="addToCart(prod)"
                  ></i>
                  <span class="mb-1">{{ prod.count }}</span>
                  <i
                    class="fi fi-rr-square-minus cursor-pointer"
                    @click="removeFromCart(prod)"
                  ></i>
                </div>
                <!-- price  -->
                <p class="text-rose-700 font-semibold mb-0 col-span-1">
                  {{ formatPrice(prod.count * prod.price) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h5 class="text-rose-900 font-bold text-xl">
            Cart is Empty , please back to home page...
          </h5>
        </div>
      </div>
      <!-- poynt  -->
      <div>
        <!-- total in cart -->
        <div class="pt-2">
          <div class="mb-4 font-semibold text-xl">
            <span class="mb-0">Total : </span>
            <span class="text-red-700">{{ formatPrice(totalPriceCart) }}</span>
          </div>
        </div>

        <h5 v-if="cartList.length" class="text-red-700 font-semibold text-xl">
          Confirm your order
        </h5>
        <div v-if="cartList.length" id="card-element"></div>
        <div class="flex justify-end mt-5 gap-5">
          <button
            type="button"
            class="bg-green-600 text-white rounded-md px-4 py-2"
            @click="router.push('/')"
          >
            Add to cart
          </button>
          <button
            v-if="cartList.length"
            type="button"
            class="bg-yellow-600 text-white rounded-md px-4 py-2"
            @click="saveForLater"
          >
            Save for later
          </button>
          <button
            v-if="cartList.length"
            type="submit"
            id="submit"
            class="bg-rose-800 text-white rounded-md px-4 py-2"
            :disabled="poyntLoading"
          >
            <transition name="v-btn-label" mode="out-in">
              <div v-if="poyntLoading">
                <span
                  class="spinner !h-[1.1em] !w-[1.1em] !border-[0.2em]"
                ></span>
              </div>
              <div v-else>Submit</div>
            </transition>
          </button>
        </div>
        <div id="response"></div>
      </div>
    </div>
  </section>
</template>
  
  <script setup>
definePageMeta({
  layout: "board",
  middleware: "auth",
});

// import
// import { cartStore } from "~/store/cart";
import { useCartStore } from "~/store/cart";
const { addToCart, removeFromCart, poynt } = useCartStore();
const { cartList, totalPriceCart, productList } = storeToRefs(useCartStore());

import { useOrderStore } from "~/store/order";
const { orderList, succes_failure, orderID } = storeToRefs(useOrderStore());

import { notification } from "ant-design-vue";
import moment from "moment";
console.log(moment(new Date()).format("DD MMM , YYYY"), "date");
const { formatPrice, totalOrder } = useUtils();

const router = useRouter();

function addToCartFun(prod) {
  addToCart({
    title: prod.title,
    stock: prod.stock,
    id: prod.id,
    image: prod.images[0],
    price: prod.price,
  });
}

const poyntLoading = ref(false);

onMounted(() => {
  const poyntCollect = document.createElement("script");
  poyntCollect.src = "https://cdn.poynt.net/collect.js";
  poyntCollect.async = true;

  const options = {
    displayComponents: {
      firstName: true,
      lastName: true,
      emailAddress: true,
      labels: true,
    },
    iFrame: {
      width: "500px",
      height: "400px",
      border: "1px",
      borderRadius: "4px",
      boxShadow:
        "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
    },
    style: {
      theme: "default",
    },
    locale: "en-US",
    fields: {
      emailAddress: "test@test.test",
    },
    additionalFieldsToValidate: ["firstName", "lastName", "emailAddress"],
    customCss: {
      inputDefault: {
        color: "#111",
        "font-family": "Roboto, sans-serif",
        "font-size": "15px",
        "line-height": "20px",
      },
      rowFirstName: {
        width: "50%",
        "padding-left": "0px",
      },
      rowLastName: {
        width: "50%",
        "padding-right": "0px",
      },
    },
  };

  poyntCollect.onload = () => {
    const collect = new TokenizeJs(
      "aab99d15-d2da-41f9-a2b3-19c8a8eb1463", // Business ID
      "urn:aid:aab99d15-d2da-41f9-a2b3-19c8a8eb1463" //Application ID
    );

    collect.mount("card-element", document, options);

    collect.on("ready", (event) => {
      console.log("collect ready");
    });

    const button = document.getElementById("submit");

    button.addEventListener("click", (event) => {
      poyntLoading.value = true;
      collect.getNonce({});
    });

    // in case passed
    collect.on("nonce", (event) => {
      //   console.log("collect nonce", event);
      if (event) {
        notification.success({
          message: "SUCCESS",
          description: "Transaction is done",
        });
        orderList.value.push({
          id: orderID.value++,
          order_details: [...cartList.value],
          transaction: "paid",
          order_price: totalOrder([...cartList.value]),
          date: moment(new Date()).format("DD/MM/YYYY hh:mm A"),
        });
        cartList.value = [];
        window.location = "/order/list";
        // console.log(orderList.value, "pass suces");
      }
    });

    //    in case error
    collect.on("error", (event) => {
      poyntLoading.value = false;
      //     return {
      //     transactionState: "SUCCESS",
      //   };

      console.log(event, "err");
      if (
        event?.data?.message &&
        event?.data?.message === "Business not found in our records."
      ) {
        // return;
        // fake response
        if (succes_failure.value) {
          notification.success({
            message: "SUCCESS",
            description: "Transaction is done",
          });
          orderList.value.push({
            id: orderID.value++,
            order_details: [...cartList.value],
            transaction: "paid",
            order_price: totalOrder([...cartList.value]),
            date: moment(new Date()).format("DD/MM/YYYY hh:mm A"),
          });
          cartList.value = [];
          // console.log(orderList.value, "fake suces");
          window.location = "/order/list";
        } else {
          orderList.value.push({
            id: orderID.value++,
            order_details: [...cartList.value],
            transaction: "unpaid",
            order_price: totalOrder([...cartList.value]),
            date: moment(new Date()).format("DD/MM/YYYY hh:mm A"),
          });

          notification.error({
            message: "Error",
            description: "Transaction is failed, please try again... ",
          });
          console.log(orderList.value, "fake fail");
        }
      } else if (
        event?.data?.messages &&
        (event?.data?.messages[0] === "Enter a valid card number" ||
          event?.data?.messages[0] ===
            "Enter a valid expiry year that is not in the past")
      ) {
        notification.error({
          message: "Error",
          description: `${event.data.messages[0]}`,
        });
      }

      // toggle response
      succes_failure.value = !succes_failure.value;
    });
  };

  document.head?.appendChild(poyntCollect);
});

// saveForLater
function saveForLater() {
  orderList.value.push({
    id: orderID.value++,
    order_details: [...cartList.value],
    transaction: "pending",
    order_price: totalOrder([...cartList.value]),
    date: moment(new Date()).format("DD/MM/YYYY hh:mm A"),
  });
  cartList.value = [];
  // console.log(orderList.value, "save for later");
  window.location = "/order/list";
}

// my fatoora
const fatoora = {
  url: "https://apitest.myfatoorah.com/",
  token:
    "rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL",
};
</script>

<style lang="scss">
.card {
  border: 1px solid #e6e6e9;
  border-radius: 8px;
  padding: 10px 15px;

  &:hover {
    transition: all 0.5s ease-out;
    transform: scale(1.01);
    box-shadow: 1px 2px 6px 0px rgb(222 215 215);
  }
}

.tags {
  .ant-badge-count {
    padding: 2px 10px;
    height: auto;
    background-color: seagreen;
  }
}
#poynt-collect-v2-iframe {
  width: 100% !important;
  height: 520px !important;
  padding: 10px;
}
</style>