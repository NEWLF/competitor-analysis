// 100000 -> 100,000 형태로 변환하는 함수
export const numberWithCommas = (x: number) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 1000 단위마다 K,M,G 형태로 변환
// thousandUnitFormatter(759878, 1) -> 759.9k
// thousandUnitFormatter(759878, 0) -> 760k
export const thousandUnitFormatter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

// 반올림 함수
// decimal : 남길 소수점 자리수 (1이면 한자리수, 2면 두자리수)
// decimal이 1일 경우 1.777 -> 1.8
// decimal이 2일 경우 1.777 -> 1.78
export const roundWithDecimal = (value, decimal = 1) => {
  return Math.round(value * (10 * decimal)) / (10 * decimal);
};
