<template lang="pug">
#tests-page
  .test-list(v-if="tests.length && !loading")
    .test-container(v-for="test in tests")
      .test
        span.name {{test.name}}

        .test-actions-container
          router-link(:to="{name: 'test', params: {id: test.id}}" tag="div")
            v-btn(color="green" flat="") Play

  .empty(v-if="!tests.length && !loading")
    span.none No Tests Found
    v-btn(color="info" @click="$router.push({name: 'edit-test', params: {id: 'new'}})" large) Create a Book
    span.or or
    v-btn(color="info" @click="$router.push({name: 'library'})" large) Visit Library

  .actions-container
    .item.add-test
      v-btn.on(small fab dark color="blue lighten-1" slot="activator" @click="setOpenModal('NewTestModal')")
        v-icon(dark) add

    .item.upload-test
      input(type="file" id="input" ref="fileUpload" multiple @change="onFilesUploaded()")
      v-tooltip(left)
        v-btn.on(small fab dark color="purple lighten-1" slot="activator" @click="upload()")
          v-icon(dark) cloud_upload
        span Upload a Test

  v-progress-circular.loading(:size="120" :width="10" color="blue" indeterminate v-if="loading")
</template>

<script>

import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'TestsPage',
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      activeUser: 'users/activeUser',
      tests: 'tests/usersTests',
      tests: 'tests/tests',
    }),
  },
  methods: {
    ...mapActions({
      fetchTests: 'tests/fetchTests',
    }),
    ...mapMutations({
      setNavbarTitle: 'navbar/SET_TITLE',
      setOpenModal: 'modals/SET_OPEN_MODAL',
      setModalOptions: 'modals/SET_OPTIONS',
    }),
  },
  async created(){
    this.setNavbarTitle("Tests")
    this.loading = true
    !this.tests.length ? await this.fetchTests() : void(0)
    this.loading = false
  }
}
</script>


<style lang="stylus" scoped>
#tests-page
  .test-list
    overflow-y auto
    padding 1em
    height 90%

    .test-container
      padding .2em 0em

      .test
        display flex
        padding 1em 2em .5em 2em
        margin-bottom .5em
        cursor pointer
        transition all .1s
        background white
        box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
        user-select none
        flex-wrap wrap

        .name
          font-size 1.4em
          font-weight 600
          flex-basis 100%
          text-align left
        .card-count
          font-size 1em
          font-weight 500
          flex-basis 100%
          text-align left

        .test-actions-container
          display flex
          justify-content flex-end
          align-items center
          flex-basis 100%

          button
            margin 0px
            padding 0px

  .empty
    padding 5em 1em
    display flex
    flex-wrap wrap
    align-items center
    justify-content center

    span.none
      font-weight 600
      font-size 1.8em
      flex-basis 100%
      margin-bottom 2em
      color rgba(0, 0, 0, .6)
    span.or
      flex-basis 100%
      font-weight 600
      font-size 1.2em

  .actions-container
    display flex
    position absolute
    top 90%
    width 100%

    .item
      flex-basis 100%
      margin-bottom .5em

    .upload-test
      input
        display none

  .loading
    margin-top 8em
</style>
