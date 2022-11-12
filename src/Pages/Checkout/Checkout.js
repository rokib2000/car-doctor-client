import React from "react";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Checkout = () => {
  const { title, price, _id } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };

    fetch("https://car-doctor-server-pearl.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Order placed ");
          form.reset();
        }
      })
      .catch((er) => console.error(er));
  };

  return (
    <form onSubmit={handlePlaceOrder}>
      <div className="container mx-auto my-12">
        <h2 className="text-4xl my-4">{title}</h2>
        <h4 className="text-3xl my-4">Price: ${price}</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <input name="firstName" type="text" placeholder="First Name" className="input w-full input-bordered" />
          <input name="lastName" type="text" placeholder="Last Name" className="input w-full input-bordered" />
          <input name="phone" type="text" placeholder="Your phone" className="input w-full input-bordered" />
          <input
            name="email"
            type="text"
            placeholder="Your Email"
            defaultValue={user?.email}
            disabled
            className="input w-full input-bordered"
          />
        </div>
        <textarea
          name="message"
          className="textarea textarea-bordered h-24 w-full my-4"
          placeholder="Your message"
        ></textarea>
        <input type="submit" className="btn my-4" value="Submit" />
      </div>
    </form>
  );
};

export default Checkout;
