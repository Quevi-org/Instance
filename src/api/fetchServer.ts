export const getRandomQuestion = async (url: string) => {
    const res = await fetch(`${url}/random`)
    console.log(res)
    return await res.json() as Question
}

if (import.meta.vitest) {
    const { it, describe, expect } = import.meta.vitest
    const {VITE_TEST_URL} = import.meta.env

    describe("API calls", () => {
        it("should get a random question", async () => {
            const question = await getRandomQuestion(VITE_TEST_URL)
            expect(question).toHaveProperty("answers")
        })
    })
}