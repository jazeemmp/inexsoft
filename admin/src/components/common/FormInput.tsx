export const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  formik,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  formik: any;
}) => (
  <div className="mt-7">
    <label htmlFor={name} className="block text-left">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      className="p-2 border-2 border-gray-300 rounded w-full outline-red-500"
      placeholder={placeholder}
      onChange={formik.handleChange}
      value={formik.values[name]}
    />
    {formik.errors[name] && formik.touched[name] && (
      <div className="text-red-500 text-sm absolute">{formik.errors[name]}</div>
    )}
  </div>
);
