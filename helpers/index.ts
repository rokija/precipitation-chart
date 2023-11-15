type DayData = {
  day: number;
  currentPrecipitation: number;
  historicalAverage: number;
  optimalZone: number[];
};

type MonthData = {
  month: string;
  days: DayData[];
};

export const getLast29Days = (
  data: MonthData[],
  currentDate: Date
): MonthData[] => {
  const currentMonthIndex = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  let result: MonthData[] = [];
  let count = 0;

  const currentMonth = currentMonthIndex + 1;

  for (let i = currentMonth; count < 29 && i >= 0; i--) {
    let monthData: MonthData = { month: data[i].month, days: [] };

    for (let j = data[i].days.length - 1; j >= 0; j--) {
      let dayData = data[i].days[j];

      if (
        (i === currentMonth && dayData.day <= currentDay) ||
        i < currentMonth
      ) {
        monthData.days.unshift(dayData);
        count++;
        if (count === 29) break;
      }
    }

    if (monthData.days.length > 0) {
      result.unshift(monthData); // Prepend the month data to keep the chronological order
    }
  }

  return result;
};

export const getRiskColor = (difference: number) => {
  if (difference >= 3) {
    return "#ED4040";
  }
  if (difference >= 2) {
    return "#EDC240";
  } else {
    return "#20BA81";
  }
};
