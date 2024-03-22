'use client'
import { useState } from "react";
import { useProfile } from "@/components/UseProfile";

export default function UserForm({ user, onSave }) {

    const [userName, setUserName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const { data: loggedInUserData } = useProfile();

    return (
        <div className="flex gap-4 items-center max-w-2xl mx-auto mt-8">
            <form
                className="grow"
                onSubmit={(evt) => onSave(evt, { name: userName, phone, streetAddress, postalCode, city, country, admin })}
            >
                <label>First and last name</label>
                <input
                    type="text"
                    value={userName}
                    placeholder="firstname and lastname"
                    onChange={evt => setUserName(evt.target.value)}
                />
                <label>Email</label>
                <input
                    type="email" disabled={true} value={user.email}
                />
                <label>Phone</label>
                <input
                    type="tel" placeholder="Phone number" value={phone} onChange={evt => setPhone(evt.target.value)}
                />
                <label>Street address</label>
                <input
                    type="text" placeholder="Street address" value={streetAddress} onChange={evt => setStreetAddress(evt.target.value)}
                />
                <div className='grid grid-cols-2 gap-2'>
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
                {loggedInUserData.admin && (
                    <div>
                        {JSON.stringify(admin)}
                        <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCB">
                            <input id="adminCB" type="checkbox" className=""
                                value={'1'} checked={admin} onClick={evt => setAdmin(evt.target.checked)}
                            />
                            <span>Admin</span>
                        </label>
                    </div>
                )}
                <button type="submit">Save</button>
            </form>
        </div>
    )
}