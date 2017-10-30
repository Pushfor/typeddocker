import { bestVersion } from "./index";

describe("express/squirrel", () => {

    it("Finds best match", () => {
        expect(bestVersion("0.0.1", "darwin")).toBe("1.0.0");
        expect(bestVersion("1.0.0", "darwin")).toBe("1.0.0");
        expect(bestVersion("1.0.1", "darwin")).toBe(null);
    });
});
