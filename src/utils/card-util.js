// import Payment from "payment";

// function clearNumber(value = "") {
//   return value.replace(/\D+/g, "");
// }

// export function formatCreditCardNumber() {
//   if (!value) {
//     return value;
//   }

//   const issuer = Payment.fns.cardType(value);
//   const clearValue = clearNumber(value);
//   let nextValue;

//   switch (issuer) {
//     case "amex":
//       nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
//         4,
//         10,
//       )} ${clearValue.slice(10, 15)}`;
//       break;
//     case "dinersclub":
//       nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
//         4,
//         10,
//       )} ${clearValue.slice(10, 14)}`;
//       break;
//     default:
//       nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
//         4,
//         8,
//       )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
//       break;
//   }

//   return nextValue.trim();
// }

// export function formatCVC() {
//   const clearValue = clearNumber(value);
//   const maxLength = 4;

//   return clearValue.slice(0, maxLength);
// }

// export function formatExpirationDate() {
//   const clearValue = clearNumber(value);
//   if (clearValue.length < 3) {
//     return clearValue;
//   }
//   const month = clearValue.slice(0, 2);
//   const year = clearValue.slice(2, 4);
//   return `${month}/${year}`;
// }

// export function formatFormData() {
//   return Object.keys(data).map((d) => `${d}: ${(data)[d]}`);
// }



import Payment from "payment";

function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }

  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
    case "amex":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 15)}`;
      break;
    case "dinersclub":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 14)}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        8
      )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
      break;
  }

  return nextValue.trim();
}

export function formatCVC(value, cardNumber) {
  const clearValue = clearNumber(value);
  const issuer = Payment.fns.cardType(cardNumber);
  const maxLength = issuer === "amex" ? 4 : 3;

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}

export function formatFormData(data) {
  return Object.keys(data).map((d) => `${d}: ${data[d]}`);
}