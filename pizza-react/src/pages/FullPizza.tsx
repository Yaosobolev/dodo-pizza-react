import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type PizzaType = {
  imageUrl: string;
  title: string;
  price: number;
};

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<PizzaType>({
    imageUrl: "",
    title: "",
    price: 0,
  });

  const getPizza = async (): Promise<void> => {
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

  return (
    <>
      {Object.keys(pizza).length !== 0 ? (
        <div className="container">
          <img src={pizza.imageUrl} alt="" />
          <h2>{pizza.title}</h2>
          <h4>{pizza.price}</h4>
        </div>
      ) : (
        <span>Загрузка</span>
      )}
    </>
  );
};

export default FullPizza;
