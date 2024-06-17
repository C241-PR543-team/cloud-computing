import { Sequelize, DataTypes } from 'sequelize';
import db from '../database/config.js';

const Places = db.define('places', {
    place_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    place_name: {
        type: DataTypes.STRING(55),
        allowNull: false,
    },
    description: {

    },
    city: {

    },
    
    tableName: 'places',
    createdAt: 'created_at',
    updatedAt: 'updated_at'   
});