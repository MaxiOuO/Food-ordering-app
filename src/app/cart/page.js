'use client';
import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layouts/SectionHeaders";
import Image from "next/image";
import { useContext } from "react";
import Trash from "@/components/icons/Trash";


export default function CartPage() {

    const { cartProducts } = useContext(CartContext);

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader={'Cart'} />
            </div>
            <div className="grid mt-4 gap-4 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your shopping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map(product => (
                        <div className="flex items-center gap-4 mb-2 border-b py-2">
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
                                €12
                            </div>
                            <div className="ml-2">
                                <button className="p-2"><Trash /></button>
                            </div>
                        </div>
                    ))}
                </div>
                <div>Right</div>
            </div>
        </section>
    )
}