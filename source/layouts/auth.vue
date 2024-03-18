<template>
    <div>
        <Header/>
        <Nuxt/>
        <!-- <Footer/> -->
    </div>
</template>

<script>
    export default {
        middleware: 'authenticated',
    }
</script>

<style lang="scss">
    @import '../styles/layout/main.scss';
</style>