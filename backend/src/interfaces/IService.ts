export interface IService<T> {
    create(obj: any): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    update(id: string, body: T): Promise<T | null>;
    delete(id: string): Promise<void>;
  }
  