import type { ReactNode } from "react";
import { HorizonalStack } from "@data/components/primitive/HorizonalStack";
import { Stack } from "@data/components/primitive/Stack";
import { Heading } from "@data/components/ui";

type ArticleHeadingProps = {
  title: string;
  categories?: string[];
  children?: ReactNode;
  mb?: string;
};

export function ArticleHeading({ title, categories = [], children, mb = "" }: ArticleHeadingProps) {
  return (
    <Stack gap="2" mb={mb}>
      <HorizonalStack
        alignItems="baseline"
        borderBottomWidth="thick"
        borderBottomColor="colorPalette.solid.bg"
      >
        <Heading as="h1" fontSize="3xl" flexGrow="1" textWrapStyle="auto">
          {title}
        </Heading>
        {children}
      </HorizonalStack>
      {
        categories.length > 0 && (
          <HorizonalStack as="ul" gap="2">
            {categories.map((category, index) => <li key={`${category}-${index}`}>{category}</li>)}
          </HorizonalStack>
        )
      }
    </Stack>
  );
}
