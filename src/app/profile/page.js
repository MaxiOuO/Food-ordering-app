'use client';
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserForm from "@/components/layouts/UserForm";
import UserTabs from '@/components/layouts/UserTabs';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProfilePage() {

    const [user, setUser] = useState(null);
    const session = useSession();
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(evt, data) {
        evt.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok)
                resolve()
            else
                reject();
        })

        await toast.promise(
            savingPromise,
            {
                loading: 'Saving...',
                success: 'Profile saved!',
                error: 'Could not save.'
            }
        )
    }

    if (status === 'loading' || !profileFetched) {
        return 'loading...';
    }
    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <UserForm user={user} onSave={handleProfileInfoUpdate} />
        </section >
    )
}