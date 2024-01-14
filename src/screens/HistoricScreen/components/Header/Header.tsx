import {BoxPressable, Box, Text} from '@/components';

import React from 'react';

const Header: React.FC = () => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      mb={24}>
      <Text preset="primaryTitle" color="contrast">
        Histórico
      </Text>

      <BoxPressable>
        <Text preset="pMedium" color="contrast">
          data
        </Text>
      </BoxPressable>
    </Box>
  );
};

export default Header;
