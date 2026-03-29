<template>
  <div id="app">
    <VueBotUI
      :options="botOptions"
      :messages="messageData"
      :bot-typing="botTyping"
      :input-disable="inputDisable"
      :is-open="false"
      @init="botStart"
      @msg-send="msgSend"
    />
  </div>
</template>
<script>
import BotIcon from './assets/icons/bot.png'
import { VueBotUI } from './vue-bot-ui'
import { messageService, STATE_ENDPOINTS } from './helpers/message'

export default {
  components: {
    VueBotUI
  },

  props: {
    userOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      messageData: [],
      botTyping: false,
      inputDisable: false,
      selectedState: this.userOptions.selectedState || 'zamfara',
      stateEndpoints: STATE_ENDPOINTS,
      botOptions: {
        botTitle: 'HIVA',
        botAvatarImg: BotIcon,
        boardContentBg: '#f4f4f4',
        msgBubbleBgBot: '#fff',
        inputPlaceholder: '',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: '',
        colorScheme: this.userOptions.colorScheme || '#008374',
        msgBubbleBgUser: this.userOptions.msgBubbleBgUser || '#008374',
        showMicButton: false
      }
    }
  },

  methods: {
    botStart () {
      // Get token if you want to build a private bot
      // Request first message here

      // Update title based on selected state
      this.botOptions.botTitle = this.stateEndpoints[this.selectedState].name

      if (this.messageData.length > 0) {
        return
      }

      // Fake typing for the first message
      this.botTyping = true
      setTimeout(() => {
        this.botTyping = false
        this.messageData.push({
          agent: 'bot',
          type: 'text',
          text: `Hello! I am your ${this.stateEndpoints[this.selectedState].name} . How can I help you today?`
        })
      }, 1000)
    },

    msgSend (value) {
      // Push the user's message to board
      this.messageData.push({
        agent: 'user',
        type: 'text',
        text: value.text
      })

      this.getResponse(value.text)
    },

    // Submit the message from user to bot API, then get the response from Bot
    getResponse (text) {
      // Loading
      this.botTyping = true

      // Post the message from user here
      // Then get the response as below

      // Create new message from real state API
      messageService.fetchStateResponse(this.selectedState, text)
        .then((response) => {
          const replyMessage = {
            agent: 'bot',
            ...response
          }

          this.inputDisable = response.disableInput
          this.messageData.push(replyMessage)

          // finish
          this.botTyping = false
        })
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
