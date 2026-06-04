import BlogListingPage from '@/components/blog/BlogListingPage';

export default function DoctorsBlogPageTwo() {
  return (
    <BlogListingPage
      pageNumber={2}
      basePath="/doctors-blog"
      buildPostHref={(slug) => `/${slug}`}
      eyebrow="Doctor's Blog"
      title="Doctor's Blog"
      breadcrumbLabel="Doctor's Blog"
    />
  );
}
