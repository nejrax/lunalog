export type CorrelationStat = {
  label: string;
  effect: string;
  confidence: number;
  sampleSize: number;
};

export type SymptomHeat = {
  symptom: string;
  intensity: number;
  trend: "up" | "down" | "flat";
};

export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  tag: string;
  publishedAt: string;
};

export type ForumTopic = {
  id: string;
  title: string;
  replies: number;
  updatedAt: string;
};

export const correlationStats: CorrelationStat[] = [
  {
    label: "Spearmint tea",
    effect: "Lower acne severity (weak evidence)",
    confidence: 0.62,
    sampleSize: 418,
  },
  {
    label: "Strength training",
    effect: "Improved fatigue scores",
    confidence: 0.71,
    sampleSize: 602,
  },
  {
    label: "Low GI meals",
    effect: "Fewer sugar-crash symptoms",
    confidence: 0.67,
    sampleSize: 533,
  },
];

export const symptomHeat: SymptomHeat[] = [
  { symptom: "Pelvic pain", intensity: 86, trend: "up" },
  { symptom: "Bloating", intensity: 74, trend: "flat" },
  { symptom: "Fatigue", intensity: 81, trend: "up" },
  { symptom: "Irregular cycle", intensity: 69, trend: "down" },
  { symptom: "Acne", intensity: 58, trend: "flat" },
  { symptom: "Mood swings", intensity: 63, trend: "up" },
];

export const impactCounters = {
  experiences: 12847,
  insights: 312,
  countries: 67,
};

export const blogHighlights: BlogPost[] = [
  {
    id: "b1",
    title: "What the community data suggests about magnesium",
    summary:
      "A plain-language summary of correlation signals in cramps, sleep quality, and anxiety logs.",
    tag: "Evidence summary",
    publishedAt: "2026-02-22",
  },
  {
    id: "b2",
    title: "PCOS patterns: food timing & energy dips",
    summary:
      "Common weekly patterns that show up when meal timing changes—plus limitations and confounders.",
    tag: "Community patterns",
    publishedAt: "2026-02-18",
  },
  {
    id: "b3",
    title: "Endometriosis: pain flare-ups & lifestyle factors",
    summary:
      "Aggregated trends from anonymized logs. Not medical advice—just descriptive statistics.",
    tag: "Data snapshot",
    publishedAt: "2026-02-10",
  },
];

export const trendingTopics: ForumTopic[] = [
  {
    id: "t1",
    title: "What helped your bloating the most (non-medical)?",
    replies: 214,
    updatedAt: "2h ago",
  },
  {
    id: "t2",
    title: "Weekly log template: what do you track?",
    replies: 96,
    updatedAt: "6h ago",
  },
  {
    id: "t3",
    title: "Heatmap question: pain vs. sleep correlation",
    replies: 57,
    updatedAt: "1d ago",
  },
];
