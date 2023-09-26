export interface IRepository<T> {
    create(dto: any | T): Promise<T>;
    findById(id: string): Promise<T>;
    findOne(option: any): Promise<T>;
    findAll(option?: any): Promise<T[]>;
    update(id: string, dto: Partial<T>): Promise<T>;
    delete(id: string): Promise<boolean>;
  }
  