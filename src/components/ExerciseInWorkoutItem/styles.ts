import styled from "styled-components/native"

export const Exercise = styled.View`
    padding: 5%;
`

export const ExerciseHeader = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`
export const ExerciseName = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
`
export const ExerciseAnotation = styled.TextInput`
    width: 100%;
    padding: 1% 5%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
    background-color: ${({ theme }) => theme.colors.darkBackground};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.vsm}px;
    margin: 3% 0;
`
export const Row = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
`

export const Title = styled.Text`
    text-align: center;
    width: 20%;
`

export const SerieInfo = styled.Text`
    text-align: center;
    width: 20%;
`