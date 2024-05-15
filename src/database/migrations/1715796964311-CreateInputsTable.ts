import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInputsTable1715796964311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inputs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'identity',
            isGenerated: true,
          },
          {
            name: 'date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'observations',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'real_goal_id',
            type: 'int',
            isNullable: false,
            unsigned: true,
          },
          {
            name: 'financial_controll_id',
            type: 'int',
            isNullable: false,
            unsigned: true,
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
            columnNames: ['real_goal_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'real_goal',
          },
          {
            columnNames: ['financial_controll_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'financial_controll',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('inputs', true);
  }
}
