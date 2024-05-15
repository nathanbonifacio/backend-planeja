import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRealGoalTable1715793438578 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'real_goal',
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
            name: 'ideal_goal_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
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
            columnNames: ['ideal_goal_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ideal_goal',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('real_goal', true);
  }
}
