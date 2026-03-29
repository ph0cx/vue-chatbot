<template>
  <div
    class="qkb-bot-ui"
    :class="uiClasses"
  >
    <transition name="qkb-fadeUp">
      <div
        v-if="botActive"
        class="qkb-board"
      >
        <BoardHeader
          :bot-title="optionsMain.botTitle"
          @close-bot="botToggle"
        >
          <template #header>
            <slot name="header" />
          </template>
        </BoardHeader>
        <BoardContent
          :bot-typing="botTyping"
          :main-data="messages"
        >
          <template #botTyping>
            <slot name="botTyping" />
          </template>
        </BoardContent>
        <BoardAction
          ref="boardAction"
          :input-disable="inputDisable"
          :input-placeholder="optionsMain.inputPlaceholder"
          :input-disable-placeholder="optionsMain.inputDisablePlaceholder"
          :show-mic-button="optionsMain.showMicButton"
          @msg-send="sendMessage"
          @mic-state="handleMicState"
        >
          <template #actions>
            <slot name="actions" />
          </template>
          <template #sendButton>
            <slot name="sendButton" />
          </template>
        </BoardAction>
      </div>
    </transition>
    <div class="qkb-bot-bubble">
      <button
        class="qkb-bubble-btn"
        @click="botToggle"
      >
        <slot name="bubbleButton">
          <transition name="qkb-scaleUp">
            <BubbleIcon
              v-if="!botActive"
              key="1"
              class="qkb-bubble-btn-icon"
            />
            <CloseIcon
              v-else
              key="2"
              class="qkb-bubble-btn-icon qkb-bubble-btn-icon--close"
            />
          </transition>
        </slot>
      </button>
    </div>
    <AppStyle :options="optionsMain" />
    <div class="qkb-preload-image">
      <div
        v-if="optionsMain.botAvatarImg"
        class="qkb-msg-avatar__img"
      />
    </div>
  </div>
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
      type: Array,
      default: () => []
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
      type: Number,
      default: 0
    }
  },

  emits: ['init', 'destroy', 'msg-send'],

  data () {
    return {
      botActive: false,
      defaultOptions: {
        botTitle: 'Hayok Health Assistant',
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
        inputPlaceholder: '',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: null,
        showMicButton: false
      },
      micOn: false,
      isBotAudioPlaying: false,
      micWasOnBeforeBotAudio: false
    }
  },

  computed: {
    optionsMain () {
      return { ...this.defaultOptions, ...this.options }
    },

    // Add class to bot ui wrapper
    uiClasses () {
      const classes = []

      if (this.optionsMain.animation) {
        classes.push('qkb-bot-ui--animate')
      }

      return classes
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
    this.handleOpen = () => this.botOpen()
    this.handleClose = () => this.botClose()
    this.handleToggle = () => this.botToggle()

    document.addEventListener(Config.EVENT_OPEN, this.handleOpen)
    document.addEventListener(Config.EVENT_CLOSE, this.handleClose)
    document.addEventListener(Config.EVENT_TOGGLE, this.handleToggle)
  },

  unmounted () {
    document.removeEventListener(Config.EVENT_OPEN, this.handleOpen)
    document.removeEventListener(Config.EVENT_CLOSE, this.handleClose)
    document.removeEventListener(Config.EVENT_TOGGLE, this.handleToggle)
    EventBus.off('select-button-option')
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
        EventBus.on('select-button-option', this.selectOption)
        this.$emit('init')
      } else {
        EventBus.off('select-button-option')
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
