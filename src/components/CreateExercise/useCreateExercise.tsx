import {ExerciseType} from '@/models/ExerciseType';
import {useRealm} from '@/services/realm/realm';

import {useState} from 'react';
import uuid from 'react-native-uuid';

export default function useCreateExercise() {
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
  const [musclesSelected, setMusclesSelected] = useState<string[]>([]);
  const [exerciseNameInput, setExerciseNameInput] = useState('');

  const realm = useRealm();

  const createExercise = ({name, muscles, categories, _id}: ExerciseType) => {
    realm.write(() => {
      realm.create<ExerciseType>('Exercise', {
        name,
        muscles: muscles.map(m => m.toLowerCase()),
        categories: categories.map(c => c.toLowerCase()),
        user_id: '',
        _id,
      });
    });
  };

  const selectCategory = (category: string) => {
    if (categoriesSelected.includes(category)) {
      const index = categoriesSelected.indexOf(category);
      categoriesSelected.splice(index, 1);
      setCategoriesSelected([...categoriesSelected]);
      return;
    }
    setCategoriesSelected(oldCategorySelected => [
      ...oldCategorySelected,
      category,
    ]);
  };

  const selectMuscle = (muscle: string) => {
    if (musclesSelected.includes(muscle)) {
      const index = musclesSelected.indexOf(muscle);
      musclesSelected.splice(index, 1);
      setMusclesSelected([...musclesSelected]);
      return;
    }
    setMusclesSelected(oldMusclesSelected => [...oldMusclesSelected, muscle]);
  };

  const handleCreateExercise = () => {
    if (
      exerciseNameInput.length > 0 &&
      categoriesSelected.length > 0 &&
      musclesSelected.length > 0
    ) {
      createExercise({
        name: exerciseNameInput,
        muscles: musclesSelected,
        categories: categoriesSelected,
        _id: uuid.v4().toString(),
      });
      setCategoriesSelected([]);
      setMusclesSelected([]);
      setExerciseNameInput('');
    }
  };

  const onChangeExerciseNameInput = (txt: string) => setExerciseNameInput(txt);

  return {
    selectCategory,
    selectMuscle,
    handleCreateExercise,
    categoriesSelected,
    musclesSelected,
    onChangeExerciseNameInput,
    exerciseNameInput,
  };
}
