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
    - required `:formId` (the id of your form on getform)
    - required `:initialValues` - the initial values for the form 
        ```sh
        {field name: initial value}
        ```
    - optional parameter `onCustomSubmit` - your custom submit handler
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
    - optional `validator` - the string in form of `value` or `value1|value2`. Validators may be `required`, `email`, `onlyLetters` or combination e.g. `onlyLetters|required`
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