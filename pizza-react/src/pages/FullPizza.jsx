import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState({});

  const getPizza = async () => {
    const { data } = await axios.get(
      `https://65341c62e1b6f4c5904691be.mockapi.io/items/${id}`
    );
    setPizza(data);
  };
  useEffect(() => {
    try {
      getPizza();
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(pizza);
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
