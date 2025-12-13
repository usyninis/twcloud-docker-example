import {
    type CreationOptional,
    type InferAttributes,
    type InferCreationAttributes,
    Model,
} from 'sequelize';

// Базовый класс для всех моделей
export class BaseModel<T extends Model> extends Model<
    InferAttributes<T>,
    InferCreationAttributes<T>
> {
    // Общие поля для всех моделей
    declare id: CreationOptional<string>;

    declare createdAt: CreationOptional<Date>;

    declare updatedAt: CreationOptional<Date>;

    // Общие методы...
}
