<template>
    <form class="text-center" @submit.prevent="submit">
        <div class="p-2 p-lg-0 form-register">
            <!--<form>-->
            <div class="bg-white box-form-register">
                <h1 class="mb-3 mb-lg-4 fw-bold">Form đăng ký công ty</h1>
                <!--<form>-->
<!--                <div v-if="message === 200" class="valid-feedback error">-->
<!--                    ご登録ありがとうございます。<br />-->
<!--                    登録されたメールアドレスに確認用のリンクをお送りしました。-->
<!--                </div>-->
                <div class="form-group">
                    <label for="company-name">Tên công ty <span>*</span></label>
                    <input
                        id="company-name"
                        ref="companyNameTextBox"
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
                            Vui lòng nhập tên công ty
                        </div>

                        <div
                            v-if="!$v.user.company_name.maxLength"
                            class="invalid-feedback error"
                        >
                            Vui lòng nhập dưới 100 ký tự
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="manager-name">Tên người phụ trách <span>*</span></label>
                    <input
                        id="manager-name"
                        ref="managerNameTextBox"
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
                            Vui lòng nhập tên người phụ trách
                        </div>

                        <div
                            v-if="!$v.user.manager_name.maxLength"
                            class="invalid-feedback error"
                        >
                            Vui lòng nhập dưới 50 ký tự
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="mail">Email <span>*</span></label>
                    <input
                        id="mail"
                        ref="emailTextBox"
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
                            Vui lòng nhập email
                        </div>

                        <div
                            v-if="!$v.user.email.email"
                            class="invalid-feedback error"
                        >
                            Vui lòng nhập dưới dạng email
                        </div>
                    </div>

                    <div
                        v-if="errors.email && user.email === user.confirm_email"
                        class="invalid-feedback error"
                    >
                        Email đã được đăng ký
                    </div>
                </div>

                <div class="form-group">
                    <label for="phone">Số điện thoại <span>*</span></label>
                    <input
                        id="phone"
                        ref="phoneTextBox"
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
                            Vui lòng nhập số điện thoại
                        </div>

                        <div
                            v-if="
                                !$v.user.phone.maxLength ||
                                !$v.user.phone.minLength
                            "
                            class="invalid-feedback error"
                        >
                            Vui lòng nhập từ 9 đến 13 ký tự
                        </div>

                        <div
                            v-else-if="!$v.user.phone.number && $v.user.phone.required"
                            class="invalid-feedback error"
                        >
                            Vui lòng nhập dưới dạng số
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Mật khẩu <span>*</span></label>
                    <div class="input-group">
                      <input
                        id="password"
                        ref="passwordTextBox"
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
                            Vui lòng nhập mật khẩu
                        </div>

                        <div
                            v-if="
                                !$v.user.password.maxLength ||
                                !$v.user.password.minLength
                            "
                            class="invalid-feedback error"
                        >
                            Vui lòng nhập từ 6 đến 32 ký tự
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="confirm-password"
                        >Xác nhận mật khẩu <span>*</span></label
                    >
                    <div class="input-group">
                      <input
                        id="confirm-password"
                        ref="confirmPasswordTextBox"
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
                            Vui lòng nhập lại mật khẩu
                        </div>

                        <div
                            v-if="
                                !$v.user.confirm_password.sameAsPassword &&
                                $v.user.confirm_password.required
                            "
                            class="invalid-feedback error"
                        >
                            Mật khẩu không giống nhau
                        </div>
                    </div>
                </div>
                <!--<div class="form-group">
                    <label for="career">業界・分野 <span>*</span></label>
                    <select
                        id="career"
                        ref="careerSelectBox"
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
                </div>-->
              <br>
                <div class="form-group my-2">
                    <label id="title-address">Địa chỉ </label>
                </div>

                <div class="form-group">
                    <label for="provinces">Tỉnh<span>*</span></label>
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
                    <v-select
                      ref="provinceIdSelectBox"
                      v-model="user.province_id"
                      :options="provinces"
                      :reduce="(province) => province.value"
                      label="label"
                    >
                      <template #no-options="{ searching }">
                        <template v-if="searching">
                          Không có dữ liệu
                        </template>
                      </template>
                    </v-select>
                    <div v-if="$v.user.province_id.$error">
                        <div
                            v-if="!$v.user.province_id.required"
                            class="invalid-feedback error"
                        >
                            Vui lòng chọn tỉnh
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="address">Địa chỉ <span>*</span></label>
                    <input
                        id="address"
                        ref="addressTextBox"
                        v-model.trim="user.address"
                        type="text"
                        class="form-control form-control-lg rounded-pill"
                    />
                    <div v-if="$v.user.address.$error">
                        <div
                            v-if="!$v.user.address.required"
                            class="invalid-feedback error"
                        >
                            Vui lòng nhập địa chỉ
                        </div>
                        <div
                            v-if="!$v.user.address.maxLength"
                            class="invalid-feedback error"
                        >
                            Vui lòng nhập dưới 200 ký tự
                        </div>
                    </div>
                </div>

                <!-- <div class="form-check"> -->
                    <!-- <input
                        id="flexCheckDefault"
                        ref="acceptTermsCheckbox"
                        v-model="acceptTerms"
                        class="form-check-input"
                        type="checkbox"
                        @change="$v.acceptTerms.$touch()"
                        @blur="$v.acceptTerms.$touch()"
                    /> -->
                    <!-- <label class="form-check-label" for="flexCheckDefault">
                      <a class="text-decoration-underline term-use" @click="$route.push('term-use')">利用規約</a>
                      と
                      <a class="text-decoration-underline term-use" @click="$route.push('privacy-policy')">プライバシーポリシー</a>
                      に同意します。
                    </label>
                    <div v-if="$v.acceptTerms.$error">
                        <div
                            v-if="!$v.acceptTerms.checked"
                            class="invalid-feedback error"
                        >
                            これは必須項目なので、必ずチェックしてください
                        </div>
                    </div> -->
                <!-- </div> -->
                <div>
                    <NuxtLink to="/login">
                        <button
                            id="btn_cancel"
                            type="button"
                            class="btn fw-bold my-3 my-lg-4 rounded-pill"
                            style="
                                background-color: white;
                                border-color: black;
                                color: black;
                            "
                        >
                            Hủy
                        </button>
                    </NuxtLink>
                    <button
                        id="signup"
                        type="submit"
                        class="btn fw-bold my-3 my-lg-4 rounded-pill cancel"
                    >
                        Đăng ký
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
} from 'vuelidate/lib/validators'

import theCareers from '~/constants/careers'
import theProvinces from '~/constants/provinces'
import provincesInRegisterPage from '~/constants/provincesInRegisterPage'

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
                province_id: '',
                address: '',
            },
            acceptTerms: true,
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
            // career: {
            //     required,
            // },
            province_id: {
                required,
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
            // career: '',
            province_id: '',
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
            if (!this.$v.user.$invalid) {
              if (!this.$v.acceptTerms.$invalid) {
                this.isLoading = true
                try {
                  await this.$repositories.accounts
                    .registerAccount(this.user)
                    .then((response) => {
                      // const data = this.$handleResponse(response)
                      this.message = response.status
                      // this.errors = data.errors
                      if (response.status === 201) {
                        this.$toast.success('Tạo tài khoản thành công. Hãy đăng nhập.')
                        this.$router.push('/login')
                      }
                      if (response.response && response.response.status === 400) {
                        this.$nextTick(() => {
                          this.$refs.emailTextBox.focus()
                        })
                      }
                    })
                } catch (error) {
                  // const data = this.$handleResponse(error)
                  // this.errors = data.errors
                }
                this.isLoading = false
              } else {
                this.$nextTick(() => {
                  this.$refs.acceptTermsCheckbox.focus()
                })
              }
            } else if (this.$v.user.company_name.$error) {
              this.$nextTick(() => {
                this.$refs.companyNameTextBox.focus()
              })
            } else if (this.$v.user.manager_name.$error) {
              this.$nextTick(() => {
                this.$refs.managerNameTextBox.focus()
              })
            } else if (this.$v.user.email.$error) {
              this.$nextTick(() => {
                this.$refs.emailTextBox.focus()
              })
            } else if (this.$v.user.phone.$error) {
              this.$nextTick(() => {
                this.$refs.phoneTextBox.focus()
              })
            } else if (this.$v.user.password.$error) {
              this.$nextTick(() => {
                this.$refs.passwordTextBox.focus()
              })
            } else if (this.$v.user.confirm_password.$error) {
              this.$nextTick(() => {
                this.$refs.confirmPasswordTextBox.focus()
              })
            }
            // else if (this.$v.user.career.$error) {
            //   this.$nextTick(() => {
            //     this.$refs.careerSelectBox.focus()
            //   })
            // }
            else if (this.$v.user.province_id.$error) {
              this.$nextTick(() => {
                document.getElementsByClassName('vs__search')[0].focus()
              })
            } else if (this.$v.user.address.$error) {
              this.$nextTick(() => {
                this.$refs.addressTextBox.focus()
              })
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../styles/pages/jobs/register.scss';
</style>

<style lang="scss">
@import "../styles/pages/jobs/vue-select.scss";
</style>
