<template>
  <div class="row pb-3 pb-lg-4 mb-4 mb-lg-5 box-pagination">
    <div class="col-12 col-lg-6">
      <p v-if="!descriptionRequire"></p>
      <p v-else>
        * 太字は未読、細字は既読である。<br />
        *
        白い背景は有効期限切れになった求人、浅い青色の背景は有効期間中の求人である。<br />
        * 3日以上未読の履歴書があったら、リマインダーが表示されます。
      </p>
    </div>
    <div class="col-12 col-lg-6">
      <nav v-if="totalItems > perPage" aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
          <li class="page-item disabled">
            <a
              tabindex="-1"
              aria-disabled="true"
              :class="
                'page-link previous rounded-circle me-1 me-lg-1 fw-bold ' +
                isPreviousButtonDisabled
              "
              aria-label="Previous"
              @click="previousPage"
              ><img class="" src="../assets/images/icon_laquo.svg"
            /></a>
          </li>
          <li v-for="i in pageCount" :key="i" class="page-item">
            <a
              :class="
                'btn page-link rounded-circle me-1 me-lg-1 fw-bold ' +
                (currentPage === i ? 'active' : '')
              "
              @click="customPage(i)"
              >{{ i }}</a
            >
          </li>
          <li class="page-item">
            <a
              :class="
                'page-link next rounded-circle fw-bold bg-white ' +
                isNextButtonDisabled
              "
              aria-label="Next"
              @click="nextPage"
              ><img class="" src="../assets/images/icon_raquo.svg"
            /></a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    descriptionRequire: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    isPreviousButtonDisabled() {
      return this.currentPage === 1 ? 'disabled' : ''
    },
    isNextButtonDisabled() {
      return this.currentPage === this.pageCount ? 'disabled' : ''
    },
  },

  methods: {
    nextPage() {
      this.$emit('nextPage')
    },
    previousPage() {
      this.$emit('previousPage')
    },
    customPage(value) {
      this.$emit('customPage', value)
    },
  },
}
</script>

<style lang="scss">
@import '../styles/components/_pagination.scss';
</style>
