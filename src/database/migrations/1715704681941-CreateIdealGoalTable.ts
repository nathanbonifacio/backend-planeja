import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateIdealGoalTable1715704681941 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ideal_goal',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'identity',
            isGenerated: true,
          },
          {
            name: 'financial_controll_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'goal_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'total_value',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'monthly_value',
            type: 'double',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'end_date',
            type: 'date',
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
            columnNames: ['financial_controll_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'financial_controll',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ideal_goal', true);
  }
}
