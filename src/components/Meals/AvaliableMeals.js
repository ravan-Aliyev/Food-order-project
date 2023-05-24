import { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvaliableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = function () {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          "https://costom-hooks-learning-default-rtdb.firebaseio.com/meals.json"
        );

        if (!res.ok) throw new Error();

        const data = await res.json();

        const mealsData = [];

        for (const key in data) {
          mealsData.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(mealsData);
      } catch (error) {
        setError(true);
      }
    };

    fetchMeals();
  }, []);

  if (error) {
    return (
      <h1 style={{ color: "white", width: "100%", textAlign: "center" }}>
        You have error
      </h1>
    );
  }

  const mealsList = meals.map((meals) => {
    return (
      <MealItem
        id={meals.id}
        key={meals.id}
        name={meals.name}
        description={meals.description}
        price={meals.price}
      />
    );
  });

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList.length === 0 ? <p>Loading...</p> : mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
