<template>
  <!-- Modal -->
  <div class="modal fade" id="completeCreateJobModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content box-modal">
        <div class="modal-header border-0">
          <img
            class="close-modal"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeCompleteCreateJobModal"
            src="../assets/images/ic_exit.svg"
            alt=""
            @click="$router.push('/jobs/create')"
          >
        </div>
        <div class="modal-body">
          <h3 class="text-center">
            <img src="../assets/images/ic_done.svg" alt="">
          </h3>
          <h3 class="text-center modal-body-text">新規求人登録が完了しました</h3>
        </div>
        <div class="modal-footer align-items-center d-flex justify-content-center flex-row">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CompleteCreateJobModal",
  }
</script>

<style lang="scss" scoped>
  @import "../styles/components/_complete_create_job_modal.scss";
</style>
