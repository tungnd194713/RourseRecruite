<template>
  <!-- Modal -->
  <div class="modal fade" id="statusStayInfoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content box-modal">
        <div class="modal-header border-0">
          <img
            class="close-modal"
            data-bs-dismiss="modal"
            aria-label="Close"
            src="../assets/images/ic_exit.svg"
            alt=""
          >
        </div>
        <div class="modal-body">
          <h3 class="text-center">
            <img src="../assets/images/icon_question_image.svg" alt="">
          </h3>
          <br>
          <br>
          <h3 class="text-center modal-body-text">TƯ CÁCH LƯU TRÚ LÀ GÌ ?</h3>
          <h6 class="text-center">Tư cách lưu trú (Certificate of Eligibility) viết tắt COE là giấy phép không thể thiếu dành cho người nước ngoài khi đến Nhật Bản để sinh sống, học tập hoặc làm việc trong một khoảng thời gian nhất định. Có nhiều loại tư cách lưu trú được cấp cho từng mục đích khác nhau.</h6>
        </div>
        <div class="modal-footer align-items-center d-flex justify-content-center flex-column mb-4">
          <p>Bạn có thể xem giải thích về tư cách lưu trú tại đây</p>
          <p class="red-text">FAQ - Câu hỏi thường gặp</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "StatusStayInfoModal"
    }
</script>

<style lang="scss" scoped>
  @import "../styles/components/_status_stay_info_modal.scss";
</style>
