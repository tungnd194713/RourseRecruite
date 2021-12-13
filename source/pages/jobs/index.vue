<template>
  <div class="main-content">
    <div class="nav-content container">
      <div class="row box-title mb-1 mb-lg-2">
        <div class="col-6">
          <h4>求人一覧</h4>
        </div>
        <div class="col-6">
          <button id="btn_create_job" type="button" class="btn rounded-pill btn-add-job"
                  @click="$router.push('/jobs/create')"
          >
            <img class="" src="../../assets/images/icon_plus.svg"/>
            新規求人登録
          </button>
        </div>
      </div>

      <form class="row box-search mt-2 px-3 pt-3 pb-2 rounded-pill">
        <div class="col-12 col-lg-4 mb-2 form-group">
          <input v-model="condition.title" type="text" class="form-control rounded-pill" placeholder="タイトル">
        </div>
        <div class="col-12 col-lg-3 mb-2 form-group">
          <input v-model="condition.date_start" type="text" class="form-control rounded-pill" placeholder="登録日">
        </div>
        <div class="col-12 col-lg-3 mb-2 form-group">
          <select v-model="condition.status" class="form-select rounded-pill" aria-label="ステータス">
            <option selected>ステータス</option>
            <option value="1">Ok</option>
            <option value="0">No</option>
          </select>
        </div>
        <div class="col-12 col-lg-2">
          <button type="button" class="btn btn-sm rounded-pill btn-search-job" @click="search">
            <img src="../../assets/images/icon_search.svg" alt="">
            <span class="px-4">検索</span>
          </button>
        </div>
      </form>

      <div class="container mt-3 mt-lg-4">
        <div id="list_job" class="row table-responsive box-table" >
        <table id="list"
               class="table table-hover"
               :current-page="currentPage"
               :per-page="perPage"
        >
          <thead>
          <tr>
            <th v-for="header in fields" :key="header.key">{{header.label}}</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id" :class="item.read === 0 ? 'unread' : ''">
              <td class="align-middle py-3 text-center">
                          <span v-if="!(item.read || isWarningUnRead(item.date_start))" class="td-warning">
                          未対応の履歴書{{item.cv_read}}/{{item.total_cv_applied}}通 <img class="" src="../../assets/images/icon_warning.svg"/>
                          </span>
                  {{index + 1}}
                </td>

              <td class="align-middle py-3">
                <a href="" class="text-decoration-none" @click.prevent="$router.push('/jobs/detail/' + item.id)">{{item.title}}</a>
              </td>
              <td class="align-middle py-3">{{item.date_start}}</td>
              <td class="align-middle py-3">{{item.date_end}}</td>
              <td class="align-middle py-3">{{item.form_recruitment}}</td>
              <td class="align-middle py-3">{{item.conditions_apply}}</td>
              <td class="align-middle py-3">{{item.number_recruitments}}</td>
              <td class="align-middle py-3">
                <div class="btn-group btn-toggle rounded-pill btn-switch">
                  <button
                    :class="'btn btn-sm btn-check-active rounded-pill ' + (item.status === 1 ? 'active' : '')"
                    @click="changeStatus(item.id, item.status)"
                  >
                    有効
                  </button>
                  <button
                    :class="'btn btn-sm btn-check-unactive rounded-pill ' + (item.status === 0 ? 'unactive' : '')"
                    @click="changeStatus(item.id, item.status)"
                  >
                    無効
                  </button>
                </div>
              </td>
              <td class="align-middle py-3">
                <img class="btn" src="../../assets/images/icon_trash.svg" data-bs-toggle="modal"
                     data-bs-target="#confirmDeleteModal" @click="confirmDelete(item.id)"/>
              </td>
          </tr>
          </tbody>
        </table>
        <h4 v-if="totalItems === 0" class="text-center w-100 p-3 m-0 bg-white border-bottom border-1">検索結果がありません</h4>
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
      <!-- Modal -->
      <div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content box-modal">
            <div class="modal-header border-0">
              <img
                class="close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closeConfirmDeleteModal"
                src="../../assets/images/ic_exit.svg"
                alt=""
              >
            </div>
            <div class="modal-body">
              <h3 class="text-center">
                <img src="../../assets/images/ic_delete image.svg" alt="">
              </h3>
              <h3 class="text-center modal-body-text">本求人を削除してもよろしいですか?</h3>
            </div>
            <div class="modal-footer align-items-center d-flex justify-content-center flex-row">
              <button type="button" class="btn btn-secondary-custom rounded-pill w-20 mt-4 mb-4" data-bs-dismiss="modal">キャンセル</button>
              <button type="button" class="btn btn-danger rounded-pill w-20" @click="deleteItem">削除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import Pagination from "../../components/Pagination";

  export default {
    name: "ListJob",
    components: {Pagination},
    layout: 'auth',

    data() {
      return {
        items: [],
        fields: [
          {
            key: 'id',
            label: 'No'
          },
          {
            key: 'title',
            label: 'タイトル'
          },
          {
            key: 'date_start',
            label: '開始日'
          },
          {
            key: 'date_end',
            label: '終了日'
          },
          {
            key: 'form_recruitment',
            label: '雇用形態'
          },
          {
            key: 'conditions_apply',
            label: '語学レベル'
          },
          {
            key: 'number_recruitments',
            label: '応募者数'
          },
          {
            key: 'actions',
            label: 'ステータス',
            tdClass: 'action'
          }
        ],
        currentPage: 1,
        perPage: 10,
        totalItems: 0,
        pageCount: 1,
        condition: {
          title: '',
          date_start: '',
          status: ''
        },
        selectedItemId: 0
      }
    },

    head () {
      return { title: 'List job' }
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
      this.getListJob(this.currentPage);
    },

    methods: {
      async getListJob(currentPage) {
        const condition = { ...this.condition, currentPage };

        const { data } = await this.$repositories.jobs.getJobs(condition);

        this.items = data.data;
        this.totalItems = data.meta.total;
        this.currentPage = data.meta.current_page;
        this.perPage = data.meta.per_page;
        this.pageCount = (this.totalItems > 0) ? parseInt(data.meta.total / data.meta.per_page, 10) + 1 : 1;
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
        this.getListJob(this.currentPage);
      },

      search() {
        this.currentPage = 1;
        this.getListJob(this.currentPage);
      },

      isWarningUnRead(date) {
        const now = this.$moment().format('YYYY-MM-DD');
        date = this.$moment(date);

        return now < date.add(3, 'days').format('YYYY-MM-DD')
      },

      confirmDelete(itemId) {
        this.selectedItemId = itemId
      },

      async deleteItem() {
        return await this.$repositories.jobs.deleteJob(this.selectedItemId).then(res => {
          if (res.status === 200) {
            document.getElementById('closeConfirmDeleteModal').click()
            this.$toast.success('求人の削除に成功しました')
            this.getListJob(this.currentPage);
          }
          if (res.response && res.response.status === 406) {
            document.getElementById('closeConfirmDeleteModal').click()
            this.$toast.error('応募者がいるので、求人を削除できません')
            this.getListJob(this.currentPage);
          }
        })
      },

      async changeStatus(itemId, oldStatus) {
        return await this.$repositories.jobs.changeStatus(itemId, {
          status: (oldStatus === 1) ? 0 : 1
        }).then(res => {
          if (res.status === 200) {
            this.getListJob(this.currentPage);

            if (oldStatus === 1) {
              this.$toast.success('求人が非表示されました')
            } else if (oldStatus === 0) {
              this.$toast.success('求人が表示されました')
            }
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/pages/jobs/list.scss';
</style>
