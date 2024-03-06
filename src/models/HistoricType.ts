import {WorkoutType} from './WorkoutType';

export type HistoricType = {
  workout: WorkoutType;
  timerInSeconds: number;
  date: Date;
  _id: string;
  user_id: string;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
};

export type HistoricTypeStorage = {
  workout: string;
  timerInSeconds: number;
  date: Date;
  _id: string;
  user_id: string;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
};
