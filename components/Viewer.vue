<template>
  <div>
    <div :id="id" class="markdown-body" />
  </div>
</template>

<script>
// deps for editor
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/github.css'
import { highlight } from '@/plugins/highlight'
let Viewer
if (process.client) {
  Viewer = require('@toast-ui/editor/dist/toastui-editor-viewer')
}
export default {
  name: 'MarddownEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: false,
      default() {
        return 'markdown-viewer'
      }
    },
    mode: {
      type: String,
      default: 'markdown'
    },
    height: {
      type: String,
      required: false,
      default: '300px'
    },
    language: {
      type: String,
      required: false,
      default: 'zh-CN'
    }
  },
  data() {
    return {
      viewer: null
    }
  },
  watch: {
    value(newValue, preValue) {
      this.setValue(newValue)
    },
    language(val) {
      this.destroyEditor()
      this.initEditor()
    },
    height(newValue) {
      this.viewer.height(newValue)
    },
    mode(newValue) {
      this.viewer.changeMode(newValue)
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    this.destroy()
  },
  methods: {
    init() {
      this.viewer = new Viewer({
        el: document.getElementById(this.id),
        height: this.height
      })
      if (this.value) {
        this.setValue(this.value)
        this.goTop()
      }
    },
    destroy() {
      if (!this.viewer) return
      this.viewer.remove()
    },
    setValue(value) {
      this.viewer.setMarkdown(value)
      highlight(document.getElementById(this.id))
      this.goTop()
    },
    getValue() {
      return this.viewer.getMarkdown()
    },
    setHtml(value) {
      this.viewer.setHtml(value)
    },
    getHtml() {
      return this.viewer.getHtml()
    },
    goTop() {
      this.$vuetify.goTo('html')
    }
  }
}
</script>
