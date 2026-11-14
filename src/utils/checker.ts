export function normalizeText(s: string): string {
  if (!s) return '';
  return s
    .toLowerCase()
    .replace(/ё/g, 'е')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics: š -> s, etc.
    .replace(/[«»"'.,!?()\-–—_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[m][n];
}

export function checkTextAnswer(
  userInput: string,
  correctAnswer?: string,
  aliases: string[] = [],
  questionId?: number
): boolean {
  if (!userInput.trim()) return false;
  const normalizedInput = normalizeText(userInput);

  // Special rule for question 10: "Засчитывать, если в ответе есть слово «губ» в любой форме"
  if (questionId === 10) {
    if (normalizedInput.includes('губ') || normalizedInput.includes('lip')) {
      return true;
    }
  }

  const targets = [correctAnswer, ...aliases]
    .filter((t): t is string => Boolean(t))
    .map(normalizeText);

  for (const target of targets) {
    if (!target) continue;

    // Exact match
    if (normalizedInput === target) {
      return true;
    }

    // Contains as a phrase / word
    if (normalizedInput.includes(target)) {
      return true;
    }

    // Levenshtein distance <= 1 for longer words (> 5 chars)
    if (target.length > 5 && Math.abs(normalizedInput.length - target.length) <= 1) {
      if (levenshteinDistance(normalizedInput, target) <= 1) {
        return true;
      }
    }
  }

  return false;
}
