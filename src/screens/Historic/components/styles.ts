import styled from "styled-components/native"


export const WorkoutContainer = styled.View`
    flex:  1;
    padding-bottom: ${({theme}) => theme.sizes.vh * 0.1}px;
`
export const WorkoutHeader = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`
export const WorkoutName = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
`
export const WorkoutTime = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;`
export const WorkoutAnotation = styled.Text`
    margin: 3% 0;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px ;
    padding: 2% 5%;
`