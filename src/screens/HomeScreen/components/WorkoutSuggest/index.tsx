import Workout from '@/screens/HomeScreen/components/Workout';
import useWorkoutSuggest from './useWorkoutSuggest';
import {BoxPressable, Box, Text} from '@/components';

import {FlatList} from 'react-native';

const WorkoutSuggest: React.FC = () => {
  const {
    handleChangeWorkoutLevel,
    workoutLeveSuggest,
    workoutSuggestFilteredByLevel,
  } = useWorkoutSuggest();

  return (
    <Box pb={44}>
      <Box flexDirection="row" alignItems="center" pb={14} gap={24}>
        <Box flex={1}>
          <Text preset="pLarge" bold color="contrast" numberOfLines={1}>
            Treinos recomendado
          </Text>
        </Box>
        <BoxPressable onPress={handleChangeWorkoutLevel}>
          <Text preset="pSmall" bold color="contrast" numberOfLines={1}>
            {workoutLeveSuggest === 'begginer' ? 'iniciante' : 'intermediário'}
          </Text>
        </BoxPressable>
      </Box>
      <FlatList
        data={workoutSuggestFilteredByLevel}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={item => item._id}
        renderItem={({item, index}) => (
          <Workout workout={item} marginLeft={index === 0 ? 34 : undefined} />
        )}
      />
    </Box>
  );
};

export default WorkoutSuggest;
