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
              <img class="img-fluid w-100 rounded-img" :src="job.job_image" alt="" />
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
                  <span
                    v-for="(item, index) in previewSkills"
                    :key="index"
                    class="badge"
                    >{{ item }}</span
                  >
                </div>
              </div>
              <div class="row mt-2">
								<div class="d-flex mb-2">
                  <span class="me-2">Chấp nhận đào tạo: </span>
                  <span v-if="job.accept_education"><b>Đào tạo trong {{ job.max_education_month }} tháng <span v-if="job.scholarship > 0">với học bổng {{ job.scholarship }}%</span></b></span>
                </div>
                <div class="d-flex mb-2">
                  <span class="me-2">
                    Lương:
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
                    Trụ sở:
                  </span>
                  <span class="flex-grow-1"> <b>{{ $t(provincesList[job.province_id]) }}</b></span>
                </div>
                <div class="d-flex">
                  <span class="me-2">
                    Thời gian đăng tuyển:
                  </span>
                  <span><b>{{ previewDateStart }} - {{ previewDateEnd }}</b></span>
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
              <h5 class="mb-4"><strong>Nội dung công việc</strong></h5>
              <div class="ps-3 word-break-break-all">
								<v-runtime-template :template="`<div>${job.content_work}</div>`"></v-runtime-template>
              </div>
            </div>
            <div class="d-block">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td class="head-table">Số người ứng tuyển</td>
                    <td class="pre-line word-break-break-all">
                      {{ job.number_recruitments}} người
                    </td>
                  </tr>
                  <tr>
                    <td class="head-table">Yêu cầu kỹ thuật</td>
                    <td class="word-break-break-all requirements">
                      <ul v-if="majorColleges.length">
                        <li v-for="(major, index) in majorColleges" :key="index">
                          Tốt nghiệp đại học
                          <span v-if="major.colleges.length">
                            <span v-for="(college, cindex) in major.colleges" :key="cindex">
                              {{ college.name }}
                              <span v-if="cindex !== major.colleges.length - 1" class="fw-bold">hoặc</span>
                            </span>
                          </span>
                           chuyên ngành
                          <span v-for="(iitem, iindex) in major.majors" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== major.majors.length - 1">hoặc</span>
                          </span>
                        </li>
                      </ul>
                      <ul v-if="beginnerSkills.length">
                        <li v-for="(skill, index) in beginnerSkills" :key="index">
                          Đã có kinh nghiệm
                          <span v-for="(iitem, iindex) in skill" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== skill.length - 1">hoặc</span>
                          </span>
                        </li>
                      </ul>
                      <ul v-if="intermediateSkills.length">
                        <li v-for="(skill, index) in intermediateSkills" :key="index">
                          Hiểu rõ về
                          <span v-for="(iitem, iindex) in skill" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== skill.length - 1">hoặc</span>
                          </span>
                        </li>
                      </ul>
                      <ul v-if="advancedSkills.length">
                        <li v-for="(skill, index) in advancedSkills" :key="index">
                          Thành thạo
                          <span v-for="(iitem, iindex) in skill" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== skill.length - 1">hoặc</span>
                          </span>
                        </li>
                      </ul>
                      <ul v-if="certificates.length">
                        <li v-for="(certificate, index) in certificates" :key="index">
                          Đạt được chứng chỉ
                          <span v-for="(iitem, iindex) in certificate" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== certificate.length - 1">hoặc</span>
                          </span>
                           hoặc tương đương
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td class="head-table">Điều kiện khác</td>
                    <td class="pre-line word-break-break-all">
                      <v-runtime-template :template="`<div>${job.conditions_apply}</div>`"></v-runtime-template>
                    </td>
                  </tr>
                  <tr>
                    <td class="head-table">Địa chỉ</td>
                    <td class="pre-line word-break-break-all">
                      {{ job.address_work}}
                    </td>
                  </tr>
                  <tr>
                    <td class="head-table">Thời gian làm việc</td>
                    <td class="pre-line word-break-break-all">
                      <v-runtime-template :template="`<div>${job.time_work}</div>`"></v-runtime-template>
                    </td>
                  </tr>
                  <tr>
                    <td>Phúc lợi</td>
                    <td class="pre-line word-break-break-all">
                      <v-runtime-template :template="`<div>${job.welfare_regime}</div>`"></v-runtime-template>
                    </td>
                  </tr>
                  <!--<tr>
                    <td>残業見込み、休日出勤見込み</td>
                    <td class="pre-line">{{ job.overtime === 'null' ? '' : job.overtime }}</td>
                  </tr>-->
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
        <h2 class="flex-grow-1">Danh sách ứng viên</h2>
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
            <td class="align-middle py-3 text-center">
                          <span v-if="item.status === 1"
                                :class="(perPage * (currentPage - 1)) + (index + 1) < 10 ? 'td-warning' : 'td-warning-large'"
                          >
                            未対応！
                            <img class="" src="../../../assets/images/icon_warning.svg"/>
                          </span>
              {{ (perPage * (currentPage - 1)) + (index + 1) }}
            </td>
            <td class="align-middle py-4">
              <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="popupCvUser(item)">
                {{ item.candidate.user.name }}
              </a>
            </td>
            <td class="align-middle py-3">{{item.jobs.title}}</td>
            <td class="align-middle py-3">{{$moment(item.created_at).format('YYYY-MM-DD')}}</td>
            <td class="align-middle py-3 col-status">
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
            <td class="align-middle py-3 col-card">
              {{ item.status ? residenceCardConfirm[item.residence_card_confirm] : residenceCardConfirm[0] }}
            </td>
            <td class="align-middle py-3 w-20">
              {{item.note}}
            </td>
            <td class="align-middle py-3 col-status">
              {{ item.status ? statusCandidateApply[item.status - 1] : statusCandidateApply[0] }}
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
          Không có dữ liệu
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
          - Chưa đọc: nền trắng, đã đọc: nền xanh nhạt
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
          <h5 class="d-flex justify-content-center align-items-center">氏名:
            <strong>{{ user_name }}</strong>
          </h5>
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
            <h1 class="confirm-text">Khởi tạo thành công!</h1>
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
      :message="message"
      @changeLanguageEvent="changeLanguage($event)"
    />

    <StatusStayInfoModal />

  </main>
</template>

<script>
	import VRuntimeTemplate from "v-runtime-template";
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
  import residenceCardConfirm from "~/constants/residenceCardConfirm";
  import statusCandidateApply from "~/constants/statusCandidateApply";
  import careerImages from "~/constants/careerImages";

  export default {
    name: "JobDetail",
    components: {
      Pagination,
      CvUserModal,
			VRuntimeTemplate,
      StatusStayInfoModal
    },
    mixins: [validationMixin],
    layout: 'auth',

    data() {
      return {
        message: '',
        message_vi: '',
        message_ja: '',
        cvType: 1,
        loadingListCv: '',
        loadingJobDetail: '',
        statusStays: theStatusStay,
        provincesList: theProvinces,
        hasVietnameseStaffLabelList: [
          'いない',
          'いる',
          '採用予定',
        ],
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
            text: '1 tháng',
            value: 1
          },
          {
            text: '2 tháng',
            value: 2
          },
          {
            text: '3 tháng',
            value: 3
          },
          {
            text: '4 tháng',
            value: 4
          },
          {
            text: '5 tháng',
            value: 5
          },
        ],
        careerList: [],
        job: {
          image_job: '',
          title: '',
          career: '',
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
            label: 'Tên ứng viên'
          },
          {
            key: 'job_title',
            label: 'Vị trí'
          },
          {
            key: 'apply_date',
            label: 'Ngày ứng tuyển'
          },
          {
            key: 'note',
            label: 'Nhận xét'
          },
          {
            key: 'status',
            label: 'Trạng thái'
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
          status : '',
          created_at : '',
          updated_at : '',
          candidate_educations_jobs : [],
          candidate_foreign_languages : [],
          candidate_certificates : [],
          job_image: '',
        },
        educationsOfCandidate: [],
        jobsOfCandidate: [],
        selectedItemId: 0,
        residenceCardConfirm,
        statusCandidateApply,
        careerImages,
        beginnerSkills: [],
        intermediateSkills: [],
        advancedSkills: [],
        certificates: [],
        majorColleges: [],
        previewSkills: [],
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
    // this.getListCV(this.currentPage)
  },

  methods: {
      onClickEditJob() {
				this.$router.push('/jobs/update/' + this.$route.params.id)
        // if (this.$moment() < this.$moment(this.job.date_start)) {
        //   this.$router.push('/jobs/update/' + this.$route.params.id)
        // } else {
        //   this.$toast.error('この求人を編集できません')
        // }
      },

      async getJobFromApi() {
        this.loadingJobDetail = true
        const {data} = await this.$repositories.jobs.getJob(this.$route.params.id)
        if (data.job) {
          this.job = Object.assign({}, data.job)
          this.job.job_image = this.job.image_job ? this.url_file + this.job.image_job : require(`@/assets/images/draft` + careerImages[this.job.career - 1]?.image)
          this.beginnerSkills = [...data.beginnerSkills]
          this.intermediateSkills = [...data.intermediateSkills]
          this.advancedSkills = [...data.advancedSkills]
          this.certificates = [...data.certificates]
          this.majorColleges = [...data.majorColleges]
          this.previewSkills = data.previewSkills.flat().map((item) => item.name).slice(0, 3);
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

    popupImageCard(residenceCardFront, residenceCardBackside) {
      this.image.residence_card_front = residenceCardFront
      this.image.residence_card_backside = residenceCardBackside
    },

    async changeLanguage(newLanguage) {
      if (newLanguage !== this.language) {
        this.language = newLanguage
        this.$i18n.locale = this.language
        if (this.language === this.lang_ja) {
          this.message = this.message_ja
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
          this.message = this.message_vi
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
      this.message_vi = candidateApply.message ? candidateApply.message : ''
      this.message_ja = candidateApply.message_jp ? candidateApply.message_jp : ''
      this.initJobsAndEducationsOfCandidate()
      this.changeLanguage(this.lang_ja)
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
  },
}
</script>

<style scoped>
@import '../../../styles/pages/jobs/detail_job.scss';
@import '../../../styles/pages/jobs/cv_user.scss';
@import '../../../styles/pages/candidates_apply/list.scss';
</style>
<style>
p {
	margin-bottom: 0 !important;
}
</style>

<style lang="scss">
.detail-job-content {
	li {
		height: 21px;
	}
	p {
		margin: 0;
	}
}
.requirements {
  ul {
    margin-bottom: 0 !important;
  }
}
</style>
