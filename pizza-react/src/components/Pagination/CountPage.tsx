import { useSelector } from "react-redux";
import { selectFilter, setSelectPage } from "../../redux/slices/filterSlice";

import style from "./CountPage.module.scss";
import { useAppDispatch } from "../../redux/store";

type CountPageProps = {
  index: number;
  name: number;
};

export const CountPage: React.FC<CountPageProps> = ({ index, name }) => {
  const { selectPage } = useSelector(selectFilter);
  const dispatch = useAppDispatch();

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
