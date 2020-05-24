<template>
  <div class="archive designWidth">
    <v-timeline>
      <v-timeline-item
        v-for="(item, i) in archive.items"
        :key="i"
        :color="item.color || 'primary'"
        small
      >
        <template v-slot:opposite>
          <span
            :class="
              `headline font-weight-bold ${item.color || 'primary'}--text`
            "
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
              {{ article.updatedAt | time('{m}-{d}') }}
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
    return { title: `归档` }
  }
}
</script>
