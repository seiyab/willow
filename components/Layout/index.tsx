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
      `}
    </style>
  </>
);

export default Layout;
