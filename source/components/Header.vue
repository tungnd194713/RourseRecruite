<template>
  <div>
    <div class="header p-2">
      <a href="#" class="logo">Logo</a>
      <div class="header-right">
        <div class="dropdown-1 m-0 d-flex flex-row">
          <div class="dropdown">
            <button id="dropdownMenuButton" class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown button
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item item_dropdown" href="#">Account</a>
              <a class="dropdown-item item_dropdown" href="#">Logout</a>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" class="bi bi-person-circle avatar" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="nav-tabs">
      <div class="nav-tabs">
        <nav>
          <div id="nav-tab" class="nav nav-tabs justify-content-center d-flex flex-row px-5" role="tablist">
            <button v-for="router in routers"
                    :id="router.tab + '-tab'"
                    :key="router.tab"
                    class="nav-link w-25"
                    data-bs-toggle="tab"
                    :data-bs-target="'#' + router.tab"
                    type="button"
                    role="tab"
                    :aria-controls="router.tab"
                    aria-selected="false"
                    @click="redirect(router)"
            >
              {{router.name}}
            </button>
          </div>
        </nav>
      </div>
    </div>
    </div>
</template>

<script>
  import routers from "~/constants/routers";
  import 'bootstrap/dist/css/bootstrap.css';


  export default {
    data () {
      return {
        routers,
      }
    },
    methods: {
      redirect(tab) {
        this.$router.push({ path: tab.path });
      }
    }
  }
</script>

<style>
  @import '../styles/layout/_header.scss';
</style>
