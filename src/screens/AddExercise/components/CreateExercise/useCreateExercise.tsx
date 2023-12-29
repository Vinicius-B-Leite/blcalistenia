import {useCreateExercise as useDomainCreateExercise} from '@/domains';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addExercise} from '@/features';
import {Control, Field} from 'react-hook-form';
import {CreateExerciseSchema} from './schema';

type SelectItemProps = {
  item: string;
  onChange: (item: string[]) => void;
  field: keyof Pick<CreateExerciseSchema, 'categories' | 'muscles'>;
};
export default function useCreateExercise(
  control: Control<CreateExerciseSchema>,
) {
  const {createExercise} = useDomainCreateExercise();
  const dispatch = useDispatch();

  const selectItem = ({field, item, onChange}: SelectItemProps) => {
    const itemsSelecteds = control._fields[field]?._f.value;

    if (itemsSelecteds.includes(item)) {
      const index = itemsSelecteds.indexOf(item);
      itemsSelecteds.splice(index, 1);
      onChange([...itemsSelecteds]);
      return;
    }
    onChange([...itemsSelecteds, item]);
  };

  const handleCreateExercise = async ({
    categories,
    exerciseName,
    muscles,
  }: CreateExerciseSchema) => {
    const exercisesCreated = await createExercise({
      categories: categories.map(m => m.toLocaleLowerCase()),
      muscles: muscles.map(c => c.toLocaleLowerCase()),
      name: exerciseName,
    });

    dispatch(addExercise(exercisesCreated));
  };

  return {
    handleCreateExercise,
    selectItem,
  };
}
