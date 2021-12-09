<template>
  <main class="container my-3 my-lg-4">
    <ul class="nav nav-tabs">
      <li class="nav-item w-50">
        <a class="nav-link big-nav nav-one" aria-current="page" href="#"
          >決済情報</a
        >
      </li>
      <li class="nav-item w-50">
        <NuxtLink class="nav-link big-nav nav-two active" to="/companies/invoices">決済履歴</NuxtLink>
      </li>
    </ul>
    <div class="container tab-content">
      <div class="row">
        <h3 class="title-page">決済履歴</h3>
      </div>
      <div class="row table-responsive box-table">
        <table class="table table-list-cv">
          <thead>
            <tr>
              <th scope="col" v-for="header in fields" :key="header.key">
                {{ header.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id" class="active">
              <td class="align-middle py-3">{{ item.id }}</td>
              <td class="align-middle py-3">{{ item.paid_at.split(' ')[0] }}</td>
              <td class="align-middle py-3">{{ item.year_month }}</td>
              <td class="align-middle py-3">¥{{ item.cost_job ? Math.ceil(item.cost_job) : null }}</td>
              <td class="align-middle py-3">¥{{ item.cost_apply ? Math.ceil(item.cost_apply) : null }}</td>
              <td class="align-middle py-3">
                {{ item.transaction == null || item.transaction.payment_method == 1 ? '振込' : 'クレジットカード' }}
              </td>
              <td class="align-middle py-3">{{ theStatus[item.status] }}</td>
              <td class="align-middle py-3">¥{{ item.total ? Math.ceil(item.total) : null }}</td>
              <td class="align-middle py-3">
                <button
                  class="form-control btn btn-sm btn-payment"
                  style="background: white"
                >
                  決済
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
  </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import Pagination from '../../components/Pagination'
import theStatus from '~/constants/invoicesStatus'

export default {
  name: 'InvoiceCompany',
  components: { Pagination },
  layout: 'auth',

  data() {
    return {
      items: [],
      fields: [
        {
          key: 'payment_code',
          label: '決済番号',
        },
        {
          key: 'payment_date',
          label: '決済日',
        },
        {
          key: 'year_month',
          label: '月',
        },
        {
          key: 'cost_job',
          label: '投稿費用合計',
        },
        {
          key: 'cost_apply',
          label: '応募合計',
        },
        {
          key: 'payment_method',
          label: '決済方法',
        },
        {
          key: 'status',
          label: 'ステータス',
        },
        {
          key: 'total',
          label: '合計費用',
        },
        {
          key: 'action',
          label: 'アクション',
          tdClass: 'action',
        },
      ],
      theStatus,
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
      pageCount: 1,
    }
  },

  head() {
    return { title: '決済履歴' }
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
    this.getInvoices(this.currentPage)
  },

  methods: {
    async getInvoices(currentPage) {
      const { data } = await this.$repositories.profiles.getInvoices(
        currentPage
      )

      this.items = data.data
      this.totalItems = data.total
      this.currentPage = data.current_page
      this.perPage = data.per_page
      this.pageCount =
        this.totalItems > 0 ? parseInt(data.total / data.per_page, 10) + 1 : 1
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
  },
}
</script>

<style lang="scss">
@import '../../styles/pages/companies/invoices.scss';
</style>
