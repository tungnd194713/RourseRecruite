<template>
  <main class="container mt-3 mt-lg-4 px-0 payment-tab">
    <ul class="nav nav-tabs">
      <li v-for="tab in tabs" :key="tab.key" class="nav-item nav-item-payment">
        <a
          class="nav-link nav-link-payment big-nav nav-one cursor-pointer"
          :class="$nuxt.$route.path === tab.path ? 'active' : ''"
          @click="$router.push(tab.path)"
        >{{tab.name}}</a
        >
      </li>
    </ul>
  </main>
</template>

<script>
  import tabs from "~/constants/tabsPayment";

  export default {
    name: "TabPayment",
    data () {
      return {
        tabs
      }
    },
  }
</script>

<style lang="scss">
  @import '../styles/layout/tab_payment.scss';
</style>
