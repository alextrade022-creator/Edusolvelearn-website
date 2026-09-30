// schema.org structured data (JSON-LD) used across the site.

import { PLAY_STORE_URL, SITE_NAME, SITE_URL } from '@/config';
import type { FaqGroup } from '@/content/faq';
import { CONTACT, COUNTRIES_SERVED, SOCIAL_LINKS } from '@/content/site';
import type { Post } from '@/lib/posts';

const ORG_ID = `${SITE_URL}/#organization`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': ORG_ID,
  name: SITE_NAME,
  alternateName: 'Edu Solve',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/edusolve-logo.png`,
  description:
    'Personalised, one-on-one online tuition for students of all classes across CBSE, ICSE, IGCSE, IB and American curricula, with the EduSolve Learning App.',
  foundingDate: '2021',
  slogan: 'We Find & Solve It',
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: { '@type': 'PostalAddress', addressLocality: 'Kozhikode', addressRegion: 'Kerala', addressCountry: 'IN' },
  areaServed: COUNTRIES_SERVED.map((name) => ({ '@type': 'Country', name })),
  sameAs: [...SOCIAL_LINKS.filter((link) => link.icon !== 'whatsapp').map((link) => link.href), PLAY_STORE_URL],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: CONTACT.phone,
      email: CONTACT.email,
      availableLanguage: ['English'],
    },
  ],
} as const;

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
} as const;

export const faqSchema = (groups: readonly FaqGroup[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: groups.flatMap((group) =>
    group.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  ),
});

export const articleSchema = (post: Post) => {
  const url = `${SITE_URL}/blog/${post.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: url,
    image: post.cover ? `${SITE_URL}${post.cover}` : `${SITE_URL}/images/edusolve-logo.png`,
    articleSection: post.category,
    author: { '@type': post.author.includes('Team') ? 'Organization' : 'Person', name: post.author },
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  };
};

export const breadcrumbSchema = (items: readonly { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});
