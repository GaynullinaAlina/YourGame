import React, { useEffect, useState } from "react";
import styles from "./UserStat.module.css";
import { UserStatType } from "../../types";
import axios from "axios";
import OneStat from "./UserOneStat/UserOneStat";

export default function AllStat() {
  const [stat, setStat] = useState<UserStatType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/games/user", { withCredentials: true })
      .then((res) => setStat(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.wraper}>
      {stat.map((el) => (
        <OneStat key={`oneStat-${el.id}`} el={el} />
      ))}
    </div>
  );
}
