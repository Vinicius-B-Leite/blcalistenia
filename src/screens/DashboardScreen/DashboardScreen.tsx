import {Container, Text} from '@/components';
import React, {useState} from 'react';
import FrequencyGraph from './components/FrequencyGraph/FrequencyGraph';
import MusclesGraph from './components/MusclesGraph/MusclesGraph';
import RepsRange from './components/RepsRangeGraph/RepsRangeGraph';

export const DashboardScreen: React.FC = () => {
  return (
    <Container scrollEnabled>
      <Text preset="primaryTitle" color="contrast" mb={34}>
        Dashboard
      </Text>
      <FrequencyGraph />
      <MusclesGraph />
      <RepsRange />
    </Container>
  );
};
