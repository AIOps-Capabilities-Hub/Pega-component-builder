import type { Meta, StoryObj } from "@storybook/react";

import { configProps, fieldMetadata, stateProps } from "./mock";
import Oq7AiuExtensionsDecimalField from "./index";

const meta: Meta<typeof Oq7AiuExtensionsDecimalField> = {
  title: "Oq7Aiu/DecimalField",
  component: Oq7AiuExtensionsDecimalField,
};

export default meta;

type Story = StoryObj<typeof Oq7AiuExtensionsDecimalField>;

export const Base: Story = (args: any) => {
  const props = {
    value: args.value,
    fieldMetadata,
    getPConnect: () => {
      return {
        getStateProps: () => stateProps,
        getActionsApi: () => ({
          updateFieldValue: () => {},
          triggerFieldChange: () => {},
        }),
        ignoreSuggestion: () => {},
        acceptSuggestion: () => {},
      };
    },
  };

  return <Oq7AiuExtensionsDecimalField {...props} {...args} />;
};

Base.args = {
  value: "", // 🔥 NO HARDCODE

  label: configProps.label,
  helperText: configProps.helperText,
  placeholder: configProps.placeholder,
  testId: configProps.testId,

  readOnly: false,
  disabled: configProps.disabled,
  required: configProps.required,
  validatemessage: configProps.validatemessage,

  readOnlyBackgroundColor: "#ffffff",
  readOnlyFontColor: "#111827",

  enableCondition: true,
  conditionExpression: "value > 1000",
  conditionBackgroundColor: "#fee2e2",
  conditionFontColor: "#b91c1c",

  decimalPrecision: "2",
};
