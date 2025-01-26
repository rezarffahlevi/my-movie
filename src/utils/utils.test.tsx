import {
  capitalize,
  currencyFormat,
  numberFormat,
  objectToQueryParams,
  minutesToHours,
} from "./utils"; // Adjust the import according to your file structure

describe("Utils Functions", () => {
  describe("capitalize", () => {
    it("should convert all letters to uppercase", () => {
      expect(capitalize("hello")).toBe("HELLO");
      expect(capitalize("world")).toBe("WORLD");
    });
  });

  describe("currencyFormat", () => {
    it("should format the number with the provided currency symbol", () => {
      expect(currencyFormat(5000, "$")).toBe("$5.000");
      expect(currencyFormat(5000)).toBe("Rp5.000");
    });
  });

  describe("numberFormat", () => {
    it("should format the number with the specified separator", () => {
      expect(numberFormat(1234567)).toBe("1.234.567");
      expect(numberFormat(1234567, ",")).toBe("1,234,567");
    });

    it("should handle large numbers correctly", () => {
      expect(numberFormat(1234567890)).toBe("1.234.567.890");
    });
  });

  describe("objectToQueryParams", () => {
    it("should convert an object to a query string", () => {
      const params = { name: "John", age: 25 };
      expect(objectToQueryParams(params)).toBe("?name=John&age=25");
    });

    it("should exclude undefined or null values", () => {
      const params = { name: "John", age: null };
      expect(objectToQueryParams(params)).toBe("?name=John");
    });

    it("should return an empty string if no params are provided", () => {
      expect(objectToQueryParams()).toBe("");
    });
  });

  describe("minutesToHours", () => {
    it("should convert total minutes to hours and minutes format", () => {
      expect(minutesToHours(120)).toBe("2h 0m");
      expect(minutesToHours(75)).toBe("1h 15m");
      expect(minutesToHours(90)).toBe("1h 30m");
    });

    it("should handle edge cases correctly", () => {
      expect(minutesToHours(0)).toBe("0h 0m");
      expect(minutesToHours(1)).toBe("0h 1m");
    });
  });
});
