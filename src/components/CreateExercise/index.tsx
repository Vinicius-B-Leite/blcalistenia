import React, { useId, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { ExerciseType } from '../../models/ExerciseType';
import { category } from '../../utils/category';
import { muscles } from '../../utils/muscles';
import * as S from './styles'
import { useRealm } from '../../services/realm';
import { useUser } from '@realm/react';
import uuid from 'react-native-uuid'
import { useDispatch } from 'react-redux';


const CreateExercise: React.FC = () => {
    const theme = useTheme()

    const [categoriesSelected, setCategoriesSelected] = useState<string[]>([])
    const [musclesSelected, setMusclesSelected] = useState<string[]>([])
    const [exerciseNameInput, setExerciseNameInput] = useState('')

    const realm = useRealm()
    const user = useUser()
    

    const createExercise = ({ name, muscles, categories, _id }: ExerciseType) => {
        realm.write(() => {
            realm.create<ExerciseType>('Exercise', {
                name,
                muscles: muscles.map(m => m.toLowerCase()),
                categories: categories.map(c => c.toLowerCase()),
                user_id: user.id,
                _id
            })
        })

    }


    const selectCategory = (category: string) => {
        if (categoriesSelected.includes(category)) {
            const index = categoriesSelected.indexOf(category)
            categoriesSelected.splice(index, 1)
            setCategoriesSelected([...categoriesSelected])
            return
        }
        setCategoriesSelected(oldCategorySelected => [...oldCategorySelected, category])
    }

    const selectMuscle = (muscle: string) => {
        if (musclesSelected.includes(muscle)) {
            const index = musclesSelected.indexOf(muscle)
            musclesSelected.splice(index, 1)
            setMusclesSelected([...musclesSelected])
            return
        }
        setMusclesSelected(oldMusclesSelected => [...oldMusclesSelected, muscle])
    }

    const handleCreateExercise = () => {
        if (exerciseNameInput.length > 0 && categoriesSelected.length > 0 && musclesSelected.length > 0) {
            createExercise({
                name: exerciseNameInput,
                muscles: musclesSelected,
                categories: categoriesSelected,
                _id: uuid.v4().toString()
            })
            setCategoriesSelected([])
            setMusclesSelected([])
            setExerciseNameInput('')
        }
    }

    return (
        <>
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
                        <S.ItemContainer key={c} onPressIn={() => selectCategory(c)} selected={categoriesSelected.includes(c)}>
                            <S.ItemName>{c}</S.ItemName>
                        </S.ItemContainer>
                    ))
                }
            </S.List>
            <S.ListTitle>Músculos</S.ListTitle>
            <S.List>
                {
                    muscles.map(m => (
                        <S.ItemContainer key={m} onPressIn={() => selectMuscle(m)} selected={musclesSelected.includes(m)}>
                            <S.ItemName>{m}</S.ItemName>
                        </S.ItemContainer>
                    ))
                }
            </S.List>

            <S.Butotn onPressIn={handleCreateExercise}>
                <S.ButotnText>Concluir</S.ButotnText>
            </S.Butotn>
        </>
    )
}

export default CreateExercise;