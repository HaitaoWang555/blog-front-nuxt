<template>
  <div
    v-if="archive && archive.list && archive.list.length > 0"
    class="archive designWidth"
  >
    <v-timeline>
      <v-timeline-item
        v-for="(item, i) in archive.list"
        :key="i"
        :color="'primary'"
        small
      >
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-bold ${'primary'}--text`"
            v-text="item.dateStr"
          ></span>
        </template>
        <div
          v-for="article in item.article"
          :key="article.id"
          class="py-2 text-xs-center"
        >
          <div>
            <span class="text--secondary">
              {{ article.updatedContentTime | time('{m}-{d}') }}
            </span>
            <nuxt-link
              :to="{ path: '/article/' + article.id }"
              style="width: 100%"
            >
              {{ article.title }}
            </nuxt-link>
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
import { archiveList } from '@/api/archive'

export default {
  name: 'Archive',
  async asyncData(context) {
    const res = await archiveList()
    if (!res) return
    return {
      archive: res.data
    }
  },
  data() {
    return {
      archive: null
    }
  },
  head() {
    const content = []
    for (let index = 0; index < this.archive.list.length; index++) {
      const element = this.archive.list[index]
      const articles = element.article
      for (let j = 0; j < articles.length; j++) {
        const element = articles[j]
        content.push(element.title)
      }
    }
    return {
      title: `归档`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: content.join(',')
        }
      ]
    }
  }
}
</script>
