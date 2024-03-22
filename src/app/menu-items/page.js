'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layouts/UserTabs";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function MenuItemsPage() {

    const { loading, data } = useProfile();
    const [menuItems, setMenuItems] = useState('');

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            })
        })
    }, [])

    if (loading) {
        return 'Loading user info...';
    }

    if (!data) {
        return 'Not an admin.';
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link className="button flex"
                    href={'/menu-items/new'}>
                    Create new menu item
                    <Right />
                </Link>
            </div>
            <div>
                <h2 className="mt-8 text-gray-500 text-sm">Edit menu items:</h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link href={'/menu-items/edit/' + item._id} className="bg-gray-200 rounded-lg p-4" key={item._id}>
                            <div className="relative">
                                <Image src={item.image} alt="" width={200} height={200} className="rounded-md" />
                            </div>
                            <div className="text-center">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}