import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { useSelector } from "react-redux";
import {
  setCategotiType,
  setSelectPage,
  selectFilter,
  fetchCountPage,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizza } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const { categotiType, sortType, countPages, selectPage, searchValue } =
    useSelector(selectFilter);

  const { Items, status } = useSelector(selectPizza);

  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const onClickCategoriType = (id: number): void => {
    dispath(setCategotiType(id));
  };
  const handleSearch = searchValue ? `&search=${searchValue}` : "";
  const getSortField = (index: number): string =>
    ["rating", "price", "title"][index] || "title";

  const getPizza = async (pagination: boolean): Promise<void> => {
    dispath(
      fetchPizzas({
        selectPage,
        categotiType,
        sortType,
        handleSearch,
      })
    );
    window.scrollTo(0, 0);
    pagination && dispath(setSelectPage(1));
  };

  useEffect(() => {
    dispath(fetchCountPage());
  }, []);

  useEffect(() => {
    getPizza(true);
  }, [categotiType, sortType, searchValue]);

  useEffect(() => {
    getPizza(false);
  }, [selectPage]);

  useEffect(() => {
    const querryString = qs.stringify({
      categotiType,
      sortType: getSortField(sortType),
      selectPage,
    });
    navigate(`?${querryString}`);
  }, [categotiType, sortType, selectPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categotiType={categotiType}
          setCategoriType={onClickCategoriType}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удается показать вам наши пиццы</p>
        </div>
      ) : (
        <div className="content__items">
          {status == "loading"
            ? [...new Array(8)].map((_, id) => {
                return <Skeleton key={id} />;
              })
            : Items.map((pizza: any, index: number) => {
                return <PizzaBlock {...pizza} key={index} />;
              })}
        </div>
      )}

      <Pagination countPage={Math.ceil(countPages / 4)} />
    </div>
  );
};

export default Home;
// Все пиццы
