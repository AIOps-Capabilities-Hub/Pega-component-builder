import { FormField, Input, withConfiguration } from '@pega/cosmos-react-core';
import '../shared/create-nonce';

type Props = { label?: string; value?: string; getPConnect: () => typeof PConnect };

export const Oq7AiuExtensionsSampleTextField = ({ label = 'Text', value = '', getPConnect }: Props) => {
  const pConn = getPConnect();
  const propName = pConn.getStateProps().value;
  return (
    <FormField label={label}>
      <Input value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => pConn.getActionsApi().updateFieldValue(propName, event.target.value)} />
    </FormField>
  );
};

export default withConfiguration(Oq7AiuExtensionsSampleTextField);
