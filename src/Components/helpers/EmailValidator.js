export const emailValidator = (arg) => {
   const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   const emailValidation = emailRegExp.test(arg);
   if (!emailValidation) {
      return alert("Invalid email format");
   }
} 