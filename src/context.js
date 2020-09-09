import React, { Component } from 'react'
import Client from './contentful'
// import items from './data'
// When using local data, change
// let rooms = this.formatData() to use items instead

const RoomContext = React.createContext()

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }

    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: 'beachResortData',
                order: 'fields.name'
            })

            let rooms = this.formatData(response.items)
            const featuredRooms = rooms.filter(rooms => rooms.featured)
            const maxPrice = Math.max(...rooms.map(item => item.price))
            const maxSize = Math.max(...rooms.map(item => item.size))

            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    componentDidMount () {
        this.getData()
    }

    formatData (items) {
        return items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(img => img.fields.file.url)
            return {...item.fields, id, images}
        })
    }

    getRoom = (slug) => {
        const tempRooms = [...this.state.rooms]
        const room = tempRooms.find((room) => room.slug === slug)
        return room
    }

    handleChange = evt => {
        const target = evt.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({ [name]: value }, this.filterRooms)
    }

    filterRooms = () => {
        let {
            rooms,
            type,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets
        } = this.state

        let tempRooms = [...rooms]

        // Clean data
        capacity = parseInt(capacity)
        price = parseInt(price)
        minSize = parseInt(minSize)
        maxSize = parseInt(maxSize)

        // Filter
        if (type !== 'all') tempRooms = tempRooms.filter(room => room.type === type)
        if (capacity !== 1) tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        tempRooms = tempRooms.filter(room => room.price <= price)
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
        if (pets) tempRooms = tempRooms.filter(room => room.pets)
        if (breakfast) tempRooms = tempRooms.filter(room => room.breakfast)

        // Updating state
        this.setState({ sortedRooms: tempRooms })
    }

    render () {
        return (
            <RoomContext.Provider
                value={{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange
                }}
            >
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer

export const withRoomConsumer = (Component) => {
    return (props) => {
        return <RoomConsumer>
            { value => <Component {...props} context={value} /> }
        </RoomConsumer>
    }
}

export { RoomProvider, RoomConsumer, RoomContext }