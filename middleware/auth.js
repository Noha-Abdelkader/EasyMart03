import { useUserStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { marketUserIsLoggedIn } = storeToRefs(useUserStore());
  if (!marketUserIsLoggedIn.value) {
    if (to.path != "/") {
      return navigateTo("/");
    }
    //   return abortNavigation()
  }
});
