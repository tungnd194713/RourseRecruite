<template>
        <div class="container tab-content">
            <div class="row">
                <h3 class="title-page">求人のプラン</h3>
            </div>

            <!-- <picture class="">
                    <source
                        media="(max-width: 950px)"
                        srcset="../../../assets/images/package.png"
                    />
                    <img src="../../../assets/images/package.png" alt="" />
                </picture> -->
            <div class="text-center" style="margin-left: 16px; margin-right: 16px; margin-bottom: 15px">
                <table class="table table-borderless">
                    <tr>
                        <th colspan="2"></th>
                        <th scope="col" class="package">プランA</th>
                        <th scope="col" class="package">プランB</th>
                        <th scope="col" class="package">プランC</th>
                        <th scope="col" class="package">標準プラン</th>
                    </tr>

                    <tr>
                        <td rowspan="3" class="first-row-title">
                            求人掲載1件につき
                        </td>
                        <td class="column-first-row">投稿</td>
                        <td class="package-value">O</td>
                        <td class="package-value">O</td>
                        <td class="package-value">O</td>
                        <td class="package-value">O</td>
                    </tr>

                    <tr>
                        <td scope="row" class="column-first-row">Homepageに掲載される</td>
                        <td class="package-value">O</td>
                        <td class="package-value">x</td>
                        <td class="package-value">x</td>
                        <td class="package-value">x</td>
                    </tr>

                    <tr>
                        <td scope="row" class="column-first-row">仕事一覧に表示順番</td>
                        <td class="package-value">1</td>
                        <td class="package-value">2</td>
                        <td class="package-value">3</td>
                        <td class="package-value">4</td>
                    </tr>

                    <tr>
                        <th scope="row" class="second-row-title">
                          応募1件につき <br />
                            （受けた履歴書）
                        </th>
                        <td class="column-second-row">応募確認</td>
                        <td class="package-value">O</td>
                        <td class="package-value">O</td>
                        <td class="package-value">O</td>
                        <td class="package-value">O</td>
                    </tr>
                </table>
            </div>

            <div class="row m-4">
                <div class="card card-content-two">
                    <div
                        class="
                            card-body
                            d-flex
                            justify-content-center
                            align-items-center
                            flex-column
                        "
        >
          <h3 class="title-page">決済説明</h3>
          <div class="payment-explain">
            <p>
              1/
              基本料金は求人掲載1件につき〇円、応募1件につき△円とします。
            </p>
            <p>
              2/
              プランによって、掲載金額、応募課金金額が異なります。
            </p>
            <p>3/ 詳しくは管理者に連絡してください。</p>
            <p>4/ 決済は振込とクレジットカードとします。</p>
          </div>
          <h3 class="title-page">連絡先</h3>
          <div class="row">
            <div
              class="
                                    col-md-6 col-12
                                    d-flex
                                    justify-content-center
                                "
            >
              <h5 class="info-pill rounded-pill">
                Mail: support@gmail.com
              </h5>
            </div>
            <div
              class="
                                    col-md-6 col-12
                                    d-flex
                                    justify-content-center
                                "
            >
              <h5 class="info-pill rounded-pill">
                TEL: 098-000-0000
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'

  export default {
    name: 'Packages',
    layout: 'payment',
    head() {
      return {title: '決済情報 | 求人'}
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../../styles/pages/companies/packages.scss';
</style>
