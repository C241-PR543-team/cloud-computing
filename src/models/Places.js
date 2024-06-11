import { Sequelize, DataTypes } from 'sequelize';
import db from '../database/config.js';

const Places = db.define('places', {
    place_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    place: {

    },
    description: {

    },
    city: {

    },
    price: {
      
    }
});