import React from "react";
import { StatType } from "../../../types";

type OneStatProps = {
  el: StatType;
};

export default function OneStat({ el }: OneStatProps) {
  return (
    <div>
      <h5>{el.createdAt}</h5>
      <p>
        {el.username}: правильных ответов: {el.correct} не правильных ответов:{" "}
        {el.wrong}
      </p>
      <p>счет за игру: {el.balance}</p>
      <hr />
    </div>
  );
}
