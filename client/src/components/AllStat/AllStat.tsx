import React, {useEffect, useState} from 'react';
import styles from './AllStat.module.css';
import {StatType} from '../../types';
import axios from 'axios';
import OneStat from './OneStat/OneStat';

export default function AllStat() {
  const [stat, setStat] = useState<StatType[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/games/all', {withCredentials: true})
      .then((res) => setStat(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.wraper}>
      {stat.map(el=> <OneStat key={`oneStat-${el.id}`} el={el}/>)}
    </div>
  );
}
