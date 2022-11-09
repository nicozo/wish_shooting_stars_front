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
    console.log('recording')
  }

  stop () {
    this.recognition.stop()
    console.log('end')
  }

  result () {
    this.recognition.onresult = (event) => {
      localStorage.setItem('result', JSON.stringify(event.results[0][0].transcript))
      console.log(event.results[0][0].transcript)
    }
  }
}

export default ({}, inject) => {
  inject('recognition', new SpeechRecognition())
}
