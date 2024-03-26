import {useEffect, useState} from 'react';
import {GameType, IQuestion, ReplyType} from '../../../types';
import Button from '../../Button/Button';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import axios from 'axios';
import Actions from '../../../redux/actions';
import styles from './QuestionModal.module.css';

export type QuestionModalPropsType = {
  question: IQuestion;
  closeModal: () => void;
};
export const QuestionModal: React.FC<QuestionModalPropsType> = ({question, closeModal}) => {
  const [input, setInput] = useState('');
  const [intervaSt, setIntervalSt] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  // const [answered, setAnswered] = useState(false)
  const dispatch = useAppDispatch();
  const game: GameType = useAppSelector((store) => store.gameReducer);
  // console.log(question);

  const [timeLeft, setTimeLeft] = useState(30);
  const totalTime = 30; // Общее время в секундах
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    setIntervalSt(interval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!timeLeft) {
      sendAnswerHandler()
    }
  }, [timeLeft]);

  // console.log(input)
  // console.log('time',timeLeft)
  const sendAnswerHandler = async () => {
    const reply: ReplyType = await axios
      .patch(
        `http://localhost:3000/api/games/${game.id}`,
        {
          reply: input,
          cost: question.cost,
          themeId: question.themeId,
          questionId: question.id,
        },
        {withCredentials: true}
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
    dispatch(
      Actions.changeBalance(
        reply.isCorrect ? game.balance + question.cost : game.balance - question.cost
      )
    );
    dispatch(Actions.addReply(reply));
    setAnswerStatus(reply.isCorrect);
    setAnswers(question.Answers.map((el) => el.answer));
    clearInterval(intervaSt);
    console.log(reply);
  };

  return (
    <div
      className={styles.modal}
      style={{
        background: !answers.length
          ? 'linear-gradient(to bottom right, #3B3FDE 0%, #090B6D 100%)'
          : answerStatus
          ? 'linear-gradient(to bottom right, #1D9947 0%, #05722A 100%)'
          : 'linear-gradient(to bottom right, #991D1D 0%, #710B0B 100%)',
      }}>
      <h2 className={styles.text}>{question.text}</h2>
      {answers.length === 0 && (
        <div className={styles.progress}>
          <h4>{`Осталось: ${timeLeft} сек.`}</h4>
          <div className={styles.progressEmpty}>
            <div
              className={styles.progressFill}
              style={{
                width: `${((totalTime - timeLeft) / totalTime) * 100}%`,
              }}></div>
          </div>
        </div>
      )}
      <div className={styles.inputBtn}>
        {answers.length ? (
          <>
            <h1>Ответ {answerStatus ? '' : 'не'} верный</h1>
            {!answerStatus && <h3>Правильный ответ: {answers[0]}</h3>}
            <Button
              onClick={() => void closeModal()}
              title={'Продолжить'}
            />
          </>
        ) : (
          <>
            <input
              onChange={(e) => changeHandler(e)}
              name="reply"
              value={input}
            />
            <Button
              onClick={() => void sendAnswerHandler()}
              title={'Ответить'}
            />
          </>
        )}
      </div>
    </div>
  );
};
