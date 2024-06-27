import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeFinancialControllTable1719355438000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('financial_controll', 'fixed_expenses');

    await queryRunner.dropColumn('financial_controll', 'variable_expenses');

    await queryRunner.addColumn(
      'financial_controll',
      new TableColumn({
        name: 'expenses',
        type: 'double',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('financial_controll', 'expenses');

    await queryRunner.addColumn(
      'financial_controll',
      new TableColumn({
        name: 'fixed_expenses',
        type: 'double',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'financial_controll',
      new TableColumn({
        name: 'variable_expenses',
        type: 'double',
        isNullable: false,
      }),
    );
  }
}
