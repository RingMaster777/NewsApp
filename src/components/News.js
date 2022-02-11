import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"



export class News extends Component {


    static defaultProps = {
        country: "us",
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
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFunction(this.props.category)} - DailyWorld`
    }




    async updateNews() {

        this.props.setProgress(10)
        const urlOfFetchNews = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=80484735871d448e929332de4f48c2c5&page=${this.state.page}&pagesize= ${this.props.pageSize}`
        this.props.setProgress(40)

        let data = await fetch(urlOfFetchNews)
        let parsedData = await data.json()
        console.log(parsedData)
        this.props.setProgress(70)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,

        })
        this.props.setProgress(100)

    }

    //make method wait
    async componentDidMount() {
        this.updateNews();
    }


    fetchMoreData = async () => {


        this.setState({
            page: this.state.page + 1,
            loading: true
        });
        const urlOfFetchNews = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=80484735871d448e929332de4f48c2c5&page=${this.state.page}&pagesize= ${this.props.pageSize}`

        let data = await fetch(urlOfFetchNews)
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
    }


    render() {
        return (
            <>
                <div className="container">
                    <h1 className="text-center"  style={{ margin: '35px 0px' }}>DailyWorld - Top {this.capitalizeFunction(this.props.category)} Headlines</h1>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container my-3">
                            <div className="row my-4">
                                {this.state.articles.map((element) => {
                                    return <div className="col-md-4" key={element.url}>
                                        <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                                    </div>

                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            </>
        )
    }
}

export default News
