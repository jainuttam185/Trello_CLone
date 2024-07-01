import React from "react";
import { Button, Card, Flex, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const {loginUser}=useLogin();
  const handleLogin = async (values) => {await loginUser(values)};
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"100px"}}>
    <Card className="form-container">
      <Flex>
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong>
           Sign In
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            unlock your world
          </Typography.Text>
          <Form layout="vertical" onFinish={handleLogin} FautoComplete="off">
          
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'please input your Email', },
                {type:'email',message:'the input is not valid email'}
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="password"
              name="password"
              rules={[
                { required: true, message: 'please input your password', },
                
              ]}
            >
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>
            
            <Form.Item><Button type="primary" htmlType="submit" size="large" className="btn">Sign In</Button></Form.Item>
            <Form.Item>
           <Link to="/">
              <Button size="large" className="btn">Create account</Button>
              </Link>
              </Form.Item>
          </Form>
        </Flex>
        <Flex></Flex>
      </Flex>
    </Card>
    </div>
  )
}

export default Login;