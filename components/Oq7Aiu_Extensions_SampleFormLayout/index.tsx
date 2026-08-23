import { FieldGroup, Grid, withConfiguration } from '@pega/cosmos-react-core';
type Props = { heading?: string; children?: React.ReactNode };
export const Oq7AiuExtensionsSampleFormLayout = ({ heading = 'Form', children }: Props) => (
  <FieldGroup name={heading}><Grid container={{ cols: 'repeat(2, minmax(0, 1fr))', gap: 2 }}>{children}</Grid></FieldGroup>
);
export default withConfiguration(Oq7AiuExtensionsSampleFormLayout);
