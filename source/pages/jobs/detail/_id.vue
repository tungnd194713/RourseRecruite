<template>
  <main class="container my-3 my-lg-4">

    <div v-if="loadingListCv" class="card detail-job-card position-relative">
      <div class="outer-spinner">
        <div class="loader"></div>
      </div>
    </div>

    <div v-if="!loadingListCv" class="card detail-job-card position-relative">
      <div class="detail-job-content">
        <button id="btn-edit" class="btn p-0" @click="onClickEditJob()">
          <img
            width="30"
            height="30"
            src="../../../assets/images/icon_edit.svg"
          />
        </button>
        <div class="mt-0 mt-lg-2 pt-0 pt-lg-3 pb-2">
          <div class="row">
            <div class="col-12 col-lg-6 pe-3 pe-xl-5">
              <img class="img-fluid w-100" :src="previewImageJobUrl" alt="" />
            </div>
            <div class="col-12 col-lg-6 mt-4 mt-lg-0">
              <h1 class="mb-3 mb-lg-4"> {{ job.title}}</h1>
<!--              <div class="row mb-4">-->
<!--                <div class="col-12">-->
<!--                  <button id="btn-apply" class="btn btn-secondary w-100 h4">応募する</button>-->
<!--                </div>-->
<!--              </div>-->
              <div class="row">
                <div class="d-block">
                  <span class="badge">{{ previewFormRecruitment() }}</span>
                  <span class="badge">{{
                    $t(careerList[$store.getters['loggedInUser'].career - 1])
                  }}</span>
                </div>
                <div class="d-block">
                  <span
                    v-for="(item, index) in job.status_stay"
                    :key="index"
                    class="badge"
                    >{{ $t(statusStays[item]) }}</span
                  >
                  <img
                    width="22"
                    height="22"
                    src="../../../assets/images/icon_question.svg"
                    alt=""
                    data-bs-toggle="modal"
                    data-bs-target="#statusStayInfoModal"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="d-flex mb-2">
                  <span class="me-2">
                    <img
                      width="20"
                      height="20"
                      src="../../../assets/images/icon_money_outline.svg"
                    />
                  </span>
                  <span
                    ><b
                      >{{
                        job.salary_min > 0
                          ? Intl.NumberFormat().format(job.salary_min) + ' - '
                          : 'Up to'
                      }}
                      {{ Intl.NumberFormat().format(job.salary_max) }}</b
                    ></span
                  >
                </div>
                <div class="d-flex mb-2">
                  <span class="me-2">
                    <img
                      width="20"
                      height="20"
                      src="../../../assets/images/icon_address.svg"
                    />
                  </span>
                  <span class="flex-grow-1"> {{ $t(provincesList[job.province_id]) }} - 日本</span>
                </div>
                <div class="d-flex">
                  <span class="me-2">
                    <img
                      width="20"
                      height="20"
                      src="../../../assets/images/icon_clock.svg"
                    />
                  </span>
                  <span>{{ previewDateStart }} - {{ previewDateEnd }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="moreContent" class="collapse">
        <div class="detail-job-content py-0">
          <hr class="my-0" />
          <div class="py-3">
            <div class="d-block mb-5">
              <h5>仕事内容</h5>
              <div class="ps-3 pre-line">
                {{ job.content_work }}
              </div>
            </div>
            <div class="d-block">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td>採用人数</td>
                    <td class="pre-line">{{ job.number_recruitments}}人</td>
                  </tr>
                  <tr>
                    <td>応募条件</td>
                    <td class="pre-line">{{ job.conditions_apply}}</td>
                  </tr>
                  <tr>
                    <td>勤務地</td>
                    <td class="pre-line">{{ job.address_work}}</td>
                  </tr>
                  <tr>
                    <td>勤務時間</td>
                    <td class="pre-line">{{ job.time_work}}</td>
                  </tr>
                  <tr>
                    <td>休日</td>
                    <td class="pre-line">{{ job.holidays}}</td>
                  </tr>
                  <tr>
                    <td>休憩時間 </td>
                    <td class="pre-line">{{ job.break_time}}</td>
                  </tr>
                  <tr>
                    <td>福利厚生</td>
                    <td class="pre-line">{{ job.welfare_regime}}</td>
                  </tr>
                  <tr>
                    <td>ベトナム人在籍状況</td>
                    <td class="pre-line">{{ job.has_vietnamese_staff ? 'はい': 'いいえ'}}</td>
                  </tr>
                  <tr>
                    <td>残業見込み、休日出勤見込み</td>
                    <td class="pre-line">{{ job.overtime === 'null' ? '' : job.overtime }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-0" />
      <button
        class="btn bg-transparent btn-more"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#moreContent"
        aria-expanded="false"
        aria-controls="moreContent"
      >
        <img
          width="20"
          height="20"
          src="../../../assets/images/icon_angle_down.svg"
        />
      </button>
    </div>

    <div class="container mt-3 mt-lg-4 list-user">
      <div class="d-flex align-items-end title mb-1">
        <h2 class="flex-grow-1">応募者一覧</h2>
        <span>
          <span class="me-0 me-lg-2">
            <a class="text-decoration-none" href="https://lapse-immi.moj.go.jp/ZEC/appl/e0/ZEC2/pages/FZECST021.aspx">在留資格はこのリンクから確認できます</a>
          </span>
        </span>
      </div>
      <div class="row table-responsive box-table">
        <table class="table table-list-cv">
          <thead>
            <tr>
              <th v-for="header in fields" :key="header.key">
                {{ header.label }}
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items" :key="item.id" :class="item.read === 1 ? 'active' : ''">
            <td class="align-middle py-3">
                          <span v-if="!(item.read || isWarningUnRead(item.created_at))"
                                :class="(perPage * (currentPage - 1)) + (index + 1) < 10 ? 'td-warning' : 'td-warning-large'"
                          >
                            3日以上未対応
                            <img class="" src="../../../assets/images/icon_warning.svg"/>
                          </span>
              {{ (perPage * (currentPage - 1)) + (index + 1) }}
            </td>
            <td class="align-middle py-3">
              <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="popupCvUser(item)">
                {{ item.candidate.user.name }}
              </a>
            </td>
            <td class="align-middle py-3">{{item.jobs.title}}</td>
            <td class="align-middle py-3">{{$moment(item.created_at).format('YYYY-MM-DD')}}</td>
            <td class="align-middle py-3">
              {{item.candidate.form_recruitment}}
              <template v-if="item.candidate.form_recruitment == 1">フルタイム</template>
              <template v-else>アルバイト</template>
            </td>
            <td class="align-middle py-3">
              <a href="#" data-bs-toggle="modal" data-bs-target="#popUpId"
                 @click="popupImageCard(
                                   item.candidate.residence_card_front,
                                   item.candidate.residence_card_backside
                                   )">
                <img v-if="item.read === 0" class="" src="../../../assets/images/icon_postcard_active.svg"/>
                <img v-else class="" src="../../../assets/images/icon_postcard_inactive.svg"/>
              </a>
            </td>
            <td class="align-middle py-3">
              <select v-model="item.residence_card_confirm"
                      class="form-select active rounded-3 confirm-select"
                      @change="confirmUpdate(item)"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmUpdateResidenceCardModal"
                >
                <option value="0">未選択</option>
                <option value="1">承認</option>
                <option value="2">非承認</option>
              </select>
            </td>
            <td class="align-middle py-3 w-20">
              {{item.note}}
            </td>
            <td class="align-middle py-3">
              <select v-model="item.status"
                      class="form-select active rounded-3 status-select"
                      @change="confirmUpdateStatus(item)"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmUpdateStatusModal"
              >
                <option value="0">未選択</option>
                <option value="1">未対応</option>
                <option value="2">折り返し待ち</option>
                <option value="3">面接待ち</option>
                <option value="4">採用</option>
                <option value="5">不採用（連絡取れず）</option>
                <option value="6">不採用</option>
              </select>
            </td>
            <td class="align-middle py-3">
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#popUpCheck"
                @click="popupUpdateStatus({
                                    id: item.id,
                                    residence_card_confirm: item.residence_card_confirm,
                                    status: item.status,
                                    note: item.note,
                                    user_name: item.candidate.user.name
                                    })"
              >
                <img class="edit-icon" src="../../../assets/images/icon_edit.svg"/>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="totalItems === 0 && loadingListCv" class="outer-spinner">
          <div class="loader"></div>
        </div>
        <h4
          v-if="totalItems === 0 && !loadingListCv"
          class="text-center w-100 p-3 m-0 bg-white border-bottom border-1"
        >
          データなし
        </h4>
      </div>
      <Pagination
        :current-page="currentPage"
        :per-page="perPage"
        :total-items="totalItems"
        :page-count="pageCount"
        @nextPage="pageChangeHandle('next')"
        @previousPage="pageChangeHandle('previous')"
        @customPage="pageChangeHandle"
      >
        <p>
          * 未読：白い背景、既読：浅い青色の背景<br />
          * 3日以上未読の履歴書があったら、リマインダーが表示される。
        </p>
      </Pagination>
    </div>

    <div
      id="popUpId"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="popUpIdLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <a data-bs-dismiss="modal" class="btn-close" aria-label="Close">
              <img src="../../../assets/images/icon_modal_close.svg" alt="" />
            </a>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <h5 id="popUpIdLabel" class="modal-title">在留カード</h5>
          </div>
          <div class="modal-body d-flex justify-content-around">
            <a
              class="residence-card-image"
              :style="{
                backgroundImage: `url(${url_file}${image.residence_card_front})`
              }"
            >
            </a>
            <a
              class="residence-card-image"
              :style="{
                backgroundImage: `url(${url_file}${image.residence_card_backside})`
              }"
            >
            </a>
          </div>
        </div>
      </div>
    </div>

    <div
      id="popUpCheck"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="popUpCheckLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content check-content">
          <div class="modal-header">
            <a
              ref="closePopUpUpdateStatusBtnRef"
              data-bs-dismiss="modal"
              class="btn-close"
              aria-label="Close">
              <img src="../../../assets/images/icon_modal_close.svg" alt="" />
            </a>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <h5 id="popUpCheckLabel" class="modal-title check-title">
              応募者の応募状態更新
            </h5>
          </div>
          <div class="modal-body pop-check-input">
            <label for="confirmation">在留資格確認</label>
            <select
              id="confirmation"
              v-model="dataUpdateStatus.residence_card_confirm"
              class="form-select rounded-pill pop-check-select"
              aria-label="Confirmation"
            >
              <option value="0" disabled>未選択</option>
              <option value="1">承認</option>
              <option value="2">非承認</option>
            </select>
            <label for="status">ステータス</label>
            <select
              id="status"
              v-model="dataUpdateStatus.status"
              class="form-select rounded-pill pop-check-select"
              aria-label="Status"
            >
              <option value="0" disabled>未選択</option>
              <option value="1">未対応</option>
              <option value="2">折り返し待ち</option>
              <option value="3">面接待ち</option>
              <option value="4">採用</option>
              <option value="5">不採用（連絡取れず）</option>
              <option value="6">不採用</option>
            </select>
            <label for="remarks">備考</label>
            <textarea
              id="remarks"
              v-model="dataUpdateStatus.note"
              class="form-control"
              @input="$v.dataUpdateStatus.note.$touch()"
              @blur="$v.dataUpdateStatus.note.$touch()"
            />
            <div class="error-text">{{ dataUpdateStatusNoteErrors[0]}}</div>
            <div class="submit-btn">
              <button
                id="apply-btn"
                class="btn btn-primary mt-4 rounded-pill"
                @click="updateStatus()"
              >
                更新
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="popUpSuccess"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="popUpSuccessLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content success-content">
          <div class="modal-header">
            <a data-bs-dismiss="modal" class="btn-close" aria-label="Close">
              <img src="../../../assets/images/icon_modal_close.svg" alt="" />
            </a>
          </div>
          <div
            class="
              d-flex
              justify-content-center
              align-items-center
              flex-column
              mt-4
            "
          >
            <img
              class="success-icon"
              src="../../../assets/images/icon_success.svg"
            />
            <h1 class="confirm-text">新規求人登録が完了しました。</h1>
          </div>
        </div>
      </div>
    </div>

    <CvUserModal
      :candidate="candidate"
      :language="language"
      :educations-of-candidate="educationsOfCandidate"
      :jobs-of-candidate="jobsOfCandidate"
      :id-row="idRow"
      :cv-type="cvType"
      @changeLanguageEvent="changeLanguage($event)"
    />

    <StatusStayInfoModal />

    <!-- Modal Update Residence Card-->
    <div
      id="confirmUpdateResidenceCardModal"
      class="modal fade update-modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content box-modal">
          <div class="modal-header border-0">
            <img
              id="closeConfirmUpdateResidenceCardModal"
              class="close-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
              src="../../../assets/images/ic_exit.svg"
              alt=""
            />
          </div>
          <div class="modal-body-content my-3">
            <h3 class="text-center modal-body-text">
              ステータスを変更してもよろしいか？
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
              class="btn btn-cancel-update rounded-pill w-20 mt-4 mb-4"
              data-bs-dismiss="modal"
            >
              いいえ
            </button>
            <button
              type="button"
              class="btn btn-ok-update btn-custom rounded-pill w-20"
              @click="
                  updateCard(selectedItemId, {
                    residence_card_confirm: residenceCardConfirm,
                  })
              "
            >
              はい
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->

    <!-- Modal Update Status Card-->
    <div
      id="confirmUpdateStatusModal"
      class="modal fade update-modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content box-modal">
          <div class="modal-header border-0">
            <img
              id="closeConfirmUpdateStatusModal"
              class="close-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
              src="../../../assets/images/ic_exit.svg"
              alt=""
            />
          </div>
          <div class="modal-body-content my-3">
            <h3 class="text-center modal-body-text">
              ステータスを変更してもよろしいか？
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
              class="btn btn-cancel-update rounded-pill w-20 mt-4 mb-4"
              data-bs-dismiss="modal"
            >
              いいえ
            </button>
            <button
              type="button"
              class="btn btn-ok-update btn-custom rounded-pill w-20"
              @click="updateItemStatus(selectedItemId, { status: status })"
            >
              はい
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->

  </main>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import { validationMixin } from 'vuelidate'
  import {
    maxLength
  } from 'vuelidate/lib/validators'
  import Pagination from "~/components/Pagination"
  import CvUserModal from "~/components/modal/CvUserModal";
  import StatusStayInfoModal from "~/components/StatusStayInfoModal"
  import defaultCareers from '~/constants/careers'
  import defaultInCvUser from "~/constants/defaultInCvUser"
  import theStatusStay from "~/constants/statusStay"
  import theProvinces from "~/constants/provinces"

  export default {
    name: "JobDetail",
    components: {
      Pagination,
      CvUserModal,
      StatusStayInfoModal
    },
    mixins: [validationMixin],
    layout: 'auth',

    data() {
      return {
        cvType: 1,
        loadingListCv: '',
        loadingJobDetail: '',
        statusStays: theStatusStay,
        provincesList: theProvinces,
        typePlanList:[
          {
            text: 'A',
            value: 1
          },
          {
            text: 'B',
            value: 2
          },
          {
            text: 'C',
            value: 3
          },
          {
            text: 'Standard plan',
            value: 4
          },
        ],
        displayMonthList: [
          {
            text: '1 month',
            value: 1
          },
          {
            text: '2 months',
            value: 2
          },
          {
            text: '3 months',
            value: 3
          },
          {
            text: '4 months',
            value: 4
          },
          {
            text: '5 months',
            value: 5
          },
        ],
        formRecruitmentList: [
          {
            text: 'フルタイム',
            value: 1
          },
          {
            text: '2-アルバイト',
            value: 2
          },
        ],
        statusStayList: [
          {
            text: '特定技能',
            value: 1
          },
          {
            text: '技能実習',
            value: 2
          },
          {
            text: '特定活動',
            value: 3
          },
          {
            text: '留学生',
            value: 4
          },
          {
            text: '技術・人文知識・国際業務',
            value: 5
          },
          {
            text: '定住',
            value: 6
          },
          {
            text: '永住',
            value: 7
          },
          {
            text: '家族滞在',
            value: 8
          }
        ],
        careerList: [],
        job: {
          image_job: '',
          title: '',
          date_start: '',
          type_plan: '',
          display_month: '',
          form_recruitment: '',
          status_stay: [],
          number_recruitments: '',
          salary_max: '',
          salary_min: '',
          content_work: '',
          conditions_apply: '',
          province_id: 1,
          address_work: '',
          time_work: '',
          break_time: '',
          holidays: '',
          welfare_regime: '',
          has_vietnamese_staff: '',
          overtime: ''
        },
        url_file: process.env.URL_FILE,
        items: [],
        fields: [
          {
            key: 'id',
            label: 'No'
          },
          {
            key: 'candidate_name',
            label: '氏名'
          },
          {
            key: 'job_title',
            label: '求人タイトル'
          },
          {
            key: 'apply_date',
            label: '応募日'
          },
          {
            key: 'employment_form',
            label: '雇用形態'
          },
          {
            key: 'residence_card',
            label: '在留カード'
          },
          {
            key: 'status_stay',
            label: '在留資格確認'
          },
          {
            key: 'note',
            label: '備考'
          },
          {
            key: 'status',
            label: 'ステータス'
          }
        ],
        currentPage: 1,
        perPage: 20,
        totalItems: 0,
        pageCount: 1,
        condition: {
          key_word: '',
          apply_date: '',
          status_stay: ''
        },
        idRow: -1,
        dataUpdateStatus: {
          residence_card_confirm: 0,
          status: 0,
          note: '',
        },
        user_name: '',
        image: {
          residence_card_front: '',
          residence_card_backside: ''
        },
        lang_ja: defaultInCvUser.lang_ja,
        lang_vi: defaultInCvUser.lang_vi,
        language: '',
        idCandidate: -1,
        defaultCandidate : {
          id: '',
          user_id: '',
          first_name : '',
          name : '',
          nationality : '',
          gender : '',
          birthday : '',
          email : '',
          profile_image : '',
          language : '',
          phone_number : '',
          address : '',
          married_status : '',
          dependent_person : '',
          health : '',
          visa_type : '',
          visa_date : '',
          residence_card_front : '',
          residence_card_backside : '',
          strength : '',
          stay_experience_date : '',
          stay_experience_purpose : '',
          reason_apply : '',
          file_cv_upload : '',
          desire_change_jobs : '',
          translate_jp : '',
          postal_code : '',
          province_id : '',
          district : '',
          status : '',
          created_at : '',
          updated_at : '',
          candidate_educations_jobs : [],
          candidate_foreign_languages : [],
          candidate_certificates : []
        },
        candidate : {
          id: '',
          user_id: '',
          first_name : '',
          name : '',
          nationality : '',
          gender : '',
          birthday : '',
          email : '',
          profile_image : '',
          language : '',
          phone_number : '',
          address : '',
          married_status : '',
          dependent_person : '',
          health : '',
          visa_type : '',
          visa_date : '',
          residence_card_front : '',
          residence_card_backside : '',
          strength : '',
          stay_experience_date : '',
          stay_experience_purpose : '',
          reason_apply : '',
          file_cv_upload : '',
          desire_change_jobs : '',
          translate_jp : '',
          postal_code : '',
          province_id : '',
          district : '',
          status : '',
          created_at : '',
          updated_at : '',
          candidate_educations_jobs : [],
          candidate_foreign_languages : [],
          candidate_certificates : []
        },
        educationsOfCandidate: [],
        jobsOfCandidate: [],
        selectedItemId: 0,
        residenceCardConfirm: '',
        status: '',
      }
    },

    validations: {
      dataUpdateStatus: {
        note: {
          maxLength: maxLength(500)
        },
      },
    },

    head () {
      return {title: '求人詳細 | 求人'}
    },

    computed: {
      previewImageJobUrl() {
        return this.job.image_job ? process.env.API_URL.replace('api', 'storage') + this.job.image_job : ''
      },

      previewDateStart() {
        return this.$moment(this.job.date_start).format('YYYY/MM/DD')
      },

      previewDateEnd() {
        return this.$moment(this.job.date_end).format('YYYY/MM/DD')
      },

      dataUpdateStatusNoteErrors () {
        const errors = []
        if (!this.$v.dataUpdateStatus.note.$dirty) return errors
        !this.$v.dataUpdateStatus.note.maxLength && errors.push('500文字以下で入力してください')
        return errors
      },
    },

  created() {
    this.careerList = defaultCareers
    this.getJobFromApi()
    this.getListCV(this.currentPage)
  },

  methods: {
    filterPreviewFormRecruitment(element) {
      return element.value === this.job.form_recruitment
    },

    previewFormRecruitment() {
      return this.job.form_recruitment
        ? this.formRecruitmentList.filter(this.filterPreviewFormRecruitment)[0].text
        : null
    },

    filterPreviewStatusStay(element) {
      for (let i = 0; i < this.job.status_stay.length; i++) {
        if (element.value === this.job.status_stay[i]) {
          return true
        }
      }
      return false
    },

    previewStatusStay() {
      return this.statusStayList.filter(this.filterPreviewStatusStay)
    },

      onClickEditJob() {
        if (this.$moment() < this.$moment(this.job.date_start)) {
          this.$router.push('/jobs/update/' + this.$route.params.id)
        } else {
          this.$toast.error('この求人を編集できません')
        }
      },

      async getJobFromApi() {
        this.loadingJobDetail = true
        const {data} = await this.$repositories.jobs.getJob(this.$route.params.id)
        if (data.job) {
          this.job = Object.assign({}, data.job)
          this.job.status_stay = data.job.status_stay.split(',')
        } else {
          this.$router.push('/jobs')
        }
        this.loadingJobDetail = false
      },

      async getListCV(currentPage) {
        const params = {
          jobId: this.$route.params.id,
          currentPage
        }
        this.loadingListCv = true
        const {data} = await this.$repositories.candidatesApply.getListCvApplyToAJob(params)
        this.loadingListCv = false

        this.items = data.data
        this.totalItems = data.total
        this.currentPage = data.current_page
        this.perPage = data.per_page
        this.pageCount =
          this.totalItems > 0 ? parseInt(data.total / data.per_page, 10) + 1 : 1
    },

    pageChangeHandle(value) {
      switch (value) {
        case 'next':
          this.currentPage = this.next
          break
        case 'previous':
          this.currentPage = this.previous
          break
        default:
          this.currentPage = value
      }
      this.getListCV(this.currentPage)
    },

    isWarningUnRead(date) {
      const now = this.$moment().format('YYYY-MM-DD')
      date = this.$moment(date)

      return now < date.add(3, 'days').format('YYYY-MM-DD')
    },

      popupUpdateStatus(data) {
        this.idRow = data.id
        this.dataUpdateStatus.residence_card_confirm = data.residence_card_confirm
        this.dataUpdateStatus.status = data.status
        this.dataUpdateStatus.note = data.note
        this.user_name = data.user_name
      },

      async updateStatus() {
        this.$v.dataUpdateStatus.$touch()
        if (!this.$v.dataUpdateStatus.$invalid) {
          return await this.$repositories.candidatesApply.updateStatus(
            this.idRow,
            this.dataUpdateStatus
          ).then(res => {
            this.idRow = -1;
            if (res.status === 200) {
              this.$refs.closePopUpUpdateStatusBtnRef.click()
              this.$toast.success('応募者の応募状態・' + this.user_name + 'の更新が完了しました')
              this.getListCV(this.currentPage);
            }
            if (res.response && res.response.status === 500) {
              this.$toast.error('候補者の申請状況と候補者名の更新は完了していません。')
            }
          })
        }
      },

    async updateCard(id, data) {
      return await this.$repositories.candidatesApply
        .updateStatus(id, data)
        .then((res) => {
          this.idRow = -1
          if (res.status === 200) {
            this.$toast.success('応募者の応募状態・更新が完了しました')
            this.getListCV(this.currentPage)
          } else {
            this.$toast.success(
              '候補者の申請状況と候補者名の更新は完了していません。'
            )
          }
        })
      },

    async updateItemStatus(id, data) {
      return await this.$repositories.candidatesApply
        .updateStatus(id, data)
        .then((res) => {
          this.idRow = -1
          if (res.status === 200) {
            this.$toast.success('応募者の応募状態・更新が完了しました')
            this.getListCV(this.currentPage)
          } else {
            this.$toast.success(
              '候補者の申請状況と候補者名の更新は完了していません。'
            )
          }
        })
    },

    popupImageCard(residenceCardFront, residenceCardBackside) {
      this.image.residence_card_front = residenceCardFront
      this.image.residence_card_backside = residenceCardBackside
    },

    async changeLanguage(newLanguage) {
      if (newLanguage !== this.language) {
        this.language = newLanguage
        this.$i18n.locale = this.language
        if (this.language === this.lang_ja) {
          await this.$repositories.candidatesApply
            .translateCvCandidate(this.idRow)
            .then((res) => {
              if (res.status === 200) {
                this.candidate = Object.assign({}, res.data)
                this.initJobsAndEducationsOfCandidate()
              }
            })
        }
        if (this.language === this.lang_vi) {
          this.candidate = Object.assign({}, this.defaultCandidate)
          this.initJobsAndEducationsOfCandidate()
        }
      }
    },

      async popupCvUser(candidateApply) {
        this.language = this.lang_vi
        this.$i18n.locale = this.language
        this.idRow = candidateApply.id
        this.defaultCandidate = Object.assign({}, candidateApply.candidate)
        this.candidate = Object.assign({}, this.defaultCandidate)
        this.cvType = candidateApply.cv_type
        this.initJobsAndEducationsOfCandidate()
        if (candidateApply.read === 0) {
          await this.$repositories.candidatesApply.updateStatus(this.idRow, { read: 1}).then(res => {
            if (res.status === 200) {
              this.getListCV(this.currentPage);
            }
          })
        }
      },

    initJobsAndEducationsOfCandidate() {
      this.educationsOfCandidate =
        this.candidate.candidate_educations_jobs.filter(function (element) {
          return element.type === 1
        })
      this.jobsOfCandidate = this.candidate.candidate_educations_jobs.filter(
        function (element) {
          return element.type === 2
        }
      )
    },

    confirmUpdate(item) {
      this.selectedItemId = item.id;
      this.residenceCardConfirm = item.residence_card_confirm
    },

    confirmUpdateStatus(item) {
      this.selectedItemId = item.id;
      this.status = item.status
    },
  },
}
</script>

<style scoped>
@import '../../../styles/pages/jobs/detail_job.scss';
@import '../../../styles/pages/jobs/cv_user.scss';
@import '../../../styles/pages/candidates_apply/list.scss';
</style>
