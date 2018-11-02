import hbs from "@glimmer/inline-precompile";
import { setupRenderingTest, render } from "@glimmer/test-helpers";

const { module, test } = QUnit;

module("Component: Dummy", function(hooks) {
  setupRenderingTest(hooks);

  module("helper:and", function(hooks) {
    setupRenderingTest(hooks);
    test("boolean values", async function(assert) {
      await render(
        hbs`[{{and true true}}] [{{and true false}}] [{{and false true}}] [{{and false false}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [false] [false] [false]",
        'value should be "[true] [false] [false] [false]"'
      );
    });

    test("integer values", async function(assert) {
      await render(
        hbs`[{{and 1 1}}] [{{and 1 0}}] [{{and 0 1}}] [{{and 0 0}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[1] [0] [0] [0]",
        'value should be "[1] [0] [0] [0]"'
      );
    });

    test("string values", async function(assert) {
      await render(
        hbs`[{{and " " " "}}] [{{and " " ""}}] [{{and "" " "}}] [{{and "" ""}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[ ] [] [] []",
        'value should be "[ ] [] [] []"'
      );
    });

    test("undefined list length and boolean", async function(assert) {
      await render(hbs`[{{and array.length 1}}]`);

      assert.equal(this.containerElement.innerText, "[]", 'value should be "[]"');
    });

    test("null list length and boolean", async function(assert) {
      this.array = null

      await render(hbs`[{{and array.length 1}}]`);

      assert.equal(this.containerElement.innerText, "[]", 'value should be "[]"');
    });

    test("empty list length and boolean", async function(assert) {
      this.array = [];

      await render(hbs`[{{and array.length 1}}]`);

      assert.equal(this.containerElement.innerText, "[0]", 'value should be "[0]"');
    });

    test("non-empty list length and boolean", async function(assert) {
      this.array = ["a"];

      await render(hbs`[{{and array.length 2}}]`);

      assert.equal(this.containerElement.innerText, "[2]", 'value should be "[2]"');
    });
  });

  module("helper:eq", function(hooks) {
    setupRenderingTest(hooks);

    test("simple test 1", async function(assert) {
      await render(
        hbs`[{{eq true true}}] [{{eq true false}}] [{{eq false true}}] [{{eq false false}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [false] [false] [true]",
        'value should be "[true] [false] [false] [true]"'
      );
    });
  });

  module("helper:gt", function(hooks) {
    setupRenderingTest(hooks);

    test("boolean values", async function(assert) {
      await render(
        hbs`[{{gt true true}}] [{{gt true false}}] [{{gt false true}}] [{{gt false false}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[false] [true] [false] [false]",
        'value should be "[false] [true] [false] [false]"'
      );
    });

    test("integer values", async function(assert) {
      await render(hbs`[{{gt 1 1}}] [{{gt 1 0}}] [{{gt 0 1}}] [{{gt 0 0}}]`);

      assert.equal(
        this.containerElement.innerText,
        "[false] [true] [false] [false]",
        'value should be "[false] [true] [false] [false]"'
      );
    });

    test("decimal values", async function(assert) {
      await render(
        hbs`[{{gt 19.2 19.2}}] [{{gt 19.2 3.55}}] [{{gt 3.55 19.2}}] [{{gt 3.55 3.55}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[false] [true] [false] [false]",
        'value should be "[false] [true] [false] [false]"'
      );
    });

    test("integers in strings 1", async function(assert) {
      await render(
        hbs`[{{gt '1' '1' forceNumber=true}}] [{{gt '1' '0' forceNumber=true}}] [{{gt '0' '1' forceNumber=true}}] [{{gt '0' '0' forceNumber=true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[false] [true] [false] [false]",
        'value should be "[false] [true] [false] [false]"'
      );
    });

    test("integers in strings 2", async function(assert) {
      await render(
        hbs`[{{gt '102' '102' forceNumber=true}}] [{{gt '102' '98' forceNumber=true}}] [{{gt '98' '102' forceNumber=true}}] [{{gt '98' '98' forceNumber=true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[false] [true] [false] [false]",
        'value should be "[false] [true] [false] [false]"'
      );
    });

    test("decimals in strings", async function(assert) {
      await render(
        hbs`[{{gt '19.2' '19.2' forceNumber=true}}] [{{gt '19.2' '3.55' forceNumber=true}}] [{{gt '3.55' '19.2' forceNumber=true}}] [{{gt '3.55' '3.55' forceNumber=true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[false] [true] [false] [false]",
        'value should be "[false] [true] [false] [false]"'
      );
    });
  });

  module("helper:gte", function(hooks) {
    setupRenderingTest(hooks);

    test("boolean values", async function(assert) {
      await render(
        hbs`[{{gte true true}}] [{{gte true false}}] [{{gte false true}}] [{{gte false false}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [true] [false] [true]",
        'value should be "[false] [true] [false] [true]"'
      );
    });

    test("integer values", async function(assert) {
      await render(
        hbs`[{{gte 1 1}}] [{{gte 1 0}}] [{{gte 0 1}}] [{{gte 0 0}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [true] [false] [true]",
        'value should be "[true] [true] [false] [true]"'
      );
    });

    test("decimal values", async function(assert) {
      await render(
        hbs`[{{gte 19.2 19.2}}] [{{gte 19.2 3.55}}] [{{gte 3.55 19.2}}] [{{gte 3.55 3.55}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [true] [false] [true]",
        'value should be "[true] [true] [false] [true]"'
      );
    });

    test("integers in strings 1", async function(assert) {
      await render(
        hbs`[{{gte '1' '1' forceNumber=true}}] [{{gte '1' '0' forceNumber=true}}] [{{gte '0' '1' forceNumber=true}}] [{{gte '0' '0' forceNumber=true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [true] [false] [true]",
        'value should be "[true] [true] [false] [true]"'
      );
    });

    test("integers in strings 2", async function(assert) {
      await render(
        hbs`[{{gte '102' '102' forceNumber=true}}] [{{gte '102' '98' forceNumber=true}}] [{{gte '98' '102' forceNumber=true}}] [{{gte '98' '98' forceNumber=true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [true] [false] [true]",
        'value should be "[true] [true] [false] [true]"'
      );
    });

    test("decimals in strings", async function(assert) {
      await render(
        hbs`[{{gte '19.2' '19.2' forceNumber=true}}] [{{gte '19.2' '3.55' forceNumber=true}}] [{{gte '3.55' '19.2' forceNumber=true}}] [{{gte '3.55' '3.55' forceNumber=true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [true] [false] [true]",
        'value should be "[true] [true] [false] [true]"'
      );
    });
  });

  module("helper:lt", function(hooks) {
    setupRenderingTest(hooks);

    // Replace this with your real tests.
    test("boolean values", async function(assert) {
      await render(
        hbs`[{{lt true true}}] [{{lt true false}}] [{{lt false true}}] [{{lt false false}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[false] [false] [true] [false]",
        'value should be "[false] [false] [true] [false]"'
      );
    });

    test("integer values", async function(assert) {
      await render(hbs`[{{lt 1 1}}] [{{lt 1 0}}] [{{lt 0 1}}] [{{lt 0 0}}]`);

      assert.equal(
        this.containerElement.innerText,
        "[false] [false] [true] [false]",
        'value should be "[false] [false] [true] [false]"'
      );
    });

    test("decimal values", async function(assert) {
      await render(
        hbs`[{{lt 19.2 19.2}}] [{{lt 19.2 3.55}}] [{{lt 3.55 19.2}}] [{{lt 3.55 3.55}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[false] [false] [true] [false]",
        'value should be "[false] [false] [true] [false]"'
      );
    });

    test("integers in strings 1", async function(assert) {
      await render(
        hbs`[{{lt '1' '1' forceNumber=true}}] [{{lt '1' '0' forceNumber=true}}] [{{lt '0' '1' forceNumber=true}}] [{{lt '0' '0' forceNumber=true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[false] [false] [true] [false]",
        'value should be "[false] [false] [true] [false]"'
      );
    });

    test("integers in strings 2", async function(assert) {
      await render(
        hbs`[{{lt '102' '102' forceNumber=true}}] [{{lt '102' '98' forceNumber=true}}] [{{lt '98' '102' forceNumber=true}}] [{{lt '98' '98' forceNumber=true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[false] [false] [true] [false]",
        'value should be "[false] [false] [true] [false]"'
      );
    });

    test("decimals in strings", async function(assert) {
      await render(
        hbs`[{{lt '19.2' '19.2' forceNumber=true}}] [{{lt '19.2' '3.55' forceNumber=true}}] [{{lt '3.55' '19.2' forceNumber=true}}] [{{lt '3.55' '3.55' forceNumber=true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[false] [false] [true] [false]",
        'value should be "[false] [false] [true] [false]"'
      );
    });
  });

  module("helper:lte", function(hooks) {
    setupRenderingTest(hooks);

    // Replace this with your real tests.
    test("boolean values", async function(assert) {
      await render(
        hbs`[{{lte true true}}] [{{lte true false}}] [{{lte false true}}] [{{lte false false}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [false] [true] [true]",
        'value should be "[false] [false] [true] [true]"'
      );
    });

    test("integer values", async function(assert) {
      await render(
        hbs`[{{lte 1 1}}] [{{lte 1 0}}] [{{lte 0 1}}] [{{lte 0 0}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [false] [true] [true]",
        'value should be "[false] [false] [true] [true]"'
      );
    });

    test("decimal values", async function(assert) {
      await render(
        hbs`[{{lte 19.2 19.2}}] [{{lte 19.2 3.55}}] [{{lte 3.55 19.2}}] [{{lte 3.55 3.55}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [false] [true] [true]",
        'value should be "[false] [false] [true] [true]"'
      );
    });

    test("integers in strings 1", async function(assert) {
      await render(
        hbs`[{{lte '1' '1' forceNumber=true}}] [{{lte '1' '0' forceNumber=true}}] [{{lte '0' '1' forceNumber=true}}] [{{lte '0' '0' forceNumber=true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [false] [true] [true]",
        'value should be "[false] [false] [true] [true]"'
      );
    });

    test("integers in strings 2", async function(assert) {
      await render(
        hbs`[{{lte '102' '102' forceNumber=true}}] [{{lte '102' '98' forceNumber=true}}] [{{lte '98' '102' forceNumber=true}}] [{{lte '98' '98' forceNumber=true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [false] [true] [true]",
        'value should be "[false] [false] [true] [true]"'
      );
    });

    test("decimals in strings", async function(assert) {
      await render(
        hbs`[{{lte '19.2' '19.2' forceNumber=true}}] [{{lte '19.2' '3.55' forceNumber=true}}] [{{lte '3.55' '19.2' forceNumber=true}}] [{{lte '3.55' '3.55' forceNumber=true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[true] [false] [true] [true]",
        'value should be "[false] [false] [true] [true]"'
      );
    });
  });

  module("helper:not", function(hooks) {
    setupRenderingTest(hooks);

    test("simple test 1", async function(assert) {
      await render(
        hbs`[{{not true}}] [{{not false}}] [{{not null}}] [{{not undefined}}] [{{not ''}}] [{{not ' '}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[false] [true] [true] [true] [true] [false]",
        'value should be "[false] [true] [true] [true] [true] [false]"'
      );
    });

    test("simple test 2", async function(assert) {
      await render(
        hbs`[{{not true false}}] [{{not true false}}] [{{not null null false null}}] [{{not false null ' ' true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[false] [false] [true] [false]",
        'value should be "[false] [false] [true] [false]"'
      );
    });
  });

  module("helper:or", function(hooks) {
    setupRenderingTest(hooks);

    test("simple test 1", async function(assert) {
      await render(hbs`[{{or true 1 ' ' null undefined}}]`);

      assert.equal(this.containerElement.innerText, "[true]", 'value should be "[true]"');
    });

    test("simple test 2", async function(assert) {
      await render(hbs`[{{or null undefined true 1 ' '}}]`);

      assert.equal(this.containerElement.innerText, "[true]", 'value should be "[true]"');
    });

    test("simple test 3", async function(assert) {
      await render(
        hbs`[{{or false}}] [{{or true}}] [{{or 1}}] [{{or ''}}] [{{or false ''}}] [{{or true ''}}] [{{or '' true}}]`
      );

      assert.equal(
        this.containerElement.innerText,
        "[false] [true] [1] [] [] [true] [true]",
        'value should be "[false] [true] [1] [] [] [true] [true]"'
      );
    });
  });
});
