class SpeechRecognition {
  recognition

  initializeApi () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    this.recognition = new SpeechRecognition()
    this.recognition.lang = 'ja-JP'
    this.recognition.interimResults = true
    this.recognition.continuous = true
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
      console.log(event)
    }
  }
}

export default ({}, inject) => {
  inject('recognition', new SpeechRecognition())
}
