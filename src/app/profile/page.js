'use client';
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link';
import UserTabs from '@/components/layouts/UserTabs';

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(evt) {
        evt.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userName,
                    phone,
                    streetAddress,
                    postalCode,
                    city,
                    country
                }),
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

            <div className="flex gap-4 items-center max-w-md mx-auto mt-8">
                <form className="grow" onSubmit={handleProfileInfoUpdate}>
                    <label>First and last name</label>
                    <input
                        type="text"
                        value={userName}
                        placeholder="firstname and lastname"
                        onChange={evt => setUserName(evt.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type="email" disabled={true} value={session.data.user.email}
                    />
                    <label>Phone</label>
                    <input
                        type="tel" placeholder="Phone number" value={phone} onChange={evt => setPhone(evt.target.value)}
                    />
                    <label>Street address</label>
                    <input
                        type="text" placeholder="Street address" value={streetAddress} onChange={evt => setStreetAddress(evt.target.value)}
                    />
                    <div className='flex gap-2'>
                        <div>
                            <label>Postal code</label>
                            <input
                                type="text" placeholder="Postal code" value={postalCode} onChange={evt => setPostalCode(evt.target.value)}
                            />
                        </div>
                        <div>
                            <label>City</label>
                            <input
                                type="text" placeholder="City" value={city} onChange={evt => setCity(evt.target.value)}
                            />
                        </div>
                    </div>
                    <label>Country</label>
                    <input
                        type="text" placeholder="Country" value={country} onChange={evt => setCountry(evt.target.value)}
                    />
                    <button type="submit">Save</button>
                </form>
            </div>
        </section >
    )
}