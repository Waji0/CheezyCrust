// import { persistor }from "../store/store.js";


// export const onStoreReady = async () => {
//     return new Promise((resolve) => {
//         const interval = setInterval(() => {
//             if(persistor.getState().bootStrapped) {
//                 clearInterval(interval);
//                 resolve(null);
//             }
//         }, 500);
//     });
// } 


// src/utils/on-store-ready.js
import { persistor } from "../store/store.js";

export const onStoreReady = () => {
  return new Promise((resolve) => {
    if (persistor.getState().bootstrapped) {
      resolve(); // Already ready
      return;
    }

    const unsubscribe = persistor.subscribe(() => {
      if (persistor.getState().bootstrapped) {
        unsubscribe(); // Clean up listener
        resolve();
      }
    });
  });
};
