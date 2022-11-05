import Header from "components/Header";
import Content from "components/Content";
import Editor from "components/Editor";
import Alert from "components/Alert";

const HomePage = () => {
  return (
    <>
      <Header />
      <Content>
        <Alert>Submitted image will be treated as CC0 (public domain).</Alert>
        <div>
          <Editor />
        </div>
      </Content>
      <style jsx>{`
        div {
          margin-top: 15px;
        }
      `}</style>
    </>
  );
};

export default HomePage;
