import React, { Component } from 'react'



export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date } = this.props
        return (
            <div className="card">
                <img src={imageUrl === null ? "https://images.hindustantimes.com/img/2021/12/09/550x309/WhatsApp_Image_2021-09-18_at_09.42.18_1631944439782_1639027840783.jpeg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className='small-text text-dark'><small className="text-muted">By {author?author:"Anonymous"} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                </div>
            </div>
        )
    }
}

export default NewsItem
