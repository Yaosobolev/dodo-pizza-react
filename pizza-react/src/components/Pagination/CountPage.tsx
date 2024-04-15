import { useDispatch, useSelector } from "react-redux";
import { selectFilter, setSelectPage } from "../../redux/slices/filterSlice";

import style from "./CountPage.module.scss";

type CountPageProps = {
  index: number;
  name: number;
};

export const CountPage: React.FC<CountPageProps> = ({ index, name }) => {
  const { selectPage } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const CountPageHandler = (index: number): void => {
    dispatch(setSelectPage(index));
  };

  return (
    <>
      <div
        onClick={() => CountPageHandler(index)}
        className={index === selectPage ? style.selected : style.root}
      >
        {name}
      </div>
    </>
  );
};
