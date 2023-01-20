import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`
export const Header = styled.View`
    padding: 5%;
    flex-direction: row;
    align-items: center;
`
export const GoBack = styled.TouchableOpacity``
export const InputArea = styled.View`
    flex-direction: row;
    padding: 0% 5%;
    background-color: ${({ theme }) => theme.colors.darkBackground};
    width: 90%;
    margin-left: 5%;
    align-items: center;
    border-radius: ${({theme}) => theme.sizes.borderRadius.sm}px;
`
export const Input = styled.TextInput`
    flex: 1;
`

export const Main = styled.View`
    padding: 5%;
`
export const FilterButton = styled.TouchableOpacity`
    width: 20%;
    height: 25%;
    justify-content: center;
    align-items: center;
`
export const FilterText = styled.Text`
    color: ${({theme}) => theme.colors.text};
    font-size: ${({theme}) => theme.sizes.fontSize.md}px;
`

export const ExerciseList = styled.FlatList``