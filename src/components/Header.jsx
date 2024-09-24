import React from 'react'

export default function Header() {
  return (
    <div>
      <header className="flex items-center justify-between p-6  gap-4"> 
        <h1 className=" text-lg" >Free <span class="text-blue-400 bold">Scribe</span></h1>
        <button className="flex items-center gap-2  specialBtn px-3 py-2 rounded-lg text-blue-400">New
        <i class="fa-solid fa-plus"></i>
        </button>
        </header>   
    </div>
  )
}
