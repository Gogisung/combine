<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/">Home</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>contact_mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/login">로그인</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="nickname">
          <v-list-item-action>
            <v-icon>touch_app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/board">게시글 작성</router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>홈페이지 통합 관리자</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(["isLogin", "nickname"]),
  },
  methods: {
    // ...mapActions(["loadUser"]),
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
}
</script>