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

- ### `Form` is a container for all inputs. It accepts parameters:

  - required `:formId` (string) - the id of your form on getform). If `submitHandler` provided, parameter bacomes optional
  - optional parameter `submitHandler` (function) - your custom submit handler (will be resposible for submitting the form on your platform, should get values of the form). If not provided, `:formId` is required
  - optional parameter `className` (string) - class name for custom styling


- ### Inputs for the form:

  - #### `Input` and `TextareaComponent` accept parameters:

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
    - optional parameter `fieldClassName` (string) - class name for custom input container styling
    - optional parameter `labelClassName` (string) - class name for custom label styling
    - optional parameter `inputClassName` (string) - class name for custom input styling
    - optional parameter `errorClassName` (string) - class name for custom error state styling
    - optional parameter `isDisabled` (boolean)

  - #### `Select` accepts parameters:

    - required `name` (string)
    - required `options` - an array of objects in form of `{label: <display value>, value: <option value>}`
    - optional `validator` - the array of objects in form of `{name: <validatorKey>, message<optional>: <validatorMessage>, parameter<required for max, min, maxLength, minLength, regexp>: <validatorValue>}`.
      Validator name may be:
      - `required`,
        For example: `[{name: "required", message: "Please, select a city"}`.
    - optional patameter `search` (boolean) - flag if use searchable select
    - optional patameter `defaultValue` (string) - the default value of the input
    - optional parameter `fieldClassName` (string) - class name for custom input container styling
    - optional parameter `labelClassName` (string) - class name for custom label styling
    - optional parameter `inputClassName` (string) - class name for custom input styling
    - optional parameter `errorClassName` (string) - class name for custom error state styling
    - optional parameter `isDisabled` (boolean)

  - #### `RadioGroup` - accepts parameters:

    - required `name` (string)
    - required `label` (string)
    - required `fields` - array of object in pirm of `{value: <input value>, label: <input label>, <checked>: <boolean flag if input should be checked default>}`
    - optional parameter `fieldClassName` (string) - class name for custom input container styling
    - optional parameter `labelClassName` (string) - class name for custom label for entire styling
    - optional parameter `inputClassName` (string) - class name for custom input styling
    - optional parameter `inputLabelClassName` (string) - class name for custom label styling
    - optional parameter `isDisabled` (boolean)

  - #### `CheckBoxGroup` - accepts parameters:
    - required `name` (string)
    - required `label` (string)
    - required `fields` - array of object in pirm of `{value: <input value>, label: <input label>}`
    - optional parameter `fieldClassName` (string) - class name for custom input container styling
    - optional parameter `labelClassName` (string) - class name for custom label for entire styling
    - optional parameter `inputClassName` (string) - class name for custom input styling
    - optional parameter `inputLabelClassName` (string) - class name for custom label styling
    - optional parameter `isDisabled` (boolean)

  - #### `FileInput` - accepts parameters:
    - required `name` (string)
    - optional `validTypes` - array of strings with valid file extentions
    - optional `isMultiple` (boolean) - flag to accept multiple files
    - optional parameter `fieldClassName` (string) - class name for custom input container styling
    - optional parameter `titleClassName` (string) - class name for custom label for entire styling
    - optional parameter `textClassName` (string) - class name for custom text styling

  - #### `Button` accepts parameters:
    - required `label` (string) - text
    - `type` (string) - type of the button
    - optional parameter `className` (string) - class name for custom styling

### Example

```sh
    <Form :formId="apiKey">
      <Input 
        fieldClassName="myField" 
        inputClassName="inputMy" 
        errorClassName="error" 
        labelClassName="myLabel" 
        type="text"
        placeholder="Your Name" 
        name="name" 
        :validator="[
          { name: 'required' },
          { name: 'letters' }
        ]" 
        label="Your Name" 
      />
      <Input 
        placeholder="Email Address" 
        type="email" name="email" 
        :validator="[{ name: 'required' }, { name: 'email' }]"
        label="Email Address" 
      />
      <TextArea 
        label="Message" 
        placeholder="Message" 
        name="message" 
        :validator="[{ name: 'required' }]" 
      />
      <Select 
        label="Your City" 
        name="city" 
        search
        :validator="[{ name: 'required' }]"
        :options="[
          { label: 'New York', value: 'New York' }, 
          { label: 'Paris', value: 'Paris' }, 
          { label: 'Kyiv', value: 'Kyiv' }
          ]" 
      />
      <RadioGroup 
        label="Your Gender" 
        name="gender"
        :fields="[
          {value: 'male', label: 'Male'}, 
          {value: 'female', label: 'Female', checked: true}
          ]" 
        />
      <CheckBoxGroup 
        label="Your Favourite food" 
        name="food"
        :fields="[
          { value: 'chocolate', label: 'Chocolate' }, 
          { value: 'ice-cream', label: 'Ice-cream' }, 
          { value: 'coffee', label: 'Coffee' }
        ]" 
      />
      <FileInput 
        name="images" 
        isMultiple 
        :validTypes="['jpg', 'png', 'jpeg', 'gif', 'pdf', 'doc', 'docx']" 
      />
      <Button label="Send form" type="submit" className="button-filledMy" />
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
