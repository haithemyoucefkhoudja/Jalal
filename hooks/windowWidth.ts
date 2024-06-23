'use client';

import { useEffect, useState } from "react";

export const useWidth = () => {  
    const [width, setWidth] = useState<number>(0)
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
        setWidth(window.innerWidth);
        //make sure it set properly on the first load (before resizing)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
        
    }, []) // empty
    return width
}