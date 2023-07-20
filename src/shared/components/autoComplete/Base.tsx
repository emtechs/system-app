import { AutocompleteElement } from "react-hook-form-mui";
import { iChildren } from "../../interfaces";

interface iAutoCompleteBaseProps extends iChildren {
  name: string;
  label: string;
  loading: boolean;
  options?: unknown[];
}

export const AutoCompleteBase = ({
  name,
  label,
  loading,
  options,
  children,
}: iAutoCompleteBaseProps) => {
  return (
    <>
      <AutocompleteElement
        name={name}
        label={label}
        loading={loading}
        options={
          options
            ? options
            : [
                {
                  id: 1,
                  label: `No momento, não há nenhuma ${label.toLowerCase()} cadastrada`,
                },
              ]
        }
        textFieldProps={{ fullWidth: true }}
      />
      {children}
    </>
  );
};
