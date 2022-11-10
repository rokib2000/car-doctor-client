import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const OrderRow = (props) => {
  const { handleDelete, handleUpdate } = props;
  const { _id, serviceName, phone, customer, price, service, status } = props.order;
  const [orderService, setOrderService] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/services/${service}`)
      .then((res) => res.json())
      .then((data) => setOrderService(data))
      .catch((er) => console.error(er));
  }, [service]);

  return (
    <>
      <tr>
        <th>
          <label>
            <button onClick={() => handleDelete(_id)} className="btn btn-ghost">
              X
            </button>
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                {orderService?.img && <img src={orderService.img} alt="Avatar Tailwind CSS Component" />}
              </div>
            </div>
            <div>
              <div className="font-bold">{customer}</div>
              <div className="text-sm opacity-50">{phone}</div>
            </div>
          </div>
        </td>
        <td>
          {serviceName}
          <br />
          <span className="badge badge-ghost badge-sm">${price}</span>
        </td>
        <th>
          <button onClick={() => handleUpdate(_id)} className="btn btn-ghost btn-xs">
            {status ? status : "pending"}
          </button>
        </th>
      </tr>
    </>
  );
};

export default OrderRow;
