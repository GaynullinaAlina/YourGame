import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { GameType, User } from "../../types";
import Button from "../Button/Button";
import style from "./Userinfo.module.css";

export default function UserInfo() {
  const user: User = useAppSelector((store) => store.userReducer);
  const game: GameType = useAppSelector((store) => store.gameReducer);
  return (
    <div className={style.userCard}>
      <span>{user.username}</span>
      <span>{user.email}</span>
      <span>Счет: {game.balance}</span>
      {/* <Button title="Редактировать" /> */}
    </div>
  );
}
