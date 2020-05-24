<template>
  <div class="mb-2">
    <Article v-if="articleData && articleData.length > 0" :data="articleData" />
    <w-pagination :page-obj="pageObj" :change-page="changePage" />
  </div>
</template>

<script>
import Article from '~/components/Article'
import WPagination from '~/components/Pagination.vue'
import { articleList } from '~/api/home'

export default {
  name: 'Index',
  components: {
    Article,
    WPagination
  },
  async asyncData(context) {
    const params = {
      page: 1,
      pageSize: 15
    }
    const res = await articleList(params)
    if (!res) return
    return {
      articleData: res.data.items,
      pageObj: {
        page: 1,
        pageSize: 15,
        total: res.data.total || null
      }
    }
  },
  data() {
    return {
      articleData: null,
      pageObj: {}
    }
  },
  methods: {
    async changePage(val) {
      const page = this.pageObj.page
      const params = {
        page,
        pageSize: 15
      }
      const res = await articleList(params)
      if (!res) return

      this.articleData = res.data.items
      this.pageObj.total = res.data.total
      const timer = setTimeout(() => {
        this.$vuetify.goTo('html')
        clearTimeout(timer)
      }, 10)
    }
  },
  head() {
    return { title: `首页` }
  }
}
</script>
