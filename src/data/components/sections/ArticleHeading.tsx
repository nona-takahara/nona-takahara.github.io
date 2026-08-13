import type { ReactNode } from "react";
import { HStack, Stack, type StackProps } from "styled-system/jsx";
import { Heading } from "@data/components/ui";

type ArticleHeadingProps = {
  title: string;
  categories?: string[];
  children?: ReactNode;
  mb?: StackProps["mb"];
};

export function ArticleHeading({ title, categories = [], children, mb }: ArticleHeadingProps) {
  return (
    <Stack gap="2" mb={mb}>
      <HStack
        gap="0"
        alignItems="baseline"
        borderBottomWidth="thick"
        borderBottomColor="colorPalette.solid.bg"
      >
        <Heading as="h1" fontSize="3xl" flexGrow="1" textWrapStyle="auto">
          {title}
        </Heading>
        {children}
      </HStack>
      {
        categories.length > 0 && (
          <HStack as="ul" gap="2">
            {categories.map((category, index) => <li key={`${category}-${index}`}>{category}</li>)}
          </HStack>
        )
      }
    </Stack>
  );
}
