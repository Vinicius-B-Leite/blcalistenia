import React, {memo} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from 'styled-components/native';
import {SerieType, ExercisesInWorkoutType} from '@/models';
import useSerie from './useSerie';
import {BoxPressable, Box, Input} from '@/components';

type Props = {
  item: SerieType;
  exercise: ExercisesInWorkoutType;
  deleteSerieButton?: boolean;
};

const Serie: React.FC<Props> = ({item, deleteSerieButton, exercise}) => {
  const theme = useTheme();

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

      <Input
        textAlign="center"
        editable={false}
        defaultValue={String(item.serie)}
        boxProps={{
          width: 90,
          bg: undefined,
          height: 40,
        }}
      />
      <Input
        textAlign="center"
        value={String(rep)}
        onChangeText={handleOnChangeRep}
        boxProps={{
          width: 90,
          bg: undefined,
          height: 40,
        }}
      />

      {showSucessButton ? (
        <Box width={90} height={40} justifyContent="center" alignItems="center">
          <BoxPressable
            onPress={handleCheckSerie}
            width={30}
            height={30}
            borderRadius={4}
            bg={done ? 'contrast' : 'darkContrast'}
            justifyContent="center"
            alignItems="center">
            <AntDesign name="check" color={theme.colors.text} />
          </BoxPressable>
        </Box>
      ) : (
        <Input
          textAlign="center"
          value={String(rest)}
          onChangeText={handleOnChangeRest}
          boxProps={{
            width: 90,
            bg: undefined,
            height: 40,
          }}
        />
      )}
    </Box>
  );
};

export default memo(Serie, (prev, nxt) => Object.is(prev, nxt));
