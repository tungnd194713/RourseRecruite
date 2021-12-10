<template>
  <div class="text-center form-body">
    <main class="p-2 p-lg-0 form-login">
      <form @submit.prevent="forgotPassword">
        <img class="mb-3 mb-lg-4" src="../assets/images/icon_logo.svg" alt="" height="59">
        <div class="bg-white box-form-login">
          <h1 class="mb-3 mb-lg-4 fw-bold">パスワード変更</h1>
          <h5 class="mb-3 mb-lg-4 mt-3">入力されたメールアドレスに再設定メ-ルをお送りします</h5>

          <div v-if="message" class="alert alert-success" role="alert">
            {{message}}
          </div>
          <div v-if="error" class="alert alert-danger" role="alert">
            {{error}}
          </div>

          <div class="form-group my-5">
            <label for="email">メールアドレス</label>
            <div class="input-group has-validation">
              <span class="input-group-text input-group-text-pre"><img src="../assets/images/icon_email.svg" alt=""></span>
              <input id="email"
                     v-model="$v.email.$model"
                     class="form-control form-control-lg"
                     aria-describedby="emailHelp"
                     maxlength="50"
              >
            </div>
            <div v-if="$v.email.$error">
              <div v-if="!$v.email.required" class="error">これは必須項目なので、必ず入力してください</div>
              <div v-if="!$v.email.email" class="error">メールアドレスの形式で入力してください</div>
            </div>
          </div>
          <button type="submit" class="btn fw-bold">送信</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css';
  import {validationMixin} from 'vuelidate'
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    name: "ForgotPassword",
    mixins: [validationMixin],

    data() {
      return {
        email: '',
        message: '',
        error: ''
      }
    },

    validations: {
      email: {
        required,
        email,
      }
    },

    head() {
      return {title: 'パスワード忘れ'}
    },

    methods: {
      async forgotPassword() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          try {
            await this.$repositories.accounts.forgotPassword({
              email: this.email
            })
              .then((res) => {
                const data = this.$handleResponse(res);
                this.message = data.message;
                this.error = data.errorMsg;
              });
          } catch (e) {
            this.message = '';
            this.error = e.response.data.message;
          }
        }
      },
    }
  }
</script>

<style scoped>
  @import '../styles/pages/auth/forgot-password.scss';
</style>