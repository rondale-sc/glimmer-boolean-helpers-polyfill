# Glimmer Truth Helpers

This is a rudimentary version of ember-truth-helpers.

It supplies several helpers meant to be used within a given template.  To install:

### Installation

```
ember install glimmer-truth-helpers
```

This will install the library and generate the helpers.  This step is necessary in Glimmer apps because there is no way (currently) to import the helpers and use them without having your own helper.  This will eventually be addressed by this RFC: https://github.com/emberjs/rfcs/pull/367

### Usage

```
<!-- some-template.hbs !-->
{{#if (eq 1 1) }}
  Hello, if 1 is equal to 1 this will print!
{{/if}}
```