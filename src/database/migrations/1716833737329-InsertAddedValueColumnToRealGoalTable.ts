import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class InsertAddedValueColumnToRealGoalTable1716833737329
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'real_goal',
      new TableColumn({
        name: 'added_value',
        type: 'double',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('real_goal', 'added_value');
  }
}
