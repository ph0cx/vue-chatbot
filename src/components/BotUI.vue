<template lang="pug">
.qkb-bot-ui(
  :class="uiClasses"
)
  transition(name="qkb-fadeUp")
    .qkb-board(v-if="botActive")
      BoardHeader(
        :bot-title="optionsMain.botTitle",
        @close-bot="botToggle"
      )
        template(v-slot:header)
          slot(name="header")
      BoardContent(
        :bot-typing="botTyping",
        :main-data="messages"
      )
        template(v-slot:botTyping)
          slot(name="botTyping")
      BoardAction(
        ref="boardAction"
        :input-disable="inputDisable",
        :input-placeholder="optionsMain.inputPlaceholder",
        :input-disable-placeholder="optionsMain.inputDisablePlaceholder",
        :show-mic-button="optionsMain.showMicButton"
        @msg-send="sendMessage",
        @mic-state="handleMicState"
      )
        template(v-slot:actions)
          slot(name="actions")
        template(v-slot:sendButton)
          slot(name="sendButton")
  .qkb-bot-bubble
    button.qkb-bubble-btn(
      @click="botToggle"
    )
      slot(name="bubbleButton")
        transition(name="qkb-scaleUp")
          BubbleIcon.qkb-bubble-btn-icon(
            v-if="!botActive",
            key="1"
          )
          CloseIcon.qkb-bubble-btn-icon.qkb-bubble-btn-icon--close(
            v-else,
            key="2"
          )
  AppStyle(:options="optionsMain")
  .qkb-preload-image
    .qkb-msg-avatar__img(v-if="optionsMain.botAvatarImg")
</template>
<script>
import EventBus from '../helpers/event-bus'
import Config from '../config'
import BoardHeader from './Board/Header'
import BoardContent from './Board/Content'
import BoardAction from './Board/Action'
import AppStyle from './AppStyle'
import BubbleIcon from '../assets/icons/bubble.svg'
import CloseIcon from '../assets/icons/close.svg'

export default {
  name: 'VueBotUI',

  components: {
    BoardHeader,
    BoardContent,
    BoardAction,
    BubbleIcon,
    CloseIcon,
    AppStyle
  },

  props: {
    options: {
      type: Object,
      default: () => { return {} }
    },

    messages: {
      type: Array
    },

    botTyping: {
      type: Boolean,
      default: false
    },

    inputDisable: {
      type: Boolean,
      default: false
    },

    isOpen: {
      type: Boolean,
      default: false
    },

    openDelay: {
      type: Number
    }
  },

  data () {
    return {
      botActive: false,
      defaultOptions: {
        botTitle: 'Chatbot',
        colorScheme: '#1b53d0',
        textColor: '#fff',
        bubbleBtnSize: 56,
        animation: true,
        boardContentBg: '#fff',
        botAvatarSize: 32,
        botAvatarImg: 'http://placehold.it/200x200',
        msgBubbleBgBot: '#f0f0f0',
        msgBubbleColorBot: '#000',
        msgBubbleBgUser: '#4356e0',
        msgBubbleColorUser: '#fff',
        inputPlaceholder: 'Message',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: null
      },
      micOn: false,
      isBotAudioPlaying: false,
      micWasOnBeforeBotAudio: false
    }
  },

  watch: {
    messages: {
      handler () {
        this.autoPlayBotResponses()
      },
      deep: true
    }
  },

  computed: {
    optionsMain () {
      return { ...this.defaultOptions, ...this.options }
    },

    // Add class to bot ui wrapper
    uiClasses () {
      let classes = []

      if (this.optionsMain.animation) {
        classes.push('qkb-bot-ui--animate')
      }

      return classes
    }
  },

  created () {
    if (this.isOpen) {
      if (this.openDelay) {
        setTimeout(this.botOpen, this.openDelay)
      } else {
        this.botToggle()
      }
    }
  },

  mounted () {
    document.addEventListener(Config.EVENT_OPEN, function () {
      this.botOpen()
    })
    document.addEventListener(Config.EVENT_CLOSE, function () {
      this.botClose()
    })
    document.addEventListener(Config.EVENT_TOGGLE, function () {
      this.botToggle()
    })
  },

  beforeDestroy () {
    EventBus.$off('select-button-option')
  },

  methods: {
    botOpen () {
      if (!this.botActive) {
        this.botToggle()
      }
    },

    botClose () {
      if (this.botActive) {
        this.botToggle()
      }
    },

    botToggle () {
      this.botActive = !this.botActive

      if (this.botActive) {
        EventBus.$on('select-button-option', this.selectOption)
        this.$emit('init')
      } else {
        EventBus.$off('select-button-option')
        this.$emit('destroy')
      }
    },

    sendMessage (value) {
      this.$emit('msg-send', value)
    },

    selectOption (value) {
      this.$emit('msg-send', value)
    },

    autoPlayBotResponses () {
      if (!this.micOn || this.isBotAudioPlaying) return
      // Find next unplayed bot message
      const next = (this.messages || []).find(msg =>
        msg.agent === 'bot' && !msg._audioPlayed && msg.text
      )
      if (!next) return
      // If mic is on, turn it off and remember to turn it back on after audio
      if (this.micOn) {
        this.micWasOnBeforeBotAudio = true
        this.$refs.boardAction && this.$refs.boardAction.stopRecording && this.$refs.boardAction.stopRecording()
        this.micOn = false
      }
      this.isBotAudioPlaying = true
      // Gather all texts: main + options (if any)
      const texts = [next.text, ...(next.options ? next.options.map(opt => opt.text) : [])]
      const playAll = async () => {
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
            const audio = new Audio(url)
            await new Promise((resolve) => {
              audio.onended = () => {
                URL.revokeObjectURL(url)
                resolve()
              }
              audio.onerror = () => {
                URL.revokeObjectURL(url)
                resolve()
              }
              audio.play()
            })
          }
        } catch (e) {
          // Optionally log error
          console.error('Text-to-speech failed', e)
        }
        next._audioPlayed = true
        this.isBotAudioPlaying = false
        setTimeout(() => {
          if (this.micWasOnBeforeBotAudio) {
            this.micOn = true
            this.micWasOnBeforeBotAudio = false
            this.$refs.boardAction && this.$refs.boardAction.startRecording && this.$refs.boardAction.startRecording()
          }
          this.autoPlayBotResponses()
        }, 100)
      }
      playAll()
    },

    handleMicState (state) {
      this.micOn = state
      if (state) {
        // Mark all current bot messages as played so only new ones are auto-played
        if (Array.isArray(this.messages)) {
          this.messages.forEach(msg => {
            if (msg.agent === 'bot') msg._audioPlayed = true
          })
        }
        this.autoPlayBotResponses()
      }
    }
  }
}
</script>

<style src="../assets/scss/_app.scss" lang="scss"></style>
