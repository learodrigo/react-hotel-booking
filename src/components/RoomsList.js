import React from 'react'
import Room from './Room'

export default function RoomsList ({ rooms }) {
    if (!rooms.length) return (
        <div className="empty-search">
            <h3>unfortunately no rooms found for your search :(</h3>
        </div>
    )

    return (
        <section className='roomslist'>
            <div className="roomslist-center">
                {rooms.map((item, index) => {
                    return <Room key={index} room={item} />
                })}
            </div>
        </section>
    )
}
