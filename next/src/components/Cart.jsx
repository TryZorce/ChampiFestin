import { useState, useEffect } from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import style from "../components/cart.module.css";
import { RiPriceTag2Fill } from "react-icons/ri";
import makeRequest from "@/utils/Fetcher";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Récupérer les produits du localStorage lors de l'initialisation du composant
    const storedProducts = localStorage.getItem("cartItems");
    if (storedProducts) {
      setCartProducts(JSON.parse(storedProducts));
    }
  }, []);

  const [codeData, setCodeData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const errorMessages = [
    "C'est une hallucination collective!",
    "Toi par contre t'as trop fumé mon reuf",
    "T'as les crampté?",
    "Apagnan",
    "Baguette is not happy with that",
    "Quoicoubeh",
    "Quoicoubaka",
    "Salade tomates oignons",
    "Dev full stack double écran",
    "Kebab Kebab",
    "Ouais c'est Greg",
    "Ouais c'est le fils de Greg",
    "Allô Bassem?",
    "Whesh Apex",
    "ça paye Simplon",
  ];

  const getPromotion = async (value) => {
    console.log(`http://localhost:8000/api/promotions?code=${value}`);
    return makeRequest({
      url: `http://localhost:8000/api/promotions?code=${value}`,
      method: "get",
      data: "",
    }).then((data) => {
      if (data.length > 0) {
        setError("");
        setCodeData(data[0]);
        if (data[0].percentage) {
          setSuccess(
            `You have used the code ${data[0].code} successfully! You saved ${data[0].value}%`
          );
        } else {
          setSuccess(
            `You have used the code ${data[0].code} successfully! You saved ${data[0].value}€`
          );
        }
      } else if (
        value.toLowerCase() === "hitler" ||
        value.toLowerCase() === "adolf" ||
        value.toLowerCase() === "nazi"
      ) {
        setError("卐 NEIN NEIN NEIN NEIN 卐");
      } else {
        setError(
          errorMessages[Math.floor(Math.random() * errorMessages.length)]
        );
      }
    });
  };

  useEffect(() => {
    calculateTotal();
  }, [codeData]);

  const applyPromoCode = () => {
    const inputPromo = document.querySelector("#promoCodeInput");
    const { value } = inputPromo;
    const match = value.match(/^[a-zA-Z0-9_.,;:!¡¿?@#"\'+&*-]+$/gm);

    if (match !== null && match.length > 0) {
      const testCode = match[0];

      getPromotion(testCode);
    } else {
      setError("Wtf you're trying to do???");
    }
  };

  const removeProduct = (productId) => {
    const updatedCart = cartProducts.filter(
      (product) => product.id !== productId
    );
    setCartProducts(updatedCart);
  };

  const calculateTotal = () => {
    let total = 0;

    cartProducts.forEach((product) => {
      total += product.price;
    });

    if (Object.keys(codeData).length > 0) {
      if (codeData.percentage) {
        total -= (total * codeData.value) / 100;
      } else {
        total -= codeData.value;
      }
    }
if (total < 0 ) {
  return 0
}
    return total;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo((prevCustomerInfo) => ({
      ...prevCustomerInfo,
      [name]: value,
    }));
  };

  const confirmOrder = () => {
    if (
      customerInfo.name.trim() === "" ||
      !customerInfo.name.trim().match(/[a-zA-Z ]{2,30}/) ||
      customerInfo.surname.trim() === "" ||
      !customerInfo.surname.trim().match(/[a-zA-Z ]{2,30}/) ||
      customerInfo.email.trim() === "" ||
      customerInfo.phone.trim() === ""
    ) {
      alert("Please fill your information so we can contact you.");
    } else {
      const orderMessage = `Thank you for your order, ${customerInfo.name}! Your order is confirmed. You can pick it up in 3 hours.`;
      alert(orderMessage);
      console.log("Customer Information:", customerInfo);
      console.log("Order Products:", cartProducts);

      setCustomerInfo({
        name: "",
        surname: "",
        email: "",
        phone: "",
      });
      setCartProducts([]);
    }
  };

  return (
    <div className={style.cart}>
      <Panel header="Cart" className={style.panel}>
        {cartProducts.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className={style.productList}>
              {cartProducts.map((product) => (
                <li key={product.id} className={style.productItem}>
                  <div className={style.productImage}>
                    <img
                      src={
                        "http://localhost:8000/uploads/images" + product.image
                      }
                      alt={product.name}
                    />
                  </div>
                  <span>{product.name}</span>
                  <span>{product.price} €</span>
                  <Button
                    label="Delete"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => removeProduct(product.id)}
                  />
                </li>
              ))}
            </ul>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
            <div className={style.total}>
              <span>Total :</span>
              <span>{calculateTotal()} €</span>
            </div>
            <input type="text" placeholder="Code promo" id="promoCodeInput" />{" "}
            <button onClick={applyPromoCode}>
              <RiPriceTag2Fill />
            </button>
          </>
        )}
        <div className={style.customerInfo}>
          <h2>Customer Information</h2>
          <div className={style.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={customerInfo.surname}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
            />
          </div>
          <Button
            label="Confirm Order"
            className="p-button-success"
            onClick={confirmOrder}
          />
        </div>
      </Panel>
    </div>
  );
};

export default Cart;
