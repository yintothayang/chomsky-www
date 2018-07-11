<template lang="pug">
#id
  v-app
    //- v-toolbar
    //-   v-toolbar-side-icon
    //-   v-toolbar-title Title
    //-   v-spacer
    //-   v-toolbar-items.hidden-sm-and-down
    //-     v-btn(flat='') Link One
    //-     v-btn(flat='') Link Two
    //-     v-btn(flat='') Link Three

    left-nav
    top-nav
    router-view
</template>

<script>
import LeftNav from '@/components/LeftNav.vue'
import TopNav from '@/components/TopNav.vue'

export default {
  name: 'app',
  components: {
    LeftNav,
    TopNav
  },
}
</script>


<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  background-color #efefef

</style>
