<template>
    <form class="text-center" @submit.prevent="submit">
        <div class="p-2 p-lg-0 form-register">
            <!--<form>-->
            <div class="bg-white box-form-register">
                <h1 class="mb-3 mb-lg-4 fw-bold">会員登録フォーム</h1>
                <!--<form>-->
<!--                <div v-if="message === 200" class="valid-feedback error">-->
<!--                    ご登録ありがとうございます。<br />-->
<!--                    登録されたメールアドレスに確認用のリンクをお送りしました。-->
<!--                </div>-->
                <div class="form-group">
                    <label for="company-name">会社名 <span>*</span></label>
                    <input
                        id="company-name"
                        v-model.trim="user.company_name"
                        class="form-control form-control-lg rounded-pill"
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
                </div>

                <div class="form-group">
                    <label for="manager-name">担当者名 <span>*</span></label>
                    <input
                        id="manager-name"
                        v-model.trim="user.manager_name"
                        type="text"
                        class="form-control form-control-lg rounded-pill"
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
                    <label for="mail">メールアドレス <span>*</span></label>
                    <input
                        id="mail"
                        v-model.trim="user.email"
                        type="text"
                        class="form-control form-control-lg rounded-pill"
                        @input="$v.user.email.$touch()"
                        @blur="$v.user.email.$touch()"
                    />

                    <div v-if="$v.user.email.$error">
                        <div
                            v-if="!$v.user.email.required"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ず入力してくださいd
                        </div>

                        <div
                            v-if="!$v.user.email.email"
                            class="invalid-feedback error"
                        >
                            メールアドレスの形式で入力してください
                        </div>
                    </div>

                    <div
                        v-if="errors.email && user.email === user.confirm_email"
                        class="invalid-feedback error"
                    >
                        このメールアドレスは既に存在しています
                    </div>
                </div>

                <div class="form-group">
                    <label for="phone">電話番号 <span>*</span></label>
                    <input
                        id="phone"
                        v-model.trim="user.phone"
                        type="text"
                        class="form-control form-control-lg rounded-pill"
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

                        <div
                            v-else-if="!$v.user.phone.number && $v.user.phone.required"
                            class="invalid-feedback error"
                        >
                            整数を入力してください
                        </div>
                    </div>

                    <div
                        v-if="
                            errors.phone &&
                            user.phone === user.confirm_phone
                        "
                        class="invalid-feedback error"
                    >
                        この電話番号は既に存在しています
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">パスワード <span>*</span></label>
                    <div class="input-group">
                      <input
                        id="password"
                        v-model.trim="user.password"
                        :type="isHidePassword ? 'password' : 'text'"
                        class="form-control form-control-lg input-password"
                        @input="$v.user.password.$touch()"
                        @blur="$v.user.password.$touch()"
                      />
                      <span
                        class="input-group-text input-group-text-next"
                        @click="isHidePassword = !isHidePassword"
                      >
                        <img
                          v-if="isHidePassword"
                          class="show-hide-password-icon"
                          src="~/assets/images/icon_eye.svg"
                          alt=""
                        />
                        <img
                          v-else
                          class="show-hide-password-icon"
                          src="~/assets/images/icon_eyes_show.svg"
                          alt=""
                        />
                      </span>
                    </div>
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
                    <label for="confirm-password"
                        >パスワード（確認) <span>*</span></label
                    >
                    <div class="input-group">
                      <input
                        id="confirm-password"
                        v-model.trim="user.confirm_password"
                        :type="isHideConfirmPassword ? 'password' : 'text'"
                        class="form-control form-control-lg input-password"
                        @input="$v.user.confirm_password.$touch()"
                        @blur="$v.user.confirm_password.$touch()"
                      />
                      <span
                        class="input-group-text input-group-text-next"
                        @click="isHideConfirmPassword = !isHideConfirmPassword"
                      >
                        <img
                          v-if="isHideConfirmPassword"
                          class="show-hide-password-icon"
                          src="~/assets/images/icon_eye.svg"
                          alt=""
                        />
                        <img
                          v-else
                          class="show-hide-password-icon"
                          src="~/assets/images/icon_eyes_show.svg"
                          alt=""
                        />
                      </span>
                    </div>
                    <div v-if="$v.user.confirm_password.$error">
                        <div
                            v-if="!$v.user.confirm_password.required"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ず入力してください
                        </div>

                        <div
                            v-if="
                                !$v.user.confirm_password.sameAsPassword &&
                                $v.user.confirm_password.required
                            "
                            class="invalid-feedback error"
                        >
                            入力したパスワードが一致しません
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="career">業界・分野 <span>*</span></label>
                    <select
                        id="career"
                        v-model="user.career"
                        class="form-select form-select-lg rounded-pill"
                    >
                        <option
                            v-for="(career, index) in careers"
                            :key="index"
                            :value="index + 1"
                        >
                            {{ $t(career) }}
                        </option>
                    </select>
                    <div v-if="$v.user.career.$error">
                        <div
                            v-if="!$v.user.career.required"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ず選択してください
                        </div>
                    </div>
                </div>
              <br>
                <div class="form-group my-2">
                    <label id="title-address">住所 </label>
                </div>

                <div class="form-group">
                    <label for="postal-code-1">郵便番号</label>
                  <div class="d-flex">
                    <input
                      id="postal-code-1"
                      v-model.trim="user.postal_code_1"
                      type="text"
                      class="form-control form-control-lg rounded-pill w-25 pr-1"
                      placeholder="xxx"
                      @input="$v.user.postal_code_1.$touch()"
                      @blur="$v.user.postal_code_1.$touch()"
                      maxlength="3"
                    />
                    <p class="mx-3 mt-2">ー</p>
                    <input
                      id="postal-code-2"
                      v-model.trim="user.postal_code_2"
                      type="text"
                      class="form-control form-control-lg rounded-pill w-50"
                      placeholder="xxxx"
                      @input="$v.user.postal_code_2.$touch()"
                      @blur="$v.user.postal_code_2.$touch()"
                      maxlength="4"
                    />
                  </div>
                  <div v-if="$v.user.postal_code_1.$error">
                    <div
                      v-if="!$v.user.postal_code_1.numeric"
                      class="invalid-feedback error"
                    >
                      郵便番号の形式で入力してください
                    </div>
                  </div>
                  <div v-if="$v.user.postal_code_2.$error">
                    <div
                      v-if="!$v.user.postal_code_2.numeric"
                      class="invalid-feedback error"
                    >
                      郵便番号の形式で入力してください
                    </div>
                  </div>
                </div>

                <div class="form-group">
                    <label for="provinces">都道府県<span>*</span></label>
<!--                    <select-->
<!--                        id="provinces"-->
<!--                        v-model="user.province_id"-->
<!--                        class="form-select form-select-lg"-->
<!--                    >-->
<!--                        <option-->
<!--                            v-for="(province, index) in provinces"-->
<!--                            :key="index"-->
<!--                            :value="index + 1"-->
<!--                        >-->
<!--                            {{ $t(province) }}-->
<!--                        </option>-->
<!--                    </select>-->
                    <input
                      id="province_id"
                      v-model="user.province_id"
                      type="text"
                      class="form-control form-control-lg rounded-pill"
                    />
                    <div v-if="$v.user.province_id.$error">
                        <div
                            v-if="!$v.user.province_id.required"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ず選択してください
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="district">市区町村<span>*</span></label>
                    <input
                        id="district"
                        v-model.trim="user.district"
                        type="text"
                        class="form-control form-control-lg rounded-pill"
                        @input="$v.user.district.$touch()"
                        @blur="$v.user.district.$touch()"
                    />
                    <div v-if="$v.user.district.$error">
                        <div
                            v-if="!$v.user.district.required"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ず入力してください
                        </div>
                        <div
                            v-if="!$v.user.district.maxLength"
                            class="invalid-feedback error"
                        >
                            200文字以下で入力してください
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="address">番地<span>*</span></label>
                    <input
                        id="address"
                        v-model.trim="user.address"
                        type="text"
                        class="form-control form-control-lg rounded-pill"
                    />
                    <div v-if="$v.user.address.$error">
                        <div
                            v-if="!$v.user.address.required"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ず入力してください
                        </div>
                        <div
                            v-if="!$v.user.address.maxLength"
                            class="invalid-feedback error"
                        >
                            200文字以下で入力してください
                        </div>
                    </div>
                </div>

                <div class="form-check">
                    <input
                        id="flexCheckDefault"
                        v-model="acceptTerms"
                        class="form-check-input"
                        type="checkbox"
                        @change="$v.acceptTerms.$touch()"
                        @blur="$v.acceptTerms.$touch()"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                        利用規約とプライバシーポリシーに同意します。
                    </label>
                    <div v-if="$v.acceptTerms.$error">
                        <div
                            v-if="!$v.acceptTerms.checked"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ずチェックしてください
                        </div>
                    </div>
                </div>
                <div>
                    <NuxtLink to="/login">
                        <button
                            id="btn_cancel"
                            type="submit"
                            class="btn fw-bold my-3 my-lg-4 rounded-pill"
                            style="
                                background-color: white;
                                border-color: black;
                                color: black;
                            "
                        >
                            キャンセル
                        </button>
                    </NuxtLink>
                    <button
                        id="signup"
                        type="submit"
                        class="btn fw-bold my-3 my-lg-4 rounded-pill cancel"
                    >
                        登録
                    </button>
                </div>
                <!--</form>-->
            </div>
            <!--</form>-->
        </div>

        <div
          v-if="isLoading"
          class="loading style-2"
        >
          <div class="loading-wheel"></div>
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
    helpers,
    numeric,
} from 'vuelidate/lib/validators'

import theCareers from '~/constants/careers'
import theProvinces from '~/constants/provinces'
import provincesInRegisterPage from '~/constants/provincesInRegisterPage'

// const postalCode = helpers.regex('postalCode', /\d{3}-\d{4}/g)
// const phone = helpers.regex(
//     'phone',
//     /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
// )
const numbers = helpers.regex('numbers', /^[0-9]*$/)

export default {
    name: 'Register',

    data() {
        return {
            user: {
                company_name: '',
                manager_name: '',
                email: '',
                phone: '',
                password: '',
                confirm_password: '',
                career: '',
                postal_code: '',
                postal_code_1: '',
                postal_code_2: '',
                province_id: '',
                district: '',
                address: '',
            },
            acceptTerms: false,
            errors: [],
            message: '',
            theCareers,
            theProvinces,
            careers: [],
            provinces: provincesInRegisterPage,
            isHidePassword: true,
            isHideConfirmPassword: true,
            isLoading: false
        }
    },

    watch: {
        'user.postal_code_1': {
          handler(newVal) {
            if (this.user.postal_code_1.length === 3 && this.user.postal_code_2.length === 4) {
            this.user.postal_code = this.user.postal_code_1 + this.user.postal_code_2
            }
          },
          deep: true
        },
        'user.postal_code_2': {
          handler(newVal) {
            if (this.user.postal_code_2.length === 4 && this.user.postal_code_1.length === 3) {
              this.user.postal_code = this.user.postal_code_1 + this.user.postal_code_2
            }
          },
          deep:true
        },
        'user.postal_code': {
          handler(newVal) {
            if (this.user.postal_code > 0) {
              this.getDetailAddress();
            }
          },
          deep:true
        },
    },

    head() {
        return { title: '会員登録 | 求人' }
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
                numbers,
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(30),
            },
            confirm_password: {
                required,
                sameAsPassword: sameAs('password'),
            },
            career: {
                required,
            },
            postal_code_1: {
                numeric,
            },
            postal_code_2: {
              numeric,
            },
            province_id: {
                required,
            },
            district: {
                required,
                maxLength: maxLength(200),
            },
            address: {
                required,
                maxLength: maxLength(200),
            },
        },
        acceptTerms: {
            checked(val) {
              return val
            }
        },
    },

    created() {
        this.careers = theCareers
        // this.provinces = theProvinces
    },

    methods: {

        resetData() {
          this.user = Object.assign({}, {
            company_name: '',
            manager_name: '',
            email: '',
            phone: '',
            password: '',
            confirm_password: '',
            career: '',
            postal_code: '',
            postal_code_1: '',
            postal_code_2: '',
            province_id: '',
            district: '',
            address: '',
          })
          this.acceptTerms =  false
          this.errors =  []
          this.message =  ''
          this.$v.$reset()
        },

        async submit() {
            this.user.confirm_email = this.user.email
            this.user.confirm_phone = this.user.phone
            this.$v.user.$touch()
            this.$v.acceptTerms.$touch()
            if (!this.$v.acceptTerms.$invalid) {
              if (!this.$v.user.$invalid) {
                this.isLoading = true
                try {
                  await this.$repositories.accounts
                    .registerAccount(this.user)
                    .then((response) => {
                      const data = this.$handleResponse(response)
                      this.message = response.status
                      this.errors = data.errors
                      if (response.status === 200) {
                        this.$toast.success('ご登録ありがとうございます。登録されたメールアドレスに確認用のリンクをお送りしました。')
                        this.resetData()
                      }
                    })
                } catch (error) {
                  const data = this.$handleResponse(error)
                  this.errors = data.errors
                }
                this.isLoading = false
              }
            }
        },

        async getDetailAddress() {
          if (this.user.postal_code) {
            await this.$axios.get('https://apis.postcode-jp.com/api/v5/postcodes/' + this.user.postal_code).then((res) => {
              if(res.data.length > 0) {
                this.user.province_id = res.data[0].pref;
                this.user.district = res.data[0].city;
                this.user.address = res.data[0].allAddress;
              }
            })
          }
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../styles/pages/jobs/register.scss';
</style>
