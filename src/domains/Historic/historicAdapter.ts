import {HistoricType} from '@/models/HistoricType';

const adapter = (historic: any): HistoricType => {
  return {
    _id: historic._id,
    date: historic.date,
    timerInSeconds: historic.timerInSeconds,
    user_id: historic.user,
    workout: historic.workout,
  };
};

export const historicAdapter = {
  adapter,
};
