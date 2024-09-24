import { useState } from 'react'
import './App.css'
import Homepage from './components/Homepage'
import Header from './components/Header'
import FileDisplay from './components/FileDisplay'

function App() {
  const [file, setfile] = useState(null)
  const [audioStream, setaudioStream] = useState(null)

  const isAudioAvailable = file || audioStream

  function handleaudioReset() {
    setfile(null)
    setaudioStream(null)
  }

  return (
    <div class="flex flex-col  max-w-[1000px] mx-auto w-full">
      <section class="min-h-screen flex flex-col">
        <Header/>
        {isAudioAvailable ? (
          <FileDisplay handleaudioReset={handleaudioReset} file={file} audiostream ={setaudioStream}/>
        ) : (
        <Homepage setfile={setfile} setaudioStream={setaudioStream}/>)}
      </section>
      
      <footer>

      </footer>
    </div>
    
  )
}

export default App
