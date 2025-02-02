// import { useForm, UseFormReturn } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// // Define a generic type for form schema
// type FormSchema<T extends yup.AnyObject> = yup.ObjectSchema<T>;

// // Define a reusable hook for form validation
// const useFormValidation = <T extends yup.AnyObject>(
//   schema: FormSchema<T>,
// ): UseFormReturn<T> => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<T>({
//     resolver: yupResolver(schema),
//   });

//   return {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } as UseFormReturn<T>;
// };

// export default useFormValidation;

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
