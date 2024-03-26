import {Link, useNavigate} from 'react-router-dom';
import style from './Header.module.css';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import axios from 'axios';
import Actions from '../../redux/actions';
import {GameType, User} from '../../types';
import LinkBtn from '../../LinkBtn/LinkBtn';
import logo from '../../../public/лого.png'

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: User = useAppSelector((store) => store.userReducer);
  const game: GameType = useAppSelector((store) => store.gameReducer);
  // console.log(user);
  const logoutHandler = async (): Promise<void> => {
    const res = await axios.get('http://localhost:3000/api/users/logout', {withCredentials: true});
    console.log(res);
    if (res.status === 200) {
      dispatch(Actions.logOut());
    }
  };

  const endGameHandler = async () => {
    axios
      .patch(`http://localhost:3000/api/games/end/${game.id}`, {}, {withCredentials: true})
      .then((res) => dispatch(Actions.endGame(res.data)))
      .catch((err) => console.log(err));
    dispatch(Actions.changeStatus(false));
  };

  return (
    <div className={style.header}>
      <img className={style.logo} src={logo} alt="logo"/>
      <div className={style.rightBlock}>
        <Link
          className={style.link}
          to="/">
          Правила игры
        </Link>
        {user.username ? (
          <>
            {game.isActive ? (
              <Link
                className={style.link}
                to={`/lk/${user.username}`}
                onClick={endGameHandler}>
                Завершить игру
              </Link>
            ) : (
              <Link
                className={style.link}
                to="/games">
                {game.id ? 'Продолжить игру' : 'Играть'}
              </Link>
            )}
            <Link
              className={style.link}
              to="/stat">
              Статистика
            </Link>
            <Link
              className={style.link}
              to={`lk/${user.username}`}>
              {user.username}
            </Link>
            {game.isActive && <div style={{paddingLeft: '20px'}}>Счет: {game.balance}</div>}
            <Link
              className={style.link}
              to="/"
              onClick={() => void logoutHandler()}>
              Выйти
            </Link>
          </>
        ) : (
          <Link
            className={style.link}
            to="/auth">
            Войти
          </Link>
        )}
      </div>
    </div>
  );
};
