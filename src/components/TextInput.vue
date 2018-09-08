<template lang="pug">
#text-input(:class="status")
  input(ref="input" type="text" @input="onChange")


</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'TextInput',
  props: {
    page: {
      default: ()=>{}
    }
  },
  data() {
    return {
      focused: true,
      status: []
    }
  },
  computed: {
    ...mapGetters({

    })
  },
  methods: {
    ...mapMutations({

    }),
    onChange(e){
      let attempt = e.target.value
      this.status = []
      if(attempt.toLowerCase() == this.page.answer.toLowerCase()){
        this.status = ['success']
        this.$emit('success')

        setTimeout(()=>{
          this.status = []
          this.$refs.input.value = ""
        }, 100)

      } else if(attempt.length >= this.page.answer.length){
        this.status = ['fail']
      }
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
