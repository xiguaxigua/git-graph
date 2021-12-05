import React, { useRef, useState } from "react";
import ReactDom from "react-dom";
import { Form, Input, notification, Switch } from "antd";

const { Gitgraph }: any = require("@gitgraph/react");

function GitgraphSection({ setGitgraph, setMaster, orientation, author }) {
  return (
    <Gitgraph key={orientation + author} options={{ orientation, author }}>
      {(gitgraph) => {
        setGitgraph(gitgraph);
        const master = gitgraph.branch("master");
        master.commit("Initial Commit");
        setMaster(master);
      }}
    </Gitgraph>
  );
}

function App() {
  const [gitgraph, setGitgraph] = useState(null);
  const [master, setMaster] = useState(null);
  const [orientation, setOrientation] = useState("vertical");
  const [author, setAuthor] = useState("foo <foo@bar.com>");
  const [list, setList] = useState([]);

  const formRef = useRef<any>();
  const global = useRef<any>({});

  const handleSubmit = (values) => {
    try {
      new Function(
        "runtime",
        `
      with(runtime) {
        ${values.exec}
      }
    `
      )({
        gitgraph,
        master,
        g: global.current,
      });
      setList((list) => {
        return list.concat([formRef.current.getFieldValue("exec")]);
      });
      setTimeout(() => {
        formRef.current.setFieldsValue({
          exec: "",
        });
      }, 100);
    } catch (err: any) {
      console.log(err);
      notification.open({
        message: "执行失败",
        description: JSON.stringify(err.message || err),
      });
    }
  };

  return (
    <div className="app">
      <div className="app-list">
        <pre></pre>
        <Input.TextArea value={list.join("\n")} autoSize={true} />
      </div>
      <Form
        ref={formRef}
        className="app-form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item label="方向" name="orientation">
          <Switch
            checkedChildren="纵向"
            unCheckedChildren="横向"
            checked={orientation === "vertical"}
            onChange={(value) => {
              setOrientation(!value ? "horizontal" : "vertical");
            }}
          />
        </Form.Item>
        <Form.Item label="用户">
          <Input
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="指令" name="exec">
          <Input.TextArea
            onPressEnter={() => {
              formRef.current.submit();
            }}
          />
        </Form.Item>
      </Form>

      <GitgraphSection
        {...{ setGitgraph, setMaster, orientation, author }}
      ></GitgraphSection>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("app"));
