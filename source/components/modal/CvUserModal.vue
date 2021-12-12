<template>
  <div id="staticBackdrop" class="modal fade cv_user" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl position-relative">
      <div class="modal-content">
        <div class="container-btn-language">
          <button
            type="button"
            class="btn-language btn-language-first btn-language-active"
            :class="{ 'btn-language-active': language === 'ja'}"
            @click="changeLanguage('ja')"
          >
            JA
          </button>
          <button
            type="button"
            class="btn-language btn-language-last"
            :class="{ 'btn-language-active': language === 'vi'}"
            @click="changeLanguage('vi')"
          >
            VI
          </button>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><img
          src="../../assets/images/icon_modal_close.svg" alt=""></button>
        <div class="modal-body">
          <div class="content">
            <div class="row">
              <div class="col-12 list-user">
                <table class="table">
                  <tbody>
                  <tr>
                    <td colspan="5" class="border-0">
                      <div class="d-flex align-items-end">
                        <h2 class="fw-bold flex-grow-1">履歴書</h2>
                        <div class="">
                          <span class="mx-0 mx-md-3">2020</span>年
                          <span class="mx-0 mx-md-3">10</span>月
                          <span class="mx-0 mx-md-3">20</span>日現在
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-bottom-dot text-center">スヌワル</td>
                    <td colspan="3" class="border-bottom-dot">トランバンアン</td>
                    <td rowspan="2">
                      <div class="text-center mb-3">性別</div>
                      <div class="text-center">男・女</div>
                    </td>
                    <td rowspan="4" class="card-photo">
                      <img src="../../assets/images/draft/card_photo.png" alt="">
                    </td>
                  </tr>
                  <tr>
                    <td class="border-top-dot text-center">氏名</td>
                    <td colspan="3" class="border-top-dot">TRAN VAN AN</td>
                  </tr>
                  <tr>
                    <td class="text-center">生年月日</td>
                    <td colspan="2">
                      <div>1993年<span class="mx-2 mx-md-3">7月</span>9日生</div>
                      <div class="text-center">
                        (満<span class="mx-2 mx-md-3">28</span>歳)
                      </div>
                    </td>
                    <td>
                      <div class="text-start">国籍</div>
                      <div class="text-center">べトナム</div>
                    </td>
                    <td>
                      <div class="text-start">母国語</div>
                      <div class="text-center">ベトナム証</div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <div class="text-start">携帯電話番号</div>
                      <div class="text-center">000-0000-0000</div>
                    </td>
                    <td colspan="3">
                      <div class="text-start">E-mail</div>
                      <div class="text-center">user@gmail.com</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-bottom-dot text-center">フリガナ</td>
                    <td colspan="5" class="border-bottom-dot"></td>
                  </tr>
                  <tr>
                    <td class="border-top-dot text-center">現住所</td>
                    <td colspan="5" class="border-top-dot"></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <table class="table border-2">
                  <thead>
                  <tr class="text-center">
                    <th>年</th>
                    <th>月</th>
                    <th>学歴</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>2005年</td>
                    <td>5月</td>
                    <td>
                      <div class="row">
                        <div class="col-9">ルックガン高校</div>
                        <div class="col-3">卒業</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2016年</td>
                    <td>4月</td>
                    <td>
                      <div class="row">
                        <div class="col-9">長野平成学園</div>
                        <div class="col-3">入学</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2018年</td>
                    <td>3月</td>
                    <td>
                      <div class="row">
                        <div class="col-9">長野平成学園</div>
                        <div class="col-3">卒業</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2018年</td>
                    <td>4月</td>
                    <td>
                      <div class="row">
                        <div class="col-9">千葉ビジえス専門学校 国際ビジネス科</div>
                        <div class="col-3">入学</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2020年</td>
                    <td>3月</td>
                    <td>
                      <div class="row">
                        <div class="col-9">千葉ビジネス専門学校 国際ビジネス科</div>
                        <div class="col-3">卒業見込み</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <div class="text-end">以上</div>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr class="text-center">
                    <th>年</th>
                    <th>月</th>
                    <th>職用(アルバィト含む)</th>
                  </tr>
                  <tr>
                    <td>2017年</td>
                    <td>5月</td>
                    <td>
                      <div class="row">
                        <div class="col-9">株式会礼ABC</div>
                        <div class="col-3">~2018年3月</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2018年</td>
                    <td>5月</td>
                    <td>
                      <div class="row">
                        <div class="col-9">宮武等修うどん</div>
                        <div class="col-3">~在職中</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <div class="text-end">以上</div>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="content">
            <div class="row">
              <div class="col-12 list-user">
                <table class="table tb-certificate border-2 text-center m-0">
                  <thead>
                  <tr>
                    <th>自己靴</th>
                    <th colspan="4">◯（仕事上、問題なし）△（仕事上、ある程度てきる）×（少し不安）</th>
                  </tr>
                  <tr>
                    <th>スキル</th>
                    <th>聞くこと</th>
                    <th>話すこと</th>
                    <th>読むこと</th>
                    <th>書くこと</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>日本語能力</td>
                    <td>◯</td>
                    <td>△</td>
                    <td>△</td>
                    <td>△</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>

                <table class="table tb-certificate text-center border-2 border-top-0">
                  <thead>
                  <tr>
                    <th>年</th>
                    <th>月</th>
                    <th>鮮・免許・賞割（上記以外のもの、取得予定含む）</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>2018年</td>
                    <td>2月</td>
                    <td class="text-start">NAT-TEST (N2)</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>

                <table class="table border-2">
                  <tbody>
                  <tr>
                    <td>志望の動機</td>
                  </tr>
                  <tr>
                    <td class="py-4">私はお客様に良いサーピスを提供することが好きです。私のアルワトは今接客の仕事をして
                      おります。いつもお客様に最も良い料理を提供したいと思います。お客様は良い食事は自分で喜ひに感じます。もっと
                      お客様に喜んでいただきたいと思って色々な事を検素してしました。この会社のボムペジで仕事内容を調べました
                      この仕事ば自分でお客様と話せるだけではなく、お客様に感動させたいということを私の考えと同じため志望しまし
                      た・
                    </td>
                  </tr>
                  <tr>
                    <td>
                      長所
                    </td>
                  </tr>
                  <tr>
                    <td class="py-4">私はどんな時も明るく活発に取り組むことができます。人と関わる事が好きなので日本てのァルパイトては接客の仕
                      事をしながらマナーや挨接にっいて身に付けてきました。どんな人ともコミュニケ-ションをとりすぐに仲良くなるこ
                      とができるのて、ァルバイトても新しいスタッフに仕事を丁室に教えています学校でな人の役に立っことが好きな
                      O_で生徒会でリーダ-としてクラスをまとめたか地域のポランティア清掃に積極的に参加い社会貢献の活重にも取
                      り組み充実した学生生活を送ってきました。大変な時もありましたが最後まで責任感を持ってやりとけることがで
                      きましたこれからも積種的にたくさんの柳単をしていきたいと思います。
                    </td>
                  </tr>
                  </tbody>
                </table>

                <table class="table tb-2 text-center border-2 mb-0">
                  <tbody>
                  <tr>
                    <td>配偶者</td>
                    <td>配偶者以外の<br>扶養家族</td>
                    <td>健康状態<br>(持病など有無)</td>
                  </tr>
                  <tr>
                    <td>有・無</td>
                    <td>有・無</td>
                    <td>無病無し</td>
                  </tr>
                  </tbody>
                </table>
                <table class="table  tb-2 text-center border-2 border-top-0">
                  <tbody>
                  <tr>
                    <td rowspan="2">日本滞在経歴<br>（期間・目的）</td>
                    <td class="border-bottom-dot">2017/4/20 ~ 2018/4/21</td>
                    <td rowspan="2">耳得ビザ<br>（種素・有効期限）</td>
                    <td class="border-bottom-dot">持能実習</td>
                  </tr>
                  <tr>
                    <td class="border-top-dot">留学のため</td>
                    <td class="border-top-dot">2020/7/20</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end footer">
            <img src="../../assets/images/icon_pdf_download.svg" alt="">
            <button class="btn btn-outline-secondary ms-5" data-bs-dismiss="modal" aria-label="Close">クローズ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CvUserModal",

    data() {
      return {
        language: 'ja',
      }
    },

    created() {
      // console.log()
      this.getCandidateApplyDetailFromApi()
    },

    methods: {
      getCandidateApplyDetailFromApi() {
        console.log('getCandidateApplyDetailFromApi')
      },

      changeLanguage(newLanguage) {
        if (newLanguage !== this.language) {
          this.language = newLanguage
          console.log(this.language)
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../styles/pages/jobs/cv_user.scss';
</style>
