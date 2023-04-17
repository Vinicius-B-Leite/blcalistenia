import { FlatList } from 'react-native'
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
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
`
export const Input = styled.TextInput`
    flex: 1;
`

export const Main = styled.View`
    padding: 5%;
    flex: 1;
`
export const FilterButton = styled.TouchableOpacity`
    width: 25%;
    height: 10%;
    justify-content: center;
    align-items: center;
`
export const FilterText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
`

export const ExerciseList = (styled.FlatList`
    height: ${({theme}) => theme.sizes.vh * 0.50}px;
` as unknown) as typeof FlatList

export const FloatButton = styled.TouchableOpacity`
    position: absolute;
    right: ${({ theme }) => theme.sizes.vw * 0.05}px ;
    bottom: ${({ theme }) => theme.sizes.vw * 0.05}px;
    background-color: ${({ theme }) => theme.colors.contrast};
    padding: 6% 10%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
    justify-content: center;
    align-items: center;
    z-index: 2;
`
export const FloatButtonIcon = styled.Text`
    font-size: ${({ theme }) => theme.sizes.icons.xlg}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
`
export const ExerciseListContainer = styled.View`
    height: ${({theme}) => theme.sizes.vh * 0.67}px;
    width: ${({theme}) => theme.sizes.vw}px;
`