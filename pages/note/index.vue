<template>
  <div class="note">
    <v-btn
      v-show="treeBtn"
      class="mx-2 tree-btn"
      fab
      @click="treeShow = !treeShow"
    >
      <v-icon small dark>mdi-format-list-bulleted-square</v-icon>
    </v-btn>
    <v-overlay :value="treeBtn && treeShow"></v-overlay>
    <v-card v-show="treeShow" class="tree-card">
      <v-sheet class="pa-4 lighten-2 search">
        <v-text-field
          v-model="search"
          label="Search Company Directory"
          flat
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
        <v-checkbox
          v-model="caseSensitive"
          hide-details
          label="Case sensitive search"
        ></v-checkbox>
      </v-sheet>
      <v-card-text>
        <v-treeview
          dense
          :open.sync="openId"
          :active.sync="active"
          :items="items"
          :search="search"
          :filter="filter"
          activatable
          item-key="id"
          style="width: 300px;"
          open-on-click
          class="note-tree"
        >
          <template v-slot:prepend="{ item, open }">
            <v-icon v-if="!fileIcons(item.name)">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <i v-else :class="fileIcons(item.name)"></i>
          </template>
        </v-treeview>
      </v-card-text>
    </v-card>
    <div class="markdown-viewer">
      <v-skeleton-loader v-if="Loading" class="markdown-body" type="article" />

      <template v-else>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-highlight class="markdown-body" v-html="content"></div>
        <CommentList
          v-if="articleId"
          class="designWidth"
          :article-id="articleId"
        />
      </template>
    </div>
  </div>
</template>

<script>
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/github.css'
import 'file-icons-js/css/style.css'
import FileIcons from 'file-icons-js'
import marked from '@/utils/marked'
import { treeList, getContent } from '@/api/note'
import CommentList from '@/components/comment/CommentList'

export default {
  name: 'Note',
  components: {
    CommentList
  },
  async asyncData(context) {
    const articleId = context.query.aid
    const id = context.query.id
    const oid = context.query.oid
    let PromiseArr, items, content, title
    if (id) {
      PromiseArr = [treeList(), getContent(articleId)]
    } else {
      PromiseArr = [treeList()]
    }
    const resArr = await Promise.all(PromiseArr)
    const res1 = resArr[0]
    const res2 = resArr[1]
    if (res1) items = res1.data.list
    if (res2) {
      content = marked(res2.data.content)
      title = res2.data.title
    }
    return {
      items,
      articleId,
      active: id ? id.split(',') : [],
      openId: oid ? oid.split(',').map((i) => Number(i)) : [],
      content,
      title
    }
  },
  data() {
    return {
      openId: [],
      active: [],
      items: [],
      search: null,
      caseSensitive: false,
      content: '',
      title: '',
      articleId: null,
      Loading: false,
      treeBtn: false,
      treeShow: false
    }
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].includes(search)
        : undefined
    }
  },
  watch: {
    active: 'getContent'
  },
  mounted() {
    this.Loading = false
    this.treeBtn = window.innerWidth < 1050
    this.treeShow = window.innerWidth > 1050
  },
  methods: {
    async getContent() {
      const id = Number(this.active[0])
      this.findArticleId(this.items, id)
      this.Loading = true
      if (this.treeBtn) this.treeShow = false
      const res = await getContent(this.articleId)
      if (!res) {
        this.Loading = false
        return
      }
      this.$router.push({
        path: '/note',
        query: { id, aid: this.articleId, oid: this.openId.join(',') }
      })
      this.content = marked(res.data.content)
      this.title = res.data.title
      this.Loading = false
    },
    findArticleId(arr, id) {
      arr.forEach((element) => {
        if (element.id === id) {
          this.articleId = element.articleId
        }
        if (element.children && element.children.length > 0) {
          this.findArticleId(element.children, id)
        }
      })
    },
    fileIcons(name) {
      return FileIcons.getClass(name)
    }
  },
  head() {
    return {
      title: `笔记 - ${this.title}`
    }
  }
}
</script>
