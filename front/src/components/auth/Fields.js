import React from "react";
import validate from "../ui/validate"

export default function Fields({
  fields,
  errors,
  setErrors,
  values,
  setValues,
  disabled
}) {
  const error = (field) => {
    if (typeof errors[field] !== "undefined" && errors[field]) {
      return fields[field].helperText;
    }
  };

  return Object.keys(fields).map((field) => {
    const validateHelper = (event) => {
      return validate({ [field]: event.target.value });
    };
    return !fields[field].hidden ? (
      <div className="flex-col" key={field}>
        <div className="flex md:space-x-5 items-center">
          <div className="w-20 md:flex hidden">{fields[field].placeholder}</div>
          <div className="w-full">
            <input
              type={fields[field].type}
              value={values[field]}
              disabled={disabled}
              onChange={(e) => {
                const valid = validateHelper(e);
                if (errors[field] || valid[field] === true) {
                  setErrors({ ...errors, [field]: !valid[field] });
                }
                setValues({ ...values, [field]: e.target.value });
              }}
              onBlur={(e) => {
                const valid = validateHelper(e);
                setErrors({ ...errors, [field]: !valid[field] });
              }}
              placeholder={fields[field].placeholder}
              className={`bg-white p-2 w-full border-2`}
            />
          </div>
        </div>
        <div className="text-red-500 text-xs italic pb-4">{error(field)}</div>
      </div>
    ) : null;
  });
}
