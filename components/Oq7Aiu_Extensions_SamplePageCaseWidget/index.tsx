import { Card, CardContent, CardHeader, Text, withConfiguration } from '@pega/cosmos-react-core';
type Props = { heading?: string };
export const Oq7AiuExtensionsSamplePageCaseWidget = ({ heading = 'Sample page and case widget' }: Props) => (
  <Card><CardHeader><Text variant='h3'>{heading}</Text></CardHeader><CardContent>Available in PAGE and CASE contexts.</CardContent></Card>
);
export default withConfiguration(Oq7AiuExtensionsSamplePageCaseWidget);
