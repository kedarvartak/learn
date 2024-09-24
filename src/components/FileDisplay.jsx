import React from 'react'

export default function FileDisplay(props) {
  const {handleaudioReset, file, audiostream} = props  
  return (
   
         <main class=" flex-1 p-4 py-16 flex flex-col gap-3 sm:gap-4 md:gap-5 text-center justify-center">
             <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>Your <span className='text-blue-400 bold'>File</span></h1>
         </main>
   
  )
}
