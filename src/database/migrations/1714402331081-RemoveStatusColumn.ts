import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveStatusColumn1714402331081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'status');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'status',
        type: 'enum',
        isNullable: false,
      }),
    );
  }
}
