function FormInput({
  labelText,
  inputType,
  placeholder,
  value,
  onChangeFn,
  isRequired = true,
  icon,
  name,
  error
}) {
  return (
    <div className="flex flex-col text-gray-300 w-full">
      <div className="flex flex-row justify-start items-center gap-2 mb-2">
        {icon}
        <label className="text-sm font-medium">
          {labelText}
        </label>
      </div>

      <input
        type={inputType}
        placeholder={placeholder}
        value={inputType === "file" ? undefined : value}
        onChange={onChangeFn}
        required={isRequired}
        className={`w-full px-6 py-3 bg-gray-700 rounded-md focus:outline-none 
          focus:ring-2 ${error ? "border border-red-500 focus:ring-red-500" : "focus:ring-emerald-500"}`}
        name={name}
      />

      {error && (
        <span className="text-red-500 text-sm mt-1">
          {error}
        </span>
      )}
    </div>
  );
}

export default FormInput;
