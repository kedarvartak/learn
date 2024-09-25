import { useState, useRef, useEffect} from 'react'
import './App.css'
import Homepage from './components/Homepage'
import Header from './components/Header'
import FileDisplay from './components/FileDisplay'
import Information from './components/Information'
import Transcribing from './components/Transcribing'
import { MessageTypes } from './utils/presets'

function App() {
  const [file, setfile] = useState(null)
  const [audioStream, setaudioStream] = useState(null)
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const isAudioAvailable = file || audioStream

  function handleaudioReset() {
    setfile(null)
    setaudioStream(null)
  }

  const worker = useRef(null)

  useEffect(() => {
    if(!worker.current){
      worker.current = new Worker(new URL('./utils/whisper.worker.js' , import.meta.url), {
        type: 'module'
      })
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
            setDownloading(true);
            console.log('DOWNLOADING');
            break;
        case 'LOADING':
            setLoading(true);
            console.log('LOADING');
            break;
        case 'RESULT':
            setOutput(e.data.results);  
            console.log(e.data.results);         
            break;
        case 'INFERENCE_DONE':
            setFinished(true);
            console.log('DONE');
            break;    
       
      }
    }

    worker.current.addEventListener('message', 
    onMessageReceived);

    return () => worker.current.removeEventListener('message', 
    onMessageReceived);
  
  })

  async function readAudioFrom (file) {
    const sampling_rate = 16000
    const audioCTX = new AudioContext({sampleRate : sampling_rate})
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio 
  }

  async function handleFormSubmission(){
    if(!file && !audioStream){return}
    let audio = await readAudioFrom(file ? file : audioStream)
    const model_name = `openai/whisper-tiny.en`

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,

    })
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
            <FileDisplay handleFormSubmission={handleFormSubmission} handleaudioReset={handleaudioReset} file={file} audiostream ={audioStream}/>
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
