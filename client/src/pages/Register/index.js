import React, { useEffect } from "react";
import { Button, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { Avatar } from "antd";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await RegisterUser(values);
      dispatch(SetLoader(false));
      if (response.success) {
        navigate("/login");
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen flex justify-center items-center mody">
      <div>
        <div className="border h-[600px] p-3 rounded w-[450px]">
          <Avatar
            size={85}
            src="https://img.icons8.com/3d-fluency/94/shopping-cart.png"
            className="rounded-avatar"
            style={{ left: 150 }}
          />
          <h1 className="text-blue-500 text-with-border mb-8 ml-20">
            {" "}
            ReNew Market
          </h1>
          <h1 className="text-primary text-3xl">Register</h1>
          <Divider />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name" rules={rules}>
              <input placeholder="" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={rules}>
              <input placeholder="" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={rules}>
              <input type="password" placeholder="" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block className="mt-3">
              Register
            </Button>

            <div className="mt-2 text-center">
              <span className="text-black-500">
                Aready have an account?{" "}
                <Link to="/login" className="text-primary">
                  Login
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
