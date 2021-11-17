<template>
  <div class="nav-content">
    <h1><b>List job</b></h1>

    <div class="search">
      <div class="row">
        <input class="col-sm col-lg-3 input-search" type="text" placeholder="Tìm kiếm" />
        <input class="col-sm col-lg-3 input-search" type="text" placeholder="Tìm kiếm" />
        <input class="col-sm col-lg-3 input-search" type="text" placeholder="Tìm kiếm" />
        <div class="col-sm col-lg-1">
          <button type="button" class="btn btn-primary btn-sm search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            Search
          </button>
        </div>
      </div>
    </div>


    <div id="list_job" class="border-1 border-dark" >
      <b-table responsive="sm" show-empty :items="items" :fields="fields"  :current-page="currentPage" :per-page="0">
        <template #cell(actions)>
          <div>
            <div class="row actions">
              <div class="col toggle-button-cover" >
                <div class="button-cover">
                  <div class="button r button-1">
                    <input type="checkbox" class="checkbox">
                    <div class="knobs"></div>
                    <div class="layer"></div>S
                  </div>
                </div>
              </div>
              <div class="col" style="margin: 0; margin-right: 0; padding-top:1rem;">
                <button class="trash" style="width: 2rem !important;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style="margin-left: -3px;">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>

                </button>
              </div>

            </div>
          </div>
        </template>
      </b-table>
      <b-pagination size="md" :total-rows="totalItems" v-model="currentPage" :per-page="perPage"></b-pagination>
    </div>
  </div>
</template>

<style>
  .nav-content {
    width: 100%;
    background: #ededed;
    padding-block: 0;
    padding-inline: 6rem;
  }

  .search {
    padding-block: 1rem;
    background: white;
    border-radius: 3rem;
    padding-inline: 1rem;
    height: 100%;
  }

  .search .row {
    margin-top: 0.25rem;
    padding-inline: 1rem;
  }

  input {
    border: 1px solid #afcad9;
    border-radius: 3rem;
    padding-inline: 0.5rem;
    padding-block: 0.5rem;
    margin-right: 1rem;
    height: 2.5rem;
    width: 29% !important;
  }

  ::placeholder {
    color: #afcad9;
    font-weight: lighter;
    opacity: 1;
  }

  .search-button {
    background: #2f83b9;
    border-radius: 3rem;
    width: 100% !important;
    height: 100%;
    position: relative;
  }

  .search-button:hover {
    background: #0a3156;
  }

  #list_job {
    margin-top: 2rem;
    background: white;
  }

  #list_job table thead{
    background: #ededed;
  }

  #list_job table tbody{
    border-top: 0;
  }

  .toggle-button-cover
  {
    display: table-cell;
    position: relative;
    width: 3rem;
    height: 2rem;
    box-sizing: border-box;
  }

  .button-cover
  {
    height: 2rem;
    background-color: #fff;
  }

  .button-cover::before
  {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #d7e3e3;
    font-size: 12px;
    line-height: 1;
    padding: 5px;
  }

  .button-cover, .knobs, .layer
  {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .button
  {
    position: relative;
    top: 50%;
    width: 6rem;
    height: 36px;
    margin: -20px auto 0 auto;
    overflow: hidden;
  }

  .button-1
  {
    border-radius: 2rem;
    border: 1px solid #afcad9;
  }

  .layer
  {
    width: 100%;
    background-color: white;
    transition: 0.3s ease all;
    z-index: 1;
  }

  .button-1 .layer
  {
    transition: 0.3s ease all;
  }

  .button .r, .button .r .layer
  {
    border-radius: 2rem;
    border: 1px solid #afcad9;
  }

  .button.b2
  {
    border-radius: 2px;
  }

  .checkbox
  {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .knobs
  {
    z-index: 2;
  }

  .button-1 .knobs::before
  {
    content: 'Active';
    position: absolute;
    left: 0;
    width: 60%;
    height: 100%;
    color: #fff;
    font-size: 0.8rem;
    font-weight: lighter;
    text-align: center;
    padding: 9px 4px;
    background-color: #87b0c6;
    border-radius: 1rem;
    transition: 0.3s ease all !important;
  }

  .button-1 .checkbox:checked + .knobs::before
  {
    content: 'Block';
    left: 2.5rem;
    background-color: #cbcbcb;
  }

  .button-1 .knobs
  {
    transition: 0.3s ease all;
  }

  .button-1 .checkbox:checked ~ .layer
  {
    background-color: white;
  }

  .trash {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    border: 1px solid black;
    right: 0;
    margin-right: 9rem;
    padding-top: 3px;
  }

  .actions {
    margin-right:0 !important;
    width: 5rem;
    text-align: center;
    padding-top:1rem;
  }

  .action {
    width: 12rem !important;
  }
</style>

<script>
  export default {
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
        currentPage: 0,
        perPage: 20,
        totalItems: 0
      }
    },
    name: "ListJob",

    created(){
      this.getListJob();
    },

    methods: {
      async getListJob() {
        this.items = await this.$axios.$get(`/companies/jobs?_page=${this.currentPage}&_limit=${this.perPage}`)
          .then(res => {
            this.totalItems = res.total
            this.currentPage = res.current_page
            this.perPage = res.per_page

            return res.data
          })
          .then(items => items)
      }
    },
  }
</script>
