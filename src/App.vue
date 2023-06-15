<template>
  <v-app id="inspire">
    <no-core
      v-if="
        $route.matched.length &&
        $route.matched[0].meta.coreSystem === 'NoCore'
      "
    ></no-core>
    <core-system
      v-if="
        $route.matched.length &&
        $route.matched[0].meta.coreSystem === 'CoreSystem'
      "
    ></core-system>
  </v-app>
</template>

<script>
import VueCookies from 'vue-cookies'

import CoreSystem from '@/components/CoreSystem'
import NoCore from '@/components/NoCore'

import { profile, logout } from '@/service/auth'

export default {
  components: {
    NoCore,
    CoreSystem,
  },
  data: () => ({
    drawer: null,
    dataFetch: null,
  }),
  created() {
    //console.log(this.$route);
    const token = VueCookies.get('token')
    if (token) {
      profile()
        .then(({ data }) => {
          this.dataFetch = data
        })
        .catch((err) => {})
    }
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

<style lang="scss">
p {
  font-size: 14px;
}
</style>
