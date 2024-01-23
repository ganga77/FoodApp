import { createContext, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    addItem: (item) =>{},
    removeItem: (id) =>{},
    
});

function cartReducer(state, action){

    if(action.type === 'ADD_ITEM'){
        
        //Here we check if the cart has the item
        const existingCartItemIndex = state.items.findIndex(
          (cartItem) => cartItem.id === action.item.id
        );

        const updatedItems = [...state.items];
    
        
        if (existingCartItemIndex > -1) {
            const existingCartItem = state.items[existingCartItemIndex];
  
          const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
          };
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          
          updatedItems.push({
            ...action.item, 
            quantity: 1,
          });
        }
  
        return {
            ...state,
          items: updatedItems,
        };
    }

    if(action.type=== 'REMOVE_ITEM'){
        
        //Here we check if the cart has the item
        const existingCartItemIndex = state.items.findIndex(
          (cartItem) => cartItem.id === action.id
        );

        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
           
        if(existingCartItem.quantity  === 1){
             updatedItems.splice(existingCartItemIndex, 1);
        }else{
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }

            updatedItems[existingCartItemIndex] = updatedItem
        }
        
        return {
            ...state,
          items: updatedItems,
        };
    }

}

export default function CartContextProvider({children}){

    const [shoppingCartState, shoppingCartDispatch] = useReducer(
        cartReducer, 
        {
            items: []
        });

        function addItem(item) {
            shoppingCartDispatch({
                type: 'ADD_ITEM',
                item
            })
            
          }

          function removeItem(id){
            shoppingCartDispatch({
                type: 'REMOVE_ITEM',
                id
            })
          }
    


    const ctxValue = {
        items: shoppingCartState.items,
        addItem,
        removeItem

    }

    console.log(ctxValue.items);
    return <CartContext.Provider value={ctxValue}>
        {children}
      </CartContext.Provider>
}

