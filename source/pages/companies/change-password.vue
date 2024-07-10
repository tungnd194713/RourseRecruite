<template>
  <main class="container my-3 my-lg-4">
    <div class="row box-title mb-1 mb-lg-2">
      <div class="col-12 col-lg-3 mb-2 box-menu-left">
        <ul class="nav flex-column">
          <li class="nav-item rounded mb-2">
            <a class="nav-link" @click="$router.push('/companies/edit')">
              <img class="" src="../../assets/images/icon_building.svg"/>
              Thông tin công ty
            </a>
          </li>
          <li class="nav-item rounded">
            <a class="nav-link active" @click="$router.push('/companies/change-password')">
              <img class="" src="../../assets/images/icon_user_rounded.svg"/>
              Đổi mật khẩu
            </a>
          </li>
        </ul>
      </div>
      <div class="col-12 col-lg-9">
        <div class="box-form-account pb-5">
          <h3 class="container">Đổi mật khẩu</h3>
          <div class="mt-3 mb-3 mt-lg-4  mb-lg-4 line"></div>
          <div class="container pb-5 row">
            <div class="form-change">
              <div class="logo form-group mb-2 mb-lg-3 text-center d-flex align-items-center justify-content-center">
                <!--<div
                  v-if="previewProfileImageUrl"
                  class="background-logo"
                  :style="{
                    backgroundImage: `url(${previewProfileImageUrl})`
                  }"
                >
                </div>-->
                <img v-if="previewProfileImageUrl" :src="previewProfileImageUrl"/>
                <img v-else src="../../assets/images/avatar1.svg"/>
              </div>
              <div class="text-center">
                <input
                  ref="profileImage"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  style="display: none"
                  @change="onChangeProfileImage"
                >
                <button
                  type="button"
                  class="btn btn-sm border rounded-pill ms-2 ms-lg-3 btn-select-image"
                  @click="$refs.profileImage.click()"
                >
                  <span class="px-4">
                    <img src="../../assets/images/icon_upload_change_password.svg" alt="">
                    &nbsp;
                    Tải lên từ máy tính
                  </span>
                </button>
              </div>
              <div class="text-center error-text">{{ profileImageErrors[0]}}</div>
            </div>
            <div class="form-change">
              <form @submit.prevent="submitChangePassword">
                <div class="form-group mb-2 mb-lg-3">
                  <label for="exampleInput1c">Mật khẩu hiện tại <span>*</span></label>
                  <div class="input-group">
                    <input
                      id="exampleInput1c"
                      v-model="company.old_password"
                      :type="isHideOldPassword ? 'password' : 'text'"
                      class="form-control"
                      placeholder="Vui lòng nhập mật khẩu hiện tại"
                      @input="onInputOldPassword"
                      @blur="$v.company.old_password.$touch()"
                    >
                    <span
                      class="input-group-text input-group-text-next"
                      @click="isHideOldPassword = !isHideOldPassword"
                    >
                      <img
                        v-if="isHideOldPassword"
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

                  <div class="error-text">{{ oldPasswordErrors[0]}}</div>
                  <div class="error-text">{{ wrongOldPasswordText}}</div>
                </div>
                <div class="form-group mb-2 mb-lg-3">
                  <label for="exampleInput2c">Mật khẩu mới <span>*</span></label>
                  <div class="input-group">
                    <input
                      id="exampleInput2c"
                      v-model="company.new_password"
                      :type="isHideNewPassword ? 'password' : 'text'"
                      class="form-control"
                      placeholder="Vui lòng nhập mật khẩu mới"
                      @input="$v.company.new_password.$touch()"
                      @blur="$v.company.new_password.$touch()"
                    >
                    <span
                      class="input-group-text input-group-text-next"
                      @click="isHideNewPassword = !isHideNewPassword"
                    >
                      <img
                        v-if="isHideNewPassword"
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

                  <div class="error-text">{{ newPasswordErrors[0]}}</div>
                </div>
                <div class="form-group mb-2 mb-lg-3">
                  <label for="exampleInput3c">Xác nhận mật khẩu mới<span>*</span></label>
                  <div class="input-group">
                    <input
                      id="exampleInput3c"
                      v-model="company.confirm_password"
                      :type="isHideConfirmNewPassword ? 'password' : 'text'"
                      class="form-control"
                      placeholder="Vui lòng nhập lại mật khẩu mới"
                      @input="$v.company.confirm_password.$touch()"
                      @blur="$v.company.confirm_password.$touch()"
                    >
                    <span
                      class="input-group-text input-group-text-next"
                      @click="isHideConfirmNewPassword = !isHideConfirmNewPassword"
                    >
                      <img
                        v-if="isHideConfirmNewPassword"
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

                  <div class="error-text">{{ confirmPasswordErrors[0]}}</div>
                </div>
                <div class="text-end">
                  <button
                    id="btn_cancel"
                    type="button"
                    class="btn btn-sm border rounded-pill ms-2 ms-lg-3 btn-cancel-account"
                    data-bs-toggle="modal"
                    data-bs-target="#confirmCancelModal"
                  >
                    <span class="px-4">Huỷ bỏ</span>
                  </button>
                  <button id="btn_change_pw" type="submit" class="btn btn-sm border rounded-pill btn-edit-account">
                    <span class="px-4">Lưu</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div id="confirmCancelModal" class="modal fade"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content box-modal">
          <div class="modal-header border-0">
            <img
              ref="closeConfirmCanCelModal"
              class="close-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
              src="../../assets/images/ic_exit.svg"
              alt=""
            >
          </div>
          <div class="modal-body">
            <h3 class="text-center modal-body-text">Bạn có chắc chắn không?</h3>
          </div>
          <div class="modal-footer align-items-center d-flex justify-content-center flex-row">
            <button type="button" class="btn btn-secondary-custom rounded-pill w-20 mt-4 mb-4" data-bs-dismiss="modal">Không</button>
            <button type="button" class="btn btn-danger rounded-pill w-20" @click="cancelChangePassword">Có</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    maxLength,
    minLength,
    helpers
} from 'vuelidate/lib/validators'

  const imageRule = helpers.regex('image', /\.(jpeg|png|jpg|gif)$/)
  const imageSize = (value) => value <= 2000000

  export default {
    name: "ChangePassword",
    mixins: [validationMixin],
    layout: 'auth',

    data() {
      return {
        url_file: process.env.URL_FILE,
        isHideOldPassword: true,
        isHideNewPassword: true,
        isHideConfirmNewPassword: true,
        previewProfileImageUrl: '',
        profile_image: null,
        company: {
          old_password: '',
          new_password: '',
          confirm_password: ''
        },
        wrongOldPasswordText: ''
      }
    },

    validations: {
      profile_image: {
        name: {
          imageRule
        },
        size: {
          imageSize
        }
      },
      company: {
        old_password: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(32)
        },
        new_password: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(32)
        },
        confirm_password: {
          required,
          isSameNewPassWord(value) {
            return value.localeCompare(this.company.new_password) === 0
          }
        }
      }
    },

    head() {
      return {
        title: 'RouteRecruite | Đổi mật khẩu',
      }
    },

    computed: {
      profileImageErrors () {
        const errors = []
        if (!this.$v.profile_image.$dirty) return errors
        !this.$v.profile_image.name.imageRule && errors.push('Hãy tải ảnh lên dưới định dạng png / jpg / jpeg / gif')
        !this.$v.profile_image.size.imageSize && errors.push('Hãy tải lên ảnh có kích thước dưới 2MB')
        return errors
      },

      oldPasswordErrors () {
        const errors = []
        if (!this.$v.company.old_password.$dirty) return errors
        !this.$v.company.old_password.required && errors.push('Đây là mục bắt buộc, vui lòng nhập vào')
        !this.$v.company.old_password.minLength && errors.push('Vui lòng nhập từ 6 đến 32 ký tự')
        !this.$v.company.old_password.maxLength && errors.push('Vui lòng nhập từ 6 đến 32 ký tự')
        return errors
      },

      newPasswordErrors () {
        const errors = []
        if (!this.$v.company.new_password.$dirty) return errors
        !this.$v.company.new_password.required && errors.push('Đây là mục bắt buộc, vui lòng nhập vào')
        !this.$v.company.new_password.minLength && errors.push('Vui lòng nhập từ 6 đến 32 ký tự')
        !this.$v.company.new_password.maxLength && errors.push('Vui lòng nhập từ 6 đến 32 ký tự')
        return errors
      },

      confirmPasswordErrors () {
        const errors = []
        if (!this.$v.company.confirm_password.$dirty) return errors
        !this.$v.company.confirm_password.required && errors.push('Đây là mục bắt buộc, vui lòng nhập vào')
        !this.$v.company.confirm_password.isSameNewPassWord && errors.push('Mật khẩu bạn nhập không khớp')
        return errors
      },
    },


    created() {
      this.initData()
      // setInterval(this.initData, 5000)
    },

    methods: {
      initData() {
        this.$auth.fetchUser()
        const currentProfileImage = this.$store.getters.loggedInUser.logo
        this.previewProfileImageUrl = currentProfileImage ? this.url_file + currentProfileImage : ''
      },

      onChangeProfileImage(e) {
        this.profile_image = e.target.files[0]
        if (!this.profile_image) {
          this.$v.profile_image.$reset()
        } else {
          this.submitChangeProfileImage()
        }
      },

      onInputOldPassword() {
        this.wrongOldPasswordText = ''
        this.$v.company.old_password.$touch()
      },

      cancelChangePassword() {
        this.$refs.closeConfirmCanCelModal.click()
        this.$router.push('/companies')
      },

      async submitChangePassword() {
        this.$v.company.$touch()
        if (!this.$v.company.$invalid) {
          return await this.$repositories.profiles.updateCompanyPassword(this.company).then(res => {
            if (res.status === 200) {
              this.$router.push('/login')
              this.$toast.success('Mật khẩu đã được thay đổi. Xin vui lòng đăng nhập lại')
            }
            if (res.response.status === 406) {
              this.wrongOldPasswordText = 'Mật khẩu không đúng'
            }
          })
        }
      },

      async submitChangeProfileImage() {
        this.$v.profile_image.$touch()
        if (!this.$v.profile_image.$invalid) {
          const formData = new FormData()
          formData.append('logo', this.profile_image)
          return await this.$repositories.profiles.updateCompanyProfileImage(
            formData,
            {
              header: {
                'Content-Type': 'multipart/form-data',
              },
            }
          ).then(res => {
            if (res.status === 200) {
              this.previewProfileImageUrl = this.url_file + res.data
              this.$auth.fetchUser()
              this.$toast.success('Tải hình ảnh lên thành công')
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/pages/companies/change-password.scss";
</style>
