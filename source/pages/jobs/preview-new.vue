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
              <!--<img class="img-fluid w-100 rounded-img" :src="previewImageJobUrl()" alt="">-->
            </div>
            <div class="col-12 col-xl-6 mt-4 mt-lg-0">
              <h1 class="mb-3 mb-lg-4"> {{ job.title}}</h1>
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
              <div class="row mb-4">
                <div class="col-12">
                  <button id="btn-apply" class="btn btn-secondary w-100 h4">Ứng tuyển</button>
                </div>
              </div>
              <div class="row mt-2">
								<div class="d-block mb-2">
                  <span class="mr-2">Chấp nhận đào tạo: </span>
                  <span v-if="job.accept_education"><b>Có thể đào tạo trong {{ job.max_education_month }} tháng <span v-if="job.scholarship > 0">với học bổng {{ job.scholarship }}%</span></b></span>
                  <span v-else>Không</span>
                </div>
                <div v-if="job.accept_education" class="d-block mb-2">
                  <span class="mr-2">Số lượng đào tạo: </span>
                  <span><b>{{ job.number_trainings }}</b></span>
                </div>
                <div class="d-block mb-2">
                  <span class="mr-2">Lương: </span>
                  <span><b>{{ job.salary_min ? Intl.NumberFormat().format(job.salary_min) + ' - ' : 'Upto '}}{{ Intl.NumberFormat().format(job.salary_max)}}</b></span>
                </div>
                <div class="d-block mb-2">
                  <span class="mr-2">Trụ sở làm việc: </span>
                  <span> <b>{{ $t(provincesList[job.province_id]) }}</b> </span>
                </div>
                <div class="d-block">
                  <span class="mr-2">Thời gian đăng tuyển: </span>
                  <span><b>{{ previewDateStart}} - {{ previewDateEnd}}</b></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-0">
      <div class="detail-job-content py-3">
        <div class="d-block mb-3 mb-lg-5">
          <h4><strong>Nội dung công việc</strong></h4>
          <div class="ps-3 pre-line word-break-break-all">
						<v-runtime-template :template="`<div>${job.content_work}</div>`"></v-runtime-template>
          </div>
        </div>
        <div class="d-block">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td class="head-table">Số lượng tuyện dụng</td>
                <td class="pre-line word-break-break-all">
                  {{ job.number_recruitments}} người
                </td>
              </tr>
              <tr>
                <td class="head-table">Yêu cầu kỹ thuật</td>
                <td class="word-break-break-all requirements">
                  <ul v-if="job.collegeMajors.length">
                    <li v-for="(major, index) in job.collegeMajors" :key="index">
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
                  <ul v-if="job.beginnerSkills.length">
                    <li v-for="(skill, index) in job.beginnerSkills" :key="index">
                      Đã có kinh nghiệm
                      <span v-for="(iitem, iindex) in skill" :key="iindex">
                        {{ iitem.name }}
                        <span v-if="iindex !== skill.length - 1">hoặc</span>
                      </span>
                    </li>
                  </ul>
                  <ul v-if="job.intermediateSkills.length">
                    <li v-for="(skill, index) in job.intermediateSkills" :key="index">
                      Hiểu rõ về
                      <span v-for="(iitem, iindex) in skill" :key="iindex">
                        {{ iitem.name }}
                        <span v-if="iindex !== skill.length - 1">hoặc</span>
                      </span>
                    </li>
                  </ul>
                  <ul v-if="job.advancedSkills.length">
                    <li v-for="(skill, index) in job.advancedSkills" :key="index">
                      Thành thạo
                      <span v-for="(iitem, iindex) in skill" :key="iindex">
                        {{ iitem.name }}
                        <span v-if="iindex !== skill.length - 1">hoặc</span>
                      </span>
                    </li>
                  </ul>
                  <ul v-if="job.certificates.length">
                    <li v-for="(certificate, index) in job.certificates" :key="index">
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
                <td class="head-table">Điều kiện ứng tuyển</td>
                <td class="pre-line word-break-break-all">
									<v-runtime-template :template="`<div>${job.conditions_apply}</div>`"></v-runtime-template>
                </td>
              </tr>
              <tr>
                <td class="head-table">Thời gian làm việc</td>
                <td class="pre-line word-break-break-all">
									<v-runtime-template :template="`<div>${job.time_work}</div>`"></v-runtime-template>
                </td>
              </tr>
              <tr>
                <td class="head-table">Phúc lợi</td>
                <td class="pre-line word-break-break-all">
									<v-runtime-template :template="`<div>${job.welfare_regime}</div>`"></v-runtime-template>
                </td>
              </tr>
							<tr>
                <td class="head-table">Địa chỉ</td>
                <td class="pre-line word-break-break-all">
                  {{ job.address_work}}
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
          <button id="btn_back" class="btn" @click="backToCreateJobPage">Quay lại</button>
          <button id="btn_completion" class="btn" :disabled="isDisabledSaveBtn" @click="completeCreateJob">Hoàn tất</button>
          <button
            ref="showCompleteCreateJobModal"
            data-bs-toggle="modal"
            data-bs-target="#completeCreateJobModal"
            class="d-none"
          />
        </div>
      </div>
    </div>

    <StatusStayInfoModal />
    <CompleteCreateJobModal />
  </main>
</template>

<script>
	import VRuntimeTemplate from "v-runtime-template";
  import StatusStayInfoModal from "~/components/StatusStayInfoModal";
  import CompleteCreateJobModal from "~/components/CompleteCreateJobModal";
  import theCareers from '~/constants/careers'
  import theProvinces from "~/constants/provinces"
  import careerImages from "~/constants/careerImages"
  import theStatusStay from "~/constants/statusStay"

  export default {
    name: "PreviewNewJob",
    components: {
      CompleteCreateJobModal,
      StatusStayInfoModal,
			VRuntimeTemplate
    },
    layout: 'preview-new',

    data() {
      return {
        isDisabledSaveBtn: false,
        careerList: theCareers,
        theStatusStay,
        provincesList: theProvinces,
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
          careerImages,
					beginnerSkills: [],
					intermediateSkills: [],
					advancedSkills: [],
					certificates: [],
					collegeMajors: [],
        },
        previewSkills: [],
      }
    },

    head() {
      return { title: 'Preview tuyển dụng'}
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
      this.job = Object.assign({}, this.$store.getters['job/getJob'])
      if (Object.keys(this.job).length === 0 && this.job.constructor === Object) {
        this.$router.push('/jobs/create')
      }
      this.previewSkills = this.job.beginnerSkills?.concat(this.job.intermediateSkills, this.job.advancedSkills).flat().map(item => item.name).slice(0, 3);
    },

    methods: {
      isJobStored() {
        return !(Object.keys(this.job).length === 0 && this.job.constructor === Object)
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

      backToCreateJobPage() {
        this.$store.dispatch('job/setPrevRoute', this.$route.path)
        this.$router.push('/jobs/create')
      },

      async completeCreateJob() {
        if (this.job.salary_min === '') {
          this.job.salary_min = 0
        }
        // this.job.has_vietnamese_staff = this.job.has_vietnamese_staff ? 1 : 0
        const formData = new FormData()
        if (this.job.image_job) {
          formData.append('image_job', this.job.image_job)
        }
        formData.append('title', this.job.title)
        formData.append('career', this.job.career)
        formData.append('date_start', this.job.date_start)
        formData.append('type_plan', this.job.type_plan)
        formData.append('display_month', this.job.display_month)
        formData.append('form_recruitment', this.job.form_recruitment)
        formData.append('number_recruitments', this.job.number_recruitments)
        formData.append('salary_max', this.job.salary_max)
        formData.append('salary_min', this.job.salary_min)
        formData.append('content_work', this.job.content_work)
        formData.append('conditions_apply', this.job.conditions_apply)
        formData.append('province_id', this.job.province_id)
        formData.append('address_work', this.job.address_work)
        formData.append('time_work', this.job.time_work)
        formData.append('welfare_regime', this.job.welfare_regime)
        formData.append('accept_education', this.job.accept_education)
        formData.append('max_education_month', this.job.max_education_month)
        formData.append('scholarship', this.job.scholarship)
        formData.append('number_trainings', this.job.number_trainings)
        // formData.append('overtime', this.job.overtime)
        formData.append('beginnerSkills', JSON.stringify(this.job.beginnerSkills))
        formData.append('intermediateSkills', JSON.stringify(this.job.intermediateSkills))
        formData.append('advancedSkills', JSON.stringify(this.job.advancedSkills))
        formData.append('certificates', JSON.stringify(this.job.certificates))
        formData.append('collegeMajors', JSON.stringify(this.job.collegeMajors))
        this.isDisabledSaveBtn = true
        return await this.$repositories.jobs.createJob(formData, {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(res => {
          if (res.status === 200) {
            this.$refs.showCompleteCreateJobModal.click()
            this.$store.dispatch('job/setJob', {})
            this.$store.dispatch('job/setPrevRoute', '')
          }
          if (res.response && res.response.status === 406) {
            this.$toast.error(res.response.data.message)
          }
          this.isDisabledSaveBtn = false
        })
      },
      previewImageJobUrl() {
        // return this.job.image_job ? URL.createObjectURL(this.job.image_job) : require(`@/assets/images/draft` + careerImages[this.job.career - 1].image)
        return this.job.image_job ? URL.createObjectURL(this.job.image_job) : ''
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/pages/jobs/preview.scss';
</style>
<style lang="scss">
.detail-job-content {
	li {
		min-height: 21px;
	}
	p {
		margin: 0;
	}
}
</style>
