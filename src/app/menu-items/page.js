'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layouts/UserTabs";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";


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
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link className="button flex"
                    href={'/menu-items/new'}>
                    Create new menu item
                    <Right />
                </Link>
            </div>
            <div>
                {menuItems?.length > 0 && menuItems.map(item => (
                    <div>{item.name}</div>
                ))}
            </div>
        </section>
    )
}