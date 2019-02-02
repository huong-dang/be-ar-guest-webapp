import axios from 'axios';

class Index extends React.Component {
    state = {
        restaurants: []
    }

    // async componentDidMount() {
    //     const result = await axios.get('/restaurants/getAll');
    //     console.log('result', result);
    //     this.setState({restaurants: result.data});
    // }

    render() {
        return (
            <div>
                hello!
            </div>
        )
    }
}

export default Index;
