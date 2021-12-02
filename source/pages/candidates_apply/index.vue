<template>
    <main class="container my-3 my-lg-4">
        <div class="row box-title mb-1 mb-lg-2">
            <div class="col-md-6 col-12">
                <h4 class="page-header-title">応募者一覧</h4>
            </div>
            <div class="col-md-6 col-12 d-flex part-above-search">
                <h6 class="me-5 text-above-search">
                    在留資格はこのリンクから確認できます
                </h6>
                <a href="#" class="text-above-search link-above-search">abc.com</a>
            </div>
        </div>

        <div class="row box-search mt-2 px-3 pt-3 pb-2 rounded-pill">
            <div class="col-12 col-lg-4 mb-2">
                <input
                        v-model="condition.key_word"
                        type="text"
                        class="form-control rounded-pill"
                        placeholder="タイトル"
                />
            </div>
            <div class="col-12 col-lg-3 mb-2">
                <input
                        v-model="condition.apply_date"
                        type="text"
                        class="form-control rounded-pill"
                        placeholder="応募日"
                />
            </div>
            <div class="col-12 col-lg-3 mb-2">
                <!--<input type="text" class="form-control rounded-pill" placeholder="ステータス">-->
                <select
                        v-model="condition.status_stay"
                        class="form-select rounded-pill"
                        aria-label="在留資格確認ステータス"
                >
                    <option value="">在留資格確認ステータス</option>
                    <option value="1">未対応</option>
                    <option value="2">折り返し待ち</option>
                    <option value="3">面接待ち</option>
                    <option value="4">採用</option>
                    <option value="5">不採用（連絡取れず）</option>
                    <option value="6">不採用</option>
                </select>
            </div>
            <div class="col-12 col-lg-2">
                <button type="button" class="btn btn-sm rounded-pill btn-search-job" @click="search()">
                    <img src="../../assets/images/icon_search.svg" alt=""/>
                    <span class="px-4">検索</span>
                </button>
            </div>
        </div>

        <div class="container mt-3 mt-lg-4">
            <div class="row table-responsive box-table">
                <table class="table table-list-cv">
                    <thead>
                    <tr>
                        <th v-for="header in fields" :key="header.key">{{header.label}}</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in items" :key="item.id" :class="item.read === 1 ? 'active' : ''">
                        <td class="align-middle py-3">
                          <span v-if="!(item.read || isWarningUnRead(item.created_at))" class="td-warning">
                            3日以上未対応
                            <img class="" src="../../assets/images/icon_warning.svg"/>
                          </span>
                            {{index + 1}}
                        </td>
                        <td class="align-middle py-3">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                {{item.candidate.name}}
                            </a>
                        </td>
                        <td class="align-middle py-3">{{item.jobs.title}}</td>
                        <td class="align-middle py-3">{{$moment(item.created_at).format('YYYY-MM-DD')}}</td>
                        <td class="align-middle py-3">
                            {{item.candidate.form_recruitment}}
                            <template v-if="item.candidate.form_recruitment == 1">フルタイム</template>
                            <template v-else>アルバイト</template>
                        </td>
                        <td class="align-middle py-3">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#popUpId">
                                <img
                                        class=""
                                        :src="url_file+item.candidate.residence_card_front"
                                />
                            </a>
                        </td>
                        <td class="align-middle py-3">
                            <select v-model="item.residence_card_confirm"
                                    class="form-select active rounded-3 confirm-select">
                                <option value="0">未選択</option>
                                <option value="1">承認</option>
                                <option value="2">非承認</option>
                            </select>
                        </td>
                        <td class="align-middle py-3 w-20">
                            {{item.note}}
                        </td>
                        <td class="align-middle py-3">
                            <select v-model="item.status" class="form-select active rounded-3 status-select">
                                <option value="0">未選択</option>
                                <option value="1">未対応</option>
                                <option value="2">折り返し待ち</option>
                                <option value="3">面接待ち</option>
                                <option value="4">採用</option>
                                <option value="5">不採用（連絡取れず）</option>
                                <option value="6">不採用</option>
                            </select>
                        </td>
                        <td class="align-middle py-3">
                            <a
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#popUpCheck"
                            >
                                <img class="edit-icon" src="../../assets/images/icon_edit.svg"/>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <Pagination :current-page="currentPage"
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
    import Pagination from "../../components/Pagination";

    export default {
        name: "CandidateApply",
        components: {Pagination},
        layout: 'auth',

        data() {
            return {
                url_file: process.env.URL_FILE,
                items: [],
                fields: [
                    {
                        key: 'id',
                        label: 'No'
                    },
                    {
                        key: 'candidate_name',
                        label: '氏名'
                    },
                    {
                        key: 'job_title',
                        label: '求人タイトル'
                    },
                    {
                        key: 'apply_date',
                        label: '応募日'
                    },
                    {
                        key: 'employment_form',
                        label: '雇用形態'
                    },
                    {
                        key: 'residence_card',
                        label: '在留カード'
                    },
                    {
                        key: 'status_stay',
                        label: '在留資格確認'
                    },
                    {
                        key: 'note',
                        label: '備考'
                    },
                    {
                        key: 'status',
                        label: 'ステータス'
                    }
                ],
                currentPage: 1,
                perPage: 20,
                totalItems: 0,
                pageCount: 1,
                condition: {
                    key_word: '',
                    apply_date: '',
                    status_stay: ''
                }
            }
        },

        head () {
            return {title: '応募者一覧'}
        },

        computed: {
            next() {
                return (this.currentPage < this.pageCount) ? (this.currentPage + 1) : this.pageCount;
            },
            previous() {
                return (this.currentPage > 0) ? (this.currentPage - 1) : this.currentPage;
            },
        },

        created(){
            this.getListCV(this.currentPage);
        },

        methods: {
            async getListCV(currentPage) {
                const condition = {...this.condition, currentPage};

                const {data} = await this.$repositories.candidatesApply.getListCV(condition);

                this.items = data.data;
                this.totalItems = data.total;
                this.currentPage = data.current_page;
                this.perPage = data.per_page;
                this.pageCount = (this.totalItems > 0) ? parseInt(data.total / data.per_page, 10) + 1 : 1;
            },

            pageChangeHandle(value) {
                switch (value) {
                    case 'next':
                        this.currentPage = this.next;
                        break;
                    case 'previous':
                        this.currentPage = this.previous;
                        break;
                    default:
                        this.currentPage = value
                }
                this.getListCV(this.currentPage);
            },

            search() {
                this.currentPage = 1;
                this.getListCV(this.currentPage);
            },

            isWarningUnRead(date) {
                const now = this.$moment().format('YYYY-MM-DD');
                date = this.$moment(date);

                return now < date.add(3, 'days').format('YYYY-MM-DD')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/pages/candidates_apply/list.scss';
</style>
