<template>
  <div class="nav-content">
    <div class="d-flex flex-row content-header">
      <div class="col-md-6">
        <h1 class="text-start"><b>List job</b></h1>
      </div>
      <div class="col-md-6 mt-2">
        <button type="button" class="btn btn-primary btn-sm add-job">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
          </svg>
          Add job
        </button>
      </div>

    </div>
    <div class="search">
      <div class="row">
        <input class="col-sm col-lg-3 input-search" type="text" placeholder="Tìm kiếm" />
        <input class="col-sm col-lg-3 input-search" type="text" placeholder="Tìm kiếm" />
        <input class="col-sm col-lg-3 input-search" type="text" placeholder="Tìm kiếm" />
        <div class="col-sm col-lg-1">
          <button type="submit" class="btn btn-m search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            Search
          </button>
        </div>
      </div>
    </div>


    <div id="list_job" class="border-1 border-dark card-body table-responsive-lg" >
      <table id="list"
             class="table table-hover"
             :current-page="currentPage"
             :per-page="perPage"
      >
        <thead>
        <tr>
          <th v-for="header in fields" :key="header.key">{{header.label}}</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="item.id" >
              <td>{{index + 1}}</td>
              <td>{{item.title}}</td>
              <td>{{item.date_start}}</td>
              <td>{{item.date_end}}</td>
              <td>{{item.form_recruitment}}</td>
              <td>{{item.conditions_apply}}</td>
              <td>{{item.number_recruitments}}</td>
              <td>
                  <div>
                    <div class="row">
                      <div class="btn-group actions col-sm-3" role="group">
                        <input :id="'btn_radio1_' + index" type="radio" class="btn-check" :name="'btn_radio1_' + index" autocomplete="off" checked>
                        <label class="btn btn-outline-primary switch" :for="'btn_radio1_' + index" style="border-radius: 3rem;">Active</label>

                        <input :id="'btn_radio2_' + index" type="radio" class="btn-check" :name="'btn_radio1_' + index" autocomplete="off">
                        <label class="btn btn-outline-primary switch" :for="'btn_radio2_' + index" style="border-radius: 3rem;">Block</label>
                      </div>
                      <div class="col-sm-3" style="margin: 0; margin-right: 0">
                        <button class="trash" style="width: 2rem !important;">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style="margin-left: -3px;">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>

                        </button>
                      </div>

                    </div>
                  </div>
            </td>
        </tr>
        </tbody>
      </table>
      <Pagination :current-page="currentPage"
                  :per-page="perPage"
                  :total-items="totalItems"
                  :page-count="pageCount"
                  @nextPage="pageChangeHandle('next')"
                  @previousPage="pageChangeHandle('previous')"
                  @customPage="pageChangeHandle"
      />
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import Pagination from "../../components/Pagination";

  export default {
    layout: 'auth',
    name: "ListJob",
    components: {Pagination},
    data() {
      return {
        items: [],
        fields: [
          {
            key: 'id',
            label: 'ID'
          },
          {
            key: 'title',
            label: 'Title'
          },
          {
            key: 'date_start',
            label: 'Start'
          },
          {
            key: 'date_end',
            label: 'End'
          },
          {
            key: 'form_recruitment',
            label: 'Form Recruitment'
          },
          {
            key: 'conditions_apply',
            label: 'Conditions Apply'
          },
          {
            key: 'number_recruitments',
            label: 'Number Recruitment'
          },
          {
            key: 'actions',
            label: 'Actions',
            tdClass: 'action'
          }
        ],
        currentPage: 1,
        perPage: 20,
        totalItems: 0,
        pageCount: 1,
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
        const condition = { currentPage };

        const { data } = await this.$repositories.jobs.getJobs(condition);

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
        this.getListJob(this.currentPage);
      }
    }
  }
</script>

<style lang="scss">
  @import '../../styles/pages/jobs/list.scss';
</style>
