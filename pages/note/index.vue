<template>
  <div class="note">
    <v-card class="tree-card">
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
            <v-icon v-if="!FileIcons.getClass(item.name)">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <i v-else :class="FileIcons.getClass(item.name)"></i>
          </template>
        </v-treeview>
      </v-card-text>
    </v-card>
    <v-skeleton-loader
      v-if="isNoClient"
      class="markdown-viewer"
      type="article"
    />
    <div v-if="isNoClient" class="simulationSsr">{{ content }}</div>
    <Viewer v-else class="markdown-viewer" :value="content" />
  </div>
</template>

<script>
import 'file-icons-js/css/style.css'
import FileIcons from 'file-icons-js'
import { treeList, getContent } from '@/api/note'
import Viewer from '@/components/Viewer'

export default {
  name: 'Note',
  components: { Viewer },
  async asyncData(context) {
    const articleId = context.query.aid
    const id = context.query.id
    const oid = context.query.oid
    let PromiseArr, items, content
    if (id) {
      PromiseArr = [treeList(), getContent(articleId)]
    } else {
      PromiseArr = [treeList()]
    }
    const resArr = await Promise.all(PromiseArr)
    const res1 = resArr[0]
    const res2 = resArr[1]
    if (res1) items = res1.data.list
    if (res2) content = res2.data.content
    return {
      items,
      articleId,
      active: id ? id.split(',') : [],
      openId: oid ? oid.split(',').map((i) => Number(i)) : [],
      content
    }
  },
  data() {
    return {
      openId: [],
      active: [],
      items: [],
      FileIcons,
      search: null,
      caseSensitive: false,
      content: '',
      articleId: null,
      isNoClient: true
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
    this.isNoClient = false
  },
  methods: {
    async getContent() {
      const id = Number(this.active[0])
      this.findArticleId(this.items, id)
      this.isNoClient = true
      const res = await getContent(this.articleId)
      if (!res) {
        this.isNoClient = false
        return
      }
      this.$router.push({
        path: '/note',
        query: { id, aid: this.articleId, oid: this.openId.join(',') }
      })
      this.content = res.data.content
      this.isNoClient = false
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
    }
  }
}
</script>
