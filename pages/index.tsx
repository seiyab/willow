import * as React from "react";
import css from "styled-jsx/css";
import Header from "components/Header";
import Editor from "components/Editor";
import Alert from "components/Alert";
import { web3 } from "lib/web3";
import PageLayout from "components/PageLayout";

const header = css.resolve`
  * {
    background-color: #222;
  }
`;

const alert = css.resolve`
  * + * {
    margin-top: 8px;
  }
`;

const HomePage = () => {
  const [provider, setProvider] = React.useState<Web3["currentProvider"]>();
  React.useEffect(() => {
    setProvider(web3.currentProvider);
  }, []);
  return (
    <PageLayout.Wrapper>
      <PageLayout.Header>
        <Header />
      </PageLayout.Header>
      <PageLayout.Content>
        <main>
          <Alert className={alert.className}>
            Submitted image will be treated as CC0 (public domain).
          </Alert>
          {provider === null && (
            <Alert className={alert.className} type="error">
              Ethereum Provider is not set. You may need{" "}
              <a href="https://metamask.io/" target="_blank" rel="noreferrer">
                Metamask
              </a>
              .
            </Alert>
          )}
          <div>
            <Editor />
          </div>
        </main>
      </PageLayout.Content>
      <style jsx>{`
        main {
          margin-top: 20px;
        }
        div {
          margin-top: 15px;
        }
      `}</style>
      {alert.styles}
      {header.styles}
    </PageLayout.Wrapper>
  );
};

export default HomePage;
