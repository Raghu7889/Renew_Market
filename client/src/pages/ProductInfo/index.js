import React from "react";
import { SetLoader } from "../../redux/loadersSlice";
import moment from "moment";
import { Button, Divider, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllBids, GetProductById } from "../../apicalls/products";
import BidModal from "./BidModal";

function ProductInfo() {
  const { user } = useSelector((state) => state.users);
  const [showAddNewBid, setShowAddNewBid] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        const bidsResponse = await GetAllBids({ product: id });
        setProduct({
          ...response.data,
          bids: bidsResponse.data,
        });
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    product && (
      <div>
        <div className="grid grid-cols-2 pr-40 gap-5 mt-3">
          {/*images*/}
          <div className=" flex flex-col gap-5">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className=" border4 rounded-md"
            />

            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer" +
                      (selectedImageIndex === index
                        ? "border-2 border-orange-500 border-dashed p-2"
                        : "")
                    }
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                );
              })}
            </div>

            <div>
              <h1 className=" text-xl font-bold text-black-900">Added On</h1>
              <span className="text-black-200">
                {moment(product.createdAt).format("MMM D , YYYY hh:mm A")}
              </span>
            </div>
          </div>

          {/*details*/}
          <div className="border0 h-[1000px] p-5 rounded flex flex-col gap-5">
            <div>
              <h1 className="text-2xl font-semibold text-orange-500">
                {product.name}
              </h1>
              <span>{product.description}</span>
            </div>

            <Divider className="bg-sky-500 my-2" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-500">
                Product Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span>₹ {product.price}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Bill Available</span>
                <span>{product.billAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Box Available</span>
                <span>{product.boxAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Accessories Available</span>
                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Warranty Available</span>
                <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Purchased Year</span>
                <span>
                  {moment().subtract(product.age, "years").format("YYYY")} (
                  {product.age} years ago)
                </span>
              </div>
            </div>

            <Divider className="bg-sky-500 my-2" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-500">
                Seller Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Name</span>
                <span>{product.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span>{product.seller.email}</span>
              </div>
            </div>

            <Divider className="bg-sky-500 my-2" />
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-orange-500">Bids</h1>
                <Button
                  type="primary"
                  onClick={() => setShowAddNewBid(!showAddNewBid)}
                  disabled={user._id === product.seller._id}
                >
                  New Bid
                </Button>
              </div>

              {product.showBidsOnProductPage &&
                product?.bids?.map((bid) => {
                  return (
                    <div className="border4 p-3 rounded mt-2">
                      <div className="flex justify-between mt-2">
                        <span>Name</span>
                        <span> {bid.buyer.name}</span>
                      </div>
                      <div className="flex justify-between ">
                        <span>Bid Amount</span>
                        <span> ₹ {bid.bidAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bid Place On</span>
                        <span>
                          {" "}
                          {moment(bid.createdAt).format("MMM D , YYYY hh:mm A")}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {showAddNewBid && (
          <BidModal
            product={product}
            reloadData={getData}
            showBidModal={showAddNewBid}
            setShowBidModal={setShowAddNewBid}
          />
        )}
      </div>
    )
  );
}

export default ProductInfo;
