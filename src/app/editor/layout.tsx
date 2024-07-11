import "~/styles/globals.css";
import { Descendant } from "slate";
import { EditorProvider } from "./provider";

export const metadata = {
  title: "Editor",
  description: "Editor",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // make this into a server await call first
  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
    {
      type: "paragraph",
      children: [{ text: "A second line of text in a different paragraph." }],
    },
  ];

  return (
    <EditorProvider initialValue={initialValue}>
      <body className="dark">
        <div>{children}</div>
      </body>
    </EditorProvider>
  );
}
