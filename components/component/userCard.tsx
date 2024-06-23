"use client";
import React, { Suspense } from 'react'
import { LogIn, LogOut, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default  function UserCard({isHidden}:{isHidden:boolean}) {
    const { data, status } = useSession();
  return (
    // if status == authenticated and data exists and data.user property exists
    // render the Card component 
    // else fallback To NO DATA div

    <Suspense fallback={<div className=' w-full'> NO DATA</div>}>
        {status == 'authenticated' && data && data.user &&
        <div className={`rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ${isHidden ? 'hidden' : ''} m-2 mt-auto`} >
            <div className="flex space-x-2  p-2 items-center justify-between">
                <User className=" border-2 border-gray-400 rounded-full h-12 w-12 "/>
                
                <h3 className="font-semibold leading-4 tracking-tight text-sm ">
                    {/* access the data.user.name from data.user object*/}
                    {data.user.name}
                </h3>
                <div className='flex md:flex-1 items-center  justify-end'>        
                    <button className=" h-8 w-8 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 "  onClick={()=>signOut()}>
                    <LogOut/>
                    </button>
                </div>
            </div>
        </div>}
        
    </Suspense>
  )
}
