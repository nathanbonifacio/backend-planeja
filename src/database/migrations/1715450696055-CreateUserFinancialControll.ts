import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserFinancialControll1715352591304
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'financial_controll',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'identity',
            isGenerated: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
            unsigned: true,
          },
          {
            name: 'income',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'fixed_expenses',
            type: 'double',
            isNullable: true,
          },
          {
            name: 'variable_expenses',
            type: 'double',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            onUpdate: 'now()',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('financial_controll', true);
  }
}
