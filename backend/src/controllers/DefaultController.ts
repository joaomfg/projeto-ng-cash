import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';

export default abstract class DefaultController<T> {
  constructor(private _service: IService<T>) {
    this._service = _service;
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    
    const newDoc = await this._service.create(body);

    res.status(201).json(newDoc);
  }

  async findAll(_req: Request, res: Response) {
    const allDocs = await this._service.findAll();

    res.status(200).json(allDocs);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const document = await this._service.findById(id);

    res.status(200).json(document);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const newPlayers = await this._service.update(id, body);

    res.status(200).json(newPlayers);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const newPlayers = await this._service.delete(id);

    res.status(200).json(newPlayers);
  }
}
