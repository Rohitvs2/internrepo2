// Fisher-Yates shuffle
export function shuffleQuestions(questions, seed = null) {
  const arr = [...questions];
  let random = Math.random;
  // If a seed is provided, use a seeded random generator for user-specific shuffling
  if (seed !== null) {
    let s = seed;
    random = () => {
      // Simple LCG for deterministic shuffling
      s = Math.sin(s) * 10000;
      return s - Math.floor(s);
    };
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
