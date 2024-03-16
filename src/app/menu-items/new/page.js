'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layouts/UserTabs";
import EditableImage from "@/components/layouts/EditableImage";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";

export default function NewMenuItemPage() {
    const { loading, data } = useProfile();

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [redirectToItems, setRedirectToItems] = useState(false);

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
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
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
            <div>
                <Link href={'/menu-items'} className="button max-w-md mx-auto mt-8">
                    <Left />
                    <span>Show all menu-items</span>
                </Link>
            </div>
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