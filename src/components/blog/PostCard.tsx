import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';
import { formatDate } from '@/lib/date';
import { PostCover } from './PostCover';

// Blog card: stacked on tablet/laptop, a compact row on phones.
export function PostCard({ post, showExcerpt = true }: { post: PostMeta; showExcerpt?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group flex h-full items-center gap-3.5 rounded-2xl border border-line bg-white p-3 transition-shadow hover:shadow-[var(--shadow-float)] sm:flex-col sm:items-stretch sm:gap-5 sm:rounded-card sm:p-4 sm:pb-6.5"
    >
      <PostCover
        title={post.title}
        category={post.category}
        cover={post.cover}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 104px"
        compact
        className="size-26 shrink-0 rounded-xl sm:aspect-[16/10] sm:size-auto sm:w-full sm:rounded-[0.875rem]"
      />
      <span className="flex flex-col gap-1.5 sm:gap-2.5 sm:px-2">
        <span className="text-[0.6875rem] font-bold tracking-[0.04em] text-muted uppercase sm:self-start sm:rounded-full sm:bg-panel sm:px-3 sm:py-1 sm:text-xs sm:tracking-normal sm:text-body sm:normal-case">
          {post.category}
        </span>
        <span className="text-[0.9375rem] leading-snug font-bold transition-colors group-hover:text-red sm:text-[1.1875rem] sm:tracking-[-0.01em]">
          {post.title}
        </span>
        {showExcerpt ? <span className="hidden leading-relaxed text-body sm:block">{post.description}</span> : null}
        <span className="text-xs text-muted sm:text-sm">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
        </span>
      </span>
    </Link>
  );
}
