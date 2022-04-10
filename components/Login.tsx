import { Form, Input, Button, Checkbox, Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Login () {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    window.location.href = '/dashboard';
    localStorage.setItem("type", values.type);
    localStorage.setItem("email", values.email);
    localStorage.setItem("password", values.password);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem' }}><b>Course Management Assistant</b></h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item className='formItem' name="type" rules={[{ required: true, message: 'Please pick an item!' }]}>
          <Radio.Group>
            <Radio.Button value="student">Student</Radio.Button>
            <Radio.Button value="Teacher">Teacher</Radio.Button>
            <Radio.Button value="Manager">Manager</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item className='formItem' name={['email']} rules={[{ type: 'email', required: true, message: 'Please input email' }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />}/>
        </Form.Item>

        <Form.Item className='formItem' name="password" rules={[{ required: true, message: 'Please input password' }]}>
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} minLength={4} maxLength={16}/>
        </Form.Item>

        <Form.Item className='formItem' name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item className='formItem'>
          <Button type="primary" htmlType="submit" block>
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Login
