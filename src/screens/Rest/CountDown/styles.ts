import styled from 'styled-components/native';

export const Counter = styled.Text`
  font-size: ${({theme}) => theme.sizes.fontSize.xlg}px;
  color: ${({theme}) => theme.colors.text};
  text-align: center;
`;
export const TotalTimes = styled(Counter)`
  font-size: ${({theme}) => theme.sizes.fontSize.sm}px;
`;
