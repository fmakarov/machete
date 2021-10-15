export default function validate(values) {
  const valid = {};

  function email(val) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
  }

  function phone(val) {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val);
  }

  function password(val) {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/.test(val);
  }

  function name(val) {
    return val.length > 3;
  }

  function zip(val) {
    return /^\d{6}(-\d{6})?$/.test(val);
  }

  function city(val) {
    return val.length >= 0;
  }

  Object.keys(values).map((field) => {
    const val = values[field];
    switch (field) {
      case "email":
        return (valid[field] = email(val));
      case "phone":
        return (valid[field] = phone(val));
      case "password":
        return (valid[field] = password(val));
      case "name":
        return (valid[field] = name(val));
      case "message":
        return (valid[field] = name(val));
      case "zip":
        return (valid[field] = zip(val));
      case "city":
        return (valid[field] = city(val));
      default:
        return (valid[field] = val.length !== 0);
    }
  });

  return valid;
}
