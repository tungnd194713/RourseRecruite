<template>
  <nav v-if="totalItems > perPage" class="border-0 nav-paginate">
    <ul class="pagination justify-content-end">
      <li class="page-item">
        <a :class="'btn btn-md page-link ' + isPreviousButtonDisabled"
           aria-label="Previous"
           @click="previousPage"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="i in pageCount" :key="i" class="page-item">
        <a :class="'btn btn-md page-link'" @click="customPage(i)">{{i}}</a>
      </li>
      <li class="page-item">
        <a :class="'btn btn-md page-link ' + isNextButtonDisabled"
           aria-label="Next"
           @click="nextPage"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
    export default {
      name: "Pagination",

      props: {
        currentPage: {
          type: Number,
          required: true
        },
        perPage: {
          type: Number,
          required: true
        },
        totalItems: {
          type: Number,
          required: true
        },
        pageCount: {
          type: Number,
          required: true
        }
      },

      computed: {
        isPreviousButtonDisabled() {
          return this.currentPage === 1 ? 'disabled' : '';
        },
        isNextButtonDisabled() {
          return this.currentPage === this.pageCount ? 'disabled' : '';
        }
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
      }
    }
</script>

<style lang="scss">
  @import '../styles/components/_pagination.scss';
</style>
