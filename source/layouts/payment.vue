<template>
  <div>
    <Header/>
    <Nuxt/>
  </div>
</template>

<script>
    export default {
      name: "Payment",
      middleware: 'authenticated',
    }
</script>
