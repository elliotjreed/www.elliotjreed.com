const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ordinalSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  return { 1: "st", 2: "nd", 3: "rd" }[day % 10] ?? "th";
};

export const toIsoDate = (isoDateOrTimestamp: string): string => isoDateOrTimestamp.slice(0, 10);

export const formatLongDate = (isoDateOrTimestamp: string): string => {
  const [year, month, day] = toIsoDate(isoDateOrTimestamp).split("-").map(Number);

  return `${day}${ordinalSuffix(day)} ${MONTHS[month - 1]} ${year}`;
};
