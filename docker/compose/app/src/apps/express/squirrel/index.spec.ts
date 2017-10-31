import { bestVersion } from "./index";

describe("express/squirrel", () => {

    it("Finds best match", () => {
        const versions: string[] = [
            "0.9.0",
            "1.0.0",
        ];
        expect(bestVersion("0.0.1", versions)).toBe("1.0.0");
        expect(bestVersion("1.0.0", versions)).toBe("1.0.0");
        expect(bestVersion("1.0.1", versions)).toBe(null);
    });
});
