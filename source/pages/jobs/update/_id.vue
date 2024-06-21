<template>
    <main class="container my-3 my-lg-4">
        <form @submit.prevent="previewJob()">
          <div class="create_job pb-4 pb-lg-5">
            <h4 class="pt-2 pb-4 pt-lg-3 pb-lg-5 text-center">Cập nhật tuyển dụng</h4>
            <div class="mx-3 mx-lg-5">
              <div class="form-group mb-4 mb-lg-5">
                <div
                  class="p-4 box-upload-file text-center rounded"
                  @click="onClickBoxUploadFile"
                  @drop.prevent="dropImage"
                  @dragover.prevent
                >
                  <input
                    ref="imageJob"
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    style="display: none"
                    @change="onChangeImageJob"
                  />
                  <img v-if="previewImageJobUrl" class="preview-image" :src="previewImageJobUrl" alt=""/>
                  <img v-else-if="oldImageJob" class="preview-image" :src="url_file + oldImageJob" alt=""/>
                  <img v-else src="../../../assets/images/icon_upload_file.svg" alt=""/>
                  <p class="m-0">Kéo thả hoặc click để tải ảnh lên</p>
                </div>

                <div v-if="$v.job.image_job.$error" class="text-center error-text">
                  <div v-if="!$v.job.image_job.name.imageRule">Vui lòng tải lên hình ảnh ở định dạng png/jpg/jpeg/gif</div>
                  <div v-if="!$v.job.image_job.size">Vui lòng tải lên ảnh có dung lượng dưới 2 MB</div>
                </div>
              </div>
              <div class="form-group mb-3 mb-lg-4 row">
                <label for="exampleInput1" class="col-sm-2 col-form-label">Vị trí công việc <span>*</span></label>
                <div class="col-sm-10 flex-column">
                  <div class="input-group input-group-icon">
                    <span class="input-group-text input-group-text-pre">
                      <img
                        src="../../../assets/images/icon_newspaper.svg"
                        alt=""
                      />
                    </span>
                    <input
                      id="exampleInput1"
                      ref="titleTextBox"
                      v-model="job.title"
                      type="text"
                      class="form-control rounded-end"
                      @input="$v.job.title.$touch()"
                      @blur="$v.job.title.$touch()"
                    />
                  </div>
                  <div v-if="$v.job.title.$error">
                    <div
                      v-if="!$v.job.title.required"
                      class="error-text"
                    >
                      Đây là trường bắt buộc nên vui lòng điền
                    </div>
                    <div
                      v-if="!$v.job.title.maxLength"
                      class="error-text"
                    >
                      Vui lòng nhập dưới 100 ký tự
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-3 mb-lg-4 row">
                <label for="careerSelect" class="col-sm-2 col-form-label">Lĩnh vực <span>*</span></label>
                <div class="col-12 col-sm-4">
                  <div class="input-group input-group-icon">
                <span class="input-group-text input-group-text-pre">
                    <img src="~/assets/images/icon_cube.svg" alt="">
                </span>
                    <select id="careerSelect" v-model="job.career" class="form-select rounded-end">
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

              <div class="form-group mb-3 mb-lg-4 row">
                <label for="exampleInput2" class="col-sm-2 col-form-label">Ngày bắt đầu <span>*</span></label>
                <div class="col-12 col-sm-4 flex-column">
                  <div
                    class="
                      input-group input-group-icon
                      custom-input-group
                    "
                  >
                    <span class="input-group-text input-group-text-pre">
                      <img
                        src="../../../assets/images/icon_calendar_2.svg"
                        alt=""
                      />
                    </span>
                    <no-ssr>
                      <date-picker
                        id="exampleInput2"
                        v-model="job.date_start"
                        value-type="format"
                        format="YYYY-MM-DD"
                        :clearable="false"
                        :editable="false"
                        input-class="input-datepicker-create-job"
                        @input="inputOrBlurDateStart"
                        @blur="inputOrBlurDateStart"
                      />
                    </no-ssr>
                  </div>
                  <div v-if="$v.job.date_start.$error">
                    <div
                      v-if="!$v.job.date_start.required"
                      class="error-text"
                    >
                      Đây là trường bắt buộc, vui lòng điền
                    </div>
                    <div
                      v-if="
                                      !$v.job.date_start.isLessThanOrEqualDateEnd
                                  "
                      class="error-text"
                    >
                      Ngày bắt đầu phải lớn hơn ngày hiện tại
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group mb-3 mb-lg-4 row">
                <label for="displayMonthSelect" class="col-sm-2 col-form-label">Thời gian đăng tuyển (Tháng)<span>*</span></label>
                <div class="col-12 col-sm-4">
                  <div class="input-group input-group-icon">
                <span class="input-group-text input-group-text-pre">
                    <img src="../../../assets/images/icon_job_display_month.svg" alt="">
                </span>
                    <select id="displayMonthSelect" v-model="job.display_month" class="form-select rounded-end">
                      <option v-for="item in displayMonthList" :key="item.value" :value="item.value">{{ item.text }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group mb-3 mb-lg-4 row">
                <label for="exampleInput5" class="col-sm-2 col-form-label"
                >Số người thuê dự kiến <span>*</span></label
                >
                <div class="col-12 col-sm-4">
                  <div class="input-group input-group-icon">
                              <span class="input-group-text input-group-text-pre">
                                  <img
                                    src="../../../assets/images/icon_two_user.svg"
                                    alt=""
                                  />
                              </span>
                    <input
                      id="exampleInput5"
                      ref="numberRecruitmentsTextBox"
                      v-model="job.number_recruitments"
                      type="number"
                      class="form-control rounded-end"
                      min="1"
                      @input="$v.job.number_recruitments.$touch()"
                      @blur="$v.job.number_recruitments.$touch()"
                      @keypress="keyPressForNumberInput"
                    />
                  </div>
                  <div v-if="$v.job.number_recruitments.$error">
                    <div
                      v-if="!$v.job.number_recruitments.required"
                      class="error-text"
                    >
                      Đây là trường bắt buộc, vui lòng điền
                    </div>
                    <div
                      v-else-if="!$v.job.number_recruitments.isNumber"
                      class="error-text"
                    >
                      Nhập dưới dạng số
                    </div>
                    <div
                      v-else-if="!$v.job.number_recruitments.maxLength"
                      class="error-text"
                    >
                      Hãy nhập dưới 10 ký tự
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-3 row">
                <label class="col-sm-2 col-form-label">Khoảng lương <span>*</span></label>
                <div v-if="displaySalary === 'salary_range'" class="col-12 col-sm-4">
                  <div class="input-group input-group-icon">
                    <span class="input-group-text input-group-text-pre">
                      <img src="../../../assets/images/icon_money_jp.svg" alt="">
                    </span>
                    <input
                      ref="salaryMinTextBox"
                      v-model="job.salary_min"
                      type="text"
                      class="form-control rounded-end"
                      @input="onInputOrBlurSalaryMin"
                      @blur="onInputOrBlurSalaryMin"
                      @keypress="keyPressForNumberInput"
                    >
                  </div>
                  <div v-if="$v.job.salary_min.$error">
                    <div v-if="!$v.job.salary_min.required" class="error-text">Đây là trường bắt buộc nên vui lòng điền</div>
                    <div v-if="!$v.job.salary_min.maxLength" class="error-text">Vui lòng nhập dưới 10 ký tự</div>
                    <div v-if="!$v.job.salary_min.isLowerThanSalaryMax" class="error-text">Vui lòng nhập nhỏ hơn lương tối đa</div>
                  </div>
                </div>
                <div
                  v-if="displaySalary === 'salary_range'"
                  class="col-12 col-sm-1 range-salary-character text-center pt-1"
                >
                  ～
                </div>
                <div v-if="displaySalary === 'salary_range'" class="col-12 col-sm-4">
                  <div class="input-group input-group-icon">
                    <span class="input-group-text input-group-text-pre">
                      <img src="../../../assets/images/icon_money_jp.svg" alt="">
                    </span>
                    <input
                      ref="salaryMaxTextBox"
                      v-model="job.salary_max"
                      type="text"
                      class="form-control rounded-end"
                      @input="onInputOrBlurSalaryMax"
                      @blur="onInputOrBlurSalaryMax"
                      @keypress="keyPressForNumberInput"
                    >
                  </div>
                  <div v-if="$v.job.salary_max.$error">
                    <div v-if="!$v.job.salary_max.required" class="error-text">Đây là trường bắt buộc nên vui lòng điền</div>
                    <div v-if="!$v.job.salary_max.maxLength" class="error-text">Vui lòng nhập dưới 10 ký tự</div>
                    <div v-if="!$v.job.salary_max.isGreaterThanSalaryMin" class="error-text">Vui lòng nhập lớn hơn lương tối thiểu</div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-3 mb-lg-4 row">
                <label for="exampleInput5" class="col-sm-2 col-form-label">Chấp nhận đào tạo</label>
                <div class="col-12 col-sm-4">
                  <div class="input-group input-group-icon">
                    <div class="form-check form-switch">
                      <input id="flexSwitchCheckChecked" v-model="job.accept_education" class="form-check-input" type="checkbox" role="switch" @change="resetEducation">
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="job.accept_education" class="form-group mb-3 mb-lg-4 row">
                <label for="exampleInput5" class="col-2 col-form-label"></label>
                <div class="col-10">
                  <div class="row mb-3">
                    <div class="col-3">
                      Thời gian đào tạo tối đa (tháng)
                    </div>
                    <div class="col-4">
                      <div class="input-group input-group-icon">
                        <span class="input-group-text input-group-text-pre">
                            <img src="../../../assets/images/icon_job_display_month.svg" alt="">
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
                    <div class="col-3">
                      Số người đào tạo dự kiến
                    </div>
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
                  <div class="row">
                    <div class="col-3">
                      Học bổng (%)
                    </div>
                    <div class="col-4">
                      <div class="input-group input-group-icon">
                        <span class="input-group-text input-group-text-pre">
                            <img src="../../../assets/images/icon_money_jp.svg" alt="">
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
                    <div class="col-3">
                      Yêu cầu chương trình đào tạo
                    </div>
                    <div class="col-9">
                      <client-only>
                        <VueEditor
                          v-model="job.custom_requirement"/>
                      </client-only>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-3 mb-lg-4 row">
                <label for="example7" class="col-sm-2 col-form-label"
                >Nội dung công việc <span>*</span></label
                >
                <div class="col-12 col-sm-10">
  								<VueEditor v-model="job.content_work"/>
                          <!-- <textarea
                            id="example7"
                            ref="contentWorkTextBox"
                            v-model="job.content_work"
                            type="text"
                            class="form-control rounded-end"
                            rows="3"
                            @input="$v.job.content_work.$touch()"
                            @blur="$v.job.content_work.$touch()"
                          /> -->
                  <div class="row">
                    <div v-if="$v.job.content_work.$error" class="col-6 align-items-start">
                      <div
                        v-if="!$v.job.content_work.required"
                        class="error-text"
                      >
                        Đây là trường bắt buộc, vui lòng điền
                      </div>
                      <div
                        v-if="!$v.job.content_work.minLength"
                        class="error-text"
                      >
                        Hãy nhập trên 30 ký tự
                      </div>
                      <div
                        v-if="!$v.job.content_work.maxLength"
                        class="error-text"
                      >
                        Hãy nhập dưới 200 ký tự
                      </div>
                    </div>
                    <div
                      class="col-6 text-right"
                      :class="{
                                'offset-6': !$v.job.content_work.$error
                              }"
                    >
                      <div
                        v-if="job.content_work.length < 200"
                        class="error-text text-black"
                      >
                        Còn lại{{ 200 - job.content_work.length }} ký tự
                      </div>
                      <div v-else class="error-text text-black">Còn lại 0 ký tự</div>
                    </div>
                  </div>
                </div>
              </div>

          <div class="form-group mb-3 mb-lg-4 row">
            <label for="example8" class="col-sm-2 col-form-label">Yêu cầu công việc <span>*</span></label>
            <div class="col-12 col-sm-10">(Chọn nhiều lựa chọn ở 1 ô để thể hiện tính tương đương)</div>
          </div>

          <div class="form-group mb-3 mb-lg-4 row">
            <label for="example8" class="col-sm-2 col-form-label"></label>
            <div class="col-12 col-sm-10">
              <div class="row">
                <div class="col-2">
                  Kĩ năng
                </div>
                <div class="col-9">
                  <div class="row mb-2">
                    <div class="col-5">
                      <v-select
                        v-model="skillModel"
                        :options="skillArr"
                        :reduce="(item) => item"
                        label="name"
                        placeholder="Chọn kỹ năng"
                        multiple
                      >
                        <template #no-options="{ searching }">
                          <template v-if="searching">
                            Không có dữ liệu
                          </template>
                        </template>
                      </v-select>
                    </div>
                    <div class="col-4">
                      <v-select
                        v-model="levelModel"
                        :options="levelArr"
                        :reduce="(item) => item.value"
                        label="label"
                        placeholder="Chọn mức độ thành thạo"
                      >
                        <template #no-options="{ searching }">
                          <template v-if="searching">
                            Không có dữ liệu
                          </template>
                        </template>
                      </v-select>
                    </div>
                    <div class="col-3">
                      <button
                        type="button"
                        class="btn btn-lg border ms-2 ms-lg-3 py-1"
                        @click="addSkills"
                      >
                        Thêm
                      </button>
                    </div>
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
                                <span class="error-text" style="cursor: pointer" @click="deleteBeginnerSkillItem(item)">Xóa</span>
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
                                <span class="error-text" style="cursor: pointer" @click="deleteIntermediateSkillItem(item)">Xóa</span>
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
                                <span class="error-text" style="cursor: pointer" @click="deleteAdvancedSkillItem(item)">Xóa</span>
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
                    <div class="col-5">
                      <v-select
                        v-model="certificateModel"
                        :options="certificateArr"
                        :reduce="(item) => item"
                        label="name"
                        placeholder="Chọn chứng chỉ"
                        multiple
                      >
                        <template #no-options="{ searching }">
                          <template v-if="searching">
                            Không có dữ liệu
                          </template>
                        </template>
                      </v-select>
                    </div>
                    <div class="col-3">
                      <button
                        type="button"
                        class="btn btn-lg border ms-2 ms-lg-3 py-1"
                        @click="addCertificates"
                      >
                        Thêm
                      </button>
                    </div>
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
                            <span class="error-text" style="cursor: pointer" @click="deleteCertificateItem(item)">Xóa</span>
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
                    <div class="col-5">
                      <v-select
                        v-model="majorModel"
                        :options="majorArr"
                        :reduce="(item) => item"
                        label="name"
                        placeholder="Chọn chuyên ngành"
                        multiple
                      >
                        <template #no-options="{ searching }">
                          <template v-if="searching">
                            Không có dữ liệu
                          </template>
                        </template>
                      </v-select>
                    </div>
                    <div class="col-4">
                      <v-select
                        v-model="collegeModel"
                        :options="collegeArr"
                        :reduce="(item) => item"
                        label="name"
                        placeholder="Chọn đại học (Không bắt buộc)"
                        multiple
                      >
                        <template #no-options="{ searching }">
                          <template v-if="searching">
                            Không có dữ liệu
                          </template>
                        </template>
                      </v-select>
                    </div>
                    <div class="col-3">
                      <button
                        type="button"
                        class="btn btn-lg border ms-2 ms-lg-3 py-1"
                        @click="addMajors"
                      >
                        Thêm
                      </button>
                    </div>
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
                            <span class="error-text" style="cursor: pointer" @click="deleteMajorItem(item)">Xóa</span>
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
                <label for="example8" class="col-sm-2 col-form-label"
                >Điều kiện khác <span>*</span></label
                >
                <div class="col-12 col-sm-10">
  								<VueEditor v-model="job.conditions_apply"/>
                          <!-- <textarea
                            id="example8"
                            ref="conditionsApplyTextBox"
                            v-model="job.conditions_apply"
                            type="text"
                            class="form-control rounded-end"
                            rows="3"
                            @input="$v.job.conditions_apply.$touch()"
                            @blur="$v.job.conditions_apply.$touch()"
                          /> -->
                  <div v-if="$v.job.conditions_apply.$error">
                    <div
                      v-if="!$v.job.conditions_apply.required"
                      class="error-text"
                    >
                      Đây là trường bắt buộc, vui lòng điền
                    </div>
                    <div
                      v-if="!$v.job.conditions_apply.maxLength"
                      class="error-text"
                    >
                      1000文字以下で入力してください
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-3 mb-lg-4 row">
                <label for="example10" class="col-sm-2 col-form-label">Thời gian làm việc <span>*</span></label>
                <div class="col-12 col-sm-10">
  								<VueEditor v-model="job.time_work"/>
              <!-- <textarea
                id="example10"
                ref="timeWorkTextBox"
                v-model="job.time_work"
                type="text"
                class="form-control rounded-end"
                rows="3"
                @input="$v.job.time_work.$touch()"
                @blur="$v.job.time_work.$touch()"
              /> -->
                  <div v-if="$v.job.time_work.$error">
                    <div v-if="!$v.job.time_work.required" class="error-text">Đây là trường bắt buộc, vui lòng điền</div>
                    <div v-if="!$v.job.time_work.maxLength" class="error-text">Vui lòng nhập dưới 200 ký tự</div>
                  </div>
                </div>
              </div>
              <div class="form-group mb-3 mb-lg-4 row">
                <label for="example13" class="col-sm-2 col-form-label">Phúc lợi <span>*</span></label>
                <div class="col-12 col-sm-10">
  								<VueEditor v-model="job.time_work"/>
                    <!-- <textarea
                      id="example13"
                      ref="welfareRegimeTextBox"
                      v-model="job.welfare_regime"
                      type="text"
                      class="form-control rounded-end"
                      rows="3"
                      @input="$v.job.welfare_regime.$touch()"
                      @blur="$v.job.welfare_regime.$touch()"
                    /> -->
                  <div v-if="$v.job.welfare_regime.$error">
                    <div v-if="!$v.job.welfare_regime.required" class="error-text">Đây là trường bắt buộc, vui lòng điền</div>
                    <div v-if="!$v.job.welfare_regime.maxLength" class="error-text">500文字以下で入力してください</div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-3 mb-lg-4 row">
                <label for="province" class="col-sm-2 col-form-label">Trụ sở làm việc (Tỉnh) <span>*</span></label>
                <div class="col-12 col-sm-4">
                  <div class="input-group input-group-icon">
                <span class="input-group-text input-group-text-pre">
                    <img src="../../../assets/images/icon_province.svg" alt="">
                </span>
                    <select
                      id="province"
                      v-model="job.province_id"
                      class="form-select rounded-end"
                    >
                      <option
                        v-for="(province, index) in provinceList.slice(1)"
                        :key="index"
                        :value="index + 1"
                      >
                        {{ $t(province) }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="form-group mb-3 mb-lg-4 row">
                <label for="example9" class="col-sm-2 col-form-label">Địa chỉ cụ thể <span>*</span></label>
                <div class="col-12 col-sm-10">
                  <input
                    id="example9"
                    ref="addressWorkTextBox"
                    v-model="job.address_work"
                    type="text"
                    class="form-control rounded-end"
                    rows="3"
                    @input="$v.job.address_work.$touch()"
                    @blur="$v.job.address_work.$touch()"
                  />
                  <div v-if="$v.job.address_work.$error">
                    <div v-if="!$v.job.address_work.required" class="error-text">Đây là trường bắt buộc, vui lòng điền</div>
                    <div v-if="!$v.job.address_work.maxLength" class="error-text">Vui lòng nhập dưới 200 ký tự</div>
                  </div>
                </div>
              </div>

              <!--<div class="form-group mb-3 mb-lg-4 row">
                <label for="example15" class="col-sm-2 col-form-label">残業見込み、休日出勤見込み</label>
                <div class="col-12 col-sm-10">
                  <textarea
                    id="example15"
                    v-model="job.overtime"
                    type="text"
                    class="form-control rounded-end"
                    rows="3"
                  />
                  <div v-if="$v.job.overtime.$error">
                    <div v-if="!$v.job.overtime.maxLength" class="error-text">1000文字以下で入力してください</div>
                  </div>
                </div>
              </div>-->

              <div class="text-end">
                <button
                  type="button"
                  class="
                    btn btn-lg
                    border
                    rounded-pill
                    ms-2 ms-lg-3
                    btn-cancel-create_job
                  "
                  data-bs-toggle="modal"
                  data-bs-target="#confirmCancelModal"
                >
                  <span class="px-4">Hủy bỏ</span>
                </button>
                <button
                  id="btn_job"
                  type="submit"
                  class="
                    btn btn-lg
                    border
                    rounded-pill
                    btn-edit-create_job
                  "
                >
                  <span class="px-4">Cập nhật</span>
                </button>
              </div>
            </div>
          </div>
        </form>

        <div
            id="confirmCancelModal"
            class="modal fade"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content box-modal">
                    <div class="modal-header border-0">
                        <img
                            ref="closeConfirmCancelModal"
                            class="close-modal"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            src="../../../assets/images/ic_exit.svg"
                            alt=""
                        />
                    </div>
                    <div class="modal-body">
                        <h3 class="text-center modal-body-text">
                            Are you sure?
                        </h3>
                    </div>
                    <div
                        class="
                            modal-footer
                            align-items-center
                            d-flex
                            justify-content-center
                            flex-row
                        "
                    >
                        <button
                            type="button"
                            class="
                                btn btn-secondary-custom
                                rounded-pill
                                w-20
                                mt-4
                                mb-4
                            "
                            data-bs-dismiss="modal"
                        >
                            いいえ
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger rounded-pill w-20"
                            @click="resetFormToStart"
                        >
                            はい
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import {
  mapActions,
  mapGetters
} from 'vuex'
import { validationMixin } from 'vuelidate'
import {required, maxLength, requiredIf, helpers, minLength} from 'vuelidate/lib/validators'
import vClickOutside from 'v-click-outside'
import defaultProvinces from '~/constants/provinces'
import defaultCareers from '~/constants/careers'

const imageRule = helpers.regex('image', /\.(jpeg|png|jpg|gif)$/)
const maximumImageSize = 2000000

export default {
    name: 'EditJob',

    directives: {
      clickOutside: vClickOutside.directive
    },

    mixins: [validationMixin],
    layout: 'auth',

    data() {
        return {
            previewUpdateRoute: `/jobs/update/preview/${this.$route.params.id}`,
            url_file: process.env.URL_FILE,
            oldImageJob: null,
            openDateEndPicker: false,
            previewImageJobUrl: null,
            displaySalary: 'salary_range',
            careerList: defaultCareers,
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
          provinceList: [],
          job: {
            image_job: null,
            title: '',
            career: '',
            date_start: '',
            type_plan: '',
            display_month: '',
            form_recruitment: '',
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
            has_vietnamese_staff: 0,
            overtime: '',
            accept_education: false,
            max_education_month: 0,
            scholarship: 0,
            number_trainings: 0,
            custom_requirement: '',
          },
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
					accept_education: false,
        }
    },

    validations: {
      job: {
        image_job: {
          name: {
            imageRule
          },
          size(val) {
            if (this.job.image_job) {
              return this.job.image_job.size <= maximumImageSize
            }
            return true
          }
        },
        title: {
          required,
          maxLength: maxLength(100)
        },
        date_start: {
          required,
        },
        number_recruitments: {
          required,
          isNumber(value) {
            // eslint-disable-next-line prefer-regex-literals
            const numberRegExp = new RegExp("^\\d+$")
            return numberRegExp.test(value)
          },
          maxLength: maxLength(10)
        },
        salary_max: {
          required,
          maxLength: maxLength(10),
          isGreaterThanSalaryMin(value) {
            if (value && this.job.salary_min) {
              return parseInt(value) > parseInt(this.job.salary_min)
            }
            return true
          }
        },
        salary_min: {
          required: requiredIf(function () {
            return this.displaySalary === 'salary_range'
          }),
          maxLength: maxLength(10),
          isLowerThanSalaryMax(value) {
            if (value && this.job.salary_max) {
              return parseInt(value) < parseInt(this.job.salary_max)
            }
            return true
          }
        },
        content_work: {
          required,
          maxLength: maxLength(5000),
          minLength: minLength(30)
        },
        conditions_apply: {
          required,
          maxLength: maxLength(5000)
        },
        address_work: {
          required,
          maxLength: maxLength(5000)
        },
        time_work: {
          required,
          maxLength: maxLength(5000)
        },
        welfare_regime: {
          required,
          maxLength: maxLength(5000)
        },
        // overtime: {
        //   maxLength: maxLength(1000)
        // },
        accept_education: {},
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
        return { title: 'Sửa công việc | Tuyển dụng' }
    },
    //
    // watch: {
    //     displaySalary: {
    //         handler(newVal) {
    //             this.job.salary_min = ''
    //             this.job.salary_max = ''
    //             this.$v.job.salary_min.$reset()
    //             this.$v.job.salary_max.$reset()
    //         },
    //         deep: true,
    //     },
    // },

    created() {
      this.getRequirementOptions()
        if (this.previewUpdateRoute === this.gettersGetPrevRouteUpdate()) {
          this.oldImageJob = this.gettersGetOldImageJobUpdate()
          let jobUpdateStored = {}
          jobUpdateStored = Object.assign({}, this.gettersGetJobUpdate())
          if (Object.keys(jobUpdateStored).length !== 0) {
            this.job = Object.assign({}, jobUpdateStored)
            if (this.job.image_job) {
              this.previewImageJobUrl = URL.createObjectURL(this.job.image_job)
            }
          }
          this.dispatchSetPrevRouteUpdate('')
        } else {
          this.showJob();
        }
    },

    methods: {
      ...mapActions({
        'dispatchSetJobUpdate': 'job/setJobUpdate',
        'dispatchSetOldImageJobUpdate': 'job/setOldImageJobUpdate',
        'dispatchSetPrevRouteUpdate': 'job/setPrevRouteUpdate',
      }),

      ...mapGetters({
        'gettersGetJobUpdate': 'job/getJobUpdate',
        'gettersGetOldImageJobUpdate': 'job/getOldImageJobUpdate',
        'gettersGetPrevRouteUpdate': 'job/getPrevRouteUpdate',
      }),

      resetEducation() {
				this.job.max_education_month = 0
				this.job.scholarship = 0
			},

      addSkills() {
        if (this.skillModel.length === 0) {
          this.$toast.error('Hãy chọn kỹ năng.');
        } else {
          if (!this.levelModel || this.levelModel.length === 0) {
            this.$toast.error('Hãy chọn mức độ thành thục.');
            return
          }
          if (this.levelModel === 'Beginner') {
            this.beginnerSkills.push(this.skillModel)
          }
          if (this.levelModel === 'Intermediate') {
            this.intermediateSkills.push(this.skillModel)
          }
          if (this.levelModel === 'Advanced') {
            this.advancedSkills.push(this.skillModel)
          }
          this.skillArr = this.skillArr.filter(x => !this.skillModel.includes(x));
          this.skillModel = []
          this.levelModel = []
        }
      },
      addCertificates() {
        if (this.certificateModel.length === 0) {
          this.$toast.error('Hãy chọn chứng chỉ.');
        } else {
          this.certificates.push(this.certificateModel)
          this.certificateArr = this.certificateArr.filter(x => !this.certificateModel.includes(x));
          this.certificateModel = []
        }
      },
      addMajors() {
        if (this.majorModel.length === 0) {
          this.$toast.error('Hãy chọn chuyên ngành đại học.')
        } else {
          this.collegeMajors.push({
            colleges: this.collegeModel,
            majors: this.majorModel
          })
          this.majorArr = this.majorArr.filter(x => !this.majorModel.includes(x));
          this.collegeArr = this.collegeArr.filter(x => !this.collegeMajors.includes(x));
          this.majorModel = []
          this.collegeModel = []
        }
      },
      deleteBeginnerSkillItem(item) {
        const index = this.beginnerSkills.indexOf(item);
        if (index > -1) {
          this.beginnerSkills.splice(index, 1);
        }
      },
      deleteIntermediateSkillItem(item) {
        const index = this.intermediateSkills.indexOf(item);
        if (index > -1) {
          this.intermediateSkills.splice(index, 1);
        }
      },
      deleteAdvancedSkillItem(item) {
        const index = this.advancedSkills.indexOf(item);
        if (index > -1) {
          this.advancedSkills.splice(index, 1);
        }
      },
      deleteCertificateItem(item) {
        const index = this.certificates.indexOf(item);
        if (index > -1) {
          this.certificates.splice(index, 1);
        }
      },
      deleteMajorItem(item) {
        const index = this.collegeMajors.indexOf(item);
        if (index > -1) {
          this.collegeMajors.splice(index, 1);
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

        async showJob() {
          try {
            await this.$repositories.jobs.getJob(this.$route.params.id)
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

                // this.displaySalary = this.job.salary_max ? 'salary_range' : ''
                this.displaySalary = 'salary_range'
              });

            this.provinceList = defaultProvinces
          } catch (e) {
//            console.log(e.message)
          }
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
            this.oldImageJob = null
          } else {
            this.previewImageJobUrl = URL.createObjectURL(this.job.image_job)
          }
        } else {
          this.$v.job.image_job.$reset()
          this.previewImageJobUrl = null
        }
      },

        inputOrBlurDateStart() {
            this.$v.job.date_start.$touch()
        },

      keyPressForNumberInput(evt) {
        if (evt.which !== 13 && evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57) {
          evt.preventDefault();
        }
      },

      previewJob() {
        // this.$v.job.$touch()
        // if (!this.$v.job.$invalid) {
          this.job.beginnerSkills = this.beginnerSkills
					this.job.intermediateSkills = this.intermediateSkills
					this.job.advancedSkills = this.advancedSkills
					this.job.certificates = this.certificates
					this.job.collegeMajors = this.collegeMajors
          this.dispatchSetJobUpdate(this.job)
          this.dispatchSetOldImageJobUpdate(this.oldImageJob)
          this.$router.push('/jobs/update/preview/' + this.$route.params.id)
        // } else if (this.$v.job.title.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.titleTextBox.focus()
        //   })
        // } else if (this.$v.job.number_recruitments.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.numberRecruitmentsTextBox.focus()
        //   })
        // } else if (this.$v.job.salary_min.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.salaryMinTextBox.focus()
        //   })
        // } else if (this.$v.job.salary_max.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.salaryMaxTextBox.focus()
        //   })
        // } else if (this.$v.job.content_work.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.contentWorkTextBox.focus()
        //   })
        // } else if (this.$v.job.conditions_apply.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.conditionsApplyTextBox.focus()
        //   })
        // } else if (this.$v.job.address_work.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.addressWorkTextBox.focus()
        //   })
        // } else if (this.$v.job.time_work.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.timeWorkTextBox.focus()
        //   })
        // } else if (this.$v.job.welfare_regime.$error) {
        //   this.$nextTick(() => {
        //     this.$refs.welfareRegimeTextBox.focus()
        //   })
        // }
      },

      resetFormToStart() {
        // this.showJob();
        this.$refs.closeConfirmCancelModal.click()
        this.$router.push(`/jobs/detail/${this.$route.params.id}`)
      }
    },
}
</script>


<style lang="scss" scoped>
@import '../../../styles/pages/jobs/create.scss';
</style>

<style lang="scss">
  @import '../../../styles/pages/jobs/date-picker.scss';
</style>
