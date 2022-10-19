import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { controllerErrorHandler } from '../helpers/controllerError';
import { Education } from '../model/Education';
import { Experience } from '../model/Experience';
import { Profile } from '../model/Profile';
import { Social } from '../model/Social';

const getProfile = async (req: Request, res: Response) => {
  const { profileId } = req.body;

  if (!profileId)
    return res.status(404).json({ message: 'Unknown profile id' });

  try {
    const profileRepo = await AppDataSource.getRepository(Profile);
    const profile = await profileRepo.findOne({
      relations: ['experience', 'education', 'socials'],
      where: { id: parseInt(profileId) },
    });

    if (!profile) {
      return res.status(400).json({ message: 'Profile not found' });
    }

    return res.status(200).json(profile);
  } catch (err) {
    controllerErrorHandler({ err, res });
  }
};

const getProfiles = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId)
    return res.status(400).json({ message: 'No profile id was provided' });

  try {
    const profileRepo = await AppDataSource.getRepository(Profile);
    const profiles = await profileRepo.find({
      relations: ['experience', 'education', 'socials'],
      where: {
        userId,
      },
    });

    if (!profiles) {
      return res.status(400).json({ message: 'Profile not found' });
    }

    return res.status(200).json(profiles);
  } catch (err) {
    controllerErrorHandler({ err, res });
  }
};

const addProfile = async (req: Request, res: Response) => {
  const {
    userId,
    name, // *
    title, // *
    summary,
    details,
    hardSkills,
    softSkills,
    experience,
    education,
    achievements,
    country,
    city,
    state,
    email,
    website,
    socials,
  } = req.body;

  if (!name || !title)
    return res.status(400).json({ message: 'Mandatory field missing' });

  try {
    const profileRepo = await AppDataSource.getRepository(Profile);
    const newProfile = new Profile();

    const newExperiences =
      experience &&
      experience.map((item: Experience) => {
        const newExperience = new Experience();

        newExperience.name = item.name;
        newExperience.startDate = item.startDate;
        newExperience.endDate = item.endDate;
        newExperience.isCurrent = item.isCurrent;
        newExperience.responsibilities = item.responsibilities;
        newExperience.achievements = item.achievements;
        newExperience.keywords = item.keywords;

        return newExperience;
      });

    const newEducation =
      education &&
      education.map((item: Education) => {
        const newEducationItem = new Education();

        newEducationItem.name = item.name;
        newEducationItem.startDate = item.startDate;
        newEducationItem.endDate = item.endDate;
        newEducationItem.isCurrent = item.isCurrent;
        newEducationItem.degree = item.degree;
        newEducationItem.details = item.details;

        return newEducationItem;
      });

    const newSocials =
      socials &&
      socials.map((item: Social) => {
        const newSocial = new Social();

        newSocial.title = item.title;
        newSocial.url = item.url;

        return newSocial;
      });

    newProfile.user = userId;
    newProfile.experience = newExperiences;
    newProfile.education = newEducation;
    newProfile.socials = newSocials;
    newProfile.name = name;
    newProfile.title = title;
    newProfile.summary = summary;
    newProfile.details = details;
    newProfile.hardSkills = hardSkills;
    newProfile.softSkills = softSkills;
    newProfile.achievements = achievements;
    newProfile.country = country;
    newProfile.city = city;
    newProfile.state = state;
    newProfile.email = email;
    newProfile.website = website;

    await profileRepo.save(newProfile);
    res.status(201).json({
      success: `Profile ${name} added`,
      newProfile,
    });
  } catch (err) {
    controllerErrorHandler({ err, res });
  }
};

const updateProfile = (req: Request, res: Response) => {};
const deleteProfile = (req: Request, res: Response) => {};

export default {
  getProfile,
  getProfiles,
  addProfile,
  updateProfile,
  deleteProfile,
};
