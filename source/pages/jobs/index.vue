<template>
  <div class="main-content">
    <div class="nav-content container">
      <div class="row box-title mb-1 mb-lg-2">
        <div class="col-6">
          <h4 class="page-header-title">Danh sách tuyển dụng</h4>
        </div>
        <div class="col-6">
          <button
            id="btn_create_job"
            type="button"
            class="btn rounded-pill btn-add-job"
            @click="checkCreateJob"
          >
            <img class="" src="../../assets/images/icon_plus.svg" />
            Tuyển dụng mới
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
        <div class="col-12 col-lg-4 mb-2 form-group">
<!--          <input-->
<!--            v-model="condition.date_start"-->
<!--            type="text"-->
<!--            class="form-control rounded-pill"-->
<!--            placeholder="開始日"-->
<!--          />-->
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
        </div>
        <div class="col-12 col-lg-4 mb-2 form-group">
          <select
            v-model="condition.status"
            class="form-select rounded-pill fix-height"
            aria-label="ステータス"
          >
            <option value="" selected>Trạng thái</option>
            <option value="1">Hiện</option>
            <option value="0">Ẩn</option>
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
                <th scope="col"></th>
                <th scope="col"></th>
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
                    @click.prevent="$router.push('/jobs/detail/' + item.id)"
                    >{{ item.title }}</a
                  >
                </td>
                <td class="align-middle min-width-100px">{{ formatDate(item.date_start) }}</td>
                <td class="align-middle min-width-100px">{{ item.date_end }}</td>
                <td class="align-middle min-width-100px">
                  {{ item.max_education_month ? item.max_education_month + ' tháng' : 'Không' }}
                </td>
                <td class="align-middle min-width-80px">{{ item.candidate_applies.length }}</td>
                <td class="align-middle min-width-80px">{{ item.education_status ? jobEducationStatus[item.education_status - 1] : 'Không đăng kí' }}</td>
                <td class="align-middle">
                  <div class="btn-group btn-toggle rounded-pill btn-switch">
                    <button
                      :class="
                        'btn btn-sm btn-check-active rounded-pill ' +
                        (item.status === 1 ? 'active' : '')
                      "
                      @click="changeStatus(item.id, item.status, item.date_end)"
                    >
                      Hiện
                    </button>
                    <button
                      :class="
                        'btn btn-sm btn-check-unactive rounded-pill ' +
                        (item.status === 0 ? 'unactive' : '')
                      "
                      @click="changeStatus(item.id, item.status, item.date_end)"
                    >
                      Ẩn
                    </button>
                  </div>
                </td>
                <td class="align-middle">
                  <div class="tooltip-custom">
                    <img
                      class="btn"
                      src="~/assets/images/ic_dup.svg"
                      @click="checkDuplicateJob(item.id)"
                    />
                    <span class="tooltiptext">Sao chép</span>
                    <!--<img
                      v-else
                      class="btn"
                      src="../../assets/images/icon_trash.svg"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeleteModal"
                      @click="confirmDelete(item.id)"
                      @mouseover="mouseOver($event, index)"
                    />-->
                  </div>
                </td>
                <td class="align-middle">
                  <div>
                    <img
                      v-if="isHover && itemsIndex == index"
                      class="btn"
                      src="../../assets/images/icon_trash_active.svg"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeleteModal"
                      @click="confirmDelete(item.id)"
                      @mouseleave="mouseLeave"
                    />
                    <img
                      v-else
                      class="btn"
                      src="../../assets/images/icon_trash.svg"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeleteModal"
                      @click="confirmDelete(item.id)"
                      @mouseover="mouseOver($event, index)"
                    />
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
      <div
        id="confirmDeleteModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
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
                <img src="../../assets/images/ic_delete image.svg" alt="" />
              </h3>
              <h3 class="text-center modal-body-text">
                Xác nhận xóa tuyển dụng?
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
                Hủy bỏ
              </button>
              <button
                type="button"
                class="btn btn-custom btn-danger rounded-pill w-20"
                @click="deleteItem"
              >
                Xác nhận
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ja'
import Pagination from '../../components/Pagination'
import defaultCareers from '~/constants/careers'
import jobEducationStatus from '~/constants/jobEducationStatus'

export default {
  name: 'ListJob',
  components: {
    Pagination,
    DatePicker
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
          key: 'date_start',
          label: 'Ngày bắt đầu',
        },
        {
          key: 'date_end',
          label: 'Ngày kết thúc',
        },
        {
          key: 'max_education_time',
          label: 'Thời gian đào tạo',
        },
        {
          key: 'number_apply',
          label: 'Đã ứng tuyển',
        },
        {
          key: 'education_status',
          label: 'Chương trình đào tạo',
        },
        {
          key: 'actions',
          label: 'Trạng thái',
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
    return { title: 'Danh sách tuyển dụng | 求人' }
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
    this.getListJob(this.currentPage)
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

    checkCreateJob() {
      this.$router.push('/jobs/create')
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

    async getListJob(currentPage) {
      const condition = { ...this.condition, currentPage }
      this.spinner = true
      this.totalItems = 0
      const { data } = await this.$repositories.jobs.getJobs(condition)
      this.spinner = false

      this.items = data.data
      this.totalItems = data.meta.total
      this.currentPage = data.meta.current_page
      this.perPage = data.meta.per_page

      this.pageCount =
        this.totalItems > 0
          ? parseInt((data.meta.total - 1) / data.meta.per_page, 10) + 1
          : 1
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
      this.getListJob(this.currentPage)
    },

    search() {
      this.currentPage = 1
      this.getListJob(this.currentPage)
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
            this.getListJob(this.currentPage)
          }
          if (res.response && res.response.status === 406) {
            document.getElementById('closeConfirmDeleteModal').click()
            this.$toast.error('Vẫn còn đơn ứng tuyển nên không thể xóa')
            this.getListJob(this.currentPage)
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
                          this.getListJob(this.currentPage)

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
