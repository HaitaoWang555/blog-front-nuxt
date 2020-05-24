<template>
  <div v-if="data" class="articleHeader">
    <div class="display-1 font-weight-medium">
      <nuxt-link :to="{ path: '/article/' + data.id }">{{
        data.title
      }}</nuxt-link>
    </div>
    <v-layout wrap align-center justify-start class="py-2">
      <template v-if="data.category">
        <span
          v-for="(item, index) in data.category.split(',')"
          :key="index"
          class="pr-2 pointer flex-between-center"
        >
          <v-icon class="pr-1">mdi-folder</v-icon>
          <nuxt-link :to="{ path: '/category/' }">{{ item }}</nuxt-link>
        </span>
      </template>
      <span class="px-2">
        <v-icon>mdi-calendar-range</v-icon>
        {{ data.updatedAt | time('{y}-{m}-{d}') }}
      </span>
      <span class="px-2">
        <v-icon>mdi-eye</v-icon>
        {{ data.hits || 0 }}
      </span>
      <span class="px-2">
        <v-icon>mdi-message-reply</v-icon>
        {{ data.commentCount || 0 }}
      </span>
    </v-layout>
    <v-layout v-if="data.tags" align-start justify-start row wrap="true">
      <v-chip
        v-for="(item, index) in data.tags.split(',')"
        :key="index"
        small
        outlined
        color="primary"
        class="pointer px-6 mx-3"
      >
        <span class="pointer">
          <nuxt-link :to="{ path: '/tag/' }">{{ item }}</nuxt-link>
        </span>
      </v-chip>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'ArticleHeader',
  props: {
    data: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  methods: {
    clickTag(item, type) {
      if (type === 'category') {
        // this.$router.push({ path: '/category/' + item })
      } else {
        // this.$router.push({ path: '/tag/' + item })
      }
    }
  }
}
</script>
