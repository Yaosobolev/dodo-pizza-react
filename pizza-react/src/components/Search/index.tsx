import { useState, useRef, useCallback } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import style from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

import debounce from "lodash.debounce";

export const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");

    inputRef.current?.focus();
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
