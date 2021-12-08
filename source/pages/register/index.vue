<template>
    <form class="text-center" @submit.prevent="submit">
        <div class="p-2 p-lg-0 form-register">
            <!--<form>-->
            <div class="bg-white box-form-register">
                <h1 class="mb-3 mb-lg-4 fw-bold">会員登録フォーム</h1>
                <!--<form>-->
                <div class="form-group">
                    <label for="exampleInputEmail1"
                        >会社名 <span>*</span></label
                    >
                    <input
                        id="exampleInputEmail1"
                        v-model.trim="user.company_name"
                        class="form-control form-control-lg"
                        aria-describedby="emailHelp"
                    />
                    <div
                        v-if="errors.company_name"
                        class="invalid-feedback error"
                    >
                        {{ errors.company_name }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="exampleInput3">担当者名 <span>*</span></label>
                    <input
                        id="exampleInput3"
                        v-model.trim="user.manager_name"
                        type="text"
                        class="form-control form-control-lg"
                    />
                    <div
                        v-if="errors.manager_name"
                        class="invalid-feedback error"
                    >
                        {{ errors.manager_name }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="exampleInput5"
                        >メールアドレス <span>*</span></label
                    >
                    <input
                        id="exampleInput5"
                        v-model.trim="user.email"
                        type="text"
                        class="form-control form-control-lg"
                    />

                    <div
                        v-if="!$v.user.email.email && $v.user.email.$anyError"
                        class="invalid-feedback error"
                    >
                        Email type is required
                    </div>
                    <div v-if="errors.email" class="invalid-feedback error">
                        {{ errors.email }}
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInput6">電話番号 <span>*</span></label>
                    <input
                        id="exampleInput6"
                        v-model.trim="user.phone"
                        type="text"
                        class="form-control form-control-lg"
                    />
                    <div v-if="errors.phone" class="invalid-feedback error">
                        {{ errors.phone }}
                    </div>
                    <div
                        v-if="!$v.user.phone.numeric && $v.user.phone.$anyError"
                        class="invalid-feedback error"
                    >
                        phone is required number
                    </div>
                    <div
                        v-if="
                            !$v.user.phone.minLength && $v.user.phone.$anyError
                        "
                        class="invalid-feedback error"
                    >
                        Phone must have at least
                        {{ $v.user.phone.$params.minLength.min }} letters.
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInput7">パスワード <span>*</span></label>
                    <input
                        id="exampleInput7"
                        v-model.trim="user.password"
                        type="text"
                        class="form-control form-control-lg"
                    />
                    <div v-if="errors.password" class="invalid-feedback error">
                        {{ errors.password }}
                    </div>
                    <div
                        v-if="
                            !$v.user.password.minLength ||
                            !$v.user.password.maxLength
                        "
                        class="error invalid-feedback"
                    >
                        Password must between
                        {{ $v.user.password.$params.minLength.min }} and
                        {{ $v.user.password.$params.maxLength.max }}
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInput8"
                        >パスワード（確認) <span>*</span></label
                    >
                    <input
                        id="exampleInput8"
                        v-model.trim="user.confirmPassword"
                        type="text"
                        class="form-control form-control-lg"
                    />
                    <div
                        v-if="
                            !$v.user.confirmPassword.required &&
                            $v.user.confirmPassword.$anyError
                        "
                        class="invalid-feedback error"
                    >
                        This field is required
                    </div>
                    <div
                        v-else-if="!$v.user.confirmPassword.sameAsPassword"
                        class="invalid-feedback error"
                    >
                        Password is not correct
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInput9">業界・分野 <span>*</span></label>
                    <input
                        id="exampleInput9"
                        v-model.trim="user.career"
                        type="text"
                        class="form-control form-control-lg"
                    />
                    <div
                        v-if="
                            !$v.user.career.required && $v.user.career.$anyError
                        "
                        class="invalid-feedback error"
                    >
                        Please enter a career
                    </div>
                    <!-- <div
                        v-if="
                            !$v.career.numeric && $v.career.$anyError
                        "
                        class="invalid-feedback error"
                    >
                        Required number
                    </div> -->
                </div>
                <div class="form-group">
                    <label for="inputGroupSelect01"
                        >現住所 <span>*</span></label
                    >
                    <select
                        id="inputGroupSelect01"
                        v-model="user.login_type"
                        class="form-select form-select-lg"
                    >
                        <option selected></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <div
                        v-if="
                            !$v.user.login_type.required &&
                            $v.user.login_type.$anyError
                        "
                        class="invalid-feedback error"
                    >
                        Please choose a 在留資格.
                    </div>
                </div>
                <div class="form-check">
                    <input
                        id="flexCheckDefault"
                        v-model="acceptTerms"
                        class="form-check-input"
                        type="checkbox"
                        value=""
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                        利用規約とプライバシーポリシーに同意します。
                    </label>
                    <div
                        v-if="!$v.acceptTerms.required && $v.acceptTerms.$dirty"
                        class="text-danger"
                        :class="{ errorDisplay: !$v.acceptTerms.$error }"
                    >
                        Please agree with out rules!
                    </div>
                </div>
                <button
                    id="signup"
                    type="submit"
                    class="btn fw-bold my-3 my-lg-4 rounded-pill"
                >
                    登録
                </button>
                <div v-if="message" class="valid-feedback">
                    {{ message }}
                </div>

                <!--</form>-->
            </div>
            <!--</form>-->
        </div>
    </form>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import {
    required,
    email,
    sameAs,
    minLength,
    numeric,
    maxLength,
} from 'vuelidate/lib/validators'

export default {
    name: 'Register',
    layout: 'auth',
    data() {
        return {
            user: {},
            acceptTerms: '',
            errors: [],
            message: '',
        }
    },
    head() {
        return { title: 'Register' }
    },
    validations: {
        user: {
            company_name: {
                required,
            },
            manager_name: {
                required,
            },
            email: {
                required,
                email,
            },
            phone: {
                required,
                numeric,
                minLength: minLength(9),
            },
            password: {
                required,
                minLength: minLength(9),
                maxLength: maxLength(20),
            },

            confirmPassword: {
                required,
                sameAsPassword: sameAs('password'),
            },

            login_type: {
                required,
            },
            career: {
                required,
            },
        },

        acceptTerms: {
            required,
        },
    },

    methods: {
        async submit() {
            this.user.address = null
            this.user.login_type = 0
            this.user.district = 0
            this.$v.$touch()

            if (this.$v.$invalid === true) {
                try {
                    await this.$axios
                        .post('companies/register', this.user)
                        .then((response) => {
                            const data = this.$handleResponse(response)
                            this.message = data.message
                            this.errors = data.errors
                        })
                } catch (e) {
                    const data = this.$handleResponse(e)
                    this.errors = data.errors
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/jobs/register.scss';
</style>
