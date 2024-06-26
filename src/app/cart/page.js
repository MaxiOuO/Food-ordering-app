'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layouts/SectionHeaders";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layouts/AddressInputs";
import { useProfile } from "@/components/UseProfile";

export default function CartPage() {

    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({});
    const { data: profileData } = useProfile();

    useEffect(() => {
        if (profileData?.city) {
            const { phone, streetAddress, postalCode, city, country } = profileData;
            const addressFormProfile = { phone, streetAddress, postalCode, city, country };
            setAddress(addressFormProfile);
        }
    }, [profileData])

    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
    }

    let subtotal = 0;
    for (const product of cartProducts) {
        subtotal += cartProductPrice(product);
    }

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader={'Cart'} />
            </div>
            <div className="grid mt-8 gap-8 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your shopping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <div className="flex items-center gap-4 border-b py-4">
                            <div className="w-24">
                                <Image src={product.image} alt="" width={240} height={240} />
                            </div>
                            <div className="grow">
                                <h3 className="font-semibold">{product.name}</h3>
                                {product.size && (
                                    <div className="text-sm">
                                        Size:
                                        <span>{product.size.name}</span>
                                    </div>
                                )}
                                {product.extras?.length > 0 && (
                                    <div className="text-sm text-gray-500">
                                        {product.extras.map(extra => (
                                            <div>{extra.name} €{extra.price}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-lg font-semibold">
                                €{cartProductPrice(product)}
                            </div>
                            <div className="ml-2">
                                <button
                                    onClick={() => removeCartProduct(index)}
                                    type="button"
                                    className="p-2">
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="py-2 flex pr-16 justify-end items-center">
                        <div className="text-gray-500">
                            Subtotal:<br />
                            Delivery:<br />
                            Total:
                        </div>
                        <div className="text-lg font-semibold pl-2 text-right">
                            €{subtotal}<br />
                            €5<br />
                            €{subtotal + 5}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form>
                        <AddressInputs
                            addressProps={address}
                            setAddressProp={handleAddressChange} />
                        <button type="submit">Pay €{subtotal + 5}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}