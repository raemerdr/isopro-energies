/* Structured data for search engines (schema.org, as JSON-LD). `<` is escaped, so no text inside can
   close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
