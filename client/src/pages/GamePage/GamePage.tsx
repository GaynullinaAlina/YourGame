import {useEffect} from 'react';
import {ThemeBlock} from '../../components/ThemeBlock/ThemeBlock';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {GameType, ITheme} from '../../types';
import Actions from '../../redux/actions';
import axios from 'axios';
import styles from './GamePage.module.css';
// import axios from "axios";

export const GamePage: React.FC = () => {
  const themes = useAppSelector((store) => store.questionReducer.themes);
  const game: GameType = useAppSelector((store) => store.gameReducer);
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userReducer);
  // useEffect(() => {
  //   // axios
  //   //   .get("http://localhost:3000/api/games/questions")
  //   Promise.resolve({ data: themesArr })
  //     .then((res) => {
  //       dispatch(Actions.initThemes(res.data));
  //     })
  //     .catch((err) => console.log(err));
  // }, [dispatch]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/games/questions')
      .then((res) => dispatch(Actions.initThemes(res.data)))
      // .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    console.log('RERENDER');
    if (user.id && !game.id) {
      axios
        .post('http://localhost:3000/api/games/', {}, {withCredentials: true})
        .then((res) => dispatch(Actions.createGame(res.data)))
        .catch((err) => console.log(err));
    }
    dispatch(Actions.changeStatus(true));
    return () => {
      dispatch(Actions.changeStatus(false));
    };
  }, []);
  console.log(themes);

  return (
    <div className={styles.field}>
      {!!themes?.length &&
        themes.map((theme: ITheme) => {
          return (
            <ThemeBlock
              key={theme.id}
              theme={theme}
            />
          );
        })}
    </div>
  );
};
