import React, {useState, useEffect, useRef} from 'react'


export default function Homepage(props) {
  const {setAudioStream, setfile} = props  

  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const [audioChunks, setAudioChunks] = useState([])  
  const [duration, setDuration] = useState(0)

  const mediaRecorder = useRef(null)

  const mimeType = 'audio/webM'

  async function startRecording(){
    let tempStream
    console.log('Start recording')

    try {
        const streamData = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        })
        tempStream = streamData
    } catch (error) {
        console.log(err.message)
        return
    }
    setRecordingStatus('recording')
    // Create a MediaRecorder instance
    const media = new MediaRecorder(tempStream, {type: mimeType})
    mediaRecorder.current = media
    mediaRecorder.current.start()
    let localAudioChunks = []
    mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === 'undefined') {
            return
        }
        if (event.data.size === 0) return
        localAudioChunks.push(event.data)

    }
    setAudioChunks(localAudioChunks)

  }

  async function stopRecording(){
    setRecordingStatus('inactive')
    console.log('Stop recording')

    mediaRecorder.current.stop()
    mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType })
        setAudioStream(audioBlob)
        setAudioChunks([])
        setDuration(0)
    }
  }

  useEffect(() => {
    if(recordingStatus === 'inactive') return

    const interval = setInterval(() => {
        setDuration (curr => curr + 1)
    }, 1000)

    return () => clearInterval(interval)
  })

  return (
    <div>
          <main class=" flex-1 p-4 py-16 flex flex-col gap-3 sm:gap-4 text-center justify-center">
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Free <span className='text-blue-400 bold'>Scribe</span></h1>
            <h3 className='font-medium md:text-lg'>Record<span className='text-blue-400'>&rarr;</span> Transcribe <span className='text-blue-400'>&rarr;</span> Translate  </h3>
            <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className='flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4  specialBtn px-4 py-2 rounded-lg text-blue-400'>
                <p className='text-blue-400'>{recordingStatus === 'inactive' ? 'Record' : `Stop recording`}</p>
                <div className='flex items-center gap-2'>
                {duration && (
                    <p className='text-sm'>{duration}s</p>
                )}
                 <i className={"fa-solid duration-200 fa-microphone " + (recordingStatus === 'recording' ? ' text-rose-300' : "")}></i>
                </div>
            </button>
            <p className='text-base'> Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200' >upload <input onChange={(e) => {const tempfile = e.target.files[0]
            setfile(tempfile)}} className='hidden' type="file" accept='.mp3, .wave' /></label> a mp3 file</p>
            <p className='italic text-slate-300'>Free now free forever</p>
          </main>

    </div>
  )
}
