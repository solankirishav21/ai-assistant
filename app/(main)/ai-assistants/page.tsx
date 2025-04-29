"use client"
import AiAssistantsList from '@/services/AiAssistantsList'
import React, {useState} from 'react'
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { BlurFade } from '@/components/magicui/blur-fade';
import { RainbowButton } from "@/components/magicui/rainbow-button";

export type ASSISTANT ={
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
}

function AIAssistants() {
  const [selectedAssistants, setSelectedAssistants] = useState<ASSISTANT[]>([]);
  
  const onSelect =(assistant: ASSISTANT) => {
    const item =selectedAssistants?.find((item: ASSISTANT) => item.id === assistant.id);
    if(item){
      setSelectedAssistants(selectedAssistants?.filter((item: ASSISTANT) => item.id !== assistant.id));
      return ;
    }
    setSelectedAssistants(prev => [...prev, assistant]);
  }

  const isAssistantSelected = (assistant: ASSISTANT) => {
    const item =selectedAssistants?.find((item: ASSISTANT) => item.id === assistant.id);
    return item ? true : false;
  }
  return (
    <div className='px-10 mt-20 md:px-28 lg:px-36 xl:px-48'>
      <div className="flex items-center justify-between">
        <div>
        <BlurFade delay={0.25} inView>
          <h2 className='text-3xl font-bold'>Welcome to the World of AI 🤖</h2>
          </BlurFade>
          <BlurFade delay={0.25 * 2 } inView>
          <p className='text-xl mt-2'>Choose your Assistant to make your work easy 🚀</p>
          </BlurFade>
        </div>
        <RainbowButton disabled = {selectedAssistants?.length ==0}
          className='bg-black text-white dark:bg-white dark:text-black'
          >
          Continue
          </RainbowButton>
      </div>

    <div className='grid grid-cols-1 gap-5 mt-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {AiAssistantsList.map((assistant, index) => (
        <BlurFade key={assistant.image} delay={0.25 + index * 0.05} inView>
        <div className='hover:border p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer relative'
           key={index} onClick={()=> onSelect(assistant)}>
          <Checkbox className='absolute m-2' checked={isAssistantSelected(assistant)}/>
          <Image src = {assistant.image} alt= {assistant.title}
          width = {600}
          height = {600}
          className='rounded-xl w-full h-[850px] md:h-[350px] object-cover'
           />
           <h2 className='text-center font-bold text-lg'>{assistant.name}</h2>
           <h2 className='text-center text-gray-600 dark:text-gray-300'>{assistant.title}</h2>
        </div>
        </BlurFade>
       )) }
    </div>

    </div>
  )
}

export default AIAssistants