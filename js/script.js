'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
  }

  /*[DONE] add class 'active' to the clicked link */
  
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');


  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }

  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');


  /*[DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle:', targetArticle);

  /*[DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}
/*5.4. Generowanie listy tytułów*/

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags .list';

  function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';
  for(let article of articles){


  /* get the article id */
  const articleId = article.getAttribute('id');
  console.log(articleId);

    /* find the title element */
    /* get the title from the title element */
  const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  console.log(articleTitle);

    /* create HTML of the link */
  const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
  console.log(linkHTML);

    /* insert link into titleList */
  titleList.insertAdjacentHTML('beforeEnd', linkHTML);
  html = html + linkHTML;
}

  titleList.innerHTML = html;

const links = document.querySelectorAll('.titles a');
for(let link of links){
link.addEventListener('click', titleClickHandler);
}
}
generateTitleLinks();

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /*[DONE] START LOOP: for every article: */
  for(let article of articles) {

    /*[DONE] find tags wrapper */
  const tagsList = article.querySelector(optArticleTagsSelector);

    /*[DONE] make html variable with empty string */
  let html = ' '; 

    /*[DONE] get tags from data-tags attribute */
  const articleTags = article.getAttribute('data-tags');

    /*[DONE] split tags into array */
  const articleTagsArray = articleTags.split(' ');

    /*[DONE] START LOOP: for each tag */
  for(let tag of articleTagsArray){

      /*[DONE] generate HTML of the link */
  const linkHTML = '<li><a href="#' + 'tag-' + tag + '">' + tag + '</a></li>';

      /*[DONE] add generated code to html variable */
  html = html + linkHTML;

   /* [NEW] check if this link is NOT already in allTags */
   if(!allTags.hasOwnProperty(tag)){
    /* [NEW] add tag to allTags object */
    allTags[tag] = 1;
  } else {
    allTags[tag]++;
  }
   console.log(allTags);

    /*[DONE] END LOOP: for each tag */
  }

    /*[DONE] insert HTML of all the links into the tags wrapper */

  tagsList.innerHTML = html; 

  /*[DONE] END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /*[NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /*[NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
  
  /* [NEW] generate code of a link and add it to allTagsHTML */
  //allTagsHTML += tag + ' (' + allTags[tag] + ') ';

  allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';

   //allTagsHTML += tagLinkHTML; //'<li><a href="#tag-' + tag + '"class="'+ tagLinkHTML +'">' + tag + ' ('+ allTags[tag] + ')</a></li>';

   //const allTagsHTML = '<li><a href="#tag-' + tag + '"class="'+ tagsList +'">' + tag + ' ('+ allTags[tag] + ')</a></li>';

  }
  /*[NEW] END LOOP: for each tag in allTags*/

  /*[NEW] add html from allTagsHTML to tagList */ /*TU COŚ JEST NIE TAK */
  //tagList.innerHTML = allTagsHTML;
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
  const tag = href.replace('#tag-',''); 

  /* find all tag links with class active */
  const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let tagActiveLink of tagActiveLinks){

    /* remove class active */
  tagActiveLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){

    /* add class active */
  tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */
  const tags = document.querySelectorAll('.post-tags a');

  /* START LOOP: for each link */
  for(let tag of tags){

    /* add tagClickHandler as event listener for that link */
  tag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
}
}
addClickListenersToTags();


function generateAuthors(){

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles){

/* [DONE] find authors wrapper */
  const articleAuthor = article.querySelector(optArticleAuthorSelector);
  console.log(articleAuthor);

/* [DONE] make html variable with empty string */
  let html = '';

/* get tags from data-author attribute */  
  const author = article.getAttribute('data-author');
  console.log(author);

  /* [DONE] generate HTML of the link */
  const linkHTML = '<li><a href="#' + author + '"><span>' + author + '</span></a></li>';

/* add generated code to html variable */
  html = html + linkHTML;
  articleAuthor.innerHTML = html;
  console.log(linkHTML);

    /* END LOOP: for each tag */

  }
  }
  generateAuthors();

  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
  
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
  
    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-',''); 
    console.log(author);
  
    /* find all authors links with class active */
    const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');
  
    /* START LOOP: for each active Author link */
    for(let authorActiveLink of authorActiveLinks){
  
      /* remove class active */
    authorActiveLink.classList.remove(select.all.class.active);
  
    /* END LOOP: for each active author */
    }
  
    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  
    /* START LOOP: for each found author link */
    for (let authorLink of authorLinks) {
      /* add class active */
      authorLink.classList.add(select.all.class.active);
  
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  
  }

  function addClickListenersToAuthors(){
    /* find all links to authors */
  const links = document.querySelectorAll('a[href^="#author-"]');
  
    /* START LOOP: for each link */
  for (let link of links) {
  
      /* add tagClickHandler as event listener for that link */
    

      link.addEventListener('click', authorClickHandler);

  
    /* END LOOP: for each link */
  }
  }
  addClickListenersToAuthors();



