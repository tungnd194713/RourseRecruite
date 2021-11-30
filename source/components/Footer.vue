<template>
  <footer class="company-footer">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-3 mb-3 text-center text-lg-start ">
          <img src="../assets/images/icon_logo.svg" alt="" />
        </div>
        <div class="col-6 col-lg-3 mb-2">
          <h5 class="fw-bold text-white">サイト名について</h5>
          <div class="my-2 my-lg-3 line-title"></div>
          <ul class="nav flex-column">
            <li class="nav-item mb-1"><a href="#" class="nav-link p-0 ">ホーム</a></li>
            <li class="nav-item mb-1"><a href="#" class="nav-link p-0 ">お問い合わせ</a></li>
            <li class="nav-item mb-1"><a href="#" class="nav-link p-0 ">求人一覧</a></li>
            <li class="nav-item mb-1"><a href="#" class="nav-link p-0 ">よくある質問</a></li>
          </ul>
        </div>
        <div class="col-6 col-lg-3 mb-2">
          <h5 class="fw-bold text-white">サイト運営について</h5>
          <div class="my-2 my-lg-3 line-title"></div>
          <ul class="nav flex-column">
            <li class="nav-item mb-1"><a href="#" class="nav-link p-0 ">利用規約</a></li>
            <li class="nav-item mb-1"><a href="#" class="nav-link p-0 ">プライバシーポリシー</a></li>
          </ul>
        </div>
        <div class="col-12 col-lg-3">
          <h5 class="fw-bold text-white">ソーシャルシェア</h5>
          <div class="my-2 my-lg-3 line-title"></div>
          <div class="code-fb overflow-auto">
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs&width=300&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                    width="300" height="130" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                    allowfullscreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
          </div>
          <div class="footer-icon-social">
            <img class="fs-2 me-3" src="../assets/images/icon_facebook_footer.svg" alt="">
            <img class="fs-2" src="../assets/images/icon_instagram_footer.svg" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center align-items-center footer-copyright">
      Copyright @ Company.jp
    </div>

  </footer>
</template>

<style>
  @import '../styles/layout/_footer.scss';
</style>
