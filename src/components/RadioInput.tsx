import clsx from "clsx";
import * as React from "react";

type RadioInputContextType = {
  value: string;
  setValue: (value: string) => void;
  name: string;
  disabled?: boolean;
};

const RadioInputContext = React.createContext<RadioInputContextType>({
  value: "",
  name: "",
  setValue: () => undefined,
});

function RadioInput({
  children,
  disabled,
  value,
  name,
  setValue,
}: { children: React.ReactNode } & RadioInputContextType) {
  return (
    <RadioInputContext.Provider value={{ value, setValue, name, disabled }}>
      <div className="flex items-center gap-3">{children}</div>
    </RadioInputContext.Provider>
  );
}

RadioInput.Option = function Option({ value }: { value: string }) {
  const { name, value: selectedValue, setValue, disabled } = useRadioInput();

  const isActive = value === selectedValue;

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className={clsx(
          "font-semibold cursor-pointer border border-gray-300 rounded-md px-5 py-1 text-center",
          {
            "bg-gray-200 text-black": isActive,
            "opacity-55": disabled,
          }
        )}
        onClick={() => inputRef.current?.click()}
      >
        {value}
      </div>
      <input
        disabled={disabled}
        className="hidden"
        type="radio"
        ref={inputRef}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

function useRadioInput() {
  const context = React.useContext(RadioInputContext);

  if (!context) {
    console.warn(
      "useRadioInput should be used inside RadioInputContext provider"
    );
  }

  return context;
}

export default RadioInput;
