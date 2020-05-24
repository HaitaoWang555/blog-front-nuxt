<template>
  <div class="content elevation-8 mt-4">
    <v-list flat>
      <v-subheader class="headline">{{ title }}</v-subheader>
      <v-list-item-group color="primary">
        <div v-for="(item, i) in content" :key="i">
          <v-list-item>
            <nuxt-link
              :to="{ path: '/article/' + item.id }"
              style="width: 100%;text-decoration: none;"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </nuxt-link>
          </v-list-item>
          <v-divider
            v-if="i + 1 < content.length"
            :key="'divider' + item.id"
          ></v-divider>
        </div>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    content: {
      type: Array,
      default: () => {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
