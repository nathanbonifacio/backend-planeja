import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreateAndUpdateAtFinancialControllTable1715452966616
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE financial_controll ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE financial_controll ADD COLUMN updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE financial_controll DROP COLUMN created_at`,
    );
    await queryRunner.query(
      `ALTER TABLE financial_controll DROP COLUMN updated_at`,
    );
  }
}
