import { AppDataSource } from '../data-source';
import { Application } from '../model/Application';

export interface IApplication {}

export async function createApplication({
  applicationData,
  userId,
}: {
  applicationData: IApplication;
  userId: number;
}) {
  // try {
  //   const repo = await AppDataSource.getRepository(Application);
  //   const newApplication = repo.create({
  //     ...applicationData,
  //   });
  //   newApplication.save();
  // } catch (err) {
  //   console.error(err);
  // }
}

export async function getApplication(id: number) {
  // try {
  //   const repo = await AppDataSource.getRepository(Application);
  //   const application = repo.findOneBy({ id });
  //   return application;
  // } catch (err) {
  //   console.error(err);
  // }
}

export async function getApplications(userId: number) {
  // try {
  //   const repo = await AppDataSource.getRepository(Application);
  //   const applications = repo.find({
  //     where: {
  //       user: userId,
  //     },
  //   });
  //   return applications;
  // } catch (err) {
  //   console.error(err);
  // }
}

export async function updateApplication({
  applicationData,
  applicationId,
}: {
  applicationData: IApplication;
  applicationId: number;
}) {
  // try {
  //   const repo = await AppDataSource.getRepository(Application);
  // } catch (err) {
  //   console.error(err);
  // }
}
