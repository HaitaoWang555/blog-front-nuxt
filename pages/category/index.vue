<template>
  <div class="text-xs-center designWidth">
    <div class="elevation-wrap elevation-8 py-2">
      <v-badge
        v-for="(item, index) in data"
        :key="index"
        class="my-2 mx-3"
        color="cyan"
        overlap
      >
        <v-chip
          :color="item.color || 'primary'"
          :text-color="item.textColor || 'white'"
          :class="{
            'elevation-10': item.name === active,
            pointer: true,
            'px-6': true
          }"
          @click="clickTag(item)"
        >
          <span class="pointer">{{ item.name }}</span>
        </v-chip>
        <template v-slot:badge>
          <span>{{ item.articles.length }}</span>
        </template>
      </v-badge>
    </div>
    <Content :content="articles" :title="active" />
  </div>
</template>

<script>
import Content from '@/components/Content'
import { categoryArticleList } from '@/api/category'

export default {
  name: 'Tag',
  components: {
    Content
  },
  async asyncData(context) {
    const tag = context.query.v || null
    const res = await categoryArticleList()
    if (!res) return
    const data = res.data
    let item = tag ? data.find((i) => i.name === tag) : data[0]
    if (!item) item = { name: '未知分类', articles: null }
    return {
      data,
      articles: item.articles,
      active: item.name
    }
  },
  data() {
    return {
      data: null,
      articles: null,
      active: null
    }
  },
  mounted() {
    if (this.active) {
      document.querySelector("#navList a[href='/category']").click()
    }
  },
  methods: {
    clickTag(item) {
      this.active = item.name
      this.articles = item.articles
    }
  },
  head() {
    const content1 = []
    const content2 = []
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index]
      content1.push(element.name)
      const articles = element.articles
      for (let j = 0; j < articles.length; j++) {
        const element = articles[j]
        content2.push(element.title)
      }
    }
    return {
      title: `分类`,
      meta: [
        {
          hid: 'description1',
          name: 'description',
          content: content1.join(',')
        },
        {
          hid: 'description2',
          name: 'description',
          content: content2.join(',')
        }
      ]
    }
  }
}
</script>
