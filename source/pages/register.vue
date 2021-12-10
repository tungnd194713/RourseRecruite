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
                        @input="$v.user.company_name.$touch()"
                        @blur="$v.user.company_name.$touch()"
                    />
                    <div v-if="$v.user.company_name.$error">
                        <div
                            v-if="!$v.user.company_name.required"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ず入力してください
                        </div>

                        <div
                            v-if="!$v.user.company_name.maxLength"
                            class="invalid-feedback error"
                        >
                            100文字以下で入力してください
                        </div>
                    </div>
                    <div
                        v-if="errors.company_name"
                        class="invalid-feedback error"
                    >
                        会社名は既に存在しています
                    </div>
                </div>

                <div class="form-group">
                    <label for="exampleInput3">担当者名 <span>*</span></label>
                    <input
                        id="exampleInput3"
                        v-model.trim="user.manager_name"
                        type="text"
                        class="form-control form-control-lg"
                        @input="$v.user.manager_name.$touch()"
                        @blur="$v.user.manager_name.$touch()"
                    />
                    <div v-if="$v.user.manager_name.$error">
                        <div
                            v-if="!$v.user.manager_name.required"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ず入力してください
                        </div>

                        <div
                            v-if="!$v.user.manager_name.maxLength"
                            class="invalid-feedback error"
                        >
                            50文字以下で入力してください
                        </div>
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
                        @input="$v.user.email.$touch()"
                        @blur="$v.user.email.$touch()"
                    />

                    <div v-if="$v.user.email.$error">
                        <div
                            v-if="!$v.user.email.required"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ず入力してください
                        </div>

                        <div
                            v-if="!$v.user.email.email"
                            class="invalid-feedback error"
                        >
                            メールアドレスの形式で入力してください
                        </div>
                    </div>
                    <div v-if="errors.email" class="invalid-feedback error">
                        このメールアドレスは既に存在しています
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInput6">電話番号 <span>*</span></label>
                    <input
                        id="exampleInput6"
                        v-model.trim="user.phone"
                        type="text"
                        class="form-control form-control-lg"
                        @input="$v.user.phone.$touch()"
                        @blur="$v.user.phone.$touch()"
                    />

                    <div v-if="$v.user.phone.$error">
                        <div
                            v-if="!$v.user.phone.required"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ず入力してください
                        </div>

                        <div
                            v-if="
                                !$v.user.phone.maxLength ||
                                !$v.user.phone.minLength
                            "
                            class="invalid-feedback error"
                        >
                            9数字以上13数字以下で入力してください
                        </div>
                    </div>
                    <div v-if="errors.phone" class="invalid-feedback error">
                        この電話番号は既に存在しています
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInput7">パスワード <span>*</span></label>
                    <input
                        id="exampleInput7"
                        v-model.trim="user.password"
                        type="text"
                        class="form-control form-control-lg"
                        @input="$v.user.password.$touch()"
                        @blur="$v.user.password.$touch()"
                    />
                    <div v-if="$v.user.password.$error">
                        <div
                            v-if="!$v.user.password.required"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ず入力してください
                        </div>

                        <div
                            v-if="
                                !$v.user.password.maxLength ||
                                !$v.user.password.minLength
                            "
                            class="invalid-feedback error"
                        >
                            6文字以上32文字以下で入力してください
                        </div>
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
                        @input="$v.user.confirmPassword.$touch()"
                        @blur="$v.user.confirmPassword.$touch()"
                    />
                    <div v-if="$v.user.confirmPassword.$error">
                        <div
                            v-if="!$v.user.confirmPassword.required"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ず入力してください
                        </div>

                        <div
                            v-if="!$v.user.confirmPassword.sameAsPassword"
                            class="invalid-feedback error"
                        >
                            入力したパスワードが一致しません
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputGroupSelect01s">業界・分野 <span>*</span></label>
                    <select
                        id="inputGroupSelect01s"
                        v-model="user.career"
                        class="form-select form-select-lg"
                    >
                        <option
                            v-for="item in formCareerList"
                            :key="item.value"
                            :value="item.value"
                        >
                            {{ item.text }}
                        </option>
                    </select>

                    <div class="invalid-feedback">
                        これは必須項目なので、必ず選択してください
                    </div>
                </div>
                <div class="form-group">
                    <label>住所 </label>
                </div>

                <div class="form-group">
                    <label for="exampleInput10">郵便番号 <span>*</span></label>
                    <input
                        id="exampleInput10"
                        type="text"
                        class="form-control form-control-lg"
                    />
                </div>

                <div class="form-group">
                    <label for="inputGroupSelect01"
                        >都道府県 <span>*</span></label
                    >
                    <select
                        id="inputGroupSelect01"
                        class="form-select form-select-lg"
                    >
                        <option selected></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="exampleInput8i">市区町村 <span>*</span></label>
                    <input
                        id="exampleInput8i"
                        type="text"
                        class="form-control form-control-lg"
                    />
                </div>

                <div class="form-group">
                    <label for="exampleInput9">番地 <span>*</span></label>
                    <input
                        id="exampleInput9"
                        type="text"
                        class="form-control form-control-lg"
                    />
                </div>

                <div class="form-check">
                    <input
                        id="flexCheckDefault"
                        v-model="acceptTerms"
                        class="form-check-input"
                        type="checkbox"
                        value="1"
                        @input="$v.acceptTerms.$touch()"
                        @blur="$v.acceptTerms.$touch()"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                        利用規約とプライバシーポリシーに同意します。
                    </label>
                    <div v-if="$v.acceptTerms.$error">
                        <div
                            v-if="!$v.acceptTerms.required"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ずチェックしてください
                        </div>
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
                    ご登録ありがとうございます。登録されたメールアドレスに確認用のリンクをお送りしました。
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
    maxLength,
} from 'vuelidate/lib/validators'

export default {
    name: 'Register',
    data() {
        return {
            user: {},
            acceptTerms: '',

            formCareerList: [
                {
                    text: '1',
                    value: 1,
                },
                {
                    text: '2',
                    value: 2,
                },
            ],
            errors: [],
            message: '',
        }
    },

    head() {
        return { title: '会員登録' }
    },

    validations: {
        user: {
            company_name: {
                required,
                maxLength: maxLength(100),
            },
            manager_name: {
                required,
                maxLength: maxLength(50),
            },
            email: {
                required,
                email,
            },
            phone: {
                required,
                minLength: minLength(9),
                maxLength: maxLength(13),
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(30),
            },
            confirmPassword: {
                required,
                sameAsPassword: sameAs('password'),
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
            this.$v.user.$touch()
            this.$v.acceptTerms.$touch()

            if (!this.$v.user.$invalid) {
                try {
                    await this.$repositories.accounts
                        .registerAccount(this.user)
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
@import '../styles/pages/jobs/register.scss';
</style>
