import { useEffect, useRef, useState } from "react";
import {
  NumberInput,
  NumberDisplay,
  withConfiguration,
} from "@pega/cosmos-react-core";

import type { PConnFieldProps } from "./PConnProps";
import "./create-nonce";
import StyledWrapper from "./styles";
import handleEvent from "./event-utils";

interface Props extends PConnFieldProps {
  decimalPrecision: string;

  readOnlyBackgroundColor?: string;
  readOnlyFontColor?: string;

  enableCondition?: boolean;
  conditionExpression?: string;
  conditionBackgroundColor?: string;
  conditionFontColor?: string;

  additionalProps: any;
}

/**
 * Supports:
 * value > 1000
 * value < 1000
 * value >= 1000
 * value <= 1000
 */
function evaluateCondition(
  expression: string | undefined,
  value: number,
): boolean {
  if (!expression) return false;

  try {
    const match = expression.match(/value\s*(>=|<=|>|<|===)\s*(\d+(\.\d+)?)/);

    if (!match) return false;

    const operator = match[1];
    const compareValue = Number(match[2]);

    switch (operator) {
      case ">":
        return value > compareValue;
      case "<":
        return value < compareValue;
      case ">=":
        return value >= compareValue;
      case "<=":
        return value <= compareValue;
      case "===":
        return value === compareValue;
      default:
        return false;
    }
  } catch {
    return false;
  }
}

function Oq7AiuExtensionsDecimalField(props: Props) {
  const {
    getPConnect,
    value,
    label,
    placeholder,
    validatemessage,
    helperText,
    testId,
    displayMode,
    readOnly,
    required,
    disabled,
    decimalPrecision,

    readOnlyBackgroundColor,
    readOnlyFontColor,

    enableCondition,
    conditionExpression,
    conditionBackgroundColor,
    conditionFontColor,

    additionalProps,
  } = props;

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const stateProps = pConn.getStateProps();
  const propName = stateProps.value;

  const [val, setVal] = useState((value ?? "").toString());
  const hasChange = useRef(false);

  // 🔥 IMPORTANT: use LIVE INPUT value (not prop value)
  const numericValue = Number(val);

  const isConditionMatched =
    enableCondition &&
    val !== "" &&
    !Number.isNaN(numericValue) &&
    evaluateCondition(conditionExpression, numericValue);

  let bg = readOnlyBackgroundColor;
  let font = readOnlyFontColor;

  if (isConditionMatched) {
    bg = conditionBackgroundColor || bg;
    font = conditionFontColor || font;
  }

  useEffect(() => {
    setVal((value ?? "").toString());
  }, [value]);

  const decimals = parseInt(decimalPrecision, 10);
  const numberOfDecimals = Number.isNaN(decimals) ? undefined : decimals;

  if (displayMode === "DISPLAY_ONLY") {
    return (
      <StyledWrapper $backgroundColor={bg} $fontColor={font}>
        <NumberDisplay
          value={val}
          formattingOptions={{ fractionDigits: numberOfDecimals }}
        />
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper $backgroundColor={bg} $fontColor={font}>
      <NumberInput
        {...additionalProps}
        label={label}
        value={val}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        data-testid={testId}
        numberOfDecimals={numberOfDecimals}
        info={validatemessage || helperText}
        onChange={(v) => {
          setVal(v);

          const num = v !== "" ? Number(v) : "";

          handleEvent(actions, "change", propName, num);
          hasChange.current = true;
        }}
        onBlur={() => {
          if (hasChange.current) {
            const num = val !== "" ? Number(val) : "";

            handleEvent(actions, "blur", propName, num);
            hasChange.current = false;
          }
        }}
      />
    </StyledWrapper>
  );
}

export default withConfiguration(Oq7AiuExtensionsDecimalField);
