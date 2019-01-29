import axios from 'axios';

class Index extends React.Component {
    state = {
        restaurants: []
    }

    async componentDidMount() {
        const result = await axios.get('/restaurants/getAll');
        console.log('result', result);
        this.setState({restaurants: result.data});
    }

    render() {
        return (
            <div>
                {this.state.restaurants.length > 0 ? this.state.restaurants[0].restaurantName : 'eep'}
            </div>
        )
    }
}

export default Index;
