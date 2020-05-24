<template>
  <div class="article">
    <div v-for="(item, index) in data" :key="item.id" class="my-4 designWidth">
      <ArticleHeader :data="item"></ArticleHeader>
      <template v-if="model && model.type === 'details'">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-highlight class="markdown-body" v-html="markdownContent"></div>
      </template>
      <template v-else>
        <div class="markdown-body">
          {{ item.content }}
        </div>
        <v-btn
          :elevation="2"
          color="primary mb-2"
          nuxt
          :to="{ path: '/article/' + item.id }"
        >
          阅读全文
        </v-btn>
        <v-divider
          v-if="index + 1 < data.length"
          :key="'divider' + item.id"
        ></v-divider>
      </template>
    </div>
  </div>
</template>

<script>
import ArticleHeader from '@/components/ArticleHeader'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/github.css'
import { lazyload, remEvent } from '@/utils/lazyload'

export default {
  name: 'Articl',
  components: {
    ArticleHeader
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return null
      }
    },
    model: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      markdownContent: null
    }
  },
  created() {
    if (this.model && this.model.type === 'details') {
      let content = this.data[0].content
      content = content.replace(
        /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
        (match, capture) => {
          return match.replace('src', 'data-src')
        }
      )
      this.markdownContent = content
    }
  },
  mounted() {
    if (this.model && this.model.type === 'details') {
      this.$nextTick(() => {
        const els = document.querySelectorAll('.markdown-body img')
        if (els && els.length > 0) {
          lazyload(els)
        }
      })
    }
  },
  destroyed() {
    remEvent()
  },
  methods: {}
}
</script>
