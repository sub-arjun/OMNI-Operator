import { Metadata } from 'next';
import { getThread, getProject } from '@/lib/api-server';
import { siteConfig } from '@/lib/site';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { threadId } = await params;
  const fallbackMetaData = {
    title: 'Shared Conversation | OMNI Operator',
    description: 'Replay this Agent conversation on OMNI Operator',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/share/${threadId}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: 'Shared Conversation | OMNI Operator',
      description: 'Replay this Agent conversation on OMNI Operator',
      siteName: siteConfig.name,
    },
  };

  try {
    const threadData = await getThread(threadId);
    const projectData = await getProject(threadData.project_id);

    if (!threadData || !projectData) {
      return fallbackMetaData;
    }

    const isDevelopment =
      process.env.NODE_ENV === 'development' ||
      process.env.NEXT_PUBLIC_ENV_MODE === 'LOCAL' ||
      process.env.NEXT_PUBLIC_ENV_MODE === 'local';

    const title = projectData.name || 'Shared Conversation | OMNI Operator';
    const description =
      projectData.description ||
      'Replay this Agent conversation on OMNI Operator';
    const ogImage = isDevelopment
      ? `${process.env.NEXT_PUBLIC_URL}/share-page/og-fallback.png`
      : `${process.env.NEXT_PUBLIC_URL}/api/share-page/og-image?title=${projectData.name}`;

    return {
      title,
      description,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_URL}/share/${threadId}`,
      },
      openGraph: {
        type: 'website',
        locale: 'en_US',
        title,
        description,
        siteName: siteConfig.name,
        images: [ogImage],
      },
      twitter: {
        title,
        description,
        images: ogImage,
        card: 'summary_large_image',
      },
    };
  } catch (error) {
    return fallbackMetaData;
  }
}

export default async function ThreadLayout({ children }) {
  return <>{children}</>;
}
