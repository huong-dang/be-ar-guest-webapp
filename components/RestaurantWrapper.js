import RestaurantCard from '../components/RestaurantCard';
import axios from 'axios';

class RestaurantWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: []
        }
    }
    
    async componentDidMount() {
        try {
            const result = await axios.get('/restaurant/getAllRestaurantsInfo');
            this.setState({
                restaurants: result.data
            })
        } catch (e) {
            console.log('Error', e);
        }
    }

    render () {
        console.log(this.state.restaurants);
        const restaurantsInfo = this.state.restaurants.map((restaurant, index) => 
            {
                return <RestaurantCard  key={restaurant.restaurantID} 
                                        restaurantID={restaurant.restaurantID}
                                        restaurantName={restaurant.restaurantName} 
                                        restaurantLand={restaurant.landName}/>
            }
        )
        return (
            <div>
                {restaurantsInfo}
            </div>
        )
    }
}

export default RestaurantWrapper;