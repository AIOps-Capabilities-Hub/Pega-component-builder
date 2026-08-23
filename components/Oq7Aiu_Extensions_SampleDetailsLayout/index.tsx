import { FieldGroup, Grid, withConfiguration } from '@pega/cosmos-react-core';
type Props = { heading?: string; children?: React.ReactNode };
export const Oq7AiuExtensionsSampleDetailsLayout = ({ heading = 'Details', children }: Props) => (
  <FieldGroup name={heading}><Grid container={{ cols: '1fr', gap: 2 }}>{children}</Grid></FieldGroup>
);
export default withConfiguration(Oq7AiuExtensionsSampleDetailsLayout);
