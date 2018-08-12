<template lang="pug">
#text-input(:class="status")
  input(v-model="attempt" ref="input" type="text")


</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'TextInput',
  props: {
    card: {
      default: ()=>{}
    }
  },
  data() {
    return {
      attempt: "",
      focused: true,
      status: []
    }
  },
  watch: {
    attempt: function(value){
      this.status = []
      if(value.toLowerCase() == this.card.back){
        this.status = ['success']
        this.$emit('success')

        setTimeout(()=>{
          this.status = []
          this.attempt = ""
        }, 100)

      } else if(value.length >= this.card.back.length){
        this.status = ['fail']
      }

    }
  },
  computed: {
    ...mapGetters({

    })
  },
  methods: {
    ...mapMutations({

    }),

    onAttempt(attempt){

    }
  },
  created(){

  },
  mounted(){
    this.$refs.input.focus()
  }
}
</script>


<style lang="stylus" scoped>
#text-input
  display flex
  padding .5em 1em
  background white !important
  box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
  font-weight 500
  font-size 1.5em
  border 2px solid white

  input
    &:focus
      border none
      outline none

  &.fail
    border 2px solid red

  &.success
    border 2px solid lightgreen




</style>
