"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';

function SignIn() {

const createUser = useMutation(api.users.CreateUser);
const{user, setUser} = useContext(AuthContext);
const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      if(typeof window !== 'undefined'){
        localStorage.setItem('user_token', tokenResponse.access_token);
      }
      const user = await GetAuthUserData(tokenResponse.access_token);
    //   Save User Data to Convex DB
      const result = await createUser({
        name:user?.name,
        email:user?.email,
        picture:user.picture
      })
      if(result){
        setUser(user);
      }
    },
    onError: errorResponse => console.log(errorResponse),
  });
  return (
    <div className='flex flex-col items-center justify-center h-screen '>
        <div className='flex flex-col items-center gap-5 border rounded-2xl p-10 shadow-md'>
            <Image src = {"/logo.svg"}
                alt='logo'
                height={100}
                width={100} />
                <h2 className='text-2xl'>Sign-In to your Personal Assistant</h2>
                <Button onClick={() => googleLogin()}>Sign-In with Google Account</Button>
        </div>
    </div>
  )
}

export default SignIn