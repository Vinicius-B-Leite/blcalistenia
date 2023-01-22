import React, { useCallback, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withDecay, withTiming } from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { ExerciseContext } from '../../Contexts/ExerciseContext';
import { category } from '../../utils/category';
import { muscles } from '../../utils/muscles';
import * as S from './styles'


const { height } = Dimensions.get('screen')

export type CreateExerciseRefProps = {
    scrollTo: (destination: number, duration: number) => void,
    isVisible: () => boolean
}

const CreateExercise = React.forwardRef<CreateExerciseRefProps>(({ }, ref) => {
    const theme = useTheme()
    const animatedHeigh = useSharedValue(height)
    const startValue = useSharedValue({ y: 0 })
    const visible = useSharedValue(false)
    const { createExercise } = useContext(ExerciseContext)
    const [categoriesSelected, setCategoriesSelected] = useState<string[]>([])
    const [musclesSelected, setMusclesSelected] = useState<string[]>([])
    const [exerciseNameInput, setExerciseNameInput] = useState('')

    const scrollTo = useCallback((destination: number, duration?: number) => {
        'worklet'
        animatedHeigh.value = duration ? withTiming(destination, { duration }) : destination
        visible.value = animatedHeigh.value == height
    }, [])

    const isVisible = useCallback(() => {
        return visible.value
    }, [])

    const gesture = Gesture.Pan()
        .onStart(() => {
            startValue.value = { y: animatedHeigh.value }
        })
        .onUpdate((ev) => {
            if (animatedHeigh.value < 0) {
                scrollTo(0)
            }
            else if (animatedHeigh.value < height) {
                scrollTo(ev.translationY + startValue.value.y)
                scrollTo(Math.max(animatedHeigh.value, -height + 50))
            }
        })
        .onEnd((ev) => {
            if (animatedHeigh.value <= height / 4 || ev.velocityX <= -height / 2) {
                scrollTo(0, 1000)
            }
            else if (animatedHeigh.value > height / 1.9 || ev.velocityY > height) {
                scrollTo(height, 1000)
            }
        })


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: animatedHeigh.value }]
        }
    })

    useImperativeHandle(ref, () => ({ scrollTo, isVisible }), [scrollTo, isVisible])


    const selectCategory = (category: string) => {
        setCategoriesSelected(oldCategorySelected => [...oldCategorySelected, category])
    }

    const selectMuscle = (muscle: string) => {
        setMusclesSelected(oldMusclesSelected => [...oldMusclesSelected, muscle])
    }

    const handleCreateExercise = () => {
        if (exerciseNameInput.length > 0 && categoriesSelected.length > 0 && musclesSelected.length > 0) {
            createExercise({
                name: exerciseNameInput,
                muscles: musclesSelected,
                categories: categoriesSelected
            }).then(() => {
                setCategoriesSelected([])
                setMusclesSelected([])
                setExerciseNameInput('')
            })
        }
    }
    return (
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>
            <S.Container>
                <GestureDetector gesture={gesture} >
                    <S.ControllArea>
                        <S.ControllIcon />
                    </S.ControllArea>
                </GestureDetector>

                <S.Title>Criar exercício</S.Title>

                <S.Input
                    placeholder='Nome do exercício'
                    placeholderTextColor={theme.colors.darkText}
                    onChangeText={setExerciseNameInput}
                    value={exerciseNameInput}
                />
                <S.ListTitle>Categoria</S.ListTitle>
                <S.List>
                    {
                        category.map(c => (
                            <S.ItemContainer key={c} onPress={() => selectCategory(c)} selected={categoriesSelected.includes(c)}>
                                <S.ItemName>{c}</S.ItemName>
                            </S.ItemContainer>
                        ))
                    }
                </S.List>
                <S.ListTitle>Músculos</S.ListTitle>
                <S.List>
                    {
                        muscles.map(m => (
                            <S.ItemContainer key={m} onPress={() => selectMuscle(m)} selected={musclesSelected.includes(m)}>
                                <S.ItemName>{m}</S.ItemName>
                            </S.ItemContainer>
                        ))
                    }
                </S.List>

                <S.Butotn onPress={handleCreateExercise}>
                    <S.ButotnText>Concluir</S.ButotnText>
                </S.Butotn>
            </S.Container>
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    animatedContainer: {
        height: height,
        width: '100%',
        position: 'absolute',
        zIndex: 2
    }
})

export default CreateExercise;