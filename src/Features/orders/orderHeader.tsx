import { CalendarCheck2, Receipt, TrendingUp, User2Icon } from "lucide-react";
import { Badge } from "flowbite-react";
import { checkOrderStatus, checkPaidStatus, formatDate } from "@/lib/utils";

function OrderHeader({ orders }) {
  const { _id, user, orderStatus, paymentStatus, createdAt } = orders;
  return (
    <div className="flex justify-between items-center border-t-2 mt-5 bg-gray-200 dark:bg-[#15273a]">
      <div className="border border-gray-400/20 border-l-0 py-10 px-5 w-full">
        <div className="flex justify-between align-baseline">
          <div className="text-left space-y-4">
            <h1 className="text-slate-400 capitalize dark:text-white dark:font-light">
              ORDER ID
            </h1>
            <span className=" font-bold text-sm">{_id}</span>
          </div>

          <Receipt size={38} />
        </div>
      </div>
      <div className="border border-gray-400/20 border-l-0 py-10 px-5 w-full">
        <div className="flex justify-between align-baseline">
          <div className="text-left space-y-4">
            <h1 className="text-slate-400 capitalize dark:text-white dark:font-light">
              CUSTOMER NAME
            </h1>
            <span className=" font-bold text-sm">{user}</span>
          </div>

          <User2Icon size={38} />
        </div>
      </div>
      <div className="border border-gray-400/20 py-10 px-5 w-full">
        <div className="flex justify-between align-baseline">
          <div className="text-left space-y-4">
            <h1 className="text-slate-400 font-light capitalize dark:text-white">
              DATE
            </h1>
            <span className=" font-bold text-sm">{formatDate(createdAt)}</span>
          </div>

          <CalendarCheck2 size={38} />
        </div>
      </div>
      <div className="border border-gray-400/20 border-r-0 py-10 px-5 w-full">
        <div className="flex justify-between align-baseline">
          <div className="text-left space-y-4">
            <div className="flex flex-row justify-between items-center space-x-2">
              <div>
                <h1 className="text-slate-400 font-light text-[11px] capitalize dark:text-white">
                  ORDER STATUS
                </h1>
                <span>
                  <Badge
                    className="mt-1"
                    color={checkOrderStatus(orderStatus)?.className}
                  >
                    {checkOrderStatus(orderStatus)?.text}
                  </Badge>
                </span>
              </div>
              <div>
                <h1 className="text-slate-400 font-light text-[11px] capitalize dark:text-white">
                  PAYMENT STATUS
                </h1>
                <span>
                  <Badge
                    className="mt-1"
                    color={checkPaidStatus(paymentStatus)?.className}
                  >
                    {checkPaidStatus(paymentStatus)?.text}
                  </Badge>
                </span>
              </div>
            </div>
          </div>
          <TrendingUp size={38} />
        </div>
      </div>
    </div>
  );
}

export default OrderHeader;
