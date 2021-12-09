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

          <div v-if="errors.unauthenticate" class="alert alert-danger" role="alert">
            {{errors.unauthenticate}}
          </div>

          <div class="form-group">
            <label for="email">メールアドレス <span>*</span></label>
            <div class="input-group has-validation">
              <span class="input-group-text input-group-text-pre"><img src="../../assets/images/icon_user.svg" alt=""></span>
              <input
                id="email"
                v-model.trim="$v.data.email.$model"
                class="form-control form-control-lg"
                :class="{'invalid': $v.data.email.$invalid && $v.data.email.$dirty}"
                maxlength="50"
              >
            </div>
            <div v-if="$v.data.email.$error">
              <div v-if="!$v.data.email.required" class="error">これは必須項目なので、必ず入力してください</div>
              <div v-if="!$v.data.email.email" class="error">メールアドレスの形式で入力してください</div>
            </div>
          </div>
          <div class="form-group">
            <label for="password">パスワード <span>*</span></label>
            <div class="input-group has-validation" :class="{ 'form-group--error': $v.data.password.$error }">
              <span class="input-group-text input-group-text-pre"><img src="../../assets/images/icon_key.svg" alt=""></span>
              <input
                id="password"
                v-model.trim="$v.data.password.$model"
                class="form__input form-control form-control-lg"
                type="password"
                :class="{'invalid': $v.data.password.$invalid && $v.data.password.$dirty}"
                maxlength="32"
              >
              <span class="input-group-text input-group-text-next"><img src="../../assets/images/icon_eye.svg" alt=""></span>
              <div class="invalid-feedback"></div>
            </div>
            <div v-if="$v.data.password.$error">
              <div v-if="!$v.data.password.required" class="error">これは必須項目なので、必ず入力してください</div>
              <div v-if="!$v.data.password.minLength" class="error">6文字以上32文字以下で入力してください</div>
            </div>
          </div>

          <p class="mb-3 mb-lg-4"><a class="text-decoration-none" @click="redirectToForgotPassword">パスワードをお忘れの方はこちら</a></p>
          <button type="submit" class="btn fw-bold">ログイン</button>

          <p class="mt-1 mt-lg-2 mb-0 mb-lg-1">
             <NuxtLink to="/companies/register" class="text-decoration-none">まだ会員登録がお済みでない方</NuxtLink>
            </p>
        </div>
      </form>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../styles/pages/auth/login.scss';
</style>

<script>
  import {validationMixin} from 'vuelidate'
  import {required, email, minLength} from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    head () {
      return { title: 'Login' }
    },

    data () {
      return {
        data: {
          email: '',
          password: ''
        },
        errors: [],
      }
    },

    validations: {
      data: {
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(6),
        }
      }
    },

    methods: {
      resetData() {
        this.$v.$reset();
        this.data.email = '';
        this.data.password = '';
      },

      async login() {
        this.$v.data.$touch();
        if (!this.$v.data.$invalid) {
          try {
            await this.$auth.loginWith('local', {
              data: {
                email: this.data.email,
                password: this.data.password
              }
            }).then((res) => {
              if (res.status === 200) {
                this.$router.push('/companies')
              }
              const data = this.$handleResponse(res);
              this.errors = data.errors;
              this.resetData();
            });
          } catch (e) {
            this.errors = e.response.data.errors;
          }
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
