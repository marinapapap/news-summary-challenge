class NewsView {

  constructor(model, client) {
    this.model = model;
    this.client = client;

    this.mainContainerEl = document.querySelector('#main-container');

    document.querySelector('#search-button').addEventListener('click', () => {
      const keyWord = document.querySelector('#keyword-input').value;
      
      this.displayNewsFromSearch(keyWord);

      document.querySelector('#keyword-input').value = "";
    })

  }

  displayFrontPage() {
    document.querySelectorAll('.headline').forEach(element => {
      element.remove();
    });
    
    const allNews = this.model.getNews();

    allNews.forEach((item, i) => {
      const headline = document.createElement('div');
      headline.className = 'headline';

      const image = document.createElement('img');
      const a = document.createElement('a');

      image.src = item.fields.thumbnail;
      headline.append(image);
      image.className = 'thumbnail';

      const space = document.createElement('div');
      space.className = 'space';
      headline.append(space);

      a.setAttribute('href', allNews[i].webUrl);
      a.innerText = allNews[i].webTitle;
      a.className = 'link';
      headline.append(a);

      this.mainContainerEl.append(headline);
    });
  }

  displayNewsFromApi() {
    this.client.loadNews((newsFromApi) => {
      this.model.addNews(newsFromApi);
      this.displayFrontPage();
      console.log(this.model.getNews())
    });
  }

  displayNewsFromSearch(keyWord) {
    this.client.searchQueryResults(keyWord, (newsFromApi) => {
      this.model.addNews(newsFromApi);
      this.displayFrontPage();
      console.log(this.model.getNews())
    });
  }
}

module.exports = NewsView;