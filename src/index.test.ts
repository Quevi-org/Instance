import { describe, expect, test } from "vitest";

describe("🔤 Env variables", () => {
    describe("Test variables", () => {
        test("TEST_URL", () => expect(import.meta.env.VITE_TEST_URL).toBeTypeOf("string"))
    })
})