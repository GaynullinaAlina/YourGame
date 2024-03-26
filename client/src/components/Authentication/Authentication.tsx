import React, {useState} from 'react';
import Button from '../Button/Button';
import {User} from '../../types';
import axios from 'axios';
// import { initialState } from '../../redux/userReducer'
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import Actions from '../../redux/actions';
import {useNavigate} from 'react-router-dom';
import style from './Authentication.module.css';
import LinkBtn from '../../LinkBtn/LinkBtn';

export default function Authentication(): JSX.Element {
  const initialState = {email: '', password: ''};
  const [inputs, setInputs] = useState<User>(initialState);
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setErrors] = useState('');
  const navigate = useNavigate();

  const user = useAppSelector((store) => store.userReducer);

  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const authHandler = () => {
    setIsLogin((prev) => !prev);
    setErrors('')
    setInputs(initialState);
  };
  const addUserHandler = async (): Promise<void> => {
    // console.log(message);
    try {
      const res = await axios.post(
        `http://localhost:3000/api/users/${!isLogin ? 'register' : 'login'}`,
        inputs,
        {withCredentials: true}
      );
      console.log(res);

      if (res.status === 201) {
        setMessage('Вы успешно зарегистрированы!');
        dispatch(Actions.auth(res.data));
        axios
          .get('http://localhost:3000/api/games/check_game', {withCredentials: true})
          .then((res) => dispatch(Actions.createGame(res.data)))
          .catch((err) => console.log(err));
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
      if (res.status === 200) {
        setMessage('Вы успешно авторизованы!');
        dispatch(Actions.auth(res.data));
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 401) {
        setErrors(error.response.data.err);
      }
    }
  };

  return (
    <form className={style.form}>
      {!isLogin && (
        <>
          <label htmlFor="inp1">username</label>
          <input
            onChange={changeHandler}
            id="inp1"
            name="username"
            type="text"
            required
            value={inputs.username}
          />
        </>
      )}
      <label htmlFor="inp2">email</label>
      <input
        onChange={changeHandler}
        id="inp2"
        name="email"
        type="text"
        required
        value={inputs.email}
      />

      <label htmlFor="inp3">password</label>
      <input
        onChange={changeHandler}
        id="inp3"
        name="password"
        type="password"
        required
        value={inputs.password}
      />
      <>
        <Button
          onClick={() => void addUserHandler()}
          title={isLogin ? 'Авторизоваться' : 'Зарегистрироваться'}
        />
        <LinkBtn
          onClick={() => void authHandler()}
          title={isLogin ? 'Хочу зарегистрироваться' : 'Уже зарегистрирован?'}
        />
      </>
      {message && <p style={{color: '#1D9947'}}>{message}</p>}
      {error && <p style={{color: '#fa6a6a'}}>{error}</p>}
    </form>
  );
}
