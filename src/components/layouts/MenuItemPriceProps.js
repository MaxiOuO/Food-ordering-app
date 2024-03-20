import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import { useState } from "react";

export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {
    const [isOpen, setIsOpen] = useState(false);

    function addProps() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }];
        })
    }

    function editProps(evt, index, prop) {
        const newValue = evt.target.value
        setProps(prevProps => {
            const newProps = [...prevProps];
            newProps[index][prop] = newValue;
            return newProps;
        })
    }

    function removeProps(index) {
        setProps(prev => prev.filter((v, i) => i !== index));
    }

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex p-1 border-0 justify-start"
                type="button">
                {isOpen && <ChevronUp />}
                {!isOpen && <ChevronDown />}
                <span>{name}</span>
                <span>({props.length})</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((size, index) => (
                    <div className="flex items-end gap-2" key={index}>
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Size name"
                                value={size.name}
                                onChange={evt => editProps(evt, index, 'name')}
                            />
                        </div>
                        <div>
                            <label>Extra price</label>
                            <input
                                type="text"
                                placeholder="Price"
                                value={size.price}
                                onChange={evt => editProps(evt, index, 'price')}
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => removeProps(index)}
                                className="bg-white mb-2 px-2">
                                <Trash />
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addProps}
                    className="bg-white ">
                    <Plus />
                    <span>{addLabel}</span>
                </button>
            </div>
        </div>
    )
}