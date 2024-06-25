<template>
  <main class="container my-3 my-lg-4">

    <div v-if="loadingListCv" class="card detail-job-card position-relative">
      <div class="outer-spinner">
        <div class="loader"></div>
      </div>
    </div>

    <div v-if="!loadingListCv" class="card detail-job-card position-relative">
      <div class="detail-job-content">
        <!-- <button id="btn-edit" class="btn p-0" @click="onClickEditJob()">
          <img
            width="30"
            height="30"
            src="../../../assets/images/icon_edit.svg"
          />
        </button> -->
        <div class="mt-0 mt-lg-2 pt-0 pt-lg-3 pb-2">
          <div class="row">
            <div class="col-12 col-lg-6 pe-3 pe-xl-5">
              <img class="img-fluid w-100 rounded-img" :src="job.job_image" alt="" />
            </div>
            <div class="col-12 col-lg-6 mt-4 mt-lg-0">
              <h1 class="mb-3 mb-lg-4">Lộ trình đào tạo <strong>{{ job.title}}</strong></h1>
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
                  <span class="me-2">Thời gian đào tạo yêu cầu: </span>
                  <strong>{{ job.max_education_month }} tháng</strong>
                </div>
                <div class="d-flex mb-2">
                  <span class="me-2">Học bổng cung cấp: </span>
                  <strong>{{ job.scholarship }}% giá trị khóa học</strong>
                </div>
                <div class="d-flex mb-2">
                  <span class="me-2">Chỉ tiêu đào tạo: </span>
                  <strong>{{ job.education.number_trainings }} học viên</strong>
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
      <div id="moreContent" class="collapse show">
        <div class="detail-job-content py-0">
          <el-tabs v-model="jobTab" stretch>
            <el-tab-pane label="Nội dung công việc" name="first">
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
                        <td>
                          {{ job.number_recruitments}} người
                        </td>
                      </tr>
                      <tr>
                        <td class="head-table">Yêu cầu kỹ thuật</td>
                        <td class="requirements">
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
                        <td>
                          <v-runtime-template :template="`<div>${job.conditions_apply}</div>`"></v-runtime-template>
                        </td>
                      </tr>
                      <tr>
                        <td class="head-table">Địa chỉ</td>
                        <td>
                          {{ job.address_work}}
                        </td>
                      </tr>
                      <tr>
                        <td class="head-table">Thời gian làm việc</td>
                        <td>
                          <v-runtime-template :template="`<div>${job.time_work}</div>`"></v-runtime-template>
                        </td>
                      </tr>
                      <tr>
                        <td>Phúc lợi</td>
                        <td>
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
            </el-tab-pane>
            <el-tab-pane :disabled="job.education_status === 1 || !job.accept_education" :label="`Lộ trình dự kiến (${job.accept_education ? (job.education_status ? jobEducationStatus[job.education_status - 1] : 'Đang xử lí') : 'Không đăng kí'})`" name="second">
              <div class="learning-route">
                <div class="container text-center faq-con">
                  <div
                    v-for="data in datas"
                    :key="data.value"
                    class="row m-4 question-button"
                  >
                    <div class="p-con">
                      <p>
                        <button class="btn btn-primary btn-module" type="button" data-bs-toggle="collapse"
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
                                  {{ data.title }}
                              </div>
                              <div
                                      class="col-2 mid"
                                      style="text-align: end; padding-right: 30px"
                              >
                                  <img
                                          src="../../../assets/images/icon_arrow_down.svg"
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
                            <li v-for="(content, index) in data.modules" :key="index" class="d-flex justify-content-between" @click="previewModule(content)">
                              <span>{{ content.name }}</span>
                              <span>

                              </span>
                            </li>
                            <li v-for="(test, index) in data.tests" :key="index" class="d-flex justify-content-between align-items-center" @click="showPreviewTest(test)">
                              <div>
                                <div>Bài test {{ index + 1 }}: {{ test.name }} ({{ test.questions.length }} câu hỏi)</div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="
                    align-items-center
                    d-flex
                    justify-content-end
                    flex-row
                  "
                >
                  <button
                    v-if="job.education_status !== 3"
                    type="button"
                    class="btn btn-secondary rounded-pill w-20 mt-4 mb-4 mx-4 more-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#popUpChange"
                  >
                    Yêu cầu thay đổi
                  </button>
                  <button
                    v-if="job.education_status !== 3"
                    type="button"
                    class="btn btn-custom btn-primary rounded-pill w-20 more-btn"
                    @click="confirmOpenEducation = true"
                  >
                    Mở đào tạo
                  </button>
                  <button
                    v-else
                    type="button"
                    class="btn btn-custom btn-primary rounded-pill mt-4 mb-4 w-20 more-btn"
                    @click="confirmCloseEducation = true"
                  >
                    Đóng đào tạo
                  </button>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>

        </div>
      </div>
      <hr class="my-0" />
      <button
        class="btn bg-transparent btn-more"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#moreContent"
        aria-expanded="true"
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
        <h2 class="flex-grow-1">Danh sách học viên</h2>
      </div>
      <div class="row table-responsive box-table">
        <table class="table table-list-cv">
          <thead>
            <tr>
              <th v-for="header in fields" :key="header.key" class="text-center">
                {{ header.label }}
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items" :key="item.id" :class="item.read === 1 ? 'active' : ''">
            <td class="align-middle py-3 text-center">
                          <!-- <span v-if="item.status === 1"
                                :class="(perPage * (currentPage - 1)) + (index + 1) < 10 ? 'td-warning' : 'td-warning-large'"
                          >
                            未対応！
                            <img class="" src="../../../assets/images/icon_warning.svg"/>
                          </span> -->
              {{ index + 1 }}
            </td>
            <td class="align-middle py-4">
              <div href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="popupCvUser(item)">
                {{ item.userName }}
              </div>
            </td>
            <td class="align-middle text-center py-3">{{$moment(item.startDate).format('YYYY-MM-DD')}}</td>
            <td class="align-middle text-center py-3">{{item.isFinished ? 'Đã hoàn thành' : 'Chưa hoàn thành'}}</td>
            <td class="align-middle text-center py-3 col-status">
              {{ item.watchedModules }}
            </td>
            <td class="align-middle text-center py-3">
              {{item.watchedTime}} phút
            </td>
            <td class="align-middle text-center py-3">
              {{ item.doneCourses }}
            </td>
            <td class="align-middle py-3">

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
      </Pagination>
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
      id="popUpChange"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="popUpChangeLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content success-content">
          <div class="modal-header">
            <a data-bs-dismiss="modal" class="btn-close" aria-label="Close">
              <img src="../../../assets/images/icon_modal_close.svg" alt="" />
            </a>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <h5 id="popUpChangeLabel" class="modal-title check-title">
              Yêu cầu thay đổi nội dung lộ trình học
            </h5>
          </div>
          <div class="modal-body pop-check-input">
            <!-- <label for="remarks"></label> -->
            <textarea
              id="remarks"
              v-model="changeRequest"
              class="form-control"
            />
            <div class="submit-btn">
              <button
                id="apply-btn"
                class="btn btn-primary mt-4 rounded-pill"
                @click="sendChangeRequest"
              >
                Gửi yêu cầu
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
    <el-dialog :visible.sync="confirmOpenEducation" title="Mở đào tạo">
      <div>
        <div>
          <h3 class="text-center modal-body-text">
            Xác nhận mở đào tạo?
          </h3>
        </div>
        <div
          class="
            align-items-center
            d-flex
            justify-content-center
            flex-row
          "
        >
          <button
            type="button"
            class="btn btn-secondary rounded-pill w-20 mt-4 mb-4"
            data-bs-dismiss="modal"
          >
            Hủy bỏ
          </button>
          <div style="width: 20px"></div>
          <button
            type="button"
            class="btn btn-primary rounded-pill w-20"
            @click="toggleEducation()"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="confirmCloseEducation" title="Đóng đào tạo">
      <div>
        <div>
          <h3 class="text-center modal-body-text">
            Xác nhận đóng đào tạo?
          </h3>
        </div>
        <div
          class="
            align-items-center
            d-flex
            justify-content-center
            flex-row
          "
        >
          <button
            type="button"
            class="btn btn-secondary rounded-pill w-20 mt-4 mb-4"
            data-bs-dismiss="modal"
          >
            Hủy bỏ
          </button>
          <div style="width: 20px"></div>
          <button
            type="button"
            class="btn btn-primary rounded-pill w-20"
            @click="closeEducation()"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="previewDialog" :title="moduleName">
      <PreviewModule :source="videoSource" />
    </el-dialog>
    <el-dialog :visible.sync="previewTest" :title="testName">
      <TestDetail :test="test" />
    </el-dialog>
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
  import PreviewModule from "~/components/PreviewModule"
  import TestDetail from "~/components/TestDetail"
  import defaultCareers from '~/constants/careers'
  import defaultInCvUser from "~/constants/defaultInCvUser"
  import theStatusStay from "~/constants/statusStay"
  import theProvinces from "~/constants/provinces"
  import residenceCardConfirm from "~/constants/residenceCardConfirm";
  import statusCandidateApply from "~/constants/statusCandidateApply";
  import careerImages from "~/constants/careerImages";
  import jobStatus from "~/constants/jobStatus";
  import jobEducationStatus from '~/constants/jobEducationStatus'

  export default {
    name: "JobDetail",
    components: {
      Pagination,
			VRuntimeTemplate,
      PreviewModule,
      TestDetail,
    },
    mixins: [validationMixin],
    layout: 'auth',

    data() {
      return {
        jobTab: 'second',
        jobEducationStatus,
        jobStatus,
        message: '',
        message_vi: '',
        message_ja: '',
        cvType: 1,
        loadingListCv: '',
        loadingJobDetail: '',
        datas: [],
        test: {},
        videoSource: '',
        moduleName: '',
        previewDialog: false,
        testName: '',
        confirmCloseEducation: false,
        previewTest: false,
        statusStays: theStatusStay,
        provincesList: theProvinces,
        confirmOpenEducation: false,
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
          education: {},
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
            label: 'Tên học viên'
          },
          {
            key: 'start_date',
            label: 'Ngày bắt đầu'
          },
          {
            key: 'status',
            label: 'Trạng thái'
          },
          {
            key: 'watched_modules',
            label: 'Module đã xem'
          },
          {
            key: 'watched_time',
            label: 'Thời gian học'
          },
          {
            key: 'completed_courses',
            label: 'Khóa học đã hoàn thành'
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
        changeRequest: '',
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
    this.getListCV(this.currentPage)
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

      previewModule(module) {
        this.videoSource = module.video;
        this.moduleName = module.name
        this.previewDialog = true;
      },

      showPreviewTest(test) {
        this.testName = test.name
        this.test = test
        this.previewTest = true;
      },

      async getJobFromApi() {
        this.loadingJobDetail = true
        const {data} = await this.$repositories.educations.getEducationDetail(this.$route.params.id)
        if (data.job) {
          this.job = Object.assign({}, data.job)
          this.job.job_image = this.job.image_job ? this.url_file + this.job.image_job : require(`@/assets/images/draft` + careerImages[this.job.career - 1]?.image)
          this.beginnerSkills = [...data.beginnerSkills]
          this.intermediateSkills = [...data.intermediateSkills]
          this.advancedSkills = [...data.advancedSkills]
          this.certificates = [...data.certificates]
          this.majorColleges = [...data.majorColleges]
          this.previewSkills = data.previewSkills.flat().map((item) => item.name).slice(0, 3);
          this.datas = this.job.registeredCourses.map((item, index) => {
            return {
              ...item,
              isShown: false,
              class: 'about-' + index,
            }
          })
        } else {
          this.$router.push('/jobs')
        }
        this.loadingJobDetail = false
      },

      async toggleEducation() {
        const { data } = await this.$repositories.jobs.toggleJobEducation(this.job.id || this.job._id)
        if (data) {
          this.$toast.success('Đã mở đào tạo')
          location.reload()
        }
      },

      async closeEducation() {
        const { data } = await this.$repositories.jobs.closeJobEducation(this.job.id || this.job._id)
        if (data) {
          this.$toast.success('Đã đóng đào tạo')
          location.reload()
        }
      },


      async sendChangeRequest() {
        const { data } = await this.$repositories.jobs.sendChangeRequest(this.$route.params.id, { change_request: { content: this.changeRequest } })
        if (data) {
          this.$toast.success('Đã gửi yêu cầu thay đổi chương trình học')
          location.reload()
        }
      },

      async getListCV(currentPage) {
        this.loadingListCv = true
        const {data} = await this.$repositories.educations.getEducationParticipant(this.$route.params.id)
        this.loadingListCv = false

        this.items = data
        this.totalItems = data.length
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
              this.$toast.success('Cập nhật trạng thái ứng tuyển của ' + this.user_name + ' thành công')
              this.getListCV(this.currentPage);
            }
            if (res.response && res.response.status === 500) {
              this.$toast.error('Không hoàn thành cập nhật tình trạng ứng tuyển và tên ứng viên.')
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

    popupCvUser(item) {
      // this.language = this.lang_vi
      // this.$i18n.locale = this.language
      // this.idRow = candidateApply.id
      // this.defaultCandidate = Object.assign({}, candidateApply.candidate)
      // this.candidate = Object.assign({}, this.defaultCandidate)
      // this.cvType = candidateApply.cv_type
      // this.message_vi = candidateApply.message ? candidateApply.message : ''
      // this.message_ja = candidateApply.message_jp ? candidateApply.message_jp : ''
      // this.initJobsAndEducationsOfCandidate()
      // this.changeLanguage(this.lang_ja)
      // if (candidateApply.read === 0) {
      //   await this.$repositories.candidatesApply.updateStatus(this.idRow, { read: 1}).then(res => {
      //     if (res.status === 200) {
      //       this.getListCV(this.currentPage);
      //     }
      //   })
      // }
      this.$router.push('/candidates_apply/' + item.candidateApplyId + '/education-progress')
    },

    redirectCandidate(item) {
      if (item.status === 4) {
        this.$router.push('/candidates_apply/' + item.id + '/education-progress')
      }
    },

    initJobsAndEducationsOfCandidate() {
      this.educationsOfCandidate =
        this.candidate_educations_jobs.filter(function (element) {
          return element.type === 1
        })
      this.jobsOfCandidate = this.candidate_educations_jobs.filter(
        function (element) {
          return element.type === 2
        }
      )
    },
    shownClass(data) {
      data.isShown = !data.isShown
    }
  },
}
</script>

<style scoped lang="scss">
@import '../../../styles/pages/jobs/detail_job.scss';
@import '../../../styles/pages/jobs/cv_user.scss';
@import '../../../styles/pages/candidates_apply/list.scss';
#popUpChange {
  .pop-check-input {
    margin: 0 2rem;
    font-size: 14px;
  }
  .modal-content {
    height: 300px;
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
  .btn-module {
      background-color: white !important;
      color: #00756A !important;
      font-size: 20px !important;
      border-color: #B2B2B2 !important;
      width: 100%;
      border: none !important;
      border-top: 2px solid rgba(0, 0, 0, 0.125) !important;
  }

  .more-btn {
    width: unset;
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
    transform: rotate(-90deg);
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
<style>
p {
	margin-bottom: 0 !important;
}
</style>

<style lang="scss">
.detail-job-content {
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
