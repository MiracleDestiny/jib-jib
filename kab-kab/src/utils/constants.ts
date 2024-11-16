export const MONTH_MAP = [
  { key: "January", value: "1" },
  { key: "February", value: "2" },
  { key: "March", value: "3" },
  { key: "April", value: "4" },
  { key: "May", value: "5" },
  { key: "June", value: "6" },
  { key: "July", value: "7" },
  { key: "August", value: "8" },
  { key: "September", value: "9" },
  { key: "October", value: "10" },
  { key: "November", value: "11" },
  { key: "December", value: "12" },
];

export const DAY_MAP = Array.from({ length: 31 }, (_, i) => ({
  key: `${i + 1}`,
  value: `${i + 1}`,
}));

export const YEAR_MAP = Array.from({ length: 26 }, (_, i) => ({
  key: `${2000 + i}`,
  value: `${2000 + i}`,
}));
