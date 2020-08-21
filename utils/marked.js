import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js' // https://highlightjs.org/

import taskLists from 'markdown-it-task-lists'
import anchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import uslug from 'uslug'

function uslugify(s) {
  return uslug(s)
}

const md = new MarkdownIt({
  html: false,
  xhtmlOut: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        )
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    )
  }
})
  .use(taskLists, { enabled: false })
  .use(anchor, {
    level: 2,
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '§',
    slugify: uslugify
  })
  .use(markdownItTocDoneRight, { slugify: uslugify, level: 2 })

export default md
