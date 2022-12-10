import normalizeUrl from "normalize-url"

export let serverList: string[] = [import.meta.env.VITE_DEFAULT_URL]

export const addServer = async (url: string) => {
    const nURL = normalizeUrl(url)
    await isServerAvaiable(nURL)
    
    if (serverList.indexOf(nURL) < 0) {
        serverList.push(nURL)
    }
    return serverList.indexOf(nURL)
}

export const removeServer = (url: string) => {
    const normalizedURL = normalizeUrl(url)

    const elementIndex = serverList.indexOf(normalizedURL)
    if (elementIndex >= 0) serverList.splice(elementIndex, 1)
}

export const isServerAvaiable = async (url: string) => {
    const res = await fetch(normalizeUrl(url))
    return res.ok
}

export const randomServer = () => {
    return serverList[Math.floor(Math.random() * serverList.length)]
}

if (import.meta.vitest) {
    const { it, describe, afterEach, expect } = import.meta.vitest
    const {VITE_TEST_URL} = import.meta.env

    describe("Server List management", () => {
        afterEach(() => {
            removeServer(VITE_TEST_URL)
        })

        it("should test if async wont crash", async () => {
            expect(true).toBeTruthy()
        })

        it("should check if the server was added", async () => {
            await addServer(VITE_TEST_URL)
            expect(serverList).toContain(VITE_TEST_URL)
        })

        it("should remove the added server", () => {
            removeServer(VITE_TEST_URL)
            expect(serverList).not.toContain(VITE_TEST_URL)
        })
        
        it("should test if the server is avaiable", async () => {
            expect(isServerAvaiable(VITE_TEST_URL)).toBeTruthy
        })

        it("should get a random server", async () => {
            await addServer(VITE_TEST_URL)
            expect(serverList).toContain(randomServer())
        })
    })
}