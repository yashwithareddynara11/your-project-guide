export interface StudentRecord {
  id: string;
  age: number;
  gender: "Male" | "Female" | "Non-binary";
  year: "First" | "Second" | "Third" | "Fourth";
  major: string;
  // Breakfast
  eatsBreakfast: boolean;
  breakfastFrequency: "Never" | "Rarely" | "Sometimes" | "Often" | "Always";
  // Diet & awareness
  calorieAwareness: "Unaware" | "Slightly aware" | "Moderately aware" | "Very aware";
  caloriesPerDay: number;
  // Comfort food
  comfortFoodReason: "Stress" | "Boredom" | "Sadness" | "Happiness" | "Habit" | "Social";
  comfortFoodType: "Sweet" | "Salty" | "Fast food" | "Fried" | "Healthy" | "Cultural";
  stressLevel: "Low" | "Moderate" | "High";
  // Health & habits
  healthRating: "Poor" | "Fair" | "Good" | "Very good" | "Excellent";
  exerciseFrequency: "Never" | "Rarely" | "Sometimes" | "Often" | "Daily";
  sleepHours: number;
  weight: number;
  // Eating behavior
  eatingOutFrequency: "Never" | "Rarely" | "Sometimes" | "Often" | "Very often";
  cookingFrequency: "Never" | "Rarely" | "Sometimes" | "Often" | "Always";
  fastFoodPerWeek: number;
  vegetablesPerDay: number;
  fruitsPerDay: number;
  waterGlassesPerDay: number;
  // Cuisine
  favoriteCuisine:
    | "Greek"
    | "Italian"
    | "Indian"
    | "Thai"
    | "American"
    | "Mexican"
    | "Chinese"
    | "Japanese";
  // Academic
  concentrationLevel: "Low" | "Moderate" | "High" | "Very high";
  gpa: number;
  energyLevel: "Low" | "Moderate" | "High";
}

const MAJORS = [
  "Computer Science",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Psychology",
  "Biology",
  "Economics",
  "Medicine",
  "Law",
  "Architecture",
  "Design",
  "Mathematics",
  "Physics",
  "Chemistry",
];

const YEARS: StudentRecord["year"][] = ["First", "Second", "Third", "Fourth"];
const GENDERS: StudentRecord["gender"][] = ["Male", "Female", "Non-binary"];
const FREQUENCY_5: StudentRecord["breakfastFrequency"][] = [
  "Never",
  "Rarely",
  "Sometimes",
  "Often",
  "Always",
];
const AWARENESS: StudentRecord["calorieAwareness"][] = [
  "Unaware",
  "Slightly aware",
  "Moderately aware",
  "Very aware",
];
const COMFORT_REASONS: StudentRecord["comfortFoodReason"][] = [
  "Stress",
  "Boredom",
  "Sadness",
  "Happiness",
  "Habit",
  "Social",
];
const COMFORT_TYPES: StudentRecord["comfortFoodType"][] = [
  "Sweet",
  "Salty",
  "Fast food",
  "Fried",
  "Healthy",
  "Cultural",
];
const STRESS_LEVELS: StudentRecord["stressLevel"][] = ["Low", "Moderate", "High"];
const HEALTH_RATINGS: StudentRecord["healthRating"][] = [
  "Poor",
  "Fair",
  "Good",
  "Very good",
  "Excellent",
];
const EXERCISE: StudentRecord["exerciseFrequency"][] = [
  "Never",
  "Rarely",
  "Sometimes",
  "Often",
  "Daily",
];
const EATING_OUT: StudentRecord["eatingOutFrequency"][] = [
  "Never",
  "Rarely",
  "Sometimes",
  "Often",
  "Very often",
];
const COOKING: StudentRecord["cookingFrequency"][] = [
  "Never",
  "Rarely",
  "Sometimes",
  "Often",
  "Always",
];
const CUISINES: StudentRecord["favoriteCuisine"][] = [
  "Greek",
  "Italian",
  "Indian",
  "Thai",
  "American",
  "Mexican",
  "Chinese",
  "Japanese",
];
const CONCENTRATION: StudentRecord["concentrationLevel"][] = [
  "Low",
  "Moderate",
  "High",
  "Very high",
];
const ENERGY: StudentRecord["energyLevel"][] = ["Low", "Moderate", "High"];

function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function pickWeighted<T>(seed: number, options: T[], weights: number[]): T {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = seededRandom(seed) * total;
  for (let i = 0; i < options.length; i++) {
    r -= weights[i];
    if (r <= 0) return options[i];
  }
  return options[options.length - 1];
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function normalish(seed: number, mean: number, sd: number) {
  const u1 = seededRandom(seed);
  const u2 = seededRandom(seed + 1);
  const z = Math.sqrt(-2 * Math.log(u1 + 0.0001)) * Math.cos(2 * Math.PI * u2);
  return z * sd + mean;
}

export function generateDataset(count = 250): StudentRecord[] {
  const data: StudentRecord[] = [];

  for (let i = 0; i < count; i++) {
    const seed = i + 1;
    const gender = pickWeighted(seed, GENDERS, [45, 50, 5]);
    const year = pickWeighted(seed + 2, YEARS, [30, 28, 24, 18]);
    const age =
      year === "First"
        ? 18
        : year === "Second"
          ? 19
          : year === "Third"
            ? 20
            : 21 + Math.floor(seededRandom(seed + 3) * 3);
    const major = MAJORS[Math.floor(seededRandom(seed + 4) * MAJORS.length)];

    // Breakfast habits: engineering/busy students skip more
    const isEngineering = major.includes("Engineering");
    const breakfastWeights = isEngineering ? [15, 25, 30, 20, 10] : [5, 10, 25, 35, 25];
    const breakfastFrequency = pickWeighted(seed + 5, FREQUENCY_5, breakfastWeights);
    const eatsBreakfast = breakfastFrequency === "Often" || breakfastFrequency === "Always";

    // Calorie awareness
    const calorieAwareness = pickWeighted(seed + 6, AWARENESS, [18, 28, 34, 20]);
    const caloriesPerDay = Math.round(normalish(seed + 7, 2100, 450));

    // Comfort food: stress and boredom dominate
    const stressLevel = pickWeighted(seed + 8, STRESS_LEVELS, [20, 45, 35]);
    const comfortFoodReason =
      stressLevel === "High"
        ? pickWeighted(seed + 9, COMFORT_REASONS, [45, 25, 12, 8, 6, 4])
        : pickWeighted(seed + 9, COMFORT_REASONS, [20, 35, 10, 12, 13, 10]);
    const comfortFoodType = pickWeighted(seed + 10, COMFORT_TYPES, [25, 18, 22, 15, 8, 12]);

    // Health: correlates with breakfast, exercise, stress
    const exerciseFrequency = pickWeighted(
      seed + 11,
      EXERCISE,
      eatsBreakfast ? [8, 12, 28, 35, 17] : [15, 22, 32, 22, 9],
    );
    const sleepHours = clamp(
      stressLevel === "High" ? normalish(seed + 12, 6.2, 0.9) : normalish(seed + 12, 7.2, 1),
      4,
      10,
    );
    const weight = Math.round(
      normalish(seed + 13, gender === "Male" ? 72 : gender === "Female" ? 62 : 66, 12),
    );

    const healthIndex =
      (eatsBreakfast ? 1 : 0) +
      (exerciseFrequency === "Daily" ? 2 : exerciseFrequency === "Often" ? 1 : 0) -
      (stressLevel === "High" ? 1 : 0) +
      (sleepHours >= 7 ? 1 : 0);
    const healthRating = pickWeighted(
      seed + 14,
      HEALTH_RATINGS,
      healthIndex <= 0
        ? [25, 40, 25, 8, 2]
        : healthIndex === 1
          ? [10, 30, 40, 15, 5]
          : healthIndex === 2
            ? [4, 15, 40, 30, 11]
            : [2, 8, 25, 40, 25],
    );

    // Eating out / cooking
    const eatingOutFrequency = pickWeighted(seed + 15, EATING_OUT, [5, 15, 30, 35, 15]);
    const cookingFrequency = pickWeighted(
      seed + 16,
      COOKING,
      eatingOutFrequency === "Very often" || eatingOutFrequency === "Often"
        ? [8, 25, 35, 22, 10]
        : [3, 12, 30, 35, 20],
    );
    const fastFoodPerWeek = Math.round(
      clamp(
        (eatingOutFrequency === "Very often"
          ? 5
          : eatingOutFrequency === "Often"
            ? 3
            : eatingOutFrequency === "Sometimes"
              ? 2
              : 1) + normalish(seed + 17, 0, 1.5),
        0,
        14,
      ),
    );

    const vegetablesPerDay = Math.round(
      clamp(
        (cookingFrequency === "Always" ? 3.5 : cookingFrequency === "Often" ? 2.8 : 1.5) +
          normalish(seed + 18, 0, 1),
        0,
        7,
      ),
    );
    const fruitsPerDay = Math.round(
      clamp(
        (healthRating === "Excellent" || healthRating === "Very good" ? 2.5 : 1.2) +
          normalish(seed + 19, 0, 1),
        0,
        6,
      ),
    );
    const waterGlassesPerDay = Math.round(
      clamp(normalish(seed + 20, exerciseFrequency === "Daily" ? 8 : 5.5, 2), 1, 12),
    );

    const favoriteCuisine = pickWeighted(seed + 21, CUISINES, [12, 20, 16, 8, 18, 10, 10, 6]);

    // Academic performance correlates with breakfast, sleep, health
    const concentrationLevel =
      healthIndex >= 2
        ? pickWeighted(seed + 22, CONCENTRATION, [5, 15, 45, 35])
        : pickWeighted(seed + 22, CONCENTRATION, [18, 35, 32, 15]);
    const gpa = clamp(
      (concentrationLevel === "Very high"
        ? 3.7
        : concentrationLevel === "High"
          ? 3.3
          : concentrationLevel === "Moderate"
            ? 2.9
            : 2.4) + normalish(seed + 23, 0, 0.25),
      2.0,
      4.0,
    );
    const energyLevel =
      healthIndex >= 2
        ? pickWeighted(seed + 24, ENERGY, [8, 25, 67])
        : pickWeighted(seed + 24, ENERGY, [30, 45, 25]);

    data.push({
      id: `student-${i + 1}`,
      age,
      gender,
      year,
      major,
      eatsBreakfast,
      breakfastFrequency,
      calorieAwareness,
      caloriesPerDay,
      comfortFoodReason,
      comfortFoodType,
      stressLevel,
      healthRating,
      exerciseFrequency,
      sleepHours,
      weight,
      eatingOutFrequency,
      cookingFrequency,
      fastFoodPerWeek,
      vegetablesPerDay,
      fruitsPerDay,
      waterGlassesPerDay,
      favoriteCuisine,
      concentrationLevel,
      gpa: Math.round(gpa * 100) / 100,
      energyLevel,
    });
  }

  return data;
}

export const foodChoicesData = generateDataset(300);

export function getHealthScore(rating: StudentRecord["healthRating"]) {
  const map: Record<StudentRecord["healthRating"], number> = {
    Poor: 1,
    Fair: 2,
    Good: 3,
    "Very good": 4,
    Excellent: 5,
  };
  return map[rating];
}

export function getConcentrationScore(level: StudentRecord["concentrationLevel"]) {
  const map: Record<StudentRecord["concentrationLevel"], number> = {
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very high": 4,
  };
  return map[level];
}

export function getFrequencyScore(
  level: StudentRecord["eatingOutFrequency"] | StudentRecord["cookingFrequency"],
) {
  const map: Record<string, number> = {
    Never: 1,
    Rarely: 2,
    Sometimes: 3,
    Often: 4,
    "Very often": 5,
    Always: 5,
  };
  return map[level] ?? 1;
}
