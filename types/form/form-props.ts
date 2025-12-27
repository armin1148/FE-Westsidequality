export interface FormProps<T> {
  defaultValues: T;
  onSubmit: (values: T) => void | Promise<void>;
}
