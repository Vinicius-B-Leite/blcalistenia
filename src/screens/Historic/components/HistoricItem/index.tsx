import React from 'react';

import {WorkoutType, HistoricType} from '@/models';
import  {BoxPressable, Box, Text} from '@/components';


type Props = {
  item: HistoricType;
  onClick: (item: HistoricType) => void;
};

const HistoricItem: React.FC<Props> = ({item, onClick}) => {
  const {title, exercises}: WorkoutType = JSON.parse(item.workout);

  const day = String(item.date.getDate()).padStart(2, '0');
  const month = String(item.date.getMonth() + 1).padStart(2, '0');
  const year = item.date.getFullYear();

  const seriesLength = exercises[0]?.series?.length;
  const firtsRep = exercises[0]?.series[0]?.rep;
  const exerciseName = exercises[0]?.exercise_id;

  const minutes = String((item.timerInSeconds / 60).toFixed(0)).padStart(
    2,
    '0',
  );
  const seconds = String((item.timerInSeconds % 60).toFixed(0)).padStart(
    2,
    '0',
  );

  return (
    <BoxPressable
      bg="primaryBg"
      p={14}
      borderRadius={10}
      mb={14}
      onPress={() => {
        onClick({...item});
      }}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text preset="pMedium" bold textTransform="capitalize">
          {title}
        </Text>
        <Text preset="pSmall">
          {day}/{month}/{year}
        </Text>
      </Box>

      <Text preset="pSmall">
        {minutes}:{seconds}
      </Text>

      <Text
        preset="pMedium"
        mt={24}>{`${seriesLength}x${firtsRep} - ${exerciseName}`}</Text>
    </BoxPressable>
  );
};

export default HistoricItem;
