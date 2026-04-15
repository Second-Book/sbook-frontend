export const CONDITION_LABELS: Record<string, string> = {
  "New": "Novo",
  "Used - Excellent": "Polovno — odlično",
  "Used - Good": "Polovno — dobro",
  "Used - Fair": "Polovno — zadovoljavajuće",
};

export function getConditionLabel(condition: string): string {
  return CONDITION_LABELS[condition] ?? condition;
}
