import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategotiType,
  setSelectPage,
  selectFilter,
  fetchCountPage,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizza } from "../redux/slices/pizzaSlice";

const Home = () => {
  const { categotiType, sortType, countPages, selectPage, searchValue } =
    useSelector(selectFilter);

  const { Items, status } = useSelector(selectPizza);

  const dispath = useDispatch();
  const navigate = useNavigate();

  const onClickCategoriType = (id) => {
    dispath(setCategotiType(id));
  };
  const handleSearch = searchValue ? `&search=${searchValue}` : "";
  const getSortField = (index) =>
    ["rating", "price", "title"][index] || "title";

  const getPizza = async (pagination) => {
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
        <Sort sortType={sortType} />
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
            : Items.map((pizza, index) => {
                return (
                  // <Link to={`/pizza/${pizza.id}`} key={index}>
                  <PizzaBlock {...pizza} key={index} />
                  // </Link>
                );
              })}
        </div>
      )}

      <Pagination
        countPage={
          countPages.length % 4 === 0
            ? countPages.length / 4
            : countPages.length / 4 + 0.5
        }
      />
    </div>
  );
};

export default Home;
// Все пиццы
