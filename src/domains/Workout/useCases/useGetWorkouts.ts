import {WorkoutType} from '@/models';
import {useEffect, useState} from 'react';
import {workoutService} from '../workoutService';

type useGetWorkoutsProps = {
  dependencies?: any[];
};

export function useGetWorkouts(props?: useGetWorkoutsProps) {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const dependencies = props?.dependencies || [];
  const fetchWorkouts = async () => {
    const workoutResponse = await workoutService.getWorkouts();
    const workoutsWitoutDeleted = workoutResponse.filter(v => !v?.deletedAt);
    setWorkouts(workoutsWitoutDeleted);
  };

  useEffect(() => {
    fetchWorkouts();
  }, [...dependencies]);

  return {
    workouts,
    fetchWorkouts,
  };
}
