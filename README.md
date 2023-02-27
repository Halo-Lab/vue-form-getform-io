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
    - required `:formId` (the id of your form on getform). If `submitHandler` provided, parameter bacomes optional
    - optional parameter `submitHandler` - your custom submit handler (will be resposible for submitting the form on your platform, should get values of the form)
    - optional parameter `className` - class name for custom styling

- Label accepts parameters 
    - required `label` - the label text
    - required `name` - the name of the input current label is for
    - optional parameter `className` - class name for custom styling
    - optional parameter `tooltipClassName` - class name for custom styling Tooltip

- Input and TextareaComponent accepts parameters 
    - required `placeholder`
    - required `type`
    - required `name`
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
    - optional parameter `className` - class name for custom styling

- Button  accepts parameters: 
    - required `label` - string with text 
    - `type` - type of the button
    - optional parameter `className` - class name for custom styling


### Example

```sh
    <Form :formId="apiKey" :initialValues="{ name: '', email: '', message: '' }" className="my-custom-class">
      <Label label="Your Name" name="name">
        <Input type="text" placeholder="Your Name" name="name" validator="required|onlyLetters" />
      </Label>
      <Label label="Email Address" name="email">
        <Input placeholder="Email Address" type="email" name="email" validator="required|email" />
      </Label>
      <Label label="Message" name="message">
        <TextArea placeholder="Message" name="message" validator="required" />
      </Label>
      <Button label="Send form" type="submit" />
    </Form>
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