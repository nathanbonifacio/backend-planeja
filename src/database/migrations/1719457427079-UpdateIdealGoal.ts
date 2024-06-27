import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateIdealGoal1719457427079 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'ideal_goal',
      'financial_controll_id',
      new TableColumn({
        name: 'financial_controll_id',
        type: 'int',
        unsigned: true,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'ideal_goal',
      'financial_controll_id',
      new TableColumn({
        name: 'financial_controll_id',
        type: 'int',
        unsigned: true,
        isNullable: false,
      }),
    );
  }
}
