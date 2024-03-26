import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import useDisableProduct from "@/Features/Products/useDisableProduct";
import { Dropdown } from "flowbite-react";
import useEnableProduct from "@/Features/Products/useEnableProduct";

const Options = ({
  productId,
  status,
}: {
  productId: string;
  status: string;
}) => {
  const { productDisable, isDisabaling } = useDisableProduct();
  const { productEnable, isEnabling } = useEnableProduct();

  return (
    <Dropdown
      label=""
      renderTrigger={() => <MoreVertical className="cursor-pointer" />}
      dismissOnClick={true}
    >
      <Dropdown.Item>
        <Link to={`/product/${productId}`}>Product Details</Link>
      </Dropdown.Item>

      {status ? (
        <Dropdown.Item
          className="flex justify-center"
          disabled={isDisabaling}
          onClick={() => productDisable(productId)}
        >
          <span>Disable</span>
        </Dropdown.Item>
      ) : (
        <Dropdown.Item
          className="flex justify-center"
          disabled={isEnabling}
          onClick={() => productEnable(productId)}
        >
          <span>Enable</span>
        </Dropdown.Item>
      )}
    </Dropdown>
  );
};

export default Options;
