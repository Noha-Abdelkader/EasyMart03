<template>
  <section
    class="p-2 md:px-10 md:py-5 w-[90%] md:w-[80%] lg:w-[50%] mx-auto grid gap-4"
  >
    <!-- <pre> {{  orderList.at(-1) }}</pre> -->
    <!-- {{orderList}} -->
    <div class="text-end">
      <a-tag
        :bordered="true"
        color="warning"
        class="py-1 h-auto cursor-pointer"
        @click="router.push('/')"
        >Containue shopping</a-tag
      >
    </div>
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-bold">Order List</h3>
      <div class="flex items-center gap-5">
        <div>
          <span
            v-if="applySort"
            class="text-sm text-rose-500 cursor-pointer underline"
            @click="removeSort"
            >Remove sort</span
          >
          <span
            v-if="filter.status.length || filter.date.length"
            class="text-sm text-rose-500 cursor-pointer underline"
            @click="clearFilter"
            >Clear filter
          </span>
        </div>
        <div v-if="orderList.length" class="grid gap-4 grid-cols-2">
          <!-- sort -->
          <a-tooltip placement="topLeft" title="Sort by order status">
            <i
              class="fi fi-rr-apps-sort inline-flex cursor-pointer text-red-800 text-lg"
              @click="
                () => {
                  sort = !sort;
                  applySort = true;
                }
              "
            ></i>
          </a-tooltip>
          <!-- filter -->
          <a-tooltip placement="topLeft" title="Filter">
            <i
              class="fi fi-rr-settings-sliders inline-flex text-yellow-900 text-lg cursor-pointer"
              @click="openFilter = true"
            ></i>
          </a-tooltip>
          <!-- v-tippy="{ content: 'Sort by order status' }" -->
        </div>
      </div>
    </div>

    <!-- order list  -->
    <!-- empty -->
    <div v-if="!orderList.length" class="text-center empty-wrap p-5 sm:p-10">
      <div>
        <div class="center-center mb-5">
          <img :src="box"  class="aspect-square"/>
        </div>
        <h4 class="text-lg font-semibold">Order List is empty</h4>
        <span
          class="font-semibold text-lg underline cursor-pointer"
          @click="
            () => {
              router.push('/');
            }
          "
          >Back to list</span
        >
      </div>
    </div>
    <!-- data -->
    <div v-else class="grid gap-4">
      <div v-for="order in orderList" :key="order.id">
        <a-badge-ribbon
          :text="order.transaction"
          :color="setColor(order.transaction)"
        >
          <a-card size="small" class="shadow-md">
            <div v-for="item in order.order_details" :key="item.id">
              <div class="grid grid-cols-10 gap-5 pb-2">
                <div
                  class="w-[40px] h-[40px] rounded-md bg-zinc-300 center-center col-span-1"
                >
                  <img :src="item.image" alt="product" class="w-100 aspect-square" />
                </div>
                <div class="col-span-9 flex items-center justify-between">
                  <h6 class="font-medium mb-0">
                    {{ item.title }}
                  </h6>
                  <h6 class="text-yellow-700">
                    {{ formatPrice(item.price) }} x {{ item.count }}
                    {{ item.count > 1 ? "items" : "item" }}
                  </h6>
                </div>
              </div>
            </div>
            <div
              class="flex items-center justify-between gap-5 border-t-2 pt-2"
            >
              <h6 class="">
                <span class="font-semibold"> Order price : </span>
                <span class="text-rose-700">
                  {{ formatPrice(order.order_price) }}
                </span>
              </h6>
              <h6>
                <span class="font-semibold"> Order Count : </span>
                <a-tag color="red">{{ totalItems(order.order_details) }}</a-tag>
              </h6>
            </div>

            <template #title>
          <a-tooltip placement="topLeft" title="Order details">

              <span
                class="cursor-pointer"
                @click="
                  () => {
                    router.push('/order/details');
                    selectedOrder = order;
                  }
                "
              >
                Order #{{ order.id }}
              </span>
              </a-tooltip>
            </template>
          </a-card>
        </a-badge-ribbon>
      </div>
      <!-- pagination -->
      <div class="text-center my-5 w-full">
        <a-pagination
          :current="pagination.current"
          :pageSize="pagination.pageSize"
          show-size-changer
          :total="pagination.total"
          @showSizeChange="onShowSizeChange"
          :pageSizeOptions="[1, 3, 5, 7, 9, 11]"
          @change="changePagination"
          :show-total="
            (total, range) => `${range[0]}-${range[1]} of ${total} items`
          "
        >
        </a-pagination>
      </div>
    </div>

    <!-- filter modal -->
    <a-drawer
      title="Filter"
      :size="300"
      :open="openFilter"
      @close="openFilter = false"
    >
      <!-- status -->
      <div class="mb-7">
        <label class="block font-semibold mb-2">Order status</label>
        <a-select
          placeholder="Please select order status"
          ref="select"
          v-model="filter.status"
          style="width: 100%"
          :options="[
            { value: 'paid', label: 'Paid' },
            { value: 'unpaid', label: 'Unpaid' },
            { value: 'pending', label: 'Pending' },
          ]"
          @select="
            (e) => {
              filter.status = e;
              // console.log(e)
            }
          "
        ></a-select>
      </div>
      <!-- date -->

      <div>
        <label class="block font-semibold mb-2">Order date</label>
        <a-range-picker
          placeholder="Please select date"
          format="MM/DD/YYYY"
          @change="
            (e, dateStr) => {
              filter.date = dateStr;
              // console.log(e , 'dd')
            }
          "
          v-model="filter.date"
          class="w-full"
        />
      </div>

      <!-- btn -->
      <div class="fixed right-[20px] bottom-[20px]">
        <a-button
          size="large"
          style="margin-right: 8px"
          @click="openFilter = false"
          >Cancel</a-button
        >
        <a-button
          :loading="filterLoading"
          size="large"
          class="bg-slate-800 text-white hover:bg-white hover:!text-slate-800 hover:!border-slate-800"
          @click="filterSubmit"
          >Apply filter</a-button
        >
      </div>
    </a-drawer>
  </section>
</template>
<script setup>
definePageMeta({
  layout: "board",
  middleware: "auth",
});

import box from "~/assets/images/empty_box.png";

const router = useRouter();

// import stores
import { useOrderStore } from "~/store/order";
const { orderList, succes_failure, orderID, selectedOrder } = storeToRefs(
  useOrderStore()
);
const { totalItems, formatPrice } =  useUtils();

const orderListDeepCopy = ref(JSON.parse(JSON.stringify(orderList.value)));
console.log(orderListDeepCopy.value);
// set Color badge
const setColor = (status) => {
  if (status == "paid") return "green";
  else if (status == "unpaid") return "red";
  else if (status == "pending") return "yellow";
  else return "gray";
};

// sort
const applySort = ref(false);
const sort = ref(true);

// const sortedList = computed(()=)
watch(sort, (newVal) => {
  if (newVal) {
    orderList.value.sort((a, b) => a.transaction.localeCompare(b.transaction));
  } else {
    orderList.value.sort((a, b) => b.transaction.localeCompare(a.transaction));
  }
  //   console.log(orderList.value);
});

function removeSort() {
  applySort.value = false;
  return orderList.value.sort((a, b) => a.id - b.id);
}

// filter
const openFilter = ref(false);
const filterLoading = ref(false);
const filter = ref({
  status: "",
  date: [],
});

function filterSubmit() {
  filterLoading.value = true;
  openFilter.value = false;
  if (filter.value.status) {
    filterLoading.value = false;
    return (orderList.value = orderList.value.filter(
      (el) => el.transaction == filter.value.status
    ));
  } else if (filter.value.date.length) {
    filterLoading.value = false;

    // const start = new Date(filter.value.date[0]).getTime();
    // const end = new Date(filter.value.date[1]).getTime();
    // console.log(start, "start");
    // // Filter orders within the date range
    // return orders.filter((item) => {
    //   let date = new Date(item.date).getTime();
    //   // console.log(date , 'date' , item.date)

    //   return date >= start && date <= end;
    // });

    const startDate = new Date(filter.value.date[0]);
const endDate = new Date(filter.value.date[1]);

const filteredOrders = orderList.value.filter(order => {
  const orderDate = new Date(order.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")); // Format: MM/DD/YYYY
  return orderDate >= startDate && orderDate <= endDate;
});
// console.log(filteredOrders , 'filter');
orderList.value = filteredOrders;
return filteredOrders;
  }
}
function clearFilter() {
  filter.value.date = [];
  filter.value.status = "";
  return (orderList.value = orderListDeepCopy.value);
}

// pagination

const pagination = ref({
  current: 1,
  pageSize: 5,
  total: orderList.value.length,
  last: "",
  totalPages: 1,
});

// lgoic
function paginateWithTotalPages(data, page, itemsPerPage) {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const paginatedItems = data.slice(start, start + itemsPerPage);

  return {
    currentPage: page,
    totalPages: totalPages,
    items: paginatedItems,
  };
}
async function onShowSizeChange(current, pageSize) {
  orderList.value = orderListDeepCopy.value;
  pagination.value.current = 1;
  pagination.value.pageSize = pageSize;
  //   console.log("per page");
  const res = paginateWithTotalPages(orderList.value, current, pageSize);
  //   console.log(x.value, "list");
  pagination.value.current = res.currentPage;
  pagination.value.totalPages = res.totalPages;
  orderList.value = res.items;
}

async function changePagination(current, pageSize) {
  orderList.value = orderListDeepCopy.value;
  //   console.log("cahnge");
  const res = paginateWithTotalPages(
    orderListDeepCopy.value,
    current,
    pageSize
  );

  pagination.value.current = res.currentPage;
  pagination.value.totalPages = res.totalPages;
  orderList.value = res.items;
}
</script>


<style lang="scss" scoped>
.empty-wrap {
  background-color: rgb(118, 131, 203);
  border-radius: 81% 59% 41% / 61% 27% 73% 39%;
  width: 100%;
}
</style>