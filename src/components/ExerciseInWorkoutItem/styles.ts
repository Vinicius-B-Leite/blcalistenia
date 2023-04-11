import styled from "styled-components/native"

export const Exercise = styled.View`
    padding: 5%;
    width: ${({theme}) => theme.sizes.vw}px;
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
    margin: ${({ theme }) => theme.sizes.vw * 0.01}px 0px;
    position: relative;
`

export const Title = styled.Text`
    text-align: center;
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
    color: white;
    flex: 1;
    margin: 0px 5px;
`

export const SerieInfo = styled.TextInput.attrs({
    keyboardType: 'numeric'

})`
    text-align: center;
    width: 25%;
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
    padding: 0 ;
`

export const DeleteSerieButton = styled.TouchableOpacity`
    position: absolute;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
    left: ${({ theme }) => theme.sizes.vw * -0.03}px;
    width: 10%;
    height: 100%;
    align-items: center;
    justify-content: center;
`
export const DeleteSerieText = styled.View`
    width: 50%;
    height: 10%;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
    background-color: ${({ theme }) => theme.colors.contrast};
`

export const CreateNewSerieButton = styled.TouchableOpacity`
    border-radius: ${({ theme }) => theme.sizes.borderRadius.full}px;
    width: 8%;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.contrast};
    align-self: center;
`
export const CreateNewSerieText = styled.Text`
    font-size: ${({theme}) => theme.sizes.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
`