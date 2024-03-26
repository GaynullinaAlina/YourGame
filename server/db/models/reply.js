'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Game, { foreignKey: 'gameId' });
      this.belongsTo(models.Theme, { foreignKey: 'themeId' });
      this.belongsTo(models.Question, { foreignKey: 'questionId' });
    }
  }
  Reply.init(
    {
      gameId: DataTypes.INTEGER,
      themeId: DataTypes.INTEGER,
      questionId: DataTypes.INTEGER,
      isCorrect: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Reply',
    },
  );
  return Reply;
};
