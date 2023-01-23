import styled from "styled-components/native"

export const ExerciseContainer = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.darkBackground};
    padding: ${({ theme }) => theme.sizes.vw * 0.03}px ${({ theme }) => theme.sizes.vw * 0.05}px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
    margin: ${({theme}) => theme.sizes.vh * 0.005}px 0;
`
export const ExerciseName = styled.Text`
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
`
export const ExerciseMuscles = styled.Text`
    font-size: ${({ theme }) => theme.sizes.fontSize.vsm}px;
    color: ${({ theme }) => theme.colors.text};
    margin: 0px ${({theme}) => theme.sizes.vw * 0.01}px;
`
