import InputMask from "react-input-mask";

import { Input } from "@/components/ui/input";
import { PHONE_MASK } from "@/lib/phone";

type PhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
};

const PhoneInput = ({
  value,
  onChange,
  id = "phone",
  name = "phone",
  disabled,
  required,
  placeholder = PHONE_MASK
}: PhoneInputProps) => {
  return (
    <InputMask
      mask={PHONE_MASK}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      {/* @ts-ignore - InputMask types issue */}
      {(inputProps: any) => (
        <Input
          {...inputProps}
          id={id}
          name={name}
          type="tel"
          required={required}
          placeholder={placeholder}
        />
      )}
    </InputMask>
  );
};

export default PhoneInput;

