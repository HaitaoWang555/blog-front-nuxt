<template>
  <div>
    <Article v-if="articleData" :data="[articleData]" :model="model" />
  </div>
</template>

<script>
import Article from '@/components/Article'
import { article } from '@/api/article'

export default {
  name: 'ArticleId',
  components: {
    Article
  },
  async asyncData({ params, error, payload }) {
    if (payload) {
      return {
        articleData: payload
      }
    } else {
      const res = await article(params)
      if (!res) return
      return {
        articleData: res.data
      }
    }
  },
  data() {
    return {
      articleData: null,
      model: {
        type: 'details'
      }
    }
  },
  head() {
    const title = this.articleData ? this.articleData.title : '无此文章'
    const content = this.articleData
      ? this.articleData.content
          .slice(0, 300)
          .replace(/<[^>]*>|<\/[^>]*>/gm, '')
      : ''
    return {
      title,
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
