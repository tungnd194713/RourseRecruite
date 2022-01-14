
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
              <td class="align-middle">{{ item.invoice_code }}</td>
              <td v-if="item.paid_at" class="align-middle py-3">{{ item.paid_at.split(' ')[0] }}</td>
              <td v-else class="align-middle py-3"></td>
              <td class="align-middle link-invoice" @click="$router.push('/invoices/detail?year_month=' + item.year_month)">{{ item.year_month }}</td>
              <td class="align-middle">
                ¥{{ item.cost_job ? Math.ceil(item.cost_job).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }}
              </td>
              <td class="align-middle">
                ¥{{ item.cost_apply ? Math.ceil(item.cost_apply).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 }}
              </td>
              <td v-if="item.transaction && item.transaction.payment_method === 1" class="align-middle">
                クレジットカード
              </td>
              <td v-if="item.transaction && item.transaction.payment_method === 2" class="align-middle">
                振込
              </td>
              <td v-if="item.transaction === null || (item.transaction && item.transaction.payment_method === null)" class="align-middle"></td>
              <td class="align-middle">{{ theStatus[item.status] }}</td>
              <td class="align-middle">
                ¥{{ item.total ? Math.ceil(item.total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null }}
              </td>
              <td class="align-middle">
                <div v-if="item.status === 2 && item.total >= 50 && item.total <= 9999999" class="btn-payment">
                  <img
                    class="text-center btn btn-inside"
                    src="../../assets/images/icon_money_jp.svg"
                    alt=""
                    data-bs-toggle="modal"
                    data-bs-target="#checkoutPayjpModal"
                    @click="saveSelectedItemId(item.id)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <h4
          v-if="totalItems === 0"
          class="text-center w-100 p-3 m-0 bg-white border-bottom border-1"
        >
          検索結果がありません
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
          * クレジットカードでの決済可能な金額は50円〜9,999,999円までです。<br />
        </p>
      </Pagination>
    </div>
    <!-- Modal -->
    <div id="checkoutPayjpModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title"><strong>支払い情報</strong></h5>
            <button ref="closeCheckoutPayjpModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
          </div>
          <div class="modal-body">
            <div class="card_block__body">
              <div id="payjp_spinner" class="spinner" style="display: none;"><img src="https://checkout.pay.jp/images/loading.gif" alt=""></div>
              <div class="modal-body-content">
                <div id="payjp_supportedBrands d-flex" class="mod--cardlist">
                  <ul class="row">
                    <li class="img-supported-brands col-2"><img src="https://checkout.pay.jp/images/creditcard/visa.png"></li>
                    <li class="img-supported-brands col-2"><img src="https://checkout.pay.jp/images/creditcard/mastercard.png"></li>
                    <li class="img-supported-brands col-2"><img src="https://checkout.pay.jp/images/creditcard/jcb.png"></li>
                    <li class="img-supported-brands col-2"><img src="https://checkout.pay.jp/images/creditcard/americanExpress.png"></li>
                    <li class="img-supported-brands col-2"><img src="https://checkout.pay.jp/images/creditcard/discover.png"></li>
                    <li class="img-supported-brands col-2"><img src="https://checkout.pay.jp/images/creditcard/dinersClub.png"></li>
                  </ul>
                </div>
                <div id="account_card" role="tabpanel" class="tab-pane active">
                  <form>
                    <div class="mod--form">
                      <div class="form_control">
                        <div class="inner">
                          <label for="payjp_cardNumber">カード</label>
                          <input id="payjp_cardNumber"
                                 v-model="formatCardNumber"
                                 name="cardnumber"
                                 class="payjp_simple-input-text"
                                 type="tel"
                                 placeholder="1234 5678 9012 3456"
                                 maxlength="19"
                                 pattern="([0-9]| )*"
                                 @input="updateValue"
                          >
                          <hr class="payjp_border" :style="$v.card.number.$error ? 'border: 1px solid red;' : ''">
                          <hr class="payjp_hiddenborder">
<!--                          <div id="payjp_cardImage" class="card"></div>-->
                        </div>
                      </div>
                      <div class="form_control form_control--half d-flex">
                        <div class="inner col-6">
                          <label for="payjp_cardExpiresMonth">有効期限</label>
                          <input id="payjp_cardExpiresMonth"
                                 v-model="card.exp_month"
                                 name="ccmonth"
                                 class="payjp_simple-input-text"
                                 autocomplete="off"
                                 inputtype="number"
                                 placeholder="月"
                                 type="tel"
                                 maxlength="2"
                          >
                          <input id="payjp_cardExpiresYear"
                                 v-model="card.exp_year"
                                 name="ccyear"
                                 class="payjp_simple-input-text"
                                 autocomplete="off"
                                 inputtype="number"
                                 placeholder="年"
                                 type="tel"
                                 maxlength="2">
                          <input id="payjp_cardExpiresSeparator"
                                 class="payjp_simple-input-separator"
                                 placeholder="/"
                                 type="text" disabled="">
                          <hr class="payjp_border" :style="($v.card.exp_year.$error || $v.card.exp_month.$error) ? 'border: 1px solid red;' : ''">
                          <hr class="payjp_hiddenborder">
                        </div>
                        <span id="payjp_partition-border"/>
                        <div class="inner col-5">
                          <label for="payjp_cardCvc">CVC番号</label>
                          <input id="payjp_cardCvc"
                                 v-model="card.cvc"
                                 name="cvc"
                                 class="payjp_simple-input-text"
                                 autocomplete="off" type="tel"
                                 maxlength="4"
                                 placeholder="CVC">
                          <hr class="payjp_border" :style="$v.card.cvc.$error ? 'border: 1px solid red;' : ''">
                          <hr class="payjp_hiddenborder">
                          <div id="payjp_cvcTip" class="help_tip"
                               :style="'display: ' + (isShow ? 'block;' : 'none;')">
                            <img src="https://checkout.pay.jp/images/cvc_tip/type_01.png">
                          </div>
                          <button id="payjp_cvcTipButton"
                                  class="help_tip_button"
                                  type="button"
                                  tabindex="-1"
                                  @click="showTip"
                          />
                        </div>
                      </div>
                      <div class="form_control">
                        <div class="inner">
                          <label for="payjp_cardName">名前</label>
                          <input id="payjp_cardName"
                                 v-model="card.name"
                                 name="ccname"
                                 class="payjp_simple-input-text"
                                 type="text" inputtype="email"
                                 placeholder="TARO YAMADA"
                                 maxlength="255"
                          >
                          <hr class="payjp_border" :style="$v.card.name.$error ? 'border: 1px solid red;' : ''">
                          <hr class="payjp_hiddenborder">
                        </div>
                      </div>
                    </div>
                    <div class="bottom_block">
                      <button id="payjp_cardSubmit"
                              type="button"
                             class="btn btn-primary"
                              @click="createTokenCard">トークンを作成する</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      payjpToken: ''
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
    return { title: '決済履歴 | 求人' }
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
    formatCardNumber(){
      return this.card.number ? this.card.number.match(/.{1,4}/g).join(' ') : '';
    }
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

    saveSelectedItemId(invoiceId) {
      this.selectedItemId = invoiceId;
    },

    async submitPayment() {
      const dataForm = new FormData();
      dataForm.append('payjp-token', this.payjpToken);

      await this.$repositories.payments.chargeInvoice(this.selectedItemId, dataForm).then(res => {
        if (res.status === 200) {
          this.$toast.success('決済に成功しました')
          this.$refs.closeCheckoutPayjpModal.click()

          this.getInvoices(this.currentPage)
        } else {
          this.$toast.error("決済が失敗しました")
        }
      }).catch((error) => {
        this.$toast.error(error)
      });
    },

    showTip() {
      this.isShow = !this.isShow;
    },

    async createTokenCard() {
      const dataForm = new FormData();
      dataForm.append('card[number]', this.card.number.replace(/\s+/g, ''));
      dataForm.append('card[cvc]', this.card.cvc);
      dataForm.append('card[exp_month]', this.card.exp_month);
      dataForm.append('card[exp_year]', '20' + this.card.exp_year);
      dataForm.append('card[name]', this.card.name);

      this.$v.card.$touch()
      if (!this.$v.card.$invalid) {
        await this.$repositories.payments.createToken(dataForm, {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(res => {
          if (res.status === 200) {
            this.payjpToken = res.data;

            this.submitPayment();
          } else {
            this.$toast.error('有効期限が無効です')
          }
        }).catch((error) => {
          this.$toast.error(error)
        });
      }
    },

    updateValue(e){
      this.card.number = e.target.value.replace(/ /g,'');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/companies/invoices.scss';
</style>
