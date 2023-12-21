import React, { Component } from 'react'

interface NewsItemComponentProps {
    title: string;
    description: string;
    imageUrl: string;
    newsUrl: string
  }

export default class NewsItemComponent extends Component<NewsItemComponentProps> {
  
  render() {
   
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
        <>
            <div  className="card" style={{width: '18rem'}}>
                <img src={imageUrl}  className="card-img-top" alt="news"/>
                <div  className="card-body">
                    <h5  className="card-title">{title}</h5>
                    <p  className="card-text">{description}</p>
                    <a href={newsUrl} target="_blank" rel="noreferrer"  className="btn btn-primary">Read More</a>
                </div>
            </div>
        </>
    )
  }
}
