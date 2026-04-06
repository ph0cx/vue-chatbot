<template>
  <div class="qkb-board-header">
    <slot name="header">
      <div class="qkb-board-header__title">
        {{ botTitle }}
      </div>
    </slot>
    <button
      class="qkb-board-header__close"
      @click="$emit('close-bot')"
    >
      <CloseIcon />
    </button>
  </div>
</template>
<script>
import CloseIcon from '../../assets/icons/close.svg'

export default {
  components: {
    CloseIcon
  },

  props: {
    botTitle: {
      type: String,
      default: 'Chatbot'
    }
  }
}
</script>
