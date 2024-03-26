const router = require('express').Router();
const { Game, Reply, User, Theme, Answer, Question } = require('../db/models');
const {checkUser, secureRoute} = require('../miiddleWares/common');

router.get('/check_game', async (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    return res.json({
      id: 0,
      createdAt: '',
      balance: 0,
      replies: [],
    });
  }
  try {
    const game = await Game.findOne({
      where: { userId, isFinish: false },
      include: { model: Reply },
    });
    if (game) {
      res.json({
        id: game.id,
        createdAt: `${game.createdAt.toLocaleDateString(
          'Ru-ru',
        )} ${game.createdAt.toLocaleTimeString('Ru-ru')}`,
        balance: game.balance,
        replies: game.Replies,
      });
    } else {
      res.json({
        id: 0,
        createdAt: '',
        balance: 0,
        replies: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/questions', async (req, res) => {
  try {
    const questions = await Theme.findAll({
      include: { model: Question, include: { model: Answer } },
    });
    res.json(questions);
  } catch (error) {
    console.log(error);
  }
});

router.get('/all', checkUser, async (req, res) => {
  try {
    const rawGames = await Game.findAll({
      where: { isFinish: true },
      include: [{ model: User }, { model: Reply }],
    });
    const games = rawGames.map((game) => {
      const replies = game.Replies;
      const correct = replies.filter((el) => el.isCorrect).length;
      const wrong = replies.filter((el) => !el.isCorrect).length;
      return {
        id: game.id,
        createdAt: `${game.createdAt.toLocaleDateString(
          'Ru-ru',
        )} ${game.createdAt.toLocaleTimeString('Ru-ru')}`,
        balance: game.balance,
        username: game.User.username,
        correct,
        wrong,
      };
    });
    res.json(games);
  } catch (error) {
    console.log(error);
  }
});

router.get('/user', checkUser, async (req, res) => {
  const { userId } = req.session;
  try {
    const rawGames = await Game.findAll({
      where: { userId },
      include: { model: Reply, include: { model: Theme } },
    });

    const games = rawGames.map((game) => {
      const themes = game.Replies.reduce((acc, reply) => {
        const { themeName } = reply.Theme;
        const existingTheme = acc.find((theme) => theme.title === themeName);

        if (existingTheme) {
          existingTheme.reply.push(reply.isCorrect);
        } else {
          acc.push({ title: themeName, reply: [reply.isCorrect] });
        }

        return acc;
      }, []).map((theme) => ({
        title: theme.title,
        wrong: theme.reply.filter((reply) => !reply).length,
        correct: theme.reply.filter((reply) => reply).length,
      }));

      return {
        id: game.id,
        createdAt: `${game.createdAt.toLocaleDateString(
          'Ru-ru',
        )} ${game.createdAt.toLocaleTimeString('Ru-ru')}`,
        balance: game.balance,
        themes,
      };
    });
    // console.log(games);
    res.json(games);
  } catch (error) {
    console.log(error);
  }
});

router.patch('/:id', async (req, res) => {
  const { reply, themeId, questionId, cost } = req.body;
  console.log(req.body);
  const gameId = req.params.id;
  try {
    const isCorrect = await Answer.findAll({
      where: { questionId },
      attributes: ['answer'],
    })
      .then((data) => data.map((el) => el.answer.toLowerCase()))
      .then((answers) => answers.includes(reply.toLowerCase()));

    const game = await Game.findByPk(gameId);
    game.balance = isCorrect
      ? game.balance + Number(cost)
      : game.balance - Number(cost);
    await game.save();
    const newReply = await Reply.create({
      gameId,
      themeId,
      questionId,
      isCorrect,
    });
    res.json(newReply);
  } catch (error) {
    console.log(error);
  }
});

router.patch('/end/:id', async (req, res) => {
  const gameId = req.params.id;
  const game = await Game.findByPk(gameId);
  game.isFinish = true;
  await game.save();
  res.json({
    id: 0,
    createdAt: '',
    balance: 0,
    replies: [],
  });
});

router.post('/', async (req, res) => {
  const { userId } = req.session;
  try {
    const game = await Game.create({ userId });
    res.json(game);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
