import styled from "styled-components/native";
import { FlatList } from 'react-native'




export const WorkoutContainer = styled.View`
    padding: 5%;
`
export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.contrast};
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
    font-weight: 800;
`
export const Row = styled.View`
    padding-bottom: 5%;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`
export const LevelButton = styled.TouchableOpacity``
export const LevelText = styled(Title)`
    font-size: ${({theme}) => theme.sizes.fontSize.sm}px;
`
export const InputArea = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.darkBackground};
    flex-direction: row;
    align-items: center;
    padding: 0 5%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
    margin-top: 3%;
`
export const Input = styled.TextInput`
    flex: 1;
    margin-left: 3%;
`
export const CategotyList = (styled.FlatList`
    margin: 5% 0;
` as unknown) as typeof FlatList
export const WorkoutList = (styled.FlatList`` as unknown) as typeof FlatList