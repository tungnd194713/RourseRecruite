<template>
  <div class="text-center form-body">
    <main class="p-2 p-lg-0 form-login">
      <form @submit.prevent="login">
        <img class="mb-3 mb-lg-4" src="../../assets/images/icon_logo.svg" alt="" height="59">
        <div class="bg-white box-form-login">
          <h1 class="mb-3 mb-lg-4 fw-bold">ログイン</h1>

          <div class="btn-facebook m-4 m-lg-4">
            <a class="text-decoration-none" @click="loginWithFacebook">
                    <span>
                        <img class="" src="../../assets/images/icon_fb.svg" alt="Facebookでログイン"/> Facebookでログイン
                    </span>
            </a>

          </div>
          <div class="form-group">
            <label for="email">メールアドレス <span>*</span></label>
            <div class="input-group has-validation">
              <span class="input-group-text input-group-text-pre"><img src="../../assets/images/icon_user.svg" alt=""></span>
              <input
                id="email"
                v-model="data.email"
                type="email"
                class="form-control form-control-lg"
                required
                maxlength="50"
                oninvalid="this.setCustomValidity('Please fill out your email')"
                oninput="setCustomValidity('')"
              >
              <div class="invalid-feedback">
                Please choose a email.
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="password">パスワード <span>*</span></label>
            <div class="input-group has-validation">
              <span class="input-group-text input-group-text-pre"><img src="../../assets/images/icon_key.svg" alt=""></span>
              <input
                id="password"
                v-model="data.password"
                type="password"
                class="form-control form-control-lg"
                required
                oninvalid="this.setCustomValidity('Please fill your password')"
                oninput="setCustomValidity('')"
              >
              <span class="input-group-text input-group-text-next"><img src="../../assets/images/icon_eye.svg" alt=""></span>
              <div class="invalid-feedback">
                Please choose a password.
              </div>
            </div>
          </div>

          <p class="mb-3 mb-lg-4"><a class="text-decoration-none" @click="redirectToForgotPassword">パスワードをお忘れの方はこちら</a></p>
          <button type="submit" class="btn fw-bold">ログイン</button>

          <p class="mt-1 mt-lg-2 mb-0 mb-lg-1"><a class="text-decoration-none" href="#">まだ会員登録がお済みでない方</a></p>
        </div>
      </form>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../styles/pages/auth/login.scss';
</style>

<script>
  export default {
    head () {
      return { title: 'Login' }
    },

    data () {
      return {
        data: {
          email: '',
          password: ''
        },
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
            console.log(e.message)
          }
      },

      async loginWithFacebook() {
        try {
          await this.$auth.loginWith('facebook');
        } catch (e) {
          console.log(e.message)
        }
      },

      redirectToForgotPassword() {
        this.$router.push({ path: '/auth/forgot-password' });
      }
    }
  }
</script>
