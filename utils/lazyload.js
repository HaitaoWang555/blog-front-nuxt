let imgs
let onscroll

export function lazyload(images) {
  imgs = images
    ? [].slice.call(images) // Array.from(images)
    : document.querySelectorAll('.lazyload')

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function(entries) {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            loadImage(entry.target, function() {
              observer.unobserve(entry.target)
            })
          }
        })
      },
      { threshold: 0.01 }
    )
    imgs.forEach((img) => observer.observe(img))
  } else {
    onscroll = throttle(function() {
      if (imgs.length === 0) {
        window.removeEventListener('scroll', onscroll)
      }
      imgs = imgs.filter((img) => !img.classList.contains('isLoad'))
      imgs.forEach((img) => inViewport(img) && loadImage(img))
    }, 300)

    window.addEventListener('scroll', onscroll)
    window.dispatchEvent(new Event('scroll'))
  }

  function throttle(func, wait) {
    let prev, timer
    return function fn() {
      const curr = Date.now()
      const diff = curr - prev
      if (!prev || diff >= wait) {
        func()
        prev = curr
      } else if (diff < wait) {
        clearTimeout(timer)
        timer = setTimeout(fn, wait - diff)
      }
    }
  }

  function inViewport(img) {
    const { top, left, right, bottom } = img.getBoundingClientRect()
    const vpWidth = document.documentElement.clientWidth
    const vpHeight = document.documentElement.clientHeight
    return (
      ((top > 0 && top < vpHeight) || (bottom > 0 && bottom < vpHeight)) &&
      ((left > 0 && left < vpWidth) || (right > 0 && right < vpWidth))
    )
  }

  function loadImage(img, callback) {
    const image = new Image()
    image.src = img.dataset.src
    image.onload = function() {
      img.src = image.src
      img.classList.add('isLoad')
      if (typeof callback === 'function') callback()
    }
  }
}

export function remEvent() {
  if (onscroll) window.removeEventListener('scroll', onscroll)
}
