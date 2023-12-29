import React from "react";

import style from "./Pagination.module.scss";
import { CountPage } from "./CountPage";

export const Pagination = (props) => {
  const array = new Array(props.countPage).fill().map((_, i) => {
    return i + 1;
  });

  return (
    <div className={style.root}>
      {array.map((item, index) => {
        return <CountPage name={item} key={index} index={index + 1} />;
      })}
    </div>
  );
};
