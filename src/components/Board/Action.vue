<template lang="pug">
.qkb-board-action(
  :class="actionClass"
)
  .qkb-board-action__wrapper
    .qkb-board-action__msg-box
      input.qkb-board-action__input(
        type="text",
        v-model="messageText",
        ref="qkbMessageInput",
        :disabled="inputDisable",
        :placeholder="inputPlaceholder",
        @keydown.enter="sendMessage",
      )
      .qkb-board-action__disable-text(
        v-if="inputDisablePlaceholder && inputDisable"
      )
        span {{ inputDisablePlaceholder }}
    .qkb-board-action__extra
      slot(name="actions")
      button.qkb-action-item.qkb-action-item--mic(
        v-if="showMicButton"
        @click="toggleRecording",
        :disabled="inputDisable"
      )
        MicOff.qkb-action-icon.qkb-action-icon--mic(v-if="!isRecording")
        MicOn.qkb-action-icon.qkb-action-icon--mic(v-else)
      button.qkb-action-item.qkb-action-item--send(@click="sendMessage")
        slot(name="sendButton")
          IconSend.qkb-action-icon.qkb-action-icon--send
</template>
<script>
import IconSend from '../../assets/icons/send.svg'
import MicOn from '../../assets/icons/mic-on.svg'
import MicOff from '../../assets/icons/mic-off.svg'

export default {
  components: {
    IconSend,
    MicOn,
    MicOff
  },

  props: {
    inputPlaceholder: {
      type: String
    },

    inputDisablePlaceholder: {
      type: String
    },

    inputDisable: {
      type: Boolean,
      default: false
    },
    showMicButton: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      messageText: null,
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
      stream: null,
      recognition: null
    }
  },

  computed: {
    actionClass () {
      const actionClasses = []

      if (this.inputDisable) {
        actionClasses.push('qkb-board-action--disabled')
      }

      if (this.messageText) {
        actionClasses.push('qkb-board-aciton--typing')
      }

      // TODO: sending

      return actionClasses
    }
  },

  mounted () {
    this.$refs.qkbMessageInput.focus()
  },

  methods: {
    sendMessage () {
      if (this.messageText) {
        this.$emit('msg-send', { text: this.messageText })
        this.messageText = null
      }
    },
    async toggleRecording () {
      if (this.isRecording) {
        this.stopRecording()
        this.$emit('mic-state', false)
      } else {
        this.startRecording()
        this.$emit('mic-state', true)
      }
    },
    async startRecording () {
      // Try to use SpeechRecognition for silence detection
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition()
        this.recognition.continuous = true
        this.recognition.interimResults = false
        this.recognition.lang = 'en-US'
        this.recognition.onresult = (event) => {
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              const text = event.results[i][0].transcript.trim()
              if (text) {
                this.messageText = text
                this.sendMessage()
              }
            }
          }
        }
        this.recognition.onerror = (e) => {
          console.error('SpeechRecognition error:', e)
        }
        this.recognition.onend = () => {
          if (this.isRecording) {
            try {
              this.recognition.start()
            } catch (e) {
              if (e.name !== 'InvalidStateError') {
                console.error('SpeechRecognition restart error:', e)
              }
            }
          }
        }
        this.isRecording = true
        this.recognition.start()
        return
      }
      // Fallback to MediaRecorder if SpeechRecognition is not available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Microphone not supported')
        return
      }
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        this.isRecording = true
        this.listenLoop()
      } catch (err) {
        alert('Could not access microphone')
        console.error('Stream error:', err)
      }
    },
    stopRecording () {
      this.isRecording = false
      this.$emit('mic-state', false)
      if (this.recognition) {
        this.recognition.onresult = null
        this.recognition.onerror = null
        this.recognition.onend = null
        try {
          this.recognition.stop()
        } catch (e) {
          console.error('SpeechRecognition stop error:', e)
        }
        this.recognition = null
      }
      if (this.mediaRecorder) {
        this.mediaRecorder.onstop = null
        this.mediaRecorder.ondataavailable = null
        try {
          if (this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop()
          }
        } catch (e) {
          console.error('MediaRecorder stop error:', e)
        }
        this.mediaRecorder = null
      }
      if (this.stream) {
        try {
          this.stream.getTracks().forEach(track => track.stop())
        } catch (e) {
          console.error('Stream stop error:', e)
        }
        this.stream = null
      }
    },
    async listenLoop () {
      if (!this.isRecording || !this.stream) return
      this.audioChunks = []
      this.mediaRecorder = new window.MediaRecorder(this.stream)
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.audioChunks.push(e.data)
      }
      this.mediaRecorder.onstop = async () => {
        if (!this.isRecording) return
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' })
        // Only send if the recording is at least 0.1 seconds and not more than 600KB
        if (audioBlob.size < 1000 || audioBlob.size > 600 * 1024) {
          // Too short or too large, skip sending
          if (this.isRecording) {
            setTimeout(() => this.listenLoop(), 200)
          }
          return
        }
        const formData = new FormData()
        formData.append('audio', audioBlob, 'recording.webm')
        try {
          const response = await fetch('https://api-aitext2speech.hayokmedicare.ng/api/speech-to-text/', {
            method: 'POST',
            body: formData
          })
          const data = await response.json()
          if (data && data.text) {
            this.messageText = data.text
            this.sendMessage()
          }
        } catch (e) {
          console.error('Speech-to-text error:', e)
        }
        if (this.isRecording) {
          setTimeout(() => this.listenLoop(), 200)
        }
      }
      this.mediaRecorder.onerror = (e) => {
        console.error('MediaRecorder error:', e)
      }
      this.mediaRecorder.start()
      setTimeout(() => {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
          this.mediaRecorder.stop()
        }
      }, 4000) // 4 seconds per chunk
    }
  },
  watch: {
    inputDisable (newVal) {
      if (newVal && this.isRecording) {
        this.stopRecording()
      }
    }
  }
}
</script>
