<template>
  <div class="text-center form-body">
    <form class="p-2 p-lg-0 form-login" @submit.prevent="resetPassword">
      <img class="mb-3 mb-lg-4" src="../assets/images/icon_logo.svg" alt="" height="59">
      <div class="bg-white box-form-login">
        <h1 class="mb-3 mb-lg-4 fw-bold">パスワード変更</h1>
        <div class="form-group mt-5">
          <label for="password">パスワード</label>
          <div class="input-group has-validation">
            <span class="input-group-text input-group-text-pre"><img src="../assets/images/icon_key.svg" alt=""></span>
            <input id="password"
                   v-model="password"
                   type="password"
                   class="form-control form-control-lg"
                   maxlength="32"
            >
            <span class="input-group-text input-group-text-next"><img src="../assets/images/icon_eye.svg" alt=""></span>
            <div class="invalid-feedback"></div>
          </div>
          <div v-if="$v.password.$error">
            <div v-if="!$v.password.required" class="error">これは必須項目なので、必ず入力してください</div>
            <div v-if="!$v.password.minLength" class="error">6文字以上32文字以下で入力してください</div>
          </div>
        </div>
        <div class="form-group mb-5">
          <label for="passwordConfirm">パスワード確認</label>
          <div class="input-group has-validation">
            <span class="input-group-text input-group-text-pre"><img src="../assets/images/icon_key.svg" alt=""></span>
            <input id="passwordConfirm"
                   v-model.trim="$v.password_confirm.$model"
                   type="password"
                   class="form-control form-control-lg"
                   maxlength="32"
            >
            <span class="input-group-text input-group-text-next"><img src="../assets/images/icon_eye.svg" alt=""></span>
            <div class="invalid-feedback"></div>
          </div>
          <div v-if="$v.password_confirm.$error">
            <div v-if="!$v.password_confirm.sameAsPassword" class="error">入力したパスワードが一致しません</div>
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
      return {title: 'Reset password'}
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
                this.$router.push({ path: '/login' });
              });
          } catch (e) {
//            console.log(e.message)
          }
        }
      },
    }
  }
</script>

<style scoped>
  @import '../styles/pages/auth/forgot-password.scss';
</style>
