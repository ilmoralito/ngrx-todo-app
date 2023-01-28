const words: readonly string[] = [
    "Lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
];

export function getRandomWords(size = 3) {
    const output: string[] = []

    for (let i = 0; i <= size - 1; i++) {
        const index = Math.floor(Math.random() * 10)

        output.push(words[index]);
    }

    return output.join(' ')
}
