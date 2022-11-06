class SpeechRecognition {
  recognition

  initializeApi () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    this.recognition = new SpeechRecognition()
    this.recognition.lang = 'ja-JP'
    this.recognition.interimResults = true
    this.recognition.continuous = true
    console.log(this.recognition)
  }

  start () {
    this.recognition.start()
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
