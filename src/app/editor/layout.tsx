import "~/styles/globals.css";

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
  return (
    <body className="dark">
      <div>{children}</div>
    </body>
  );
}
