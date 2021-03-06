<template>
  <div>
    <h2 class="comments-header">留言（{{ items.length }}条）</h2>
    <div class="comments-content">
      <template v-for="(item, index) in items">
        <div :id="'comment-list-' + item.id" :key="index" class="comment">
          <div class="comment-header">
            <span v-if="!item.link">{{ item.username }} 说：</span>
            <span v-else
              ><a :href="item.link" target="_blank">{{ item.username }}</a>
              说：</span
            >
          </div>
          <!-- eslint-disable vue/no-v-html -->
          <div
            class="comment-content markdown-body"
            v-html="marked(item)"
          ></div>
          <div class="comment-footer">
            <span class="date">
              {{ item.createTime | time('{y}-{m}-{d} {h}:{i}') }}
            </span>

            <v-divider class="mx-2 grey lighten-2" vertical></v-divider>
            <span>
              <a :href="'#comment-list-' + item.id">#</a>
            </span>
            <v-divider class="mx-2 grey lighten-2" vertical></v-divider>

            <span @click="quote(item)">
              <a href="#comment-textarea">引用</a>
            </span>
          </div>
        </div>
        <v-divider
          v-if="index + 1 < items.length"
          :key="'divider' + index"
        ></v-divider>
      </template>
    </div>

    <CommentForm
      :article-id="articleId"
      :quote="quoteData"
      @setNewList="setNewList"
    />
  </div>
</template>

<script>
import DOMPurify from 'dompurify'
import CommentForm from './CommentFrom'
import { commentList } from '@/api/comment'
import marked from '@/utils/marked'

export default {
  name: 'CommentList',
  components: {
    CommentForm
  },
  props: {
    articleId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      items: [],
      quoteData: null
    }
  },
  watch: {
    articleId: {
      deep: true,
      handler(val) {
        if (val) this.init()
      }
    }
  },
  mounted() {
    if (this.articleId) {
      this.init()
    }
  },
  methods: {
    async init() {
      const res = await commentList(this.articleId)
      if (!res) return
      this.items = res.data
    },
    setNewList(data) {
      this.items.push(data)
    },
    marked(item) {
      const val = item.quoteContent
        ? item.quoteContent + item.content
        : item.content
      return DOMPurify.sanitize(marked.render(val))
    },
    quote(item) {
      this.quoteData = JSON.parse(JSON.stringify(item))
    }
  }
}
</script>

<style scoped>
.markdown-body {
  padding: 10px 0;
}
.comments-header {
  padding-top: 2em;
  margin: 0.4em 0 0.2em 0;
  padding: 0 0 0.2em 0;
  font-weight: 500;
  letter-spacing: -0.03em;
  border-bottom: 1px solid #d3d3d3;
  font-size: 2.88em;
  line-height: 1.35em;
}
.comment {
  padding: 10px 16px;
}
.comment .comment-header {
  font-weight: 700;
  font-size: 1.6em;
}
.comment .comment-footer {
  font-size: 12px;
  font-weight: 100;
  display: flex;
  justify-content: flex-end;
  align-content: center;
}
</style>
