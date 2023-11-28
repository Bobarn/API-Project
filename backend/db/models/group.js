'use strict';
const { all } = require('bluebird');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.belongsTo(
        models.User,
        {
          foreignKey: 'organizerId'
        }
      )

      Group.hasMany(
        models.Venue,
        {
          foreignKey: 'groupId'
        }
      )

      Group.hasMany(
        models.GroupImage,
        {
          foreignKey: 'groupId',
          onDelete: 'CASCADE',
          hooks: true
        }
      )

      Group.belongsToMany(
        models.User,
        {
          through: models.Membership,
          foreignKey: 'groupId',
          otherKey: 'userId',
          onDelete: 'CASCADE',
          hooks: true
        }
      )

      Group.belongsToMany(
        models.Venue,
        {
          through: models.Event,
          foreignKey: 'groupId',
          otherKey: 'venueId'
        }
      )

    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.VARCHAR,
      allowNull: false,
      validate: {
        len: [4, 100]
      }
    },
    about: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.ENUM('placeholder', 'filler'),
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    city: {
      type: DataTypes.VARCHAR,
      validate: {
        len: [0, 50]
      }
    },
    state: {
      type:DataTypes.VARCHAR,
      validate: {
        len: [0, 50]
      }
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
