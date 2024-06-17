import { Sequelize, DataTypes } from "sequelize";
import db from '../database/config.js';

const Locations = db.define('locations', {
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tableName: 'locations',
    createdAt: 'created_at',
    updatedAt: 'updated_at'    
});

db.sync();

export default Locations;