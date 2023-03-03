<template>
  <main class="container">
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
        search
        name="city" 
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
  </main>
</template>

<script>
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  RadioGroup,
  CheckBoxGroup,
  FileInput
} from './components';

export default {
  components: {
    Form,
    Input,
    TextArea,
    Button,
    Select,
    RadioGroup,
    CheckBoxGroup,
    FileInput
  },
  data() {
    const API_KEY = import.meta.env.VITE_API_FORM_KEY;
    return { apiKey: API_KEY };
  },
  methods: {
    submit: function (data) {
      console.log(data)
    }
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
