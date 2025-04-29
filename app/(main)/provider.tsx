"use client"
import React, { useContext, useEffect } from 'react'
import Header from './_components/Header';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';

function Provider({
    children,
} : Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const convex = useConvex();
    const { user, setUser} = useContext(AuthContext)

    useEffect(() => {
        CheckUseAuth();
    },[]);
    const CheckUseAuth = async () =>{
        const token = localStorage.getItem('user_token');
        // Get New Access Token 
        const user = token && await GetAuthUserData(token);
        // console.log("Token:", token);
        // console.log("User:", user);
        // console.log("Redirecting?", !user?.email);

        if(!user?.email){
            router.replace('/sign-in');
            return ;
        }
        // Get User Data from DB
        try{
             const userData = await convex.query(api.users.GetUser, {
                email: user?.email
             });
             setUser(userData);
        }catch(e){

        }
    }
  return (
    <div>
        <Header />
            {children}   
    </div>
  )
}

export default Provider