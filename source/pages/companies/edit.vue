<template>
  <main class="container my-3 my-lg-4">
    <form @submit.prevent="editCompanyProfile">
      <div class="row box-title mb-1 mb-lg-2">
        <div class="col-12 col-lg-3 mb-2 box-menu-left">
          <ul class="nav flex-column">
            <li class="nav-item rounded mb-2">
              <NuxtLink class="nav-link active" to="/companies/edit">
                <img class="" src="../../assets/images/icon_building.svg" />
                会社情報
              </NuxtLink>
            </li>
            <li class="nav-item rounded">
              <NuxtLink class="nav-link" to="/companies/change-password">
                <img class="" src="../../assets/images/icon_user_rounded.svg" />
                パスワード変更
              </NuxtLink>
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
                    これは必須項目なので、必ず入力してください
                  </div>
                  <div v-if="!$v.data.company_name.maxLength" class="error">
                    100文字以上入力する場合
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
                      これは必須項目なので、必ず入力してください
                    </div>
                    <div
                      v-if="
                        !$v.data.phone.maxLength ||
                        !$v.data.phone.minLength ||
                        !$v.data.phone.phone
                      "
                      class="error"
                    >
                      9数字以上13数字以下で入力してください
                    </div>
                  </div>
                  <div v-if="errors.phone" class="error">
                    {{ errors.phone[0] }}
                  </div>
                </div>
                <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                </div>
              </div>
              <div class="mt-3 mb-3 mt-lg-4 mb-lg-4 line"></div>
              <h5>住所</h5>
              <div class="row">
                <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                  <label for="postal-code-1">郵便番号 <span>*</span></label>
                  <div class="d-flex postal-code">
                    <input
                      id="postal-code-1"
                      v-model.trim="$v.data.postal_code_1.$model"
                      type="text"
                      :class="{
                        invalid:
                          $v.data.postal_code_1.$invalid &&
                          $v.data.postal_code_1.$dirty,
                      }"
                      class="form-control w-25 pr-1"
                      placeholder="xxx"
                      maxlength="3"
                    />
                    <p class="mx-2 mt-2">ー</p>
                    <input
                      id="postal-code-2"
                      v-model.trim="$v.data.postal_code_2.$model"
                      type="text"
                      class="form-control w-50"
                      placeholder="xxxx"
                      @blur="$v.data.postal_code_2.$touch()"
                      maxlength="4"
                    />
                  </div>
                  <div v-if="$v.data.postal_code_1.$error">
                    <div
                      v-if="!$v.data.postal_code_1.numeric"
                      class="invalid-feedback error"
                    >
                      郵便番号の形式で入力してください
                    </div>
                  </div>
                  <div v-if="$v.data.postal_code_2.$error">
                    <div
                      v-if="!$v.data.postal_code_2.numeric"
                      class="invalid-feedback error"
                    >
                      郵便番号の形式で入力してください
                    </div>
                  </div>
                </div>
                <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                  <label for="province">都道府県 <span>*</span></label>
                  <!--<select
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
                      v-for="(province, index) in provinces.slice(1)"
                      :key="index"
                      :value="index + 1"
                    >
                      {{ $t(province) }}
                    </option>
                  </select>-->

                  <input v-model="$v.data.province.$model"
                         type="text"
                         class="form-control"
                  />
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
                    v-model.trim="$v.data.district.$model"
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
                    <div v-if="!$v.data.district.maxLength" class="error">
                      200文字以下で入力してください
                    </div>
                  </div>
                </div>
                <div class="form-group col-12 col-lg-6 mb-2 mb-lg-3">
                  <label for="address">番地 <span>*</span></label>
                  <input
                    id="address"
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
                <label for="page_id">FacebookファンページのメッセージID</label>
                <div
                        class="input-group input-group-icon"
                        :class="{
                          invalid:
                            $v.data.page_id.$invalid &&
                            $v.data.page_id.$dirty,
                        }"
                >
                  <span class="input-group-text input-group-text-pre">
                    <img src="../../assets/images/ic_mess.svg" alt="" />
                  </span>
                  <input
                          id="page_id"
                          v-model.trim="$v.data.page_id.$model"
                          type="text"
                          class="form-control"
                  />
                </div>
                <div v-if="$v.data.page_id.$error">
                  <div v-if="!$v.data.page_id.maxLength" class="error">
                    100文字以上入力する場合
                  </div>
                </div>
                <div class="m-1">
                  <NuxtLink class="light text-decoration-none" to="/" target="_blank">
                    FacebookのメッセージIDを取得する説明
                  </NuxtLink>
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
                    v-model.trim="$v.data.link_website.$model"
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
                <label for="description">会社概要・紹介</label>
                <textarea
                  id="description"
                  v-model="data.description"
                  class="form-control"
                  rows="5"
                ></textarea>
              </div>
              <div class="form-group mb-2 mb-lg-3">
                <label>ロゴ</label>
                <div
                  class="p-4 box-upload-file text-center rounded"
                  @dragover="dragover"
                  @drop="drop($event, logo)"
                >
                  <img
                    v-if="!data.logo.length && !uploadedProfileImage"
                    src="../../assets/images/icon_upload_file.svg"
                    alt=""
                  />
                  <p class="m-0">
                    画像ファイルをドラグドロップ
                    <span
                      class="open-file-btn"
                      @click="triggerProfileImageInput"
                      >、或いは選択してください</span
                    >
                  </p>
                  <div
                    v-if="uploadedProfileImage"
                    class="mt-4 w-100 row file-preview"
                  >
                    <div
                      class="image-company"
                      :style="{
                        backgroundImage: `url(${url_api_file + uploadedProfileImage})`
                      }"
                    ></div>
                  </div>
                  <div v-if="data.logo.length" class="mt-4 w-100">
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
                      画像はpng / jpg / jpeg / gifの形式でアプロードしてください
                    </div>
                    <div v-if="!v.size.imageSize" class="error">
                      2MB以下の写真をアップロードしてください
                    </div>
                  </div>
                </div>
                <small class="form-text text-muted float-end">
                  画像の拡張子：.png .jpg .jpeg .gif；画像の容量：2MB以下
                </small>
              </div>
              <div class="form-group mb-4 mb-lg-5">
                <label>会社紹介写真</label>
                <div
                  class="p-4 box-upload-file text-center rounded"
                  @dragover="dragover"
                  @drop="drop($event, introImages)"
                >
                  <img
                    v-if="!uploadedImages.length && !uploadedIntroImage.length"
                    src="../../assets/images/icon_upload_file.svg"
                    alt=""
                  />
                  <p class="m-0">
                    画像ファイルをドラグドロップ
                    <span
                      class="open-file-btn"
                      @click.prevent="triggerIntroImageInput"
                      >、或いは選択してください</span
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
                  <div v-if="uploadedImages.length" class="mt-4 w-100">
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
<!--                  <div-->
<!--                    v-for="(v, index) in $v.data.images.$each.$iter"-->
<!--                    :key="index"-->
<!--                  >-->
<!--                    <div v-if="!v.name.imageRule" class="error">-->
<!--                      画像はpng / jpg / jpeg / gifの形式でアプロードしてください-->
<!--                    </div>-->
<!--                    <div v-if="!v.size.imageSize" class="error">-->
<!--                      2MB以下の写真をアップロードしてください-->
<!--                    </div>-->
<!--                  </div>-->

                  <div v-if="introImageTypeError" class="error">
                    画像はpng / jpg / jpeg / gifの形式でアプロードしてください
                  </div>
                  <div v-if="introImageSizeError" class="error">
                    2MB以下の写真をアップロードしてください
                  </div>
                </div>
                <div v-if="errors.images" class="error">
                  {{ errors.images[0] }}
                </div>
                <small class="form-text text-muted float-end">
                  画像の拡張子：.png .jpg .jpeg .gif；画像の容量：2MB以下
                </small>
              </div>
              <div
                v-if="data.video.length == 0"
                class="form-group mb-2 mb-lg-3"
              >
                <label for="youtube">Youtube動画のURL</label>
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
                    URLの形式で入力してください
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
                <button
                  class="btn btn-upload-video border rounded-3"
                  @click="triggerVideoInput"
                >
                  <span>PCからアップロードする</span>
                  <img src="../../assets/images/icon_upload.svg" alt="" />
                </button>
                <div v-if="data.video.length" class="mt-4 w-100">
                  <div
                    v-for="(file, index) in data.video"
                    :key="index"
                    class="p-1 row file-preview"
                  >
                    <iframe :src="videoUrl" frameborder="0"></iframe>
                  </div>
                </div>
                <div v-if="$v.data.video.$error">
                  <div
                    v-for="(v, index) in $v.data.video.$each.$iter"
                    :key="index"
                  >
                    <div v-if="!v.name.videoRule" class="error">
                      動画はAVI/ FLV/ WMV/MOV/ MP4の形式でアプロードしてください
                    </div>
                    <div v-if="!v.size.videoSize" class="error">
                      100MB以下の動画をアップロードしてください
                    </div>
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
                <span class="px-4">キャンセル</span>
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
              編集内容をキャンセルしてもよろしいですか?
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
              type="button"
              class="btn btn-secondary-custom rounded-pill w-20 mt-4 mb-4"
              data-bs-dismiss="modal"
            >
              いいえ
            </button>
            <button
              type="button"
              class="btn btn-danger rounded-pill w-20"
              @click="resetFormToStart"
            >
              はい
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
  helpers, numeric,
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
        postal_code: '',
        postal_code_1: '',
        postal_code_2: '',
        district: '',
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
      career: {
        required,
      },
      postal_code_1: {
        numeric,
      },
      postal_code_2: {
        numeric,
      },
      district: {
        required,
        maxLength: maxLength(200),
      },
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

  watch: {
    'data.postal_code_1': {
      handler(newVal) {
        if (this.data.postal_code_1.length === 3 && this.data.postal_code_2.length === 4) {
          this.data.postal_code = this.data.postal_code_1 + this.data.postal_code_2
        }
      },
      deep: true
    },
    'data.postal_code_2': {
      handler(newVal) {
        if (this.data.postal_code_2.length === 4 && this.data.postal_code_1.length === 3) {
          this.data.postal_code = this.data.postal_code_1 + this.data.postal_code_2
        }
      },
      deep:true
    },
    'data.postal_code': {
      handler(newVal) {
        if (this.data.postal_code > 0) {
          this.getDetailAddress();
        }
      },
      deep:true
    },
  },

  head() {
    return {
      title: '会社情報編集 | 求人',
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
      this.data.postal_code = data.postal_code
      this.data.province = data.province_id
      this.data.district = data.district
      this.data.career = data.career
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
      if (this.uploadedImages.length + this.uploadedIntroImage.length > 5) {
        this.errors.images = ['5つ以下の写真をアップロードしてください']
        this.$forceUpdate()
      } else {
        this.clearErrors()
        const dataCompany = new FormData()
        dataCompany.append('career', this.data.career)
        dataCompany.append('address', this.data.address)
        dataCompany.append('company_name', this.data.company_name)
        dataCompany.append('manager_name', this.data.manager_name)
        dataCompany.append('link_website', this.data.link_website)
        dataCompany.append('page_id', this.data.page_id ? this.data.page_id : '')
        dataCompany.append('description', this.data.description ? this.data.description : '')
        dataCompany.append('video_link', this.data.video_link)
        dataCompany.append('phone', this.data.phone)
        dataCompany.append('youtube', this.data.youtube)
        dataCompany.append('postal_code', this.data.postal_code)
        dataCompany.append('district', this.data.district)
        dataCompany.append('province_id', this.data.province)
        dataCompany.append('email', this.data.email)
        for (let i = 0; i < this.data.removeIntroImage.length; i++) {
          const remove = this.data.removeIntroImage[i]

          dataCompany.append('remove_images[' + i + ']', remove)
        }

        for (let i = 0; i < this.uploadedImages.length; i++) {
          const file = this.uploadedImages[i]

          dataCompany.append('images[' + i + ']', file)
        }

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
                  this.$toast.success('会社情報の更新に成功しました。')
                  setTimeout(this.$router.push('/companies'), 2000)
                }
              })
          } catch (e) {
            this.errors = e.response.data.errors
          }
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
      window.location.reload()
    },

    async getDetailAddress() {
      if (this.data.postal_code) {
        await this.$axios.get('https://apis.postcode-jp.com/api/v5/postcodes/' + this.data.postal_code).then((res) => {
          if(res.data.length > 0) {
            this.data.province = res.data[0].pref;
            this.data.district = res.data[0].city;
            this.data.address = res.data[0].allAddress;
          }
        })
      }

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
