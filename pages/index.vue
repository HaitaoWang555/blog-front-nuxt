<template>
  <div v-if="articleData && articleData.length > 0" class="mb-2">
    <Article :data="articleData" />
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
      articleData: res.data.list,
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

      this.articleData = res.data.list
      this.pageObj.total = res.data.total
      const timer = setTimeout(() => {
        this.$vuetify.goTo('html')
        clearTimeout(timer)
      }, 10)
    }
  },
  head() {
    const content = this.articleData.map((i) => i.title).join(',')
    return {
      title: `首页`,
      meta: [
        {
          hid: 'description1',
          name: 'description',
          content
        }
      ]
    }
  }
}
</script>
