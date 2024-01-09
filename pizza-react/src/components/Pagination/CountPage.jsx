import { useDispatch, useSelector } from "react-redux";
import { setSelectPage } from "../../redux/slices/filterSlice";

import style from "./CountPage.module.scss";

export const CountPage = (props) => {
  const selectPage = useSelector((state) => state.filter.selectPage);
  const dispatch = useDispatch();

  const CountPageHandler = (index) => {
    dispatch(setSelectPage(index));
  };

  return (
    <>
      <div
        onClick={(index) => CountPageHandler(props.index)}
        className={props.index === selectPage ? style.selected : style.root}
      >
        {props.name}
      </div>
    </>
  );
};
