import { Card, Link } from "@data/components/ui";

type ParentCardLinkProps = {
  href?: string;
  description?: string;
  title?: string;
};

export function ParentCardLink({
  href = "../",
  description = "",
  title = "ひとつ上へ戻る",
}: ParentCardLinkProps) {
  return (
    <Link href={href} variant="plain" display="block">
      <Card.Root h="full">
        <Card.Header>
          <Card.Description>{description}</Card.Description>
          <Card.Title>{title}</Card.Title>
        </Card.Header>
      </Card.Root>
    </Link>
  );
}

