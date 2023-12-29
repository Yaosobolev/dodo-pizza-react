import React from "react";

import style from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div className={style.root}>
      <span>:)</span>
      <br />
      <h1>Ничего не найдено</h1>
      <p className={style.description}>
        К сожалению данная страница отсутсвует в нашем магазине
      </p>
    </div>
  );
};
