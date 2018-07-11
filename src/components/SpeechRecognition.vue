<template lang="pug">
  #record-button(@click="toggleRecording()")
    v-btn.on(fab dark large color="red" v-if="recording")
      v-icon(dark) mic
    v-btn.off(fab outline dark large color="red" v-else)
      v-icon(dark) mic_none


</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'TopNav',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      title: 'navbar/title',
    })
  },
  methods: {
    ...mapMutations({
      toggleLeftNav: 'leftnav/TOGGLE_OPEN'
    }),
    toggleRecording(){
      this.recognition.start()
      console.log('Ready to receive a color command.');
    },
    initRecognition(){
      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
      var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
      var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

      var grammar = '#JSGF V1.grammar;'

      this.recognition = new SpeechRecognition()
      // var speechRecognitionList = new SpeechGrammarList()
      // speechRecognitionList.addFromString(grammar, 1)
      // this.recognition.grammars = speechRecognitionList

      this.recognition.continuous = true
      this.recognition.lang = 'en-US'
      this.recognition.interimResults = false
      this.recognition.maxAlternatives = 1

      this.recognition.onstart = this.onstart
      this.recognition.onresult = this.onresult
      this.recognition.onspeechend = this.onspeechend
      this.recognition.onnomatch = this.onnomatch
      this.recognition.onerror = this.onerror
    },
    onstart(event){
      console.log("onstart: ", event)
      this.recording = true
    },
    onresult(event){
      var last = event.results.length - 1;
      var color = event.results[last][0].transcript;
      console.log("onresult: ", event)
      console.log('Confidence: ' + event.results[0][0].confidence);
    },
    onspeechend(event){
      console.log('onspeechend: ', event)
      this.recognition.stop()
      this.recording = false
    },
    onnomatch(event){
      console.log('onnomatch: ', event)
    },
    onerror(event){
      console.error('onerror: ', event)
    }
  },
  created(){
    this.initRecognition()
  }
}
</script>


<style lang="stylus" scoped>
  #record-button
    position absolute
    top 85%
    left 92%
    .on
      animation blinker .5s cubic-bezier(.5, .5, 1, 1) infinite alternate

@keyframes blinker
  from
    background #f44336
  to
    background lighten(#f44336, 40%)
</style>
