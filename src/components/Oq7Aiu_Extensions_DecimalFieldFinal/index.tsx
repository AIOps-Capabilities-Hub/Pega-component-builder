import { useEffect, useRef, useState } from "react";
import {
  NumberInput,
  NumberDisplay,
  CurrencyDisplay,
  FieldValueList,
  Text,
  withConfiguration,
} from "@pega/cosmos-react-core";

import type { PConnFieldProps } from "./PConnProps";
import "./create-nonce";
import StyledOq7AiuExtensionsDecimalFieldFinalWrapper from "./styles";
import handleEvent from "./event-utils";
import { suggestionsHandler } from "./suggestions-handler";

interface Oq7AiuExtensionsDecimalFieldFinalProps extends PConnFieldProps {
  displayAsStatus?: boolean;
  isTableFormatter?: boolean;
  hasSuggestions?: boolean;
  variant?: any;
  formatter: string;
  decimalPrecision: string;
  allowDecimals: boolean;
  currencyISOCode: string;
  alwaysShowISOCode: boolean;
  additionalProps: any;
  showGroupSeparators: boolean;
  currencyDisplay: "symbol" | "code" | "name" | undefined;
  negative: "minus-sign" | "parentheses" | undefined;
  notation: "standard" | "compact" | undefined;
  currencyDecimalPrecision: string;
  readOnlyBackgroundColor?: string;
  readOnlyFontColor?: string;
}

interface StateProps {
  value: string;
  hasSuggestions: boolean;
}

function getActiveColor(
  color: string | undefined,
  value: any,
  defaultColor: string | undefined,
): string | undefined {
  if (!color) {
    return defaultColor;
  }

  let activeColor = defaultColor;

  try {
    if (color.trim().startsWith("[")) {
      const parsedColors = JSON.parse(color);

      if (Array.isArray(parsedColors)) {
        const numericValue = typeof value === "number" ? value : Number(value);

        if (!Number.isNaN(numericValue)) {
          const sortedColors = [...parsedColors].sort(
            (a, b) => b.value - a.value,
          );
          const matched = sortedColors.find(
            (c: any) => numericValue >= c.value,
          );

          if (matched) {
            activeColor = matched.color;
          } else if (sortedColors.length > 0) {
            activeColor = sortedColors[sortedColors.length - 1].color;
          }
        }
      }
    } else {
      activeColor = color;
    }
  } catch (_e) {
    activeColor = defaultColor;
  }

  return activeColor;
}

function Oq7AiuExtensionsDecimalFieldFinal(
  props: Oq7AiuExtensionsDecimalFieldFinalProps,
) {
  const {
    getPConnect,
    value,
    placeholder,
    validatemessage,
    label,
    hideLabel = false,
    helperText,
    testId,
    displayMode,
    additionalProps = {},
    variant = "inline",
    formatter = "defaultDecimal",
    negative = "minus-sign",
    notation = "standard",
    currencyISOCode = "USD",
    isTableFormatter,
    hasSuggestions,
    readOnlyBackgroundColor,
    readOnlyFontColor,
  } = props;

  let { showGroupSeparators = false } = props;
  let { currencyDisplay = "symbol" } = props;

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const stateProps = pConn.getStateProps() as StateProps;
  const propName: string = stateProps.value;

  const [decimalValue, setDecimalValue] = useState((value ?? "").toString());
  const hasValueChange = useRef(false);

  let { readOnly = false, required = false, disabled = false } = props;

  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    (prop) => prop === true || (typeof prop === "string" && prop === "true"),
  );

  const activeBg = readOnly
    ? getActiveColor(readOnlyBackgroundColor, value, undefined)
    : undefined;

  const activeFont = readOnly
    ? getActiveColor(readOnlyFontColor, value, undefined)
    : undefined;

  const [status, setStatus] = useState(hasSuggestions ? "pending" : undefined);

  useEffect(() => {
    if (validatemessage !== "") {
      setStatus("error");
    }

    if (hasSuggestions) {
      setStatus("pending");
    } else if (!hasSuggestions && status !== "success") {
      setStatus(validatemessage !== "" ? "error" : undefined);
    }
  }, [validatemessage, hasSuggestions, status]);

  const { decimalPrecision, currencyDecimalPrecision } = props;

  let numberOfDecimals: number | undefined = parseInt(decimalPrecision, 10);
  if (Number.isNaN(numberOfDecimals)) {
    numberOfDecimals = decimalPrecision === "" ? undefined : 2;
  }

  let noOfFractionDigits =
    currencyDecimalPrecision === "auto"
      ? undefined
      : parseInt(currencyDecimalPrecision, 10);

  useEffect(() => {
    setDecimalValue((value ?? "").toString());
  }, [value]);

  let unit: string | undefined;

  if (
    ["DISPLAY_ONLY", "LABELS_LEFT", "STACKED_LARGE_VAL"].includes(
      displayMode as string,
    )
  ) {
    if (displayMode !== "STACKED_LARGE_VAL" && isTableFormatter) {
      showGroupSeparators = true;
      noOfFractionDigits = undefined;

      if (formatter === "Currency-Code") {
        currencyDisplay = "code";
      }
    }

    switch (formatter) {
      case "Integer":
        numberOfDecimals = 0;
        break;
      case "Percentage":
        showGroupSeparators = false;
        unit = "percent";
        break;
      case "Decimal-Auto":
        numberOfDecimals = Number.isInteger(Number(decimalValue)) ? 0 : 2;
        break;
      default:
        break;
    }

    const displayComp =
      formatter === "Currency" || formatter === "Currency-Code" ? (
        <CurrencyDisplay
          value={decimalValue}
          currencyISOCode={currencyISOCode}
          formattingOptions={{
            groupSeparators: showGroupSeparators,
            fractionDigits: noOfFractionDigits,
            currency: currencyDisplay,
            negative,
            notation: negative === "parentheses" ? "standard" : notation,
          }}
        />
      ) : (
        <NumberDisplay
          value={decimalValue}
          formattingOptions={{
            fractionDigits: numberOfDecimals,
            groupSeparators: showGroupSeparators,
            notation,
          }}
          unit={unit}
        />
      );

    switch (displayMode) {
      case "DISPLAY_ONLY":
        return (
          <StyledOq7AiuExtensionsDecimalFieldFinalWrapper
            $backgroundColor={activeBg}
            $fontColor={activeFont}
            $readOnly
          >
            {displayComp}
          </StyledOq7AiuExtensionsDecimalFieldFinalWrapper>
        );
      case "LABELS_LEFT":
        return (
          <StyledOq7AiuExtensionsDecimalFieldFinalWrapper
            $backgroundColor={activeBg}
            $fontColor={activeFont}
            $readOnly
          >
            <FieldValueList
              variant={hideLabel ? "stacked" : variant}
              data-testid={testId}
              fields={[
                { id: "1", name: hideLabel ? "" : label, value: displayComp },
              ]}
            />
          </StyledOq7AiuExtensionsDecimalFieldFinalWrapper>
        );
      case "STACKED_LARGE_VAL":
        return (
          <StyledOq7AiuExtensionsDecimalFieldFinalWrapper
            $backgroundColor={activeBg}
            $fontColor={activeFont}
            $readOnly
          >
            <FieldValueList
              variant="stacked"
              data-testid={testId}
              fields={[
                {
                  id: "2",
                  name: hideLabel ? "" : label,
                  value: (
                    <Text variant="h1" as="span">
                      {displayComp}
                    </Text>
                  ),
                },
              ]}
            />
          </StyledOq7AiuExtensionsDecimalFieldFinalWrapper>
        );
      default:
        break;
    }
  }

  const onResolveSuggestionHandler = (accepted: boolean) => {
    suggestionsHandler(accepted, pConn, setStatus);
  };

  return (
    <StyledOq7AiuExtensionsDecimalFieldFinalWrapper
      $backgroundColor={activeBg}
      $fontColor={activeFont}
      $readOnly={readOnly}
    >
      <NumberInput
        {...additionalProps}
        label={label}
        labelHidden={hideLabel}
        info={validatemessage || helperText}
        value={decimalValue}
        status={status}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        numberOfDecimals={numberOfDecimals}
        showGroupSeparators={showGroupSeparators}
        data-testid={testId}
        onChange={(enteredValue) => {
          if (hasSuggestions) {
            setStatus(undefined);
          }

          setDecimalValue(enteredValue);

          if (value !== (enteredValue !== "" ? Number(enteredValue) : "")) {
            handleEvent(
              actions,
              "change",
              propName,
              enteredValue !== "" ? Number(enteredValue) : "",
            );
            hasValueChange.current = true;
          }
        }}
        onBlur={() => {
          if (!value || hasValueChange.current) {
            handleEvent(
              actions,
              "blur",
              propName,
              decimalValue !== "" ? Number(decimalValue) : "",
            );

            if (hasSuggestions) {
              pConn.ignoreSuggestion("");
            }

            hasValueChange.current = false;
          }
        }}
        onResolveSuggestion={onResolveSuggestionHandler}
      />
    </StyledOq7AiuExtensionsDecimalFieldFinalWrapper>
  );
}

export default withConfiguration(Oq7AiuExtensionsDecimalFieldFinal);
