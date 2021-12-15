<template>
  <div>
    <Header/>
    <TabPayment />
    <Nuxt/>
    <Footer/>
  </div>
</template>

<script>
    import TabPayment from "../components/TabPayment";

    export default {
      name: "Payment",
      components: {TabPayment},
      middleware: 'authenticated',
    }
</script>
