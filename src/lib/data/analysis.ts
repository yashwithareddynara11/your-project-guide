import {
  foodChoicesData,
  getConcentrationScore,
  getFrequencyScore,
  getHealthScore,
  type StudentRecord,
} from "./food-choices";

export type AggregatedRow = { name: string; value: number; [key: string]: string | number };

export function averageByGroup(
  groupBy: keyof StudentRecord,
  valueBy: (record: StudentRecord) => number,
): AggregatedRow[] {
  const groups = new Map<string, { sum: number; count: number }>();
  for (const record of foodChoicesData) {
    const key = String(record[groupBy]);
    const val = valueBy(record);
    const current = groups.get(key) ?? { sum: 0, count: 0 };
    current.sum += val;
    current.count += 1;
    groups.set(key, current);
  }
  return Array.from(groups.entries())
    .map(([name, { sum, count }]) => ({ name, value: Number((sum / count).toFixed(2)) }))
    .sort((a, b) => b.value - a.value);
}

export function countByGroup(groupBy: keyof StudentRecord): AggregatedRow[] {
  const groups = new Map<string, number>();
  for (const record of foodChoicesData) {
    const key = String(record[groupBy]);
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  return Array.from(groups.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function breakfastConcentrationData() {
  const groups = new Map<string, { concentrationSum: number; count: number; gpaSum: number }>();
  for (const record of foodChoicesData) {
    const key = record.breakfastFrequency;
    const current = groups.get(key) ?? { concentrationSum: 0, count: 0, gpaSum: 0 };
    current.concentrationSum += getConcentrationScore(record.concentrationLevel);
    current.gpaSum += record.gpa;
    current.count += 1;
    groups.set(key, current);
  }
  const order = ["Never", "Rarely", "Sometimes", "Often", "Always"] as const;
  return order
    .filter((key) => groups.has(key))
    .map((key) => {
      const g = groups.get(key)!;
      return {
        frequency: key,
        concentration: Number((g.concentrationSum / g.count).toFixed(2)),
        gpa: Number((g.gpaSum / g.count).toFixed(2)),
        students: g.count,
      };
    });
}

export function comfortFoodReasonsData() {
  return countByGroup("comfortFoodReason");
}

export function eatingOutVsCookingData() {
  const order = ["Never", "Rarely", "Sometimes", "Often", "Very often"];
  const eatingOut = new Map<string, number>();
  const cooking = new Map<string, number>();
  for (const record of foodChoicesData) {
    const eo = eatingOut.get(record.eatingOutFrequency) ?? 0;
    eatingOut.set(record.eatingOutFrequency, eo + getFrequencyScore(record.eatingOutFrequency));
    const c = cooking.get(record.cookingFrequency) ?? 0;
    cooking.set(record.cookingFrequency, c + getFrequencyScore(record.cookingFrequency));
  }
  return order
    .map((freq) => {
      const eoCount = eatingOut.get(freq) ?? 0;
      const cCount = cooking.get(freq) ?? 0;
      return {
        frequency: freq,
        eatingOut: eoCount,
        cooking: cCount,
      };
    })
    .filter((row) => row.eatingOut > 0 || row.cooking > 0);
}

export function healthByCuisineData() {
  return averageByGroup("favoriteCuisine", (r) => getHealthScore(r.healthRating));
}

export function cafeteriaData() {
  const bins = [
    { name: "0-1", min: 0, max: 1 },
    { name: "2-3", min: 2, max: 3 },
    { name: "4-5", min: 4, max: 5 },
    { name: "6+", min: 6, max: 999 },
  ];
  const rows = bins.map((bin) => ({
    servings: bin.name,
    vegetables: 0,
    fruits: 0,
    fastFood: 0,
  }));
  for (const record of foodChoicesData) {
    const vegBin = bins.find(
      (b) => record.vegetablesPerDay >= b.min && record.vegetablesPerDay <= b.max,
    );
    if (vegBin) {
      const row = rows.find((r) => r.servings === vegBin.name)!;
      row.vegetables += 1;
    }
    const fruitBin = bins.find((b) => record.fruitsPerDay >= b.min && record.fruitsPerDay <= b.max);
    if (fruitBin) {
      const row = rows.find((r) => r.servings === fruitBin.name)!;
      row.fruits += 1;
    }
    const ffBin =
      record.fastFoodPerWeek <= 1
        ? bins[0]
        : record.fastFoodPerWeek <= 3
          ? bins[1]
          : record.fastFoodPerWeek <= 5
            ? bins[2]
            : bins[3];
    const row = rows.find((r) => r.servings === ffBin.name)!;
    row.fastFood += 1;
  }
  return rows;
}

export function calorieAwarenessData() {
  return countByGroup("calorieAwareness");
}

export function stressVsHealthData() {
  const groups = new Map<string, { healthSum: number; count: number }>();
  for (const record of foodChoicesData) {
    const current = groups.get(record.stressLevel) ?? { healthSum: 0, count: 0 };
    current.healthSum += getHealthScore(record.healthRating);
    current.count += 1;
    groups.set(record.stressLevel, current);
  }
  return ["Low", "Moderate", "High"].map((level) => {
    const g = groups.get(level);
    return {
      stress: level,
      healthScore: g ? Number((g.healthSum / g.count).toFixed(2)) : 0,
      students: g?.count ?? 0,
    };
  });
}

export function keyStats() {
  const total = foodChoicesData.length;
  const breakfastEaters = foodChoicesData.filter((r) => r.eatsBreakfast).length;
  const avgGpa = foodChoicesData.reduce((acc, r) => acc + r.gpa, 0) / total;
  const avgFastFood = foodChoicesData.reduce((acc, r) => acc + r.fastFoodPerWeek, 0) / total;
  const avgVeg = foodChoicesData.reduce((acc, r) => acc + r.vegetablesPerDay, 0) / total;
  const topComfortReason = comfortFoodReasonsData()[0];
  return [
    { label: "Students surveyed", value: total, suffix: "" },
    {
      label: "Eat breakfast regularly",
      value: Math.round((breakfastEaters / total) * 100),
      suffix: "%",
    },
    { label: "Average GPA", value: Number(avgGpa.toFixed(2)), suffix: "" },
    { label: "Avg fast food / week", value: Number(avgFastFood.toFixed(1)), suffix: "" },
    { label: "Avg vegetable servings/day", value: Number(avgVeg.toFixed(1)), suffix: "" },
    { label: "Top comfort reason", value: topComfortReason?.name ?? "N/A", suffix: "" },
  ];
}
