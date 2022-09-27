import { AppDataSource } from '../data-source';
import { Profile } from '../model/Profile';

export interface IProfile {}

export async function createProfile({
  profileData,
  userId,
}: {
  profileData: IProfile;
  userId: number;
}) {
  try {
    const repo = await AppDataSource.getRepository(Profile);
    const newProfile = repo.create({
      ...profileData,
      user: userId,
    });
    newProfile.save();
  } catch (err) {
    console.error(err);
  }
}

export async function getProfile(id: number) {
  try {
    const repo = await AppDataSource.getRepository(Profile);
    const profile = repo.findOneBy({ id });
    return profile;
  } catch (err) {
    console.error(err);
  }
}

export async function getProfiles(userId: number) {
  try {
    const repo = await AppDataSource.getRepository(Profile);
    const profiles = repo.find({
      where: {
        user: userId,
      },
    });
    return profiles;
  } catch (err) {
    console.error(err);
  }
}

export async function updateProfile({
  profileData,
  profileId,
}: {
  profileData: IProfile;
  profileId: number;
}) {
  try {
    const repo = await AppDataSource.getRepository(Profile);
  } catch (err) {
    console.error(err);
  }
}
