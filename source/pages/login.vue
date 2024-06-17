<template>
  <div class="text-center form-body">
    <main class="p-2 p-lg-0 form-login">
      <form @submit.prevent="login">
        <a :href="data.home_url" target="_blank">
        <img
          class="mb-3 mb-lg-4"
          src="../assets/images/icon_logo.svg"
          alt=""
          height="59"
        />
        </a>
        <div class="bg-white box-form-login">
          <h1 class="mb-3 mb-lg-4 fw-bold">Đăng nhập</h1>

          <div v-if="error" class="alert alert-danger" role="alert">
            Không thể đăng nhập, hãy thử lại sau vài phút nữa.
          </div>

          <div
            v-if="errors.unauthenticate"
            class="alert alert-danger"
            role="alert"
          >
            {{ errors.unauthenticate }}
          </div>

          <div class="form-group">
            <label for="email">Email <span>*</span></label>
            <div class="input-group has-validation">
              <span class="input-group-text input-group-text-pre"
                ><img src="../assets/images/icon_user.svg" alt=""
              /></span>
              <input
                id="email"
                v-model.trim="$v.data.email.$model"
                class="form-control form-control-lg"
                :class="{
                  invalid: $v.data.email.$invalid && $v.data.email.$dirty,
                }"
                maxlength="50"
                @change="clearErrors"
              />
            </div>
            <div v-if="$v.data.email.$error">
              <div v-if="!$v.data.email.required" class="error">
                Vui lòng nhập trường này
              </div>
              <div v-if="!$v.data.email.email" class="error">
                Vui lòng nhập dưới dạng Email
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="password">Mật khẩu <span>*</span></label>
            <div
              class="input-group has-validation"
              :class="{ 'form-group--error': $v.data.password.$error }"
            >
              <span class="input-group-text input-group-text-pre"
                ><img src="../assets/images/icon_key.svg" alt=""
              /></span>
              <input
                id="password"
                v-model.trim="$v.data.password.$model"
                class="form__input form-control form-control-lg"
                :type="isHide ? 'password' : 'text'"
                :class="{
                  invalid: $v.data.password.$invalid && $v.data.password.$dirty,
                }"
                maxlength="32"
                @change="clearErrors"
              />
              <span
                class="input-group-text input-group-text-next d-flex justify-content-center"
                @click="showPassword"
                >
                <img
                  v-if="isHide"
                  class="show-hide-password-icon"
                  src="../assets/images/icon_eye.svg"
                  alt=""
                />
                <img
                  v-else
                  class="show-hide-password-icon"
                  src="../assets/images/icon_eyes_show.svg"
                  alt=""
                />
              </span>
              <div class="invalid-feedback"></div>
            </div>
            <div v-if="$v.data.password.$error">
              <div v-if="!$v.data.password.required" class="error">
                Vui lòng nhập trường này
              </div>
              <div v-if="!$v.data.password.minLength" class="error">
                Nhập từ 6 đến 32 ký tự
              </div>
            </div>
          </div>

          <p class="mb-3 mb-lg-4">
            <a
              class="text-decoration-none cursor-pointer link-forgot"
              @click="redirectToForgotPassword"
              >Quên mật khẩu</a
            >
          </p>
          <button type="submit" class="btn fw-bold login-btn">Đăng nhập</button>

          <!-- <div class="justify-content-center mt-1 mt-lg-2 mb-0 mb-lg-1 p-0 link">
            <ul class="d-flex list-link">
              <li>
                <NuxtLink to="/verify" class="text-decoration-none link-forgot"
                >ログインできませんか？</NuxtLink
                >
              </li>
              <div class="dot-link">•</div>
              <li>
                <NuxtLink to="/register" class="text-decoration-none link-forgot"
                >まだ会員登録がお済みでない方</NuxtLink
                >
              </li>
            </ul>

          </div> -->
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  data() {
    return {
      data: {
        email: '',
        password: '',
        home_url: process.env.HOME_URL ?? 'localhost:3000/ja'
      },
      isHide: true,
      errors: [],
      error: this.$route.query.error,
    }
  },

  head() {
    return { title: 'RouteRecruite | Đăng nhập' }
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
      },
    },
  },

  methods: {
    clearErrors() {
      this.errors = ''
    },
    showPassword() {
      this.isHide = !this.isHide
    },
    resetData() {
      this.$v.$reset()
      this.data.email = ''
      this.data.password = ''
    },

    async login() {
      this.$v.data.$touch()
      if (!this.$v.data.$invalid) {
        try {
          await this.$auth
            .loginWith('local', {
              data: {
                email: this.data.email,
                password: this.data.password,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                this.$router.push('/jobs')
              }
              const data = this.$handleResponse(res)
              this.errors = data.errors
              this.resetData()
            })
        } catch (e) {
          this.errors = e.response.data.errors
        }
      }
    },

    loginWithFacebook() {
      window.location.href = `${process.env.API_URL}/companies/login/facebook`
    },

    redirectToForgotPassword() {
      this.$router.push({ path: '/forgot-password' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/pages/auth/login.scss';
</style>
