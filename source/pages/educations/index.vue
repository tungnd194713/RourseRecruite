<template>
  <div class="main-content">
    <div class="nav-content container">
      <div class="row box-title mb-1 mb-lg-2">
        <div class="col-6">
          <h4 class="page-header-title">Danh sách chương trình đào tạo</h4>
        </div>
        <div class="col-6">
          <button
            id="btn_create_job"
            type="button"
            class="btn rounded-pill btn-add-job"
            @click="checkCreateJob"
          >
            <img class="" src="../../assets/images/icon_plus.svg" />
            Chương trình đào tạo mới
          </button>
        </div>
      </div>

      <form class="row box-search mt-2 px-3 pt-3 pb-2 rounded-pill">
        <div class="row col-12 col-xl-10 col-lg-10 flex-grow-1">
        <div class="col-12 col-lg-4 mb-2 form-group">
          <input
            v-model="condition.title"
            type="text"
            class="form-control rounded-pill fix-height"
            placeholder="Vị trí công việc"
          />
        </div>
        <!-- <div class="col-12 col-lg-4 mb-2 form-group">
          <date-picker
            id="date_start"
            v-model="condition.date_start"
            :clearable="false"
            format="YYYY-MM-DD"
            value-type="YYYY/MM/DD"
            class="date-picker fix-height"
            placeholder="Ngày bắt đầu"
          >
            <i slot="icon-calendar"></i>
          </date-picker>
        </div> -->
        <div class="col-12 col-lg-4 mb-2 form-group">
          <select
            v-model="condition.status"
            class="form-select rounded-pill fix-height"
            aria-label="ステータス"
          >
            <option value="" selected>Trạng thái</option>
            <option value="1">Mở đào tạo</option>
            <option value="0">Đóng</option>
          </select>
        </div>
        </div>
        <div class="col-12 col-xl-2 col-lg-2">
          <button
            type="button"
            class="btn btn-sm rounded-pill btn-search-job"
            @click="search"
          >
            <img src="../../assets/images/icon_search.svg" alt="" />
            <span class="px-4">Tìm kiếm</span>
          </button>
        </div>
      </form>

      <div class="container mt-3 mt-lg-4">
        <div id="list_job" class="row table-responsive box-table">
          <table
            id="list"
            class="table table-hover"
            :current-page="currentPage"
            :per-page="perPage"
          >
            <thead>
              <tr>
                <th v-for="header in fields" :key="header.key">
                  {{ header.label }}
                </th>
              </tr>
            </thead>
            <tbody v-if="!spinner">
              <tr
                v-for="(item, index) in items"
                :key="item.id"
                :class="{
                  'expired-job-active': checkExpiredJob(item.date_end),
                  'font-weight-bold': (item.cv_read)
                }"
              >
                <td class="align-middle text-center">
                  <span
                    v-if="item.cv_not_reciprocal > 0"
                    :class="(perPage * (currentPage - 1)) + (index + 1) < 10 ? 'td-warning' : 'td-warning-large'"
                  >
                    Không hỗ trợ {{ item.cv_not_reciprocal }}/{{ item.total_cv_applied }}CV
                    <img class="" src="../../assets/images/icon_warning.svg" />
                  </span>
                  {{ (perPage * (currentPage - 1)) + (index + 1) }}
                </td>

                <td class="align-middle text-left min-width-200px">
                  <a
                    href=""
                    class="text-decoration-none"
                    @click.prevent="toEducationDetail(item)"
                    >{{ item.job.title }}</a
                  >
                </td>
                <td class="align-middle text-left max-width-200px">
                  <div class="education-requirements">
                    <ul v-if="item.requirements.majorColleges.length">
                        <li v-for="(major, rindex) in item.requirements.majorColleges" :key="rindex">
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
                    <ul v-if="item.requirements.beginnerSkills.length">
                        <li v-for="(skill, rindex) in item.requirements.beginnerSkills" :key="rindex">
                            Đã có kinh nghiệm
                            <span v-for="(iitem, iindex) in skill" :key="iindex">
                                {{ iitem.name }}
                                <span v-if="iindex !== skill.length - 1">hoặc</span>
                            </span>
                        </li>
                    </ul>
                    <ul v-if="item.requirements.intermediateSkills.length">
                        <li v-for="(skill, rindex) in item.requirements.intermediateSkills" :key="rindex">
                            Hiểu rõ về
                            <span v-for="(iitem, iindex) in skill" :key="iindex">
                                {{ iitem.name }}
                                <span v-if="iindex !== skill.length - 1">hoặc</span>
                            </span>
                        </li>
                    </ul>
                    <ul v-if="item.requirements.advancedSkills.length">
                        <li v-for="(skill, rindex) in item.requirements.advancedSkills" :key="rindex">
                            Thành thạo
                            <span v-for="(iitem, iindex) in skill" :key="iindex">
                                {{ iitem.name }}
                                <span v-if="iindex !== skill.length - 1">hoặc</span>
                            </span>
                        </li>
                    </ul>
                    <ul v-if="item.requirements.certificates.length">
                        <li v-for="(certificate, rindex) in item.requirements.certificates" :key="rindex">
                            Đạt được chứng chỉ
                            <span v-for="(iitem, iindex) in certificate.certificates" :key="iindex">
                                {{ iitem.name }}
                                <span v-if="iindex !== certificate.certificates.length - 1">hoặc</span>
                            </span>
                            hoặc tương đương
                        </li>
                    </ul>
                </div>
                </td>
                <td class="align-middle min-width-100px">{{ item.max_education_month + ' tháng' }}</td>
                <td class="align-middle min-width-100px">
                  {{ item.scholarship + '%' }}
                </td>
                <td class="align-middle min-width-80px">{{ item.userRoadmaps ? item.userRoadmaps.length : 0 }}/{{ item.number_trainings + ' người' }}</td>
                <td class="align-middle min-width-80px">{{ item.status ? jobEducationStatus[item.status - 1] : 'Không đăng kí' }}</td>
                <td class="align-middle">
                  <div class="btn-group btn-toggle rounded-pill btn-switch">
                    <button
                      :class="
                        'btn btn-sm btn-check-active rounded-pill ' +
                        (item.status === 3 ? 'active' : '')
                      "
                      @click="changeStatus(item.id, item.status, item.date_end)"
                    >
                      Mở
                    </button>
                    <button
                      :class="
                        'btn btn-sm btn-check-unactive rounded-pill ' +
                        (item.status !== 3 ? 'unactive' : '')
                      "
                      @click="changeStatus(item.id, item.status, item.date_end)"
                    >
                      Đóng
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="totalItems === 0 && spinner" class="outer-spinner">
            <div class="loader"></div>
          </div>
          <h4
            v-if="totalItems === 0 && !spinner"
            class="text-center w-100 p-3 m-0 bg-white border-bottom border-1"
          >
            Không có kết quả
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
          <p>
            - Văn bản đậm biểu thị văn bản chưa đọc và văn bản mỏng biểu thị văn bản đã đọc.<br />
            - Nền trắng là công việc còn hiệu lực, nền xanh nhạt là công việc đã hết hạn.
          </p>
        </Pagination>
      </div>
      <!-- Modal -->
      <button
        ref="popupCheckBtn"
        data-bs-toggle="modal"
        data-bs-target="#popUpCheck"
        style="display: none"
      >
      </button>
      <div
        id="popUpCheck"
        class="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="popUpCheckLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content box-modal">
            <div class="modal-header border-0">
              <img
                id="closeConfirmDeleteModal"
                class="close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
                src="../../assets/images/ic_exit.svg"
                alt=""
              />
            </div>
            <div class="modal-body">
              <h3 class="text-center">
                <img src="../../assets/images/ic_mess.svg" alt="" />
              </h3>
              <h3 class="text-center modal-body-text">
                Chương trình học đang được xây dựng!
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
                class="btn btn-secondary-custom rounded-pill w-20 mt-4 mb-4"
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
// import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ja'
import Pagination from '../../components/Pagination'
import defaultCareers from '~/constants/careers'
import jobEducationStatus from '~/constants/jobEducationStatus'

export default {
  name: 'ListJob',
  components: {
    Pagination,
    // DatePicker
  },
  layout: 'auth',

  data() {
    return {
			careerList: [],
      items: [],
      fields: [
        {
          key: 'id',
          label: 'No',
        },
        {
          key: 'title',
          label: 'Vị trí công việc',
        },
        {
          key: 'requirement',
          label: 'Yêu cầu',
        },
        {
          key: 'max_education_month',
          label: 'Thời gian đào tạo',
        },
        {
          key: 'scholarship',
          label: 'Học bổng cung cấp',
        },
        {
          key: 'number_trainings',
          label: 'Số lượng',
        },
        {
          key: 'status',
          label: 'Trạng thái',
        },
        {
          key: 'actions',
          label: 'Hành động',
          tdClass: 'action',
        },
      ],
      spinner: '',
      itemsIndex: 0,
      isHover: false,
      deleteInactive: '../../assets/images/icon_trash.svg',
      deleteActive: '../../assets/images/icon_trash_active.svg',
      currentPage: 1,
      perPage: 20,
      totalItems: 0,
      pageCount: 1,
      condition: {
        title: '',
        date_start: '',
        status: '',
      },
      selectedItemId: 0,
      jobEducationStatus,
    }
  },

  head() {
    return { title: 'RouteRecruite | Danh sách tuyển dụng' }
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
		this.careerList = defaultCareers
    this.getEducationList(this.currentPage)
  },

  methods: {
    mouseOver(event, index) {
      this.isHover = !this.isHover
      this.itemsIndex = index
    },
    mouseLeave() {
      this.isHover = !this.isHover
    },

    formatDate(date) {
      if (date) {
        return date.split('T')[0];
      }
    },

    toEducationDetail(item) {
      if (item.status !== 1) {
        if (item._id) this.$router.push('/educations/detail/' + item._id)
        else if (item.id) this.$router.push('/educations/detail/' + item.id)
      } else {
        this.$refs.popupCheckBtn.click();
      }
    },

    checkCreateJob() {
      this.$router.push('/educations/create')
      // try {
      //   await this.$repositories.jobs.checkCreateJob().then((res) => {
      //     if (res.status === 200) {
      //       this.$router.push('/jobs/create')
      //     } else {
      //       this.$toast.error('求人プランを設定するために、管理者までご連絡ください')
      //     }
      //   })
      // } catch (e) {
      //   this.message = ''
      //   this.error = e.response.data.message
      // }
    },

    checkDuplicateJob(jobId) {
			this.$router.push(`/jobs/duplicate/${jobId}`)
    },

    async getEducationList(currentPage) {
      this.spinner = true
      this.totalItems = 0
      const { data } = await this.$repositories.educations.getEducationList({}, {})
      this.spinner = false

      this.items = data.results
      this.totalItems = data.totalResults
      this.currentPage = data.page
      this.perPage = data.limit

      this.pageCount = data.totalPages
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
      this.getEducationList(this.currentPage)
    },

    search() {
      this.currentPage = 1
      this.getEducationList(this.currentPage)
    },

    isWarningUnRead(date) {
      const now = this.$moment().format('YYYY-MM-DD')
      date = this.$moment(date)

      return now < date.add(3, 'days').format('YYYY-MM-DD')
    },

    checkExpiredJob(date) {
      const now = this.$moment().format('YYYY-MM-DD')
      date = this.$moment(date)

      return now > date.format('YYYY-MM-DD')
    },

    confirmDelete(itemId) {
      this.selectedItemId = itemId
    },

    async deleteItem() {
      return await this.$repositories.jobs
        .deleteJob(this.selectedItemId)
        .then((res) => {
          if (res.status === 200) {
            document.getElementById('closeConfirmDeleteModal').click()
            this.$toast.success('Xóa tuyển dụng thành công!')
            this.getEducationList(this.currentPage)
          }
          if (res.response && res.response.status === 406) {
            document.getElementById('closeConfirmDeleteModal').click()
            this.$toast.error('Vẫn còn đơn ứng tuyển nên không thể xóa')
            this.getEducationList(this.currentPage)
          }
        })
    },

      async changeStatus(itemId, oldStatus, dateEnd) {
          const now = this.$moment().unix()
          const end = this.$moment(dateEnd).unix()
          if (parseInt(end) < parseInt(now)) {
              this.$toast.error('Vì tuyển dụng đã hết hạn nên không thể thay đổi trạng thái.')
          } else {
              return await this.$repositories.jobs
                  .changeStatus(itemId, {
                      status: oldStatus === 1 ? 0 : 1,
                  })
                  .then((res) => {
                      if (res.status === 200) {
                          this.getEducationList(this.currentPage)

                          if (oldStatus === 1) {
                              this.$toast.success('Tuyển dụng đã bị ẩn!')
                          } else if (oldStatus === 0) {
                              this.$toast.success('Tuyển dụng đã được hiển thị!')
                          }
                      }
                  })
          }
      },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/jobs/list.scss';
</style>

<style lang="scss">
@import '../../styles/pages/candidates_apply/listnotscoped.scss';
</style>
