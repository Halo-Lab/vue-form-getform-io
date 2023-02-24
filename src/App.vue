<template>
  <main class="container">
    <Form 
      :formId="apiKey" 
    >
      <Label label="Your Name" name="name">
        <Input 
          className="inputMy" 
          errorClassName="error" 
          type="text" 
          placeholder="Your Name" 
          name="name"
          :validator="[
            {name: 'required'}, 
            {name: 'letters'}
          ]"
        />
      </Label>
      <Label label="Email Address" name="email">
        <Input 
          placeholder="Email Address" 
          type="email" 
          name="email" 
          :validator="[{name: 'required'}, {name: 'email'}]" 
        />
      </Label>
      <Label label="Message" name="message">
        <TextArea 
          placeholder="Message" 
          name="message" 
          :validator="[{name: 'required'}]" 
        />
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
    return { apiKey: API_KEY };
  },
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
