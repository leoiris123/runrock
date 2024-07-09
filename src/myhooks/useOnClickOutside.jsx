
import {  useEffect} from "react";
export default function useOnClickOutside(ref, handle) {
    useEffect(() => {
        const listener = () => {
            if (!ref.current || ref.current.contains(event.target)) return;
            handle()
        }
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        }
    }
    )
}