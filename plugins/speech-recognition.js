class SpeechRecognition {
  recognition

  initializeApi () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    this.recognition = new SpeechRecognition()
    this.recognition.lang = 'ja-JP'
    this.recognition.interimResults = false
    this.recognition.continuous = false
  }

  start () {
    this.recognition.start()
  }

  stop () {
    this.recognition.stop()
  }

  result () {
    this.recognition.onresult = (event) => {
      this.setResultInLocalStorage(event)
      console.log('音声結果', event.results[0][0].transcript)
    }
  }

  setResultInLocalStorage (event) {
    localStorage.setItem('result', JSON.stringify(event.results[0][0].transcript))
  }
}

export default ({}, inject) => {
  inject('recognition', new SpeechRecognition())
}
