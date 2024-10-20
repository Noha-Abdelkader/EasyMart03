<template>
  <section>
    <div
      v-if="selectedOrder"
      class="w-[90%] md:w-[80%] lg:w-[50%] mx-auto mt-5"
    >
      <div class="mb-10">
        <div class="flex items-center justify-between">
          <h6 class="font-semibold text-2xl mb-5">Order Details</h6>
          <a-button
            danger
            class="flex items-center gap-2"
            size="large"
            @click="navigateTo('/')"
          >
            <i class="fi fi-rr-arrow-small-left inline-flex"></i>
            <span> Back to shop </span>
          </a-button>
        </div>
        <div>
          <h4 class="font-bold">
            <span class="font-semibold text-zinc-800">Order status : </span>

            <a-tag :color="setColor(selectedOrder.transaction)">
              {{ selectedOrder.transaction }}
            </a-tag>
          </h4>
          <h4 class="font-bold">
            <span class="font-semibold text-zinc-800">Order price : </span>
            <span class="text-orange-800">
              {{ formatPrice(selectedOrder.order_price) }}
            </span>
          </h4>
          <h4 class="font-bold">
            <span class="font-semibold text-zinc-800">Order date : </span>
            <span class="text-orange-800">
              {{ selectedOrder.date }}
            </span>
          </h4>
        </div>
      </div>
      <!-- wrapper -->
      <div
        v-for="(item, idx) in selectedOrder.order_details"
        :key="idx"
        class="grid gap-4 grid-cols-12 border-b-2 border-zinc-200 py-2 items-center"
      >
        <div class="col-span-1 bg-zinc-200 rounded-lg">
          <img :src="item.image" alt="item" />
        </div>
        <div class="col-span-10">
          <h4 class="text-lg font-semibold">{{ item.title }}</h4>
          <h5 class="text-base font-semibold text-yellow-700">
            {{ formatPrice(item.price) }} x {{ item.count }}
            {{ item.count > 1 ? "items" : "item" }}
          </h5>
        </div>
      </div>
    </div>
    <div v-else class="center-center font-bold h-[200px] text-2xl text-red-800">
      <div class="text-center">
        <h6 class="font-extrabold">No data found</h6>
        <h6 class="underline cursor-pointer" @click="router.push('/')">
          Back to shop
        </h6>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "board",
  middleware: "auth",
});

// import stores
import { useOrderStore } from "~/store/order";
const { selectedOrder } = storeToRefs(useOrderStore());
const { totalItems, formatPrice } = useUtils();

const router = useRouter();

const setColor = (status) => {
  if (status == "paid") return "green";
  else if (status == "unpaid") return "red";
  else if (status == "pending") return "yellow";
  else return "gray";
};

const route = useRoute();
const loading = ref(true);
const order = ref({});
// async function getProdDetails(){
//     const res = await fetch('https://dummyjson.com/products/1');
//     const reponse = await res.json();
//     if(res.ok){
// order.value =
//     }else{

//     }
// }
</script>