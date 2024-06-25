<template>
  <main class="container-maintain" style="margin-top: 20px">
    <div v-if="hidePage && error == ''" class="maintain row" style="height: 80vh">
      <div class="loader"></div>
    </div>
    <div
      v-else-if="!isAuthenticated && isShowAlertLogin"
      class="pop-up-alert"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content box-modal">
          <div class="modal-header border-0">

          </div>
          <div class="modal-body">
            <h3 class="text-center">
              <img src="~/assets/images/icon_question_image.svg" alt="">
            </h3>
            <br>
            <br>
            <div>
              <h3 class="text-center modal-body-text">{{ $t('general.must_login_to_active') }}</h3>
              <h6 class="text-center link-to-profile-page" @click="$nuxt.$router.push(localePath(`/login?return_to=${$nuxt.$route.path}`, $i18n.locale))">{{ $t('general.login') }}</h6>
            </div>
          </div>
          <div class="modal-footer align-items-center d-flex justify-content-center flex-column mb-4">

          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="container"
    >
      <div class="row box-title mb-1 mb-lg-2">
        <div class="col-md-6 col-6">
          <h4 class="page-header-title">Tiến độ học tập</h4>
        </div>
      </div>
      <div
        class="row"
        :class="'lang-vn'"
      >
        <!-- left -->
        <div class="col-12 col-sm-12 col-md-4" style="padding-left: 30px">
          <div class="preview candidate-info mb-4">
            <div class="name-company">{{ user.name }}</div>
            <div
              class="logo-company"
            >
              <div class="avatar-container">
                <img class="rounded-avatar" :src="user.avatar || 'https://itviec.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeWtxUVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--91c6d10346d0b0f395db3a8b795c31bd4c370f56/ACg8ocKZceX38keureYmKW5jKBqjDkMFxUK380wj9dqsUoWE=s96-c.jpg'" alt="avatar">
              </div>
            </div>

            <!-- <div class="infor-one">
              <div class="location">
                Module đang học: <span class="fw-bold">{{ userRoadmap.current_module.name }} - {{ userRoadmap.current_course.title }}</span>
              </div>
            </div> -->
            <div
              class="detail-company"
              @click="$router.push('/candidates_apply/' + $route.params.candidateId + '/cv')"
            >
              Xem hồ sơ ứng viên
            </div>
          </div>
          <div class="preview">
            <div class="name-company">Tiến độ</div>
            <div
              class="logo-company"
            >
              <el-progress type="circle" :percentage="totalProgress || 0"></el-progress>
            </div>

            <!-- <div class="infor-one">
              <div class="location">
                Module đang học: <span class="fw-bold">{{ userRoadmap.current_module.name }} - {{ userRoadmap.current_course.title }}</span>
              </div>
            </div>
            <div
              class="detail-company"
            >
              Tiếp tục học >>
            </div> -->
          </div>
        </div>

        <!-- right -->
        <div class="col-12 col-sm-12 col-md-8">
          <div class="content-wrapper">
            <div class="title-job">
              <h3>{{ userRoadmap.title || 'Tên lộ trình học' }}</h3>
            </div>
            <div class="line"></div>

            <div class="box-content row">
              <div class="col-sm-12 col-md-12 pb-md-3 col-lg-6">
                <div class="image-content">
                  <div
                    v-if="items.image_job"
                    :src="url_api_file + items.image_job"
                    alt=""
                    width="100%"
                    height="220px"
                    class="job-ima"
                    :style="{
                      width: '100%',
                      height: '220px',
                      backgroundImage: `url(${url_api_file + items.image_job})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }"
                  ></div>
                  <img
                    v-else-if="items.default_image"
                    :src="require(`@/assets/images/draft/` + items.default_image)"
                    alt=""
                    width="330px"
                    height="220px"
                    class="job-ima"
                  />
                  <img
                    v-else
                    :src="require(`@/assets/images/draft` + homeCareers[(items.career ? items.career : 1 - 1)].image)"
                    alt=""
                    width="330px"
                    height="220px"
                    class="job-ima"
                  />
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-6">
                <div class="main-content">
                  <div v-if="items.accept_education" class="d-flex mb-2">
                    <span style="color: #bc282d"><b>Có thể đào tạo trong {{ items.max_education_month }} tháng <span v-if="items.scholarship > 0">với học bổng {{ items.scholarship }}%</span></b></span>
                  </div>
                  <div class="fw-bold mb-4" style="font-size: 24px">{{ job.title }}</div>
                  <div class="moneys mb-4 d-flex align-items-center">
                    <img
                      src="../../../assets/images/red_calendar.svg"
                      alt=""
                      width="24px"
                      height="24px"
                    />
                    Bắt đầu-  <span class="fw-bold"> 16/04/2024</span>
                  </div>
                  <div class="maps d-flex align-items-center">
                    <img
                      src="../../../assets/images/red_calendar.svg"
                      alt=""
                      width="24px"
                      height="24px"
                    />
                    Yêu cầu hoàn thành -  <span class="fw-bold"> 16/07/2024</span>
                  </div>
                  <!-- <div v-if="language == 'vn'" class="time d-flex align-items-center">
                    <img
                      src="../../assets/images/users/draft/red_calendar.svg"
                      alt=""
                      width="18px"
                      height="18px"
                    />
                    {{ $moment(items.date_start).format('DD/MM/YYYY') }} - {{
                    $moment(items.date_end).format('DD/MM/YYYY') }}
                  </div>
                  <div v-else class="time d-flex align-items-center">
                    <img
                      src="../../assets/images/users/draft/red_calendar.svg"
                      alt=""
                      width="18px"
                      height="18px"
                    />
                    {{ items.date_start.replaceAll('-', '/') }} - {{ items.date_end.replaceAll('-', '/') }}
                  </div> -->
                  <div class="d-flex flex-wrap align-items-center">
                    <div
                      v-for="(skill, index) in items.previewSkills"
                      :key="index"
                      class="skill skill-primary"
                    >
                      {{ skill }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-tabs v-model="progressTab" stretch>
              <el-tab-pane label="Lộ trình học" name="first">
                <h3 class="mb-2 mt-4 fw-bold">Lộ trình của hiện tại </h3>
                <div class="learning-route">
                  <div class="container text-center faq-con">
                    <div
                      v-for="data in datas"
                      :key="data.value"
                      class="row m-4 question-button"
                    >
                      <div class="p-con">
                        <p>
                          <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#' + data.class"
                            aria-expanded="false"
                            :aria-controls="data.class"
                            :class="{'shown': data.isShown, 'font-vi': $i18n.locale === 'vi', 'font-ja': $i18n.locale === 'ja'}"
                            @click="shownClass(data)">
                            <div class="row">
                                <div
                                        class="col-10 button-title fw-bold"
                                        style="text-align: start; padding-left: 30px"
                                >
                                    {{ data.course.title }} - {{ data.done_modules.length }}/{{ data.course.modules.length }} video đã xem - {{ data.done_tests.length }}/{{ data.course.tests.length }} bài test đã làm
                                     <!-- ({{data.is_finished ? 100 : (data.done_modules.length / (data.course.modules.length + data.course.tests.length) * 100)}}%) -->
                                </div>
                                <div
                                        class="col-2 mid"
                                        style="text-align: end; padding-right: 30px"
                                >
                                    <img
                                            src="../../../assets/images/plus.svg"
                                            alt=""
                                            :class="{ rotated: data.isShown }"
                                    />
                                </div>
                            </div>
                          </button>
                        </p>
                        <div :id="data.class" class="collapse">
                          <div class="card card-body text-start">
                            <ul class="course-module">
                              <li v-for="(content, index) in data.course.modules" :key="index" class="d-flex justify-content-between">
                                <span>{{ content.name }}</span>
                                <span>
                                  <img v-if="isModuleFinish(content.id || content._id, data)" src="../../../assets/images/checked-icon.png" alt="" width="18" height="18">
                                </span>
                              </li>
                              <li v-for="(test, index) in data.tests" :key="index" class="d-flex justify-content-between align-items-center">
                                <div>
                                  <div>Bài test {{ index + 1 }}: {{ test.test.name }} ({{ test.test.questions.length }} câu hỏi)</div>
                                  <div v-if="test.isFinished">Hoàn thành lúc: {{ test.answerSheet.finishedAt.split('T')[0] }} {{ test.answerSheet.finishedAt.split('T')[1].substring(0, test.answerSheet.finishedAt.split('T')[1].length - 1)  }}</div>
                                  <div v-if="test.isFinished">Điểm số: {{ test.answerSheet.mark / test.test.questions.length * 100 }}% - {{ test.answerSheet.mark }} / {{ test.test.questions.length }} câu trả lời đúng</div>
                                </div>
                                <span>
                                  <img v-if="test.isFinished" src="../../../assets/images/checked-icon.png" alt="" width="18" height="18">
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              </el-tab-pane>
              <el-tab-pane label="Thống kê" name="second">
                <h2 class="mb-4 mt-4 fw-bold">Thống kê thời gian học </h2>
                <div style="margin-bottom: 32px">
                  <h3 class="mb-3 mx-4 fw-bold">Thời gian xem video (tính theo phút): </h3>
                  <div>
                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div>
                          <el-statistic title="Tổng thời gian xem">
                            <template slot="formatter">
                              3600 phút
                            </template>
                          </el-statistic>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div>
                          <el-statistic title="Thời gian học trung bình">
                            <template slot="formatter">
                              120 phút
                            </template>
                          </el-statistic>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div>
                          <el-statistic title="Số ngày tham gia học">
                            <template slot="formatter">
                              30 ngày
                            </template>
                          </el-statistic>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div>
                          <el-statistic title="Ngày học nhiều nhất">
                            <template slot="formatter">
                              150 phút
                            </template>
                          </el-statistic>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <bar-chart :data-bar="videoWatchedLength" :labels="labels"></bar-chart>
                </div>
                <div>
                  <h3 class="mb-3 mx-4 fw-bold">Chi tiết tiến độ: </h3>
                  <el-row v-for="(course, index) in courseProgress" :key="index" :gutter="20" class="pb-3 mb-3" style="border-bottom: 1px solid #D4D4D4">
                    <el-col :span="10" style="padding-right: 12px;">
                      <h4 class="fw-bold">{{ index + 1 }}. {{ course.name || course.courseName }}</h4>
                      <h5 style="color: #6e6d6d">Thời điểm bắt đầu: <span>{{ course.started_at }}</span></h5>
                      <h5 style="color: #6e6d6d">Thời điểm hoàn thành: <span>{{ course.finished_at }}</span></h5>
                      <h5 style="color: #6e6d6d">Thời gian học: <span>{{ course.total_watch_time }} phút</span></h5>
                      <h5 style="color: #6e6d6d">Kết quả test trung bình: <span>{{ course.average_test_result }}%</span></h5>
                    </el-col>
                    <el-col :span="14" style="padding-left: 12px; border-left: 1px solid #D4D4D4">
                      <div v-for="mod in course.modules" :key="mod.id || mod._id" class="mb-2">
                        <h4 class="fw-bold" style="color: #3738E2">{{ mod.name }}</h4>
                        <h5 style="color: #6e6d6d">Thời gian học: {{ mod.watch_time }} phút</h5>
                      </div>
                      <div v-for="(test, tindex) in course.tests" :key="test.id || test._id" class="mb-2">
                        <h4 class="fw-bold" style="color: #1aa912">Bài test #{{ tindex + 1 }}: {{ test.name }}</h4>
                        <h5 style="color: #6e6d6d">Hoàn thành: {{ test.finished_at }}</h5>
                        <h5 style="color: #6e6d6d">Kết quả: {{ test.mark }}/{{ test.max_mark }}</h5>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
            </el-tabs>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import BarChart from '~/components/BarChart.vue';
import theHomeCareers from '~/constants/careerImages'

export default {
  name: 'EducationProgress',
  components: {
    BarChart
  },
  layout: 'auth',
  data() {
    return {
      progressTab: 'first',
      datas: [{
        course: {
          modules: [],
          tests: [],
        },
        done_modules: [],
        done_tests: [],
      }],
      isShowAlertLogin: true,
      url_api_file: process.env.URL_FILE,
      items: {},
      job: {},
      userRoadmap: {
        current_module: {},
        current_course: {},
      },
      jobEducation: {},
      career: '',
      careers: [],
      homeCareers: theHomeCareers,
      defaultCareerImageName: '',
      pageId: '',
      hidePage: true,
      error: '',
      showPrimaryJobStatusStay: false,
      showByIndex: [],
      indexCon: [0, 1, 2],
      isEnableLikeOrUnlikeClick: true,
      regionId: 0,
      totalProgress: 0,
      user: {},
      moduleProgressLogs: [
        {
          logId: "60cfc083b8565b25e472579f",
          user: "64c9fd43cf106733388fd35f",
          module: "661cced0b3bcda1f4044ff53",
          video_start_time: 0,
          total_video_update_time: 150,
          video_update_time: 150,
          created_at: new Date("2024-05-20T10:00:00Z"),
        },
        {
          logId: "60cfc083b8565b25e472579e",
          user: "64c9fd43cf106733388fd35f",
          module: "661cced0b3bcda1f4044ff58",
          video_start_time: 120,
          total_video_update_time: 230,
          video_update_time: 350,
          created_at: new Date("2024-05-21T15:30:00Z"),
        },
        {
          logId: "60cfc083b8565b25e472579d",
          user: "64c9fd43cf106733388fd35f",
          module: "661cced0b3bcda1f4044ff5d",
          video_start_time: 100,
          total_video_update_time: 450,
          video_update_time: 550,
          created_at: new Date("2024-05-22T08:45:00Z"),
        },
        {
          logId: "60cfc083b8565b25e472579c",
          user: "64c9fd43cf106733388fd35f",
          module: "661cced0b3bcda1f4044ff62",
          video_start_time: 200,
          total_video_update_time: 550,
          video_update_time: 750,
          created_at: new Date("2024-05-23T20:20:00Z"),
        },
      ],
      videoWatchedLength: [],
      labels: [],
      courseProgress: [
  {
    id: "60af924b4f1a4b1f8f3d5c5a",
    courseName: "Introduction to JavaScript",
    started_at: "15-01-2023",
    finished_at: "20-02-2023",
    total_watch_time: 1500,
    average_test_result: 85,
    modules: [
      {
        id: "60af924b4f1a4b1f8f3d5c5b",
        name: "JavaScript Basics",
        watch_time: 300
      },
      {
        id: "60af924b4f1a4b1f8f3d5c5c",
        name: "DOM Manipulation",
        watch_time: 400
      },
      {
        id: "60af924b4f1a4b1f8f3d5c5d",
        name: "ES6 Features",
        watch_time: 800
      }
    ],
    tests: [
      {
        id: "test1_id_here",
        name: "JavaScript Basics Test",
        is_finished: true,
        finished_at: "21-01-2023",
        max_mark: 10,
        mark: 8
      },
    ]
  },
  {
    id: "60af924b4f1a4b1f8f3d5c5e",
    courseName: "Advanced CSS Techniques",
    started_at: "01-03-2023",
    finished_at: "30-03-2023",
    total_watch_time: 1200,
    average_test_result: 90,
    modules: [
      {
        id: "60af924b4f1a4b1f8f3d5c5f",
        name: "Flexbox",
        watch_time: 500
      },
      {
        id: "60af924b4f1a4b1f8f3d5c60",
        name: "Grid Layout",
        watch_time: 700
      }
    ],
    tests: [
      {
        id: "test3_id_here",
        name: "Flexbox Test",
        is_finished: true,
        finished_at: "02-04-2023",
        max_mark: 10,
        mark: 9
      }
    ]
  },
  {
    id: "60af924b4f1a4b1f8f3d5c61",
    courseName: "React for Beginners",
    started_at: "10-04-2023",
    finished_at: "15-05-2023",
    total_watch_time: 2000,
    average_test_result: 92,
    modules: [
      {
        id: "60af924b4f1a4b1f8f3d5c62",
        name: "React Basics",
        watch_time: 600
      },
      {
        id: "60af924b4f1a4b1f8f3d5c63",
        name: "State and Props",
        watch_time: 800
      },
      {
        id: "60af924b4f1a4b1f8f3d5c64",
        name: "Component Lifecycle",
        watch_time: 600
      }
    ],
    tests: [
      {
        id: "test4_id_here",
        name: "React Basics Test",
        is_finished: true,
        finished_at: "20-04-2023",
        max_mark: 15,
        mark: 13
      },
      {
        id: "test5_id_here",
        name: "State and Props Test",
        is_finished: true,
        finished_at: "25-04-2023",
        max_mark: 20,
        mark: 18
      }
    ]
  },
  {
    id: "60af924b4f1a4b1f8f3d5c65",
    courseName: "Node.js Essentials",
    started_at: "01-06-2023",
    finished_at: "30-06-2023",
    total_watch_time: 1800,
    average_test_result: 88,
    modules: [
      {
        id: "60af924b4f1a4b1f8f3d5c66",
        name: "Introduction to Node.js",
        watch_time: 600
      },
      {
        id: "60af924b4f1a4b1f8f3d5c67",
        name: "Express.js Basics",
        watch_time: 600
      },
      {
        id: "60af924b4f1a4b1f8f3d5c68",
        name: "Database Integration",
        watch_time: 600
      }
    ],
    tests: [
      {
        id: "test6_id_here",
        name: "Introduction to Node.js Test",
        is_finished: false,
        finished_at: null,
        max_mark: 12,
        mark: 0
      }
    ]
  }
],
    }
  },

  head() {
      return {
        title: `CV`,
      }
  },

  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated']),
  },

  mounted() {
    if (this.$nuxt.context.from) {
      window.location.reload();
    }
  },

  created() {
    if (this.isAuthenticated) {
      this.getCandidateEducationProgress()
      this.getCandidateEducationStatistic()
      this.processData()
      this.hidePage = false
    }
    else {
      this.hidePage = false
    }
  },

  methods: {
    processData() {
      this.videoWatchedLength = this.moduleProgressLogs.map(log => log.total_video_update_time);

      this.labels = [
        {
          labels: this.moduleProgressLogs.map(log => {
            const date = new Date(log.created_at);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
          }), // Module names
          labelData1: 'Video Watched Length' // Legend label for video watched length
        }
      ];
    },
    userPointColor(job) {
      const point = job.user_job_point / job.job_point;
      if (point >= 0.75) {
        return 'green'
      } else if (point >= 0.5) {
        return '#67c8ed'
      } else if (point >= 0.25) {
        return 'color: rgb(188, 40, 45)'
      } else {
        return 'gray'
      }
    },
    async getCandidateEducationStatistic() {
      const { data } = await this.$repositories.candidatesApply.getCandidateEducationStatistic(this.$route.params.candidateId)
      console.log(data)
    },
    async getCandidateEducationProgress() {
      this.isShowAlertLogin = false
      const { data } = await this.$repositories.candidatesApply.getCandidateEducationProgress(this.$route.params.candidateId)

      if (data) {
        this.job = data.job
        this.jobEducation = data.jobEducation
        this.userRoadmap = data.userRoadmap
        this.totalProgress = data.roadmapProgress
        this.user = data.user
        if (this.userRoadmap) {
          this.datas = this.userRoadmap.roadmap_milestone.map((item, index) => {
            return {
              ...item,
              isShown: false,
              class: 'about-' + index,
            }
          })
        }
      }
    },

    isModuleFinish(moduleId, course) {
      if(course.done_modules && course.done_modules.length !== 0) {
        if (course.done_modules.includes(moduleId)) {
          return true;
        }
      }
      return false
    },

    routeToJobDetailPage(job) {
      const jobDetailRoute = `/jobs/detail/${job.id}`
      this.$repositories.jobs.increaseCountClick({
        path: jobDetailRoute,
        job_id: job.id
      })
      this.$router.push(this.localePath(jobDetailRoute, this.$i18n.locale))
    },

    shownClass(data) {
      data.isShown = !data.isShown
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../styles/pages/candidates_apply/detail-roadmap.scss';
.jobRequirement.requirements {
  ul {
    margin-bottom: 0 !important;
  }
}
.learning-route {
  .course-module {
    list-style-type: none;
    padding-left: 0;
    li {
      padding: 16px;
      cursor: pointer;
    }
    li:hover {
      background: #bababa;
    }
  }
  p {
    margin-bottom: 0;
  }
  button {
      background-color: white !important;
      color: #00756A !important;
      font-size: 20px !important;
      border-color: #B2B2B2 !important;
      width: 100%;
      border: none !important;
      border-top: 2px solid rgba(0, 0, 0, 0.125) !important;
  }

  .card-body {
      background-color: #F1F1F1;
      padding: 0 !important;
      color: #606060;
      font-size: 16px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      border: none !important
  }

  button:hover {
    box-shadow: none !important;
  }

  .about-visa {
      padding-bottom: 50px;
  }

  .row {
    margin: 0 !important;
  }
  .mid {
    display: flex;
    justify-content: flex-end;
  }
  .mid img {
    width: 18px;
    transition: 0.2s;
  }

  .rotated {
    transform: rotate(45deg);
  }

  .p-con {
    margin: 0 auto;
    margin-top: 1.5rem;
    border: 2px solid rgba(0, 0, 0, 0.125);
    padding: 0 !important;
    border-top: none;
    background-color: #F1F1F1;
  }
  .shown {
    border-bottom: 2px solid rgba(0, 0, 0, 0.125) !important;
  }
}
</style>
<style lang="scss">
.el-tabs__item.is-active {
  color: #BC282D;
}
.el-tabs__item:hover {
  color: #BC282D;
}
.el-tabs__active-bar {
  background-color: #BC282D;
}
.el-table .cell {
  word-break: keep-all;
}
</style>
