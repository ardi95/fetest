<template>
  <div>
    <!--Sidebar-->
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-if="!loading">{{
            dataFetch && dataFetch.user.name
          }}</v-list-item-title>

          <v-list-item-title v-if="loading"> Loading... </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list rounded>
        <!--MENU HOME-->
        <v-list-item link to="/home">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-group prepend-icon="mdi-cogs">
          <template v-slot:activator>
            <v-list-item-title>App Management</v-list-item-title>
          </template>
          <v-list-item link to="/app-management/users">
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <!--Toolbar-->
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Label Grosir</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text color="white" @click="logout">
        <i class="fas fa-sign-out-alt"></i> Logout
      </v-btn>
    </v-app-bar>

    <v-main class="customP">
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'

import { profile, logout } from '@/service/auth'

export default {
  data: () => ({
    loading: false,
    drawer: null,
    dataFetch: null,
  }),
  created() {
    //console.log(this.$route);
    this.loading = true

    profile()
      .then(({ data }) => {
        this.dataFetch = data
      })
      .catch((err) => {})
      .finally(() => {
        this.loading = false
      })
    //const token = VueCookies.get('token')
    //if (token) {
    //}
  },
  methods: {
    logout() {
      logout()
        .then(() => {
          this.$store.dispatch('logout')
        })
        .catch((err) => {})
    },
  },
}
</script>
