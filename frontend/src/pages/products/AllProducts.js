import React from "react";

export const AllProducts = () => {
  return (
    <div>
      <Flex
        wrap="wrap"
        gap="middle"
        align="center"
        justify="center"
        style={{
          padding: 20,
        }}
      >
        {products &&
          filteredArray.map((product) => (
            <div
              className=" d-flex flex-direction-c just-s-evenly "
              key={product.id}
              style={{
                ...textStyle,
                border: "1px solid white",
                width: 240,
                height: 320,
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: theme === "light" ? "white" : "",
              }}
            >
              <div className="d-flex align-c just-c" style={{ height: "10%" }}>
                <p
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <Image
                    preview={false}
                    height={"25px"}
                    src={
                      " https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706745600&semt=ais"
                    }
                    style={{ borderRadius: "50%", border: "1px solid black" }}
                  />
                  : {}
                </p>
              </div>
              <div
                style={{
                  height: "40%",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image height={"100%"} src={product.image} />
              </div>
              <div
                className="d-flex align-c just-start"
                // style={{ height: "10%" }}
              >
                <Tag color={product.type === "public" ? "success" : "cyan"}>
                  {product.type}
                </Tag>
              </div>
              <div
                className="d-flex flex-direction-c just-c"
                style={{ height: "30%", overflow: "hidden" }}
              >
                <div className="d-flex flex-direction-c just-c align-c">
                  <div
                    style={{
                      width: "80%",

                      justifyContent: "space-between",
                    }}
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <p>Name : {product.name}</p>
                    <p>Price : ${product.price}</p>
                    <p style={{ height: "10" }}>
                      Description : {product.description}
                    </p>
                    <p>Category : {product.category}</p>
                  </div>
                </div>
              </div>
              {product.userEmail ===
              (currentUser.user
                ? currentUser.user.email
                : currentUser.newUser.email) ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    icon={theme === "light" ? <EditOutlined /> : <EditFilled />}
                    onClick={() => handleOpen(product)}
                  />
                  <Button
                    icon={
                      theme === "light" ? <DeleteOutlined /> : <DeleteFilled />
                    }
                    onClick={() => handleOpenDelete(product)}
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
          ))}
      </Flex>
    </div>
  );
};
