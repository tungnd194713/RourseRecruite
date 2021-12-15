<template>
  <main class="container my-3 my-lg-4">

    <div class="card detail-job-card position-relative">
      <div class="detail-job-content">
        <button id="btn-edit" class="btn p-0" @click="onClickEditJob()">
          <img width="30" height="30" src="../../../assets/images/icon_edit.svg"/>
        </button>
        <div class="mt-0 mt-lg-2 pt-0 pt-lg-3 pb-2">
          <div class="row">
            <div class="col-12 col-lg-6 pe-3 pe-xl-5">
              <img class="img-fluid w-100" :src="previewImageJobUrl" alt="">
            </div>
            <div class="col-12 col-lg-6 mt-4 mt-lg-0">
              <h1 class="mb-3 mb-lg-4"> {{ job.title}}</h1>
              <div class="row mb-4">
                <div class="col-12">
                  <button id="btn-apply" class="btn btn-secondary w-100 h4">応募する</button>
                </div>
              </div>
              <div class="row">
                <div class="d-block">
                  <span class="badge">{{ previewFormRecruitment()}}</span>
                  <span class="badge">{{ $t(careerList[$store.getters['loggedInUser'].career - 1])}}</span>
                </div>
                <div class="d-block">
                  <span v-for="item in previewStatusStay()" :key="item.value" class="badge">{{ item.text}}</span>
                  <img
                    width="22"
                    height="22"
                    src="../../../assets/images/icon_question.svg"
                    alt=""
                    data-bs-toggle="modal"
                    data-bs-target="#statusStayInfoModal"
                  >
                </div>
              </div>
              <div class="row mt-2">
                <div class="d-flex mb-2">
                  <span class="me-2">
                    <img width="20" height="20" src="../../../assets/images/icon_money_outline.svg">
                  </span>
                  <span><b>{{ job.salary_min ? Intl.NumberFormat().format(job.salary_min) : 0}} - {{ Intl.NumberFormat().format(job.salary_max)}}</b></span>
                </div>
                <div class="d-flex mb-2">
                  <span class="me-2">
                    <img width="20" height="20" src="../../../assets/images/icon_address.svg">
                  </span>
                  <span class="flex-grow-1"> {{ job.address_work}}</span>
                </div>
                <div class="d-flex">
                  <span class="me-2">
                    <img width="20" height="20" src="../../../assets/images/icon_clock.svg">
                  </span>
                  <span>{{ previewDateStart}} - {{ previewDateEnd}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="moreContent" class="collapse">
        <div class="detail-job-content py-0">
          <hr class="my-0">
          <div class="py-3">
            <div class="d-block mb-5">
              <h5>仕事内容</h5>
              <div class="ps-3">
                {{ job.content_work}}
              </div>
            </div>
            <div class="d-block">
              <table class="table table-bordered">
                <tbody>
                <tr>
                  <td>採用人数</td>
                  <td>{{ job.number_recruitments}}人</td>
                </tr>
                <tr>
                  <td>応募条件</td>
                  <td>{{ job.conditions_apply}}</td>
                </tr>
                <tr>
                  <td>勤務地</td>
                  <td>{{ job.address_work}}</td>
                </tr>
                <tr>
                  <td>勤務時間</td>
                  <td>{{ job.time_work}}</td>
                </tr>
                <tr>
                  <td>休日</td>
                  <td>{{ job.holidays}}</td>
                </tr>
                <tr>
                  <td>休憩時間 </td>
                  <td>{{ job.break_time}}</td>
                </tr>
                <tr>
                  <td>福利厚生</td>
                  <td>{{ job.welfare_regime}}</td>
                </tr>
                <tr>
                  <td>ベトナム人在籍状況</td>
                  <td>{{ job.has_vietnamese_staff ? 'はい': 'いいえ'}}</td>
                </tr>
                <tr>
                  <td>残業見込み、休日出勤見込み</td>
                  <td>{{ job.overtime}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-0">
      <button class="btn bg-transparent btn-more" type="button" data-bs-toggle="collapse"
              data-bs-target="#moreContent" aria-expanded="false" aria-controls="moreContent">
        <img width="20" height="20" src="../../../assets/images/icon_angle_down.svg">
      </button>
    </div>

    <div class="container mt-3 mt-lg-4 list-user">
      <div class="d-flex align-items-end title mb-1">
        <h2 class="flex-grow-1">応募者一覧</h2>
        <span>
                <span class="me-0 me-lg-2">在留資格はこのリンクから確認できます</span>
                <span class="ms-3 ms-lg-5">
                    <a class="text-decoration-none" href="#">abc.com</a>
                </span>
            </span>
      </div>
      <div class="row table-responsive box-table">
        <table class="table table-list-cv">
          <thead>
          <tr>
            <th v-for="header in fields" :key="header.key">{{header.label}}</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items" :key="item.id" :class="item.read === 1 ? 'active' : ''">
            <td class="align-middle py-3">
                          <span v-if="!(item.read || isWarningUnRead(item.created_at))" class="td-warning">
                            3日以上未対応
                            <img class="" src="../../../assets/images/icon_warning.svg"/>
                          </span>
              {{index + 1}}
            </td>
            <td class="align-middle py-3">
              <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="popupCvUser(item)">
                {{item.candidate.name}}
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
                <img
                  class=""
                  :src="url_file+item.candidate.residence_card_front"
                />
              </a>
            </td>
            <td class="align-middle py-3">
              <select v-model="item.residence_card_confirm"
                      class="form-select active rounded-3 confirm-select"
                      @change="updateCard(item.id, {residence_card_confirm: item.residence_card_confirm})">
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
                      @change="updateItemStatus(item.id, {status: item.status})">
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
                                    note: item.note
                                    })"
              >
                <img class="edit-icon" src="../../../assets/images/icon_edit.svg"/>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <Pagination :current-page="currentPage"
                  :per-page="perPage"
                  :total-items="totalItems"
                  :page-count="pageCount"
                  @nextPage="pageChangeHandle('next')"
                  @previousPage="pageChangeHandle('previous')"
                  @customPage="pageChangeHandle"
      />
    </div>

    <div id="popUpId"
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
              <img src="../../../assets/images/icon_modal_close.svg" alt=""/>
            </a>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <h5 id="popUpIdLabel" class="modal-title">在留カード</h5>
          </div>
          <div class="modal-body d-flex justify-content-around">
            <a href="#"
            ><img
              class="link-modal"
              src="../../../assets/images/icon_large_post_card.svg"
              alt=""
            /></a>
            <a href="#"
            ><img
              class="link-modal"
              src="../../../assets/images/icon_text_card.svg"
              alt=""
            /></a>
          </div>
        </div>
      </div>
    </div>

    <div id="popUpCheck"
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
            <a data-bs-dismiss="modal" class="btn-close" aria-label="Close">
              <img src="../../../assets/images/icon_modal_close.svg" alt=""/>
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
              class="form-select rounded-pill pop-check-select"
              aria-label="Confirmation"
            >
              <option selected></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <label for="status">ステータス</label>
            <select
              id="status"
              class="form-select rounded-pill pop-check-select"
              aria-label="Status"
            >
              <option selected></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <label for="remarks">備考</label>
            <textarea
              id="remarks"
              class="form-control"
            ></textarea>
            <div class="submit-btn">
              <button
                id="apply-btn"
                class="btn btn-primary mt-4 rounded-pill"
                data-bs-toggle="modal"
                data-bs-target="#popUpSuccess"
                @click="updateStatus()"
              >
                更新
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="popUpSuccess"
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
              <img src="../../../assets/images/icon_modal_close.svg" alt=""/>
            </a>
          </div>
          <div class="d-flex justify-content-center align-items-center flex-column mt-4">
            <img class="success-icon" src="../../../assets/images/icon_success.svg"/>
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
      @changeLanguageEvent="changeLanguage($event)"
    />

    <StatusStayInfoModal />

  </main>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import Pagination from "~/components/Pagination"
  import CvUserModal from "~/components/modal/CvUserModal";
  import StatusStayInfoModal from "~/components/StatusStayInfoModal"
  import defaultCareers from '~/constants/careers'
  import defaultInCvUser from "~/constants/defaultInCvUser"

  export default {
    name: "JobDetail",
    components: {
      Pagination,
      CvUserModal,
      StatusStayInfoModal},
    layout: 'auth',

    data() {
      return {
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
            text: '1-フルタイム',
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
        jobsOfCandidate: []
      }
    },

    head () {
      return {title: '求人詳細'}
    },

    computed: {
      previewImageJobUrl() {
        return this.job.image_job ? process.env.API_URL.replace('api', 'storage') + this.job.image_job : ''
      },

      previewDateStart() {
        return this.$moment(this.job.date_start).format('YYYY/MM/DD')
      },

      previewDateEnd() {
        return this.$moment(this.job.date_start).add(this.job.display_month, 'M').format('YYYY/MM/DD')
      }
    },

    created() {
      this.careerList = defaultCareers
      this.getJobFromApi()
      this.getListCV(this.currentPage);
    },

    methods: {
      filterPreviewFormRecruitment(element) {
        return element.value === this.job.form_recruitment
      },

      previewFormRecruitment() {
        return this.job.form_recruitment ? this.formRecruitmentList.filter(this.filterPreviewFormRecruitment)[0].text : null
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
        // if (this.$moment() < this.$moment(this.job.date_start)) {
          this.$router.push(`/jobs/update/${this.$route.params.id}`)
        // } else {
        //   this.$toast.error('Can not edit job')
        // }
      },

      async getJobFromApi() {
        const {data} = await this.$repositories.jobs.getJob(this.$route.params.id)
        if (data.job) {
          this.job = Object.assign({}, data.job)
          this.job.status_stay = data.job.status_stay.split(',')
        } else {
          this.$router.push('/jobs')
        }
      },

      async getListCV(currentPage) {
        const condition = {...this.condition, currentPage};

        const {data} = await this.$repositories.candidatesApply.getListCV(condition);

        this.items = data.data;
        this.totalItems = data.total;
        this.currentPage = data.current_page;
        this.perPage = data.per_page;
        this.pageCount = (this.totalItems > 0) ? parseInt(data.total / data.per_page, 10) + 1 : 1;
      },

      pageChangeHandle(value) {
        switch (value) {
          case 'next':
            this.currentPage = this.next;
            break;
          case 'previous':
            this.currentPage = this.previous;
            break;
          default:
            this.currentPage = value
        }
        this.getListCV(this.currentPage);
      },

      isWarningUnRead(date) {
        const now = this.$moment().format('YYYY-MM-DD');
        date = this.$moment(date);

        return now < date.add(3, 'days').format('YYYY-MM-DD')
      },

      popupUpdateStatus(data) {
        this.idRow = data.id
        this.dataUpdateStatus.residence_card_confirm = data.residence_card_confirm
        this.dataUpdateStatus.status = data.status
        this.dataUpdateStatus.note = data.note
      },

      async updateStatus() {
        return await this.$repositories.candidatesApply.updateStatus(
          this.idRow,
          this.dataUpdateStatus
        ).then(res => {
          this.idRow = -1;
          if (res.status === 200) {
            this.$toast.success('応募者の応募状態・更新が完了しました')
            this.getListCV(this.currentPage);
          } else {
            this.$toast.success('候補者の申請状況と候補者名の更新は完了していません。')
          }
        })
      },

      async updateCard(id, data) {
        return await this.$repositories.candidatesApply.updateStatus(
          id, data
        ).then(res => {
          this.idRow = -1;
          if (res.status === 200) {
            this.$toast.success('応募者の応募状態・更新が完了しました')
            this.getListCV(this.currentPage);
          } else {
            this.$toast.success('候補者の申請状況と候補者名の更新は完了していません。')
          }
        })
      },

      async updateItemStatus(id, data) {
        return await this.$repositories.candidatesApply.updateStatus(
          id, data
        ).then(res => {
          this.idRow = -1;
          if (res.status === 200) {
            this.$toast.success('応募者の応募状態・更新が完了しました')
            this.getListCV(this.currentPage);
          } else {
            this.$toast.success('候補者の申請状況と候補者名の更新は完了していません。')
          }
        })
      },

      popupImageCard(residenceCardFront, residenceCardBackside) {
        this.image.residence_card_front = residenceCardFront;
        this.image.residence_card_backside = residenceCardBackside
      },

      async changeLanguage(newLanguage) {
        if (newLanguage !== this.language) {
          this.language = newLanguage
          this.$i18n.locale = this.language
          if (this.language === this.lang_ja) {
            await this.$repositories.candidatesApply.translateCvCandidate(this.idRow).then(res => {
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

      popupCvUser(candidateApply) {
        this.language = this.lang_vi
        this.$i18n.locale = this.language
        this.idRow = candidateApply.id
        this.defaultCandidate = Object.assign({}, candidateApply.candidate)
        this.candidate = Object.assign({}, this.defaultCandidate)
        this.initJobsAndEducationsOfCandidate()
      },

      initJobsAndEducationsOfCandidate() {
        this.educationsOfCandidate = this.candidate.candidate_educations_jobs.filter(function (element) {
          return element.type === 1
        })
        this.jobsOfCandidate = this.candidate.candidate_educations_jobs.filter(function (element) {
          return element.type === 2
        })
      }
    }
  }
</script>

<style scoped>
  @import '../../../styles/pages/jobs/detail_job.scss';
  @import '../../../styles/pages/jobs/cv_user.scss';
  @import '../../../styles/pages/candidates_apply/list.scss';
</style>
