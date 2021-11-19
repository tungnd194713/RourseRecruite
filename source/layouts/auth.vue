<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
  export default {
    middleware: 'authenticated',
  }
</script>
