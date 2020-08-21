<template>
  <div class="note">
    <v-btn
      v-show="treeBtn"
      class="mx-2 tree-btn"
      fab
      @click="treeShow = !treeShow"
    >
      <v-icon v-if="!treeShow" small>mdi-format-list-bulleted-square</v-icon>
      <v-icon v-else small>mdi-close</v-icon>
    </v-btn>
    <v-overlay :z-index="4" :value="treeBtn && treeShow"> </v-overlay>
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
        <div class="markdown-body" v-html="content"></div>
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
      content = marked.render('[toc]\n' + res2.data.content)
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
  created() {
    this.$store.commit('appBar/SET_APP_BAR', { title: this.title })
  },
  mounted() {
    this.Loading = false
    this.treeBtn = window.innerWidth < 1050
    this.treeShow = window.innerWidth > 1050
    if (!this.articleId && this.treeBtn) {
      this.treeShow = true
    }
    this.goHref()
  },
  methods: {
    async getContent() {
      const id = Number(this.active[0])
      if (!id) return
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
      this.content = marked.render('[toc]\n' + res.data.content)
      this.title = res.data.title || ''
      this.$store.commit('appBar/SET_APP_BAR', { title: this.title })
      this.Loading = false
      this.$vuetify.goTo('html')
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
    },
    goHref() {
      const hash = this.$route.hash
      if (hash) {
        const id = decodeURI(hash)
        document.querySelector(id + ' a').click()
      }
    }
  },
  head() {
    return {
      title: `笔记 - ${this.title}`
    }
  }
}
</script>
<style lang="scss">
.note .markdown-viewer .markdown-body nav.table-of-contents {
  width: 255px;
  position: fixed;
  right: 3%;
  background-color: white;
  padding: 5px 15px;
  border-radius: 4px;
  max-height: calc(100vh - 80px);
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  a {
    font-size: 12px;
  }
}
@media screen and (min-width: 320px) and (max-width: 1050px) {
  .note .markdown-viewer .markdown-body nav.table-of-contents {
    position: relative;
    top: 0;
    right: 0;
    width: 100%;
    max-height: inherit;
  }
}
</style>
<style lang="scss" scoped>
// 笔记样式
.note {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .btnclose {
    position: absolute;
    right: 0;
    top: -10px;
  }
  .tree-card {
    position: fixed;
    max-height: calc(100vh - 80px);
    width: 255px;
    z-index: 10;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    .v-btn--fab.v-size--default {
      width: 24px;
      height: 24px;
    }
    .tree-card {
      top: 15%;
      max-height: 80%;
    }
  }
  @media screen and (min-width: 480px) and (max-width: 1050px) {
    .v-btn--fab.v-size--default {
      width: 24px;
      height: 24px;
    }
    .tree-card {
      top: 13%;
      max-height: 80%;
    }
  }
  .tree-btn {
    position: fixed;
    top: auto;
    left: 0;
    z-index: 5;
  }
  .v-treeview i {
    font-style: normal;
  }
  .markdown-viewer {
    width: 100%;
    min-height: 90vh;
    padding: 0 255px;
    .markdown-body {
      margin: 0 auto;
      padding-top: 0;
    }
  }
  @media screen and (min-width: 320px) and (max-width: 1050px) {
    .markdown-viewer {
      margin-left: 0;
      padding: 24px 0;
    }
  }
  @media screen and (min-width: 1050px) {
    .markdown-viewer {
      margin: 0 auto;
    }
    .tree-card {
      left: 3%;
    }
  }
}
</style>
