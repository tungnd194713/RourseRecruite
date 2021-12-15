<template>
  <main class="container my-3 my-lg-4">
    <div class="row box-title mb-1 mb-lg-2">
      <div class="col-md-6 col-12">
        <h4 class="page-header-title">応募者一覧</h4>
      </div>
      <div class="col-md-6 col-12 d-flex part-above-search">
        <h6 class="me-5 text-above-search">
          在留資格はこのリンクから確認できます
        </h6>
        <a href="#" class="text-above-search link-above-search">abc.com</a>
      </div>
    </div>

    <div class="row box-search mt-2 px-3 pt-3 pb-2 rounded-pill">
      <div class="col-12 col-lg-4 mb-2">
        <input
          v-model="condition.key_word"
          type="text"
          class="form-control rounded-pill"
          placeholder="タイトル"
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
          placeholder="応募日"
        >
          <i slot="icon-calendar"></i>
        </date-picker>
      </div>
      <div class="col-12 col-lg-3 mb-2">
        <select
          v-model="condition.status_stay"
          class="form-select rounded-pill"
          aria-label="ステータス"
        >
          <option value="" selected disabled>ステータス</option>
          <option value="1">特定技能</option>
          <option value="2">技能実習</option>
          <option value="3">特定活動</option>
          <option value="4">留学生</option>
          <option value="5">技術・人文知識・国際業務</option>
          <option value="6">定住</option>
          <option value="7">永住</option>
          <option value="8">家族滞在</option>
        </select>
      </div>
      <div class="col-12 col-lg-2">
        <button
          type="button"
          class="btn btn-sm rounded-pill btn-search-job"
          @click="search()"
        >
          <img src="../../assets/images/icon_search.svg" alt="" />
          <span class="px-4">検索</span>
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
          <tbody>
            <tr
              v-for="(item, index) in items"
              :key="item.id"
              :class="item.read === 0 ? 'active' : ''"
            >
              <td class="align-middle py-3">
                <span
                  v-if="!(item.read || isWarningUnRead(item.created_at))"
                  class="td-warning"
                >
                  3日以上未対応!
                  <img class="" src="../../assets/images/icon_warning.svg" />
                </span>
                {{ index + 1 }}
              </td>
              <td class="align-middle py-3">
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  @click="popupCvUser(item)"
                >
                  {{ item.candidate.user.name }}
                </a>
              </td>
              <td class="align-middle py-3">{{ item.jobs.title }}</td>
              <td class="align-middle py-3">
                {{ $moment(item.created_at).format('YYYY-MM-DD') }}
              </td>
              <td class="align-middle py-3">
                {{ item.candidate.form_recruitment }}
                <template v-if="item.candidate.form_recruitment == 1"
                  >フルタイム</template
                >
                <template v-else>アルバイト</template>
              </td>
              <td class="align-middle py-3">
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#popUpId"
                  @click="
                    popupImageCard(
                      item.candidate.residence_card_front,
                      item.candidate.residence_card_backside
                    )
                  "
                >
                  <img
                    v-if="item.read === 0"
                    class=""
                    src="../../assets/images/icon_postcard_active.svg"
                  />
                  <img
                    v-else
                    class=""
                    src="../../assets/images/icon_postcard_inactive.svg"
                  />
                </a>
              </td>
              <td class="align-middle py-3">
                <select
                  v-model="item.residence_card_confirm"
                  class="form-select active rounded-3 confirm-select"
                  @change="
                    updateCard(item.id, {
                      residence_card_confirm: item.residence_card_confirm,
                    })
                  "
                >
                  <option value="" selected disabled>未選択</option>
                  <option value="1">特定技能</option>
                  <option value="2">技能実習</option>
                  <option value="3">特定活動</option>
                  <option value="4">留学生</option>
                  <option value="5">技術・人文知識・国際業務</option>
                  <option value="6">定住</option>
                  <option value="7">永住</option>
                  <option value="8">家族滞在</option>
                </select>
              </td>
              <td class="align-middle py-3 w-20">
                {{ item.note }}
              </td>
              <td class="align-middle py-3">
                <select
                  v-model="item.status"
                  class="form-select active rounded-3 status-select"
                  @change="updateItemStatus(item.id, { status: item.status })"
                >
                  <option value="" selected disabled>未選択</option>
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
                  @click="
                    popupUpdateStatus({
                      id: item.id,
                      residence_card_confirm: item.residence_card_confirm,
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
          検索結果がありません
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
          * 3日以上未読の履歴書があったら、リマインダーが表示されます。
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
              <img src="../../assets/images/icon_modal_close.svg" alt="" />
            </a>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <h5 id="popUpIdLabel" class="modal-title">在留カード</h5>
          </div>
          <div class="modal-body d-flex justify-content-around">
            <a href="#"
              ><img
                class="link-modal"
                :src="url_file + image.residence_card_front"
                alt=""
            /></a>
            <a href="#"
              ><img
                class="link-modal"
                :src="url_file + image.residence_card_backside"
                alt=""
            /></a>
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
            <a data-bs-dismiss="modal" class="btn-close" aria-label="Close">
              <img src="../../assets/images/icon_modal_close.svg" alt="" />
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
              <!--<option selected></option>-->
              <option value="" selected disabled>未選択</option>
              <option value="1">特定技能</option>
              <option value="2">技能実習</option>
              <option value="3">特定活動</option>
              <option value="4">留学生</option>
              <option value="5">技術・人文知識・国際業務</option>
              <option value="6">定住</option>
              <option value="7">永住</option>
              <option value="8">家族滞在</option>
            </select>
            <label for="status">ステータス</label>
            <select
              id="status"
              v-model="dataUpdateStatus.status"
              class="form-select rounded-pill pop-check-select"
              aria-label="Status"
            >
              <option value="" selected disabled>未選択</option>
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

    <CvUserModal
      :candidate="candidate"
      :language="language"
      :educations-of-candidate="educationsOfCandidate"
      :jobs-of-candidate="jobsOfCandidate"
      :id-row="idRow"
      @changeLanguageEvent="changeLanguage($event)"
    />
  </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ja'
import Pagination from '../../components/Pagination'
import CvUserModal from '~/components/modal/CvUserModal'
import defaultInCvUser from '~/constants/defaultInCvUser'

export default {
  name: 'CandidateApply',
  components: {
    Pagination,
    DatePicker,
    CvUserModal,
  },
  layout: 'auth',

  data() {
    return {
      url_file: process.env.URL_FILE,
      items: [],
      fields: [
        {
          key: 'id',
          label: 'No',
        },
        {
          key: 'candidate_name',
          label: '氏名',
        },
        {
          key: 'job_title',
          label: '求人タイトル',
        },
        {
          key: 'apply_date',
          label: '応募日',
        },
        {
          key: 'employment_form',
          label: '雇用形態',
        },
        {
          key: 'residence_card',
          label: '在留カード',
        },
        {
          key: 'status_stay',
          label: '在留資格確認',
        },
        {
          key: 'note',
          label: '備考',
        },
        {
          key: 'status',
          label: 'ステータス',
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
      },
      idRow: -1,
      dataUpdateStatus: {
        residence_card_confirm: 0,
        status: 0,
        note: '',
      },
      image: {
        residence_card_front: '',
        residence_card_backside: '',
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
        residence_card_front: '',
        residence_card_backside: '',
        strength: '',
        stay_experience_date: '',
        stay_experience_purpose: '',
        reason_apply: '',
        file_cv_upload: '',
        desire_change_jobs: '',
        translate_jp: '',
        postal_code: '',
        province_id: '',
        district: '',
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
        residence_card_front: '',
        residence_card_backside: '',
        strength: '',
        stay_experience_date: '',
        stay_experience_purpose: '',
        reason_apply: '',
        file_cv_upload: '',
        desire_change_jobs: '',
        translate_jp: '',
        postal_code: '',
        province_id: '',
        district: '',
        status: '',
        created_at: '',
        updated_at: '',
        candidate_educations_jobs: [],
        candidate_foreign_languages: [],
        candidate_certificates: [],
      },
      educationsOfCandidate: [],
      jobsOfCandidate: [],
    }
  },

  head() {
    return { title: '応募者一覧' }
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

    search() {
      this.currentPage = 1
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
    },

    async updateStatus() {
      return await this.$repositories.candidatesApply
        .updateStatus(this.idRow, this.dataUpdateStatus)
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

    popupCvUser(candidateApply) {
      this.language = this.lang_vi
      this.$i18n.locale = this.language
      this.idRow = candidateApply.id
      this.defaultCandidate = Object.assign({}, candidateApply.candidate)
      this.candidate = Object.assign({}, this.defaultCandidate)
      this.initJobsAndEducationsOfCandidate()
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
