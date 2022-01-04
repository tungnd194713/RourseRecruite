<template>
  <div class="container tab-content mb-5">
    <div class="row">
      <h3 class="title-page">{{ loggedInUser.company_name }}社の{{month}}月請求書</h3>
    </div>
    <div v-if="totalItems > 0" class="text-center table-responsive">
      <table class="table table-bordered mt-3">
        <tr class="border-0 mt-3">
          <td class="border-1 total-cost col-2">
            <h5 class="bold-text align-middle">合計費用</h5>
          </td>
          <td class="border-1 total-cost col-2">
            <h5 class="bold-text align-middle">{{ showTotalCostJobs(invoice.total) }}</h5>
          </td>
          <td class="border-0"></td>
          <td class="border-0"></td>
          <td class="border-0"></td>
          <td class="border-0"></td>
          <td class="border-0"></td>
          <td class="border-0"></td>
          <td class="border-0"></td>
          <td class="border-0"></td>
        </tr>
      </table>
    </div>
    <div class="text-center table-responsive list">
      <table class="table table-bordered pb-0 mb-0">
        <thead class="align-middle">
        <tr>
          <th scope="col">No</th>
          <th scope="col">プラン</th>
          <th scope="col">仕事タイトル</th>
          <th scope="col" class="blue-head">１ヶ月間の掲載費用</th>
          <th scope="col" class="blue-head">掲載された期間<p>(月単位)</p></th>
          <th scope="col" class="blue-head">費用</th>
          <th scope="col" class="violet-head">応募数<p>（件）</p></th>
          <th scope="col" class="violet-head">応募1件につき</th>
          <th scope="col" class="violet-head">総計<p>（応募）</p></th>
          <th scope="col">総計<p>（投稿＋応募）</p></th>
        </tr>
        </thead>
        <tbody v-if="!spinner && totalItems > 0">
        <tr v-for="(job, index) in jobs"
            :key="job.id"
        >
          <th scope="row">{{ parseInt(index, 10) + 1 }}</th>
          <td class="type-plan">{{ convertTypePlan(job.type_plan) }}</td>
          <td class="text-left title">{{ job.title }}</td>
          <td class="text-right">{{ showPrice(job) }}</td>

          <td v-if="priceCheckNaN((job.invoice_job_detail))">{{ job.display_month }}</td>
          <td v-else></td>

          <td class="text-right">{{ priceCheckNaN((job.invoice_job_detail)) ? '¥' : ''  }}
            {{  priceCheckNaN((job.invoice_job_detail))
            ? Math.ceil(calculateCostJob(job.invoice_job_detail, job.display_month)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : '' }}</td>

          <td>{{ job.invoices_applied_detail.length }}</td>
          <td class="text-right">{{ (showPriceApplied(job, packages)) }}</td>
          <td class="text-right">¥{{ showTotalApplied(job.invoices_applied_detail.length * priceCheckEmpty(job.invoices_applied_detail)) }}</td>
          <td class="text-right">{{ totalCost(
            calculateCostJob(job.invoice_job_detail, job.display_month),
            job.invoices_applied_detail.length *  priceCheckEmpty(job.invoices_applied_detail)
            ) }}
          </td>
        </tr>
        <tr v-if="totalItems > perPage" class="border-0 d-flex tr-empty"></tr>
        <tr v-if="totalItems > 0" class="border-0">
          <td class="border-0"></td>
          <td class="border-0"></td>
          <td class="border-0"></td>
          <td class="border-0"></td>
          <td class="border-1 title-total-cost-job">
            <p class="bold-text align-middle">投稿費用合計</p>
          </td>
          <td class="border-1 title-total-cost-job">
            <p class="bold-text align-middle">{{ showTotalCostJobs(invoice.cost_job) }}</p>
          </td>
          <td class="border-0"></td>
          <td class="border-1 title-total-cost-job">
            <p class="bold-text align-middle">応募合計</p>
          </td>
          <td class="border-1 title-total-cost-job">
            <p class="bold-text align-middle">{{ showTotalCostJobs(invoice.cost_apply) }}</p>
          </td>
          <td class="border-1 title-total-cost-job">
            <p class="bold-text align-middle">{{ showTotalCostJobs(invoice.total) }}</p>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-if="totalItems === 0 && spinner" class="outer-spinner">
        <div class="loader"></div>
      </div>
      <h4 v-if="totalItems === 0  && !spinner" class="text-center w-100 p-3 m-0 bg-white border border-1">検索結果がありません</h4>
    </div>
    <Pagination
      :current-page="currentPage"
      :per-page="perPage"
      :total-items="totalItems"
      :page-count="pageCount"
      @nextPage="pageChangeHandle('next')"
      @previousPage="pageChangeHandle('previous')"
      @customPage="pageChangeHandle"
    />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Pagination from '../../components/Pagination'

  export default {
    name: "Detail",
    layout: 'payment',
    components: {
      Pagination,
    },

    data () {
      return {
        month: '',
        invoice: {},
        jobs: [],
        packages: [],
        typePlanList: [
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
            text: '標準プラン',
            value: 4
          },
        ],
        spinner: '',
        currentPage: 1,
        perPage: 20,
        totalItems: 0,
        pageCount: 1,
      }
    },
    head () {
      return {title: '求人のプラン'}
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
    },

    created() {
      this.getInvoiceInMonth(this.currentPage);
    },

    methods: {
      async getInvoiceInMonth(currentPage) {
        this.month = this.$moment(this.$route.query.year_month).format('M') || this.$moment().format('M');

        const params = {
          year_month: this.$route.query.year_month,
          current_page: currentPage
        };
        this.spinner = true
        this.totalItems = 0

        const res = await this.$repositories.invoices.getInvoiceInMonth(params);

        this.spinner = false
        this.invoice = res.data.invoice;
        this.jobs = res.data.jobs.data;
        this.packages = res.data.packages;

        this.totalItems = res.data.total_job;
        this.currentPage = res.data.jobs.current_page
        this.perPage = res.data.jobs.per_page
        this.pageCount = res.data.jobs.last_page
      },

      convertTypePlan(typePlan) {
        const plan = this.typePlanList.filter(el => (el.value === typePlan));

        return plan[0].text;
      },

      calculateCostJob(invoiceJobDetail, displayMonth) {
        if (invoiceJobDetail) {
          return Math.round(invoiceJobDetail.price * displayMonth * 1000000) / 1000000;
        }
        return 0;
      },

      priceCheckNaN(invoiceJobDetail) {
        return invoiceJobDetail
          ? Math.round(invoiceJobDetail.price * 1000000) / 1000000
          : 0;
      },

      calculateCostApplied(invoicesAppliedDetail, amount) {
        if (invoicesAppliedDetail.length > 0) {
          return Math.round(invoicesAppliedDetail[0].price * amount * 1000000) / 1000000;
        }
        return 0;
      },

      totalCost(costApplied, costJob) {
        const price = costApplied + costJob;

        return price ? '¥' + Math.ceil(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
      },

      priceCheckEmpty(invoicesAppliedDetail) {
        return invoicesAppliedDetail.length > 0
          ? Math.round(invoicesAppliedDetail[0].price * 1000000) / 1000000
          : 0;
      },

      priceApply(packages, typePlan) {
        const plan = packages.filter(el => (el.plan_type === typePlan));

        return Math.round(plan[0].price_apply * 1000000) / 1000000;
      },

      showTotalCostJobs(costJob) {
        const price = Math.round(costJob * 1000000) / 1000000;

        return price
          ? '¥' + Math.ceil(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : '';
      },

      showTotalApplied(total) {
        return total
          ? Math.ceil(total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : 0;
      },

      showPriceApplied(job, packages) {
        const price = this.priceCheckEmpty(job.invoices_applied_detail) || this.priceApply(packages, job.type_plan)

        return price
          ? '¥' + Math.ceil(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : '';
      },

      showPrice(job) {
        const price = this.priceCheckNaN((job.invoice_job_detail));

        return price
          ? '¥' + Math.ceil(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : '';
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
        this.getInvoiceInMonth(this.currentPage)
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../styles/pages/invoices/detail.scss';
</style>
