import React from 'react';
import {UserStatType} from '../../../types';

type OneStatProps = {
  el: UserStatType;
};

export default function OneStat({el}: OneStatProps) {
  return (
    <div>
      <h5>{el.createdAt}</h5>
      {el.themes.map((theme, index) => (
        <p key={`theme-${el.id}-${index}`}>
          {theme.title}: правильных ответов: {theme.correct} не правильных ответов: {theme.wrong}
        </p>
      ))}
      <p>счет за игру: {el.balance}</p>
	  <hr />
    </div>
  );
}
