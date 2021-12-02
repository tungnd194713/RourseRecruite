<template>
  <main class="container my-3 my-lg-4">
    <div class="card position-relative">
      <button id="btn-edit" class="btn border-0 p-0">
        <img
          width="30"
          height="30"
          src="../../assets/images/icon_edit.svg"
          alt=""
        />
      </button>
      <div class="card-body basic">
        <div class="d-md-flex">
          <div class="align-items-center">
            <div class="logo mb-3 mb-md-0">
              <img
                class="logo"
                :src="profile_image"
                alt="Company Profile Image"
              />
            </div>
          </div>
          <div class="flex-grow-1 ps-md-5">
            <h2 id="name">
              <span>{{ company_name }}</span>
            </h2>
            <div class="row">
              <div class="col-12 col-sm-6 col-lg-4 col-xxl-3">
                <div class="d-block item">
                  <span class="me-2"
                    ><img src="../../assets/images/icon_officer.svg"
                  /></span>
                  <span>{{ manager_name }}</span>
                </div>
                <div class="d-block item">
                  <span class="me-2"
                    ><img src="../../assets/images/icon_users.svg"
                  /></span>
                  <span>{{ number_members }}人</span>
                </div>
                <div class="d-block item">
                  <span class="me-2"
                    ><img src="../../assets/images/icon_globe.svg"
                  /></span>
                  <a :href="link_website">ウェーブサイトURL</a>
                </div>
              </div>
              <div class="col-12 col-sm-6 col-lg-4 col-xxl-3">
                <div class="d-block item">
                  <span class="me-2"
                    ><img src="../../assets/images/icon_calendar.svg"
                  /></span>
                  <span>{{ founded_year }}</span>
                </div>
                <div class="d-block item">
                  <span class="me-2"
                    ><img src="../../assets/images/icon_cube.svg"
                  /></span>
                  <span>{{ $t(career) }} </span>
                </div>
                <div class="d-block item">
                  <span class="me-2"
                    ><img src="../../assets/images/icon_fb_outline.svg"
                  /></span>
                  <a :href="facebook_id">Facebookリンク</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-lg-6">
            <h2 class="title">
              <span>{{ company_name }} </span>について
            </h2>
            <div class="d-block my-4 ps-0 ps-sm-3 ps-lg-5">
              <!-- <small>
                企業紹介企業紹介企業紹<br />
                介企業紹介企業紹介企業紹介<br />
                企業紹介企業紹介企業紹介企業紹介企業紹介企業紹
              </small> -->
            </div>
            <div class="d-block">
              {{ description }}
            </div>
          </div>
          <div class="col-12 col-lg-6 mt-3 mt-lg-0">
            <iframe
              class="img-fluid profile-img w-100"
              :src="video_link"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-lg-6">
            <h2 class="title">住所</h2>
            <div class="mt-4">{{ address }}</div>
          </div>
          <div class="col-12 col-lg-6 mt-3 mt-lg-0">
            <div class="map">
              <iframe
                frameborder="0"
                :src="'https://www.google.com/maps/embed/v1/place?key=' + env_map_key + '&q=' + address + '&language=ja'"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row img-group">
      <div
        v-for="image in images"
        :key="image.id"
        class="col-12 col-md-4 mb-3 mb-md-0"
      >
        <img
          class="img-fluid w-100"
          :src="image.image_url"
          alt="Company Images"
        />
      </div>
    </div>
  </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import careers from '~/constants/careers'

export default {
  name: 'ProfileCompany',
  layout: 'auth',

  data() {
    return {
      address: '',
      careers,
      env_map_key: process.env.MAP_API_KEY,
      company_name: '',
      manager_name: '',
      founded_year: '',
      number_members: '',
      featured: '',
      career: '',
      link_website: '',
      facebook_id: '',
      description: '',
      profile_image: '',
      video_link: '',
      images: [],
    }
  },

  head() {
    return { title: 'Profile Company' }
  },

  computed: {},

  created() {
    this.getProfileCompany()
  },

  methods: {
    async getProfileCompany(currentPage) {
      const condition = { currentPage }

      const { data } =
        await this.$repositories.profiles.getCompanyProfile(condition)

      this.company_name = data.company_name
      this.manager_name = data.manager_name
      this.founded_year = data.founded_year
      this.number_members = data.number_members
      this.featured = data.featured
      this.link_website = data.link_website
      this.facebook_id = data.facebook_id
      this.description = data.description
      this.profile_image = data.profile_image
      this.address = data.address
      this.video_link = data.video_link
      this.images = data.images

      this.career = this.careers[data.career - 1]
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/pages/companies/profile-company.scss';
</style>
