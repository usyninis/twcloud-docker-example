import { DataTypes, type InferAttributes } from 'sequelize';
import { BaseModel } from './base-model';
import { sequelize } from './sequelize';

class BookModel extends BaseModel<BookModel> {
    declare name: string;

    // Автоматически генерируемые типы:
    // - InferAttributes<UserModel> → { id: string, tgId: number, firstName: string, ... }
    // - InferCreationAttributes<UserModel> → { tgId: number, firstName: string, ... } (id опционален)
}

BookModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Book',
        tableName: 'Books',
    },
);

export type BookModelAttributes = InferAttributes<BookModel>;

export { BookModel };
