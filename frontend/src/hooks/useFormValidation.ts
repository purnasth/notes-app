import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const useFormValidation = <T extends yup.AnyObjectSchema>(
  schema: T,
): UseFormReturn<yup.InferType<T>> => {
  return useForm<yup.InferType<T>>({
    resolver: yupResolver(schema),
  });
};

export default useFormValidation;
