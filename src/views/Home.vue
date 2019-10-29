<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <pre>Я есть Грут!</pre>
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <ul class="super-block">
      <li v-for="(el, i) in getData()" :key="i">
        <div>{{el.first_name}} {{el.last_name}}</div>
        <div>{{el.email}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    ...mapActions('home', {
      fetchData: 'fetchData'
    }),
    ...mapGetters('home', {
      getData: 'getData'
    })
  },
  serverPrefetch () {
    // return this.fetchData()
  },

  beforeMount () {
    if (this.getData().length === 0) {
      this.fetchData()
        .catch(() => {})
    }
  }
}
</script>
