'use client';
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layouts/UserTabs";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/layouts/MenuItemForm";

export default function EditMenuItemPage() {

    const { id } = useParams();

    const [redirectToItems, setRedirectToItems] = useState(false);
    const { loading, data } = useProfile();
    const [menuItem, setMenuItem] = useState(null);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenuItem(item);
            })
        })
    }, []);

    async function handleFormSubmit(evt, data) {
        evt.preventDefault();
        data = { ...data, _id: id };
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
        </section>
    )
}