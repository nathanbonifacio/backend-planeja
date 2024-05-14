import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreateAndUpdateAtUsersTable1715453400691
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users DROP COLUMN created_at`);
    await queryRunner.query(`ALTER TABLE users DROP COLUMN updated_at`);
  }
}
