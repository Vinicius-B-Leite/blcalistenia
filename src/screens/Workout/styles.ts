import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`



export const AnotationContainer = styled.View`
    padding: 0 5%;
    width: 100%;
`
export const Anotation = styled.TextInput`
    width: 100%;
    padding: 1.5% 5%;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({theme}) => theme.colors.darkBackground};
    font-size: ${({ theme }) => theme.sizes.fontSize.vsm}px;
    border-radius: ${({theme}) => theme.sizes.borderRadius.sm}px;
`



export const StartWorkout = styled.TouchableOpacity`
    width: 90%;
    background-color: ${({theme}) => theme.colors.contrast};
    justify-content: center;
    align-items: center;
    padding: 5%;
    margin: 3%;
    align-self: center;
    border-radius: ${({theme}) => theme.sizes.borderRadius.sm}px;
`
export const StartText = styled.Text`
    font-size: ${({theme}) => theme.sizes.fontSize.md}px;
    color: ${({theme}) => theme.colors.text};
    font-weight: 700;
`
