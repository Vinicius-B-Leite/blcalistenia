import styled from "styled-components/native"

export const Header = styled.View`
    flex-direction: row;
    padding: 5%;
    align-items: center;
    width: 100%;
`
export const Left = styled.View`
    flex-direction: row;
    align-items: center;
    flex: 1;
`
export const GoBack = styled.TouchableOpacity`
    width: 10%;
    padding: 4% 0;
    align-items: center;
    justify-content: center;
    border-radius: ${({theme}) => theme.sizes.borderRadius.full}px;
`
export const Title = styled.TextInput`
    color: ${({ theme }) => theme.colors.contrast};
    width: 75%;
    padding: 3% 5%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.sm}px;
    background-color: ${({ theme }) => theme.colors.darkBackground};
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px ;
    margin-left: 3%;
`
export const CancelWorkoutBtn = styled.TouchableOpacity``
export const CancelWorkoutTxt = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizes.fontSize.vsm}px ;
`
export const ButtonContainer = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding: 3% ;
    margin-right: 2%;
`



export const ExercisesContainer = styled.View`
    width: ${({theme}) => theme.sizes.vw}px;
    min-height: 50px;
    height: ${({theme}) => theme.sizes.vh * 0.55}px;
`

export const AddExerciseButton = styled.TouchableOpacity`
    align-self: center;
    margin: 5% 0%;
    padding: 3% 5%;
`
export const AddExerciseText = styled.Text`
    color: ${({theme}) => theme.colors.contrast};
    
    font-size: ${({theme}) => theme.sizes.fontSize.sm}px;
    text-decoration: underline;
`