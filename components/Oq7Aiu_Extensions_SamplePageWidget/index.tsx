import { Card, CardContent, CardHeader, Text, withConfiguration } from '@pega/cosmos-react-core';

type Props = { heading?: string };
export const Oq7AiuExtensionsSamplePageWidget = ({ heading = 'Sample page widget' }: Props) => (
  <Card><CardHeader><Text variant='h3'>{heading}</Text></CardHeader><CardContent>Available in PAGE context.</CardContent></Card>
);
export default withConfiguration(Oq7AiuExtensionsSamplePageWidget);
