import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, {useState, useContext, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';
import { ASSISTANT } from '../../ai-assistants/page'; 
import Image from 'next/image';
import { AssistantContext } from '@/context/AssistantContext';

function AssistantsList() {
    
        const {assistant, setAssistant} = useContext(AssistantContext);
        const {user} = useContext(AuthContext);
        const [assistantsList, setAssistantsList] = useState<ASSISTANT[]>([]);
        const convex = useConvex();
        const router = useRouter();
         const GetUserAssistants= async ()=>{
            const result = await convex.query(api.userAiAssistants.GetAllUserAssistants, {
              uid:user._id
            });
            // console.log('--------------------------', result);
            setAssistantsList(result);
          }
        
          useEffect(() => {
            // user && GetUserAssistants();
            if (user && user._id) {
                GetUserAssistants();
              }
          },[user])
  
    
    return (
    <div className='p-0 md:p-5 bg-secondary border-r-[1px] h-screen overflow-y-auto relative'>
        <h2 className='font-bold text-lg text-center'>Your Personal AI Assistants</h2>

        <Button className='w-full mt-3 p-3'> + Add More AI Assistants</Button>
        <Input className ='bg-white mt-3'placeholder='Search AI Assistants' />

        <div className='mt-5'>
            {assistantsList.map((assistant_, index) => (
                <div className={`p-4 flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl cursor-pointer mt-2
                    ${assistant_.id == assistant?.id && 'bg-gray-200 dark:bg-slate-600'}
                `}
                    key={index} onClick={() => setAssistant(assistant_)}>
                    <Image src={assistant_.image} alt={assistant_.name} 
                        width={60} height={60}
                        className='rounded-xl w-[60px] h-[60px] object-cover'
                        />
                    <div>
                        <h2 className='text-bold'>{assistant_.name}</h2>
                        <h2 className='text-gray-600 text-sm dark:text-gray-300'>{assistant_.title}</h2>
                    </div>
                </div>
            ))}
        </div>
        <div className='absolute bottom-10 flex gap-3 items-center
            hover:bg-gray-200 w-[87%] rounded-xl p-3 cursor-pointer' >
             {user?.picture &&<Image src={user?.picture} alt={user?.name}
                width={35} height={35} className='rounded-full' />}
            <div>
                <h2 className='font-bold'>{user?.name}</h2>
                <h2 className='text-gray-400 text-sm'>{user?.orderId ? 'Pro Plan' : 'Free Plan'}</h2>
            </div>
      </div>
    </div>
  )
}

export default AssistantsList