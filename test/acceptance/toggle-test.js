import { acceptance, visible } from "discourse/tests/helpers/qunit-helpers";
import { visit } from "@ember/test-helpers";
import { test } from "qunit";
import Session from "discourse/models/session";

acceptance("Color Scheme Toggle - header icon", function (needs) {
  needs.hooks.beforeEach(() => {
    settings.add_color_scheme_toggle_to_header = true;
    Session.currentProp("darkModeAvailable", true);
  });

  needs.hooks.afterEach(() => {
    Session.currentProp("darkModeAvailable", null);
  });

  test("shows in header", async function (assert) {
    await visit("/");

    assert.ok(
      visible(".header-color-scheme-toggle"),
      "button present in header"
    );
  });
});

acceptance("Color Scheme Toggle - no op", function (needs) {
  needs.hooks.beforeEach(() => {
    settings.add_color_scheme_toggle_to_header = true;
  });

  test("does not show when no dark color scheme available", async function (assert) {
    await visit("/");

    assert.ok(
      !visible(".header-color-scheme-toggle"),
      "button is not present in header"
    );
  });
});

acceptance("Color Scheme Toggle - sidebar icon", function (needs) {
  needs.settings({
    enable_sidebar: true,
    enable_experimental_sidebar_hamburger: true,
  });

  needs.hooks.beforeEach(() => {
    settings.add_color_scheme_toggle_to_header = false;
    Session.currentProp("darkModeAvailable", true);
  });

  needs.hooks.afterEach(() => {
    Session.currentProp("darkModeAvailable", null);
  });

  test("shows in sidebar", async function (assert) {
    await visit("/");

    assert.ok(
      !visible(".header-color-scheme-toggle"),
      "button not present in header"
    );

    const toggleButton = ".sidebar-footer-wrapper .color-scheme-toggler";
    assert.ok(visible(toggleButton), "button in footer");
  });
});
