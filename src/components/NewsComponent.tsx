import React, { Component } from 'react'
import NewsItemComponent from './NewsItemComponent.tsx'
import './NewsComponent.css'

interface Article {
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string | null;
  }
  
  interface State {
    articles: Article[];
    loading: boolean;
    pageNum: Number
  }
export default class NewsComponent extends Component<{},State> {
     articles = [];
      constructor(props:{}){
        super(props);
        this.state = {
            articles:this.articles,
            loading:false,
            pageNum :1
        }
      };
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1487053d29f9460485bf80ee29944a1b&page=${this.state.pageNum}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState( {
            articles:parsedData.articles
        })
    }
    previousClicked() {
      this.setState( {
        pageNum: this.state.pageNum
      })
      
    }

    nextClicked(){
      this.setState( {
        pageNum: 2
      })
    }
  render() {
    
    
    return (
        <>
            <div className="row">
                {
                    this.state.articles.map((element)=>{
                        return  <div className='col-md-4 pad-2' key={element.url}>  
                            <NewsItemComponent title={element.title?(element.title).slice(0,45)+'...':""} description={element.description?element.description+'...'.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://static.toiimg.com/photo/106058358.cms"} newsUrl={element.url}/>
                        </div>
                    })
                }   
            </div>
            <div className="container">
                <button type="button"  className="btn btn-dark mx-4" onClick={this.previousClicked}>Previous</button>
                <button type="button"  className="btn btn-dark" onClick={this.nextClicked}>Next</button>
            </div>
        </>
    )
  }
}
