<template lang="pug">
v-navigation-drawer#right-nav(v-model="local_open" temporary="" absolute="" right="")
  filter-cards-modal(v-if="form === 'FilterCardsForm'")
</template>

<script>

import FilterCardsModal from '@/components/FilterCardsForm.vue'
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'RightNav',
  components: {
    FilterCardsModal,
  },
  data() {
    return {
      local_open: false
    }
  },
  watch: {
    local_open: function(new_value){
      this.setOpen(new_value)
    },
    open: function(new_value){
      this.local_open = new_value
    },
  },
  computed: {
    ...mapGetters({
      open: 'rightnav/open',
      form: 'rightnav/form',
    }),
  },
  methods: {
    ...mapMutations({
      setOpen: 'rightnav/SET_OPEN'
    })
  }
}
</script>


<style lang="stylus" scoped>
#right-nav
  background rgba(255, 255, 255, .93)
</style>
