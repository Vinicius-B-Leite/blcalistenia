import {WorkoutType} from '@/models';
import {useEffect, useState} from 'react';
import {workoutService} from '../workoutService';

export function useGetWorkouts() {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);

  const fetchWorkouts = async () => {
    const workoutResponse = await workoutService.getWorkouts();
    const workoutsWitoutDeleted = workoutResponse.filter(v => !v?.deletedAt);
    setWorkouts(workoutsWitoutDeleted);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return {
    workouts,
  };
}
