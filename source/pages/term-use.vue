<template>
  <main class="container my-3 my-lg-4">
    <div class="container tab-container">
      <div class="row">
        <h3 class="title-page text-center fw-bold">TERMS OF USE</h3>
      </div>
    </div>

    <div class="row m-4">
      <div class="card card-content-one">
        <h2 class="title-page-second fw-bold">1. Introduction</h2>
        <div class="content">
          <ul>
            <li>
              1.1 Welcome to ITviec. You will find our contact details in the
              About Us section on our website.
            </li>
            <li>
              1.2 We reserve the right to modify these terms and conditions
              without notice and so you should view them each time you visit our
              website.
            </li>
            <li>
              1.3 Your use of this website signifies your agreement to these
              terms and conditions which constitute a contract between you and
              us governing such use. If you are a consumer your statutory rights
              are not affected by this agreement.
            </li>
          </ul>
        </div>
      </div>

      <div class="card card-content-two">
        <h2 class="title-page-second fw-bold">
          2. Intellectual Property Rights
        </h2>
        <div class="content">
          <ul>
            <li>
              2.1 The content of our website including without limitation all
              information, software, data, text, photographs, graphics, sound
              and video are protected by copyright, trade marks, service marks,
              patents or other proprietary rights.
            </li>

            <li>
              2.2 Other than insofar as necessary for reasonable personal use of
              the website, its content may not be retrieved, displayed,
              modified, copied, printed, sold, downloaded, sold, hired, reverse
              engineered or transmitted in any way without our prior written
              consent.
            </li>
          </ul>
        </div>
      </div>

      <div class="card card-content-three">
        <h2 class="title-page-second fw-bold">3. Disclaimers</h2>
        <div class="content">
          <ul>
            <li>
              3.1 On this website we offer you links to other sites which we
              hope will be of interest. The links are automated listings based
              on the domain name and/or on keywords used in the search engine on
              our site and/or on other criteria. If you have any concerns about
              any content on this website, please contact us and we will do our
              best to resolve them.
            </li>
            <li>
              3.2 We have no control over the third party sites listed on this
              website and do not endorse them. You agree that we are not
              responsible for the availability or content of, or goods or
              services available on, those websites. You use those websites at
              your own risk.
            </li>
            <li>
              3.3 This website is provided “as is”. We do not guarantee
              uninterrupted or error-free service. We reserve the right to
              suspend the website without notice for repair, maintenance or
              other technical reasons.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: 'TermUse',
  layout: 'auth',
  head() {
    return { title: '利用規約 | 求人' }
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/pages/term-use.scss';
</style>>
