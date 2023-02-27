# @halo-lab/vue-form-getform-io

This template should help get you started developing with Vue 3 in Vite.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn
or
npm
```

### Compile and Hot-Reload for Development

```sh
yarn dev
or
npm run dev
```

### Compile and Minify for Production

```sh
yarn build
or
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
or
npm run lint
```

### To install package

```sh
yarn add test-title
or
npm install test-title
```

### To use the form in the component

- import all components

```sh
import {
  Form,
  Label,
  Input,
  TextArea,
  Button
} from '@halo-lab/vue-form-getform-io'
```

- import styles

```sh
<style>
@import "@halo-lab/vue-form-getform-io/styles";
</style>
```

- Form accepts parameters

  - required `:formId` (string) - the id of your form on getform). If `submitHandler` provided, parameter bacomes optional
  - optional parameter `submitHandler` (function) - your custom submit handler (will be resposible for submitting the form on your platform, should get values of the form). If not provided, `:formId` is required
  - optional parameter `className` (string) - class name for custom styling

- Label accepts parameters

  - required `label` (string) - the label text
  - required `name`(string) - the name of the input current label is for
  - optional parameter `className` (string) - class name for custom styling
  - optional parameter `tooltipClassName` (string) - class name for custom styling Tooltip
  - optional parameter `isDisabled` (boolean)

- Input and TextareaComponent accepts parameters

  - required `placeholder` (string)
  - required `type` (string)
  - required `name` (string)
  - optional `validator` - the array of objects in form of `[name: <validatorKey>, message<optional>: <validatorMessage>, parameter<required for max, min, maxLength, minLength, regexp>: <validatorValue>`.
    Validator names may be:
    - `required`,
    - `email`,
    - `number`,
    - `maxLength` (must be provided value),
    - `minLength` (must be provided value),
    - `max` (must be provided value),
    - `min` (must be provided value),
    - `regexp (must be provided value)`,
    - `func` (must be provided value - validation function which return truthy value if error detected, and message for error).
      For example: `[{name: "required"}, {name: "email", message: "Please, enter a valid email"}, {name: "max", message: "should be a number!", value: 6}, {name: regexp, value: /^[0-9]*$/}]`.
  - optional patameter `defaultValue` (string) - the default value of the input
  - optional parameter `className` (string) - class name for custom styling
  - optional parameter `errorClassName` (string) - class name for custom error state styling
  - optional parameter `isDisabled` (boolean)

- Select accepts parameters:

  - required `name` (string)
  - required `options` - an array of objects in form of `{label: <display value>, value: <option value>}`
  - optional `validator` - the array of objects in form of `{name: <validatorKey>, message<optional>: <validatorMessage>, parameter<required for max, min, maxLength, minLength, regexp>: <validatorValue>}`.
    Validator name may be:
    - `required`,
      For example: `[{name: "required", message: "Please, select a city"}`.
  - optional patameter `defaultValue` (string) - the default value of the input
  - optional parameter `className` (string) - class name for custom styling
  - optional parameter `errorClassName` (string) - class name for custom error state styling
  - optional parameter `isDisabled` (boolean)

- FieldGroup - the wrapper for `Radio` and `CheckBox` inputs. Accepts parameters:

  - `isColumn` (boolean) - the direction of wrapper. Default is row.

- Radio - accepts parameters:

  - required `name` (string)
  - required `label` (string)
  - optional patameter `defaultChecked` (string) - the default value of the checked input
  - optional parameter `className` (string) - class name for custom styling
  - optional parameter `errorClassName` (string) - class name for custom error state styling
  - optional parameter `isDisabled` (boolean)

- CheckBox - accepts parameters:

  - required `name` (string)
  - required `label` (string)
  - optional parameter `className` (string) - class name for custom styling
  - optional parameter `isDisabled` (boolean)

- Button accepts parameters:
  - required `label` (string) - text
  - `type` (string) - type of the button
  - optional parameter `className` (string) - class name for custom styling

### Example

```sh
    <Form :formId="apiKey">
      <Label label="Your Name" name="name">
        <Input className="inputMy" errorClassName="error" type="text" placeholder="Your Name" name="name" :validator="[
          { name: 'required' },
          { name: 'letters' }
        ]" />
      </Label>
      <Label label="Email Address" name="email">
        <Input placeholder="Email Address" type="email" name="email"
          :validator="[{ name: 'required' }, { name: 'email' }]" />
      </Label>
      <Label label="Message" name="message">
        <TextArea placeholder="Message" name="message" :validator="[{ name: 'required' }]" />
      </Label>
      <Label label="Your City" name="city" isDisabled>
        <Select name="city" :validator="[{ name: 'required' }]"
          :options="[{ label: 'New York', value: 'New York' }, { label: 'Paris', value: 'Paris' }, { label: 'Kyiv', value: 'Kyiv' }]" />
      </Label>
      <FieldGroup>
        <Radio name="gender" value="male" label="Male" />
        <Radio name="gender" value="female" label="Female" defaultChecked />
      </FieldGroup>
      <FieldGroup>
        <CheckBox name="food" value="chololate" label="Chololate" />
        <CheckBox name="food" value="icecream" label="Icecream" />
        <CheckBox name="food" value="coffee" label="Coffee" />
      </FieldGroup>
      <Button label="Send form" type="submit" className="button-filledMy" />
```

## Word from author

Have fun ✌️

<a href="https://www.halo-lab.com/?utm_source=github">
  <img
    src="https://dgestran.sirv.com/Images/supported-by-halolab.png"
    alt="Supported by Halo lab"
    height="60"
  >
</a>
