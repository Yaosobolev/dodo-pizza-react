import {
  React,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import style from "./Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

import debounce from "lodash.debounce";

export const Search = () => {
  const searchValue = useSelector((state) => state.filter.searchValue);
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };
  return (
    <div className={style.root}>
      <BsSearch className={style.icon} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={style.input}
        placeholder={"Поиск пицы"}
      />
      {value && (
        <AiOutlineClose
          onClick={() => onClickClear()}
          className={style.closeIcon}
        />
      )}
    </div>
  );
};
// "Поиск пиццы
