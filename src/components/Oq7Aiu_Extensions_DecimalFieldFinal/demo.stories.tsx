/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from "@storybook/react";

import { configProps, fieldMetadata, stateProps } from "./mock";
import Oq7AiuExtensionsDecimalFieldFinal from "./index";

const meta: Meta<typeof Oq7AiuExtensionsDecimalFieldFinal> = {
  title: "Oq7AiuExtensionsDecimalFieldFinal",
  component: Oq7AiuExtensionsDecimalFieldFinal,
  excludeStories: /.*Data$/,
};

export default meta;

type Story = StoryObj<typeof Oq7AiuExtensionsDecimalFieldFinal>;

export const BaseOq7AiuExtensionsDecimalFieldFinal: Story = (args: any) => {
  const props = {
    value: configProps.value,
    fieldMetadata,
    getPConnect: () => {
      return {
        getStateProps: () => {
          return stateProps;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: () => {},
            triggerFieldChange: () => {},
          };
        },
        ignoreSuggestion: () => {},
        acceptSuggestion: () => {},
        setInheritedProps: () => {},
        resolveConfigProps: () => {},
      };
    },
  };

  return (
    <>
      <Oq7AiuExtensionsDecimalFieldFinal {...props} {...args} />
    </>
  );
};

BaseOq7AiuExtensionsDecimalFieldFinal.args = {
  label: configProps.label,
  helperText: configProps.helperText,
  placeholder: configProps.placeholder,
  showGroupSeparators: configProps.showGroupSeparators,
  testId: configProps.testId,
  readOnly: configProps.readOnly,
  disabled: configProps.disabled,
  required: configProps.required,
  status: configProps.status,
  hideLabel: configProps.hideLabel,
  displayMode: configProps.displayMode,
  variant: configProps.variant,
  validatemessage: configProps.validatemessage,
  readOnlyBackgroundColor: configProps.readOnlyBackgroundColor,
  readOnlyFontColor: configProps.readOnlyFontColor,
};
