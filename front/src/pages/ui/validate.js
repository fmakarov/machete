export default function validate(values) {
  const validators = {
    email: (val) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val),
    phone: (val) =>
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val),
    password: (val) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/.test(val),

    confirmation: (val) =>
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        val
      ),
    zip: (val) => /^\d{6}(-\d{6})?$/.test(val),
    name: (val) => val.length > 3,
    message: (val) => val.length > 3,
    city: (val) => val.length >= 0,
    state: (val) => val.length !== 0,
    street: (val) => val.length !== 0,
  };

  const valid = {};

  Object.keys(values).map((field) => {
    if (field === "email") {
      const val = values[field];
      function email(val) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
      }
      valid[field] = email(val);
    }
    // if (field === "phone") {
    //   const val = values[field];
    //   function phone(val) {
    //     return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val);
    //   }
    //   valid[field] = phone(val);
    // }
    // if (field === "password") {
    //   const val = values[field];
    //   function password(val) {
    //     return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/.test(val);
    //   }
    //   valid[field] = password(val);
    // }
    // if (field === "name" || field === "message") {
    //   const val = values[field];
    //   function password(val) {
    //     return val.length > 3;
    //   }
    //   valid[field] = password(val);
    // }
    // if (field === "zip") {
    //   const val = values[field];
    //   function password(val) {
    //     return /^\d{6}(-\d{6})?$/.test(val);
    //   }
    //    (valid[field] = password(val));
    // }
    // if (field === "city") {
    //   const val = values[field];
    //   function password(val) {
    //     return val.length >= 0;
    //   }
    //    (valid[field] = password(val));
    // }
    // if (field === "state" || field === "street") {
    //   const val = values[field];
    //   function password(val) {
    //     return val.length !== 0;
    //   }
    //    (valid[field] = password(val));
    // }
  });

  // return (valid[field] = validators[field](values[field]));
  return valid;
}
