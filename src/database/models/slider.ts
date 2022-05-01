import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const slider = sequelize.define(
    'slider',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ordem: {
        type: DataTypes.TEXT,
      },
      
      imagem: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      texto: {
        type: DataTypes.TEXT,
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

  slider.associate = (models) => {
    models.slider.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.slider.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.slider.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return slider;
}
