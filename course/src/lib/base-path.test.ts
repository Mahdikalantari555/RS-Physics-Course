import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  createBaseRewrite,
  detectBasePath,
  normalizeBasePath,
  resolveAssetUrl,
} from "./base-path";

describe("normalizeBasePath", () => {
  it("normalizes empty, root, and slash variants", () => {
    assert.equal(normalizeBasePath(undefined), "");
    assert.equal(normalizeBasePath(""), "");
    assert.equal(normalizeBasePath("/"), "");
    assert.equal(normalizeBasePath("/RS-Physics-Course/"), "/RS-Physics-Course");
    assert.equal(normalizeBasePath("RS-Physics-Course"), "/RS-Physics-Course");
  });
});

describe("detectBasePath", () => {
  it("detects GitHub Pages project subpath with or without trailing slash", () => {
    assert.equal(
      detectBasePath("mahdikalantari555.github.io", "/RS-Physics-Course/", "/RS-Physics-Course"),
      "/RS-Physics-Course",
    );
    assert.equal(
      detectBasePath("mahdikalantari555.github.io", "/RS-Physics-Course", "/RS-Physics-Course"),
      "/RS-Physics-Course",
    );
    assert.equal(
      detectBasePath(
        "mahdikalantari555.github.io",
        "/RS-Physics-Course/lessons/introduction",
        "/RS-Physics-Course",
      ),
      "/RS-Physics-Course",
    );
  });

  it("supports forks on github.io even without matching VITE_BASE", () => {
    assert.equal(
      detectBasePath("someone.github.io", "/my-rs-fork/labs/wave", undefined),
      "/my-rs-fork",
    );
  });

  it("stays at root for root-hosted github.io user pages and localhost", () => {
    assert.equal(
      detectBasePath("mahdikalantari555.github.io", "/", "/RS-Physics-Course"),
      "",
    );
    assert.equal(
      detectBasePath("mahdikalantari555.github.io", "/lessons/introduction", "/RS-Physics-Course"),
      "",
    );
    assert.equal(
      detectBasePath("localhost", "/lessons/introduction", ""),
      "",
    );
    assert.equal(
      detectBasePath("ais-dev-example.run.app", "/solve/water-temp-5mm", "/RS-Physics-Course"),
      "",
    );
  });

  it("still preserves path-based preview proxy prefixes", () => {
    assert.equal(
      detectBasePath("preview.grokgsac.com", "/hds-abc123-6014-7b575/labs/wave", undefined),
      "/hds-abc123-6014-7b575",
    );
  });
});

describe("resolveAssetUrl", () => {
  it("prefixes root-relative assets without double-prefixing", () => {
    assert.equal(
      resolveAssetUrl("/assets/hero-123.jpg", "/RS-Physics-Course"),
      "/RS-Physics-Course/assets/hero-123.jpg",
    );
    assert.equal(
      resolveAssetUrl("/favicon.svg", "/RS-Physics-Course"),
      "/RS-Physics-Course/favicon.svg",
    );
    assert.equal(
      resolveAssetUrl("/RS-Physics-Course/assets/hero-123.jpg", "/RS-Physics-Course"),
      "/RS-Physics-Course/assets/hero-123.jpg",
    );
  });

  it("leaves root, external, data, and protocol-relative URLs intact", () => {
    assert.equal(resolveAssetUrl("/assets/hero-123.jpg", ""), "/assets/hero-123.jpg");
    assert.equal(
      resolveAssetUrl("https://example.com/a.png", "/RS-Physics-Course"),
      "https://example.com/a.png",
    );
    assert.equal(
      resolveAssetUrl("data:image/png;base64,AAA", "/RS-Physics-Course"),
      "data:image/png;base64,AAA",
    );
    assert.equal(
      resolveAssetUrl("//cdn.example.com/a.png", "/RS-Physics-Course"),
      "//cdn.example.com/a.png",
    );
  });
});

describe("createBaseRewrite", () => {
  const rewrite = createBaseRewrite("/RS-Physics-Course");
  const run = (fn: typeof rewrite.input, href: string) =>
    String(fn?.({ url: new URL(href, "https://mahdikalantari555.github.io") }));

  it("strips the repo prefix on input", () => {
    assert.equal(
      run(rewrite.input, "/RS-Physics-Course"),
      "https://mahdikalantari555.github.io/",
    );
    assert.equal(
      run(rewrite.input, "/RS-Physics-Course/"),
      "https://mahdikalantari555.github.io/",
    );
    assert.equal(
      run(rewrite.input, "/RS-Physics-Course/lessons/introduction?x=1"),
      "https://mahdikalantari555.github.io/lessons/introduction?x=1",
    );
  });

  it("re-attaches the repo prefix on output without duplicating it", () => {
    assert.equal(
      run(rewrite.output, "/"),
      "https://mahdikalantari555.github.io/RS-Physics-Course/",
    );
    assert.equal(
      run(rewrite.output, "/formulas"),
      "https://mahdikalantari555.github.io/RS-Physics-Course/formulas",
    );
    assert.equal(
      run(rewrite.output, "/RS-Physics-Course/formulas"),
      "https://mahdikalantari555.github.io/RS-Physics-Course/formulas",
    );
  });
});
