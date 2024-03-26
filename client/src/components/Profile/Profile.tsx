import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import UserStat from "../UserStat/UserStat";
import style from "./Profile.module.css";

export default function Profile() {
  return (
    <div className={style.box}>
      <span className={style.span}>Статистика</span>
      <div className={style.container}>
        <UserInfo />
        <UserStat />
      </div>
    </div>
  );
}
