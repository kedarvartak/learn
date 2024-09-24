import React from 'react'

export default function Homepage(props) {
  const {setudioStream, setfile} = props  

  return (
    <div>
          <main class=" flex-1 p-4 py-16 flex flex-col gap-3 sm:gap-4 md:gap-5 text-center justify-center">
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Free <span className='text-blue-400 bold'>Scribe</span></h1>
            <h3 className='font-medium md:text-lg'>Record<span className='text-blue-400'>&rarr;</span> Transcribe <span className='text-blue-400'>&rarr;</span> Translate  </h3>
            <button className='flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4  specialBtn px-4 py-2 rounded-lg text-blue-400'>
                <p className='text-blue-400'>Record</p>
                <i className="fa-solid fa-microphone"></i>
            </button>
            <p className='text-base'> Or <label onChange={(e) => {const tempfile = e.target.file[0]
            setfile(tempfile)}} className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200' htmlFor="">upload <input className='hidden' type="file" accept='.mp3, .wave' /></label> a mp3 file</p>
            <p className='italic text-slate-400'>Free now free forever</p>
          </main>

    </div>
  )
}
