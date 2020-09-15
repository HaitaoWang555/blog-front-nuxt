<template>
  <div v-if="articleData">
    <Article :data="[articleData]" :model="model" />
    <CommentList class="designWidth" :article-id="articleData.id" />
  </div>
</template>

<script>
import Article from '@/components/Article'
import { article } from '@/api/article'
import CommentList from '@/components/comment/CommentList'

export default {
  name: 'ArticleId',
  components: {
    Article,
    CommentList
  },
  async asyncData({ params, error, payload }) {
    if (payload) {
      return {
        articleData: payload
      }
    } else {
      const res = await article(params)
      return {
        articleData: res ? res.data : ''
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
  created() {
    if (!this.articleData) {
      this.$router.push({ path: '/404' })
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
