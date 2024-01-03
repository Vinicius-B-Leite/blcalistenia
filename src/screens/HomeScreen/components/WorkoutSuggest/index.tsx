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
    <Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={14}>
        <Text preset="pLarge" bold color="contrast">
          Treinos recomendados
        </Text>
        <BoxPressable onPress={handleChangeWorkoutLevel}>
          <Text preset="pSmall" bold color="contrast">
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
