<template lang="pug">
#game-page
  h1 game page
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'GamePage',
  data() {
    return {

    }
  },
  methods: {
    ...mapActions({

    }),
  },
  created(){

  }
}
</script>


<style lang="stylus">
#game-page
  height 100%

</style>
