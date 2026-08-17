export const configProps = {
  value: "",
  label: "Decimal Sample",
  placeholder: "Decimal Placeholder",
  helperText: "Decimal Helper Text",
  testId: "decimal-12345678",
  readOnly: false,
  required: false,
  disabled: false,
  validatemessage: "",

  readOnlyBackgroundColor: "#f3f4f6",
  readOnlyFontColor: "#111827",

  enableCondition: true,
  conditionExpression: "value > 1000",
  conditionBackgroundColor: "#fee2e2",
  conditionFontColor: "#b91c1c",
};

export const stateProps = {
  value: ".DecimalSample",
};

export const fieldMetadata = {
  classID: "DIXL-MediaCo-Work-NewService",
  type: "Decimal",
  displayAs: "pxNumber",
  label: "Decimal sample",
};
