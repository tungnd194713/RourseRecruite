<template>
  <main class="container my-3 my-lg-4">
    <div class="container tab-container">
      <div class="row">
        <h3 class="title-page text-center fw-bold">Privacy Policy</h3>
      </div>
    </div>

    <div class="row m-4">
      <div class="card card-content-one">
        <h2 class="title-page-second fw-bold">
          The kinds of information we collect and hold
        </h2>
        <div class="content">
          Depending on the particular circumstances, we may collect and hold a
          range of different information about you. This can include your name,
          date of birth, contact details (including address, email address,
          phone number or mobile telephone number) occupation, driver’s licence
          number, and financial information (such as credit card or bank account
          numbers). This is not an exhaustive list. <br />
          <br />
          You might also need to provide personal information about other
          individuals to us (e.g. about your authorized representatives). If so,
          we rely on you to inform those individuals that you are providing
          their personal information to us and to advise them about this
          statement.
        </div>
      </div>

      <div class="card card-content-two">
        <h2 class="title-page-second fw-bold">
          How we collect your information?
        </h2>
        <div class="content">
          We mainly collect information from you directly (such as where you
          provide information to us when you visit our premises or website,
          complete an application form or agreement for one of our products, or
          contact us with a query or request). However, we may also collect your
          information in a number of other ways, including:

          <ul>
            <li>
              from third parties such as our related entities, business
              partners, credit reporting bodies, wholesale or other customers,
              or your representatives
            </li>
            <li>from publicly available sources of information; or</li>
            <li>when we are legally authorised or required to do so.</li>
          </ul>

          If you choose not to provide us with certain information about you, we
          may not be able to provide you with the products or services you
          require.
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: 'PrivacyPolicy',
  layout: 'auth',
  head() {
    return { title: 'プライバシーポリシー | 求人' }
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/pages/privacy-policy.scss';
</style>>
