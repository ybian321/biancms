import React from "react";
import Link from "next/link";
import axios from "axios";
import { Form, Input, Button, Checkbox, Radio, Alert, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

var AES = require("crypto-js/aes");
const url = "http://cms.chtoma.com/api/login";

function Login() {

  const onFinish = (values: any) => {
    console.log("Success:", values);
    localStorage.setItem("type", values.type);
    localStorage.setItem("email", values.email);
    localStorage.setItem("password", values.password);

    axios.post(url, {
      email: values.email,
      password: AES.encrypt(values.password, 'cms').toString(),
      role: values.type
    })
    .then(function (response) {
      window.location.href = "/dashboard";
      localStorage.setItem("login-type", response.data.data.role);
      localStorage.setItem("token", response.data.data.token);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <h1 style={{ textAlign: "center", fontSize: "2.5rem" }}>
          <b>Course Management Assistant</b>
        </h1>
        
        <Form.Item
          className="formItem"
          name="type"
          initialValue="student"
          rules={[{ required: true, message: "Please pick an item!" }]}
        >
          <Radio.Group>
            <Radio.Button value="student">Student</Radio.Button>
            <Radio.Button value="teacher">Teacher</Radio.Button>
            <Radio.Button value="manager">Manager</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          className="formItem"
          name={["email"]}
          rules={[
            { type: "email", required: true, message: "Please input email" },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>

        <Form.Item
          className="formItem"
          name="password"
          rules={[{ required: true, message: "Please input password" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            minLength={4}
            maxLength={16}
          />
        </Form.Item>

        <Form.Item className="formItem" name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item className="formItem">
          <Button type="primary" htmlType="submit" block>
            Sign in
          </Button>
        </Form.Item>
        
        <Form.Item className="formItem">
          No account? <Link href="/"><a>Sign up</a></Link>
        </Form.Item>
        
      </Form>
    </>
  );
}

export default Login;
