'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layouts/UserTabs";
import Link from "next/link";
import Right from "@/components/icons/Right";


export default function MenuItemsPage() {
    const { loading, data } = useProfile();

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
        </section>
    )
}