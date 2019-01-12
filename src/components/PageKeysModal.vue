<template lang="pug">
  v-layout(row='', justify-center='')
    v-dialog(v-model='open', max-width='500px')
      #page-keys-modal
        .header
          span.title Page Keys
          v-btn.add(small color="white" @click="addKey()")
            v-icon(dark color="green") add

        .body
          .keys
            .key(v-for="(key, index) in pageKeys")
              v-text-field(:hide-details="true" v-model="key.name" @change="change(key, index)")
              .action
                v-btn(small color="white" @click="deleteKey(key)")
                  v-icon(dark color="red lighten-1") clear


        v-card-actions
          v-spacer
          v-btn(color='blue' flat='' @click.native='open = ""') Done


</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'PageKeysModal',
  data() {
    return {
      pageKeys: [],
      book: {}
    }
  },
  watch: {
    options: function(newVal, oldVal){
      this.$set(this, "pageKeys", newVal.pageKeys)
      this.$set(this, "book", newVal.book)
      console.log("pageKeys: ", this.pageKeys)

      // console.log(this.pageKeys)
      // console.log(this.book)
    }
  },
  computed: {
    ...mapGetters({
      openModal: 'modals/openModal',
      options: 'modals/options',
      tests: 'tests/tests'
    }),
    open: {
      get(){
        return this.openModal == "PageKeysModal"
      },
      set(value){
        this.setOpenModal()
      }
    }
  },
  methods: {
    ...mapMutations({
      setOpenModal: 'modals/SET_OPEN_MODAL',
    }),
    addKey(){
      const count = this.pageKeys.length
      const key = "key_" + count
      const value = "value_" + count
      this.$set(this.pageKeys, count, {name: key, type: "string"})
      this.book.pages.forEach(page => {
        this.$set(page, count, {name: key, value: ""})
      })
    },
    deleteKey(key){
      const i = this.pageKeys.indexOf(key)
      this.book.pages.forEach(page => {
        this.$delete(page, i)
      })
      this.$delete(this.pageKeys, i)
    },
    change(item, index){
      console.log('change', item)
      console.log('change', index)
      this.book.pages.forEach(page => {
        this.$set(page[index], 'name', item.name)
      })
    }
  },
}
</script>


<style lang="stylus" scoped>
#page-keys-modal
  background white

  .header
    padding 1em 1.5em
    display flex
    align-items center
    justify-content space-between

    .title
      font-weight 500
      font-size 1em

    button
      min-width 0px
      margin 0px

  .body
    .keys
      margin 1em 0em
      display flex
      flex-wrap wrap
      .key
        display flex
        flex-basis 100%
        padding 0em 1em
        margin-bottom .85em
        align-items center

        .v-input
          margin-top 0px
        .action
          margin-left auto

          button
            min-width 0px


</style>
