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
<script>

  export default {
    layout: "auth",
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
            await this.$axios.$post('/companies/login', this.data).then(() => {
              this.$auth.loginWith('local', {
                data: {
                  email: this.data.email,
                  password: this.data.password
                }
              })
            })
          } catch (e) {
              console.log(e)
          }
      }
    }
  }
</script>
<style>
  form {
    width: 200px;
    margin: auto;
    text-align: center;
  }

  input {
    width: 100%;
    border: none;
    border-bottom: 1px black solid;
    background: none;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 300;
    margin-top: 20px;
    margin-bottom: 20px;
    outline: none;
  }

  button {
    width: 100%;
    height: 50px;
    border: none;
    background-color: #f0c808;
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    margin-top: 20px;
    border-radius: 10px;
  }
  .paper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16rem;
  }
</style>
