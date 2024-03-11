import { encodeString, decodeString, getAbsoluteIRI, stripFragmentFromString, getFragmentFromString, getBaseURL, getPathURL } from "../uri";

describe("uri", () => {
  const ENCODED_URL = "https%3A%2F%2Fexample.com";
  const DECODED_URL = "https://example.com";
  const URL_WITH_FRAGMENT = "https://example.com/profile/card#me";
  const URL_WITHOUT_FRAGMENT = "https://example.com/profile/card";
  const BASE_URL = "https://example.com/profile/";

  describe("encodeString", () => {
    it("returns an encoded URL", () => {
      const result = encodeString(DECODED_URL);
      expect(result).toEqual(ENCODED_URL);
    });
  });

  describe("decodeString", () => {
    it("returns a decoded URL", () => {
      const result = decodeString(ENCODED_URL);
      expect(result).toEqual(DECODED_URL);
    });
  });

  describe("getAbsoluteIRI", () => {
    it("returns correct IRI for a container relative path", () => {
      const result = getAbsoluteIRI(DECODED_URL, "/example/");
      expect(result).toEqual(`${DECODED_URL}/example/`);
    });
    it("returns correct IRI for a resource relative path", () => {
      const result = getAbsoluteIRI(DECODED_URL, "/example");
      expect(result).toEqual(`${DECODED_URL}/example`);
    });
    it("returns correct IRI for a full IRI", () => {
      const result = getAbsoluteIRI(DECODED_URL, "https://example.com");
      expect(result).toEqual(DECODED_URL);
    });
  });

  describe("stripFragmentFromString", () => {
    it("returns a string without fragment", () => {
      const result = stripFragmentFromString(URL_WITH_FRAGMENT);
      expect(result).toEqual(URL_WITHOUT_FRAGMENT);
    });
  });
  
  describe("getFragmentFromString", () => {
    it("returns fragment from a given string", () => {
      const result = getFragmentFromString(URL_WITH_FRAGMENT);
      expect(result).toEqual("me");
    });
    it("returns fragment from a given string", () => {
      const result = getFragmentFromString(URL_WITHOUT_FRAGMENT);
      expect(result).toEqual("");
    });
  });

  describe("getBaseUrl", () => {
    it("returns the base URL for a given URL", () => {
      const result = getBaseURL(URL_WITH_FRAGMENT);
      expect(result).toEqual(BASE_URL);
    });
  });

  describe("getPathUrl", () => {
    it("returns path URL for a given URL", () => {
      const result = getPathURL(URL_WITH_FRAGMENT);
      expect(result).toEqual(URL_WITHOUT_FRAGMENT);
    });
  });
});
