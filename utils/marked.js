import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js' // https://highlightjs.org/

import taskLists from 'markdown-it-task-lists'
import anchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
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
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '§'
  })
  .use(markdownItTocDoneRight)

export default md
