<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
  export default {
    middleware: 'authenticated',
  }
</script>

<style lang="scss" scoped>
  body {
    background-color: #003159 !important;
  }
</style>
