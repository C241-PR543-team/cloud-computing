import { DataTypes } from 'sequelize';
import db from '../database/config.js';
import Locations from './Locations.js';

const Places = db.define('places', {
        place_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(55),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(8633)
        },
        category: {
            type: DataTypes.STRING(18)
        },
        fk_location: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            references: {
                model: 'locations',
                key: 'location_id'                
            }
        },
        coordinate: {
            type: DataTypes.STRING(47)
        },
    },
    {
        tableName: 'places',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Places.belongsTo(Locations, {
    foreignKey: 'fk_location'
});

export default Places;