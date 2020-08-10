import marked from 'marked'

// 重写词法解析器
marked.Lexer.prototype.token = function(src, top) {
  src = src.replace(/^ +$/gm, '')
  let next,
    loose,
    cap,
    bull,
    b,
    item,
    listStart,
    listItems,
    t,
    space,
    i,
    l,
    isordered,
    istask,
    ischecked

  while (src) {
    // list
    if ((cap = this.rules.list.exec(src))) {
      src = src.substring(cap[0].length)
      bull = cap[2]
      isordered = bull.length > 1

      listStart = {
        type: 'list_start',
        ordered: isordered,
        start: isordered ? +bull : '',
        loose: false
      }

      this.tokens.push(listStart)

      // Get each top-level item.
      cap = cap[0].match(this.rules.item)

      listItems = []
      next = false
      l = cap.length
      i = 0

      for (; i < l; i++) {
        item = cap[i]

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length
        item = item.replace(/^ *([*+-]|\d+\.) */, '')

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '')
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (i !== l - 1) {
          const bullet = /(?:[*+-]|\d{1,9}\.)/
          b = bullet.exec(cap[i + 1])[0]
          if (
            bull.length > 1
              ? b.length === 1
              : b.length > 1 || (this.options.smartLists && b !== bull)
          ) {
            src = cap.slice(i + 1).join('\n') + src
            i = l - 1
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item)
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n'
          if (!loose) loose = next
        }

        if (loose) {
          listStart.loose = true
        }

        // Check for task list items
        istask = /^\[[ xX]\] /.test(item)
        ischecked = undefined
        if (istask) {
          ischecked = item[1] !== ' '
          item = item.replace(/^\[[ xX]\] +/, '')
        }

        t = {
          type: 'list_item_start',
          task: istask,
          checked: ischecked,
          loose
        }

        listItems.push(t)
        this.tokens.push(t)

        // Recurse.
        this.token(item, false)

        this.tokens.push({
          type: 'list_item_end'
        })
      }

      if (listStart.loose) {
        l = listItems.length
        i = 0
        for (; i < l; i++) {
          listItems[i].loose = true
        }
      }

      this.tokens.push({
        type: 'list_end'
      })

      continue
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0))
    }
  }
  return this.tokens
}

// 重写解析器
marked.Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'list_start': {
      let body = ''
      const ordered = this.token.ordered
      const start = this.token.start

      while (this.next().type !== 'list_end') {
        body += this.tok()
      }

      return this.renderer.list(body, ordered, start)
    }
    case 'list_item_start': {
      let body = ''
      const loose = this.token.loose
      const checked = this.token.checked
      const task = this.token.task

      if (this.token.task) {
        body += this.renderer.checkbox(checked)
      }

      while (this.next().type !== 'list_item_end') {
        body +=
          !loose && this.token.type === 'text' ? this.parseText() : this.tok()
      }
      return this.renderer.listitem(body, task, checked)
    }
    default: {
      const errMsg = 'Token with "' + this.token.type + '" type was not found.'
      if (this.options.silent) {
        // eslint-disable-next-line no-console
        console.log(errMsg)
      } else {
        throw new Error(errMsg)
      }
    }
  }
}

// 新建渲染器
const renderer = new marked.Renderer()

renderer.listitem = (body, task, checked) => {
  let className = ''
  if (task) {
    className = 'task-item'
  }
  if (checked) {
    className = 'task-item checked'
  }
  return `<li class="${className}">${body}</li>\n`
}
marked.setOptions({ renderer })
export default marked
