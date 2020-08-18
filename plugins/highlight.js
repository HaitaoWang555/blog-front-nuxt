import hljs from 'highlight.js'

// export default hljs
export function highlight(el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
}
