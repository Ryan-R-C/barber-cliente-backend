import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const socialMedia = sequelize.define(
    'socialMedia',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      facebook: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      instagram: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      whatsapp: {
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

  socialMedia.associate = (models) => {
    models.socialMedia.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.socialMedia.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.socialMedia.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return socialMedia;
}
