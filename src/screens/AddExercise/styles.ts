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
`
export const FilterButton = styled.TouchableOpacity`
    width: 20%;
    height: 25%;
    justify-content: center;
    align-items: center;
`
export const FilterText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
`

export const ExerciseList = (styled.FlatList`` as unknown) as typeof FlatList

export const FloatButton = styled.TouchableOpacity`
    position: absolute;
    right: ${({ theme }) => theme.sizes.vw * 0.05}px ;
    bottom: ${({ theme }) => theme.sizes.vw * 0.05}px;
    background-color: ${({ theme }) => theme.colors.contrast};
    padding: 6% 10%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
    justify-content: center;
    align-items: center;
`
export const FloatButtonIcon = styled.Text`
    font-size: ${({ theme }) => theme.sizes.icons.xlg}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
`

export const FocusBackground = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${({theme}) => theme.colors.background};
    position: absolute;
    opacity: 0.8;
    top: 0;
    left: 0;
    z-index: 1;
`