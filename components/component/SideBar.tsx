"use client"
import Link from "next/link"

import {  useState } from "react"

import { useWidth } from "@/hooks/windowWidth"
import {Sidebar, HomeIcon, Copyright, LayoutPanelLeftIcon, LucideMessageCircleQuestion, LucideHandshake} from "lucide-react"
import useRouterSegments from "@/hooks/pathhook"
import UserCard from "./userCard"
export function SideBar({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const [isHidden, setHidden] = useState(true);
  /*
  ^: Matches the beginning of the string.
  \/: Matches a forward slash (escaped with \).
  ([^/]+): Matches one or more characters that are not forward slashes. This captures the first route segment.
  \/: Matches another forward slash.
  ([^/]+): Matches one or more characters that are not forward slashes. This captures the second route segment.

*/
  // Width of the active window
  const  windowWidth = useWidth()
  const routes = useRouterSegments();
  const pathName = routes?.pathname;
  const relevantItems = [
    
  { label: 'الطلبات', icon: <LucideMessageCircleQuestion className="h-4 w-4" />, href: '/admin/Dashboard/Requests' },
  { label: 'المواعيد', icon: <LucideHandshake className="h-4 w-4" />, href: '/admin/Dashboard/Meetings' }
]
  return (
    <div className={`flex  min-h-screen w-full `}>
      <aside className={`bg-white ${windowWidth < 1024 ? 'border-r-2' : ''}  flex flex-1 flex-col z-10 h-screen transition-transform transition-width transform ease-in-out duration-300 lg:relative absolute ${isHidden ? '-translate-x-full w-0' : ' -translate-x-0 z-50  min-w-[280px] max-w-[280px]'}`}>
        <div className="flex  flex-col gap-2 bg-white">
        
          {windowWidth  < 1024 && relevantItems.length !== 0  &&<div className={`flex h-16 items-center border-b px-6 ${isHidden ? 'hidden' : ''} `}>
              
              <button  className="ml-auto h-8 w-8 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " onClick={()=> {setHidden(!isHidden)}}>
                <Sidebar className="h-4 w-4"></Sidebar>
              </button>
            </div>}
          <div className="flex-1 overflow-auto py-2">
            
            <nav className="grid items-start px-4 text-sm font-medium">
            <ul>
            {relevantItems.map((item) => (
                <Link 
                className={`flex items-center gap-3 rounded-lg  px-3 py-2 ${item.href === pathName ? 'text-gray-900 bg-gray-100' : 'text-gray-500' }   transition-all hover:text-gray-900`}
                href={item.href} 
                key={item.href}
              >
        
        {<>{item.icon}</>}
        {item.label}
      </Link>
    ))}
    </ul>
            </nav>
          </div>
        </div>
        <UserCard isHidden={isHidden}></UserCard>
      </aside>
      
      <div className=" flex flex-col w-8 items-center justify-center ml-2">
        <div className=" bg-gray-300 w-[2px] h-4" />
        {relevantItems.length !== 0 && <button className="mx-auto h-8 w-8 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"  onClick={()=> {
          setHidden(!isHidden)}}>
                  <Sidebar className="h-4 w-4" />
        </button>}
        <div className=" bg-gray-300 w-[2px] flex-1 " />
      </div>
      <main className={`flex flex-col max-h-screen flex-grow overflow-hidden ${isHidden ? 'w-full' : ''}`}>
        <section className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto ">
          {children}
        </section>
      </main>
    </div>
  )
}







