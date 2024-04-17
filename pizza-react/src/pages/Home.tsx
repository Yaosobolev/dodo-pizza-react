import { useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import {
  Pagination,
  Skeleton,
  PizzaBlock,
  Sort,
  Categories,
} from "../components";
import { useSelector } from "react-redux";
import { setCategotiType, setSelectPage } from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { selectPizza } from "../redux/pizza/selectors";
import { fetchCountPage } from "../redux/filter/asyncActions";

const Home: React.FC = () => {
  const { categotiType, sortType, countPages, selectPage, searchValue } =
    useSelector(selectFilter);

  const { Items, status } = useSelector(selectPizza);

  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const onClickCategoriType = useCallback((id: number): void => {
    dispath(setCategotiType(id));
  }, []);
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

  const countPage = useMemo(() => {
    return Math.ceil(countPages / 4);
  }, [countPages]);

  const pizzas = Items.map((pizza: any, index: number) => {
    return <PizzaBlock {...pizza} key={index} />;
  });
  const skeletons = [...new Array(8)].map((_, id) => {
    return <Skeleton key={id} />;
  });
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categotiType={categotiType}
          setCategoriType={onClickCategoriType}
        />
        <Sort value={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удается показать вам наши пиццы</p>
        </div>
      ) : (
        <div className="content__items">
          {status == "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination countPage={countPage} />
    </div>
  );
};

export default Home;
