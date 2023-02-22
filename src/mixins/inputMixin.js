const inputMixin = {
  created() {
    this.setFieldValidator(this.name, this.validator.split("|"));
  },
  props: {
    validator: {
      type: String,
      default: "",
      validator: (value) =>
        value
          .split("|")
          .every((val) => ["required", "onlyLetters", "email"].includes(val)),
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    isDisabled: {
      type: Boolean,
    },
    name: {
      type: String,
      requiered: true,
    },
    className: {
      type: String,
      default: ''
    },
    errorClassName: {
      type: String,
      default: ''
    }
  },
  methods: {
    onBlur() {
      this.checkFieldError(this.name, this.getFormState(this.name));
    },
    onInput(e) {
      this.setFormState(this.name, e.target.value);
    },
    onFocuse() {
      this.resetError(this.name);
    },
  },
};

export default inputMixin;
