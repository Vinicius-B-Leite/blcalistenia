import {useCreateExercise as useDomainCreateExercise} from '@/domains';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addExercise} from '@/features';

export default function useCreateExercise() {
  const {createExercise} = useDomainCreateExercise();
  const dispatch = useDispatch();

  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
  const [musclesSelected, setMusclesSelected] = useState<string[]>([]);
  const [exerciseNameInput, setExerciseNameInput] = useState('');

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
  const handleCreateExercise = async () => {
    if (exerciseNameInput && categoriesSelected && musclesSelected) {
      const exercisesCreated = await createExercise({
        categories: categoriesSelected.map(m => m.toLocaleLowerCase()),
        muscles: musclesSelected.map(c => c.toLocaleLowerCase()),
        name: exerciseNameInput,
      });
      setCategoriesSelected([]);
      setMusclesSelected([]);
      setExerciseNameInput('');

      dispatch(addExercise(exercisesCreated));
    }
  };

  const onChangeExerciseNameInput = (txt: string) => setExerciseNameInput(txt);

  return {
    selectCategory,
    selectMuscle,
    categoriesSelected,
    musclesSelected,
    onChangeExerciseNameInput,
    exerciseNameInput,
    handleCreateExercise,
  };
}
