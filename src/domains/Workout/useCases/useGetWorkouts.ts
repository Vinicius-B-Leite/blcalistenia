import {WorkoutType} from '@/models/WorkoutType';
import {useEffect, useState} from 'react';
import {workoutService} from '../workoutService';

export function useGetWorkouts() {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);

  const fetchWorkouts = async () => {
    const workoutResponse = await workoutService.getWorkouts();
    setWorkouts(workoutResponse);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return {
    workouts,
  };
}
