const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Garden extends Model {}
//,id,name,name_scientific,description,itis_id,wikipedia_id,wikipedia_id.1,picture_content_type,picture_file_size,picture_updated_at,legacy_id,food_group,food_subgroup,food_type,created_at,updated_at,creator_id,updater_id,export_to_afcdb,category,ncbi_taxonomy_id,export_to_foodb
Garden.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_scientific: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    food_group: {
      type: DataTypes.STRING,
    },
    food_subgroup: {
      type: DataTypes.STRING,
    },
    food_type: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'garden',
  }
);

module.exports = Garden;
