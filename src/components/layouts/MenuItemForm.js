import EditableImage from "@/components/layouts/EditableImage";
import { useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem }) {

    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState([]);

    function addSize() {

    }

    return (
        <form className="mt-8 max-w-md mx-auto" onSubmit={evt => onSubmit(evt, { image, name, description, basePrice })}>
            <div className="grid items-start gap-4"
                style={{ gridTemplateColumns: '.3fr .7fr' }}>
                <div className="mt-4">
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className="grow">
                    <label>Item name</label>
                    <input
                        value={name}
                        onChange={evt => setName(evt.target.value)}
                        type="text" />
                    <label>Description</label>
                    <input
                        value={description}
                        onChange={evt => setDescription(evt.target.value)}
                        type="text" />
                    <label>Base price</label>
                    <input
                        value={basePrice}
                        onChange={evt => setBasePrice(evt.target.value)}
                        type="text" />
                    <div className="bg-gray-200 p-2 rounded-md mb-2">
                        <label>Sizes</label>
                        <button
                            type="button"
                            onClick={addSize}
                            className="bg-white ">
                            Add item size
                        </button>
                    </div>
                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    )
}