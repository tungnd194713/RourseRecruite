<template>
  <main class="container my-3 my-lg-4">
    <div class="card detail-job-card position-relative preview_job">
      <div class="detail-job-content">
        <div class="mt-0 mt-lg-2 pt-0 pt-lg-3 pb-2">
          <div class="row">
            <div
              class="col-12 col-xl-6 pe-3 pe-xl-5 preview-image-job rounded-img"
              :style="{
                backgroundImage: `url(${previewImageJobUrl()})`
              }"
            >
              <!--<img
                v-if="job.image_job"
                class="img-fluid w-100"
                :src="previewImageJobUrl"
                alt=""
              >
              <img
                v-else-if="oldImageJob"
                class="img-fluid w-100"
                :src="url_file + oldImageJob"
                alt=""
              >
              <img
                v-else
                class="img-fluid w-100"
                :src="require(`@/assets/images/draft${careerImages[job.career - 1].image}`)"
                alt=""
              >-->
            </div>
            <div class="col-12 col-xl-6 mt-4 mt-lg-0">
              <h1 class="mb-3 mb-lg-4"> {{ job.title}}</h1>
              <!--              <div class="row mb-4">-->
              <!--                <div class="col-12">-->
              <!--                  <button id="btn-apply" class="btn btn-secondary w-100 h4">応募する</button>-->
              <!--                </div>-->
              <!--              </div>-->
              <div class="row">
                <div class="d-block">
                  <span class="badge">{{ previewFormRecruitment()}}</span>
                  <span class="badge">{{ $t(careerList[job.career - 1])}}</span>
                </div>
                <div class="d-block">
                  <span
                    v-for="(item, index) in job.status_stay"
                    :key="index"
                    class="badge"
                  >
                    {{ $t(theStatusStay[item]) }}
                  </span>
                  <img
                    width="22"
                    height="22"
                    src="../../../../assets/images/icon_question.svg"
                    alt=""
                    data-bs-toggle="modal"
                    data-bs-target="#statusStayInfoModal"
                  >
                </div>
              </div>
              <div class="row mt-2">
                <div class="d-block mb-2">
                  <span class="mr-2"><img width="20" height="20" src="../../../../assets/images/icon_money_outline.svg"></span>
                  <span><b>{{ job.salary_min ? Intl.NumberFormat().format(job.salary_min) + ' - ' : 'Upto '}}{{ Intl.NumberFormat().format(job.salary_max)}}</b></span>
                </div>
                <div class="d-block mb-2">
                  <span class="mr-2"><img width="20" height="20" src="../../../../assets/images/icon_address.svg"></span>
                  <span> {{ $t(provincesList[job.province_id]) }} - 日本</span>
                </div>
                <div class="d-block">
                  <span class="mr-2"><img width="20" height="20" src="../../../../assets/images/icon_clock.svg"></span>
                  <span>{{ previewDateStart}} - {{ previewDateEnd}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-0">
      <div class="detail-job-content py-3">
        <div class="d-block mb-3 mb-lg-5">
          <h5>仕事内容</h5>
          <div class="ps-3 pre-line word-break-break-all">
            {{ job.content_work}}
          </div>
        </div>
        <div class="d-block">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>採用人数</td>
                <td class="pre-line word-break-break-all">
                  {{ job.number_recruitments}}人
                </td>
              </tr>
              <tr>
                <td>応募条件</td>
                <td class="pre-line word-break-break-all">
                  {{ job.conditions_apply}}
                </td>
              </tr>
              <tr>
                <td>勤務地</td>
                <td class="pre-line word-break-break-all">
                  {{ job.address_work}}
                </td>
              </tr>
              <tr>
                <td>勤務時間</td>
                <td class="pre-line word-break-break-all">
                  {{ job.time_work}}
                </td>
              </tr>
              <tr>
                <td>休日</td>
                <td class="pre-line word-break-break-all">
                  {{ job.holidays}}
                </td>
              </tr>
              <tr>
                <td>休憩時間 </td>
                <td class="pre-line word-break-break-all">
                  {{ job.break_time}}
                </td>
              </tr>
              <tr>
                <td>福利厚生</td>
                <td class="pre-line word-break-break-all">
                  {{ job.welfare_regime}}
                </td>
              </tr>
              <tr>
                <td>ベトナム人在籍状況</td>
                <td class="pre-line word-break-break-all">
                  {{ hasVietnameseStaffLabelList[parseInt(job.has_vietnamese_staff)]}}
                </td>
              </tr>
              <!--<tr>
                <td>残業見込み、休日出勤見込み</td>
                <td class="pre-line">{{ job.overtime}}</td>
              </tr>-->
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-end footer">
          <button id="btn_back" class="btn" @click="backToUpdateJobPage">戻る</button>
          <button id="btn_completion" class="btn" :disabled="isDisabledSaveBtn" @click="completeUpdateJob">完了</button>
          <button
            ref="showCompleteUpdateJobModal"
            data-bs-toggle="modal"
            data-bs-target="#completeUpdateJobModal"
            class="d-none"
          />
        </div>
      </div>
    </div>

    <StatusStayInfoModal />
    <CompleteUpdateJobModal />
  </main>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  import StatusStayInfoModal from "~/components/StatusStayInfoModal";
  import CompleteUpdateJobModal from "~/components/CompleteUpdateJobModal";
  import theCareers from '~/constants/careers'
  import theProvinces from "~/constants/provinces"
  import careerImages from "~/constants/careerImages"
  import theStatusStay from "~/constants/statusStay"

  export default {
    name: "PreviewUpdateJob",
    components: {
      CompleteUpdateJobModal,
      StatusStayInfoModal
    },
    layout: 'preview-new',

    data() {
      return {
        isDisabledSaveBtn: false,
        url_file: process.env.URL_FILE,
        oldImageJob: '',
        careerList: theCareers,
        theStatusStay,
        careerImages,
        provincesList: theProvinces,
        hasVietnameseStaffLabelList: [
          'いない',
          'いる',
          '採用予定',
        ],
        typePlanList:[
          {
            text: 'プランA',
            value: 1
          },
          {
            text: 'プランB',
            value: 2
          },
          {
            text: 'プランC',
            value: 3
          },
          {
            text: '標準プラン',
            value: 4
          },
        ],
        displayMonthList: [
          {
            text: '1ヶ月',
            value: 1
          },
          {
            text: '2ヶ月',
            value: 2
          },
          {
            text: '3ヶ月',
            value: 3
          },
          {
            text: '4ヶ月',
            value: 4
          },
          {
            text: '5ヶ月',
            value: 5
          },
        ],
        formRecruitmentList: [
          {
            text: 'フルタイム',
            value: 1
          },
          {
            text: 'アルバイト',
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
        job: {
          image_job: null,
          title: '',
          career: '',
          date_start: this.$moment().format('YYYY-MM-DD'),
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
          overtime: '',
        }
      }
    },

    head() {
      return { title: 'RouteRecruite | Preview'}
    },

    computed: {
      previewDateStart() {
        return this.$moment(this.job.date_start).format('YYYY/MM/DD')
      },

      previewDateEnd() {
        return this.$moment(this.job.date_start).add(this.job.display_month, 'M').format('YYYY/MM/DD')
      }
    },

    created() {
      this.job = Object.assign({}, this.gettersGetJobDuplicate())
      this.oldImageJob = this.gettersGetOldImageJobDuplicate()
      if (Object.keys(this.job).length === 0 && this.job.constructor === Object) {
        this.$router.push(`/jobs/duplicate/${this.$route.params.id}`)
      }
    },

    methods: {
      ...mapActions({
        'dispatchSetJobDuplicate': 'job/setJobDuplicate',
        'dispatchSetOldImageJobDuplicate': 'job/setOldImageJobDuplicate',
        'dispatchSetPrevRouteJobDuplicate': 'job/setPrevRouteJobDuplicate',
      }),

      ...mapGetters({
        'gettersGetJobDuplicate': 'job/getJobDuplicate',
        'gettersGetOldImageJobDuplicate': 'job/getOldImageJobDuplicate',
      }),

      isJobStored() {
        return !(Object.keys(this.job).length === 0 && this.job.constructor === Object)
      },

      filterPreviewFormRecruitment(element) {
        return element.value === this.job.form_recruitment
      },

      previewFormRecruitment() {
        return this.isJobStored() ? this.formRecruitmentList.filter(this.filterPreviewFormRecruitment)[0].text : null
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
        return this.isJobStored() ? this.statusStayList.filter(this.filterPreviewStatusStay) : []
      },

      backToUpdateJobPage() {
        this.dispatchSetPrevRouteJobDuplicate(this.$route.path)
        this.$router.push(`/jobs/duplicate/${this.$route.params.id}`)
      },

      async completeUpdateJob() {
        if (this.job.salary_min === '') {
          this.job.salary_min = 0
        }
        // this.job.has_vietnamese_staff = this.job.has_vietnamese_staff ? 1 : 0
        const formData = new FormData()
        if (this.job.image_job) {
          formData.append('image_job', this.job.image_job)
        }
        if (this.oldImageJob) {
          formData.append('old_image_job_duplicate', this.oldImageJob)
        }

        formData.append('title', this.job.title)
        formData.append('career', this.job.career)
        formData.append('date_start', this.job.date_start)
        formData.append('type_plan', this.job.type_plan)
        formData.append('display_month', this.job.display_month)
        formData.append('form_recruitment', this.job.form_recruitment)
        formData.append('status_stay', this.job.status_stay.toString())
        formData.append('number_recruitments', this.job.number_recruitments)
        formData.append('salary_max', this.job.salary_max)
        formData.append('salary_min', this.job.salary_min)
        formData.append('content_work', this.job.content_work)
        formData.append('conditions_apply', this.job.conditions_apply)
        formData.append('province_id', this.job.province_id)
        formData.append('address_work', this.job.address_work)
        formData.append('time_work', this.job.time_work)
        formData.append('break_time', this.job.break_time)
        formData.append('holidays', this.job.holidays)
        formData.append('welfare_regime', this.job.welfare_regime)
        formData.append('has_vietnamese_staff', this.job.has_vietnamese_staff)
        formData.append('overtime', this.job.overtime)
        this.isDisabledSaveBtn = true
        return await this.$repositories.jobs.createJob(formData, {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(res => {
          if (res.status === 201) {
            this.$refs.showCompleteUpdateJobModal.click()
            this.dispatchSetJobDuplicate({})
            this.dispatchSetOldImageJobDuplicate('')
          } else if (res.response) {
            this.$toast.error(res.response.data.message)
          }
          this.isDisabledSaveBtn = false
        })
      },

      previewImageJobUrl() {
        if (this.job.image_job) {
          return URL.createObjectURL(this.job.image_job)
        } else if (this.oldImageJob) {
          return this.url_file + this.oldImageJob
        } else if (this.job.career) {
          return require(`@/assets/images/draft` + careerImages[this.job.career - 1].image)
        } else {
          this.$router.push(`/jobs/duplicate/${this.$route.params.id}`)
        }
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../styles/pages/jobs/preview.scss';
</style>
