import React, {memo} from 'react';

import {SerieType, ExercisesInWorkoutType} from '@/models';
import useSerie from './useSerie';
import {BoxPressable, Box, Input, Icon, Text} from '@/components';
import {useAppSelector} from '@/hooks';
import {WIDTH} from './constants';

type Props = {
  item: SerieType;
  exercise: ExercisesInWorkoutType;
  deleteSerieButton?: boolean;
};

const Serie: React.FC<Props> = ({item, deleteSerieButton, exercise}) => {
  const canEditWorkout = useAppSelector(state => state.workout.canEdit);

  const {
    handleCheckSerie,
    showSucessButton,
    handleDeleteSerie,
    done,
    rep,
    rest,
    handleOnChangeRep,
    handleOnChangeRest,
  } = useSerie({item, deleteSerieButton, exercise});

  return (
    <Box
      flexDirection="row"
      justifyContent="space-evenly"
      style={{position: 'relative'}}>
      {deleteSerieButton && (
        <BoxPressable
          onPress={() => handleDeleteSerie()}
          justifyContent="center"
          alignItems="center"
          p={4}
          style={{position: 'absolute', top: 12, left: -1, zIndex: 2}}>
          <Box bg="contrast" width={15} height={3} borderRadius={'full'} />
        </BoxPressable>
      )}

      <Box
        width={WIDTH}
        gap={0}
        padding={0}
        paddingHorizontal={0}
        height={40}
        justifyContent="center"
        alignItems="center">
        <Text preset="pMedium">{item.serie}</Text>
      </Box>
      <Input
        textAlign="center"
        keyboardType="numeric"
        value={rep}
        placeholder="0"
        onChangeText={handleOnChangeRep}
        boxProps={{
          width: WIDTH,
          gap: 0,
          padding: 0,
          paddingHorizontal: 0,
          bg: undefined,
          height: 40,
        }}
        editable={canEditWorkout}
      />

      {showSucessButton ? (
        <Box
          width={WIDTH}
          height={40}
          justifyContent="center"
          alignItems="center">
          <BoxPressable
            onPress={handleCheckSerie}
            width={30}
            height={30}
            borderRadius={4}
            bg={done ? 'contrast' : 'darkContrast'}
            justifyContent="center"
            alignItems="center">
            <Icon family="AntDesign" name="check" color={'text'} size={12} />
          </BoxPressable>
        </Box>
      ) : (
        <Input
          textAlign="center"
          mask="mm:ss"
          keyboardType="numeric"
          placeholder="00:00"
          value={rest}
          onChangeText={handleOnChangeRest}
          boxProps={{
            width: WIDTH,
            gap: 0,
            padding: 0,
            paddingHorizontal: 0,
            bg: undefined,
            height: 40,
          }}
          editable={canEditWorkout}
        />
      )}
    </Box>
  );
};

export default memo(Serie, (prev, nxt) => Object.is(prev, nxt));
