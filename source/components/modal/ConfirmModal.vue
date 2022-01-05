<template>
  <div
    id="confirmUpdateStatusModal"
    class="modal fade update-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="confirmUpdateStatusModal"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content box-modal">
        <div class="modal-header border-0">
          <img
            id="closeConfirmUpdateStatusModal"
            class="close-modal"
            data-bs-dismiss="modal"
            aria-label="Close"
            src="../../assets/images/ic_exit.svg"
            alt=""
            @click="reloadList"
          />
        </div>
        <div class="modal-body-content my-3">
          <h3 class="text-center modal-body-text">
            ステータスを変更してもよろしいか？
          </h3>
        </div>
        <div
          class="
                modal-footer
                align-items-center
                d-flex
                justify-content-center
                flex-row
              "
        >
          <button
            type="button"
            class="btn btn-cancel-update rounded-pill w-20 mt-4 mb-4"
            data-bs-dismiss="modal"
            @click="reloadList"
          >
            いいえ
          </button>
          <button
            type="button"
            class="btn btn-ok-update btn-custom rounded-pill w-20"
            @click="updateItemStatus"
          >
            はい
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmModal",
  methods: {
    reloadList() {
      this.$emit('reloadList')
    },
    updateItemStatus() {
      this.$emit('updateItemStatus')
    },
  },
}
</script>

<style scoped>
  @import '../../styles/components/modals/confirmModal.scss';
</style>
