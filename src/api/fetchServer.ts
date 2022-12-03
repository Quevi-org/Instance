export const getRandomQuestion = async () => {
    const res = await fetch("http://localhost:8000/random")
    console.log(res)
    return await res.json() as Question
}