<template>
  <div>
    <header class="text-white company-header">
      <div class="container">
        <div class="row flex-nowrap justify-content-between align-items-center">
          <div class="col-3 pt-1">
            <a href="localhost:3000/ja" target="_blank">
            <img src="../assets/images/icon_logo.svg" alt="">
            </a>
          </div>
          <div class="col-3">
          </div>
          <div class="col-5 d-flex justify-content-end align-items-center">
            <div class="dropdown text-end dropdown-link-acc">
              <a id="dropdownUser1" href="#" class="d-block text-decoration-none dropdown-toggle"
                 data-bs-toggle="dropdown" aria-expanded="false">
                {{ loggedInUser.company_name }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end text-small" aria-labelledby="dropdownUser1">
                <li v-for="router in routers"
                    :id="router.tab + '-tab'"
                    :key="router.tab"
                    class="border-bottom"
                >
                  <a class="dropdown-item cursor-pointer" @click="$router.push(router.path)">
                    <img class="" :src="require(`@/assets/images` + router.srcImage)"/>
                    {{router.name}}
                  </a>
                </li>
                <li class="border-bottom">
                  <a class="dropdown-item cursor-pointer" @click="$router.push('/companies/invoices')">
                    <img class="" src="../assets/images/icon_order.svg"/>
                    Danh sách thanh toán học bổng
                  </a>
                </li>
                <li>
                  <a class="dropdown-item cursor-pointer" @click="$auth.logout()">
                    <img class="" src="../assets/images/icon_logout.svg"/>
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
            <div class="point-owned" style="margin-right: 16px">{{ loggedInUser.point_owned || 0 }} points</div>
            <img
              v-if="loggedInUser.logo"
              :src="url_file + loggedInUser.logo"
              alt="mdo" width="32" height="32" class="rounded-circle">
            <img
              v-else
              src="../assets/images/icon_avatar.svg"
              alt="mdo" width="32" height="32" class="rounded-circle">
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
             class="p-2 link-light text-decoration-none border-end cursor-pointer"
             :class="$nuxt.$route.path === router.path ? 'active' : ''"
             @click="$nuxt.$router.push({ path: router.path });"
          >
            <img class="sub-align" :src="require(`@/assets/images` + router.srcImage)"/>
            {{router.name}}
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import routers from "~/constants/routers";
  import 'bootstrap/dist/css/bootstrap.css';

  export default {
    data () {
      return {
        routers,
        url_file: process.env.URL_FILE
      }
    },

    computed: {
      ...mapGetters(['loggedInUser'])
    },

    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/layout/_header.scss';
</style>
