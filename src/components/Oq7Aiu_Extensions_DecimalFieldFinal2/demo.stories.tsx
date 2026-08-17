/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from "@storybook/react";

import { configProps, fieldMetadata, stateProps } from "./mock";
import Oq7AiuExtensionsDecimalFieldFinal2 from "./index";

const meta: Meta<typeof Oq7AiuExtensionsDecimalFieldFinal2> = {
  title: "Oq7AiuExtensionsDecimalFieldFinal2",
  component: Oq7AiuExtensionsDecimalFieldFinal2,
  excludeStories: /.*Data$/,
};

export default meta;

type Story = StoryObj<typeof Oq7AiuExtensionsDecimalFieldFinal2>;

export const BaseOq7AiuExtensionsDecimalFieldFinal2: Story = (args: any) => {
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
      <Oq7AiuExtensionsDecimalFieldFinal2 {...props} {...args} />
    </>
  );
};

BaseOq7AiuExtensionsDecimalFieldFinal2.args = {
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
