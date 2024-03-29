import {NavigatorScreenParams} from '@react-navigation/native';
import {WorkoutType} from '@/models';

export type RootStackParamList = {
  Home: undefined;
  Workout: {
    workout?: WorkoutType | undefined;
    canEdit?: boolean;
  };
  AddExercise: undefined;

  Rest: {
    totalSeconds: number;
  };
  Profile: undefined;
};

export type TabParamList = {
  HomeStack: NavigatorScreenParams<RootStackParamList>;
  Dashboard: undefined;
  Historic: undefined;
};
