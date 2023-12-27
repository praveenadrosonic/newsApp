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
  pageNum:  number
}

export default class NewsComponent extends Component<{},State> {
  articles = [];
  totalPages = 0;
  constructor(props:{}){
    super(props);
    this.state = {
        articles:this.articles,
        loading:false,
        pageNum :1
    }
    this.previousClicked = this.previousClicked.bind(this);
    this.nextClicked = this.nextClicked.bind(this);
  };

  async componentDidMount(){ 
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1487053d29f9460485bf80ee29944a1b&page=${this.state.pageNum}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState( {
          articles:parsedData.articles
      })
      this.totalPages=Math.ceil((parsedData.totalResults/20))>=1?(parsedData.totalResults/20):1;
  }

  async previousClicked() {
      if(this.state.pageNum > 1) {
        this.setState( (prevState)=>({
          pageNum: prevState.pageNum - 1
        }))
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1487053d29f9460485bf80ee29944a1b&page=${this.state.pageNum-1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState( {
          articles:parsedData.articles
        })
      } 
  }

  async nextClicked(){
    if(this.totalPages > 1) {
      this.setState( (prevState)=>({
        pageNum: prevState.pageNum + 1
      }))
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1487053d29f9460485bf80ee29944a1b&page=${this.state.pageNum+1}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState( {
        articles:parsedData.articles
      })
    }
  }

  render() {
    return (
      <>
        <div className='news-component'>
          <div className="row">
            {
              this.state.articles.map((element)=>{
                  return  <div className='col-md-3 pad-2' key={element.url}>  
                      <NewsItemComponent title={element.title?(element.title).slice(0,45)+'...':""} description={element.description?element.description+'...'.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://static.toiimg.com/photo/106058358.cms"} newsUrl={element.url}/>
                  </div>
              })
            }   
          </div>
          <div className="paginationButton">
            <button type="button" disabled={this.state.pageNum>1?false:true}  className="btn btn-dark mx-4"  onClick={() => this.previousClicked()}>Previous</button>
            <button type="button" disabled={this.state.pageNum>=this.totalPages?true:false}  className="btn btn-dark"  onClick={() => this.nextClicked()}>Next</button>
          </div>
        </div>
      </>
    )
  }
}
