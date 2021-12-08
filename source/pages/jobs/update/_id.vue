<template>
    <main class="container my-3 my-lg-4" @submit.prevent="submit">
        <div class="create_job pb-4 pb-lg-5">
            <h4 class="pt-2 pb-4 pt-lg-3 pb-lg-5 text-center">仕事の訂正</h4>
            <div class="mx-3 mx-lg-5">
                <div class="form-group mb-4 mb-lg-5">
                    <div
                        class="p-4 box-upload-file text-center rounded"
                        @click="$refs.imageJob.click()"
                    >
                        <input
                            ref="imageJob"
                            type="file"
                            accept="image/jpeg,image/png,image/gif"
                            style="display: none"
                            @change="onChangeImageJob"
                        />
                        <img
                            v-if="previewImageJobUrl"
                            class="preview-image"
                            :src="previewImageJobUrl"
                            alt=""
                        />
                        <img
                            v-else
                            src="../../../assets/images/icon_upload_file.svg"
                            alt=""
                        />
                        <p class="m-0">
                            画像ファイルをドラグドロップ<span
                                >、或いは選択してください</span
                            >
                        </p>
                    </div>

                    <div class="invalid-feedback">
                        Please choose a 会社紹介写真.
                    </div>
                </div>
                <div class="form-group mb-3 mb-lg-4 row">
                    <label for="exampleInput1" class="col-sm-2 col-form-label"
                        >タイトル <span>*</span></label
                    >
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
                    <label for="exampleInput2" class="col-sm-2 col-form-label"
                        >開始日 <span>*</span></label
                    >
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
                                Must less than or equal date end
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-3 mb-lg-4 row">
                    <label for="exampleInput3" class="col-sm-2 col-form-label"
                        >終了日 <span>*</span></label
                    >
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
                                    v-model="job.date_end"
                                    value-type="format"
                                    format="YYYY-MM-DD"
                                    :clearable="false"
                                    :editable="false"
                                    input-class="input-datepicker-create-job"
                                    @input="inputOrBlurDateEnd"
                                    @blur="inputOrBlurDateEnd"
                                />
                            </no-ssr>
                        </div>
                        <div v-if="$v.job.date_end.$error">
                            <div
                                v-if="!$v.job.date_end.required"
                                class="error-text"
                            >
                                これは必須項目なので、必ず入力してください
                            </div>
                            <div
                                v-if="
                                    !$v.job.date_end
                                        .isGreaterThanOrEqualDateStart
                                "
                                class="error-text"
                            >
                                Must greater than or equal date start
                            </div>
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
                                Please choose a 雇用形態.
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
                        <div class="input-group input-group-icon">
                            <span class="input-group-text input-group-text-pre">
                                <img
                                    src="../../../assets/images/icon_stay.svg"
                                    alt=""
                                />
                            </span>
                            <select
                                id="inputGroupSelect01"
                                v-model="job.status_stay"
                                class="form-select rounded-end"
                                multiple
                            >
                                <option
                                    v-for="item in statusStayList"
                                    :key="item.value"
                                    :value="item.value"
                                >
                                    {{ item.text }}
                                </option>
                            </select>
                            <div class="invalid-feedback">
                                Please choose a 在留資格.
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

                <div class="form-group mb-1 row">
                    <label class="col-sm-2 col-form-label"
                        >月給 <span>*</span></label
                    >
                    <div class="col-12 col-sm-4">
                        <div class="form-check">
                            <div class="float-start">
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
                            </div>
                            <div class="checkbox_two">
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
                        </div>
                    </div>
                </div>

                <div class="form-group mb-3 mb-lg-4 row">
                    <label class="col-sm-2 col-form-label"></label>
                    <div
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
                            />
                        </div>
                        <div v-if="$v.job.salary_max.$error">
                            <div
                                v-if="!$v.job.salary_max.required"
                                class="error-text"
                            >
                                これは必須項目なので、必ず入力してください
                            </div>
                        </div>
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
                                v-model="job.salary_min"
                                type="text"
                                class="form-control rounded-end"
                                @input="$v.job.salary_min.$touch()"
                                @blur="$v.job.salary_min.$touch()"
                            />
                        </div>
                        <div v-if="$v.job.salary_min.$error">
                            <div
                                v-if="!$v.job.salary_min.required"
                                class="error-text"
                            >
                                これは必須項目なので、必ず入力してください
                            </div>
                        </div>
                    </div>
                    {{ displaySalary === 'salary_range' ? '～' : '' }}
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
                                v-model="job.salary_max"
                                type="text"
                                class="form-control rounded-end"
                                @input="$v.job.salary_max.$touch()"
                                @blur="$v.job.salary_max.$touch()"
                            />
                        </div>
                        <div v-if="$v.job.salary_max.$error">
                            <div
                                v-if="!$v.job.salary_max.required"
                                class="error-text"
                            >
                                これは必須項目なので、必ず入力してください
                            </div>
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
                            v-model="job.content_work"
                            type="text"
                            class="form-control rounded-end"
                            rows="3"
                            @input="$v.job.content_work.$touch()"
                            @blur="$v.job.content_work.$touch()"
                        />
                        <div v-if="$v.job.content_work.$error">
                            <div
                                v-if="!$v.job.content_work.required"
                                class="error-text"
                            >
                                これは必須項目なので、必ず入力してください
                            </div>
                            <div
                                v-if="!$v.job.content_work.maxLength"
                                class="error-text"
                            >
                                1000文字以下で入力してください
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
                    <label for="example9" class="col-sm-2 col-form-label"
                        >勤務地 <span>*</span></label
                    >
                    <div class="col-12 col-sm-10">
                        <textarea
                            id="example9"
                            v-model="job.address_work"
                            type="text"
                            class="form-control rounded-end"
                            rows="3"
                            @input="$v.job.address_work.$touch()"
                            @blur="$v.job.address_work.$touch()"
                        />
                        <div v-if="$v.job.address_work.$error">
                            <div
                                v-if="!$v.job.address_work.required"
                                class="error-text"
                            >
                                これは必須項目なので、必ず入力してください
                            </div>
                            <div
                                v-if="!$v.job.address_work.maxLength"
                                class="error-text"
                            >
                                200文字以下で入力してください
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group mb-3 mb-lg-4 row">
                    <label for="example10" class="col-sm-2 col-form-label"
                        >勤務時間 <span>*</span></label
                    >
                    <div class="col-12 col-sm-10">
                        <textarea
                            id="example10"
                            v-model="job.time_work"
                            type="text"
                            class="form-control rounded-end"
                            rows="3"
                            @input="$v.job.time_work.$touch()"
                            @blur="$v.job.time_work.$touch()"
                        />
                        <div v-if="$v.job.time_work.$error">
                            <div
                                v-if="!$v.job.time_work.required"
                                class="error-text"
                            >
                                これは必須項目なので、必ず入力してください
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-3 mb-lg-4 row">
                    <label for="example11" class="col-sm-2 col-form-label"
                        >休憩時間 <span>*</span></label
                    >
                    <div class="col-12 col-sm-10">
                        <textarea
                            id="example11"
                            v-model="job.break_time"
                            type="text"
                            class="form-control rounded-end"
                            rows="3"
                            @input="$v.job.break_time.$touch()"
                            @blur="$v.job.break_time.$touch()"
                        />
                        <div v-if="$v.job.break_time.$error">
                            <div
                                v-if="!$v.job.break_time.required"
                                class="error-text"
                            >
                                これは必須項目なので、必ず入力してください
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-3 mb-lg-4 row">
                    <label for="example12" class="col-sm-2 col-form-label"
                        >休日 <span>*</span></label
                    >
                    <div class="col-12 col-sm-10">
                        <textarea
                            id="example12"
                            v-model="job.holidays"
                            type="text"
                            class="form-control rounded-end"
                            rows="3"
                            @input="$v.job.holidays.$touch()"
                            @blur="$v.job.holidays.$touch()"
                        />
                        <div v-if="$v.job.holidays.$error">
                            <div
                                v-if="!$v.job.holidays.required"
                                class="error-text"
                            >
                                これは必須項目なので、必ず入力してください
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-3 mb-lg-4 row">
                    <label for="example13" class="col-sm-2 col-form-label"
                        >福利厚生 <span>*</span></label
                    >
                    <div class="col-12 col-sm-10">
                        <textarea
                            id="example13"
                            v-model="job.welfare_regime"
                            type="text"
                            class="form-control rounded-end"
                            rows="3"
                            @input="$v.job.welfare_regime.$touch()"
                            @blur="$v.job.welfare_regime.$touch()"
                        />
                        <div v-if="$v.job.welfare_regime.$error">
                            <div
                                v-if="!$v.job.welfare_regime.required"
                                class="error-text"
                            >
                                これは必須項目なので、必ず入力してください
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-3 mb-lg-4 row">
                    <label for="example14" class="col-sm-2 col-form-label"
                        >ベトナム人在籍状況</label
                    >
                    <div class="col-12 col-sm-10">
                        <textarea
                            id="example14"
                            v-model="job.has_vietnamese_staff"
                            type="text"
                            class="form-control rounded-end"
                            rows="3"
                        />
                        <div class="invalid-feedback">
                            Please choose a ベトナム人在籍状況.
                        </div>
                    </div>
                </div>
                <div class="form-group mb-3 mb-lg-4 row">
                    <label for="example15" class="col-sm-2 col-form-label"
                        >残業見込み、休日出勤見込み</label
                    >
                    <div class="col-12 col-sm-10">
                        <textarea
                            id="example15"
                            v-model="job.overtime"
                            type="text"
                            class="form-control rounded-end"
                            rows="3"
                        />
                        <div class="invalid-feedback">
                            Please choose a 残業見込み、休日出勤見込み.
                        </div>
                    </div>
                </div>
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
                        type="button"
                        class="
                            btn btn-lg
                            border
                            rounded-pill
                            btn-edit-create_job
                        "
                        @click="previewJob"
                    >
                        <span class="px-4">編集</span>
                    </button>
                </div>
            </div>
        </div>

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
import { validationMixin } from 'vuelidate'
import { required, maxLength, requiredIf } from 'vuelidate/lib/validators'

export default {
    name: 'EditJob',
    mixins: [validationMixin],
    layout: 'auth',

    data() {
        return {
            openDateEndPicker: false,
            previewImageJobUrl: null,
            displaySalary: 'salary_max',
            formRecruitmentList: [
                {
                    text: '1-フルタイム fulltime',
                    value: 1,
                },
                {
                    text: '2-アルバイト parttime',
                    value: 2,
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
            job: {
                image_job: null,
                title: '',
                date_start: this.$moment().format('YYYY-MM-DD'),
                date_end: this.$moment().format('YYYY-MM-DD'),
                form_recruitment: '',
                status_stay: [],
                number_recruitments: '',
                salary_max: '',
                salary_min: '',
                content_work: '',
                conditions_apply: '',
                address_work: '',
                time_work: '',
                break_time: '',
                holidays: '',
                welfare_regime: '',
                has_vietnamese_staff: '',
                overtime: '',
            },
        }
    },

    validations: {
        job: {
            title: {
                required,
                maxLength: maxLength(100),
            },
            date_start: {
                required,
                isLessThanOrEqualDateEnd(value) {
                    return !(value.localeCompare(this.job.date_end) === 1)
                },
            },
            date_end: {
                required,
                isGreaterThanOrEqualDateStart(value) {
                    return !(value.localeCompare(this.job.date_start) === -1)
                },
            },
            form_recruitment: {},
            status_stay: {},
            number_recruitments: {
                required,
                isNumber(value) {
                    // eslint-disable-next-line prefer-regex-literals
                    const numberRegExp = new RegExp('^\\d+$')
                    return numberRegExp.test(value)
                },
            },
            salary_max: {
                required,
            },
            salary_min: {
                required: requiredIf(function () {
                    return this.displaySalary === 'salary_range'
                }),
            },
            content_work: {
                required,
                maxLength: maxLength(1000),
            },
            conditions_apply: {
                required,
                maxLength: maxLength(1000),
            },
            address_work: {
                required,
                maxLength: maxLength(200),
            },
            time_work: {
                required,
            },
            break_time: {
                required,
            },
            holidays: {
                required,
            },
            welfare_regime: {
                required,
            },
            has_vietnamese_staff: '',
            overtime: '',
        },
    },

    head() {
        return { title: 'Edit job' }
    },

    watch: {
        displaySalary: {
            handler(newVal) {
                this.job.salary_min = ''
                this.job.salary_max = ''
                this.$v.job.salary_min.$reset()
                this.$v.job.salary_max.$reset()
            },
            deep: true,
        },
    },

    async created() {
        try {
            await this.$axios
                .get(`companies/jobs/${this.$route.params.id}`)
                .then((response) => {
                    this.job.title = '仕事1求人タイトル'
                })
        } catch (e) {
            // const data = this.$handleResponse(e)
            // this.errors = data.errors
            this.job.title = '仕事1求人タイトル'
        }
        this.job.form_recruitment = this.formRecruitmentList[0].value
        this.job.status_stay.push(this.statusStayList[0].value)
    },

    methods: {
        async submit() {
            try {
                await this.$axios
                    .get(
                        `companies/jobs/update/${this.$route.params.id}`,
                        this.job
                    )
                    .then((response) => {
                        // const data = this.$handleResponse(response)
                        // this.message = data.message
                        // this.errors = data.errors
                    })
            } catch (e) {
                // const data = this.$handleResponse(e)
                // this.errors = data.errors
            }
        },
        onChangeImageJob(e) {
            const file = e.target.files[0]
            this.job.image_job = file
            this.previewImageJobUrl = file ? URL.createObjectURL(file) : null
        },

        inputOrBlurDateStart() {
            this.$v.job.date_end.$reset()
            this.$v.job.date_start.$touch()
        },

        inputOrBlurDateEnd() {
            this.$v.job.date_start.$reset()
            this.$v.job.date_end.$touch()
        },

        keyPressForNumberInput(evt) {
            if (
                (evt.which !== 8 && evt.which !== 0 && evt.which < 48) ||
                evt.which > 57
            ) {
                evt.preventDefault()
            }
        },

        previewJob() {
            this.$v.job.$touch()
            if (!this.$v.job.$invalid) {
                this.$store.dispatch('job/setJob', this.job)
                // this.$router.push('/jobs/preview-new')
            }
        },
    },
}
</script>


<style lang="scss" scoped>
@import '../../../styles/pages/jobs/create.scss';
</style>

<style lang="scss">
.mx-datepicker {
    width: 100%;

    .mx-input-wrapper {
        .input-datepicker-create-job {
            width: 100%;
            margin-left: 0;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: 0 solid #7db1c9;
            border-top: 1px solid #7db1c9;
            border-bottom: 1px solid #7db1c9;
            border-right: 1px solid #7db1c9;
            color: #7db1c9;
            border-top-right-radius: 0.25rem !important;
            border-bottom-right-radius: 0.25rem !important;
            display: block;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            appearance: none;
            transition: border-color 0.15s;
        }

        .mx-icon-calendar {
            display: none;
        }
    }
}
</style>
