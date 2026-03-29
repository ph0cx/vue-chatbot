export const STATE_ENDPOINTS = {
  rivers: {
    name: 'RIVCHPP Health Assistant',
    endpoint: 'https://ai.hiva.chat/api/v1/chat/river-state-health-assistant'
  },
  kogi: {
    name: 'KGSHIA Health Assistant',
    endpoint: 'https://ai.hiva.chat/api/v1/chat/kogi-health-assistant'
  },
  zamfara: {
    name: 'ZAMCHEMA Health Assistant',
    endpoint: 'https://ai.hiva.chat/api/v1/chat/zam-health-assistant'
  },
  ohis: {
    name: 'OHIS Health Assistant',
    endpoint: 'https://ai.hiva.chat/api/v1/chat/ohis-assistant'
  },
  hiva_medichat: {
    name: 'HIVA Medichat',
    endpoint: 'https://ai.hiva.chat/api/v1/chat/hiva-medichat'
  },
  hiva: {
    name: 'HIVA',
    endpoint: 'https://ai.hiva.chat/api/v1/chat/hiva'
  }
}

export const messageService = {
  createMessage,
  fetchStateResponse
}

function createMessage () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        type: 'text',
        text: 'Something is not right',
        disableInput: false
      })
    }, 1000)
  })
}

async function fetchStateResponse (stateKey, message) {
  const state = STATE_ENDPOINTS[stateKey]
  if (!state) {
    throw new Error('Invalid state selected')
  }

  try {
    const response = await fetch(state.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return {
      type: 'text',
      text: data.answer || 'Sorry, I couldn\'t find an answer to that.',
      disableInput: false
    }
  } catch (error) {
    console.error('Error fetching state response:', error)
    return {
      type: 'text',
      text: 'Sorry, something went wrong.',
      disableInput: false
    }
  }
}
