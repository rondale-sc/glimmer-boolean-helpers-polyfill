# Glimmer Truth Helpers

This is a rudimentary version of ember-truth-helpers for use in Glimmer.js
applications. It supplies several helpers meant to be used within a given
template. It only includes helpers listed in this RFC:
https://github.com/cibernox/rfcs/blob/new-basic-handlebars-helpers/text/0000-basic-template-helpers.md

To install:

### Installation

```
ember install glimmer-truth-helpers
```

This will install the library and generate the helpers. This step is
necessary in Glimmer apps because there is no way (currently) to import the
helpers and use them without having your own helper. This will eventually be
addressed by this RFC: https://github.com/emberjs/rfcs/pull/367

### Usage

```
<!-- some-template.hbs !-->
{{#if (not false)}}
testing not
{{/if}}

{{#if (gt 2 1) }}
testing gt
{{/if}}

{{#if (gte 2 2) }}
testing gte
{{/if}}

{{#if (lt 2 1) }}
testing lt
{{/if}}

{{#if (lte 2 2) }}
testing lte
{{/if}}

{{#if (and true true) }}
testing and
{{/if}}

{{#if (eq 1 1)}}
testing eq
{{/if}}

{{#if (or false true)}}
testing or
{{/if}}
```