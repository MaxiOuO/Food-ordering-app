'use client'
import { useState } from "react";
import { useProfile } from "@/components/UseProfile";
import AddressInputs from "@/components/layouts/AddressInputs";

export default function UserForm({ user, onSave }) {

    const [userName, setUserName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const { data: loggedInUserData } = useProfile();

    function handleAddressChange(propName, value) {
        if (propName === 'phone') setPhone(value);
        if (propName === 'streetAddress') setStreetAddress(value);
        if (propName === 'postalCode') setPostalCode(value);
        if (propName === 'city') setCity(value);
        if (propName === 'country') setCountry(value);
    }

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
                <AddressInputs
                    addressProps={{ phone, streetAddress, postalCode, city, country }}
                    setAddressProp={handleAddressChange} />
                {loggedInUserData.admin && (
                    <div>
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