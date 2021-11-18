<template>
  <div class="container mt-3 paper">
    <h1 class="title text-center">
      Login
    </h1>
    <form @submit.prevent="login">
      <p>
        <input
          id="email"
          v-model="data.email"
          type="text"
          name="email"
          placeholder="Email"
          required
          autofocus
        >
      </p>
      <p>
        <input
          id="password"
          v-model="data.password"
          type="password"
          name="password"
          placeholder="Password"
          required
        >
      </p>
      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>

<style lang="scss">
  @import '../../styles/pages/auth/login.scss';
</style>

<script>

  export default {
    data () {
      return {
        data: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async login () {
          try {
            await this.$auth.loginWith('local', {
              data: {
                email: this.data.email,
                password: this.data.password
              }
            })
          } catch (e) {
            this.$toast.error(e.message)
          }
      }
    }
  }
</script>
