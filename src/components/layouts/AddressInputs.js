

export default function AddressInputs({ addressProps, setAddressProp }) {

    const { phone, streetAddress, postalCode, city, country } = addressProps;

    return (
        <>
            <label>Phone</label>
            <input
                type="tel" placeholder="Phone number" value={phone} onChange={evt => setAddressProp('phone', evt.target.value)}
            />
            <label>Street address</label>
            <input
                type="text" placeholder="Street address" value={streetAddress} onChange={evt => setAddressProp('streetAddress', evt.target.value)}
            />
            <div className='grid grid-cols-2 gap-2'>
                <div>
                    <label>Postal code</label>
                    <input
                        type="text" placeholder="Postal code" value={postalCode} onChange={evt => setAddressProp('postalCode', evt.target.value)}
                    />
                </div>
                <div>
                    <label>City</label>
                    <input
                        type="text" placeholder="City" value={city} onChange={evt => setAddressProp('city', evt.target.value)}
                    />
                </div>
            </div>
            <label>Country</label>
            <input
                type="text" placeholder="Country" value={country} onChange={evt => setAddressProp('country', evt.target.value)}
            />
        </>
    )
}