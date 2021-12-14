<template>
  <main class="container my-3 my-lg-4">
    <div class="row box-title mb-1 mb-lg-2">
      <div class="col-12 col-lg-3 mb-2 box-menu-left">
        <ul class="nav flex-column">
          <li class="nav-item rounded mb-2">
            <a class="nav-link" @click="$router.push('/companies/edit')">
              <img class="" src="../../assets/images/icon_building.svg"/>
              会社情報
            </a>
          </li>
          <li class="nav-item rounded">
            <a class="nav-link active" @click="$router.push('/companies/change-password')">
              <img class="" src="../../assets/images/icon_user_rounded.svg"/>
              パスワード変更
            </a>
          </li>
        </ul>
      </div>
      <div class="col-12 col-lg-9">
        <div class="box-form-account pb-5">
          <h3 class="container">パスワード変更</h3>
          <div class="mt-3 mb-3 mt-lg-4  mb-lg-4 line"></div>
          <div class="container pb-5 row">
            <div class="form-change">
              <div class="form-group mb-2 mb-lg-3 text-center">
                <img v-if="previewProfileImageUrl" :src="previewProfileImageUrl"/>
                <img v-else src="../../assets/images/ic_avatar.svg"/>
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
                    PCからアップロードする
                  </span>
                </button>
              </div>
              <div class="text-center error-text">{{ profileImageErrors[0]}}</div>
            </div>
            <div class="form-change">
              <form @submit.prevent="submitChangePassword">
                <div class="form-group mb-2 mb-lg-3">
                  <label for="exampleInput1c">現在のパスワード <span>*</span></label>
                  <input
                          id="exampleInput1c"
                    v-model="company.old_password"
                    type="text"
                    class="form-control"
                    placeholder="新しいパスワードを入力してください"
                    @input="onInputOldPassword"
                    @blur="$v.company.old_password.$touch()"
                  >
                  <div class="error-text">{{ oldPasswordErrors[0]}}</div>
                  <div class="error-text">{{ wrongOldPasswordText}}</div>
                </div>
                <div class="form-group mb-2 mb-lg-3">
                  <label for="exampleInput2c">新しいパスワード <span>*</span></label>
                  <input
                          id="exampleInput2c"
                    v-model="company.new_password"
                    type="text"
                    class="form-control"
                    placeholder="新しいパスワードを入力してください"
                    @input="$v.company.new_password.$touch()"
                    @blur="$v.company.new_password.$touch()"
                  >
                  <div class="error-text">{{ newPasswordErrors[0]}}</div>
                </div>
                <div class="form-group mb-2 mb-lg-3">
                  <label for="exampleInput3c">新しいパスワード（確認）<span>*</span></label>
                  <input
                    id="exampleInput3c"
                    v-model="company.confirm_password"
                    type="text"
                    class="form-control"
                    placeholder="新しいパスワードを改めて入力してください"
                    @input="$v.company.confirm_password.$touch()"
                    @blur="$v.company.confirm_password.$touch()"
                  >
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
                    <span class="px-4">キャンセル</span>
                  </button>
                  <button  id="btn_change_pw" type="submit" class="btn btn-sm border rounded-pill btn-edit-account">
                    <span class="px-4">保存</span>
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
            <h3 class="text-center modal-body-text">Are you sure?</h3>
          </div>
          <div class="modal-footer align-items-center d-flex justify-content-center flex-row">
            <button type="button" class="btn btn-secondary-custom rounded-pill w-20 mt-4 mb-4" data-bs-dismiss="modal">いいえ</button>
            <button type="button" class="btn btn-danger rounded-pill w-20" @click="cancelChangePassword">はい</button>
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
        title: 'パスワード変更',
      }
    },

    computed: {
      profileImageErrors () {
        const errors = []
        if (!this.$v.profile_image.$dirty) return errors
        !this.$v.profile_image.name.imageRule && errors.push('画像はpng / jpg / jpeg / gifの形式でアプロードしてください')
        !this.$v.profile_image.size.imageSize && errors.push('2MB以下の写真をアップロードしてください')
        return errors
      },

      oldPasswordErrors () {
        const errors = []
        if (!this.$v.company.old_password.$dirty) return errors
        !this.$v.company.old_password.required && errors.push('これは必須項目なので、必ず入力してください')
        !this.$v.company.old_password.minLength && errors.push('6文字以上32文字以下で入力してください')
        !this.$v.company.old_password.maxLength && errors.push('6文字以上32文字以下で入力してください')
        return errors
      },

      newPasswordErrors () {
        const errors = []
        if (!this.$v.company.new_password.$dirty) return errors
        !this.$v.company.new_password.required && errors.push('これは必須項目なので、必ず入力してください')
        !this.$v.company.new_password.minLength && errors.push('6文字以上32文字以下で入力してください')
        !this.$v.company.new_password.maxLength && errors.push('6文字以上32文字以下で入力してください')
        return errors
      },

      confirmPasswordErrors () {
        const errors = []
        if (!this.$v.company.confirm_password.$dirty) return errors
        !this.$v.company.confirm_password.required && errors.push('これは必須項目なので、必ず入力してください')
        !this.$v.company.confirm_password.isSameNewPassWord && errors.push('入力したパスワードが一致しません')
        return errors
      },

    },

    created() {
      this.initData()
    },

    methods: {
      initData() {
        const currentProfileImage = this.$store.getters.loggedInUser.profile_image
        this.previewProfileImageUrl = currentProfileImage ? process.env.API_URL.replace('api', 'storage') + currentProfileImage : ''
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
              this.$toast.success('パスワードが変更されました。再度ログインしてください')
            }
            if (res.response.status === 406) {
              this.wrongOldPasswordText = 'パスワードが正しくありません'
            }
          })
        }
      },

      async submitChangeProfileImage() {
        this.$v.profile_image.$touch()
        if (!this.$v.profile_image.$invalid) {
          const formData = new FormData()
          formData.append('profile_image', this.profile_image)
          return await this.$repositories.profiles.updateCompanyProfileImage(
            formData,
            {
              header: {
                'Content-Type': 'multipart/form-data',
              },
            }
          ).then(res => {
            if (res.status === 200) {
              this.previewProfileImageUrl = process.env.API_URL.replace('api', 'storage') + res.data
              this.$auth.fetchUser()
              this.$toast.success('画像アップロードに成功しました')
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
