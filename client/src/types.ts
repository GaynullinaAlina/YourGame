export type User = {
  userId?: number;
  username?: string;
  email?: string;
  password?: string;
};

  export interface IQuestion {
  id: number;
  themeId: number;
  text: string;
  cost: number;
  Answers: AnswerType[]
}

export type AnswerType = {
  id: number;
  answer: string;
}

export interface ITheme {
  id: number;
  themeName: string;
  Questions: QuestionsType;
}

export type QuestionsType = IQuestion[];

export type ReplyType = {
  id: number;
  themeId: number;
  questionId: number;
  isCorrect: boolean;
};

export type GameType = {
  id: number;
  createdAt: string;
  balance: number;
  replies: ReplyType[];
  isActive?: boolean;
};

export type StatType = {
  id: number;
  createdAt: string;
  balance: number;
  username: string;
  correct: number;
  wrong: number;
};

export type UserStatType = {
  id: number;
  createdAt: string;
  balance: number;
  themes: [
    {
      title: string;
      correct: number;
      wrong: number;
    }
  ];
};

