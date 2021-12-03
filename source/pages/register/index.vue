<template>
    <form class="text-center" @submit.prevent="submit">
        <div class="p-2 p-lg-0 form-register">
            <!--<form>-->
            <div class="bg-white box-form-register">
                <h1 class="mb-3 mb-lg-4 fw-bold">会員登録フォーム</h1>
                <!--<form>-->
                <div
                    class="form-group"
                    :class="{ 'form-group--error': $v.company_name.$error }"
                >
                    <label for="exampleInputEmail1"
                        >会社名 <span>*</span></label
                    >
                    <input
                        id="exampleInputEmail1"
                        v-model.trim="$v.company_name.$model"
                        class="form-control form-control-lg"
                        aria-describedby="emailHelp"
                    />
                    <div
                        v-if="errors.company_name"
                        class="invalid-feedback error"
                    >
                        {{ errors.company_name }}
                    </div>
                    <div
                        v-if="errors.company_name === 'TRUE'"
                        class="invalid-feedback error"
                    >
                        Please enter another company name
                    </div>
                </div>
                <div
                    class="form-group"
                    :class="{ 'form-group--error': $v.manager_name.$error }"
                >
                    <label for="exampleInput3">担当者名 <span>*</span></label>
                    <input
                        id="exampleInput3"
                        v-model.trim="$v.manager_name.$model"
                        type="text"
                        class="form-control form-control-lg"
                    />
                    <div
                        v-if="!$v.manager_name.required"
                        class="invalid-feedback error"
                        :class="{ errorDisplay: !$v.manager_name.$anyError }"
                    >
                        Manager name is required
                    </div>
                </div>
                <div
                    class="form-group"
                    :class="{ 'form-group--error': $v.email.$error }"
                >
                    <label for="exampleInput5"
                        >メールアドレス <span>*</span></label
                    >
                    <input
                        id="exampleInput5"
                        v-model.trim="$v.email.$model"
                        type="text"
                        class="form-control form-control-lg"
                    />

                    <div
                        v-if="!$v.email.email"
                        class="invalid-feedback error"
                        :class="{ errorDisplay: !$v.email.$anyError }"
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
                        v-model.trim="$v.phone.$model"
                        type="text"
                        class="form-control form-control-lg"
                    />
                    <div
                        v-if="!$v.phone.required"
                        class="invalid-feedback error"
                        :class="{ errorDisplay: !$v.phone.$anyError }"
                    >
                        phone is required
                    </div>
                    <div
                        v-if="!$v.phone.numeric"
                        class="invalid-feedback error"
                        :class="{ errorDisplay: !$v.phone.$anyError }"
                    >
                        phone is required number
                    </div>
                    <div
                        v-if="!$v.phone.minLength"
                        class="error invalid-feedback"
                    >
                        Phone must have at least
                        {{ $v.phone.$params.minLength.min }} letters.
                    </div>
                </div>
                <div
                    class="form-group"
                    :class="{ 'form-group--error': $v.password.$error }"
                >
                    <label for="exampleInput7">パスワード <span>*</span></label>
                    <input
                        id="exampleInput7"
                        v-model.trim="$v.password.$model"
                        type="text"
                        class="form-control form-control-lg"
                    />
                    <div
                        v-if="!$v.password.required"
                        class="invalid-feedback error"
                        :class="{ errorDisplay: !$v.password.$anyError }"
                    >
                        Password is required
                    </div>
                    <div
                        v-if="!$v.password.minLength || !$v.password.maxLength"
                        class="error invalid-feedback"
                        :class="{ errorDisplay: !$v.password.$anyError }"
                    >
                        Password must between
                        {{ $v.password.$params.minLength.min }} and
                        {{ $v.password.$params.maxLength.max }}
                    </div>
                </div>
                <div
                    class="form-group"
                    :class="{ 'form-group--error': $v.confirmPassword.$error }"
                >
                    <label for="exampleInput8"
                        >パスワード（確認) <span>*</span></label
                    >
                    <input
                        id="exampleInput8"
                        v-model.trim="$v.confirmPassword.$model"
                        type="text"
                        class="form-control form-control-lg"
                    />
                    <div
                        v-if="!$v.confirmPassword.required"
                        class="invalid-feedback error"
                        :class="{ errorDisplay: !$v.confirmPassword.$anyError }"
                    >
                        This field is required
                    </div>
                    <div
                        v-else-if="!$v.password.sameAsPassword"
                        class="invalid-feedback error"
                        :class="{ errorDisplay: !$v.confirmPassword.$anyError }"
                    >
                        Password is not correct
                    </div>
                </div>
                <div
                    class="form-group"
                    :class="{ 'form-group--error': $v.career.$error }"
                >
                    <label for="exampleInput9">業界・分野 <span>*</span></label>
                    <input
                        id="exampleInput9"
                        v-model.trim="$v.career.$model"
                        type="text"
                        class="form-control form-control-lg"
                    />
                    <div
                        v-if="!$v.career.required"
                        class="invalid-feedback error"
                        :class="{ errorDisplay: !$v.career.$anyError }"
                    >
                        Please enter a career
                    </div>
                    <div
                        v-if="!$v.career.numeric"
                        class="invalid-feedback error"
                        :class="{ errorDisplay: !$v.career.$anyError }"
                    >
                        Required number
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputGroupSelect01"
                        >現住所 <span>*</span></label
                    >
                    <select
                        id="inputGroupSelect01"
                        v-model="$v.login_type.$model"
                        class="form-select form-select-lg"
                    >
                        <option selected></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <div
                        v-if="!$v.login_type.required"
                        class="invalid-feedback error"
                        :class="{ errorDisplay: !$v.login_type.$anyError }"
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
                <div v-if="message">
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
    validations: {
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
        career: {
            required,
            numeric,
        },
        login_type: {
            required,
        },
        acceptTerms: {
            sameAs: sameAs(true),
            required,
        },
    },
    data() {
        return {
            company_name: '',
            manager_name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            career: '',
            login_type: '',
            acceptTerms: '',
            user: {},
            errors: [],
            message: '',
        }
    },

    methods: {
        async submit() {
            this.user.email = this.email
            this.user.company_name = this.company_name
            this.user.manager_name = this.manager_name
            this.user.password = this.password
            this.user.phone = this.phone
            this.user.career = this.career
            this.user.address = null
            this.user.login_type = 0
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
