import { useState, useEffect } from 'react'
import './App.css'
import Homepage from './components/Homepage'
import Header from './components/Header'
import FileDisplay from './components/FileDisplay'
import Information from './components/Information'
import Transcribing from './components/Transcribing'

function App() {
  const [file, setfile] = useState(null)
  const [audioStream, setaudioStream] = useState(null)
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)

  const isAudioAvailable = file || audioStream

  function handleaudioReset() {
    setfile(null)
    setaudioStream(null)
  }

  return (
    <div class="flex flex-col  max-w-[1000px] mx-auto w-full">
      <section class="min-h-screen flex flex-col">
        <Header/>
        {
          output ? (
            <Information/>
          ) : loading ? (
            <Transcribing/>
          ) : isAudioAvailable ? (
            <FileDisplay handleaudioReset={handleaudioReset} file={file} audiostream ={audioStream}/>
          ) : (
            <Homepage setfile={setfile} setaudioStream={setaudioStream}/>
          )
        }
      </section>
      
      <footer>

      </footer>
    </div>
    
  )
}

export default App
