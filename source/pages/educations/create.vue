<template>
  <main class="container my-3 my-lg-4">
    <div class="create_job pb-4 pb-lg-5">
      <h4 class="pt-2 pb-4 pt-lg-3 pb-lg-5 text-center">Form chương trình đào tạo mới</h4>
      <form @submit.prevent="previewJob()">
        <div class="mx-3 mx-lg-5">

          <div class="form-group mb-3 mb-lg-4 row">
            <label for="exampleInput1" class="col-sm-2 col-form-label">Vị trí công việc <span>*</span></label>
            <div class="col-sm-10 flex-column">
              <div class="input-group input-group-icon">
                <span class="input-group-text input-group-text-pre">
                    <img src="../../assets/images/icon_newspaper.svg" alt="">
                </span>
								<select id="exampleInput1" v-model="jobId" class="form-select rounded-end" :disabled="loadingJobDetail">
                  <option v-for="jobb in jobList" :key="jobb.id" :value="jobb.id">{{ jobb.title }}</option>
                </select>
              </div>
            </div>
          </div>

          <div v-if="jobId" class="form-group mb-3 mb-lg-4 row">
            <label for="careerSelect" class="col-sm-2 col-form-label">Lĩnh vực</label>
            <div class="col-12 col-sm-4">
              <div class="input-group input-group-icon">
                <span class="input-group-text input-group-text-pre">
                    <img src="~/assets/images/icon_cube.svg" alt="">
                </span>
                <select id="careerSelect" v-model="job.career" class="form-select rounded-end" disabled>
                  <option
                    v-for="(item, index) in careerList"
                    :key="index"
                    :value="index + 1"
                  >
                    {{ $t(item) }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div v-if="jobId" class="form-group mb-3 mb-lg-4 row">
            <label for="date_start" class="col-sm-2 col-form-label">Ngày bắt đầu</label>
            <div class="col-12 col-sm-4 flex-column">
              <div class="input-group input-group-icon custom-input-group">
                <span class="input-group-text input-group-text-pre">
                    <img src="../../assets/images/icon_calendar_2.svg" alt="">
                </span>
                <no-ssr>
                  <date-picker
                    id="date_start"
                    v-model="job.date_start"
                    value-type="format"
                    format="YYYY-MM-DD"
                    :clearable="false"
                    :editable="false"
                    :disabled-date="notBeforeToday"
                    input-class="input-datepicker-create-job"
										disabled
                  />
                </no-ssr>
              </div>
            </div>
          </div>
          <div v-if="jobId" class="form-group mb-3 mb-lg-4 row">
            <label for="displayMonthSelect" class="col-sm-2 col-form-label">Thời gian đăng tuyển (Tháng)</label>
            <div class="col-12 col-sm-4">
              <div class="input-group input-group-icon">
                <span class="input-group-text input-group-text-pre">
                    <img src="../../assets/images/icon_job_display_month.svg" alt="">
                </span>
                <select id="displayMonthSelect" v-model="job.display_month" class="form-select rounded-end" disabled>
                  <option v-for="item in displayMonthList" :key="item.value" :value="item.value">{{ item.text }}</option>
                </select>
              </div>
            </div>
          </div>
          <div v-if="jobId" class="form-group mb-3 mb-lg-4 row">
            <label for="exampleInput5" class="col-sm-2 col-form-label">Số người thuê dự kiến</label>
            <div class="col-12 col-sm-4">
              <div class="input-group input-group-icon">
                <span class="input-group-text input-group-text-pre">
                    <img src="../../assets/images/icon_two_user.svg" alt="">
                </span>
                <input
                  id="exampleInput5"
                  ref="numberRecruitmentsTextBox"
                  v-model="job.number_recruitments"
                  type="number"
                  class="form-control rounded-end"
                  min="1"
									disabled
                >
              </div>
              <div v-if="$v.job.number_recruitments.$error">
                <div v-if="!$v.job.number_recruitments.required" class="error-text">Đây là trường bắt buộc nên vui lòng điền</div>
                <div v-else-if="!$v.job.number_recruitments.isNumber" class="error-text">Vui lòng nhập một số nguyên</div>
                <div v-else-if="!$v.job.number_recruitments.maxLength" class="error-text">Vui lòng nhập dưới 10 ký tự</div>
              </div>
            </div>
          </div>
          <div v-if="jobId" class="form-group mb-3 mb-lg-4 row">
            <label for="example8" class="col-sm-2 col-form-label">Yêu cầu công việc</label>
            <div class="col-12 col-sm-10">(Chọn nhiều lựa chọn ở 1 ô để thể hiện tính tương đương)</div>
          </div>
          <div v-if="jobId" class="form-group mb-3 mb-lg-4 row">
            <label for="example8" class="col-sm-2 col-form-label"></label>
            <div class="col-12 col-sm-10">
              <div class="row">
                <div class="col-2">
                  Kĩ năng
                </div>
                <div class="col-9">
                  <div class="row mb-2">

                  </div>
                  <div class="row mb-2">
                    <div>
                      <div class="fw-bold">
                        Hiểu biết sơ
                      </div>
                      <div class="tag-container px-3">
                        <div v-if="!beginnerSkills.length" class="">Chưa thêm kỹ năng</div>
                        <div v-else>
                          <ul>
                            <li v-for="(item, index) in beginnerSkills" :key="index">
                              <div>
                                <span v-for="(iitem, iindex) in item" :key="iindex">
                                  {{ iitem.name }}
                                  <span v-if="iindex !== item.length - 1">hoặc</span>
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="fw-bold">
                        Hiểu biết trung bình
                      </div>
                      <div class="tag-container px-3">
                        <div v-if="!intermediateSkills.length" class="">Chưa thêm kỹ năng</div>
                        <div v-else>
                          <ul>
                            <li v-for="(item, index) in intermediateSkills" :key="index">
                              <div>
                                <span v-for="(iitem, iindex) in item" :key="iindex">
                                  {{ iitem.name }}
                                  <span v-if="iindex !== item.length - 1">hoặc</span>
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="fw-bold">
                        Thành thạo
                      </div>
                      <div class="tag-container px-3">
                        <div v-if="!advancedSkills.length" class="">Chưa thêm kỹ năng</div>
                        <div v-else>
                          <ul>
                            <li v-for="(item, index) in advancedSkills" :key="index">
                              <div>
                                <span v-for="(iitem, iindex) in item" :key="iindex">
                                  {{ iitem.name }}
                                  <span v-if="iindex !== item.length - 1">hoặc</span>
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-2">
                  Chứng chỉ
                </div>
                <div class="col-9">
                  <div class="row mb-2">

                  </div>
                  <div class="mb-2 px-3">
                    <div v-if="!certificates.length" class="">Chưa thêm chứng chỉ</div>
                    <div v-else>
                      <ul>
                        <li v-for="(item, index) in certificates" :key="index">
                          <div>
                            <span v-for="(iitem, iindex) in item" :key="iindex">
                              {{ iitem.name }}
                              <span v-if="iindex !== item.length - 1" class="fw-bold">hoặc</span>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-2">
                  Bằng đại học
                </div>
                <div class="col-9">
                  <div class="row mb-2">

                  </div>
                  <div class="mb-2 px-3">
                    <div v-if="!collegeMajors.length" class="">Chưa thêm bằng đại học</div>
                    <div v-else>
                      <ul>
                        <li v-for="(item, index) in collegeMajors" :key="index">
                          <div>
                            Tốt nghiệp
                            <span v-if="item.colleges.length === 0">
                              đại học
                            </span>
                            <span v-else>
                              <span v-for="(college, cindex) in item.colleges" :key="cindex">
                                {{ college.name }}
                                <span v-if="cindex !== item.colleges.length - 1" class="fw-bold">hoặc</span>
                              </span>
                            </span>
                            <span>chuyên ngành</span>
                            <span v-for="(iitem, iindex) in item.majors" :key="iindex">
                              {{ iitem.name }}
                              <span v-if="iindex !== item.majors.length - 1" class="fw-bold">hoặc</span>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

					<div class="form-group mb-3 mb-lg-4 row">
            <div class="col-12">
              <div class="row mb-3">
								<label class="col-2 col-form-label">
									Thời gian đào tạo tối đa (tháng) <span>*</span>
								</label>
								<div class="col-4">
									<div class="input-group input-group-icon">
										<span class="input-group-text input-group-text-pre">
												<img src="../../assets/images/icon_job_display_month.svg" alt="">
										</span>
										<input
											id="exampleInput5"
											ref="numberRecruitmentsTextBox"
											v-model="job.max_education_month"
											type="number"
											class="form-control rounded-end"
											min="1"
											@input="$v.job.max_education_month.$touch()"
                  		@blur="$v.job.max_education_month.$touch()"
											@keypress="keyPressForNumberInput"
										>
									</div>
									<div v-if="$v.job.max_education_month.$error">
										<div v-if="!$v.job.max_education_month.required" class="error-text">Đây là trường bắt buộc nên vui lòng điền</div>
									</div>
								</div>
							</div>
              <div class="row mb-3">
                    <label class="col-2 col-form-label">
                      Số người đào tạo dự kiến <span>*</span>
                    </label>
                    <div class="col-4">
                      <el-slider
                          v-model="job.number_trainings"
                          :step="1"
                          :max="job.number_recruitments"
                          show-stops>
                        </el-slider>
                      <!-- <div class="input-group input-group-icon">
                        <span class="input-group-text input-group-text-pre">
                            <img src="../../../assets/images/icon_two_user.svg" alt="">
                        </span>
                        <input
                          id="exampleInput5"
                          ref="numberRecruitmentsTextBox"
                          v-model="job.number_trainings"
                          type="number"
                          class="form-control rounded-end"
                          min="1"
                          @input="$v.job.number_trainings.$touch()"
                          @blur="$v.job.number_trainings.$touch()"
                          @keypress="keyPressForNumberInput"
                        >
                      </div> -->
                      <div v-if="$v.job.number_trainings.$error">
                        <div v-if="!$v.job.number_trainings.required" class="error-text">Đây là trường bắt buộc nên vui lòng điền</div>
                      </div>
                    </div>
                  </div>
							<div class="row mb-3">
								<label class="col-2 col-form-label">
									Học bổng (%) <span>*</span>
								</label>
								<div class="col-4">
									<div class="input-group input-group-icon">
										<span class="input-group-text input-group-text-pre">
												<img src="../../assets/images/icon_money_jp.svg" alt="">
										</span>
										<input
											id="exampleInput5"
											ref="numberRecruitmentsTextBox"
											v-model="job.scholarship"
											type="number"
											class="form-control rounded-end"
                  		min="1"
											@input="$v.job.scholarship.$touch()"
                  		@blur="$v.job.scholarship.$touch()"
											@keypress="keyPressForNumberInput"
										>
									</div>
									<div v-if="$v.job.scholarship.$error">
										<div v-if="!$v.job.scholarship.required" class="error-text">Đây là trường bắt buộc nên vui lòng điền</div>
									</div>
								</div>
							</div>
              <div class="row">
								<label class="col-2 col-form-label">
									Yêu cầu chương trình đào tạo
								</label>
								<div class="col-10">
									<client-only>
                    <VueEditor
                      v-model="job.custom_requirement"/>
                  </client-only>
								</div>
							</div>
            </div>
          </div>

          <div class="text-end">
            <button
              type="button"
              class="btn btn-lg border rounded-pill ms-2 ms-lg-3 btn-cancel-create_job"
              data-bs-toggle="modal"
              data-bs-target="#confirmCancelModal"
            >
              <span class="px-4">Cancel</span>
            </button>
            <button
              id="btn_job"
              type="submit"
              class="btn btn-lg border rounded-pill btn-edit-create_job"
							@click="sendRequest"
            >
              <span class="px-4">Gửi yêu cầu</span>
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Modal -->
    <div id="confirmCancelModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            >
          </div>
          <div class="modal-body">
            <h3 class="text-center modal-body-text">Xác nhận xóa tuyển dụng?</h3>
          </div>
          <div class="modal-footer align-items-center d-flex justify-content-center flex-row">
            <button type="button" class="btn btn-secondary-custom rounded-pill w-20 mt-4 mb-4" data-bs-dismiss="modal">Hủy bỏ</button>
            <button type="button" class="btn btn-danger rounded-pill w-20" @click="resetForm">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import {validationMixin} from 'vuelidate'
  import {
    maxLength,
    required,
    requiredIf,
  } from 'vuelidate/lib/validators'
  import vClickOutside from 'v-click-outside'
  import defaultCareers from '~/constants/careers'
  import careerImages from "~/constants/careerImages";

  export default {
    name: "CreateJob",

    directives: {
      clickOutside: vClickOutside.directive
    },
    mixins: [validationMixin],
    layout: 'auth',

    data() {
      return {
				jobId: null,
        previewNewRoute: '/jobs/preview-new',
        openDateEndPicker: false,
        previewImageJobUrl: null,
        displaySalary: 'salary_range',
        careerList: defaultCareers,
        provinceList: [],
        careerImages,
        job: {},
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
        skillModel: [],
        skillArr: [
          {
            name: 'abc',
            id: 1
          },
          {
            name: 'xyz',
            id: 2
          }
        ],
        levelModel: [],
        levelArr: [
          {
            label: 'Có hiểu biết sơ',
            value: 'Beginner'
          },
          {
            label: 'Hiểu biết trung bình',
            value: 'Intermediate'
          },
          {
            label: 'Thành thạo',
            value: 'Advanced'
          }
        ],
        certificateModel: [],
        certificateArr: [],
        majorModel: [],
        majorArr: [],
        collegeModel: [],
        collegeArr: [],
        beginnerSkills: [],
        intermediateSkills: [],
        advancedSkills: [],
        certificates: [],
        collegeMajors: [],
				jobList: [{
					id: null,
					title: 'Không có dữ liệu'
				}],
				loadingJobDetail: false,
      }
    },

    validations: {
      job: {
        number_recruitments: {
          required,
          isNumber(value) {
            // eslint-disable-next-line prefer-regex-literals
            const numberRegExp = new RegExp("^\\d+$")
            return numberRegExp.test(value)
          },
          maxLength: maxLength(10)
        },
				max_education_month: {
					required: requiredIf(function() {
						return this.job.accept_education;
					})
				},
				scholarship: {
					required: requiredIf(function() {
						return this.job.accept_education;
					})
				},
        number_trainings: {
					required: requiredIf(function() {
						return this.job.accept_education;
					})
				}
      }
    },

    head() {
      return { title: 'RouteRecruite | Tạo yêu cầu chương trình đào tạo'}
    },

    computed: {
      // previewImageJob() {
      //   return this.job.image_job ? URL.createObjectURL(this.job.image_job) : null
      // },
    },

    watch: {
      displaySalary: {
        handler(newVal) {
          this.job.salary_min = ''
          this.job.salary_max = ''
          this.$v.job.salary_min.$reset()
          this.$v.job.salary_max.$reset()
        },
        deep: true
      },
			jobId() {
				this.getJob();
			}
    },

    created() {
      this.getRequirementOptions()
      this.getAllJobs()
    },

    methods: {
			resetEducation() {
				this.job.max_education_month = 0
				this.job.scholarship = 0
			},
			async getAllJobs() {
				const data = await this.$repositories.jobs.getAllJobs()
        if (data.status === 200) {
          this.jobList = data.data?.length ? [...data.data] : [{
						id: null,
						title: 'Không có dữ liệu'
					}]
        }
			},
      async getRequirementOptions() {
        const data = await this.$repositories.jobs.getRequirementOptions()
        if (data.status === 200) {
          const options = data.data
          this.skillArr = options.skills
          this.certificateArr = options.certificates
          this.majorArr = options.majors
          this.collegeArr = options.colleges
        }
      },
			async getJob() {
				this.loadingJobDetail = true
        try {
            await this.$repositories.jobs.getJob(this.jobId)
              .then((response) => {
                this.job = Object.assign({}, response.data.job)
                this.job.image_job = null
                this.previewImageJobUrl = null
                this.oldImageJob = response.data.job.image_job
                this.job.salary_min = parseFloat(response.data.job.salary_min.toString())
                this.job.salary_max = parseFloat(response.data.job.salary_max.toString())
                if (this.job.overtime === 'null') this.job.overtime = ''
                this.beginnerSkills = [...response.data.beginnerSkills]
                this.intermediateSkills = [...response.data.intermediateSkills]
                this.advancedSkills = [...response.data.advancedSkills]
                this.certificates = [...response.data.certificates]
                this.collegeMajors = [...response.data.majorColleges]
                this.displaySalary = 'salary_range'
              });
        		this.loadingJobDetail = false
          } catch (e) {
        		this.loadingJobDetail = false
//            console.log(e.message)
          }
			},
      onInputOrBlurSalaryMin() {
        if (this.job.salary_max) {
          this.$v.job.salary_max.$reset()
        }
        this.$v.job.salary_min.$touch()
      },

      onInputOrBlurSalaryMax() {
        if (this.job.salary_min) {
          this.$v.job.salary_min.$reset()
        }
        this.$v.job.salary_max.$touch()
      },

      onClickBoxUploadFile() {
        this.$refs.imageJob.click()
      },

      onChangeImageJob(e) {
        if (e.target.files[0]) {
          this.job.image_job = e.target.files[0]
        }
        this.processAfterSelectImage()
      },

      dropImage(e) {
        if (e.dataTransfer.files[0]) {
          this.job.image_job = e.dataTransfer.files[0]
        }
        this.processAfterSelectImage()
      },

      processAfterSelectImage() {
        if (this.job.image_job) {
          this.$v.job.image_job.$touch()
          if (this.$v.job.image_job.$invalid) {
            this.previewImageJobUrl = null
          } else {
            this.previewImageJobUrl = URL.createObjectURL(this.job.image_job)
          }
        } else {
          this.$v.job.image_job.$reset()
          this.previewImageJobUrl = null
        }
      },

      notBeforeToday(date) {
        // return date < new Date(new Date().setHours(0, 0, 0, 0));
        return this.$moment(date) < this.$moment();
      },

      resetData() {
        this.job = Object.assign({}, {
          image_job: null,
          title: '',
          career: 1,
          date_start: this.$moment().add(1, 'day').format('YYYY-MM-DD'),
          type_plan: '',
          display_month: '',
          number_recruitments: '',
          salary_max: '',
          salary_min: '',
          content_work: '',
          conditions_apply: '',
          province_id: 1,
          address_work: '',
          time_work: '',
          welfare_regime: '',
          overtime: ''
        })
        this.job.type_plan = this.typePlanList[0].value
        this.job.display_month = this.displayMonthList[0].value
        this.previewImageJobUrl = null
        this.displaySalary = 'salary_range'
        this.$v.$reset()
      },

      resetForm() {
        // this.resetData()
        this.$store.dispatch('job/setJob', {})
        this.$refs.closeConfirmCancelModal.click()
        this.$router.push('/jobs')
      },

      keyPressForNumberInput(evt) {
        if (evt.which !== 13 && evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
          evt.preventDefault();
        }
      },

			sendRequest() {
				const { data } = this.$repositories.educations.requestEducationForJob(this.jobId, {
					max_education_month: this.job.max_education_month,
					scholarship: this.job.scholarship,
					number_trainings: this.job.number_trainings,
					custom_requirement: this.job.custom_requirement,
				});
				if (data) {
					this.$router.push('/educations')
					this.$toast.success('Đã yêu cầu chương trình đào tạo!')
				}
			},

      previewJob() {
        // this.$v.job.$touch()
        // if (!this.$v.job.$invalid) {
          // if (parseInt(this.job.type_plan) === 1) {
          //   this.$repositories.jobs.countJobsPlanA({ date_start: this.job.date_start }).then(res => {
          //     if (res.status === 200) {
          //       if (res.data < JOBS_PLAN_A_LIMIT) {
          //         this.$store.dispatch('job/setJob', this.job)
          //         this.$router.push('/jobs/preview-new')
          //       } else {
          //         this.$toast.error('プランAの求人件数は上限に達しましたので、他のプランを選択してください')
          //       }
          //     }
          //   })
          // } else {
					this.job.beginnerSkills = this.beginnerSkills
					this.job.intermediateSkills = this.intermediateSkills
					this.job.advancedSkills = this.advancedSkills
					this.job.certificates = this.certificates
					this.job.collegeMajors = this.collegeMajors
					this.$store.dispatch('job/setJob', this.job)
					this.$router.push('/jobs/preview-new')
          // }
        // }
				// else if (this.$v.job.title.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.titleTextBox?.focus()
        //   })
        // } else if (this.$v.job.number_recruitments.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.numberRecruitmentsTextBox?.focus()
        //   })
        // } else if (this.$v.job.salary_min.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.salaryMinTextBox?.focus()
        //   })
        // } else if (this.$v.job.salary_max.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.salaryMaxTextBox?.focus()
        //   })
        // } else if (this.$v.job.content_work.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.contentWorkTextBox?.focus()
        //   })
        // } else if (this.$v.job.conditions_apply.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.conditionsApplyTextBox?.focus()
        //   })
        // } else if (this.$v.job.address_work.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.addressWorkTextBox?.focus()
        //   })
        // } else if (this.$v.job.time_work.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.timeWorkTextBox?.focus()
        //   })
        // } else if (this.$v.job.welfare_regime.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.welfareRegimeTextBox?.focus()
        //   })
        // }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/pages/jobs/create.scss';
</style>

<style lang="scss">
  @import '../../styles/pages/jobs/date-picker.scss';
</style>
