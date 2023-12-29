import React from "react";
import q from "lodash";

export const TEXT = () => {
  const arr = [
    { name: "Элемент 1", type: "Тип 1", count: 10 },
    { name: "Элемент 1", type: "Тип 1", count: 20 },
    { name: "Элемент 2", type: "Тип 2", count: 30 },
    { name: "Элемент 2", type: "Тип 2", count: 40 },
  ];

  // const maxCountElements = uniqueArr.filter(
  //   (obj) => obj.count === q.maxBy(uniqueArr, "count").count
  // );

  // const maxCountElements = q
  //   .chain(arr)
  //   .orderBy("count", "desc")
  //   .uniqWith((obj1, obj2) => {
  //     return obj1.name === obj2.name && obj1.type === obj2.type;
  //   });

  //   .value();
  const sort = q.orderBy(arr, "count", "desc");
  const uniqueArr = q.uniqWith(sort, (obj1, obj2) => {
    return obj1.name === obj2.name && obj1.type === obj2.type;
  });
  console.log(uniqueArr); // [{ name: "Элемент 1", type: "Тип 1", count: 20 }, { name: "Элемент 2", type: "Тип 2", count: 40 }]

  // console.log(uniqueArr); // [{ name: "Элемент 1", type: "Тип 1", count: 20 }, { name: "Элемент 2", type: "Тип 2", count: 40 }]
  // console.log(maxCountElements); // [{ name: "Элемент 1", type: "Тип 1", count: 20 }, { name: "Элемент 2", type: "Тип 2", count: 40 }]
  return <div>при</div>;
};
