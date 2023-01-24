export const passwordValidator = (arg, arg2) => {

   const uppercaseRegExp = /(?=.*?[A-Z])/;
   const lowercaseRegExp = /(?=.*?[a-z])/;
   const digitsRegExp = /(?=.*?[0-9])/;
   const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
   const minLengthRegExp = /.{8,}/;
   const passwordLength = arg.length;
   const uppercasePassword = uppercaseRegExp.test(arg);
   const lowercasePassword = lowercaseRegExp.test(arg);
   const digitsPassword = digitsRegExp.test(arg);
   const specialCharPassword = specialCharRegExp.test(arg);
   const minLengthPassword = minLengthRegExp.test(arg);

   if (passwordLength === 0) {
      return alert("Password is empty");
   } else if (!uppercasePassword) {
      return alert("The password must have at least one Uppercase");
   } else if (!lowercasePassword) {
      return alert("The password must have at least one Lowercase");
   } else if (!digitsPassword) {
      return alert("The password must have at least one digit");
   } else if (!specialCharPassword) {
      return alert("The password must have at least one Special Characters");
   } else if (!minLengthPassword) {
      return alert("The password must have at least minumum 8 characters");
   } else if (arg !== arg2) {
      return alert("Passwords do not match");
   }
   return true
}