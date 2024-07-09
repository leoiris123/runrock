import { useEffect } from "react";

export default function useEventListener(eventName,handle,dom=window) {
    useEffect(() => {
        const isSupport = dom && dom.addEventLister
        if(isSupport){
            dom.addEventListener(eventName,handle)
        }
        return () => {
            if(isSupport){
                dom.removeEventListener(eventName,handle)
            }
        }
    },[eventName,handle,dom])
}