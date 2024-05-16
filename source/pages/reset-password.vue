<template>
  <div class="text-center form-body">
    <form class="p-2 p-lg-0 form-login" @submit.prevent="resetPassword">
      <a :href="home_url" target="_blank">
        <img class="mb-3 mb-lg-4" src="../assets/images/icon_logo.svg" alt="" height="59">
      </a>
      <div class="bg-white box-form-login">
        <h1 class="mb-3 mb-lg-4 fw-bold">パスワード変更</h1>
        <div class="form-group mt-5">
          <label for="password">パスワード <span>*</span></label>
          <div class="input-group has-validation">
            <span class="input-group-text input-group-text-pre"><img src="../assets/images/icon_key.svg" alt=""></span>
            <input id="password"
                   v-model="password"
                   :type="isHidePassword ? 'password' : 'text'"
                   class="form-control form-control-lg"
                   maxlength="32"
            >
            <span class="input-group-text input-group-text-next" @click="showPassword">
              <img
                v-if="isHidePassword"
                class="show-hide-password-icon"
                src="../assets/images/icon_eye.svg"
                alt=""
              >
              <img
                v-else
                class="show-hide-password-icon"
                src="../assets/images/icon_eyes_show.svg"
                alt=""
              >
            </span>
            <div class="invalid-feedback"></div>
          </div>
          <div v-if="$v.password.$error">
            <div v-if="!$v.password.required" class="error">これは必須項目なので、必ず入力してください</div>
            <div v-if="!$v.password.minLength" class="error">6文字以上32文字以下で入力してください</div>
          </div>
        </div>
        <div class="form-group mb-5">
          <label for="passwordConfirm">パスワード確認 <span>*</span></label>
          <div class="input-group has-validation">
            <span class="input-group-text input-group-text-pre"><img src="../assets/images/icon_key.svg" alt=""></span>
            <input id="passwordConfirm"
                   v-model.trim="$v.password_confirm.$model"
                   :type="isHideConfirmPassword ? 'password' : 'text'"
                   class="form-control form-control-lg"
                   maxlength="32"
            >
            <span class="input-group-text input-group-text-next" @click="showConfirmPassword">
              <img
                v-if="isHideConfirmPassword"
                class="show-hide-password-icon"
                src="../assets/images/icon_eye.svg"
                alt=""
              >
              <img
                v-else
                class="show-hide-password-icon"
                src="../assets/images/icon_eyes_show.svg"
                alt=""
              >
            </span>
            <div class="invalid-feedback"></div>
          </div>
          <div v-if="$v.password_confirm.$error">
            <div v-if="!$v.password_confirm.sameAsPassword" class="error">これは必須項目なので、必ず選択してください</div>
          </div>
        </div>
        <button id="btn_change" type="submit" class="btn fw-bold">送信</button>
      </div>
    </form>
  </div>
</template>

<script>
  import {validationMixin} from 'vuelidate'
  import {required, sameAs, minLength} from 'vuelidate/lib/validators'

  export default {
    name: "ResetPassword",
    mixins: [validationMixin],

    data() {
      return {
        email: this.$route.query.email ?? '',
        token: this.$route.query.token ?? '',
        password: '',
        password_confirm: '',

        isHidePassword: true,
        isHideConfirmPassword: true,
        home_url: process.env.HOME_URL ?? 'localhost:3000/ja'
      }
    },

    validations: {
      password: {
        required,
        minLength: minLength(6)
      },
      password_confirm: {
        sameAsPassword: sameAs('password')
      }
    },

    head() {
      return {title: 'パスワード変更 | 求人'}
    },

    methods: {
      async resetPassword() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          try {
            await this.$repositories.accounts.resetPassword({
              email: this.email,
              token: this.token,
              password: this.password
            })
              .then((res) => {
                  if (res.status === 200) {
                      this.$toast.success('パスワードの変更に成功しました')
                      this.$router.push({ path: '/login' });
                  }
              });
          } catch (e) {
//            console.log(e.message)
          }
        }
      },

      showPassword() {
        this.isHidePassword = !this.isHidePassword
      },

      showConfirmPassword() {
        this.isHideConfirmPassword = !this.isHideConfirmPassword
      },

    }
  }
</script>

<style scoped>
  @import '../styles/pages/auth/forgot-password.scss';
</style>
