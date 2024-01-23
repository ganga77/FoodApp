import { useEffect, useState, useCallback } from "react";
import MealItem from "./MealItem";

export default function Meals(){
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchMeals = useCallback(async()=>{
        setIsLoading(true)
        setError(null)
        try{
            const response = await fetch('http://localhost:3000/meals')

            if(!response.ok){
                throw new Error('Something went wrong!')
            }

            const data = await response.json();


            setMeals(data)
            
                }catch(error){
                    setError(error.message)
                }

        
    }, [])

    useEffect(()=>{
        fetchMeals();
    }, [fetchMeals])


    return (
        <>
        <ul id="meals">
            {meals.map(e =>(
                <MealItem key={e.id} meal={e}/>
            ))}
        </ul>
            </>
    )

}