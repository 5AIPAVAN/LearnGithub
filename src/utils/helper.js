const zigZag = "lovqIwGRfnYOWwK";

export const getMobileOS = () => {
  var userAgent =
    typeof window != "undefined" ? window?.navigator.userAgent : "none";

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "android";
  }

  if (/android/i.test(userAgent)) {
    return "android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "ios";
  }

  return "android";
};

export const validateNumberOnly = (text) => {
  const re = /^[0-9]*$/;
  return re.test(text);
};

export const validateTextOnly = (text) => {
  const re = /^[a-zA-Z ]*$/;
  return re.test(text);
};

const localStorageHelper = {
  getItem(key) {
    try {
      const value = window.localStorage.getItem(key) || "";
      return JSON.parse(value);
    } catch (err) {
      return null;
    }
  },
  setItem(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value || null));
    } catch (err) {}
  },
  removeItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {}
  },
};

export const splitArrayChunk = (arr, chunkSize) => {
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
  }
};

export const numberToWords = (price) => {
  const sglDigit = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ],
    dblDigit = [
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ],
    tensPlace = [
      "",
      "ten",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ],
    handle_tens = function (dgt, prevDgt) {
      return 0 == dgt
        ? ""
        : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt]);
    },
    handle_utlc = function (dgt, nxtDgt, denom) {
      return (
        (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") +
        (0 != nxtDgt || dgt > 0 ? " " + denom : "")
      );
    };

  let str = "",
    digitIdx = 0,
    digit = 0,
    nxtDigit = 0,
    words = [];
  if (((price += ""), isNaN(parseInt(price)))) str = "";
  else if (parseInt(price) > 0 && price.length <= 10) {
    for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--)
      switch (
        ((digit = price[digitIdx] - 0),
        (nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0),
        price.length - digitIdx - 1)
      ) {
        case 0:
          words.push(handle_utlc(digit, nxtDigit, ""));
          break;
        case 1:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 2:
          words.push(
            0 != digit
              ? " " +
                  sglDigit[digit] +
                  " hundred" +
                  (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2]
                    ? " and"
                    : "")
              : ""
          );
          break;
        case 3:
          words.push(handle_utlc(digit, nxtDigit, "thousand"));
          break;
        case 4:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 5:
          words.push(handle_utlc(digit, nxtDigit, "lakh"));
          break;
        case 6:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 7:
          words.push(handle_utlc(digit, nxtDigit, "crore"));
          break;
        case 8:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 9:
          words.push(
            0 != digit
              ? " " +
                  sglDigit[digit] +
                  " hundred" +
                  (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2]
                    ? " and"
                    : " crore")
              : ""
          );
      }
    str = words.reverse().join("") + " rupees only";
  } else str = "";
  return str;
};

export const isNBFC = (bankName) => {
  let nfcArr = [
    "Bajaj Finance",
    "Shriram Finance",
    "LIC Housing Finance Ltd.",
    "PNB Housing Finance",
  ];

  if (nfcArr.includes(bankName)) {
    return true;
  }
  return false;
};

export const FirstLetterCapitalized = (word) => {
  return word.charAt(1).toUpperCase() + word.slice(2);
};

export const buildUrl = (url) => {
  if (localStorageHelper.getItem("utm_id")) {
    url.searchParams.append("utm_id", localStorageHelper.getItem("utm_id"));
  }
  if (localStorageHelper.getItem("utm_source")) {
    url.searchParams.append(
      "utm_source",
      localStorageHelper.getItem("utm_source")
    );
  }
  if (localStorageHelper.getItem("utm_medium")) {
    url.searchParams.append(
      "utm_medium",
      localStorageHelper.getItem("utm_medium")
    );
  }
  if (localStorageHelper.getItem("utm_campaign")) {
    url.searchParams.append(
      "utm_campaign",
      localStorageHelper.getItem("utm_campaign")
    );
  }
  if (localStorageHelper.getItem("utm_value")) {
    url.searchParams.append(
      "utm_value",
      localStorageHelper.getItem("utm_value")
    );
  }
  if (localStorageHelper.getItem("click_id")) {
    url.searchParams.append("click_id", localStorageHelper.getItem("click_id"));
  }
  if (localStorageHelper.getItem("gclid")) {
    url.searchParams.append("gclid", localStorageHelper.getItem("gclid"));
  }

  return url.href;
};

export const DropDownOptionsBuilder = (start, end, OptionsMap, isReverse) => {
  let Options = [];
  let startId = 1;

  if (!isReverse) {
    for (let i = start; i <= end; i++) {
      Options = [
        ...Options,
        { id: startId++, value: i, label: OptionsMap ? OptionsMap[i] : i },
      ];
    }
  } else {
    for (let i = end; i >= start; i--) {
      Options = [
        ...Options,
        { id: startId++, value: i, label: OptionsMap ? OptionsMap[i] : i },
      ];
    }
  }
  return Options;
};

export const calendar = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sept",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export const addZeroes = (num) => {
  const dec = num.toString().split(".")[1];
  const len = dec && dec.length > 2 ? dec.length : 2;
  return Number(num).toFixed(len);
};

export const encodeBase64 = (data) => {
  return Buffer.from(data).toString("base64");
};
export const decodeBase64 = (data) => {
  return Buffer.from(data, "base64").toString("ascii");
};

export const urlBuilder = (path) => {
  const pattern = new RegExp("\\<.*?\\>");
  const removedHTMLPath = new String(path.toLowerCase())
    .replace(pattern, "")
    .replace(/\s+/g, " ");
  return removedHTMLPath.split(" ").join("-");
};

export default localStorageHelper;
