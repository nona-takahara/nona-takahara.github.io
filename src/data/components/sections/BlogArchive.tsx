import { getCollection } from "astro:content";
import { Section } from "../primitive/Section";
import { Card, Heading, Link, Text } from "../ui";
import { Stack } from "@/styled-system/jsx";

function getBlogOrder(id: string) {
  const value = Number(id.replace("entry", ""));
  return Number.isFinite(value) ? value : -1;
}

export async function BlogArchive() {
  const posts = (await getCollection("blog")).sort(
    (a, b) => getBlogOrder(b.id) - getBlogOrder(a.id),
  );

  return (
    <Section id="blog">
      <Stack gap="2">
        <Heading as="h1" fontSize="3xl">
          ブログ記事一覧 - Blog
        </Heading>
        <Text>上の方ほど新しいです</Text>
        <Stack as="ul" listStyle="none" margin="0" padding="0" gap="3">
          {
            posts.map((post) => (
              <li key={post.id}>
                <Link variant="plain" href={`/blog/${post.id}/`} display="block">
                  <Card.Root>
                    <Card.Header>
                      <Card.Title>{post.data.title}</Card.Title>
                      <Card.Description>{post.data.short}</Card.Description>
                    </Card.Header>
                  </Card.Root>
                </Link>
              </li>
            ))
          }
        </Stack>
      </Stack>
    </Section>
  );
}

