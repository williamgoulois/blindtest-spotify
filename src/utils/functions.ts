export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function filterArrayWithArray<T>(array1: T[], array2: T[]) {
  return array1.filter((n) => !array2.includes(n))
}

/* Return a random number between 0 included and x excluded with an optional exludeArray */
export function getRandomNumber(x: number, excludeNumbers?: number[]): number {
  if (excludeNumbers === undefined) {
    return Math.floor(Math.random() * x)
  }

  const arrayRange0toX = Array.from(Array(x).keys())
  const arrayWithoutExcludedNumbers = filterArrayWithArray(arrayRange0toX, excludeNumbers)
  return arrayWithoutExcludedNumbers[Math.floor(Math.random() * arrayWithoutExcludedNumbers.length)]
}
