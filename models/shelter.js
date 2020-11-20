'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shelter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shelter.hasMany(models.Image)
    }
  };
  Shelter.init({
    name: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    about: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    open_hours: DataTypes.STRING,
    open_on_weekends: DataTypes.BOOLEAN,
    
  }, {
    sequelize,
    modelName: 'Shelter',
  });
  return Shelter;
};