import { DataTypes } from 'sequelize';
import db from '../database/config.js';

const Users = db.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true // Assuming user_id is an auto-increment field
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'users', // Specify the table name
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// db.sync();

export default Users;