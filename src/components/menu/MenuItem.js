import { useContext, useState } from "react"
import { CartContext } from "../AppContext"
import toast from "react-hot-toast";
import Image from "next/image";

export default function MenuItem(menuItem) {

    const {
        name, image, description, basePrice, sizes, extraIngredientPrices
    } = menuItem;

    const { addToCart } = useContext(CartContext);
    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);

    function handleAddToCartButtonClick() {
        const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
        if (hasOptions && !showPopUp) {
            setShowPopUp(true);
            return;
        }
        addToCart(menuItem, selectedSize, selectedExtras);
        setShowPopUp(false);
        toast.success('Added to cart!');
    }

    function handleExtrasClick(evt, extras) {
        const checked = evt.target.checked;
        if (checked) {
            setSelectedExtras(prev => [...prev, extras]);
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name !== extras.name);
            })
        }
    }

    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (selectedExtras?.length > 0) {
        for (const extras of selectedExtras) {
            selectedPrice += extras.price;
        }
    }

    return (
        <>
            {showPopUp && (
                <div
                    onClick={() => setShowPopUp(false)}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div
                        onClick={evt => evt.stopPropagation()}
                        className="my-8 bg-white p-2 rounded-lg max-w-md">
                        <div className="overflow-y-scroll p-2"
                            style={{ maxHeight: 'calc(100vh - 100px)' }}>
                            <Image
                                src={image}
                                alt={name}
                                width={300} height={200}
                                className="mx-auto" />
                            <h2 className="font-bold text-lg text-center mb-2">
                                {name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">
                                {description}</p>
                            {sizes?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Pick your size</h3>
                                    {sizes.map(size => (
                                        <label className="flex items-center gap-2 p-4 rounded-md mb-1 border">
                                            <input
                                                type="radio"
                                                onClick={() => setSelectedSize(size)}
                                                checked={selectedSize?.name === size.name}
                                                name="size" />
                                            {size.name} €{basePrice + size.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {extraIngredientPrices?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Any extras?</h3>
                                    {extraIngredientPrices.map(extras => (
                                        <label className="flex items-center gap-2 p-4 rounded-md mb-1 border">
                                            <input
                                                type="checkbox"
                                                onClick={(evt) => handleExtrasClick(evt, extras)}
                                                name={extras.name} />
                                            {extras.name} + €{extras.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <button
                                onClick={handleAddToCartButtonClick}
                                type="button"
                                className="primary sticky bottom-2">
                                Add to Cart €{selectedPrice}
                            </button>
                            <button
                                className="mt-2"
                                onClick={() => setShowPopUp(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25">
                <div className="text-center" >
                    <img src={image} alt="pizza"
                        className="max-h-auto max-h-24 block mx-auto" />
                </div>
                <h4 className="font-semibold my-3 text-xl">
                    {name}
                </h4>
                <p className="text-gray-500 text-sm line-clamp-3">
                    {description}
                </p>
                <button
                    type="button"
                    onClick={handleAddToCartButtonClick}
                    className="bg-primary text-white rounded-full px-8 py-2 mt-4">
                    {(sizes?.length > 0 || extraIngredientPrices.length > 0 ? (
                        <span>Add to cart (from €{basePrice}) </span>
                    ) : (
                        <span>Add to cart €{basePrice}</span>
                    ))}
                </button>
            </div>
        </>
    )
}