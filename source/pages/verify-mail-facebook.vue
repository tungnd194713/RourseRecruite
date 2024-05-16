<template>
    <div class="text-center form-body">
        <main class="p-2 p-lg-0 form-login">
            <form @submit.prevent="sendVerifyMail">
                <a :href="home_url" target="_blank">
                    <img class="mb-3 mb-lg-4" src="../assets/images/icon_logo.svg" alt="" height="59">
                </a>
                <div class="bg-white box-form-login">
                    <h1 class="mb-3 mb-lg-4 fw-bold">Facebookの登録確認メール</h1>
                    <h5 class="mb-3 mb-lg-4 mt-3">入力したメールアドレスに確認メールが送信されます。</h5>

                    <div v-if="message" class="alert alert-success" role="alert">
                        {{message}}
                    </div>
                    <div v-if="error" class="alert alert-danger" role="alert">
                        {{error}}
                    </div>
                    <div class="form-group my-5">
                        <label for="name">担当者名 <span>*</span></label>
                        <div class="input-group has-validation">
                            <span class="input-group-text input-group-text-pre"><img
                                    src="../assets/images/icon_email.svg" alt=""></span>
                            <input id="name"
                                   v-model="$v.name.$model"
                                   class="form-control form-control-lg"
                                   aria-describedby="emailHelp"
                                   maxlength="50"
                                   disabled
                            >
                        </div>
                        <div v-if="$v.name.$error">
                            <div v-if="!$v.name.required" class="error">これは必須項目なので、必ず入力してください</div>
                        </div>
                    </div>
                    <div class="form-group my-5">
                        <label for="email">メールアドレス <span>*</span></label>
                        <div class="input-group has-validation">
                            <span class="input-group-text input-group-text-pre"><img
                                    src="../assets/images/icon_email.svg" alt=""></span>
                            <input id="email"
                                   v-model="$v.email.$model"
                                   class="form-control form-control-lg"
                                   aria-describedby="emailHelp"
                                   maxlength="50"
                                   @keydown.enter.prevent="sendVerifyMail"
                            >
                        </div>
                        <div v-if="$v.email.$error">
                            <div v-if="!$v.email.required" class="error">これは必須項目なので、必ず入力してください</div>
                            <div v-if="!$v.email.email" class="error">メールアドレスの形式で入力してください</div>
                        </div>
                    </div>
                    <!--<NuxtLink-->
                            <!--id="btn_cancel"-->
                            <!--class="btn fw-bold my-3 my-lg-4 rounded-pill"-->
                            <!--to="/login"-->
                    <!--&gt;-->
                        <!--キャンセル-->
                    <!--</NuxtLink>-->
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
        name: "ResendVerifyMail",
        mixins: [validationMixin],

        data() {
            return {
                name: this.$route.query.name ? this.$route.query.name : '',
                email: this.$route.query.email ? this.$route.query.email : '',
                facebook_id: this.$route.query.id ? this.$route.query.id : '',
                message: '',
                error: '',
                home_url: process.env.HOME_URL ?? 'localhost:3000/ja'
            }
        },

        validations: {
            name: {
                required
            },
            email: {
                required,
                email,
            }
        },

        head() {
            return {title: 'Facebookの登録確認メール | 求人'}
        },

        watch: {
            email (value) {
                if (!value) {
                    this.message = ''
                    this.error = ''
                }
            }
        },

        methods: {
            async sendVerifyMail() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    try {
                        await this.$repositories.accounts.sendVerificationMailFacebook({
                            name: this.name,
                            email: this.email,
                            facebook_id: this.facebook_id
                        })
                            .then((res) => {
                                const data = this.$handleResponse(res);
                                this.message = data.message;
                                this.error = data.errorMsg;
                                this.getMessage(this.error);
                                this.getMessage(this.message);
                            });
                    } catch (e) {
                        this.message = '';
                        this.error = e.response.data.message;
                    }
                }
            },

            getMessage(message) {
                if (message === 'The given data was invalid.') {
                    this.error = 'しばらくお待ちください'
                }
                if (message === 'Too Many Attempts.') {
                    this.error = 'しばらくお待ちください'
                }
            }
        }
    }
</script>

<style scoped>
    @import '../styles/pages/auth/verify-mail-facebook.scss';
</style>
