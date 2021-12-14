<template>
    <main class="container my-3 my-lg-4">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <NuxtLink
                    to="/companies/packages"
                    class="nav-link big-nav nav-one active"
                    aria-current="page"
                    >決済情報</NuxtLink
                >
            </li>
            <li class="nav-item">
                <NuxtLink
                    to="/"
                    class="nav-link big-nav nav-two"
                    >請求書</NuxtLink
                >
            </li>
            <li class="nav-item">
                <NuxtLink
                    to="/companies/invoices"
                    class="nav-link big-nav nav-three"
                    >決済履歴</NuxtLink
                >
            </li>
        </ul>

        <div class="container tab-content">
            <div class="row">
                <h3 class="title-page">料金プラン</h3>
            </div>
            <div class="text-center">
                <picture class="">
                    <source
                        media="(max-width: 950px)"
                        srcset="../../../assets/images/package.png"
                    />
                    <img src="../../../assets/images/package.png" alt="" />
                </picture>
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
                                    Phone: 098 000 000
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

export default {
    name: 'Packages',
    layout: 'auth',
    head() {
        return { title: 'Packages' }
    },
}
</script>

<style lang="scss" scoped>
@import '../../../styles/pages/companies/packages.scss';
</style>