import {Route, Routes} from 'react-router-dom';
import {Header} from './components/Header/Header';
import {Footer} from './components/Footer/Footer';
import { GamePage } from "./pages/GamePage/GamePage";
import {ThemeBlock} from './components/ThemeBlock/ThemeBlock';
import Authentication from './components/Authentication/Authentication';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {useEffect} from 'react';
import axios from 'axios';
import Actions from './redux/actions';
import Rules from './components/MainRules/MainRules';
import AllStat from './components/AllStat/AllStat';
import Profile from './components/Profile/Profile';
// import UserStat from './components/UserStat/UserStat';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/users/check_session', {withCredentials: true})
      .then((res) => dispatch(Actions.auth(res.data)))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:3000/api/games/check_game', {withCredentials: true})
      .then((res) => dispatch(Actions.createGame(res.data)))
      .catch((err) => console.log(err));

  }, [dispatch]);
  return (
    <>
      <Header />
      <div className="main">
        <Routes>
          <Route
            index
            element={<Rules />}
          />
          <Route path="/games" element={<GamePage />} />
          <Route
            path="/auth"
            element={<Authentication />}
          />
          <Route
            path="/lk/:username"
            element={<Profile />}
            // element={<AllStat />}
          />
          <Route
            path="/stat"
            element={<AllStat />}
            // element={<AllStat />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
