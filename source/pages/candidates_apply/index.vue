<template>
  <main class="container my-3 my-lg-4">
    <div class="row box-title mb-1 mb-lg-2">
      <div class="col-md-6 col-6">
        <h4 class="page-header-title">Danh sách ứng viên</h4>
      </div>
    </div>

    <div class="row box-search mt-2 px-3 pt-3 pb-2 rounded-pill">
      <div class="col-12 col-lg-3 mb-2">
        <input
          v-model="condition.key_word"
          type="text"
          class="form-control rounded-pill"
          placeholder="Vị trí"
        />
      </div>
      <div class="col-12 col-lg-3 mb-2">
        <date-picker
          id="apply_date"
          v-model="condition.apply_date"
          :clearable="false"
          format="YYYY-MM-DD"
          value-type="YYYY/MM/DD"
          class="date-picker"
          placeholder="Ngày ứng tuyển"
        >
          <i slot="icon-calendar"></i>
        </date-picker>
      </div>
			<div class="col-12 col-lg-2 mb-2">
        <select
                v-model="condition.read"
                class="form-select rounded-pill"
                aria-label="Trạng thái"
        >
          <option value="" selected>Tất cả</option>
          <option value="0">Chưa đọc</option>
          <option value="1">Đã đọc</option>
        </select>
      </div>
      <div class="col-12 col-lg-2 mb-2">
        <!-- <select
          v-model="condition.status_stay"
          class="form-select rounded-pill"
          aria-label="ステータス"
        >
          <option value="" selected>ステータス</option>
          <option value="0">未対応</option>
          <option value="1">折り返し待ち</option>
          <option value="2">面接待ち</option>
          <option value="3">採用</option>
          <option value="4">不採用（連絡取れず）</option>
          <option value="5">不採用</option>
        </select> -->
      </div>
      <div class="col-12 col-lg-2">
        <button
          type="button"
          class="btn btn-sm rounded-pill btn-search-job"
          @click="search()"
        >
          <img src="../../assets/images/icon_search.svg" alt="" />
          <span class="px-4">Tìm kiếm</span>
        </button>
      </div>
    </div>

    <div class="container mt-3 mt-lg-4">
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
          <tbody v-if="!spinner">
            <tr
              v-for="(item, index) in items"
              :key="item.id"
              :class="item.read === 1 ? 'active' : ''"
            >
              <td class="align-middle py-3 text-center">
                <!-- <span
                  v-if="item.status === 1"
                  :class="(perPage * (currentPage - 1)) + (index + 1) < 10 ? 'td-warning' : 'td-warning-large'"
                >
                  未対応！
                  <img class="" src="../../assets/images/icon_warning.svg" />
                </span> -->
                {{ ( perPage * (currentPage - 1)) + (index + 1) }}
              </td>
              <td class="align-middle py-4">
                <span
                  style="cursor: pointer"
                  @click="popupCvUser(item)"
                >
                  {{ item.user.name }}
                </span>
              </td>
              <td class="align-middle py-3 col-text">{{ item.job.title }}</td>
              <td class="align-middle py-3">
                {{ $moment(item.created_at).format('YYYY-MM-DD') }}
              </td>
              <td class="align-middle py-3 col-2 note">
                {{item.matching_point}}
              </td>
              <td class="align-middle py-3 col-status">
                  {{ item.status ? jobStatus[item.status - 1] : jobStatus[0] }}
              </td>
              <td class="align-middle py-3">
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#popUpCheck"
                  @click="
                    popupUpdateStatus({
                      id: item.id,
                      name: item.user.name,
                      status: item.status,
                      note: item.note,
                    })
                  "
                >
                  <img
                    class="edit-icon"
                    src="../../assets/images/icon_edit_list.svg"
                  />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="totalItems === 0 && spinner" class="outer-spinner">
          <div class="loader"></div>
        </div>
        <h4
          v-if="totalItems === 0 && !spinner"
          class="text-center w-100 p-3 m-0 bg-white border-bottom border-1"
        >
          Không có kết quả
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
        <div class="modal-content check-content modal-candidate">
          <div class="modal-header">
            <a
              ref="closeCheckModal"
              data-bs-dismiss="modal"
              class="btn-close"
              aria-label="Close"
            >
              <img src="../../assets/images/icon_modal_close.svg" alt="" />
            </a>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <h5 id="popUpCheckLabel" class="modal-title check-title">
              Thay đổi trạng thái ứng viên
            </h5>
          </div>
          <h5 class="d-flex justify-content-center align-items-center">
            Tên ứng viên: <strong>{{ name }}</strong>
          </h5>
          <div class="modal-body pop-check-input">
            <label for="status">Trạng thái</label>
            <select
              id="status"
              v-model="dataUpdateStatus.status"
              class="form-select rounded-pill pop-check-select"
              aria-label="Status"
            >
              <option v-for="(option, index) in jobStatus" :key="index" :value="index + 1" :selected="index === 0">
                {{ option }}
              </option>
            </select>
            <label for="remarks">Nội dung thay đổi</label>
            <textarea
              id="remarks"
              v-model="$v.dataUpdateStatus.note.$model"
              class="form-control"
            ></textarea>
            <div v-if="$v.dataUpdateStatus.note.$error">
              <div v-if="!$v.dataUpdateStatus.note.maxLength" class="error">
                Vui lòng nhập dưới 500 ký tự
              </div>
            </div>
            <div class="submit-btn">
              <button
                id="apply-btn"
                class="btn btn-primary mt-4 rounded-pill"
                data-bs-target="#popUpSuccess"
                @click="updateStatus()"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import { validationMixin } from 'vuelidate'
import { maxLength } from 'vuelidate/lib/validators'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ja'
import Pagination from '../../components/Pagination'
import defaultInCvUser from '~/constants/defaultInCvUser'
import jobStatus from '~/constants/jobStatus'

export default {
  name: 'CandidateApply',
  components: {
    Pagination,
    DatePicker,
  },
  mixins: [validationMixin],
  layout: 'auth',

  data() {
    return {
      message: '',
      message_vi: '',
      message_ja: '',
      cvType: 1,
      url_file: process.env.URL_FILE,
      items: [],
      fields: [
        {
          key: 'id',
          label: 'No',
        },
        {
          key: 'candidate_name',
          label: 'Tên ứng viên',
        },
        {
          key: 'job_title',
          label: 'Vị trí',
        },
        {
          key: 'apply_date',
          label: 'Ngày ứng tuyển',
        },
        {
          key: 'matching_point',
          label: 'Độ phù hợp',
        },
        {
          key: 'status',
          label: 'Trạng thái',
        },
      ],
      spinner: '',
      currentPage: 1,
      perPage: 20,
      totalItems: 0,
      pageCount: 1,
      condition: {
        key_word: '',
        apply_date: '',
        status_stay: '',
        read: '',
      },
      idRow: -1,
      dataUpdateStatus: {
        status: 0,
        note: '',
      },
      lang_ja: defaultInCvUser.lang_ja,
      lang_vi: defaultInCvUser.lang_vi,
      language: '',
      idCandidate: -1,
      defaultCandidate: {
        id: '',
        user_id: '',
        first_name: '',
        name: '',
        nationality: '',
        gender: '',
        birthday: '',
        email: '',
        profile_image: '',
        language: '',
        phone_number: '',
        address: '',
        married_status: '',
        dependent_person: '',
        health: '',
        visa_type: '',
        visa_date: '',
        strength: '',
        stay_experience_date: '',
        stay_experience_purpose: '',
        reason_apply: '',
        file_cv_upload: '',
        desire_change_jobs: '',
        translate_jp: '',
        postal_code: '',
        province_id: '',
        status: '',
        created_at: '',
        updated_at: '',
        candidate_educations_jobs: [],
        candidate_foreign_languages: [],
        candidate_certificates: [],
      },
      candidate: {
        id: '',
        user_id: '',
        first_name: '',
        name: '',
        nationality: '',
        gender: '',
        birthday: '',
        email: '',
        profile_image: '',
        language: '',
        phone_number: '',
        address: '',
        married_status: '',
        dependent_person: '',
        health: '',
        visa_type: '',
        visa_date: '',
        strength: '',
        stay_experience_date: '',
        stay_experience_purpose: '',
        reason_apply: '',
        file_cv_upload: '',
        desire_change_jobs: '',
        translate_jp: '',
        postal_code: '',
        province_id: '',
        status: '',
        created_at: '',
        updated_at: '',
        candidate_educations_jobs: [],
        candidate_foreign_languages: [],
        candidate_certificates: [],
      },
      educationsOfCandidate: [],
      jobsOfCandidate: [],
      selectedItemId: 0,
      jobStatus,
      name: '',
    }
  },

  validations: {
    dataUpdateStatus: {
      note: {
        maxLength: maxLength(500),
      },
    },
  },

  head() {
    return { title: 'RouteRecruite | Danh sách ứng viên' }
  },

  computed: {
    next() {
      return this.currentPage < this.pageCount
        ? this.currentPage + 1
        : this.pageCount
    },
    previous() {
      return this.currentPage > 0 ? this.currentPage - 1 : this.currentPage
    },
  },

  created() {
    this.getListCV(this.currentPage)
  },

  methods: {
    async getListCV(currentPage) {
      const condition = { ...this.condition, currentPage }
      this.spinner = true
      const { data } = await this.$repositories.candidatesApply.getListCV(
        condition
      )
      this.spinner = false

      this.items = data.results
      this.totalItems = data.totalResults
      this.currentPage = data.page
      this.perPage = data.limit
      this.pageCount = data.totalPages
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

    search() {
      this.currentPage = 1
      this.getListCV(this.currentPage)
    },

    // isWarningUnRead(date) {
    //   const now = this.$moment().format('YYYY-MM-DD')
    //   date = this.$moment(date)
    //
    //   return now < date.add(3, 'days').format('YYYY-MM-DD')
    // },

    popupUpdateStatus(data) {
      this.idRow = data.id
      this.name = data.name
      this.dataUpdateStatus.status = data.status
      this.dataUpdateStatus.note = data.note
    },

    async updateStatus() {
      this.$v.dataUpdateStatus.$touch()
      if (!this.$v.dataUpdateStatus.$invalid) {
        await this.$repositories.candidatesApply
          .updateStatus(this.idRow, this.dataUpdateStatus)
          .then((res) => {
            this.idRow = -1
            if (res.status === 200) {
              this.$toast.success('Cập nhật trạng thái ứng viên thành công!')
              this.getListCV(this.currentPage)
            } else {
              this.$toast.error(
                'Something wrong'
              )
            }
          })
        this.$refs.closeCheckModal.click()
      }
    },

    async updateReadStatus(id) {
      await this.$repositories.candidatesApply.updateStatus(id, { read: 1 });
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

    popupCvUser(candidateApply) {
      this.updateReadStatus(candidateApply.id);
      this.$router.push('/candidates_apply/' + candidateApply.id + '/cv')
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

<style lang="scss" scoped>
@import '../../styles/pages/candidates_apply/list.scss';
@import '../../styles/pages/jobs/cv_user.scss';
</style>

<style lang="scss">
@import '../../styles/pages/candidates_apply/listnotscoped.scss';
</style>
