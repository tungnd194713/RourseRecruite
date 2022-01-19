<template>
    <main class="container my-3 my-lg-4">
        <div class="container tab-container">
            <div class="row">
                <h3 class="title-page text-center fw-bold">
                    FAQ – Câu hỏi thường gặp
                </h3>
            </div>
        </div>

        <div class="container text-center faq-con">
            <div
                    v-for="data in datas"
                    :key="data.value"
                    class="row m-4 question-button"
            >
                <div class="p-con">
                    <p>
                        <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                :data-bs-target="'#' + data.class"
                                aria-expanded="false"
                                :aria-controls="data.class"
                                :class="{shown: data.isShown}"
                                @click.prevent="data.isShown = !data.isShown">
                            <div class="row">
                                <div
                                        class="col-10 button-title fw-bold"
                                        style="text-align: start; padding-left: 30px"
                                >
                                    {{ data.title }}
                                </div>
                                <div
                                        class="col-2 mid"
                                        style="text-align: end; padding-right: 30px"
                                >
                                    <img
                                            src="../assets/images/ic_plus.svg"
                                            alt=""
                                            :class="{ rotated: data.isShown }"
                                    />
                                </div>
                            </div>
                        </button>
                    </p>
                    <div :id="data.class" class="collapse">
                        <div class="card card-body text-start">
                            <div v-for="(content, index) in data.content" :key="index">{{ content }}</div>
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
        name: 'Faq',
        layout: 'auth',
        data() {
            return {
                icon_click: '',
                processing: false,
                datas: [
                    {
                        value: 1,
                        title: '1.『Shuuナビ』を使うのに、お金が掛かりますか？',
                        class: 'about-company',
                        isShown: false,
                        content: [
                          '一切お金はかかりません。無料でお仕事を探すことが出来ます。'
                        ],
                    },
                    {
                        value: 2,
                        title: '2. 技能実習から在留資格を、特定技能に変えられますか？',
                        class: 'about-cv',
                        isShown: false,
                        content: [
                          '技能実習2号もしくは3号を修了していれば特定技能に変更できます。',
                          '一時的に特定活動4か月を申請許可後、特定技能への変更というルートもございます。'
                        ]
                    },
                    {
                        value: 3,
                        title: '3. 技能実習と違う分野でお仕事がしたいです。技能試験を受けないといけないですか？',
                        class: 'about-ai-match',
                        isShown: false,
                        content: [
                          '特定活動(1年)にて許可後に就業できます。ただし、その1年以内に働く職種の特定技能の試験に合格する必要があります。合格後、特定技能に変更できます。',
                          '特定技能の試験に合格していればすぐに特定技能へ変更できます。'
                        ]
                    },
                    {
                        value: 4,
                        title: '4. 特定技能の在留資格で働いています。別の会社で働くことが出来ますか？',
                        class: 'about-vietnam-companies',
                        isShown: false,
                        content: [
                          '特定技能では転職する場合、特定技能変更申請が必要です。許可後に就業できます。'
                        ]
                    },
                    {
                        value: 5,
                        title: '5. 技術・人文・国際業務の在留資格を取得しておりますが、どんなお仕事ができますか？',
                        class: 'about-visa',
                        isShown: false,
                        content: [
                          'プログラマー、通訳、機械オペレータなどの仕事ができます。'
                        ]
                    },
                    {
                        value: 6,
                        title: '6. 求人要件に在留資格の内容が記載されていますが、私が取得している在留資格と一致しないといけないですか？',
                        class: 'about-what',
                        isShown: false,
                        content: [
                          '一致しない場合、在留資格変更申請をする必要があります。'
                        ]
                    },
                    {
                        value: 7,
                        title: '7. 応募先から連絡が無いのですが、どうしたらいいですか？',
                        class: 'about-which',
                        isShown: false,
                        content: [
                          '恐れ入りますが弊社では企業の選考状況は把握することができませんので、応募者様ご自身で応募先に連絡するようお願いいたします。'
                        ]
                    },
                    {
                        value: 8,
                        title: '8. 求人情報の応募キャンセルはできますか？',
                        class: 'about-none',
                        isShown: false,
                        content: [
                          '応募頂いた内容のキャンセルは弊社で対応することができません。',
                          '応募を取り消される場合は、直接応募先に連絡をお願いいたします。'
                        ]
                    },
                ],
            }
        },
        head() {
            return {title: 'よくある質問 | 求人'}
        },
        methods: {

        },
    }
</script>

<style lang="scss" scoped>
    @import '../styles/pages/faq.scss';
</style>
>
