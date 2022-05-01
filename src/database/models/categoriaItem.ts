import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const categoriaItem = sequelize.define(
    'categoriaItem',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      
      desc: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      preco: {
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

  categoriaItem.associate = (models) => {

    models.categoriaItem.belongsTo(models.categoria, {
      as: 'categoria',
    });


    models.categoriaItem.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.categoriaItem.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.categoriaItem.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return categoriaItem;
}
