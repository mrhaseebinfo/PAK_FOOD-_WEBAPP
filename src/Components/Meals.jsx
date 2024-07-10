import React, { useEffect, useState } from "react";
import MealsItem from "./MealsItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

// custom Hooks
const requestConfig = {};

export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([]);

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals....</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals " message={error} />;
  }

  //

  // if(!data){
  //   return <p>No meals found.</p>
  // }

  // useEffect(() => {
  //   async function fetchMeals() {
  //     const response = await fetch("http://localhost:3000/meals");

  //     if (!response.ok) {
  //       //...
  //     }
  //     const meals = await response.json();
  //     setLoadedMeals(meals);
  //   }

  //   fetchMeals();
  // }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealsItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
