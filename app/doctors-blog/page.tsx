import BlogListingPage from '@/components/blog/BlogListingPage';

export default function DoctorsBlogPage() {
  return (
    <BlogListingPage
      pageNumber={1}
      basePath="/doctors-blog"
      buildPostHref={(slug) => `/${slug}`}
      eyebrow="Doctor's Blog"
      title="Doctor's Blog"
      breadcrumbLabel="Doctor's Blog"
    />
  );
}
