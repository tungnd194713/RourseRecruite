<template>
  <div>
    <div class="header p-2">
      <a href="#" class="logo">Logo</a>
      <div class="header-right">
        <div>
          <b-dropdown id="dropdown-1" text="Profile">
            <b-dropdown-item href="#" class="item_dropdown">Logout</b-dropdown-item>
          </b-dropdown>
          <b-avatar class="avatar" variant="primary"></b-avatar>
        </div>
      </div>
    </div>
    <div class="nav-tabs">
      <b-tabs content-class="pt-3"
              justified
              active-tab-class="font-weight-bold">
        <b-tab v-for="router in routers"
               :title="router.tab"
               @click="redirect(router)"
               :key="router.name"
        ></b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<style>
  html {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  body {
    position: relative;
    margin: 0;
    padding-bottom: 6rem;
    min-height: 100%;
    height: 90rem;
  }

  .header {
    background-color: #0e304a;
    padding: 0 10px;
    height: 5rem;
    padding-left: 5rem !important;
    padding-right: 6rem !important;
  }

  .header a {
    float: left;
    color: white;
    text-align: center;
    padding: 1rem;
    text-decoration: none;
    font-size: 15px;
    line-height: 25px;
    border-radius: 4px;
  }

  /* Style the logo link (notice that we set the same value of line-height and font-size to prevent the header to increase when the font gets bigger */
  .header a.logo {
    font-size: 25px;
    font-weight: bold;
  }

  /* Change the background color on mouse-over */
  .header a:hover {
    background-color: #0e304a;;
    color: white;
  }

  /* Style the active/current link */
  .header a.active {
    background-color: dodgerblue;
    color: white;
  }

  /* Float the link section to the right */
  .header-right {
    float: right;
    padding-top: 1rem;
  }

  /* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */
  @media screen and (max-width: 500px) {
    .header a {
      float: none;
      display: none;
      text-align: left;
    }
    .header-right {
      float: none;
      padding-top: 1.25rem;
    }
  }

  .avatar {
    background: #82b0ca !important;
  }

  #dropdown-1 button {
    border: 0;
    background: #0e304a !important;
    color: #82b0ca;
  }

  #dropdown-1 button:focus {
    outline: none;
    box-shadow: none;
  }

  .item_dropdown {
    color: black;
    visibility: visible;
  }

  .nav-tabs {
    border: 0;
  }

  .nav-tabs ul {
    background: #a0bed0;
  }

  h1 {
    color: #0a3156
  }

  .nav-tabs ul li .active {
    color: #0a3156 !important;
    font-weight: bold;
    background: #a0bed0 !important;
  }

  .tab-content {
    background: #ededed;
  }
</style>
<script>
  import routers from "~/constants/routers";

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
