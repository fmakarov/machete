export default function validate(values) {
  const validators = {
    email: (val) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val),
    phone: (val) =>
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val),
    password: (val) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/.test(val),
    name: (val) => val.length > 3,
    message: (val) => val.length > 3,
    confirmation: (val) =>
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        val
      ),
    // street: (val) =>
    //   /^(\d+) ?([А-Яа-я](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$/.test(
    //     val
    //   ),
    street: (val) => val.length !== 0,
    zip: (val) => /^\d{6}(-\d{6})?$/.test(val),
    city: (val) => val.length >= 0,
    state: (val) => val.length !== 0,
  };

  const valid = {};

  Object.keys(values).map((field) => {
    valid[field] = validators[field](values[field]);
  });

  return valid;
}
