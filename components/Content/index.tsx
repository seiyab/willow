type Props = {
  children: React.ReactNode;
};

const Content: React.FC<Props> = ({ children }) => {
  return (
    <main>
      {children}
      <style jsx>{`
        main {
          margin-top: 20px;
          margin-left: auto;
          margin-right: auto;
          width: 800px;
        }
      `}</style>
    </main>
  );
};

export default Content;
