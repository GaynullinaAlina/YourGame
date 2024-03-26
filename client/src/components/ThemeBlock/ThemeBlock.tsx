import {useAppSelector} from '../../redux/hooks';
import {GameType, IQuestion, ITheme} from '../../types';
import {QuestionCard} from '../QuestionCard/QuestionCard';
import styles from './ThemeBlock.module.css';

export type ThemePropsType = {
  theme: ITheme;
};

export const ThemeBlock: React.FC<ThemePropsType> = ({theme}) => {
  const game: GameType = useAppSelector((store) => store.gameReducer);
  // console.log(game)
  return (
    <div className={styles.themeBlock}>
      <div className={styles.themeName}>{theme.themeName}</div>
      {theme.Questions?.map((question: IQuestion) => (
        <QuestionCard
          key={question.id}
          question={question}
          answered={!!game.replies?.find(el => el.questionId === question.id)}
        />
      ))}
    </div>
  );
};
