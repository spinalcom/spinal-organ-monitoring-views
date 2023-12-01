<template>
  <div id="app">
    
    <Navbar v-if="!isLoginRoute"></Navbar>
    <Validation></Validation>
    <router-view id="content" />
  </div>
</template>

<script>
import Navbar from "./views/SideBar.vue";
import Validation from "./Components/ValidationBar.vue"
export default {
  name: 'App',
  components: {
    Navbar,
    Validation
  },
  methods: {
    
  },
  computed: {
    isLoginRoute() {
      return this.$route.path === '/Login' ||  this.$route.path === '/login';
    },
  },

}
</script>

<style>
#app {
  overflow-x: scroll;
}

#content {
  margin-top: 80px;
  padding: 10px;
}
</style>
