
<template>
  <div class="container tab-content mb-5">
    <!--<div class="container tab-content">-->
      <div class="row">
        <h3 class="title-page">Danh sách thanh toán học bổng</h3>
      </div>
      <div class="row table-responsive box-table">
        <table class="table table-list-cv">
          <thead>
            <tr>
              <th v-for="header in fields" :key="header.key" scope="col">
                {{ header.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id" class="active">
              <td class="align-middle">{{ index + 1 }}</td>
              <td class="align-middle">{{ item.userName }}</td>
              <td class="align-middle">{{ item.courseName }}</td>
              <td class="align-middle">{{ item.position }}</td>
              <td class="align-middle">{{ item.scholarship }}%</td>
              <td class="align-middle">{{ item.course_cost }}</td>
              <td class="align-middle">{{ item.unlocked_at ? item.unlocked_at.split('T')[0] : '' }}</td>
              <td class="align-middle">
                <span :style="{ color: item.scholarship_paid ? '#67C23A' : '#E6A23C', cursor: !item.scholarship_paid ? 'pointer' : 'unset' }" @click="showPaymentModal(item)">{{ item.scholarship_paid ? 'Đã thanh toán' : 'Chưa thanh toán' }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <h4
          v-if="totalItems === 0"
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
      </Pagination>
    <!--</div>-->
    <button
      ref="showCheckoutPayjpModal"
      class="d-none"
      data-bs-toggle="modal"
      data-bs-target="#checkoutPayjpModal"
    />
    <div id="checkoutPayjpModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title"><strong>Thanh toán học bổng</strong></h5>
            <button ref="closeCheckoutPayjpModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
          </div>
          <div class="modal-body">
            <div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Ứng viên:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <h5>
                    {{ unlockingCourse.userName }}
                  </h5>
                </div>
              </div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Lộ trình học:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <h5>
                    {{ unlockingCourse.position }}
                  </h5>
                </div>
              </div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Tên khóa học:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <h5>
                    {{ unlockingCourse.courseName }}
                  </h5>
                </div>
              </div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Point thanh toán:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <h5>
                    {{ unlockingCourse.course_cost }} (Học bổng {{ unlockingCourse.scholarship }}%)
                  </h5>
                </div>
              </div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Point đang sở hữu:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <h5>
                    {{ companyPoint }}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer align-items-center d-flex justify-content-center flex-row">
            <button type="button" class="btn btn-danger rounded-pill w-20 mt-4 mb-4" data-bs-dismiss="modal">Hủy</button>
            <button type="button" class="btn btn-success rounded-pill w-20 btn-p" data-bs-dismiss="modal" @click="unlockCourse()">Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import 'bootstrap/dist/css/bootstrap.css'
import {validationMixin} from 'vuelidate'
import {
  required,
  numeric
} from 'vuelidate/lib/validators'
import Pagination from '../../components/Pagination'
import theStatus from '~/constants/invoicesStatus'

export default {
  name: 'InvoiceCompany',
  components: { Pagination },
  mixins: [validationMixin],
  layout: 'payment',

  data() {
    return {
      items: [],
      fields: [
        {
          key: 'no',
          label: 'No.',
        },
        {
          key: 'userName',
          label: 'Ứng viên',
        },
        {
          key: 'position',
          label: 'Lộ trình',
        },
        {
          key: 'courseName',
          label: 'Khóa học',
        },
        {
          key: 'scholarship',
          label: 'Học bổng',
        },
        {
          key: 'course_cost',
          label: 'Point phải trả',
        },
        {
          key: 'unlocked_at',
          label: 'Ngày mở khóa',
        },
        {
          key: 'status',
          label: 'Trạng thái',
        },
      ],
      theStatus,
      unlockingCourse: {},
      // Paginate
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
      pageCount: 1,

      pk_key: process.env.PAYJP_PUBLIC_KEY,
      isShow: false,
      selectedItemId: '',

      // Card
      card: {
        number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
        name: ''
      },
      payjpToken: '',
      companyPoint: 0,
    }
  },

  validations: {
    card: {
      number: {
        required,
        numeric
      },
      exp_month: {
        required,
        numeric
      },
      exp_year: {
        required,
        numeric
      },
      cvc: {
        required,
        numeric
      },
      name: {
        required,
      },
    },
  },

  head() {
    return { title: 'Thanh toán học bổng' }
  },

  computed: {
    ...mapGetters(['loggedInUser']),
    next() {
      return this.currentPage < this.pageCount
        ? this.currentPage + 1
        : this.pageCount
    },
    previous() {
      return this.currentPage > 0 ? this.currentPage - 1 : this.currentPage
    },
    formatCardNumber(){
      return this.card.number ? this.card.number.match(/.{1,4}/g).join(' ') : '';
    }
  },

  created() {
    this.getInvoices(this.currentPage)
    this.companyPoint = this.loggedInUser.point_owned
  },

  methods: {
    async getInvoices(currentPage) {
      const { data } = await this.$repositories.invoices.getCourseUnlockHistory({ page: currentPage })

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
      this.getInvoices(this.currentPage)
    },

    saveSelectedItemId(invoiceId) {
      this.selectedItemId = invoiceId;
    },

    async unlockCourse() {
      if (this.unlockingCourse.course_cost <= this.loggedInUser?.point_owned) {
        const { data} = await this.$repositories.invoices.payCourse(this.unlockingCourse.id);
        if (data) {
          this.$toast.success('Thanh toán thành công')
          this.$refs.closeCheckoutPayjpModal.click();
          this.companyPoint -= this.unlockingCourse.course_cost
          this.getInvoices(this.currentPage)
        }
      } else {
        this.$toast.error('Không đủ point thanh toán, hãy nạp thêm point!')
      }
    },

    showPaymentModal(item) {
      if (!item.scholarship_paid) {
        this.$refs.showCheckoutPayjpModal.click();
        this.unlockingCourse = {...item}
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/companies/invoices.scss';
</style>
<style lang="scss">
#checkoutPayjpModal {
  .modal-dialog {
    max-width: 800px !important;
  }
}
</style>
