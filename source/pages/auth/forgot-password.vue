<template>
<!--  <div class="text-center form-body">-->
<!--    <main class="p-2 p-lg-0 form-forgot-password">-->
<!--      <form @submit.prevent="forgotPassword">-->
<!--        <images class="mb-3 mb-lg-4" src="../../assets/images/icon_logo.svg" alt="" height="59">-->
<!--        <div class="bg-white box-form-forgot-password">-->
<!--          <h1 class="mb-3 mb-lg-4 fw-bold">ログイン</h1>-->
<!--          <h5 class="mb-3 mb-lg-4 text-muted">Mail xác nhận đổi Password sẽ được gửi tới email được nhập bên dưới</h5>-->

<!--          <div v-if="message" class="alert alert-success" role="alert">-->
<!--            {{message}}-->
<!--          </div>-->

<!--          <div class="form-group">-->
<!--            <label for="email">メールアドレス</label>-->
<!--            <div class="input-group has-validation">-->
<!--              <span class="input-group-text input-group-text-pre">-->
<!--                <images src="../../assets/images/icon_user.svg" alt="">-->
<!--              </span>-->
<!--              <input id="email"-->
<!--                     v-model="email"-->
<!--                     type="email"-->
<!--                     class="form-control form-control-lg"-->
<!--                     aria-describedby="emailHelp"-->
<!--                     required-->
<!--                     oninvalid="this.setCustomValidity('Please fill out your email')"-->
<!--                     oninput="setCustomValidity('')"-->
<!--                     maxlength="50"-->
<!--              >-->
<!--            </div>-->
<!--            <div v-if="errors">-->
<!--              <p v-for="(error, key) in (errors.email)" :key="key" class="text-danger">{{error}}</p>-->
<!--            </div>-->
<!--          </div>-->
<!--          <button type="submit" class="btn btn-submit fw-bold">Send</button>-->
<!--        </div>-->
<!--      </form>-->
<!--    </main>-->
<!--  </div>-->
  <main class="p-2 p-lg-0 form-login">
    <form @submit.prevent="forgotPassword">
      <img class="mb-3 mb-lg-4" src="../../assets/images/icon_logo.svg" alt="" height="59">
      <div class="bg-white box-form-login">
        <h1 class="mb-3 mb-lg-4 fw-bold">パスワード変更</h1>
        <h5 class="mb-3 mb-lg-4 mt-3">入力されたメールアドレスに再設定メ-ルをお送りします</h5>

        <div v-if="message" class="alert alert-success" role="alert">
          {{message}}
        </div>

        <div class="form-group my-5">
          <label for="email">メールアドレス</label>
          <div class="input-group has-validation">
            <span class="input-group-text input-group-text-pre"><img src="../../assets/images/icon_email.svg" alt=""></span>
            <input id="email"
                   v-model="email"
                   type="email"
                   class="form-control form-control-lg"
                   aria-describedby="emailHelp"
                   required
                   oninvalid="this.setCustomValidity('Please fill out your email')"
                   oninput="setCustomValidity('')"
                   maxlength="50"
            >
          </div>
          <div v-if="errors">
            <p v-for="(error, key) in (errors.email)" :key="key" class="text-danger">{{error}}</p>
          </div>
        </div>
        <button type="submit" class="btn fw-bold">送信</button>
      </div>
    </form>
  </main>
</template>

<style>
  @import '../../styles/pages/auth/forgot-password.scss';
</style>

<script>
  import 'bootstrap/dist/css/bootstrap.css';

  export default {
    name: "ForgotPassword",

    data() {
      return {
        email: '',
        message: '',
        errors: []
      }
    },

    head() {
      return {title: 'Forgot password'}
    },

    methods: {
      async forgotPassword() {
        try {
          await this.$repositories.account.forgotPassword({
            email: this.email
          })
            .then((res) => {
              const data = this.$handleResponse(res);
              this.message = data.message;
              this.errors = data.errors;
          });
        } catch (e) {
          console.log(e.message)
        }
      },
    }
  }
</script>
