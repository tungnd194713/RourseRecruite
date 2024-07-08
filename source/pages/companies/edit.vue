<template>
  <main class="container my-3 my-lg-4">
    <form @submit.prevent="editCompanyProfile">
      <div class="row box-title mb-1 mb-lg-2">
        <div class="col-12 col-lg-3 mb-2 box-menu-left">
          <ul class="nav flex-column">
            <li class="nav-item rounded mb-2">
              <NuxtLink class="nav-link active" to="/companies/edit">
                <img class="" src="../../assets/images/icon_building.svg" />
                Thông tin doanh nghiệp
              </NuxtLink>
            </li>
            <li class="nav-item rounded">
              <NuxtLink class="nav-link" to="/companies/change-password">
                <img class="" src="../../assets/images/icon_user_rounded.svg" />
                Đổi mật khẩu
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="col-12 col-lg-9">
          <div class="box-form-info pb-5">
            <h3 class="container">Thông tin doanh nghiệp</h3>
            <div class="mt-3 mb-3 mt-lg-4 mb-lg-4 line"></div>
            <div class="container">
              <div class="form-group mb-2 mb-lg-3">
                <label for="company_name">Tên doanh nghiệp <span>*</span></label>
                <input
                  id="company_name"
                  ref="companyNameTextBox"
                  v-model.trim="$v.data.company_name.$model"
                  type="text"
                  :class="{
                    invalid:
                      $v.data.company_name.$invalid &&
                      $v.data.company_name.$dirty,
                  }"
                  class="form-control"
                  @change="clearErrors"
                />
                <div v-if="$v.data.company_name.$error">
                  <div v-if="!$v.data.company_name.required" class="error">
                    Trường này không được bỏ trống
                  </div>
                  <div v-if="!$v.data.company_name.maxLength" class="error">
                    Cần nhập dưới 100 ký tự
                  </div>
                </div>
                <div v-if="errors.company_name" class="error">
                  {{ errors.company_name[0] }}
                </div>
              </div>
              <!--<div class="form-group mb-2 mb-lg-3">
                <label for="careers">業界・分野 <span>*</span></label>
                <select
                  id="careers"
                  v-model="$v.data.career.$model"
                  :class="{
                    invalid: $v.data.career.$invalid && $v.data.career.$dirty,
                  }"
                  class="form-select form-control"
                  aria-label="Default select careers"
                >
                  <option
                    v-for="(career, index) in careers"
                    :key="index"
                    :value="index + 1"
                  >
                    {{ $t(career) }}
                  </option>
                </select>
                <div v-if="$v.data.career.$error">
                  <div v-if="!$v.data.career.required" class="error">
                    Trường này không được bỏ trống
                  </div>
                </div>
              </div>-->
              <div class="row">
                <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                  <label for="phone">Số điện thoại <span>*</span></label>
                  <input
                    id="phone"
                    ref="phoneTextBox"
                    v-model.trim="$v.data.phone.$model"
                    type="tel"
                    :class="{
                      invalid: $v.data.phone.$invalid && $v.data.phone.$dirty,
                    }"
                    class="form-control"
                    @change="clearErrors"
                  />
                  <div v-if="$v.data.phone.$error">
                    <div v-if="!$v.data.phone.required" class="error">
                      Trường này không được bỏ trống
                    </div>
                    <div
                      v-if="
                        !$v.data.phone.maxLength ||
                        !$v.data.phone.minLength ||
                        !$v.data.phone.phone
                      "
                      class="error"
                    >
                      Hãy nhập từ 9 đến 13 ký tự
                    </div>
                  </div>
                  <div v-if="errors.phone" class="error">
                    {{ errors.phone[0] }}
                  </div>
                </div>
                <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                </div>
              </div>
              <div class="row">
                <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                  <label for="address">Địa chỉ<span>*</span></label>
                  <input
                    id="address"
                    ref="addressTextBox"
                    v-model.trim="$v.data.address.$model"
                    type="text"
                    :class="{
                      invalid:
                        $v.data.address.$invalid && $v.data.address.$dirty,
                    }"
                    class="form-control"
                  />
                  <div v-if="$v.data.address.$error">
                    <div v-if="!$v.data.address.required" class="error">
                      Trường này không được bỏ trống
                    </div>
                    <div v-if="!$v.data.address.maxLength" class="error">
                      Cần nhập dưới 200 ký tự
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-3 mb-5 mt-lg-4 mb-lg-5 line"></div>
              <div class="form-group mb-2 mb-lg-3">
                <label for="manager_name">Tên người phụ trách <span>*</span></label>
                <input
                  id="manager_name"
                  ref="managerNameTextBox"
                  v-model.trim="$v.data.manager_name.$model"
                  :class="{
                    invalid:
                      $v.data.manager_name.$invalid &&
                      $v.data.manager_name.$dirty,
                  }"
                  type="text"
                  class="form-control"
                />
                <div v-if="$v.data.manager_name.$error">
                  <div v-if="!$v.data.manager_name.required" class="error">
                    Trường này không được bỏ trống
                  </div>
                  <div v-if="!$v.data.manager_name.maxLength" class="error">
                    Cần nhập dưới 50 ký tự
                  </div>
                </div>
              </div>
              <div class="form-group mb-2 mb-lg-3">
                <label for="email">Email <span>*</span></label>
                <input
                  id="email"
                  v-model.trim="data.email"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
            </div>
            <div class="my-3 my-lg-4 line"></div>
            <div class="container">
              <div class="form-group mb-2 mb-lg-3">
                <label for="link_website"
                  >Link website công ty <span>*</span></label
                >
                <div
                  class="input-group input-group-icon"
                  :class="{
                    invalid:
                      $v.data.link_website.$invalid &&
                      $v.data.link_website.$dirty,
                  }"
                >
                  <span class="input-group-text input-group-text-pre">
                    <img src="../../assets/images/icon_link.svg" alt="" />
                  </span>
                  <input
                    id="link_website"
                    ref="linkWebsiteTextBox"
                    v-model.trim="$v.data.link_website.$model"
                    type="text"
                    class="form-control"
                  />
                </div>
                <div v-if="$v.data.link_website.$error">
                  <div v-if="!$v.data.link_website.required" class="error">
                    Trường này không được bỏ trống
                  </div>
                  <div v-if="!$v.data.link_website.url" class="error">
                    Cần nhập dưới dạng URL
                  </div>
                </div>
              </div>
              <div class="form-group mb-2 mb-lg-3">
                <label for="description">Giới thiệu công ty</label>
                <textarea
                  id="description"
                  v-model="data.description"
                  class="form-control"
                  rows="5"
                ></textarea>
              </div>
              <div class="form-group mb-2 mb-lg-3">
                <label>Logo</label>
                <div
                  class="p-4 box-upload-file text-center rounded"
                  @dragover="dragover"
                  @drop="drop($event, logo)"
                >
                  <img
                    v-if="(!data.logo || !data.logo.length) && !uploadedProfileImage"
                    src="../../assets/images/icon_upload_file.svg"
                    alt=""
                  />
                  <p class="m-0">
                    Kéo thả hoặc
                    <span
                      class="open-file-btn"
                      @click="triggerProfileImageInput"
                      > chọn file ảnh</span
                    >
                  </p>
                  <div
                    v-if="uploadedProfileImage"
                    class="mt-4 w-100 row file-preview"
                  >
                    <div
                      class="image-company"
                      :style="{
                        backgroundImage: `url(${uploadedProfileImage})`
                      }"
                    ></div>
                  </div>
                  <div v-if="data.logo && data.logo.length" class="mt-4 w-100">
                    <div
                      v-for="(file, index) in data.logo"
                      :key="index"
                      class="p-1 row file-preview"
                    >
                      <div
                        class="image-company"
                        :style="{
                          backgroundImage: `url(${logoUrl})`
                        }"
                      ></div>
                      <button
                        class="col-12 col-sm-3 col-md-6 form-control remove-image mt-2"
                        type="button"
                        title="Remove file"
                        @click="remove(data.logo.indexOf(file), logo)"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </div>
                <input
                  id="logo"
                  ref="logoInput"
                  type="file"
                  class="d-none"
                  @change="onChange(logo)"
                />
                <div v-if="$v.data.logo.$error">
                  <div
                    v-for="(v, index) in $v.data.logo.$each.$iter"
                    :key="index"
                  >
                    <div v-if="!v.name.imageRule" class="error">
                      Vui lòng tải lên hình ảnh ở định dạng png/jpg/jpeg/gif
                    </div>
                    <div v-if="!v.size.imageSize" class="error">
                      Vui lòng tải lên một bức ảnh nhỏ hơn 2MB
                    </div>
                  </div>
                </div>
                <small class="form-text text-muted float-end">
                  Đuôi hình ảnh: .png .jpg .jpeg .gif; Kích thước hình ảnh: 2MB trở xuống
                </small>
              </div>
              <!-- <div class="form-group mb-4 mb-lg-5">
                <label>Ảnh giới thiệu công ty</label>
                <div
                  class="p-4 box-upload-file text-center rounded"
                  @dragover="dragover"
                  @drop="drop($event, introImages)"
                >
                  <img
                    v-if="(!uploadedImages && !uploadedIntroImage) ||  (!uploadedImages.length && !uploadedIntroImage.length)"
                    src="../../assets/images/icon_upload_file.svg"
                    alt=""
                  />
                  <img
                    src="../../assets/images/icon_upload_file.svg"
                    alt=""
                  />
                  <p class="m-0">
                    Kéo thả hoặc
                    <span
                      class="open-file-btn"
                      @click.prevent="triggerIntroImageInput"
                      > chọn file ảnh</span
                    >
                  </p>
                  <div v-if="uploadedIntroImage" class="mt-4 w-100">
                    <div
                      v-for="(file, index) in uploadedIntroImage"
                      :key="index"
                      class="p-1 row file-preview"
                    >
                      <div
                        class="image-company"
                        :style="{
                          backgroundImage: `url(${url_api_file + file.image_url})`
                        }"
                      ></div>
                      <button
                        class="col-12 col-sm-3 col-md-6 form-control remove-image mt-2 mb-2"
                        type="button"
                        title="Remove file"
                        @click="removeImagesOnServer(file.id, index)"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                  <div v-if="uploadedImages && uploadedImages.length" class="mt-4 w-100">
                    <div
                      v-for="(file, index) in uploadedImages"
                      :key="index"
                      class="p-1 row file-preview"
                    >
                      <div
                        class="image-company"
                        :style="{
                          backgroundImage: `url(${imageUrl[index]})`
                        }"
                      ></div>
                      <button
                        class="col-12 col-sm-3 col-md-6 form-control remove-image mt-2 mb-2"
                        type="button"
                        title="Remove file"
                        @click="
                          remove(uploadedImages.indexOf(file), introImages)
                        "
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </div>
                <input
                  id="introduction_image"
                  ref="introImageInput"
                  type="file"
                  class="d-none"
                  multiple
                  @change="onChange(introImages)"
                />
                <div v-if="$v.data.images.$error">
                 <div
                   v-for="(v, index) in $v.data.images.$each.$iter"
                   :key="index"
                 >
                   <div v-if="!v.name.imageRule" class="error">
                     画像はpng / jpg / jpeg / gifの形式でアプロードしてください
                   </div>
                   <div v-if="!v.size.imageSize" class="error">
                     2MB以下の写真をアップロードしてください
                   </div>
                 </div>

                  <div v-if="introImageTypeError" class="error">
                    Vui lòng tải lên hình ảnh ở định dạng png/jpg/jpeg/gif
                  </div>
                  <div v-if="introImageSizeError" class="error">
                    Vui lòng tải lên một bức ảnh nhỏ hơn 2MB
                  </div>
                </div>
                <div v-if="errors.images" class="error">
                  {{ errors.images[0] }}
                </div>
                <small class="form-text text-muted float-end">
                  Đuôi hình ảnh: .png .jpg .jpeg .gif; Kích thước hình ảnh: 2MB trở xuống
                </small>
              </div> -->
              <div
                v-if="!data.video || data.video.length == 0"
                class="form-group mb-2 mb-lg-3"
              >
                <label for="youtube">Link youtube</label>
                <div
                  class="input-group input-group-icon"
                  :class="{
                    invalid: $v.data.youtube.$invalid && $v.data.youtube.$dirty,
                  }"
                >
                  <span class="input-group-text input-group-text-pre">
                    <img src="../../assets/images/icon_ytlink.svg" alt="" />
                  </span>
                  <input
                    id="youtube"
                    v-model.trim="$v.data.youtube.$model"
                    type="text"
                    class="form-control"
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>
                <div v-if="$v.data.youtube.$error">
                  <div v-if="!$v.data.youtube.youtube" class="error">
                    Cần nhập dưới dạng URL
                  </div>
                </div>
              </div>
              <div v-if="data.youtube == ''" class="form-group mb-1 mb-lg-2">
                <input
                  id="video"
                  ref="videoInput"
                  type="file"
                  class="d-none"
                  @change="onChange(introVideo)"
                />
                <div v-if="uploadedVideo" class="mt-4 w-100 row file-preview">
                  <iframe
                    :src="url_api_file + uploadedVideo"
                    frameborder="0"
                  ></iframe>

                  <button
                    class="col-12 col-sm-3 col-md-6 form-control w-10"
                    type="button"
                    title="Remove file"
                    @click="removeVideo()"
                  >
                    remove
                  </button>
                </div>
                <div v-if="data.video && data.video.length" class="mt-4 w-100">
                  <div
                    v-for="(file, index) in data.video"
                    :key="index"
                    class="p-1 row file-preview"
                  >
                    <iframe :src="videoUrl" frameborder="0"></iframe>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-4 my-lg-5 line"></div>
            <div class="container text-end">
              <button
                id="btn_cancel"
                type="button"
                class="
                  btn btn-lg
                  border
                  rounded-pill
                  ms-2 ms-lg-3
                  btn-cancel-profile
                "
                data-bs-toggle="modal"
                data-bs-target="#confirmCancelModal"
              >
                <span class="px-4">Hủy bỏ</span>
              </button>
              <button
                id="btn_edit_profile"
                type="submit"
                class="btn btn-lg border rounded-pill btn-edit-profile"
              >
                <span class="px-4">Lưu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- Modal -->
    <div
      id="confirmCancelModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content box-modal">
          <div class="modal-header border-0">
            <img
              ref="closeConfirmCancelModal"
              class="close-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
              src="../../assets/images/ic_exit.svg"
              alt=""
            />
          </div>
          <div class="modal-body">
            <h3 class="text-center modal-body-text">
              Bạn có chắc chắn muốn hủy chỉnh sửa của mình không?
            </h3>
          </div>
          <div
            class="
              modal-footer
              align-items-center
              d-flex
              justify-content-center
              flex-row
            "
          >
            <button
              ref="closeConfirmCancelModal"
              type="button"
              class="btn btn-secondary-custom rounded-pill w-20 mt-4 mb-4"
              data-bs-dismiss="modal"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              class="btn btn-danger rounded-pill w-20"
              @click="resetFormToStart"
            >
              Xác nhận
            </button>
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
  url,
  helpers,
} from 'vuelidate/lib/validators'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ja'
import theCareers from '~/constants/careers'
import theProvinces from '~/constants/provinces'
import provincesInRegisterPage from '~/constants/provincesInRegisterPage'

const PROFILEIMAGE = 1
const INTROIMAGES = 2
const INTROVIDEO = 3
const youtube = helpers.regex(
  'youtube',
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/
)
const phone = helpers.regex(
  'phone',
  /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/
)
const imageRule = helpers.regex('image', /\.(gif|jpe?g|png|PNG|GIF|JPE?G)$/)
const videoRule = helpers.regex('video', /\.(mp4|wmv|avi|mov|flv)$/)
const imageSize = (value) => value <= 2000000
const videoSize = (value) => value <= 100000000

export default {
  name: 'EditProfileCompany',
  components: { },
  mixins: [validationMixin],
  layout: 'auth',

  data() {
    return {
      data: {
        career: '',
        address: '',
        company_name: '',
        manager_name: '',
        founded_year: '',
        number_members: '',
        link_website: '',
        link_facebook: '',
        page_id: '',
        description: '',
        video_link: '',
        phone: '',
        youtube: '',
        province: '',
        images: [],
        video: [],
        logo: [],
        email: '',
        removeIntroImage: [],
      },
      url_api_file: process.env.URL_FILE,
      uploadedIntroImage: [],
      uploadedProfileImage: '',
      uploadedVideo: null,
      logoUrl: null,
      videoUrl: null,
      imageUrl: [],
      provinces: provincesInRegisterPage,
      theCareers,
      theProvinces,
      careers: [],
      errors: [],
      uploadedImages: [],
      logo: PROFILEIMAGE,
      introImages: INTROIMAGES,
      introVideo: INTROVIDEO,
      introImageTypeError: false,
      introImageSizeError: false,
    }
  },

  validations: {
    data: {
      company_name: {
        required,
        maxLength: maxLength(100),
      },
      address: {
        required,
        maxLength: maxLength(200),
      },
      phone: {
        required,
        minLength: minLength(9),
        maxLength: maxLength(13),
        phone,
      },
      // career: {
      //   required,
      // },
      province: {
        required,
      },
      manager_name: {
        required,
        maxLength: maxLength(50),
      },
      page_id:{
          maxLength: maxLength(100),
      },
      link_website: {
        required,
        url,
      },
      images: {
        $each: {
          name: {
            imageRule,
          },
          size: {
            imageSize,
          },
        },
      },
      video: {
        $each: {
          name: {
            videoRule,
          },
          size: {
            videoSize,
          },
        },
      },
      logo: {
        $each: {
          name: {
            imageRule,
          },
          size: {
            imageSize,
          },
        },
      },
      youtube: {
        youtube,
      },
    },
  },

    head() {
        return {
            title: 'RouteRecruite | Chỉnh sửa thông tin công ty',
        }
    },

    computed: {},

  created() {
    this.careers = theCareers
    // this.provinces = theProvinces
    this.getProfileCompany()
  },

  methods: {
    async getProfileCompany() {
      const { data } = await this.$repositories.profiles.getCompanyProfile()

      if (data.video_link) {
        if (data.video_link.includes('youtube')) {
          this.data.youtube = data.video_link
        } else {
          this.uploadedVideo = data.video_link
        }
      }

      this.data.company_name = data.company_name
      this.data.manager_name = data.manager_name
      this.data.link_website = data.link_website
      this.data.page_id = data.page_id
      this.data.description = data.description
      this.data.address = data.address
      this.data.phone = data.phone
      this.data.email = data.email
      this.data.province = data.province_id
      // this.data.career = data.career
      this.uploadedIntroImage = data.images
      this.uploadedProfileImage = data.logo
    },
    triggerProfileImageInput(event) {
      event.preventDefault()
      this.$refs.logoInput.click()
    },
    triggerIntroImageInput(event) {
      event.preventDefault()
      this.$refs.introImageInput.click()
    },
    triggerVideoInput(event) {
      event.preventDefault()
      if (event.pointerId !== -1) {
        this.$refs.videoInput.click()
      }
    },
    onChange(fileType) {
      if (fileType === 1) {
        this.data.logo = [...this.$refs.logoInput.files]
        if (this.$refs.logoInput.files[0]) {
          this.$v.data.logo.$each.$iter[0].$touch()
          this.logoUrl = window.URL.createObjectURL(this.$refs.logoInput.files[0])
          this.uploadedProfileImage = ''
        }
      }
      if (fileType === 2) {
        this.data.images = [...this.$refs.introImageInput.files]
        // this.introImageTypeError = false
        // this.introImageSizeError = false
        for (let i = 0; i < this.data.images.length; i++) {
          const file = this.data.images[i]

          this.uploadedImages.push(file)
          this.imageUrl.push(window.URL.createObjectURL(file))
        }

        // assign and validate intro images to upload
        this.data.images = [...this.uploadedImages]
        for (let i = 0; i < this.data.images.length; i++) {
          this.validateIntroImagesToUpload(i)
        }
      }
      if (fileType === 3) {
        this.data.video = [...this.$refs.videoInput.files]
        this.videoUrl = window.URL.createObjectURL(
          this.$refs.videoInput.files[0]
        )
      }
    },

    validateIntroImagesToUpload(i) {
      this.$v.data.images.$each.$iter[i].$touch()
      if (!this.$v.data.images.$each.$iter[i].name.imageRule) {
        this.introImageTypeError = true
      }
      if (!this.$v.data.images.$each.$iter[i].size.imageSize) {
        this.introImageSizeError = true
      }
    },

    drop(event, fileType) {
      event.preventDefault()
      if (fileType === 1) {
        this.$refs.logoInput.files = event.dataTransfer.files
        this.onChange(fileType) // Trigger the onChange event manually
      }
      if (fileType === 2) {
        this.$refs.introImageInput.files = event.dataTransfer.files
        this.onChange(fileType) // Trigger the onChange event manually
      }
    },
    remove(i, fileType) {
      if (fileType === 1) {
        this.data.logo.splice(i, 1)
        this.$refs.logoInput.value = ''
      }
      if (fileType === 2) {
        this.clearErrors()
        this.imageUrl.splice(i, 1)
        this.uploadedImages.splice(i, 1)

        // assign and validate intro images to upload
        this.data.images = [...this.uploadedImages]
        this.introImageTypeError = false
        this.introImageSizeError = false
        for (let i = 0; i < this.data.images.length; i++) {
          this.validateIntroImagesToUpload(i)
        }

        this.$refs.introImageInput.value = ''
      }
      if (fileType === 3) {
        this.data.video.splice(i, 1)
        this.$refs.videoInput.value = ''
      }
    },
    dragover(event) {
      event.preventDefault()
    },
    clearErrors() {
      this.errors = []
    },
    async editCompanyProfile() {
      this.$v.data.$touch()
      if (this.uploadedImages?.length + this.uploadedIntroImage?.length > 5) {
        this.errors.images = ['5つ以下の写真をアップロードしてください']
        this.$forceUpdate()
      } else {
        this.clearErrors()
        const dataCompany = new FormData()
        // dataCompany.append('career', this.data.career)
        dataCompany.append('address', this.data.address)
        dataCompany.append('company_name', this.data.company_name)
        dataCompany.append('manager_name', this.data.manager_name)
        dataCompany.append('link_website', this.data.link_website)
        dataCompany.append('page_id', this.data.page_id ? this.data.page_id : '')
        dataCompany.append('description', this.data.description ? this.data.description : '')
        dataCompany.append('video_link', this.data.video_link)
        dataCompany.append('phone', this.data.phone)
        dataCompany.append('youtube', this.data.youtube)
        dataCompany.append('province_id', this.data.province)
        dataCompany.append('email', this.data.email)
        // for (let i = 0; i < this.data.removeIntroImage.length; i++) {
        //   const remove = this.data.removeIntroImage[i]

        //   dataCompany.append('remove_images[' + i + ']', remove)
        // }

        // for (let i = 0; i < this.uploadedImages.length; i++) {
        //   const file = this.uploadedImages[i]

        //   dataCompany.append('images[' + i + ']', file)
        // }

        if (this.data.logo[0]) {
          dataCompany.append('logo', this.data.logo[0])
        }

        if (this.$refs.videoInput) {
          dataCompany.append(
            'video',
            this.$refs.videoInput.files[0]
              ? this.$refs.videoInput.files[0]
              : 'null'
          )
        }
        if (!this.$v.data.$invalid) {
          try {
            await this.$repositories.profiles
              .editCompanyProfile(dataCompany, {
                header: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then((res) => {
                const data = this.$handleResponse(res)
                if (data.errors) {
                  this.errors = data.errors
                }
                if (res.status === 200) {
                  this.$auth.fetchUser()
                  this.$toast.success('Đã thay đổi thông tin công ty')
                  setTimeout(this.$router.push('/companies'), 2000)
                }
              })
          } catch (e) {
            this.errors = e.response.data.errors
          }
        } else if (this.$v.data.company_name.$error) {
          this.$nextTick(() => {
            this.$refs.companyNameTextBox.focus()
          })
        } else if (this.$v.data.phone.$error) {
          this.$nextTick(() => {
            this.$refs.phoneTextBox.focus()
          })
        } else if (this.$v.data.province.$error) {
          this.$nextTick(() => {
            document.getElementsByClassName('vs__search')[0].focus()
          })
        } else if (this.$v.data.address.$error) {
          this.$nextTick(() => {
            this.$refs.addressTextBox.focus()
          })
        } else if (this.$v.data.manager_name.$error) {
          this.$nextTick(() => {
            this.$refs.managerNameTextBox.focus()
          })
        } else if (this.$v.data.link_website.$error) {
          this.$nextTick(() => {
            this.$refs.linkWebsiteTextBox.focus()
          })
        }
      }
    },
    removeImagesOnServer(id, i) {
      this.clearErrors()
      this.uploadedIntroImage.splice(i, 1)
      this.data.removeIntroImage.push(id)
    },
    removeProfileImage() {
      this.uploadedProfileImage = ''
    },
    removeVideo() {
      this.uploadedVideo = ''
    },

    resetFormToStart() {
      this.$refs.closeConfirmCancelModal.click()
      this.$router.push('/companies')
    },

    getDetailAddress() {

    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/companies/edit-profile-company.scss';
</style>

<style lang="scss">
  @import "../../styles/pages/jobs/vue-select.scss";
</style>
