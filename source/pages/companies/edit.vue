<template>
  <main class="container my-3 my-lg-4">
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
            <div class="form-group mb-2 mb-lg-3">
              <label for="address">現住所 <span>*</span></label>
              <input
                id="address"
                v-model="$v.data.address.$model"
                type="text"
                :class="{
                  invalid: $v.data.address.$invalid && $v.data.address.$dirty,
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
                <label for="nation">国 <span>*</span></label>
                <select
                  id="nation"
                  v-model="$v.data.nation.$model"
                  :class="{
                    invalid: $v.data.nation.$invalid && $v.data.nation.$dirty,
                  }"
                  class="form-select form-control"
                  aria-label="Default select nations"
                >
                  <option selected value="1">Japan</option>
                </select>
                <div v-if="$v.data.nation.$error">
                  <div v-if="!$v.data.nation.required" class="error">
                    これは必須項目なので、必ず入力してください
                  </div>
                </div>
              </div>

              <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                <label for="postal_code">郵便番号 <span>*</span></label>
                <input
                  id="postal_code"
                  v-model="$v.data.postal_code.$model"
                  type="number"
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
            </div>
            <div class="row">
              <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                <label for="prefecture">都道府県 <span>*</span></label>
                <input
                  id="prefecture"
                  v-model="$v.data.prefecture.$model"
                  :class="{
                    invalid:
                      $v.data.prefecture.$invalid && $v.data.prefecture.$dirty,
                  }"
                  type="text"
                  class="form-control"
                />
                <div v-if="$v.data.prefecture.$error">
                  <div v-if="!$v.data.prefecture.required" class="error">
                    これは必須項目なので、必ず入力してください
                  </div>
                </div>
              </div>

              <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                <label for="municipality">市区町村 <span>*</span></label>
                <input
                  id="municipality"
                  v-model="$v.data.municipality.$model"
                  :class="{
                    invalid:
                      $v.data.municipality.$invalid &&
                      $v.data.municipality.$dirty,
                  }"
                  type="text"
                  class="form-control"
                />
                <div v-if="$v.data.municipality.$error">
                  <div v-if="!$v.data.municipality.required" class="error">
                    これは必須項目なので、必ず入力してください
                  </div>
                </div>
              </div>
              <div class="form-group mb-2 mb-lg-3">
                <label for="building_number">番地 <span>*</span></label>
                <input
                  id="building_number"
                  v-model="$v.data.building_number.$model"
                  :class="{
                    invalid:
                      $v.data.building_number.$invalid &&
                      $v.data.building_number.$dirty,
                  }"
                  type="text"
                  class="form-control"
                />
                <div v-if="$v.data.building_number.$error">
                  <div v-if="!$v.data.building_number.required" class="error">
                    これは必須項目なので、必ず入力してください
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
              </div>
            </div>
            <div class="form-group mb-2 mb-lg-3">
              <label for="email">メールアドレス <span>*</span></label>
              <input
                id="email"
                type="text"
                class="form-control"
                value="hung.tran@kiaisoft.com"
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
                  v-model="data.founded_year"
                  format="YYYY-MM-DD"
                  type="date"
                  class="date-picker"
                >
                  <i slot="icon-calendar"> </i>
                </date-picker>
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
                    $v.data.facebook_id.$invalid && $v.data.facebook_id.$dirty,
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
              </div>
            </div>
            <div class="form-group mb-2 mb-lg-3">
              <label for="description">会社概要・紹介 <span>*</span></label>
              <textarea
                id="description"
                v-model="$v.data.description.$model"
                :class="{
                  invalid:
                    $v.data.description.$invalid && $v.data.description.$dirty,
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
              <div class="p-4 box-upload-file text-center rounded" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                <img src="../../assets/images/icon_upload_file.svg" alt="" />
                <p class="m-0">
                  画像ファイルをドラグドロップ
                  <span @click="triggerProfileImageInput"
                    >、或いは選択してください</span
                  >
                </p>
              </div>
              <input
                id="profile_image"
                ref="profileImageInput"
                type="file"
                @change="onChange"
              />
              <div class="invalid-feedback">Please choose a ロゴ.</div>
              <small class="form-text text-muted float-end">
                画像の拡張子：.png .jpg .jpeg .gif；画像の容量：2MB以下
              </small>
            </div>
            <div class="form-group mb-4 mb-lg-5">
              <label>会社紹介写真 <span>*</span></label>
              <div class="p-4 box-upload-file text-center rounded">
                <img src="../../assets/images/icon_upload_file.svg" alt="" />
                <p class="m-0">
                  画像ファイルをドラグドロップ
                  <span @click="triggerIntroductionImageInput"
                    >、或いは選択してください</span
                  >
                </p>
              </div>
              <input
                id="introduction_image"
                ref="introductionImageInput"
                type="file"
                multiple
                class="d-none"
              />
              <div class="invalid-feedback">Please choose a 会社紹介写真.</div>
              <small class="form-text text-muted float-end">
                画像の拡張子：.png .jpg .jpeg .gif；画像の容量：2MB以下
              </small>
            </div>
            <div class="form-group mb-2 mb-lg-3">
              <label for="youtube"
                >会社の公式サイトのリンク <span>*</span></label
              >
              <div class="input-group input-group-icon">
                <span class="input-group-text input-group-text-pre">
                  <img src="../../assets/images/icon_ytlink.svg" alt="" />
                </span>
                <input id="youtube" type="text" class="form-control" />
                <div class="invalid-feedback">
                  Please choose a 会社の公式サイトのリンク.
                </div>
              </div>
            </div>
            <div class="form-group mb-1 mb-lg-2">
              <input id="video" ref="videoInput" type="file" class="d-none" />
              <button
                class="btn btn-upload-video border rounded-3"
                @click="triggerVideoInput"
              >
                <span>PCからアップロードする</span>
                <img src="../../assets/images/icon_upload.svg" alt="" />
              </button>
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
              type="button"
              class="btn btn-lg border rounded-pill btn-edit-profile"
            >
              <span class="px-4">保存</span>
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
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ja'
import theCareers from '~/constants/careers'

export default {
  name: 'EditProfileCompany',
  components: { DatePicker },
  mixins: [validationMixin],
  layout: 'auth',

  data() {
    return {
      data: {
        theCareers,
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
        nation: '',
        postal_code: '',
        municipality: '',
        prefecture: '',
        building_number: '',
        images: [],
        careers: [],
        video: [],
        profile_image: [],
      },
      errors: [],
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
      },
      career: {
        required,
      },
      number_members: {
        required,
      },
      nation: {
        required,
      },
      postal_code: {
        required,
      },
      municipality: {
        required,
      },
      prefecture: {
        required,
      },
      building_number: {
        required,
      },
      manager_name: {
        required,
      },
      facebook_id: {
        required,
      },
      link_website: {
        required,
      },
      description: {
        required,
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
  },

  methods: {
    triggerProfileImageInput() {
      this.$refs.profileImageInput.click()
    },
    triggerIntroductionImageInput() {
      this.$refs.introductionImageInput.click()
    },
    triggerVideoInput() {
      this.$refs.videoInput.click()
    },
    onChange() {
      this.filelist = [...this.$refs.file.files]
    },
    remove(i) {
      this.filelist.splice(i, 1)
    },
    dragover(event) {
      event.preventDefault()
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100')
        event.currentTarget.classList.add('bg-green-300')
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add('bg-gray-100')
      event.currentTarget.classList.remove('bg-green-300')
    },
    drop(event) {
      event.preventDefault()
      this.$refs.file.files = event.dataTransfer.files
      this.onChange() // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add('bg-gray-100')
      event.currentTarget.classList.remove('bg-green-300')
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/pages/companies/edit-profile-company.scss';
</style>
