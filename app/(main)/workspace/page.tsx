"use client"
import React from 'react'
import AssistantsList from './_components/AssistantsList'

function Workspace() {
  return (
    <div className='h-screen w-full fixed'>
        <div className='grid grid-cols-5'>
            <div className='hidden md:block'>
                {/* Assistants List */}
                <AssistantsList />
            </div>
            <div className='md:col-span-4 lg:col-span-3'>
                {/* Assistant Chat UI */}
                CHAT UI
            </div>
            <div className='hidden lg:block'>
                {/* Assistant Details and Settings */}
                SETTINGS
            </div>

        </div>
    </div>
  )
}

export default Workspace