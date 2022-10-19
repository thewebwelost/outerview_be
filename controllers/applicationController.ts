import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { controllerErrorHandler } from '../helpers/controllerError';
import { Application } from '../model/Application';

const getOne = async (req: Request, res: Response) => {
  const { applicationId } = req.body;

  if (!applicationId)
    return res.status(404).json({ message: 'Unknown application id' });

  try {
    const applicationRepo = await AppDataSource.getRepository(Application);
    const application = await applicationRepo.findOne({
      relations: [],
      where: { id: parseInt(applicationId) },
    });

    if (!application) {
      return res.status(400).json({ message: 'Application not found' });
    }

    return res.status(200).json(application);
  } catch (err) {
    controllerErrorHandler({ err, res });
  }
};

const getAll = (req: Request, res: Response) => {};
const add = (req: Request, res: Response) => {};
const update = (req: Request, res: Response) => {};
const deleteOne = (req: Request, res: Response) => {};

export default {
  getOne,
  getAll,
  add,
  update,
  deleteOne,
};
