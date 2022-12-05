import { afterEach, beforeEach } from "node:test"
import normalizeUrl from "normalize-url"
import { expect } from "vitest"

export let serverList: string[] = []

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

if (import.meta.vitest) {
    const { it, describe, afterEach } = import.meta.vitest
    const {VITE_TEST_URL} = import.meta.env

    describe("Server List management", () => {
        afterEach(() => {
            removeServer(VITE_TEST_URL)
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
    })
}