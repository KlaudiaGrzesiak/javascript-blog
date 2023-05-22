'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');}

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active'); }

  /* [done] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* [done] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [done] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');
console.log(links);

for (let link of links) {  link.addEventListener('click', titleClickHandler);
}







/* [done] New task- Generate title links */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') {
  console.log(customSelector);

  /* [done] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [done] for each article */
  let html = '';

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

  console.log(articles, optArticleSelector + customSelector);

  for (let article of articles) {
  /* [done] get the article id */

    const articleId = article.getAttribute('id');

    /* [done] find the title element */
    /* [done] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [done] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    console.log(linkHTML);

    /* [done] insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);}
}





function generateTags() {

  /* [done]] New task - find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [done] START LOOP: for every article: */

  for (let article of articles) {

    /* [done] find tags wrapper */

  const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [done] make html variable with empty string */

  let html ='';

    /* [done] get tags from data-tags attribute */
  
  const articleTags = article.getAttribute('data-tags');

    /* [done] split tags into array */

  const articleTagsArray = articleTags.split(' ');

    /* [done] START LOOP: for each tag */

  for (let tag of articleTagsArray){

      /* generate HTML of the link */
  
  const linkHTML = '<li><a href="#' + 'tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */

  html = html + ' ' + linkHTML;

    /* END LOOP: for each tag */

  }

    /* insert HTML of all the links into the tags wrapper */

  tagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
}
}

generateTags();

