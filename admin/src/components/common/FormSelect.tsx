export const FormSelect = ({
  label,
  name,
  options,
  formik,
}: {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  formik: any;
}) => (
  <div className="mt-5">
    <label htmlFor={name} className="block text-left">
      {label}
    </label>
    <select
      id={name}
      name={name}
      className="p-2 border-2 border-gray-300 rounded w-full outline-red-500"
      onChange={formik.handleChange}
      value={formik.values[name]}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label.toUpperCase()}
        </option>
      ))}
    </select>
    {formik.errors[name] && formik.touched[name] && (
      <div className="text-red-500 text-sm absolute ">{formik.errors[name]}</div>
    )}
  </div>
);
