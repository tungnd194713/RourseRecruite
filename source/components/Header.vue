<template>
<!--  <div>-->
<!--    <div class="header p-2">-->
<!--      <a href="#" class="logo">Logo</a>-->
<!--      <div class="header-right">-->
<!--        <div class="dropdown-1 m-0 d-flex flex-row">-->
<!--          <div class="dropdown">-->
<!--            <button id="dropdownMenuButton" class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
<!--              Dropdown button-->
<!--            </button>-->
<!--            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">-->
<!--              <a class="dropdown-item item_dropdown" href="#">Account</a>-->
<!--              <a class="dropdown-item item_dropdown" href="#">Logout</a>-->
<!--            </div>-->
<!--          </div>-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" class="bi bi-person-circle avatar" viewBox="0 0 16 16">-->
<!--            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>-->
<!--            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>-->
<!--          </svg>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="nav-tabs">-->
<!--      <div class="nav-tabs">-->
<!--        <nav>-->
<!--          <div id="nav-tab" class="nav nav-tabs justify-content-center d-flex flex-row px-5" role="tablist">-->
<!--            <button v-for="router in routers"-->
<!--                    :id="router.tab + '-tab'"-->
<!--                    :key="router.tab"-->
<!--                    class="nav-link w-25"-->
<!--                    data-bs-toggle="tab"-->
<!--                    :data-bs-target="'#' + router.tab"-->
<!--                    type="button"-->
<!--                    role="tab"-->
<!--                    :aria-controls="router.tab"-->
<!--                    aria-selected="false"-->
<!--                    @click="redirect(router)"-->
<!--            >-->
<!--              {{router.name}}-->
<!--            </button>-->
<!--          </div>-->
<!--        </nav>-->
<!--      </div>-->
<!--    </div>-->
<!--    </div>-->
  <div>
    <header class="text-white company-header">
      <div class="container">
        <div class="row flex-nowrap justify-content-between align-items-center">
          <div class="col-3 pt-1">
            <img src="../assets/images/icon_logo.svg" alt="">
          </div>
          <div class="col-3">
          </div>
          <div class="col-5 d-flex justify-content-end align-items-center">
            <div class="dropdown text-end dropdown-link-acc">
              <a id="dropdownUser1" href="#" class="d-block text-decoration-none dropdown-toggle"
                 data-bs-toggle="dropdown" aria-expanded="false">
                HungTran
              </a>
              <ul class="dropdown-menu dropdown-menu-end text-small" aria-labelledby="dropdownUser1">
                <li v-for="router in routers"
                    :id="router.tab + '-tab'"
                    :key="router.tab"
                    class="border-bottom"
                >
                  <a class="dropdown-item" @click="redirect(router)">
                    <img class="" :src="require(`@/assets/images` + router.srcImage)"/>
                    {{router.name}}
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" @click="redirect('/auth/login')">
                    <img class="" src="../assets/images/icon_logout.svg"/>
                    ログアウト
                  </a>
                </li>
              </ul>
            </div>
            <img src="../assets/images/icon_avatar.svg" alt="mdo" width="32" height="32" class="rounded-circle">
          </div>
        </div>
      </div>
    </header>
    <div class="company-menu">
      <div class="container ">
        <nav class="nav d-flex justify-content-center">
          <a v-for="router in routers"
             :id="router.tab + '-tab'"
             :key="router.tab"
             class="p-2 link-light text-decoration-none border-end"
             @click="redirect(router)"
          >
            <img class="" :src="require(`@/assets/images` + router.srcImage)"/>
            {{router.name}}
          </a>
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

<style scoped>
  @import '../styles/layout/_header.scss';
</style>
