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
      autoStart: 'tests/autoStart',
    })
  },
  methods: {
    ...mapMutations({

    }),
    toggleRecording(){
      console.log('toggleRecording()')
      if(this.listening){
        this.recognition.stop()
      } else {
        this.recognition.start()
      }
    },
    initRecognition(){
      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

      this.recognition = new SpeechRecognition()
      this.recognition.continuous = true
      this.recognition.lang = this.dialect
      this.recognition.interimResults = false
      this.recognition.maxAlternatives = 10

      this.recognition.onstart = this.onstart
      this.recognition.onresult = this.onresult
      this.recognition.onspeechend = this.onspeechend
      this.recognition.onnomatch = this.onnomatch
      this.recognition.onerror = this.onerror
      this.recognition.onend = this.onend
    },
    onstart(event){
      console.log("onstart: ", event)
      this.listening = true
    },
    onresult(event){
      console.log("onresult: ", event)
      var last = event.results.length - 1
      let results = []
      for(let i=0; i<event.results[last].length; i++){
        results.push(event.results[last][i].transcript)
      }
      this.onAttempt(results)
      // this.recognition.stop()
      // this.listening = false
    },
    onspeechend(event){
      // console.log('onspeechend: ', event)
      // this.recognition.stop()
      // this.listening = false
    },
    onnomatch(event){
      console.log('onnomatch: ', event)
    },
    onerror(event){
      console.error('onerror: ', event)
      this.error = event.message
    },
    onend(event){
      console.log("onend")
      this.listening = false
    },
    onAttempt(attempts){
      console.log("onAttempt: ", attempts)
      this.status = []
      attempts = attempts.map(a => a.toLowerCase())
      let i = attempts.indexOf(this.page.back.answer.toLowerCase())
      if(i > -1){
        this.status = ['success']
        this.attempt = attempts[i]
        setTimeout(()=>{
          this.$emit('success')
          this.status = []
          this.attempt = ""
        }, 400)

      } else {
        this.attempt = attempts[0]
        this.status = ['fail']
      }

      if(this.autoStart && !this.listening){
        console.log(this.recognition)
        this.recognition.start()
        this.listening = true
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
