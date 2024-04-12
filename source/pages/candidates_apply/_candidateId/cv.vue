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
						<div class="progress-bar">
							<div class="progress mx-auto" data-value='80'>
								<span class="progress-left">
															<span class="progress-bar border-primary"></span>
								</span>
								<span class="progress-right">
															<span class="progress-bar border-primary"></span>
								</span>
								<div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
									<div class="h2 font-weight-bold">80<sup class="small">%</sup></div>
								</div>
							</div>
						</div>
						<div class="text-center">
							Đánh giá: Phù hợp
						</div>
					</div>
					<div class="info-section">
						<div class="d-flex justify-content-between fs-5">
							<div>Ngày ứng tuyển:</div>
							<div class="fw-bold">17-03-2023</div>
						</div>
						<div class="d-flex justify-content-between fs-5">
							<div>Hình thức:</div>
							<div class="fw-bold">Đăng kí đào tạo</div>
						</div>
						<div class="d-flex justify-content-between fs-5">
							<div>Thời gian dự kiến:</div>
							<div class="fw-bold">2 tháng</div>
						</div>
						<div class="d-flex justify-content-between mb-4 fs-5">
							<div>Học bổng:</div>
							<div class="fw-bold">50%</div>
						</div>
						<div class="d-flex justify-content-between">
							<button class="btn btn-secondary">
								Từ chối
							</button>
							<button class="btn btn-primary">
								Duyệt đào tạo
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
							<div class="user-name text-white normal-text ifs-24 fw-700 lh-14 text-break">Đức Tùng Nguyễn</div>
							<div class="subtitle ifs-16 fw-300 text-uppercase lh-15 text-dark-grey">Add your title</div>
						</div>
						<div class="user-info d-pdf-flex">
							<div class="left-items">
								<div class="item">
									<div class="d-flex align-items-center">
										<img class="cv-icon icon-sm" src="https://itviec.com/assets/cv_templates/icons/phone-8ec46b9e46b6e6ea3bf01fa198bbb8dbcbfb86b33a2c2766e7ccfa4b1c694d5c.svg" />
										<p class="name text-dark-grey">Add your phone number</p>
									</div>
								</div>
								<div class="item">
									<div class="d-flex align-items-start">
										<img class="cv-icon icon-sm imt-1" src="https://itviec.com/assets/cv_templates/icons/mail-f5038b679849f3bc3747122a3108a84d59cd05ad6c23f3b5e60e816cf45d9f0a.svg" />
										<p class="name text-break">tobakonek1@gmail.com</p>
									</div>
								</div>
							</div>
							<div class="right-items">
								<div class="item">
									<div class="d-flex align-items-center">
										<img class="cv-icon icon-sm" src="https://itviec.com/assets/cv_templates/icons/birthday-31b2f78f09966779fa4b2c97f58e40bf544fc7fe8dbcd65fa5a685d33b58825e.svg" />
										<p class="name text-dark-grey">Add your date of birth</p>
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
								Education
							</div>
							<div class="content ifs-12 normal-text fw-400 lh-18 text-it-black">
								<div class="education-item ipb-0">
									<span class="text-it-black ifs-14 normal-text fw-700 lh-15 text-break">
										Hust
									</span>
									<div class="d-pdf-flex">
										<p class="education-date">09/2019 - NOW</p>
										<div class="vertical-line"></div>
										<p class="fw-500 text-break">Information Specialist</p>
									</div>
									<span class="lh-15 fw-400 text-break"></span>
								</div>
							</div>
						</div>
						<div class="cv-card d-pdf-flex">
							<div class="title ifs-16 normal-text fw-700 lh-15 text-it-black">
								Skill
							</div>
							<div class="content ifs-12 normal-text fw-400 lh-18 text-it-black">
								<div class="skill-item d-pdf-flex">
									<div class="normal-text ifs-14 fw-700 lh-15 text-it-black title">
										Intermediate
									</div>
									<div class="skill-list">
										<span class="skill-name text-break">
											JavaScript
										</span>
										<span class="skill-name text-break">
											HTML5
										</span>
										<span class="skill-name text-break">
											Laravel
										</span>
										<span class="skill-name text-break">
											PHP
										</span>
										<span class="skill-name text-break">
											Japanese
										</span>
										<span class="skill-name text-break">
											MySQL
										</span>
										<span class="skill-name text-break">
											CSS
										</span>
									</div>
								</div>
								<div class="skill-item d-pdf-flex">
									<div class="normal-text ifs-14 fw-700 lh-15 text-it-black title">
										Beginner
									</div>
									<div class="skill-list">
										<span class="skill-name text-break">
											Nest.js
										</span>
										<span class="skill-name text-break">
											MongoDB
										</span>
										<span class="skill-name text-break">
											Flutter
										</span>
										<span class="skill-name text-break">
											Dart
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="cv-card d-pdf-flex">
							<div class="title ifs-16 normal-text fw-700 lh-15 text-it-black">
								Work Experience
							</div>
							<div class="content ifs-12 normal-text fw-400 lh-18 text-it-black">
								<div class="experience-item pb-4">
									<div class="experience-date text-it-black ifs-12 normal-text fw-600 lh-15 text-uppercase">
										01/2023 - NOW
									</div>
									<div class="text-it-black ifs-14 normal-text fw-700 lh-15 d-pdf-flex imt-1">
										<p class="normal-text ifs-14 fw-700 lh-15 text-uppercase text-break">Full Stack Developer</p>
										<div class="vertical-line"></div>
										<p class="normal-text ifs-14 fw-700 lh-15 fw-400 text-break">DIMAGE SHARE VIETNAM CO.,LTD</p>
									</div>
									<div class="text-it-black normal-text ifs-12 fw-400 lh-18 text-break">
										<div class="trix-content"></div>
									</div>
								</div>
								<div class="experience-item ipb-0">
									<div class="experience-date text-it-black ifs-12 normal-text fw-600 lh-15 text-uppercase">
										05/2021 - 11/2022
									</div>
									<div class="text-it-black ifs-14 normal-text fw-700 lh-15 d-pdf-flex imt-1">
										<p class="normal-text ifs-14 fw-700 lh-15 text-uppercase text-break">Full Stack Web Developer</p>
										<div class="vertical-line"></div>
										<p class="normal-text ifs-14 fw-700 lh-15 fw-400 text-break">Kiaisoft Việt Nam</p>
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
      candidate: {},
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
		},

		drawProgressBar() {
			const value = 50;
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
