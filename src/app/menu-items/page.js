'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layouts/UserTabs";
import EditableImage from "@/components/layouts/EditableImage";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage() {
    const { loading, data } = useProfile();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');

    async function handleFormSubmit(evt) {
        evt.preventDefault();
        const data = {
            image, name, description, basePrice
        };
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });
        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item...',
            success: 'Saved',
            error: 'Error'
        })
    }


    if (loading) {
        return 'Loading user info...';
    }

    if (!data) {
        return 'Not an admin.';
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
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
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        </section>
    )
}