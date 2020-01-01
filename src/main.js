const moment = window.moment;
const main = document.querySelector('main')
const {articles} = {
  status: "ok",
  totalResults: 38,
  articles: [{
    "source": {
      "id": null,
      "name": "Parismatch.com"
    },
    "author": "Paris Match",
    "title": "Jim Acosta : \"Le jour où je deviens l'ennemi numéro 1 de Trump\" - Paris Match",
    "description": "7 novembre 2018. Lors d’une conférence de presse à la Maison-Blanche, je pose à Donald Trump une question qui le fâche. Et qui mènera à la suspe...",
    "url": "https://www.parismatch.com/Actu/International/Jim-Acosta-Le-jour-ou-je-deviens-l-ennemi-numero-1-de-Trump-1666605",
    "urlToImage": "https://resize-parismatch.lanmedia.fr/r/940,628/img/var/news/storage/images/paris-match/actu/international/jim-acosta-le-jour-ou-je-deviens-l-ennemi-numero-1-de-trump-1666605/27177794-1-fre-FR/Jim-Acosta-Le-jour-ou-je-deviens-l-ennemi-numero-1-de-Trump.jpg",
    "publishedAt": "2019-12-29T07:00:00Z",
    "content": "7 novembre 2018. Lors dune conference de presse a la Maison-Blanche, je pose a Donald Trump une question qui le fâche. Et qui mènera à la suspension de mon accréditation. Nous sommes au lendemain des elections de mi-mandat. Donald Trump repond aux questions l… [+3488 chars]"
  }, {
    "source": {
      "id": "le-monde",
      "name": "Le Monde"
    },
    "author": "Jean-François Bayart, Béatrice Hibou",
    "title": "« Les chercheurs français détenus en Iran sont voués à une incarcération sans fin » - Le Monde",
    "description": "Incarcérée depuis juin à Téhéran, la chercheuse franco-iranienne Fariba Adelkhah a entamé le 25 décembre une grève de la faim. Jean-François Bayart et Béatrice Hibou, piliers de son comité de soutien, lancent un cri d’alarme dans une tribune au « Monde ».",
    "url": "https://www.lemonde.fr/idees/article/2019/12/26/iran-l-universitaire-fariba-adelkhah-se-condamne-a-une-mort-atroce_6024102_3232.html",
    "urlToImage": "https://img.lemde.fr/2019/12/26/576/0/1391/692/1440/720/60/0/36216fc_QauoStxY2ZWk0tNG5DtYidCJ.jpg",
    "publishedAt": "2019-12-26T10:49:47Z",
    "content": "« Nous sommes conscients des démarches inlassables du gouvernement français pour obtenir la libération de ses deux ressortissants. Mais il y a maintenant une obligation de résultat » (photo : Fariba Adelkhah en 2012). THOMAS ARRIVE / AFP\r\nTribune. Fariba Adel… [+3353 chars]"
  }]
}

window.addEventListener('load', async () => {
  main.innerHTML = await _getLatestNews()
})

function _getLatestNews() {
  return _fetchLatestArticles()
  .then(_wrapArticlesInTemplate)
  .then(_formatOutput)
}

function _fetchLatestArticles(fromNetwork = false) {
  if (fromNetwork) {
    return fetch('https://newsapi.org/v2/top-headlines?country=fr&apiKey=e75a7ea3276d43db8c255d452b7b46ba')
    .then(response => response.json())
  }
  return Promise.resolve(articles)
}

function _wrapArticlesInTemplate(articles) {
  return articles.map(_toHtml)
}

function _formatOutput(output) {
  return output.join('\n')
}

function _toHtml(article) {
  const dateFromNow = new moment(article.publishedAt).fromNow()
  return `<article class="article-container">
  <a href="${article.url}">
    <figure>
      <div class="article-preview-image">
          <img src="https://source.unsplash.com/1600x900/?news" alt="">
      </div>
    </figure>
    <div class="teaser">
      <div class="teaser-headline">&raquo; ${article.source.name}</div>
      <div class="teaser-title"><h3>${article.title}</h3></div>
      <div class="teaser-summary">${article.description}</div>
    </div>
    <div class="footer">
      <div class="footer-item">${dateFromNow}</div>
      <div class="footer-item">•</div>
      <div class="footer-item">par : ${article.author}</div>
    </div>  
  </a>
  </article>`
}
