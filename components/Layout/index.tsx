type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
  <>
    {children}
    <style jsx global>
      {`
        body {
          margin: 0;
          font-family: sans-serif;
          font-size: 14px;
        }

        button {
          background: unset;
          border: unset;
          cursor: pointer;
          padding: unset;
        }

        .flex-center {
          display: flex;
          align: center;
        }
      `}
    </style>
  </>
);

export default Layout;
