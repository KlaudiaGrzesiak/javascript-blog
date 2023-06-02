'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);


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
  optArticleTagsSelector = '.post-tags .list',
  optActiveTagsSelector = 'a.active[href^="#tag-"]',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list';


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
    console.log(articleTitle);
    
    /* [done] create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

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

  /*[NEW] create a new variable allTags with an empty array */
  let allTags = [];

  /* [done] New task - find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [done] START LOOP: for every article: */

  for (let article of articles) {

    /* [done] find tags wrapper */

    const tagsList = article.querySelector(optArticleTagsSelector);

    /* [done] make html variable with empty string */

    let html ='';
    tagsList.innerHTML = '';

    /* [done] get tags from data-tags attribute */
  
    const articleTags = article.getAttribute('data-tags');

    /* [done] split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* [done] START LOOP: for each tag */

    for (let tag of articleTagsArray){

      /* generate HTML of the link */
  
      const linkHTMLData = {id: tag, tagName: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */

      html = html + ' ' + linkHTML;


      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)) {
        
        /* add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join('');
  console.log(allTags);
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for(let activeTagLink of activeTagLinks){

    /* remove class active */

    activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for( let tagLink of tagLinks){

    /* add class active */

    tagLink.classList.add('active');  

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  
  generateTitleLinks('[data-tags~="' + tag + '"]');
}



function addClickListenersToTags(){
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for(let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags(); 

function generateAuthors(){

  /* variable AllAuthors  */
  let allAuthorsList = {};

  /*find all articles*/
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* start loop for all articles*/
  for (let article of articles) {

    /*find authors wrapper */
    const authorWrapper = article.querySelector(select.article.author);
    console.log(authorWrapper);

    let html = '';

    /* get tags from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    /*genereate html links */
    const linkHTMLData = {id: articleAuthor, title: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);

    html = html + linkHTML;
    console.log(html);
    if (!allAuthorsList.hasOwnProperty(articleAuthor)) {
      allAuthorsList[articleAuthor] = 1;
    } else {
      allAuthorsList[articleAuthor]++;
    }
    authorWrapper.innerHTML = html;
  }



  const authorList = document.querySelector(select.listOf.authors);
  /* [NEW] create variable for all links HTML code */
  //let authorListHTML = '';
  const allAuthorsData = {authors: []};

  for (let author in allAuthorsList) {
  //authorListHTML += '<li><a href="#author-' + author + '"><span>' + author + ' (' + allAuthorsList[author] + ')</span></a></li>';
    allAuthorsData.authors.push({
      author: author,
      count: allAuthorsList[author],
    });
  }
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData); //authorList.innerHTML = authorListHTML;

  console.log(authorList);
}

generateAuthors();

//authorClickHandler - the function is the same as tagClickHandler function

function authorClickHandler(event) {

  event.preventDefault();

  const clickedElement = this;

  /* [done] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [done] make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-' ,'');
  console.log(author);

  /* [done] find all author links with class active */
  const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* [done] START LOOP: for each active author link */
  for (let authorActiveLink of authorActiveLinks) {
    authorActiveLink.classList.remove(select.all.class.active);
  }

  /* [done] find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [done] START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    authorLink.classList.add(select.all.class.active);
  }

  /* [done] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {

  /* [done] find all links to author */
  const allAuthorLinks = document.querySelectorAll(select.all.linksTo.authors);

  /* [done] START LOOP: for each link */
  for (let allAuhorLink of allAuthorLinks ) {
  /* [done] add tagClickHandler as event listener for that link */
    allAuhorLink.addEventListener('click', authorClickHandler);
  /* [done] END LOOP: for each link */
  }
}

addClickListenersToAuthors();