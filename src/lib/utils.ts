import { type ClassValue, clsx } from "clsx";
import { stat } from "fs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNigerianPrice(price: number) {
  // Check if the input is a valid number
  if (isNaN(price)) {
    return "Invalid price";
  }

  // Convert the price to a string and split it into whole and decimal parts
  const parts = price.toFixed(2).toString().split(".");

  // Format the whole part with commas
  const wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the whole and decimal parts with the Naira symbol
  const formattedPrice = `₦${wholePart}.${parts[1]}`;

  return formattedPrice;
}

export function calculateDiscountPercentage(
  originalPrice: number,
  discountedPrice: number
) {
  // Check if the input prices are valid numbers
  if (isNaN(originalPrice) || isNaN(discountedPrice)) {
    return "Invalid input. Please provide valid numbers.";
  }

  // Calculate the discount percentage
  const discountPercentage =
    ((originalPrice - discountedPrice) / originalPrice) * 100;

  return discountPercentage.toFixed(2);
}

export function determineStatus(stock: string | number) {
  let color;
  let text;

  if (+stock == 0) {
    text = "out of stock";
    color = "failure";
  }

  if (+stock < 5) {
    text = "Low stock";
    color = "warning";
  }

  if (+stock >= 5) {
    text = "In stock";
    color = "success";
  }

  return { text, color };
}

export function checkOrderStatus(status: string) {
  let className;
  let text;

  if (status == "PENDING") {
    className = "warning";
    text = "Pending";
  }

  if (status == "PROCESSING") {
    className = "info";
    text = "Processing";
  }

  if (status == "DELIVERED") {
    className = "success";
    text = "Delivered";
  }

  if (status == "CANCELLED") {
    className = "red";
    text = "Cancelled";
  }

  return { className, text };
}

export function checkDeliveryStatus(status: string) {
  let className;
  let text;
  if (status == "NOT_DELIVERED") {
    text = "Awaiting";
    className = "warning";
  }

  if (status == "NOT_DELIVERED") {
    text = "Delivered";
    className = "success";
  }

  return { className, text };
}

export function checkPaidStatus(status: string) {
  let className;
  let text;

  if (status == "UNPAID") {
    className = "warning";
    text = "Pending";
  }

  if (status == "PAID") {
    className = "success";
    text = "Paid";
  }

  if (status == "FAILED") {
    className = "failure";
    text = "Failed";
  }

  return { className, text };
}

export function formatDate(date: string) {
  const dateForm = date.split("-").slice(0, 3).reverse();
  const index1 = [dateForm[0].slice(0, 2)];
  const newDateForm = dateForm.slice(1, 3);

  return index1.concat(newDateForm).join("/");
}

export function sumOfArr(arr) {
  let sum = arr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return sum;
}

export function checkTransactionStatus(status: string) {
  let className;

  if (status == "Verified") {
    className = "success";
  }

  if (status == "Unverified") {
    className = "failure";
  }

  return { className };
}

export function dateFormat(dateString: string) {
  const [month, day, year] = new Date(dateString)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .split(" ");

  const dayInt = parseInt(day);
  const suffix =
    dayInt === 1 || dayInt === 21 || dayInt === 31
      ? "st"
      : dayInt === 2 || dayInt === 22
      ? "nd"
      : dayInt === 3 || dayInt === 23
      ? "rd"
      : "th";

  return `${month} ${dayInt}${suffix} ${year}`;
}
