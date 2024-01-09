import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCategotiType, setSelectPage } from "../redux/slices/filterSlice";
import { setCountPages } from "../redux/slices/filterSlice";

import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categotiType = useSelector((state) => state.filter.categotiType);
  const sortType = useSelector((state) => state.filter.sortType);
  const countPages = useSelector((state) => state.filter.countPages);
  const selectPage = useSelector((state) => state.filter.selectPage);
  const searchValue = useSelector((state) => state.filter.searchValue);

  const dispath = useDispatch();
  const navigate = useNavigate();

  const onClickCategoriType = (id) => {
    dispath(setCategotiType(id));
  };
  // console.log(searchValue);
  const handleSearch = searchValue ? `&search=${searchValue}` : "";
  const Sortw = (index) => {
    if (index === 0) return "rating";
    else if (index === 1) return "price";
    else return "title";
  };
  const coutPageUrl = `https://65341c62e1b6f4c5904691be.mockapi.io/items?`;
  useEffect(() => {
    axios.get(coutPageUrl).then((res) => dispath(setCountPages(res.data)));
  }, []);

  const pizza = `https://65341c62e1b6f4c5904691be.mockapi.io/items?&page=${selectPage}&limit=4&${
    categotiType > 0 ? `category=${categotiType}` : ""
  }&sortBy=${Sortw(sortType)}&order=desc${handleSearch}`;

  useEffect(() => {
    setIsLoading(true);
    axios.get(pizza).then((res) => {
      setItems(res.data);
      setIsLoading(false);
      window.scrollTo(0, 0);
      // setNumberPage(1);
      dispath(setSelectPage(1));
    });
  }, [categotiType, sortType, searchValue]);

  useEffect(() => {
    setIsLoading(true);

    axios.get(pizza).then((res) => {
      setItems(res.data);
      setIsLoading(false);
      window.scrollTo(0, 0);
    });
  }, [selectPage]);

  useEffect(() => {
    const querryString = qs.stringify({
      categotiType,
      sortType: Sortw(sortType),
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

      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, id) => {
              return <Skeleton key={id} />;
            })
          : items.map((pizza, index) => {
              return <PizzaBlock key={index} index={index} {...pizza} />;
            })}
      </div>
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
