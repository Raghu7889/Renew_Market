import { Button, Col, Form, Input, Modal, Row, Tabs, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct, EditProduct } from "../../../apicalls/products";
import { SetLoader } from "../../../redux/loadersSlice";
import React, { useEffect, useState } from "react";
import Images from "./Images";

const additionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  },
];

function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const [selectedTab, setSelectedTab] = useState("1");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([
    "electronics",
    "fashion",
    "home",
    "sports",
    "toy",
    "books",
    "clothes",
    "furniture",
  ]);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await AddProduct(values);
      }

      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const formRef = React.useRef(null);

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  const handleAddCategory = () => {
    if (categoryName && !categories.includes(categoryName.toLowerCase())) {
      setCategories([...categories, categoryName.toLowerCase()]);
      setCategoryName("");
      setShowCategoryModal(false);
      message.success("Category added successfully");
    } else {
      message.error("Category already exists or is invalid");
    }
  };

  return (
    <>
      <Modal
        className="border"
        title=""
        open={showProductForm}
        onCancel={() => setShowProductForm(false)}
        centered
        width={1000}
        okText="Save"
        onOk={() => {
          formRef.current.submit();
        }}
        {...(selectedTab === "2" && { footer: false })}
      >
        <div>
          <h1 className="text-primary text-xl text-center font-semibold">
            {selectedProduct ? "Edit Product" : "Add Product"}
          </h1>
          <Tabs
            defaultActiveKey="1"
            activeKey={selectedTab}
            onChange={(key) => setSelectedTab(key)}
          >
            <Tabs.TabPane tab="General" key="1">
              <Form layout="vertical" ref={formRef} onFinish={onFinish}>
                <Form.Item label="Name" name="name" rules={rules}>
                  <Input type="text" />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={rules}>
                  <TextArea type="text" />
                </Form.Item>

                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Form.Item label="Price" name="price" rules={rules}>
                      <Input type="number" />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item label="Category" name="category" rules={rules}>
                      <select>
                        <option value="select">Select</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item label="Age" name="age" rules={rules}>
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                </Row>

                <div className="flex gap-10">
                  {additionalThings.map((item) => {
                    return (
                      <Form.Item
                        label={item.label}
                        name={item.name}
                        valuePropName="checked"
                      >
                        <Input
                          type="checkbox"
                          value={item.name}
                          onChange={(e) => {
                            formRef.current.setFieldsValue({
                              [item.name]: e.target.checked,
                            });
                          }}
                          checked={formRef.current?.getFieldValue(item.name)}
                        />
                      </Form.Item>
                    );
                  })}
                </div>
                <div className="flex justify-end">
                  <Button
                    type="primary"
                    onClick={() => setShowCategoryModal(true)}
                  >
                    Add Category
                  </Button>
                </div>

                <Form.Item
                  label="Show Bids on Product Page"
                  name="showBidsOnProductPage"
                  valuePropName="checked"
                >
                  <Input
                    type="checkbox"
                    onChange={(e) => {
                      formRef.current.setFieldsValue({
                        showBidsOnProductPage: e.target.checked,
                      });
                    }}
                    checked={formRef.current?.getFieldValue(
                      "showBidsOnProductPage"
                    )}
                    style={{ width: 50, marginLeft: 20 }}
                  />
                </Form.Item>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
              <Images
                selectedProduct={selectedProduct}
                getData={getData}
                setShowProductForm={setShowProductForm}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Modal>
      /* add button category*/
      <Modal
        title="Add Category"
        open={showCategoryModal}
        onCancel={() => setShowCategoryModal(false)}
        onOk={handleAddCategory}
      >
        <Form layout="vertical">
          <Form.Item label="Category Name" rules={rules}>
            <Input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ProductsForm;
