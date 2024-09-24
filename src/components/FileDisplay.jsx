import React from 'react'

export default function FileDisplay(props) {
  const {handleaudioReset, file, audiostream} = props  
  return (
      <div className='py-12'>

      <main class=" flex-1 p-4 flex flex-col gap-3 sm:gap-4  text-center justify-center w-fit max-w-full mx-auto">
             <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl my-4'>Your <span className='text-blue-400 bold'>File</span></h1>
             <div className='mx-auto flex flex-col text-left'>
                <h3 className='font-semibold'>Name</h3>
                <p>{file? file?.name : 'custom audio' }</p>
             </div>
             <div className='flex items-center justify-between gap-4'>
                <button onClick={handleaudioReset} className='text-slate-400 hover:text-blue-600 duration-200'>reset</button>
                <button className='specialBtn py-2 rounded-lg text-blue-400 flex items-center gap-2  px-3'><p>Transcribe</p>
                <i class="fa-solid fa-pen-to-square"></i></button>
             </div>
         </main>
   
      </div>
  )
}
