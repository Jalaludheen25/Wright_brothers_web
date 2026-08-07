/** Renders one or more schema.org objects into a single script tag. */
export function JsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Schema objects are authored in this repo — never user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(schema) ? schema : [schema]),
      }}
    />
  );
}
