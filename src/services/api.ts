import { AddProductProps } from "@/types";
import axios from "axios";
import waitlist from "../services/data/waitlist.json";
import orders from "../services/data/orders.json";

const BASE_URL = "https://exceedingproperties-production.up.railway.app";

export async function LoginUser(email: string, password: string) {
  console.log(email, password);
  const res = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });

  console.log(res);
  return res.data;
}

export async function getProducts() {
  const res = await axios.get(`${BASE_URL}/products`);

  if (!res.data.success) {
    throw new Error("Unable to fetch data");
  }

  return res.data;
}

export async function getProductById({
  productId,
}: {
  productId: string | undefined;
}) {
  const res = await axios.get(`${BASE_URL}/products/${productId}`);

  return res.data;
}

export async function createProduct({ ...props }: AddProductProps) {
  console.log(props);
  const res = await axios.post(`${BASE_URL}/products`, {
    ...props,
  });

  return res.data;
}

export async function editProduct({ ...props }: AddProductProps) {
  const res = await axios.put(`${BASE_URL}/products/${props._id}`, {
    ...props,
  });

  return res.data;
}

export async function getOrders(token: string) {
  const res = await axios.get(`${BASE_URL}/order`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data);
  return res.data.data;
}

export async function disableProduct(productId: string) {
  console.log(productId);
}

export async function enableProduct(productId: string) {
  console.log(productId);
}

export async function deleteOrder(orderId: string) {
  console.log(orderId);
}

export async function getOrderById(orderId: string, token: string) {
  console.log("Yessssssssss");
  const res = await axios.get(`${BASE_URL}/order`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.data);
  // return res.data.data;
}

export async function editOrder(
  orderId: string,
  productId: string,
  quantity: string
) {
  console.log(orderId);
  console.log(productId);
  console.log(quantity);
}

export async function updateOrderStatus(
  orderId: string,
  type: string,
  token: string
) {
  console.log(orderId);
  console.log(type);
  console.log(token);

  let data = {
    orderStatus: "PENDING",
    deliveryStatus: "PENDING",
  };

  if (type === "pending") {
    data.orderStatus = "PENDING";
    data.deliveryStatus = "PENDING";
  }

  if (type === "processing") {
    data.orderStatus = "PROCESSING";
    data.deliveryStatus = "PROCESSING";
  }

  if (type === "delivered") {
    data.orderStatus = "DELIVERED";
    data.deliveryStatus = "DELIVERED";
  }

  if (type === "cancelled") {
    data.orderStatus = "CANCELLED";
    data.deliveryStatus = "CANCELLED";
  }

  console.log(data);

  const res = await axios.put(`${BASE_URL}/order/${orderId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data);

  return res.data.data;
}

export async function getWaitlists(token: string) {
  const res = await axios.get(
    `${BASE_URL}/waitlist/admin/list?page=1&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data.data);
  // return waitlist.data;
  return res.data.data;
}

export async function waitlistRemove(
  userId: string,
  productId: string,
  token: string
) {
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
  const res = await axios.post(`${BASE_URL}/waitlist/admin/add`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId: userId,
      productId: productId,
    },
  });

  // console.log(res.data);

  return res.data.data;
}
