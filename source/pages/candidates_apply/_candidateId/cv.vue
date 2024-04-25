<!-- eslint-disable vue/no-parsing-error -->
<template>
  <main class="container my-3 my-lg-4">
		<div class="row box-title mb-1 mb-lg-2">
      <div class="col-md-6 col-6">
        <h4 class="page-header-title">Hồ sơ ứng viên</h4>
      </div>
    </div>
		<div class="d-flex">
			<div class="left-bar">
				<div class="action-bar">
					<div class="progress-section mb-4">
						<div class="">
							<div class="progress mx-auto" :data-value='candidate.matching_point'>
								<span class="progress-left">
															<span class="progress-bar border-primary"></span>
								</span>
								<span class="progress-right">
															<span class="progress-bar border-primary"></span>
								</span>
								<div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
									<div class="h2 font-weight-bold">{{ candidate.matching_point }}<sup class="small">%</sup></div>
								</div>
							</div>
						</div>
						<div class="text-center">
							Đánh giá: {{ candidate.matching_point < 75 ? 'Cần đào tạo' : 'Phù hợp' }}
						</div>
					</div>
					<div class="info-section">
						<div class="d-flex justify-content-between fs-5">
							<div>Ngày ứng tuyển:</div>
							<div class="fw-bold">{{$moment(candidate.createdAt).format('YYYY-MM-DD')}}</div>
						</div>
						<div class="d-flex justify-content-between fs-5">
							<div>Hình thức:</div>
							<div class="fw-bold">{{ candidate.education_applied ? 'Đăng kí đào tạo' : 'Ứng tuyển trực tiếp' }}</div>
						</div>
						<div v-if="candidate.education_applied" class="d-flex justify-content-between fs-5">
							<div>Thời gian dự kiến:</div>
							<div class="fw-bold">2 tháng</div>
						</div>
						<div v-if="candidate.education_applied" class="d-flex justify-content-between mb-4 fs-5">
							<div>Học bổng:</div>
							<div class="fw-bold"> {{candidate.jobEducation.scholarship}} %</div>
						</div>
						<div class="d-flex justify-content-between">
							<button v-if="candidate.status == 1" class="btn btn-secondary">
								Từ chối
							</button>
							<button v-if="candidate.education_applied" class="btn btn-primary" :class="{ 'btn-secondary': candidate.status == 3 }" @click="acceptEducation()">
								{{ candidate.status == 3 ? 'Đã duyệt đào tạo' : 'Duyệt đào tạo' }}
							</button>
              <button v-else class="btn btn-primary" :class="{ 'btn-secondary': candidate.status == 2 }" @click="acceptInterview()">
								{{ candidate.status == 2 ? 'Đã duyệt phỏng vấn' : 'Duyệt phỏng vấn' }}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div id="elegant-cv" class="cv-template-min-height d-flex flex-column" data-theme="charcoal-gray" >
				<header class="contact-wrapper d-pdf-flex bg-main">
					<div
						class="avatar"
						style="
							background-image: url(/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeWtxUVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--91c6d10346d0b0f395db3a8b795c31bd4c370f56/ACg8ocKZceX38keureYmKW5jKBqjDkMFxUK380wj9dqsUoWE=s96-c.jpg);
						"
					></div>
					<div class="user-contact ims-4">
						<div class="user-position">
							<div class="user-name text-white normal-text ifs-24 fw-700 lh-14 text-break">{{ candidate.user.name }}</div>
							<div class="subtitle ifs-16 fw-300 text-uppercase lh-15 text-dark-grey">Chức danh</div>
						</div>
						<div class="user-info d-pdf-flex">
							<div class="left-items">
								<div class="item">
									<div class="d-flex align-items-start">
										<img class="cv-icon icon-sm" src="https://itviec.com/assets/cv_templates/icons/phone-8ec46b9e46b6e6ea3bf01fa198bbb8dbcbfb86b33a2c2766e7ccfa4b1c694d5c.svg" />
										<p class="name text-break">{{ candidate.user.phone_number }}</p>
									</div>
								</div>
								<div class="item">
									<div class="d-flex align-items-start">
										<img class="cv-icon icon-sm imt-1" src="https://itviec.com/assets/cv_templates/icons/mail-f5038b679849f3bc3747122a3108a84d59cd05ad6c23f3b5e60e816cf45d9f0a.svg" />
										<p class="name text-break">{{ candidate.user.email }}</p>
									</div>
								</div>
							</div>
							<div class="right-items">
								<div class="item">
									<div class="d-flex align-items-start">
										<img class="cv-icon icon-sm" src="https://itviec.com/assets/cv_templates/icons/birthday-31b2f78f09966779fa4b2c97f58e40bf544fc7fe8dbcd65fa5a685d33b58825e.svg" />
										<p class="name text-break">{{ candidate.user.birthday }}</p>
									</div>
								</div>
								<div class="item">
									<div class="d-flex align-items-start">
										<img class="cv-icon icon-sm imt-1" src="https://itviec.com/assets/cv_templates/icons/map-pin-66af2cc50e27eaf5f46598ebfe716d81326c8f40cd36986111adc1df933a39a4.svg" />
										<p class="name text-dark-grey">Add your current location</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
				<div class="cv-container bg-white flex-grow-1">
					<div class="cv-cards">
						<div class="cv-card d-pdf-flex">
							<div class="title ifs-16 normal-text fw-700 lh-15 text-it-black">
								Học vấn
							</div>

							<div class="content ifs-12 normal-text fw-400 lh-18 text-it-black">
								<div v-for="(education, index) in candidate.educations" :key="index" class="education-item ipb-0">
									<span class="text-it-black ifs-14 normal-text fw-700 lh-15 text-break">
										{{ education.college.name }}
									</span>
									<div class="d-pdf-flex">
										<p class="education-date">{{ formattedDate(education.start_at) }} - {{ education.end_at ? formattedDate(education.end_at) : 'Hiện tại' }}</p>
										<div class="vertical-line"></div>
										<p class="fw-500 text-break">{{ education.major.name }}</p>
									</div>
									<span class="lh-15 fw-400 text-break"></span>
								</div>
							</div>
						</div>
						<div class="cv-card d-pdf-flex">
							<div class="title ifs-16 normal-text fw-700 lh-15 text-it-black">
								Kỹ năng
							</div>
							<div class="content ifs-12 normal-text fw-400 lh-18 text-it-black">
								<div v-if="candidate.advancedSkills && candidate.advancedSkills.length" class="skill-item d-pdf-flex">
									<div class="normal-text ifs-14 fw-700 lh-15 text-it-black title">
										Advanced
									</div>
									<div class="skill-list">
										<span v-for="(skill, index) in candidate.advancedSkills" :key="index" class="skill-name text-break">
											{{ skill }}
										</span>
									</div>
								</div>
								<div v-if="candidate.intermediateSkills && candidate.intermediateSkills.length" class="skill-item d-pdf-flex">
									<div class="normal-text ifs-14 fw-700 lh-15 text-it-black title">
										Intermediate
									</div>
									<div class="skill-list">
										<span v-for="(skill, index) in candidate.intermediateSkills" :key="index" class="skill-name text-break">
											{{ skill }}
										</span>
									</div>
								</div>
                <div v-if="candidate.beginnerSkills && candidate.beginnerSkills.length" class="skill-item d-pdf-flex">
									<div class="normal-text ifs-14 fw-700 lh-15 text-it-black title">
										Beginner
									</div>
									<div class="skill-list">
										<span v-for="(skill, index) in candidate.beginnerSkills" :key="index" class="skill-name text-break">
											{{ skill }}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="cv-card d-pdf-flex">
							<div class="title ifs-16 normal-text fw-700 lh-15 text-it-black">
								Kinh nghiệm làm việc
							</div>
							<div class="content ifs-12 normal-text fw-400 lh-18 text-it-black">
								<div v-for="(working, index) in candidate.working_experiences" :key="index" class="experience-item pb-4">
									<div class="experience-date text-it-black ifs-12 normal-text fw-600 lh-15 text-uppercase">
										{{ formattedDate(working.start_at) }} - {{ working.end_at ? formattedDate(working.end_at) : 'Hiện tại' }}
									</div>
									<div class="text-it-black ifs-14 normal-text fw-700 lh-15 d-pdf-flex imt-1">
										<!-- <p class="normal-text ifs-14 fw-700 lh-15 text-uppercase text-break">Full Stack Developer</p>
										<div class="vertical-line"></div> -->
										<p class="normal-text ifs-14 fw-700 lh-15 fw-400 text-break">{{ working.name }}</p>
									</div>
									<div class="text-it-black normal-text ifs-12 fw-400 lh-18 text-break">
										<div class="trix-content"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

  </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: 'CVUser',
  layout: 'auth',

  data() {
    return {
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
          key: 'note',
          label: 'Nhận xét',
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
      language: '',
      idCandidate: -1,
      defaultCandidate: {},
      candidate: {
        jobEducation: {},
        user: {},
      },
      educationsOfCandidate: [],
      jobsOfCandidate: [],
      selectedItemId: 0,
      name: '',
    }
  },

  head() {
    return { title: 'CV ứng viên' }
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
		this.getUserCv()
  },

	mounted() {
		this.drawProgressBar()
	},

  methods: {
		async getUserCv() {
			const { data } = await this.$repositories.candidatesApply.getUserCv(this.$route.params.candidateId);
			this.candidate = data
			this.candidate.beginnerSkills = data.skills.filter((item) => item.level === 'Beginner')
																								 .map((item) => item.skill.name);
			this.candidate.intermediateSkills = data.skills.filter((item) => item.level === 'Intermediate')
																								 .map((item) => item.skill.name);
			this.candidate.advancedSkills = data.skills.filter((item) => item.level === 'Advanced')
																								 .map((item) => item.skill.name);
		  this.drawProgressBar()
		},

    async acceptEducation() {
      if (this.candidate.status === 1) {
        const { data } = await this.$repositories.candidatesApply.acceptEducation(this.$route.params.candidateId);
        if (data) {
          this.$toast.success('Đã đồng ý đào tạo')
          location.reload()
        }
      }
    },

    async acceptInterview() {
      if (this.candidate.status === 1) {
        const { data } = await this.$repositories.candidatesApply.acceptInterview(this.$route.params.candidateId);
        if (data) {
          this.$toast.success('Đã duyệt phỏng vấn')
          location.reload()
        }
      }
    },

		drawProgressBar() {
			const value = this.candidate.matching_point;
			const left = this.$el.querySelector('.progress-left .progress-bar');
			const right = this.$el.querySelector('.progress-right .progress-bar');

			if (value > 0) {
				if (value <= 50) {
					right.style.transform = `rotate(${this.percentageToDegrees(value)}deg)`;
				} else {
					right.style.transform = 'rotate(180deg)';
					left.style.transform = `rotate(${this.percentageToDegrees(value - 50)}deg)`;
				}
			}
		},

		percentageToDegrees(percentage) {
      return percentage / 100 * 360;
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

    formattedDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear().toString().slice(2); // Get last two digits of the year
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits for month

      return `${year}/${month}`;
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
              this.$toast.success('応募者の応募状態・更新が完了しました')
              this.getListCV(this.currentPage)
            } else {
              this.$toast.error(
                '候補者の申請状況と候補者名の更新は完了していません。'
              )
            }
          })
        this.$refs.closeCheckModal.click()
      }
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

<style lang="scss" scoped>
@import '../../../styles/pages/candidates_apply/list.scss';
@import '../../../styles/pages/jobs/cv_user.scss';
</style>

<style lang="scss">
@import '../../../styles/pages/candidates_apply/listnotscoped.scss';
</style>
