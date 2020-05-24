<template>
  <div>
    <Article :data="[articleData]" :model="model" />
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
  async asyncData(context) {
    const params = context.params
    const res = await article(params)
    if (!res) return
    return {
      articleData: res.data
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
    return { title: `${this.articleData.title}` }
  }
}
</script>
