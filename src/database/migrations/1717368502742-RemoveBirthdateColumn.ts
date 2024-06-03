import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveBirthdateColumn1717368502742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'birthdate');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'birthdate',
        type: 'date',
        isNullable: false,
      }),
    );
  }
}
