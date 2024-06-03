import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveWhatsappColumn1717362699149 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'whatsapp');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'whatsapp',
        type: 'varchar',
        isUnique: true,
        isNullable: false,
      }),
    );
  }
}
