# Module: Form template

This module use for generating a form with pre-defined template such as styles, components,...

## Types

### Block

```typescript
export interface Block {
  name: string
  type: FieldType
  props?: BlockProps<any>
  render?: (props?: BlockProps<any>) => ReactElement
}
```

I defined this module according to Notion structure, that's mean each section in a form called a block. A block can
contain only one fields.

### Usage

A text field block

```json lines
{
  type: FieldType.TEXT,
  name: FormField.FULL_NAME,
  props: {
    label: "Full name",
    placeholder: "i.e: Phuc dep trai",
    className: "col-span-4",
    required: true
  }
}
```

A custom field

```typescript jsx
const customBlock = {
  type: FieldType.CUSTOM,
  name: FormField.DOB,
  props: {
    label: "Date Of Birth",
    className: "col-span-4",
    required: true
  },
  render: (props) => {
    const { label, className } = props
    return (
      <div className={className}>
        <div>{label}</div>
        <div className="text-xs">Created By Cu Khoai Mon</div>
      </div>
    )
  }
}
```

More example in files `src/modules/form-template/components/examples/*.tsx`

### Contributing Guide

> Context: all these symbol is in file `FormTemplate.tsx`

1. Add new field type in `FieldType`
2. Map the corresponding component in `ComponentMapper`
3. Union new props in `BlockProps` (optional)

That's it.