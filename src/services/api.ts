import axios from "axios";
const BASE_URL = "https://exceedingproperties.onrender.com";

export async function LoginUser(email: string, password: string) {
  const res = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });

  return res.data;
}

export async function getProducts(token, pageNum) {
  const res = await axios.get(
    `${BASE_URL}/products/paginated?page=${pageNum}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.data.success) {
    throw new Error("Unable to fetch data");
  }

  return res.data.data;
}

export async function getProductById({
  productId,
  token,
}: {
  productId: string | undefined;
  token: string;
}) {
  const res = await axios.get(`${BASE_URL}/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function createProduct(products, token) {
  console.log(products);
  const res = await axios.post(`${BASE_URL}/products`, products, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function editProduct(productId, products, token) {
  console.log(token);

  const res = await axios.put(`${BASE_URL}/products/${productId}`, products, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res);
  return res.data;
}

//? delete product image
export async function deletProductImage(productId, image_url, token) {
  console.log(productId, image_url, token);
  const res = await axios.post(
    `${BASE_URL}/products/${productId}/image`,
    {
      image_url: image_url,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function getOrders(token: string, pageNum: number) {
  const res = await axios.get(
    `${BASE_URL}/order/admin-orders?page=${pageNum}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
}

export async function disableProduct(productId: string, token: string) {
  try {
    const res = await axios.post(
      `${BASE_URL}/products/status`,
      {
        productId: productId,
        status: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (e) {
    return "Unable to change status";
  }
}

export async function enableProduct(productId: string, token: string) {
  try {
    const res = await axios.post(
      `${BASE_URL}/products/status`,
      {
        productId: productId,
        status: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (e) {
    return "Unable to change status";
  }
}

export async function deleteOrder(orderId: string, token: string) {
  console.log(orderId, token);
  const res = await axios.delete(`${BASE_URL}/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
}

export async function getOrderById(orderId: string, token: string) {
  const res = await axios.get(`${BASE_URL}/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
}

export async function getUserOrdersById(
  userId: string,
  pageNum: number,
  token: string
) {
  const res = await axios.get(
    `${BASE_URL}/order/user/${userId}?page=${pageNum}&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data.data);
  return res.data.data;
}

export async function updateOrderStatus(
  orderId: string,
  type: string,
  token: string
) {
  let data = {
    orderStatus: "PENDING",
    deliveryStatus: "PENDING",
  };

  if (type === "pending") {
    data.orderStatus = "PENDING";
    data.deliveryStatus = "PREPARING";
  }

  if (type === "preparing") {
    data.orderStatus = "PROCESSING";
    data.deliveryStatus = "IN_TRANSIT";
  }

  if (type === "delivered") {
    data.orderStatus = "DELIVERED";
    data.deliveryStatus = "DELIVERED";
  }

  if (type === "cancelled") {
    data.orderStatus = "CANCELLED";
    data.deliveryStatus = "NOT_DELIVERED";
  }

  const res = await axios.put(`${BASE_URL}/order/${orderId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
}

//? for waitlists
export async function getWaitlists(token: string) {
  const res = await axios.get(
    `${BASE_URL}/waitlist/admin/list?page=1&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data);
  // return waitlist.data;
  return res.data.data;
}

//? get all category
export async function getCategories(token: string) {
  const res = await axios.get(`${BASE_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
}

//? get paginated category
export async function getPaginatedCategories(token, pageNum) {
  const res = await axios.get(
    `${BASE_URL}/categories/paginated?page=${pageNum}&limit=2`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
}

//? Add new  category
export async function addNewCategory(category: object, token: string) {
  console.log(category);

  const res = await axios.post(`${BASE_URL}/categories`, category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

//? Delete Category
export async function deleteCategory(categoryID: string, token: string) {
  console.log(categoryID);
  const res = await axios.delete(`${BASE_URL}/categories/${categoryID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

//? delete categoru image
export async function deletCategoryImage(categoryId, image_url, token) {
  console.log(categoryId, image_url, token);
  const res = await axios.post(
    `${BASE_URL}/categories/${categoryId}/image`,
    {
      image_url: image_url,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

//? update category
export async function updateCategory(
  category: object,
  categoryID: string,
  token: string
) {
  console.log(categoryID);
  const res = await axios.put(
    `${BASE_URL}/categories/${categoryID}`,
    category,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function waitlistRemove(userId, productId, token) {
  const res = await axios.delete(`${BASE_URL}/waitlist/admin/remove`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { productId: productId, userId: userId },
  });

  return res.data.data;
}

export async function addToWaitlist(
  userId: string,
  productId: string,
  token: string
) {
  const res = await axios.post(
    `${BASE_URL}/waitlist/admin/add`,
    {
      userId: userId,
      productId: productId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data);

  return res.data;
}

//? get all transactions
export async function getTransactions(token: string, pageNum: number) {
  const res = await axios.get(
    `${BASE_URL}/transactions/admin/all?page=${pageNum}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data);

  // return waitlist.data;
  return res.data.data;
}

export async function getUserTransactions(
  token: string,
  pageNum: number,
  userID: string | undefined
) {
  const res = await axios.post(
    `${BASE_URL}/transactions/admin?page=${pageNum}&limit=5`,
    { userId: userID },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
}

export async function updateStatus(token, transID, status) {
  const res = await axios.put(
    `${BASE_URL}/transactions/${transID}/status`,
    {
      status: status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
}

export async function deleteTransaction(token, transID) {
  // console.log(token, transID);
  const res = await axios.delete(`${BASE_URL}/transactions/${transID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
}

//? get paginated category
export async function getPaginatedUsers(token, pageNum) {
  const res = await axios.get(`${BASE_URL}/user?page=${pageNum}&limit=5`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res);
  return res.data.data;
}

// export async function updateUsers(userID, token) {
//   const res = await axios.put(
//     `${BASE_URL}/transactions/${transID}/status`,
//     {
//       status: status,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   console.log(res);
//   return res.data.data;
// }
