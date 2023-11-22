

export default function UserItemLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
       <h2>Featured products</h2>
        {children}
      </>
    );
  }