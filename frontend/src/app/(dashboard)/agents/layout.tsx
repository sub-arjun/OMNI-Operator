import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agent Conversation | OMNI Operator',
  description: 'Interactive agent conversation powered by OMNI Operator',
  openGraph: {
    title: 'Agent Conversation | OMNI Operator',
    description: 'Interactive agent conversation powered by OMNI Operator',
    type: 'website',
  },
};

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
