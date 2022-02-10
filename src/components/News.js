import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'


export class News extends Component {

    constructor() {
        super()
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    //make method wait
    async componentDidMount() {
        let urlOfFetchNews = `https://newsapi.org/v2/top-headlines?country=us&apiKey=80484735871d448e929332de4f48c2c5&page=1&pagesize= ${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(urlOfFetchNews)
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let urlOfFetchNews = `https://newsapi.org/v2/top-headlines?country=us&apiKey=80484735871d448e929332de4f48c2c5&page=${this.state.page + 1}&pagesize= ${this.props.pageSize}`
            this.setState({ loading: true })
            let data = await fetch(urlOfFetchNews)
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    handlePrevClick = async () => {
        let urlOfFetchNews = `https://newsapi.org/v2/top-headlines?country=us&apiKey=80484735871d448e929332de4f48c2c5&page=${this.state.page - 1}&pagesize= ${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(urlOfFetchNews)
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false

        })

    }


    render() {
        return (
            <>
                <div className="container my-3">
                    <h1 className="text-center">News Headings</h1>
                    {this.state.loading && <Spinner />}
                    <div className="row my-4">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage} newsUrl={element.url} />
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
