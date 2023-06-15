import Vue from "vue";

import axios from "axios";
import router from "@/router";
import VueCookies from "vue-cookies";

const state = {
};

const getters = {
};

const mutations = {};

const actions = {
  logout() {
    VueCookies.remove("token");
    router.replace("/");
  },
  alertBad({ commit }, message) {
    console.log(message);
    //alert(message);
    Vue.swal({
      icon: "error",
      title: "Oops...",
      text: message,
      confirmButtonText: "Ok",
      confirmButtonColor: "#007bff",
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
