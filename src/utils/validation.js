const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const mobileRegex = /[6-9]{1}[0-9]{9}/;
export const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
const mobileOtpRegex = /^\d{4}$/;
export const textRegex = /[a-zA-Z ]$/;
export const addressRegex = /^[a-zA-Z0-9,.(#-)* ]+$/;
export const textSpaceRegex = /^[A-Za-z\s]*$/;
export const numberRegex = /[0-9]+$|^$/;
export const validateEmail = (email) => {
  if (email.length <= 0) {
    return "Please enter the email address";
  }
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  return true;
};

export const validateMobileNo = (phoneNo) => {
  if (phoneNo.length <= 0) {
    return "Please enter mobile number";
  }
  if (phoneNo.length < 10) {
    return "Mobile number should be 10 digits.";
  }
  if (!mobileRegex.test(phoneNo)) {
    return "Invalid mobile number";
  }
  return true;
};

export const validatePan = (pan) => {
  if (pan.length <= 0) {
    return "Please enter your PAN number";
  }
  if (!panRegex.test(pan)) {
    return "Invalid PAN";
  }
  return true;
};

export const validateMobileOtp = (otp) => {
  if (otp.length <= 0) {
    return "Please enter the OTP";
  }
  if (!mobileOtpRegex.test(otp)) {
    return "Please enter valid OTP";
  }
  return true;
};

export const validateText = (value) => {
  if (!textRegex.test(value)) {
    return "Please enter valid name";
  }
  return true;
};

export const validateDate = (dob) => {
  var date = new Date();
  var currentYear = date.getFullYear();
  if (
    dob.date.length === 0 ||
    dob.month.length === 0 ||
    dob.year.length === 0 ||
    dob.year.length < 4 ||
    parseInt(dob.year) < 1920 ||
    parseInt(dob.year) > currentYear
  ) {
    return "Invalid DOB";
  }
  return true;
};

export const validateAddress = (value) => {
  if (value.length <= 0) {
    return "Please enter address";
  }
  if (!addressRegex.test(value)) {
    return "Please enter valid address";
  }
  return true;
};

export const ageCalculator = (dob) => {
  var dob1 = new Date(dob);
  var month_diff = Date.now() - dob1.getTime();
  var age_dt = new Date(month_diff);
  var year = age_dt.getUTCFullYear();
  return Math.abs(year - 1970);
};

export const validateAccountNo = (accountNo) => {
  if (accountNo.length < 9) {
    return "Please enter valid bank account No.";
  }
  return true;
};

export const validateIfscCode = (ifsc) => {
  if (ifsc.length < 11) {
    return "Please enter valid ifsc code";
  }
  return true;
};
