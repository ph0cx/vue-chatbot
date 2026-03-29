<template>
  <div
    ref="boardContent"
    class="qkb-board-content"
  >
    <div
      ref="boardBubbles"
      class="qkb-board-content__bubbles"
    >
      <message-bubble
        v-for="(item, index) in mainData"
        :key="index"
        :message="item"
      />
      <div
        v-if="botTyping"
        class="qkb-board-content__bot-typing"
      >
        <slot name="botTyping">
          <message-typing />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import MessageBubble from '../MessageBubble/Main'
import MessageTyping from '../MessageBubble/Typing'

export default {
  components: {
    MessageBubble,
    MessageTyping
  },

  props: {
    mainData: {
      type: Array,
      required: true
    },

    botTyping: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    mainData: function (newVal) {
      this.$nextTick(() => {
        this.updateScroll()
      })
    }
  },

  methods: {
    updateScroll () {
      const contentElm = this.$refs.boardContent
      const offsetHeight = this.$refs.boardBubbles.offsetHeight

      contentElm.scrollTop = offsetHeight
    }
  }
}
</script>
