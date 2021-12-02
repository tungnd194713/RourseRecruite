<template>
  <main class="container my-3 my-lg-4">
    <form @submit.prevent="editCompanyProfile">
      <div class="row box-title mb-1 mb-lg-2">
        <div class="col-12 col-lg-3 mb-2 box-menu-left">
          <ul class="nav flex-column">
            <li class="nav-item rounded mb-2">
              <a class="nav-link active" href="#">
                <img class="" src="../../assets/images/icon_building.svg" />
                会社情報
              </a>
            </li>
            <li class="nav-item rounded">
              <a class="nav-link" href="#">
                <img class="" src="../../assets/images/icon_user_rounded.svg" />
                パスワード変更
              </a>
            </li>
          </ul>
        </div>
        <div class="col-12 col-lg-7">
          <div class="box-form-info pb-5">
            <h3 class="container">会社情報</h3>
            <div class="mt-3 mb-3 mt-lg-4 mb-lg-4 line"></div>
            <div class="container">
              <div class="form-group mb-2 mb-lg-3">
                <label for="company_name">会社名 <span>*</span></label>
                <input
                  id="company_name"
                  v-model="$v.data.company_name.$model"
                  type="text"
                  :class="{
                    invalid:
                      $v.data.company_name.$invalid &&
                      $v.data.company_name.$dirty,
                  }"
                  class="form-control"
                />
                <div v-if="$v.data.company_name.$error">
                  <div v-if="!$v.data.company_name.required" class="error">
                    これは必須項目なので、必ず入力してください
                  </div>
                  <div v-if="!$v.data.company_name.maxLength" class="error">
                    メールアドレスの形式で入力してください
                  </div>
                </div>
                <div v-if="errors.company_name" class="error">
                  {{ errors.company_name[0] }}
                </div>
              </div>
              <div class="form-group mb-2 mb-lg-3">
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
                    これは必須項目なので、必ず入力してください
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                  <label for="phone">電話番号 <span>*</span></label>
                  <input
                    id="phone"
                    v-model="$v.data.phone.$model"
                    type="tel"
                    :class="{
                      invalid: $v.data.phone.$invalid && $v.data.phone.$dirty,
                    }"
                    class="form-control"
                  />
                  <div v-if="$v.data.phone.$error">
                    <div v-if="!$v.data.phone.required" class="error">
                      これは必須項目なので、必ず入力してください
                    </div>
                    <div v-if="!$v.data.phone.maxLength" class="error">
                      9数字以上13数字以下で入力してください
                    </div>
                    <div v-if="!$v.data.phone.minLength" class="error">
                      9数字以上13数字以下で入力してください
                    </div>
                    <div v-if="!$v.data.phone.numbers" class="error">
                      numbers
                    </div>
                  </div>
                </div>
                <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                  <label for="number_members">従業員数 <span>*</span></label>
                  <input
                    id="number_members"
                    v-model="$v.data.number_members.$model"
                    type="number"
                    :class="{
                      invalid:
                        $v.data.number_members.$invalid &&
                        $v.data.number_members.$dirty,
                    }"
                    class="form-control"
                  />
                  <div v-if="$v.data.number_members.$error">
                    <div v-if="!$v.data.number_members.required" class="error">
                      これは必須項目なので、必ず入力してください
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-3 mb-3 mt-lg-4 mb-lg-4 line"></div>
              <h5>住所</h5>
              <div class="row">
                <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                  <label for="postal_code">郵便番号 <span>*</span></label>
                  <input
                    id="postal_code"
                    v-model="$v.data.postal_code.$model"
                    type="text"
                    :class="{
                      invalid:
                        $v.data.postal_code.$invalid &&
                        $v.data.postal_code.$dirty,
                    }"
                    class="form-control"
                  />
                  <div v-if="$v.data.postal_code.$error">
                    <div v-if="!$v.data.postal_code.required" class="error">
                      これは必須項目なので、必ず入力してください
                    </div>
                  </div>
                </div>
                <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                  <label for="province">都道府県 <span>*</span></label>
                  <select
                    id="province"
                    v-model="$v.data.province.$model"
                    :class="{
                      invalid:
                        $v.data.province.$invalid && $v.data.province.$dirty,
                    }"
                    class="form-select form-control"
                    aria-label="Default select provinces"
                  >
                    <option
                      v-for="(province, index) in provinces"
                      :key="index"
                      :value="index + 1"
                    >
                      {{ province.province_kanji }}
                    </option>
                  </select>
                  <div v-if="$v.data.province.$error">
                    <div v-if="!$v.data.province.required" class="error">
                      これは必須項目なので、必ず入力してください
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                  <label for="district">市区町村 <span>*</span></label>
                  <input
                    id="district"
                    v-model="$v.data.district.$model"
                    :class="{
                      invalid:
                        $v.data.district.$invalid && $v.data.district.$dirty,
                    }"
                    type="text"
                    class="form-control"
                  />
                  <div v-if="$v.data.district.$error">
                    <div v-if="!$v.data.district.required" class="error">
                      これは必須項目なので、必ず入力してください
                    </div>
                  </div>
                </div>
                <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                  <label for="address">現住所 <span>*</span></label>
                  <input
                    id="address"
                    v-model="$v.data.address.$model"
                    type="text"
                    :class="{
                      invalid:
                        $v.data.address.$invalid && $v.data.address.$dirty,
                    }"
                    class="form-control"
                  />
                  <div v-if="$v.data.address.$error">
                    <div v-if="!$v.data.address.required" class="error">
                      これは必須項目なので、必ず入力してください
                    </div>
                    <div v-if="!$v.data.address.maxLength" class="error">
                      200文字以下で入力してください
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-3 mb-5 mt-lg-4 mb-lg-5 line"></div>
              <div class="form-group mb-2 mb-lg-3">
                <label for="manager_name">担当者名 <span>*</span></label>
                <input
                  id="manager_name"
                  v-model="$v.data.manager_name.$model"
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
                    これは必須項目なので、必ず入力してください
                  </div>
                  <div v-if="!$v.data.manager_name.maxLength" class="error">
                    50文字以下で入力してください
                  </div>
                </div>
              </div>
              <div class="form-group mb-2 mb-lg-3">
                <label for="email">メールアドレス <span>*</span></label>
                <input
                  id="email"
                  v-model="data.email"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
              <div class="form-group col-12 mb-2 mb-lg-3">
                <label for="founded_year">創立年月日</label>
                <div class="input-group input-group-icon">
                  <span class="input-group-text input-group-text-pre">
                    <img src="../../assets/images/icon_calendar.svg" alt="" />
                  </span>
                  <date-picker
                    id="founded_year"
                    v-model="$v.data.founded_year.$model"
                    :class="{
                      invalid:
                        $v.data.founded_year.$invalid &&
                        $v.data.founded_year.$dirty,
                    }"
                    :clearable="false"
                    format="YYYY-MM-DD"
                    value-type="YYYY/MM/DD"
                    class="date-picker"
                    :placeholder="$v.data.founded_year.$model"
                  >
                    <i slot="icon-calendar"></i>
                  </date-picker>
                </div>
                <div v-if="$v.data.founded_year.$error">
                  <div v-if="!$v.data.founded_year.required" class="error">
                    これは必須項目なので、必ず入力してください
                  </div>
                </div>
              </div>
            </div>
            <div class="my-3 my-lg-4 line"></div>
            <div class="container">
              <div class="form-group mb-2 mb-lg-3">
                <label for="facebook_id">Facebookリンク <span>*</span></label>
                <div
                  class="input-group input-group-icon"
                  :class="{
                    invalid:
                      $v.data.facebook_id.$invalid &&
                      $v.data.facebook_id.$dirty,
                  }"
                >
                  <span class="input-group-text input-group-text-pre">
                    <img src="../../assets/images/icon_facebook.svg" alt="" />
                  </span>
                  <input
                    id="facebook_id"
                    v-model="$v.data.facebook_id.$model"
                    type="text"
                    class="form-control"
                  />
                </div>
                <div v-if="$v.data.facebook_id.$error">
                  <div v-if="!$v.data.facebook_id.required" class="error">
                    これは必須項目なので、必ず入力してください
                  </div>
                  <div v-if="!$v.data.facebook_id.facebook" class="error">
                    facebook
                  </div>
                </div>
              </div>
              <div class="form-group mb-2 mb-lg-3">
                <label for="link_website"
                  >会社の公式サイトのリンク <span>*</span></label
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
                    v-model="$v.data.link_website.$model"
                    type="text"
                    class="form-control"
                  />
                </div>
                <div v-if="$v.data.link_website.$error">
                  <div v-if="!$v.data.link_website.required" class="error">
                    これは必須項目なので、必ず入力してください
                  </div>
                  <div v-if="!$v.data.link_website.url" class="error">
                    URLの形式で入力してください
                  </div>
                </div>
              </div>
              <div class="form-group mb-2 mb-lg-3">
                <label for="description">会社概要・紹介 <span>*</span></label>
                <textarea
                  id="description"
                  v-model="$v.data.description.$model"
                  :class="{
                    invalid:
                      $v.data.description.$invalid &&
                      $v.data.description.$dirty,
                  }"
                  class="form-control"
                  rows="5"
                ></textarea>
                <div v-if="$v.data.description.$error">
                  <div v-if="!$v.data.description.required" class="error">
                    これは必須項目なので、必ず入力してください
                  </div>
                </div>
              </div>
              <div class="form-group mb-2 mb-lg-3">
                <label>ロゴ <span>*</span></label>
                <div
                  class="p-4 box-upload-file text-center rounded"
                  @dragover="dragover"
                  @drop="drop($event, profileImage)"
                >
                  <img
                    v-if="!data.profile_image.length"
                    src="../../assets/images/icon_upload_file.svg"
                    alt=""
                  />
                  <p class="m-0">
                    画像ファイルをドラグドロップ
                    <span @click="triggerProfileImageInput"
                      >、或いは選択してください</span
                    >
                  </p>
                  <div
                    v-if="uploadedProfileImage"
                    class="mt-4 w-100 row file-preview"
                  >
                    <img
                      :src="uploadedProfileImage"
                      alt=""
                      style="width: 100px; height: 100px"
                    />
                    <button
                      class="col-12 col-sm-3 col-md-6 form-control w-25"
                      type="button"
                      title="Remove file"
                      @click="removeProfileImage()"
                    >
                      remove
                    </button>
                  </div>
                  <div v-if="data.profile_image.length" class="mt-4 w-100">
                    <div
                      v-for="(file, index) in data.profile_image"
                      :key="index"
                      class="p-1 row file-preview"
                    >
                      <img
                        :src="profileImageUrl"
                        alt=""
                        style="width: 100px; height: 100px"
                      />
                      <button
                        class="col-12 col-sm-3 col-md-6 form-control w-25"
                        type="button"
                        title="Remove file"
                        @click="
                          remove(data.profile_image.indexOf(file), profileImage)
                        "
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </div>
                <input
                  id="profile_image"
                  ref="profileImageInput"
                  type="file"
                  class="d-none"
                  @change="onChange(profileImage)"
                />
                <div v-if="$v.data.profile_image.$error">
                  <div v-if="!$v.data.profile_image.required" class="error">
                    これは必須項目なので、必ず入力してください
                  </div>
                  <div v-if="!$v.data.profile_image.lessThanOne" class="error">
                    less than one
                  </div>
                </div>
                <small class="form-text text-muted float-end">
                  画像の拡張子：.png .jpg .jpeg .gif；画像の容量：2MB以下
                </small>
              </div>
              <div class="form-group mb-4 mb-lg-5">
                <label>会社紹介写真 <span>*</span></label>
                <div
                  class="p-4 box-upload-file text-center rounded"
                  @dragover="dragover"
                  @drop="drop($event, introImages)"
                >
                  <img
                    v-if="!data.images.length"
                    src="../../assets/images/icon_upload_file.svg"
                    alt=""
                  />
                  <p class="m-0">
                    画像ファイルをドラグドロップ
                    <span @click.prevent="triggerIntroImageInput"
                      >、或いは選択してください</span
                    >
                  </p>
                  <div v-if="uploadedIntroImage" class="mt-4 w-100">
                    <div
                      v-for="(file, index) in uploadedIntroImage"
                      :key="index"
                      class="p-1 row file-preview"
                    >
                      <img
                        :src="file.image_url"
                        alt=""
                        style="width: 100px; height: 100px"
                      />
                      <button
                        class="col-12 col-sm-3 col-md-6 form-control w-25"
                        type="button"
                        title="Remove file"
                        @click="removeImagesOnServer(file.id, index)"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                  <div v-if="data.images.length" class="mt-4 w-100">
                    <div
                      v-for="(file, index) in data.images"
                      :key="index"
                      class="p-1 row file-preview"
                    >
                      <img
                        :src="imageUrl[index]"
                        alt=""
                        style="width: 100px; height: 100px"
                      />
                      <button
                        class="col-12 col-sm-3 col-md-6 form-control w-25"
                        type="button"
                        title="Remove file"
                        @click="remove(data.images.indexOf(file), introImages)"
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
                  <div v-if="!$v.data.images.required" class="error">
                    これは必須項目なので、必ず入力してください
                  </div>
                  <div v-if="!$v.data.images.lessThanFive" class="error">
                    less than five
                  </div>
                </div>
                <small class="form-text text-muted float-end">
                  画像の拡張子：.png .jpg .jpeg .gif；画像の容量：2MB以下
                </small>
              </div>
              <div class="form-group mb-2 mb-lg-3">
                <label for="youtube"
                  >会社の公式サイトのリンク <span>*</span></label
                >
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
                    v-model="$v.data.youtube.$model"
                    type="text"
                    class="form-control"
                  />
                </div>
                <div v-if="$v.data.youtube.$error">
                  <div v-if="!$v.data.youtube.required" class="error">
                    これは必須項目なので、必ず入力してください
                  </div>
                  <div v-if="!$v.data.youtube.youtube" class="error">
                    need youtube link
                  </div>
                </div>
              </div>
              <div class="form-group mb-1 mb-lg-2">
                <input
                  id="video"
                  ref="videoInput"
                  type="file"
                  class="d-none"
                  @change="onChange(introVideo)"
                />
                <button
                  class="btn btn-upload-video border rounded-3"
                  @click="triggerVideoInput"
                >
                  <span>PCからアップロードする</span>
                  <img src="../../assets/images/icon_upload.svg" alt="" />
                </button>
                <div v-if="uploadedVideo" class="mt-4 w-100 row file-preview">
                  <iframe :src="uploadedVideo" frameborder="0"></iframe>

                  <button
                    class="col-12 col-sm-3 col-md-6 form-control w-25"
                    type="button"
                    title="Remove file"
                    @click="removeVideo()"
                  >
                    remove
                  </button>
                </div>
                <div v-if="data.video.length" class="mt-4 w-100">
                  <div
                    v-for="(file, index) in data.video"
                    :key="index"
                    class="p-1 row file-preview"
                  >
                    <iframe :src="videoUrl" frameborder="0"></iframe>
                    <button
                      class="col-12 col-sm-3 col-md-6 form-control w-25"
                      type="button"
                      title="Remove file"
                      @click="remove(data.video.indexOf(file), introVideo)"
                    >
                      remove
                    </button>
                  </div>
                </div>
                <div v-if="$v.data.video.$error">
                  <div v-if="!$v.data.video.required" class="error">
                    これは必須項目なので、必ず入力してください
                  </div>
                  <div v-if="!$v.data.video.lessThanOne" class="error">
                    less than one
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
              >
                <span class="px-4">プレビュー</span>
              </button>
              <button
                id="btn_edit_profile"
                type="submit"
                class="btn btn-lg border rounded-pill btn-edit-profile"
              >
                <span class="px-4">保存</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
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
  requiredIf,
} from 'vuelidate/lib/validators'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ja'
import theCareers from '~/constants/careers'

const PROFILEIMAGE = 1
const INTROIMAGES = 2
const INTROVIDEO = 3
const facebook = helpers.regex(
  'facebook',
  /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w-]*)?/
)
const youtube = helpers.regex(
  'youtube',
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/
)
const numbers = helpers.regex('numbers', /^[0-9]*$/)
const lessThanFive = (value) => value.length <= 5
const lessThanOne = (value) => value.length <= 1

export default {
  name: 'EditProfileCompany',
  components: { DatePicker },
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
        featured: '',
        link_website: '',
        facebook_id: '',
        description: '',
        video_link: '',
        phone: '',
        youtube: '',
        postal_code: '',
        district: '',
        province: '',
        images: [],
        video: [],
        profile_image: [],
        email: '',
        removeIntroImage: [],
      },
      country: {
        country_id: '1',
      },
      uploadedIntroImage: [],
      uploadedProfileImage: {},
      uploadedVideo: null,
      profileImageUrl: null,
      videoUrl: null,
      imageUrl: [],
      provinces: [],
      theCareers,
      careers: [],
      errors: [],
      profileImage: PROFILEIMAGE,
      introImages: INTROIMAGES,
      introVideo: INTROVIDEO,
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
        maxLength: maxLength(13),
        minLength: minLength(9),
        numbers,
      },
      career: {
        required,
      },
      number_members: {
        required,
      },
      postal_code: {
        required,
      },
      district: {
        required,
      },
      province: {
        required,
      },
      manager_name: {
        required,
        maxLength: maxLength(50),
      },
      facebook_id: {
        required,
        facebook,
      },
      link_website: {
        required,
        url,
      },
      description: {
        required,
      },
      images: {
        required: requiredIf(function () {
          return this.uploadedIntroImage.length === 0
        }),
        lessThanFive,
      },
      video: {
        required: requiredIf(function () {
          return (
            this.data.youtube === '' &&
            (this.uploadedVideo === null || this.uploadedVideo === '')
          )
        }),
        lessThanOne,
      },
      profile_image: {
        required: requiredIf(function () {
          return this.uploadedProfileImage === ''
        }),
        lessThanOne,
      },
      founded_year: {
        required,
      },
      youtube: {
        required: requiredIf(function () {
          return (
            this.data.video.length === 0 &&
            (this.uploadedVideo === null || this.uploadedVideo === '')
          )
        }),
        youtube,
      },
    },
  },

  head() {
    return {
      title: 'Edit Profile Company',
    }
  },

  computed: {},

  created() {
    this.careers = theCareers
    this.getProfileCompany()
    this.getProvinces(this.country)
  },

  methods: {
    async getProfileCompany() {
      const { data } = await this.$repositories.profiles.getCompanyProfile()

      if (data.video_link.includes('youtube')) {
        this.data.youtube = data.video_link
      } else {
        this.uploadedVideo = data.video_link
      }

      this.data.company_name = data.company_name
      this.data.manager_name = data.manager_name
      this.data.founded_year = data.founded_year
      this.data.number_members = data.number_members
      this.data.featured = data.featured
      this.data.link_website = data.link_website
      this.data.facebook_id = data.facebook_id
      this.data.description = data.description
      this.data.address = data.address
      this.data.phone = data.phone
      this.data.email = data.email
      this.data.postal_code = data.postal_code
      this.data.province = data.province_id
      this.data.district = data.district
      this.data.career = data.career
      this.uploadedIntroImage = data.images
      this.uploadedProfileImage = data.profile_image
    },
    async getProvinces(country) {
      const { data } = await this.$repositories.profiles.getProvinces(country)
      this.provinces = data
    },
    triggerProfileImageInput() {
      this.$refs.profileImageInput.click()
    },
    triggerIntroImageInput() {
      this.$refs.introImageInput.click()
    },
    triggerVideoInput(event) {
      event.preventDefault()
      this.$refs.videoInput.click()
    },
    onChange(fileType) {
      if (fileType === 1) {
        this.data.profile_image = [...this.$refs.profileImageInput.files]
        this.profileImageUrl = window.URL.createObjectURL(
          this.$refs.profileImageInput.files[0]
        )
      }
      if (fileType === 2) {
        this.data.images = [...this.$refs.introImageInput.files]
        for (let i = 0; i < this.$refs.introImageInput.files.length; i++) {
          const file = this.$refs.introImageInput.files[i]

          this.imageUrl[i] = window.URL.createObjectURL(file)
        }
      }
      if (fileType === 3) {
        this.data.video = [...this.$refs.videoInput.files]
        this.videoUrl = window.URL.createObjectURL(
          this.$refs.videoInput.files[0]
        )
      }
    },
    drop(event, fileType) {
      event.preventDefault()
      if (fileType === 1) {
        this.$refs.profileImageInput.files = event.dataTransfer.files
        this.onChange(fileType) // Trigger the onChange event manually
      }
      if (fileType === 2) {
        this.$refs.introImageInput.files = event.dataTransfer.files
        this.onChange(fileType) // Trigger the onChange event manually
      }
    },
    remove(i, fileType) {
      if (fileType === 1) {
        this.data.profile_image.splice(i, 1)
        this.$refs.profileImageInput.value = ''
      }
      if (fileType === 2) {
        this.data.images.splice(i, 1)
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
    async editCompanyProfile() {
      this.$v.data.$touch()

      const dataCompany = new FormData()
      dataCompany.append('career', this.data.career)
      dataCompany.append('address', this.data.address)
      dataCompany.append('company_name', this.data.company_name)
      dataCompany.append('manager_name', this.data.manager_name)
      dataCompany.append('founded_year', this.data.founded_year)
      dataCompany.append('number_members', this.data.number_members)
      dataCompany.append('featured', this.data.featured)
      dataCompany.append('link_website', this.data.link_website)
      dataCompany.append('facebook_id', this.data.facebook_id)
      dataCompany.append('description', this.data.description)
      dataCompany.append('video_link', this.data.video_link)
      dataCompany.append('phone', this.data.phone)
      dataCompany.append('youtube', this.data.youtube)
      dataCompany.append('nation', this.data.nation)
      dataCompany.append('postal_code', this.data.postal_code)
      dataCompany.append('district', this.data.district)
      dataCompany.append('province', this.data.province)
      dataCompany.append('email', this.data.email)
      dataCompany.append('remove_images', this.data.removeIntroImage)
      if (this.data.profile_image[0]) {
        dataCompany.append('profile_image', this.data.profile_image[0])
      }
      for (let i = 0; i < this.data.images.length; i++) {
        const file = this.data.images[i]

        dataCompany.append('images[' + i + ']', file)
      }
      if (this.$refs.videoInput.files[0]) {
        dataCompany.append('video', this.$refs.videoInput.files[0])
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
              if (!data.errors) {
                window.location.reload()
              } else {
                this.errors = data.errors
              }
            })
        } catch (e) {
          this.errors = e.response.data.errors
          console.log(this.errors)
        }
      }
    },
    removeImagesOnServer(id, i) {
      this.uploadedIntroImage.splice(i, 1)
      this.data.removeIntroImage.push(id)
    },
    removeProfileImage() {
      this.uploadedProfileImage = ''
    },
    removeVideo() {
      this.uploadedVideo = ''
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/pages/companies/edit-profile-company.scss';
</style>
