import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
    align-items: center;
    justify-content: center;
`

export const ButtonsArea = styled.View`
    flex-direction: row;
    width: 100%;
    padding: 0% 10%;
    justify-content: space-between;
`

type ButtonProps = {
    bg: string
}
export const Button = styled.TouchableOpacity<ButtonProps>`
    background-color: ${({bg}) => bg};
    padding: 6% 8%;
    border-radius: ${({theme}) => theme.sizes.borderRadius.sm}px;
`
export const ButtonText = styled.Text`
    font-size: ${({theme}) => theme.sizes.fontSize.md}px;
    color: ${({theme}) => theme.colors.text};
`