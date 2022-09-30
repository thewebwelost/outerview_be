import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { controllerErrorHandler } from '../helpers/controllerError';
import { Profile } from '../model/Profile';

const getProfile = async (req: Request, res: Response) => {
  const { profileId } = req.body;

  if (!profileId)
    return res.status(404).json({ message: 'Unknown profile id' });

  try {
    const profileRepo = await AppDataSource.getRepository(Profile);
    const profile = await profileRepo.findOne({
      relations: ['experience', 'education', 'socials'],
      where: { id: profileId },
    });

    if (!profile) {
      return res.status(400).json({ message: 'Profile not found' });
    }

    return res.status(200).json(profile);
  } catch (err) {
    controllerErrorHandler({ err, res });
  }
};

const getProfiles = (req: Request, res: Response) => {};
const addProfile = (req: Request, res: Response) => {};
const updateProfile = (req: Request, res: Response) => {};
const deleteProfile = (req: Request, res: Response) => {};

export default {
  getProfile,
  getProfiles,
  addProfile,
  updateProfile,
  deleteProfile,
};
