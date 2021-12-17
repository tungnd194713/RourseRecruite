<template>
  <div class="container tab-content mb-5">
    <div class="container tab-content">
      <div class="row">
        <h3 class="title-page">決済履歴</h3>
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
            <tr v-for="item in items" :key="item.id" class="active">
              <td class="align-middle">{{ item.id }}</td>
              <td v-if="item.paid_at" class="align-middle py-3">{{ item.paid_at.split(' ')[0] }}</td>
              <td v-else class="align-middle py-3"></td>
              <td class="align-middle" @click="$router.push('/invoices/detail?id=' + item.id)">{{ item.year_month }}</td>
              <td class="align-middle">
                ¥{{ item.cost_job ? Math.ceil(item.cost_job).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null }}
              </td>
              <td class="align-middle">
                ¥{{ item.cost_apply ? Math.ceil(item.cost_apply).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null }}
              </td>
              <td class="align-middle">
                {{
                  item.transaction == null ||
                  item.transaction.payment_method == 1
                    ? '振込'
                    : 'クレジットカード'
                }}
              </td>
              <td class="align-middle">{{ theStatus[item.status] }}</td>
              <td class="align-middle">
                ¥{{ item.total ? Math.ceil(item.total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null }}
              </td>
              <td class="align-middle">
                <div v-if="item.status === 2" class="btn-payment">
                  <img
                    class="text-center btn btn-inside"
                    src="../../assets/images/icon_money_jp.svg"
                    alt=""
                    data-bs-toggle="modal"
                    data-bs-target="#checkoutPayjpModal"
                  />
                  <form @submit.prevent="submitPayment">
                    <script
                      type="text/javascript"
                      src="https://checkout.pay.jp/"
                      class="payjp-button"
                      :data-key="pk_key"
                      data-submit-text="トークンを作成する"
                      data-partial="false"
                      data-token-name="payjp_token"
                      :data-on-created="submitPayment"
                      :data-on-failed="onTokenFailed"
                    >
                    </script>
                  </form>
                </div>
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
    <!-- Modal -->
    <div id="checkoutPayjpModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card_block__body">
              <div id="payjp_spinner" class="spinner" style="display: none;"><img src="images/loading.gif"></div>
              <div class="tab-content">
                <div id="payjp_supportedBrands" class="mod--cardlist">
                  <ul>
                    <li><img src="https://checkout.pay.jp/images/creditcard/visa.png"></li>
                    <li><img src="https://checkout.pay.jp/images/creditcard/mastercard.png"></li>
                    <li><img src="https://checkout.pay.jp/images/creditcard/jcb.png"></li>
                    <li><img src="https://checkout.pay.jp/images/creditcard/americanExpress.png"></li>
                    <li><img src="https://checkout.pay.jp/images/creditcard/discover.png"></li>
                    <li><img src="https://checkout.pay.jp/images/creditcard/dinersClub.png"></li>
                  </ul>
                </div>
                <div id="account_card" role="tabpanel" class="tab-pane active">
                  <form>
                    <div class="mod--form">
                      <div class="form_control">
                        <div class="inner"><label for="payjp_cardNumber">カード</label><input id="payjp_cardNumber"
                                                                                           name="cardnumber"
                                                                                           class="payjp_simple-input-text"
                                                                                           type="tel"
                                                                                           placeholder="1234 5678 9012 3456"
                                                                                           maxlength="19"
                                                                                           pattern="([0-9]| )*">
                          <hr class="payjp_border">
                          <hr class="payjp_hiddenborder">
                          <div id="payjp_cardImage" class="card"></div>
                        </div>
                      </div>
                      <div class="form_control form_control--half">
                        <div class="inner"><label for="payjp_cardExpiresMonth">有効期限</label> <input
                          id="payjp_cardExpiresMonth" name="ccmonth" class="payjp_simple-input-text" autocomplete="off"
                          inputtype="number" placeholder="月" type="tel" maxlength="2"> <input id="payjp_cardExpiresYear"
                                                                                              name="ccyear"
                                                                                              class="payjp_simple-input-text"
                                                                                              autocomplete="off"
                                                                                              inputtype="number"
                                                                                              placeholder="年" type="tel"
                                                                                              maxlength="2"> <input
                          id="payjp_cardExpiresSeparator" class="payjp_simple-input-separator" placeholder="/"
                          type="text" disabled="">
                          <hr class="payjp_border">
                          <hr class="payjp_hiddenborder">
                        </div>
                        <span id="payjp_partition-border"></span>
                        <div class="inner"><label for="payjp_cardCvc">CVC番号</label> <input id="payjp_cardCvc" name="cvc"
                                                                                           class="payjp_simple-input-text"
                                                                                           autocomplete="off" type="tel"
                                                                                           maxlength="4"
                                                                                           placeholder="CVC">
                          <hr class="payjp_border">
                          <hr class="payjp_hiddenborder">
                          <div id="payjp_cvcTip" class="help_tip" style="display: none;"><img
                            src="images/cvc_tip/type_01.png"></div>
                          <div id="payjp_cvcTipMobile" class="help_tip__mobile" style="display: none;"><img
                            src="images/cvc_tip/type_01_m.png"></div>
                          <button id="payjp_cvcTipButton" class="help_tip_button" type="button" tabindex="-1"></button>
                        </div>
                      </div>
                      <div class="form_control">
                        <div class="inner"><label for="payjp_cardName">名前</label><input id="payjp_cardName"
                                                                                        name="ccname"
                                                                                        class="payjp_simple-input-text"
                                                                                        type="text" inputtype="email"
                                                                                        placeholder="TARO YAMADA">
                          <hr class="payjp_border">
                          <hr class="payjp_hiddenborder">
                        </div>
                      </div>
                    </div>
                    <div class="bottom_block"><input id="payjp_cardSubmit" type="submit" value="トークンを作成する" class="btn">
                    </div>
                  </form>
                </div></div></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
// import _ from 'lodash'
import Pagination from '../../components/Pagination'
import theStatus from '~/constants/invoicesStatus'

export default {
  name: 'InvoiceCompany',
  components: { Pagination },
  layout: 'payment',

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
      pk_key: process.env.PAYJP_PUBLIC_KEY
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
    // this.submitPayment()
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
    async submitPayment(res) {
      // eslint-disable-next-line no-use-before-define
      // const token = this.$route.query.payjp_token ?? null;
      console.log(123)
      // if (token) {
        const dataform = new FormData();

        // dataform.append('id', this.$root.user.id);
        dataform.append('payjp-token', res.id);

        await this.$axios.post('/companies/payment', dataform).then(e => {
          console.log(e);
        }).catch((error) => {
          console.log(error);
        });
      // }
    },
    onTokenFailed (status, err) {
      console.log(status)
      console.log(err)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/companies/invoices.scss';
</style>
