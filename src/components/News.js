import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'




export class News extends Component {

    static defaultProps = {
        country: "bg",
        category: "general",
        pageSize: 6
    }
    capitalizeFunction = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    static protoTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFunction(this.props.category)} - DailyWorld`
    }




    async updateNews() {
        const urlOfFetchNews = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=80484735871d448e929332de4f48c2c5&page=${this.state.page}&pagesize= ${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(urlOfFetchNews)
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })

    }

    //make method wait
    async componentDidMount() {
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({
            page: this.state.page + 1,
        })
        this.updateNews();
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        //     let urlOfFetchNews = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=80484735871d448e929332de4f48c2c5&page=${this.state.page + 1}&pagesize= ${this.props.pageSize}`
        //     this.setState({ loading: true })
        //     let data = await fetch(urlOfFetchNews)
        //     let parsedData = await data.json()
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     })
        // }
    }

    handlePrevClick = async () => {
        // let urlOfFetchNews = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=80484735871d448e929332de4f48c2c5&page=${this.state.page - 1}&pagesize= ${this.props.pageSize}`
        // this.setState({ loading: true })
        // let data = await fetch(urlOfFetchNews)
        // let parsedData = await data.json()
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false

        // })

        this.setState({
            page: this.state.page - 1,
        })
        this.updateNews();

    }


    render() {
        return (
            <>
                <div className="container my-3">
                    <h1 className="text-center">DailyWorld - Top {this.capitalizeFunction(this.props.category)} Headlines</h1>
                    {this.state.loading && <Spinner />}
                    <div className="row my-4">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>

                        })}
                    </div>
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </>
        )
    }
}

export default News
