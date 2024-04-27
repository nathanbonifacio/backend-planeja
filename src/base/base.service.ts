/* eslint-disable prettier/prettier */
import { BadRequestException } from "@nestjs/common";
import { FindOptionsRelations, Repository } from "typeorm";

export interface Options {
    qtd?: number;
    fromItem?: number;
    orderField?: string;
    orderDirection?: string;
}

export abstract class BaseService<EntityType> {
    constructor(protected repository: Repository<EntityType>) {}

    async all(options: Options = {}): Promise<EntityType[]> {
        const where = {};
    
        return await this.repository.find({
          where: where,
          take: options?.qtd ? options.qtd : null,
          skip: options?.fromItem ? options.fromItem : null,
        });
      }

      async find(_id: number): Promise<EntityType> {
        return await this.repository
          .createQueryBuilder()
          .where('id = :id', { id: _id })
          .getOne();
      }
    
      async create(object: any) {
        return this.repository.save(object);
      }
    
      async update(
        _id: number,
        object: Partial<{
          [K in keyof EntityType]: any;
        }>,
      ): Promise<EntityType> {
        await this.repository.update(_id, object);
    
        return this.find(_id);
      }
    
      async count(
        object: Partial<{
          [K in keyof EntityType]: any;
        }>,
      ): Promise<number> {
        return this.repository.countBy(object);
      }
    
    async delete(_id: number) {
        return await this.repository
          .createQueryBuilder()
          .delete()
          .where('id = :id', { id: _id })
          .execute();
    }

      async findByName(name: string): Promise<EntityType> {
        return await this.repository
          .createQueryBuilder()
          .where('name = :id', { name })
          .getOne();
    }
    
      async _checkExists(_id: number): Promise<boolean> {
        const data = await this.repository
          .createQueryBuilder()
          .select('id')
          .where('id = :id', { id: _id })
          .getRawMany();
    
        if (data.length === 0) {
          return false;
        }
    
        return true;
    }
    
      async _getByParams(
        params: Partial<{
          [K in keyof EntityType]: any;
        }>,
        includes?: string[],
      ): Promise<EntityType> {
        const relations = this.buildRelationsForSearch(includes);
        return this.repository.findOne({
          where: params,
          relations,
        });
    }
    
      async _getAllByParams(
        params: Partial<{
          [K in keyof EntityType]: any;
        }>,
        includes?: string[],
      ): Promise<EntityType[]> {
        const relations = this.buildRelationsForSearch(includes);
        return this.repository.find({
          where: params,
          relations,
        });
    }
    
      async getOneBy(
        params: Partial<{
          [K in keyof EntityType]: any;
        }>,
      ): Promise<EntityType> {
        const existingRecord = await this._getByParams(params);
    
        if (!existingRecord) {
          const mappedParams = Object.values(params)
            .map((value) => value)
            .join(',');
    
          throw new BadRequestException(mappedParams);
        }
    
        return existingRecord;
    }
    
    private buildRelationsForSearch(includes: string[] = []) {
        const relations: FindOptionsRelations<EntityType> = {};
    
        includes.forEach((key) => {
          const splittedKey = key.split('.');
          const splittedKeyName = splittedKey[0];
    
          if (!relations[splittedKeyName]) {
            relations[splittedKeyName] = {};
          }
    
          let next = relations[splittedKeyName];
    
          for (let i = 0; i < splittedKey.length - 1; i++) {
            if (i === splittedKey.length) {
              next[splittedKey[i + 1]] = true;
              continue;
            }
    
            next[splittedKey[i + 1]] = {};
            next = next[splittedKey[i + 1]];
          }
        });
    
        return relations;
    }

}