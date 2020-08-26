<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed disable-resize-watcher app>
      <v-list id="navList">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.path"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-card class="px-2">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
            >
              <v-icon>mdi-brightness-6</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" hide-on-scroll fixed app>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in items" :key="item.path" text nuxt :to="item.path">
          {{ item.name }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <ScrollTop></ScrollTop>
    <v-snackbar
      v-model="snackbar"
      timeout="3000"
      :color="snackbarObj.color"
      top
    >
      {{ snackbarObj.tips }}
    </v-snackbar>
  </v-app>
</template>

<script>
import ScrollTop from '~/components/ScrollTop.vue'

export default {
  components: { ScrollTop },
  data() {
    return {
      clipped: true,
      drawer: false,
      items: [
        { path: '/', name: '首页', icon: 'mdi-home' },
        { path: '/category', name: '分类', icon: 'mdi-folder' },
        { path: '/tag', name: '标签', icon: 'mdi-label' },
        { path: '/note', name: '笔记', icon: 'mdi-label' },
        { path: '/archive', name: '归档', icon: 'mdi-archive' }
      ],
      title: 'Blog',
      snackbar: false
    }
  },
  computed: {
    snackbarObj() {
      return this.$store.state.message.snackbarObj
    },
    appBar() {
      return this.$store.state.appBar.appBar
    }
  },
  watch: {
    snackbarObj: {
      deep: true,
      handler(val) {
        this.snackbar = val.snackbar
      }
    },
    appBar: {
      deep: true,
      handler(val) {
        this.drawer = val.drawer || false
        this.title = val.title || ''
      }
    }
  },
  created() {
    const hour = new Date().getHours()
    if (hour > 19 || hour < 6) {
      this.$vuetify.theme.dark = true
    } else {
      this.$vuetify.theme.dark = false
    }
  }
}
</script>
