export interface IRepository<T> {
    create(dto: any | T): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    findOne(option: any): Promise<T | null>;
    findAll(option?: any): Promise<T[]>;
    update(id: string, dto: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
  }
  