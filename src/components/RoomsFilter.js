import React from 'react'
import { useContext } from 'react'
import { RoomContext } from '../context'
import Title from './Title'

// Get all unique values from props
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomsFilter ({ rooms }) {
    const context = useContext(RoomContext)
    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context

    // Get and map jsx type values
    let types = getUnique(rooms, 'type')
    types = ['all', ...types]
    types = types.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    })
    // Get and map jsx type capacity
    let guests = getUnique(rooms, 'capacity')
    guests = guests.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    })

    return (
        <section className='filter-container'>
            <Title title='search rooms' />
            <form className='filter-form'>
            {/* select type */}
                <div className='form-group'>
                    <label htmlFor='type'>room type</label>
                    <select
                        className='form-control'
                        id='type'
                        name='type'
                        onChange={handleChange}
                        value={type}
                    >
                        {types}
                    </select>
                </div>
            {/* select capacity */}
                <div className='form-group'>
                    <label htmlFor='capacity'>guests</label>
                    <select
                        className='form-control'
                        id='capacity'
                        name='capacity'
                        onChange={handleChange}
                        value={capacity}
                    >
                        {guests}
                    </select>
                </div>
            {/* select price */}
                <div className="form-group">
                    <label htmlFor="price">up to ${price}</label>
                    <input
                        className='form-control'
                        id='price'
                        max={maxPrice}
                        min={minPrice}
                        name='price'
                        onChange={handleChange}
                        type="range"
                        value={price}
                    />
                </div>
            {/* select price */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input
                            className='size-input'
                            id='size'
                            name='minSize'
                            onChange={handleChange}
                            type="number"
                            value={minSize}
                        />
                        <input
                            className='size-input'
                            id='size'
                            name='maxSize'
                            onChange={handleChange}
                            type="number"
                            value={maxSize}
                        />
                    </div>
                </div>
            {/* extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input
                            checked={breakfast}
                            id='breakfast'
                            name='breakfast'
                            onChange={handleChange}
                            type="checkbox"
                        />
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input
                            checked={pets}
                            id='pets'
                            name='pets'
                            onChange={handleChange}
                            type="checkbox"
                        />
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
            </form>
        </section>
    )
}
