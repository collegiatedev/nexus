// layout.tsx component used in both @modal/(.)/task/[id] and task/[id]
export const TaskLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div>{children}</div>;
};
