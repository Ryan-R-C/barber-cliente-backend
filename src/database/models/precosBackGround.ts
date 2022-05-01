import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const precosBackGround = sequelize.define(
    'precosBackGround',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      
      backgroundWide: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      
      backgroundMobile: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,    
        validate: {
          len: [0, 255],
        },    
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },
      ],
      timestamps: true,
      paranoid: true,
    },
  );

  precosBackGround.associate = (models) => {
    models.precosBackGround.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.precosBackGround.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.precosBackGround.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return precosBackGround;
}
