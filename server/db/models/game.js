'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.hasMany(models.Reply, { foreignKey: 'gameId' });
    }
  }
  Game.init(
    {
      userId: DataTypes.INTEGER,
      balance: DataTypes.INTEGER,
      isFinish: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Game',
    },
  );
  return Game;
};
