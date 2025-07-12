import { useEffect } from "react";


export const useKeyPress = (targetKey, callback) => {
    useEffect(() => {
       const handleKeyUp = (ev) => {
            const { ctrlKey, shiftKey, key } = ev;
            if (ctrlKey && shiftKey && key == targetKey) {
                callback();
            }
        };

        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        };

    }, [targetKey, callback]);
};