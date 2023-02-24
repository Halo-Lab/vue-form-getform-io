<template>
  <main class="container">
    <Form :formId="apiKey" :initialValues="{ name: '' }">
      <Label label="Your Name" name="name">
        <Input className="inputMy" errorClassName="error" type="text" placeholder="Your Name" name="name"
          validator="required|onlyLetters" :yup="yup.string().min(6, 'Must be at least 6 characktes')" />
      </Label>
      <Label label="Email Address" name="email">
        <Input placeholder="Email Address" type="email" name="email" validator="required|email" />
      </Label>
      <Label label="Message" name="message">
        <TextArea placeholder="Message" name="message" validator="required" />
      </Label>
      <Button label="Send form" type="submit" className="button-filledMy" />
    </Form>
  </main>
</template>

<script>
import {
  Form,
  Label,
  Input,
  TextArea,
  Button
} from './components';
import * as yup from 'yup';
export default {
  components: {
    Form,
    Label,
    Input,
    TextArea,
    Button,
  },
  data() {
    const API_KEY = import.meta.env.VITE_API_FORM_KEY;
    return {
      apiKey: API_KEY,
      yup
    }
  },
  methods: {
    // validate(value) {
    //   console.log(value)
    //   if (value.length < 6) {
    //     return 'Minimum length is 6 chars'
    //   }
    //   return ''
    // }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  max-width: 95%;
  margin: 0 auto;
  padding: 10px 0;
}
</style>
