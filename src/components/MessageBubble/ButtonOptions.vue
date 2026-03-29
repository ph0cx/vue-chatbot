<template>
  <div class="qkb-msg-bubble-component qkb-msg-bubble-component--button-options">
    <div class="qkb-msg-bubble-component__text">
      {{ mainData.text }}
      <button
        class="qkb-msg-bubble-play-btn"
        :disabled="isPlayingMain"
        style="margin-left: 8px; background: none; border: none; cursor: pointer;"
        @click="playAllText"
      >
        <span v-if="!isPlayingMain">▶️</span>
        <span v-else>⏸️</span>
      </button>
    </div>
    <div class="qkb-msg-bubble-component__options-wrapper">
      <div
        v-for="(item, index) in mainData.options"
        :key="index"
        class="qkb-mb-button-options__item"
        :class="{ active: selectedItem === item.value }"
      >
        <button
          v-if="item.action === 'postback'"
          class="qkb-mb-button-options__btn"
          @click="selectOption(item)"
        >
          <span>{{ item.text }}</span>
        </button>
        <a
          v-else
          class="qkb-mb-button-options__btn qkb-mb-button-options__url"
          target="_blank"
          :href="item.value"
        >
          <span>{{ item.text }}</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from '../../helpers/event-bus'

export default {
  props: {
    mainData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      selectedItem: null,
      isPlayingMain: false,
      isPlayingOption: null,
      audio: null
    }
  },
  methods: {
    selectOption (value) {
      this.selectedItem = value
      EventBus.emit('select-button-option', value)
    },
    async playAllText () {
      if (this.isPlayingMain) {
        if (this.audio) this.audio.pause()
        this.isPlayingMain = false
        return
      }
      this.isPlayingMain = true
      // Gather all texts: main + options
      const texts = [this.mainData.text, ...(this.mainData.options ? this.mainData.options.map(opt => opt.text) : [])]
      try {
        for (let i = 0; i < texts.length; i++) {
          const text = texts[i]
          const cacheKey = text
          if (!window._audioCache) window._audioCache = {}
          let blob
          if (window._audioCache[cacheKey]) {
            blob = window._audioCache[cacheKey]
          } else {
            const response = await fetch('https://api-aitext2speech.hayokmedicare.ng/api/text-to-speech/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text })
            })
            if (!response.ok) throw new Error('TTS failed')
            blob = await response.blob()
            window._audioCache[cacheKey] = blob
          }
          const url = URL.createObjectURL(blob)
          this.audio = new Audio(url)
          await new Promise((resolve) => {
            this.audio.onended = () => {
              URL.revokeObjectURL(url)
              resolve()
            }
            this.audio.onerror = () => {
              URL.revokeObjectURL(url)
              resolve()
            }
            this.audio.play()
          })
          if (!this.isPlayingMain) break // If user paused
        }
      } catch (e) {
        // Optionally alert or log
        console.error('Text-to-speech failed', e)
      }
      this.isPlayingMain = false
    }
  }
}
</script>
