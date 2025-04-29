<template lang="pug">
.qkb-msg-bubble-component.qkb-msg-bubble-component--single-text
  .qkb-msg-bubble-component__text
    | {{ mainData.text }}
    button.qkb-msg-bubble-play-btn(v-if="mainData.agent === 'bot'" @click="playAudio" :disabled="isPlaying" style="margin-left:8px; background:none; border:none; cursor:pointer;")
      span(v-if="!isPlaying") ▶️
      span(v-else) ⏸️
</template>
<script>
export default {
  props: {
    mainData: {
      type: Object
    }
  },
  data () {
    return {
      isPlaying: false,
      audio: null
    }
  },
  methods: {
    async playAudio () {
      const cacheKey = this.mainData.text
      if (!window._audioCache) window._audioCache = {}
      if (this.isPlaying) {
        if (this.audio) this.audio.pause()
        this.isPlaying = false
        return
      }
      this.isPlaying = true
      try {
        let blob
        if (window._audioCache[cacheKey]) {
          blob = window._audioCache[cacheKey]
        } else {
          const response = await fetch('https://api-aitext2speech.hayokmedicare.ng/api/text-to-speech/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: this.mainData.text })
          })
          if (!response.ok) throw new Error('TTS failed')
          blob = await response.blob()
          window._audioCache[cacheKey] = blob
        }
        const url = URL.createObjectURL(blob)
        this.audio = new Audio(url)
        this.audio.onended = () => {
          this.isPlaying = false
          URL.revokeObjectURL(url)
        }
        this.audio.onerror = () => {
          this.isPlaying = false
          URL.revokeObjectURL(url)
        }
        this.audio.play()
      } catch (e) {
        this.isPlaying = false
        console.error('Text-to-speech failed', e)
      }
    }
  }
}
</script>
