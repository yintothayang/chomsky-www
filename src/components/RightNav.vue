<template lang="pug">
v-navigation-drawer#right-nav(v-model="local_open" temporary="" absolute="" right="")
  filter-cards-form(v-if="form === 'FilterCardsForm'")
  filter-decks-form(v-if="form === 'FilterDecksForm'")
  game-settings-form(v-if="form === 'GameSettingsForm'")
</template>

<script>

import FilterCardsForm from '@/components/FilterCardsForm.vue'
import FilterDecksForm from '@/components/FilterDecksForm.vue'
import GameSettingsForm from '@/components/GameSettingsForm.vue'
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'RightNav',
  components: {
    FilterCardsForm,
    FilterDecksForm,
    GameSettingsForm,
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
