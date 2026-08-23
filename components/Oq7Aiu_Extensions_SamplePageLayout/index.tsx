import { FieldGroup, Grid, withConfiguration } from '@pega/cosmos-react-core';
type Props = { heading?: string; children?: React.ReactNode };
export const Oq7AiuExtensionsSamplePageLayout = ({ heading = 'Page', children }: Props) => (
  <FieldGroup name={heading}><Grid container={{ cols: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: 2 }}>{children}</Grid></FieldGroup>
);
export default withConfiguration(Oq7AiuExtensionsSamplePageLayout);
