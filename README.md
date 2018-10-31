# glimmer-boolean-helpers-polyfill

*Currently this is for glimmer applications only*

This polyfill create template helpers for the commonly used
ember-truth-helper boolean helpers. The included helpers are outlined in this
RFC:

- [Basic Template Helpers RFC](https://github.com/cibernox/rfcs/blob/new-basic-handlebars-helpers/text/0000-basic-template-helpers.md)

To install:

### Installation

```
ember install glimmer-boolean-helpers-polyfill
```

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