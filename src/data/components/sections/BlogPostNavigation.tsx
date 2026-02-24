import { Grid } from "@data/components/primitive/Grid";
import { Card, Link } from "@data/components/ui";

type PostLink = {
  id: string;
  title: string;
};

type BlogPostNavigationProps = {
  prevPost: PostLink | undefined;
  nextPost: PostLink | undefined;
};

export function BlogPostNavigation({
  prevPost,
  nextPost,
}: BlogPostNavigationProps) {
  return (
    <Grid
      as="nav"
      aria-label="記事ナビゲーション"
      gap="3"
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
      alignItems="stretch"
    >
      {
        prevPost ? (
          <Link href={`/blog/${prevPost.id}/`} variant="plain" display="block">
            <Card.Root h="full">
              <Card.Header>
                <Card.Description>← 新しい記事</Card.Description>
                <Card.Title>{prevPost.title}</Card.Title>
              </Card.Header>
            </Card.Root>
          </Link>
        ) : (
          <Card.Root
            h="full"
            variant="subtle"
          >
            <Card.Header>
              <Card.Description color="fg.muted">← 新しい記事</Card.Description>
              <Card.Title color="fg.muted">これが最新です</Card.Title>
            </Card.Header>
          </Card.Root>
        )
      }

      <Link href="/blog/" variant="plain" display="block">
        <Card.Root h="full">
          <Card.Header>
            <Card.Description>ブログ</Card.Description>
            <Card.Title>ブログ一覧へ</Card.Title>
          </Card.Header>
        </Card.Root>
      </Link>

      {
        nextPost ? (
          <Link href={`/blog/${nextPost.id}/`} variant="plain" display="block">
            <Card.Root h="full">
              <Card.Header>
                <Card.Description>古い記事 →</Card.Description>
                <Card.Title>{nextPost.title}</Card.Title>
              </Card.Header>
            </Card.Root>
          </Link>
        ) : (
          <Card.Root
            h="full"
            variant="subtle"
          >
            <Card.Header>
              <Card.Description color="fg.muted">古い記事 →</Card.Description>
              <Card.Title color="fg.muted">これが最古です</Card.Title>
            </Card.Header>
          </Card.Root>
        )
      }
    </Grid>
  );
}
