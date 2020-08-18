<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      disable-resize-watcher
      app
    >
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
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
      fixed: true,
      items: [
        { path: '/', name: '首页', icon: 'mdi-home' },
        { path: '/category', name: '分类', icon: 'mdi-folder' },
        { path: '/tag', name: '标签', icon: 'mdi-label' },
        { path: '/note', name: '笔记', icon: 'mdi-label' },
        { path: '/archive', name: '归档', icon: 'mdi-archive' }
      ],
      miniVariant: false,
      title: 'Blog',
      snackbar: false
    }
  },
  computed: {
    snackbarObj() {
      return this.$store.state.message.snackbarObj
    }
  },
  watch: {
    snackbarObj: {
      deep: true,
      handler(val) {
        this.snackbar = val.snackbar
      }
    }
  },
  created() {
    if (new Date().getHours() > 20) {
      this.$vuetify.theme.dark = true
    } else {
      this.$vuetify.theme.dark = false
    }
  }
}
</script>
