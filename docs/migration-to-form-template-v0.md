# Form Template v0

| Author | Phuc Nguyen |
|--------|-------------|
| Date   | 27 Aug 2024 |

## Introduction

In the RFC-025: Dynamic UI Form Processing, I introduce new module `form-template` along with a lot of component start
with prefix `RHF` (React Hook Form) which will normalize the process to implement form and make the process to create
form easier.

## Why you should migrate?

1. New `RHF component` includes many features and enhance user control with them. Moreover, they provide us with a
   shorter
   syntax and easier to implement.

2. New `Block components` will speed up the process in case you facing with a bunch field inside a form.

## Breaking changes: Control Props

> Don't repeat your self

I use `useFormContext` to get the current context and then extract the control corresponding with their `name`

❌ Pass in the control props in every component

```typescript jsx
<TextInput
  placeholder="i.e: 97531"
  label="Business zip code"
  name={FIELD_NAMES.POSTAL_CODE}
  control={form.control} // 🙅
  className="col-span-12 lg:col-span-4"
  required
/>
```

✅ Don't need to pass control to props

```typescript jsx
<RHFTextInput
  placeholder="i.e: 97531"
  label="Business zip code"
  name={FIELD_NAMES.POSTAL_CODE}
  // ✨ nothing here ✨
  className="col-span-12 lg:col-span-4"
  required
/>
```

## Breaking changes: Style Props

Styling with `tailwind` is good with `className`, but it will become hell with re-usable components. So, I centralize it
into only one `styleProps` in every RHF component.

❌ Hard to maintain many props for styling

```typescript jsx
<TextInput
  placeholder="i.e: 97531"
  label="Business zip code"
  name={FIELD_NAMES.POSTAL_CODE}
  control={form.control}
  className="col-span-12 lg:col-span-4"
  labelClassName="h-full" // 🙅
  inputClassName="h-full" // 🙅
  containerClassName="h-full" // 🙅
  required
/>
```

✅ Easier to centralize style props

```typescript jsx
<RHFTextInput
  placeholder="i.e: 97531"
  label="Business zip code"
  name={FIELD_NAMES.POSTAL_CODE}
  className="col-span-12 lg:col-span-4"
  // ✨ easily to remember ✨
  styleProps={{
    labelClassName: "h-full",
    inputClassName: "h-full",
    containerClassName: "h-full"
  }}
  required
/>
```

> TODO: enhancing tailwind code recommendation

## Breaking changes: Block component

[Move to here](../src/modules/form-template/README.md)

## Q/A

When to use Block component?
> When you have a form with a bunch of field, and you don't want to repeat your self too much. Then Block component is
> your solution.
