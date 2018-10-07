<template lang="pug">
#speech-input
  .attempt-container(:class="status")
    span {{attempt}}
    span {{error}}
  .record-button(@click="toggleRecording()")
    v-btn.on(fab dark large color="red" v-if="listening")
      v-icon(dark) mic
    v-btn.off(fab outline dark large color="red" v-else)
      v-icon(dark) mic_none

</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'SpeechInput',
  props: {
    page: {
      default: ()=>{}
    }
  },
  data() {
    return {
      attempt: "",
      error: "",
      listening: false,
      status: []
    }
  },
  watch: {
    dialect: function(value){
      console.log("dialect updated")
      if(this.recognition && this.listening){
        this.recognition.stop()
      }
      this.initRecognition()
    }
  },
  computed: {
    ...mapGetters({
      lang: 'tests/lang',
      dialect: 'tests/dialect',
    })
  },
  methods: {
    ...mapMutations({

    }),
    toggleRecording(){
      console.log('toggleRecording()')
      this.listening ? this.recognition.stop() : this.recognition.start()
    },
    initRecognition(){
      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

      this.recognition = new SpeechRecognition()
      this.recognition.continuous = true
      this.recognition.lang = this.dialect
      this.recognition.interimResults = true
      this.recognition.maxAlternatives = 10

      this.recognition.onstart = this.onstart
      this.recognition.onresult = this.onresult
      this.recognition.onspeechend = this.onspeechend
      this.recognition.onnomatch = this.onnomatch
      this.recognition.onerror = this.onerror
    },
    onstart(event){
      console.log("onstart: ", event)
      this.listening = true
    },
    onresult(event){
      console.log("onresult: ", event)
      var last = event.results.length - 1
      this.attempt = event.results[last][0].transcript
      let results = []
      for(let i=0; i<event.results[last].length; i++){
        results.push(event.results[last][i].transcript)
      }

      this.onAttempt(results)

      this.recognition.stop()
    },
    onspeechend(event){
      console.log('onspeechend: ', event)
      this.recognition.stop()
      this.listening = false
    },
    onnomatch(event){
      console.log('onnomatch: ', event)
      this.listening = false
    },
    onerror(event){
      console.error('onerror: ', event)
      this.error = event.message
      this.listening = false
    },
    onAttempt(answers){
      console.log("onAttempt: ", answers)
      this.status = []
      if(answers.includes(this.page.answer.toLowerCase())){
        this.status = ['success']
        setTimeout(()=>{
          this.$emit('success')
          this.status = []
          this.attempt = ""

          // this.recognition.stop()
          // this.recognition.start()
        }, 400)

      } else {
        this.status = ['fail']
      }
    }
  },
  created(){
    this.initRecognition()
  },
  mounted(){

  }
}
</script>


<style lang="stylus" scoped>
#speech-input
  .attempt-container
    font-size 1.6em
    padding .2em .8em
    background white !important
    box-shadow -1px 3px 2px 1px rgba(0, 0, 0, .1)
    margin-bottom 2em
    display flex
    align-items center
    justify-content center
    min-height 50px

    &.fail
      border 2px solid red

    &.success
      border 2px solid lightgreen

  .record-button
    .on
      animation recording .5s cubic-bezier(.5, .5, 1, 1) infinite alternate

  @keyframes recording
    from
      background #f44336
    to
      background lighten(#f44336, 40%)

</style>
