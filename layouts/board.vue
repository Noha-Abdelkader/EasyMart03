<template>
  <section class="overflow-hidden">
    <!-- global icons -->
    <Head>
      <link
        href="https://cdn-uicons.flaticon.com/2.1.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css"
      />
    </Head>
    <!-- wrapper -->

    <section>
      <nav class="flex justify-between items-center px-20 bg-zinc-800 py-4">
        <!-- logo -->
        <p
          class="text-white mb-0 font-bold text-2xl cursor-pointer"
          @click="router.push('/')"
        >
          EasyMarket
        </p>

        <!-- left -->
        <div class="flex items-end gap-5">
          <!--  -->
          <!-- cart -->
          <div class="relative center-center">
            <i
              class="fi fi-rr-cart-shopping-fast text-zinc-200 text-2xl cursor-pointer inline-flex"
              @click="openCart = true"
            ></i>
            <!-- {{ cartStore.getters.cartDetails }} -->
            <!-- v-if="cartStore.getters.cartDetails.length" -->
            <a-badge
              v-if="cartList.length"
              :count="totalCountCart"
              class="absolute top-[-12px] right-[-12px]"
              :number-style="{
                backgroundColor: '#fff',
                color: '#999',
                boxShadow: '0 0 0 1px #d9d9d9 inset',
              }"
            />
          </div>
          <!-- user date  -->
          <div>
            <a-button
              v-if="!marketUserIsLoggedIn"
              class="loginBtn"
              @click="loginModal = true"
              >Login</a-button
            >
            <div v-else class="text-slate-200 cursor-pointer">
              <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link" @click.prevent>
                  <a-avatar
                    :size="32"
                    style="color: #f56a00; background-color: #fde3cf"
                    >{{
                      marketUser?.username?.slice(0, 1)?.toUpperCase()
                    }}</a-avatar
                  >
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="0">
                      <div>
                        <span class="font-semibold">
                          {{ marketUser.firstName }} {{ marketUser.lastName }}
                        </span>
                        <span class="text-gray-400 text-xs block"
                          >( {{ marketUser.email }} )</span
                        >
                      </div>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <h5
                        class="font-semibold mb-0 w-full"
                        @click="router.push('/order/list')"
                      >
                        Order list
                      </h5>
                    </a-menu-item>

                    <a-menu-divider />
                    <a-menu-item
                      key="3"
                      class="!text-rose-700 cursor-pointer"
                      @click="handleLogOut"
                    >
                      <i class="fi fi-rr-sign-out-alt inline-flex"></i>
                      <span> Logout </span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </div>
        <!-- login popup -->
        <!-- @ok="loginFunc" -->
        <a-modal
          class="loginModal"
          :open="loginModal"
          :confirmLoading="loginLoading"
          :mask="true"
          :maskClosable="true"
          :closable="false"
        >
          <!-- @ok="submitBtn.click()" -->
          <template #footer> </template>
          <div class="form">
            <div class="w-full m-auto h-full center-center">
              <a-space direction="vertical" class="w-[80%]">
                <Form @submit="loginFunc" v-slot="{ errors }">
                  <Field
                    :class="[errors.name ? 'mb-0' : 'mb-5']"
                    name="name"
                    rules="required"
                    v-model="user.username"
                    placeholder="Please enter your name"
                  />
                  <ErrorMessage name="name">
                    <p class="error">User name is required</p>
                  </ErrorMessage>
                  <Field
                    :class="[errors.password ? 'mb-0' : 'mb-5']"
                    name="password"
                    rules="required"
                    v-model="user.password"
                    placeholder="Please enter your password"
                  />
                  <ErrorMessage name="password">
                    <p class="error">Password is required</p>
                  </ErrorMessage>

                  <div class="flex items-center">
                    <button key="back" @click="loginModal = false">
                      Cancel
                    </button>
                    <button type="submit" :disabled="loginLoading">
                      <transition name="v-btn-label" mode="out-in">
                        <div v-if="loginLoading">
                          <span
                            class="spinner !h-[1.1em] !w-[1.1em] !border-[0.2em]"
                          ></span>
                        </div>
                        <div v-else>Submit</div>
                      </transition>
                    </button>
                  </div>
                </Form>
              </a-space>
            </div>
          </div>
        </a-modal>
      </nav>
      <!-- <div
        v-if="loginLoading"
        class="w-100 h-screen bg-black bg-opacity-50 center-center"
      >
        <div class="loader"></div>
      </div> -->

      <slot />

      <!-- cart sidebar -->
      <a-drawer
        title="Cart list"
        :open="openCart"
        @close="openCart = false"
        placement="right"
      >
        <!-- <template #extra>
          <a-button style="margin-right: 8px" @click="openCart = false"
            >Cancel</a-button
          >
        </template> -->
        <div v-if="cartList.length" class="max-h-[600px] overflow-auto">
          <!-- list -->
          <div
            v-for="(prod, idx) in cartList"
            :key="prod.id"
            class="grid grid-cols-3 gap-4 pb-2 mb-4"
            :class="cartList.length - 1 == idx ? 'border-b-2' : ''"
          >
            <div class="col-span-1 shadow-md">
              <NuxtImg
                :src="prod.image"
                lazy="true"
                class="w-100 aspect-square"
              />
            </div>
            <div class="col-span-2">
              <h5 class="">
                {{ prod.title }}
              </h5>
              <p class="font-semibold text-red-700">
                <span class="font-medium"> price: </span>
                {{ formatPrice(prod.price) }}
              </p>

              <h6 class="mt-4 flex items-center gap-2">
                <i
                  class="fi fi-rr-square-plus cursor-pointer"
                  @click="addToCart(prod)"
                ></i>
                <span class="mb-1">{{ prod.count }}</span>
                <i
                  class="fi fi-rr-square-minus cursor-pointer"
                  @click="removeFromCart(prod)"
                ></i>
              </h6>
            </div>
          </div>
          <!-- total in cart -->
          <div class="pt-2 fixed bottom-[20px] right-[40px] bg-white px-4 mt-4">
            <div
              class="flex items-center justify-between min-w-[300px] max-w-[380px]"
            >
              <div
                class="flex items-end justify-between mb-0 font-semibold text-base"
              >
                <p class="mb-0">Total price :</p>
                <span class="text-red-700">{{
                  formatPrice(totalPriceCart)
                }}</span>
              </div>
              <a-button
                class="bg-rose-600 text-white border-rose-600 hover:!bg-white hover:!text-rose-600 hover:!border-rose-600 py-1.5 px-3 text-base h-auto"
                @click="
                  () => {
                    openCart = false;
                    router.push('/order/create');
                  }
                "
                >continue</a-button
              >
            </div>
          </div>
        </div>
        <div v-else class="text-red-500 font-bold">
          <p class="text-lg center-center gap-2">
            <i class="fi fi-rr-basket-shopping-simple inline-flex"></i>
            <span> Cart is empty </span>
          </p>
          <h6
            class="text-center underline cursor-pointer"
            @click="
              () => {
                router.push('/');
                openCart = false;
              }
            "
          >
            Add to cart
          </h6>
        </div>
      </a-drawer>
    </section>
  </section>
</template>

<script setup>
// import

useHead({
  title: "EasyMarket",
  meta: [
    {
      name: "description",
      content: "Online shop, for easy life",
    },
  ],
});

// ant
import "ant-design-vue/dist/reset.css";
import { notification } from "ant-design-vue";

// form validate
import { Form, Field, defineRule, ErrorMessage, configure } from "vee-validate";
defineRule("required", (value) => {
  if (!value || !value.length) {
    return `{field} is required`;
  }
  return true;
});

// store
// import { store } from "~/store/auth";
// import { cartStore } from "~/store/cart"

import { useUserStore } from "~/store/auth";
const { marketUser, marketUserIsLoggedIn } = storeToRefs(useUserStore());
import { useCartStore } from "~/store/cart";
const { addToCart, removeFromCart } = useCartStore();
const { cartList, totalPriceCart, totalCountCart } = storeToRefs(
  useCartStore()
);

import Cookies from "js-cookie";

const { formatPrice } = useUtils();

// cookies
const screenLoading = ref(true);
const router = useRouter();

// let x = Cookies.get("user");
// let userInfo = ref(null);

// setTimeout(() => {
//   userInfo.value = JSON.parse(x);
//   // console.log(userInfo.value , 'ddd')
// }, 500);

// login
const loginModal = ref(false);
const loginLoading = ref(false);
const user = ref({
  username: "",
  password: "",
});
async function loginFunc() {
  loginLoading.value = true;
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.value.username,
      password: user.value.password,
      expiresInMins: 30, // optional, defaults to 60
    }),
  });

  const response = await res.json();
  loginLoading.value = false;
  if (res.ok) {
    // notification.success({
    //   message: "Success",
    //   description: `${response.message}`,
    // });
    // store.dispatch("setAuthAction", response);
    marketUser.value = { ...response };
    marketUserIsLoggedIn.value = true;
    window.location = "/";

    // set login popup
    loginModal.value = false;
    user.value.username = "";
    user.value.password = "";
  } else {
    notification.error({
      message: "Error",
      description: `${response.message}`,
    });
  }
}

// logout
async function handleLogOut() {
  screenLoading.value = true;
  marketUser.value = {};
  marketUserIsLoggedIn.value = false;
  // store.dispatch("removeAuthAction");
  window.location = "/";
  screenLoading.value = false;
}

// cart
const openCart = ref(false);
</script>

<style lang="scss">
.form {
  border-radius: 19% 81% 59% 41% / 61% 27% 73% 39%;
  width: 100%;
  height: 350px;
  background-color: rgba(244, 244, 245, 0.923);
  border: 1px solid rgb(170, 164, 164);
  // box-shadow: 1px 2px 3px rgb(222 225 214)

  input {
    width: 100%;
    padding: 10px;
    background-color: rgb(229, 226, 223);
    border-radius: 10px;
    border: 1px solid rgb(185, 179, 179);
  }
}

// login modal
.loginModal {
  .ant-modal {
    &-content {
      background-color: transparent !important;
      box-shadow: none !important;
    }
    &-footer {
      position: absolute;
      right: 50%;
      bottom: 25%;
      transform: translateX(50%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  button {
    padding: 5px 15px;
    border-radius: 7px;
    width: 40%;
    margin: auto;
    transition-duration: 0.5s;
    &:first-child {
      border: 1px solid rgb(158, 61, 61);
      color: rgb(158, 61, 61);
      &:hover {
        color: white;
        background-color: rgb(158, 61, 61);
      }
    }
    &:last-child {
      border: 1px solid transparent;
      background-color: rgb(158, 61, 61);
      color: white;
      &:hover {
        color: rgb(189, 60, 60);
        border-color: rgb(189, 60, 60);
        background-color: white;
      }
    }
  }
}

.loginBtn {
  @apply border-none text-rose-800 text-base h-auto px-5 font-semibold hover:!text-zinc-800;
}
.ant-dropdown-menu-title-content {
  @apply flex items-center gap-1;
}
</style>
