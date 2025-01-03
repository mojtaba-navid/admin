import type { UseFormReturn } from 'react-hook-form';

import { FormProvider as RHFForm } from 'react-hook-form';

// ----------------------------------------------------------------------

export type FormProps = {
  onSubmit?: () => void;
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  style?: any;
  classsName?: string;
};

export default function Form({ children, onSubmit, methods, classsName }: FormProps) {
  return (
    <RHFForm {...methods}>
      <form className={classsName} onSubmit={onSubmit} noValidate autoComplete="off">
        {children}
      </form>
    </RHFForm>
  );
}
