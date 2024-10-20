<template>
  <div
    v-if="productsLoading"
    class="w-100 h-screen bg-black bg-opacity-50 center-center"
  >
    <div class="loader"></div>
  </div>
  <section v-else class="py-5 px-10">
    <h1 class="mb-2 font-bold  text-4xl text-center">Welcome to EasyMarket </h1>
    <p class="text-2xl font-semibold text-center mb-10 text-yellow-900">Online shop store</p>
    <!-- wrapper -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mx-auto"
      style="width: 90%"
    >

      <!-- single card -->
      <div
        v-for="prod in productList"
        :key="prod.id"
        class="card col-span-1 min-w-[250px] max-w-[280px] relative"
        :class="!prod.stock && 'bg-opacity-50 bg-black'"
      >
        <!-- fallback="~/assets/images/placeholder.png" -->
        <NuxtImg
          :src="prod?.images[0]"
          :alt="prod.title"
          class="w-100 aspect-square"
        />
        <!-- card -->
        <div class="flex justify-between items-center mt-2">
          <span class="text-black text-lg">
            Price :
            <span class="font-semibold"> {{ formatPrice(prod.price) }}</span>
          </span>
          <!-- <a-badge-ribbon text="Hippies" color="cyan"></a-badge-ribbon> -->
          <span
            class="absolute top-0 right-0 bg-rose-600 text-white px-2 rounded-bl-md rounded-tr-md font-semibold text-lg"
            >{{ "%" + prod.discountPercentage }}
          </span>
          <span
            class="absolute top-[25px] left-0 bg-yellow-400 text-white px-2 rounded-br-md rounded-tr-md font-semibold text-lg flex items-center justify-between gap-1"
          >
            <i class="fi fi-rr-star inline-flex"></i>
            {{ prod.rating }}
          </span>

          <!-- hover:scale-150  ease-in-out duration-100 -->
          <div
            v-if="!prod.stock"
            class="font-semibold text-black text-2xl absolute inset-0 center-center"
          >
            <span> Out of stock </span>
          </div>
          <div>
            <i
              v-if="!cartList.filter((el) => el.id == prod.id).length"
              :class="
                prod.stock
                  ? 'cursor-pointer opacity-1'
                  : 'cursor-text opacity-40'
              "
              class="fi fi-rr-shopping-cart-add inline-flex text-lg"
              @click="addToCartFun(prod)"
            ></i>
            <div
              class="flex items-center gap-2"
              v-if="
                cartList.filter((el) => el.id == prod.id).length && prod.stock
              "
            >
              <i
                class="fi fi-rr-minus-small cursor-pointer inline-flex"
                @click="removeFromCart(prod)"
              ></i>

              <span>
                {{ cartList.filter((el) => el.id == prod.id)[0]?.count }}
              </span>
              <i
                class="fi fi-rr-plus-small cursor-pointer inline-flex"
                @click="addToCartFun(prod)"
              ></i>
            </div>
          </div>
        </div>
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
const { addToCart, removeFromCart, getAllProducts } = useCartStore();
const { cartList, calcTotalPrice, productList, productsLoading } = storeToRefs(
  useCartStore()
);

// import Cookies from "js-cookie";
const { formatPrice } = useUtils();

// get product list
getAllProducts();

// addToCartFun
// let y = Cookies.get("cartList");
function addToCartFun(prod) {
  // console.log(prod , 'prod')
  // cartStore.dispatch("setCartAction", {
  //   title: prod.title,
  //   stock: prod.stock,
  //   id: prod.id,
  //   image: prod.images[0],
  //   price: prod.price,
  // });

  addToCart({
    title: prod.title,
    stock: prod.stock,
    id: prod.id,
    image: prod.images[0],
    price: prod.price,
  });
}

// console.log(cartStore.getters.cartDetails, "rrr");
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
</style>