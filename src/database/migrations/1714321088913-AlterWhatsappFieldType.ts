import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterWhatsappFieldType1714321088913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users MODIFY whatsapp VARCHAR(12)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users MODIFY whatsapp INT');
  }
}
