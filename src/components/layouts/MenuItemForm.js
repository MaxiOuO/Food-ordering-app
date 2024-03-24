import EditableImage from "@/components/layouts/EditableImage";
import MenuItemPriceProps from "@/components/layouts/MenuItemPriceProps";
import { useEffect, useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem }) {

    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }, []);

    return (
        <form
            className="mt-8 max-w-2xl mx-auto"
            onSubmit={evt => onSubmit(evt, { image, name, description, basePrice, sizes, extraIngredientPrices, category })}>
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
                    <label>Category</label>
                    <select value={category} onChange={evt => setCategory(evt.target.value)}>
                        {categories?.length > 0 && categories.map(c => (
                            <option key={c.index} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    <label>Base price</label>
                    <input
                        value={basePrice}
                        onChange={evt => setBasePrice(evt.target.value)}
                        type="text" />
                    <MenuItemPriceProps
                        name={'Sizes'}
                        addLabel={'Add item size'}
                        props={sizes}
                        setProps={setSizes} />
                    <MenuItemPriceProps
                        name={'Extra ingredients'}
                        addLabel={'Add ingredients prices'}
                        props={extraIngredientPrices}
                        setProps={setExtraIngredientPrices} />
                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    )
}