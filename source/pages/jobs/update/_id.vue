<template>
    <main class="container my-3 my-lg-4">
        <form @submit.prevent="previewJob()">
          <div class="create_job pb-4 pb-lg-5">
            <h4 class="pt-2 pb-4 pt-lg-3 pb-lg-5 text-center">仕事の訂正</h4>
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
                  <p class="m-0">画像ファイルをドラグドロップ<span>、或いは選択してください</span></p>
                </div>

                <div v-if="$v.job.image_job.$error" class="text-center error-text">
                  <div v-if="!$v.job.image_job.name.imageRule">画像はpng / jpg / jpeg / gifの形式でアプロードしてください</div>
                  <div v-if="!$v.job.image_job.size">2MB以下の写真をアップロードしてください</div>
                </div>
              </div>
              <div class="form-group mb-3 mb-lg-4 row">
                <label for="exampleInput1" class="col-sm-2 col-form-label">タイトル <span>*</span></label>
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
                      これは必須項目なので、必ず入力してください
                    </div>
                    <div
                      v-if="!$v.job.title.maxLength"
                      class="error-text"
                    >
                      100文字以下で入力してください
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-3 mb-lg-4 row">
                <label for="careerSelect" class="col-sm-2 col-form-label">業界・分野 <span>*</span></label>
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
                <label for="exampleInput2" class="col-sm-2 col-form-label">開始日 <span>*</span></label>
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
                      これは必須項目なので、必ず入力してください
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
                <label for="typePlanSelect" class="col-sm-2 col-form-label">プラン <span>*</span></label>
                <div class="col-12 col-sm-4">
                  <div class="input-group input-group-icon">
                <span class="input-group-text input-group-text-pre">
                    <img src="../../../assets/images/icon_job_type_plan.svg" alt="">
                </span>
                    <select id="typePlanSelect" v-model="job.type_plan" class="form-select rounded-end">
                      <option v-for="item in typePlanList" :key="item.value" :value="item.value">{{ item.text }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group mb-3 mb-lg-4 row">
                <label for="displayMonthSelect" class="col-sm-2 col-form-label">仕事の有効期限 (月単位) <span>*</span></label>
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
                <label for="exampleInput4" class="col-sm-2 col-form-label"
                >雇用形態 <span>*</span></label
                >
                <div class="col-12 col-sm-4">
                  <div class="input-group input-group-icon">
                              <span class="input-group-text input-group-text-pre">
                                  <img
                                    src="../../../assets/images/icon_user_search.svg"
                                    alt=""
                                  />
                              </span>
                    <select
                      id="exampleInput4"
                      v-model="job.form_recruitment"
                      class="form-select rounded-end"
                    >
                      <option
                        v-for="item in formRecruitmentList"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.text }}
                      </option>
                    </select>
                    <div class="invalid-feedback">
                      これは必須項目なので、必ず入力してください
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group mb-3 mb-lg-4 row">
                <label
                  for="inputGroupSelect01"
                  class="col-sm-2 col-form-label"
                >在留資格 <span>*</span></label
                >
                <div class="col-12 col-sm-4">
                  <div class="input-group input-group-icon flex-column">
                    <div class="input-group input-group-icon flex-nowrap">
                            <span class="input-group-text input-group-text-pre">
                              <img src="../../../assets/images/icon_stay.svg" alt="">
                            </span>
                      <div
                        ref="statusStayDropdownRef"
                        class="status-stay-dropdown"
                        @click="showStatusStayDropdown"
                        @focusout="focusOutStatusStayListDropdown"
                      >
                        <div class="over-select"></div>
                        <select
                          ref="previewStatusStaySelectBox"
                          class="form-select rounded-end"
                        >
                          <option value="">
                            <span v-for="(item, index) in job.status_stay" :key="index">
                              {{ $t(statusStayTextList[item]) }}
                              {{ index === job.status_stay.length - 1 ? '' : '-' }}
                            </span>
                          </option>
                        </select>
                      </div>
                    </div>
                    <div
                      v-if="showStatusStayList"
                      v-click-outside="showStatusStayDropdown"
                      class="multi-select-status-stay"
                    >
                      <ul>
                        <li v-for="item in statusStayList" :key="item.value">
                          <label :for="'statusStay' +item.value">
                            <input
                              :id="'statusStay' +item.value"
                              v-model="job.status_stay"
                              type="checkbox"
                              :value="item.value"
                              @click.stop="$v.job.status_stay.$touch()"
                            >
                            {{ item.text }}
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div v-if="$v.job.status_stay.$error">
                      <div v-if="!$v.job.status_stay.isNotEmpty" class="error-text">これは必須項目なので、必ず入力してください</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group mb-3 mb-lg-4 row">
                <label for="exampleInput5" class="col-sm-2 col-form-label"
                >採用人数 <span>*</span></label
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
                      これは必須項目なので、必ず入力してください
                    </div>
                    <div
                      v-else-if="!$v.job.number_recruitments.isNumber"
                      class="error-text"
                    >
                      整数を入力してください
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-3 mb-lg-4 row">
                <label for="example14" class="col-sm-2 col-form-label">ベトナム人在籍状況</label>
                <div class="col-12 col-sm-10">
                  <div class="row">
                    <div class="col-12 col-sm-4 col-md-2">
                      <input
                        id="hasVietnameseStaffStatus_1"
                        v-model="job.has_vietnamese_staff"
                        class="form-check-input"
                        type="radio"
                        value="1"
                      >
                      <label class="form-check-label" for="hasVietnameseStaffStatus_1">
                        いる
                      </label>
                    </div>
                    <div class="col-12 col-sm-4 col-md-2">
                      <input
                        id="hasVietnameseStaffStatus_0"
                        v-model="job.has_vietnamese_staff"
                        class="form-check-input"
                        type="radio"
                        value="0"
                      >
                      <label class="form-check-label" for="hasVietnameseStaffStatus_0">
                        いない
                      </label>
                    </div>
                    <div class="col-12 col-sm-4 col-md-2">
                      <input
                        id="hasVietnameseStaffStatus_2"
                        v-model="job.has_vietnamese_staff"
                        class="form-check-input"
                        type="radio"
                        value="2"
                      >
                      <label class="form-check-label" for="hasVietnameseStaffStatus_2">
                        採用予定
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-1 row">
                <label class="col-sm-2 col-form-label"
                >月給 <span>*</span></label
                >
                <div class="col-12 col-sm-4">
                  <!--<div class="form-check">
                      &lt;!&ndash;<div class="float-start">
                          <input
                              id="gridCheck1"
                              v-model="displaySalary"
                              class="form-check-input"
                              type="radio"
                              value="salary_max"
                          />
                          <label
                              class="form-check-label"
                              for="gridCheck1"
                          >
                              上限額
                          </label>
                      </div>&ndash;&gt;
                      <div class="float-start">
                          <input
                              id="gridCheck2"
                              v-model="displaySalary"
                              class="form-check-input"
                              type="radio"
                              value="salary_range"
                          />
                          <label
                              class="form-check-label"
                              for="gridCheck2"
                          >
                              ○○から○○まで
                          </label>
                      </div>
                  </div>-->
                  〇〇円から〇〇円
                </div>
              </div>

              <div class="form-group mb-3 mb-lg-4 row">
                <label class="col-sm-2 col-form-label"></label>
                <!--<div
                    v-if="displaySalary === 'salary_max'"
                    class="col-12 col-sm-4"
                >
                    <div class="input-group input-group-icon">
                        <span class="input-group-text input-group-text-pre">
                            <img
                                src="../../../assets/images/icon_money_jp.svg"
                                alt=""
                            />
                        </span>
                        <input
                          v-model="job.salary_max"
                          type="text"
                          class="form-control rounded-end"
                          @input="$v.job.salary_max.$touch()"
                          @blur="$v.job.salary_max.$touch()"
                          @keypress="keyPressForNumberInput"
                        >
                    </div>
                  <div v-if="$v.job.salary_max.$error">
                    <div v-if="!$v.job.salary_max.required" class="error-text">これは必須項目なので、必ず入力してください</div>
                    <div v-if="!$v.job.salary_max.maxLength" class="error-text">10数字以下で入力してください</div>
                  </div>
                </div>-->

                <div
                  v-if="displaySalary === 'salary_range'"
                  class="col-12 col-sm-4"
                >
                  <div class="input-group input-group-icon">
                              <span class="input-group-text input-group-text-pre">
                                  <img
                                    src="../../../assets/images/icon_money_jp.svg"
                                    alt=""
                                  />
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
                    <div v-if="!$v.job.salary_min.required" class="error-text">これは必須項目なので、必ず入力してください</div>
                    <div v-if="!$v.job.salary_min.maxLength" class="error-text">10数字以下で入力してください</div>
                    <div v-if="!$v.job.salary_min.isLowerThanSalaryMax" class="error-text">最多の月給以下で入力してください</div>
                  </div>
                </div>
                <div
                  v-if="displaySalary === 'salary_range'"
                  class="col-12 col-sm-1 range-salary-character text-center pt-1"
                >
                  ～
                </div>
                <div
                  v-if="displaySalary === 'salary_range'"
                  class="col-12 col-sm-4"
                >
                  <div class="input-group input-group-icon">
                              <span class="input-group-text input-group-text-pre">
                                  <img
                                    src="../../../assets/images/icon_money_jp.svg"
                                    alt=""
                                  />
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
                    <div v-if="!$v.job.salary_max.required" class="error-text">これは必須項目なので、必ず入力してください</div>
                    <div v-if="!$v.job.salary_max.maxLength" class="error-text">10数字以下で入力してください</div>
                    <div v-if="!$v.job.salary_max.isGreaterThanSalaryMin" class="error-text">最低の月給以上で入力してください</div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-3 mb-lg-4 row">
                <label for="example7" class="col-sm-2 col-form-label"
                >仕事内容 <span>*</span></label
                >
                <div class="col-12 col-sm-10">
                          <textarea
                            id="example7"
                            ref="contentWorkTextBox"
                            v-model="job.content_work"
                            type="text"
                            class="form-control rounded-end"
                            rows="3"
                            @input="$v.job.content_work.$touch()"
                            @blur="$v.job.content_work.$touch()"
                          />
                  <div class="row">
                    <div v-if="$v.job.content_work.$error" class="col-6 align-items-start">
                      <div
                        v-if="!$v.job.content_work.required"
                        class="error-text"
                      >
                        これは必須項目なので、必ず入力してください
                      </div>
                      <div
                        v-if="!$v.job.content_work.minLength"
                        class="error-text"
                      >
                        30文字以上で入力してください
                      </div>
                      <div
                        v-if="!$v.job.content_work.maxLength"
                        class="error-text"
                      >
                        200文字以下で入力してください
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
                        残り{{ 200 - job.content_work.length }}文字
                      </div>
                      <div v-else class="error-text text-black">残り0文字</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-3 mb-lg-4 row">
                <label for="example8" class="col-sm-2 col-form-label"
                >応募条件 <span>*</span></label
                >
                <div class="col-12 col-sm-10">
                          <textarea
                            id="example8"
                            ref="conditionsApplyTextBox"
                            v-model="job.conditions_apply"
                            type="text"
                            class="form-control rounded-end"
                            rows="3"
                            @input="$v.job.conditions_apply.$touch()"
                            @blur="$v.job.conditions_apply.$touch()"
                          />
                  <div v-if="$v.job.conditions_apply.$error">
                    <div
                      v-if="!$v.job.conditions_apply.required"
                      class="error-text"
                    >
                      これは必須項目なので、必ず入力してください
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
                <label for="province" class="col-sm-2 col-form-label">都道府県 <span>*</span></label>
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
                <label for="example9" class="col-sm-2 col-form-label">市区町村番地 <span>*</span></label>
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
                    <div v-if="!$v.job.address_work.required" class="error-text">これは必須項目なので、必ず入力してください</div>
                    <div v-if="!$v.job.address_work.maxLength" class="error-text">200文字以下で入力してください</div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-3 mb-lg-4 row">
                <label for="example10" class="col-sm-2 col-form-label">勤務時間 <span>*</span></label>
                <div class="col-12 col-sm-10">
              <textarea
                id="example10"
                ref="timeWorkTextBox"
                v-model="job.time_work"
                type="text"
                class="form-control rounded-end"
                rows="3"
                @input="$v.job.time_work.$touch()"
                @blur="$v.job.time_work.$touch()"
              />
                  <div v-if="$v.job.time_work.$error">
                    <div v-if="!$v.job.time_work.required" class="error-text">これは必須項目なので、必ず入力してください</div>
                    <div v-if="!$v.job.time_work.maxLength" class="error-text">200文字以下で入力してください</div>
                  </div>
                </div>
              </div>
              <div class="form-group mb-3 mb-lg-4 row">
                <label for="example11" class="col-sm-2 col-form-label">休憩時間 <span>*</span></label>
                <div class="col-12 col-sm-10">
                  <textarea
                    id="example11"
                    ref="breakTimeTextBox"
                    v-model="job.break_time"
                    type="text"
                    class="form-control rounded-end"
                    rows="3"
                    @input="$v.job.break_time.$touch()"
                    @blur="$v.job.break_time.$touch()"
                  />
                  <div v-if="$v.job.break_time.$error">
                    <div v-if="!$v.job.break_time.required" class="error-text">これは必須項目なので、必ず入力してください</div>
                    <div v-if="!$v.job.break_time.maxLength" class="error-text">200文字以下で入力してください</div>
                  </div>
                </div>
              </div>
              <div class="form-group mb-3 mb-lg-4 row">
                <label for="example12" class="col-sm-2 col-form-label">休日 <span>*</span></label>
                <div class="col-12 col-sm-10">
              <textarea
                id="example12"
                ref="holidaysTextBox"
                v-model="job.holidays"
                type="text"
                class="form-control rounded-end"
                rows="3"
                @input="$v.job.holidays.$touch()"
                @blur="$v.job.holidays.$touch()"
              />
                  <div v-if="$v.job.holidays.$error">
                    <div v-if="!$v.job.holidays.required" class="error-text">これは必須項目なので、必ず入力してください</div>
                    <div v-if="!$v.job.holidays.maxLength" class="error-text">200文字以下で入力してください</div>
                  </div>
                </div>
              </div>
              <div class="form-group mb-3 mb-lg-4 row">
                <label for="example13" class="col-sm-2 col-form-label">福利厚生 <span>*</span></label>
                <div class="col-12 col-sm-10">
                    <textarea
                      id="example13"
                      ref="welfareRegimeTextBox"
                      v-model="job.welfare_regime"
                      type="text"
                      class="form-control rounded-end"
                      rows="3"
                      @input="$v.job.welfare_regime.$touch()"
                      @blur="$v.job.welfare_regime.$touch()"
                    />
                  <div v-if="$v.job.welfare_regime.$error">
                    <div v-if="!$v.job.welfare_regime.required" class="error-text">これは必須項目なので、必ず入力してください</div>
                    <div v-if="!$v.job.welfare_regime.maxLength" class="error-text">500文字以下で入力してください</div>
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
                  <span class="px-4">キャンセル</span>
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
                  <span class="px-4">編集</span>
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
import theStatusStay from "~/constants/statusStay"
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
            showStatusStayList: false,
            openDateEndPicker: false,
            previewImageJobUrl: null,
            displaySalary: 'salary_range',
            careerList: defaultCareers,
            statusStayTextList: theStatusStay,
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
                    value: 1,
                },
                {
                    text: '技能実習',
                    value: 2,
                },
                {
                    text: '特定活動',
                    value: 3,
                },
                {
                    text: '留学生',
                    value: 4,
                },
                {
                    text: '技術・人文知識・国際業務',
                    value: 5,
                },
                {
                    text: '定住',
                    value: 6,
                },
                {
                    text: '永住',
                    value: 7,
                },
                {
                    text: '家族滞在',
                    value: 8,
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
            has_vietnamese_staff: 0,
            overtime: ''
          },
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
          minValue: value => value > new Date().toISOString()
        },
        form_recruitment: {},
        status_stay: {
          isNotEmpty(val) {
            return this.job.status_stay.length !== 0
          }
        },
        number_recruitments: {
          required,
          isNumber(value) {
            // eslint-disable-next-line prefer-regex-literals
            const numberRegExp = new RegExp("^\\d+$")
            return numberRegExp.test(value)
          }
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
          maxLength: maxLength(200),
          minLength: minLength(30)
        },
        conditions_apply: {
          required,
          maxLength: maxLength(1000)
        },
        address_work: {
          required,
          maxLength: maxLength(200)
        },
        time_work: {
          required,
          maxLength: maxLength(200)
        },
        break_time: {
          required,
          maxLength: maxLength(200)
        },
        holidays: {
          required,
          maxLength: maxLength(200)
        },
        welfare_regime: {
          required,
          maxLength: maxLength(500)
        },
        has_vietnamese_staff: '',
        overtime: {
          maxLength: maxLength(1000)
        }
      }
    },

    head() {
        return { title: '仕事の訂正' }
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

      showStatusStayDropdown(event) {
        this.showStatusStayList = !this.showStatusStayList
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
        const statusStaySelected = this.statusStayList.filter(this.filterPreviewStatusStay)
        let result = ''
        statusStaySelected.forEach(function (item, index) {
          if (index === statusStaySelected.length - 1) {
            result += item.text
          } else {
            result += item.text + ' - '
          }
        })
        return result
      },

      focusOutStatusStayListDropdown() {
        this.$refs.statusStayDropdownRef.click()
      },

        async showJob() {
          try {
            await this.$repositories.jobs.getJob(this.$route.params.id)
              .then((response) => {
                this.job = Object.assign({}, response.data.job)
                this.job.status_stay = response.data.job.status_stay.split(",")
                this.job.image_job = null
                this.previewImageJobUrl = null
                this.oldImageJob = response.data.job.image_job
                this.job.salary_min = parseFloat(response.data.job.salary_min.toString())
                this.job.salary_max = parseFloat(response.data.job.salary_max.toString())
                if (this.job.overtime === 'null') this.job.overtime = ''

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
        this.$v.job.$touch()
        if (!this.$v.job.$invalid) {
          this.dispatchSetJobUpdate(this.job)
          this.dispatchSetOldImageJobUpdate(this.oldImageJob)
          this.$router.push('/jobs/update/preview/' + this.$route.params.id)
        } else if (this.$v.job.title.$error) {
          this.$nextTick(() => {
            this.$refs.titleTextBox.focus()
          })
        } else if (this.$v.job.status_stay.$error) {
          this.$nextTick(() => {
            this.$refs.previewStatusStaySelectBox.focus()
            this.showStatusStayList = true
          })
        } else if (this.$v.job.number_recruitments.$error) {
          this.$nextTick(() => {
            this.$refs.numberRecruitmentsTextBox.focus()
          })
        } else if (this.$v.job.salary_min.$error) {
          this.$nextTick(() => {
            this.$refs.salaryMinTextBox.focus()
          })
        } else if (this.$v.job.salary_max.$error) {
          this.$nextTick(() => {
            this.$refs.salaryMaxTextBox.focus()
          })
        } else if (this.$v.job.content_work.$error) {
          this.$nextTick(() => {
            this.$refs.contentWorkTextBox.focus()
          })
        } else if (this.$v.job.conditions_apply.$error) {
          this.$nextTick(() => {
            this.$refs.conditionsApplyTextBox.focus()
          })
        } else if (this.$v.job.address_work.$error) {
          this.$nextTick(() => {
            this.$refs.addressWorkTextBox.focus()
          })
        } else if (this.$v.job.time_work.$error) {
          this.$nextTick(() => {
            this.$refs.timeWorkTextBox.focus()
          })
        } else if (this.$v.job.break_time.$error) {
          this.$nextTick(() => {
            this.$refs.breakTimeTextBox.focus()
          })
        } else if (this.$v.job.holidays.$error) {
          this.$nextTick(() => {
            this.$refs.holidaysTextBox.focus()
          })
        } else if (this.$v.job.welfare_regime.$error) {
          this.$nextTick(() => {
            this.$refs.welfareRegimeTextBox.focus()
          })
        }
      },

      resetFormToStart() {
        this.showJob();
        this.$refs.closeConfirmCancelModal.click()
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
