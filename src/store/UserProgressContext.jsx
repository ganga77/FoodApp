// This context is used for showing Modal. This will be used in open value of Modal.jsx
import { createContext, useState } from "react";

export const UserProgressContext = createContext({
    progress: '', // 'cart' , 'checkout',
    showCart: () =>{},
    hideCart: () =>{},
    showCheckout: () =>{},
    hideCheckout: () =>{}
})

export function UserProgressContextProvider({children}){

    const [userProgress, setUserProgress] = useState('')

    function showCart(){
        setUserProgress('cart');
    }

    function hideCart(){
        setUserProgress('')
    }

    function showCheckout(){
        setUserProgress('checkout')
    }

    function hideCheckout(){
        setUserProgress('')
    }

    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return <UserProgressContext.Provider value={userProgressCtx}>
        {children}
    </UserProgressContext.Provider>
}