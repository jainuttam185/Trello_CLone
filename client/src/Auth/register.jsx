import React from "react";
import { Button, Card, Flex, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Register = () => {
  const {registerUser}=useSignup();
  const handleRegister = (values) => {registerUser(values);};
  
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"50px"}}>
    <Card className="form-container">
      <Flex>
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong>
            Create an account
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            Join
          </Typography.Text>
          <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: 'please input your full name', },
              ]}
            >
              <Input size="large" placeholder="Enter your name" />
            </Form.Item>
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
            <Form.Item
              label="password"
              name="passwordConfirm"
              rules={[
                { required: true, message: 'please input your confirm password', },
                
              ]}
            >
              <Input size="large" placeholder="reneter your password" />
            </Form.Item>
            <Form.Item><Button type="primary" htmlType="submit" size="large" className="btn">Create account</Button></Form.Item>
            <Form.Item>
           <Link to="/login">
              <Button size="large" className="btn">Sign In</Button>
              </Link>
              </Form.Item>
          </Form>
        </Flex>
        <Flex></Flex>
      </Flex>
    </Card>
      </div>
  );
};

export default Register;
