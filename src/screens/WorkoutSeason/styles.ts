import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`
export const Header = styled.View`
    flex-direction: row;
    padding: 5%;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`
export const Left = styled.View`
    flex-direction: row;
    align-items: center;

`
export const GoBack = styled.TouchableOpacity`
    width: 10%;
    padding: 4% 0%;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
`
export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.contrast};
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px ;
    margin-left: 13%;
`
export const CancelWorkoutBtn = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding: 3% ;
`
export const CancelWorkoutTxt = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.vsm}px ;
`

export const AnotationContainer = styled.View`
    padding: 0 5%;
    width: 100%;
`
export const Anotation = styled.Text`
    width: 100%;
    padding: 3% 5%;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({theme}) => theme.colors.darkBackground};
    font-size: ${({ theme }) => theme.sizes.fontSize.vsm}px;
    border-radius: ${({theme}) => theme.sizes.borderRadius.sm}px;
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
    background-color: ${({ bg }) => bg};
    padding: 6% 8%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
`
export const ButtonText = styled.Text`
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
`

export const finishWorkout = styled.TouchableOpacity`
    width: 90%;
    background-color: ${({theme}) => theme.colors.contrast};
    justify-content: center;
    align-items: center;
    padding: 5%;
    margin: 3%;
    align-self: center;
    border-radius: ${({theme}) => theme.sizes.borderRadius.sm}px;
`
export const FineshText = styled.Text`
    font-size: ${({theme}) => theme.sizes.fontSize.md}px;
    color: ${({theme}) => theme.colors.text};
    font-weight: 700;
`
