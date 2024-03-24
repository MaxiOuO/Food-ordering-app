export default function MenuItem({
    name, image, description, basePrice, sizes, extraIngradientPrices
}) {
    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25">
            <div className="text-center">
                <img src={image} alt="pizza" className="max-h-auto max-h-24 block mx-auto" />
            </div>
            <h4 className="font-semibold my-3 text-xl">
                {name}
            </h4>
            <p className="text-gray-500 text-sm line-clamp-3">
                {description}
            </p>
            <button className="bg-primary text-white rounded-full px-8 py-2 mt-4">
                Add to cart €{basePrice}
            </button>
        </div>
    )
}