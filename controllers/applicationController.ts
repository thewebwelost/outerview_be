import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { controllerErrorHandler } from '../helpers/controllerError';
import { Application } from '../model/Application';
import { UserEvent } from '../model/UserEvent';

const getOne = async (req: Request, res: Response) => {
  const { applicationId } = req.body;

  if (!applicationId)
    return res.status(404).json({ message: 'Unknown application id' });

  try {
    const applicationRepo = await AppDataSource.getRepository(Application);
    const application = await applicationRepo.findOne({
      relations: ['job', 'events'],
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

const getAll = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId)
    return res.status(400).json({ message: 'No user id was provided' });

  try {
    const applicationRepo = await AppDataSource.getRepository(Application);
    const applications = await applicationRepo.find({
      relations: ['job', 'events'],
      where: {
        userId,
      },
    });

    if (!applications) {
      return res.status(400).json({ message: 'Applications not found' });
    }

    return res.status(200).json(applications);
  } catch (err) {
    controllerErrorHandler({ err, res });
  }
};

const add = async (req: Request, res: Response) => {
  const { companyId, job, userEvents } = req.body;

  console.log(req.body);

  if (!companyId)
    return res.status(400).json({ message: 'Mandatory field missing' });

  try {
    const applicationRepo = await AppDataSource.getRepository(Application);
    const newApplication = new Application();

    // newApplication.events = newEvent;
    // newApplication.contacts = newJob;

    await applicationRepo.save(newApplication);

    res.status(201).json({
      success: `Application added`,
      newApplication,
    });
  } catch (err) {
    controllerErrorHandler({ err, res });
  }
};

const update = (req: Request, res: Response) => {};
const deleteOne = (req: Request, res: Response) => {};

export default {
  getOne,
  getAll,
  add,
  update,
  deleteOne,
};
