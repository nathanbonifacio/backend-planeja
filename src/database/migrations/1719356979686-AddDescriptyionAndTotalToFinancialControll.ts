import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDescriptyionAndTotalToFinancialControll1719356979686
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'financial_controll',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'financial_controll',
      new TableColumn({
        name: 'total',
        type: 'double',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('financial_controll', 'description');
    await queryRunner.dropColumn('financial_controll', 'total');
  }
}
