import styled from "styled-components/native";
import { FlatList } from 'react-native'
import { Workout, Workouts } from "../../models/WorkoutType";


export const Header = styled.View`
    flex-direction: row;
    padding: 5%;
    justify-content: space-between;
`
export const Left = styled.TouchableOpacity`
    flex-direction: row;
    gap: ${({ theme }) => theme.sizes.vw * 0.05}px;
`
export const Avatar = styled.Image`
    width: ${({ theme }) => theme.sizes.image.sm}px;
    height: ${({ theme }) => theme.sizes.image.sm}px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
`
export const TextContainer = styled.View``
export const Welcome = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.vsm}px;

`
export const Username = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
    font-weight: 700;

`
export const Right = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 20%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
`


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