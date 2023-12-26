import styled from "styled-components/native";
import { TAB_BAR_HEIGHT } from "@/routes";

export const GoWorkout = styled.TouchableOpacity`
    padding: 3%;
    background-color: ${({ theme }) => theme.colors.contrast};
    border-top-left-radius: ${({ theme }) => theme.sizes.borderRadius.md}px;
    border-top-right-radius: ${({ theme }) => theme.sizes.borderRadius.md}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const TitleGoWorkout = styled.Text`
    font-weight: 700;
    font-size: ${({ theme }) => theme.sizes.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
`

export const SubtitleGoWorkout = styled.Text`
    font-size: ${({ theme }) => theme.sizes.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.text};
`

export const NavBar = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 4% 0%;
    background-color: ${({ theme }) => theme.colors.darkBackground};
`