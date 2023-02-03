import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`
export const ButtonsContainer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
`

type CountDownButtonProps = { bg: 'contrast' | 'darkContrast' }
export const CountDownButton = styled.TouchableOpacity<CountDownButtonProps>`
    background-color: ${({ bg, theme }) => theme.colors[bg]};
    width: 40%;
    justify-content: center;
    align-items: center;
    padding: 4% 0%;
    border-radius: ${({theme}) => theme.sizes.borderRadius.md}px;
`
export const CountDownButtonText = styled.Text`
    font-size: ${({theme}) => theme.sizes.fontSize.lg}px;
    color: ${({theme}) => theme.colors.text};
    font-weight: 700;
`