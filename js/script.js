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
  const activeArticles = document.querySelectorAll('.posts .active');
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
  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags .list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors .list';

  /*5.4. Generowanie listy tytułów*/

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
  html = html + linkHTML;
}

  titleList.innerHTML = html;

const links = document.querySelectorAll('.titles a');
for(let link of links){
link.addEventListener('click', titleClickHandler);
}
}
generateTitleLinks();

// TAGS 

function calculateTagsParams(tags){
  const params = {max: 0, min: 999999};

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if(tags[tag] > params.max){
      params.max = tags[tag];
    }

    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass (count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;
}

function generateTags(){

  const optTagsListSelector = '.tags.list';
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find tags wrapper */

    const titleTag = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){
      console.log(tag);
      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      console.log(linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){

        /* [NEW] add tag to allTags objects */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    titleTag.innerHTML = html;
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  let allTagsHTML = '';

  /*[NEW] STARY LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /*[NEW] generate code of a link and add it to allTagsHTML */

    const tagLinkHTML = '<li><a class="'+ calculateTagClass(allTags[tag], tagsParams) +'" href="#tag-' + tag + '">' + tag + '</a></li>';
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
  }
  /*[NEW] END LOOP: for each tag in allTags */

  /*[NEW] add HTML for allTagsHTML to tagList: */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

//Clicking tags

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){

    /* remove class active */
    activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(href);
  console.log(tagLinks);

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
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();

//Authors


function generateAuthors(){
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find author wrapper */

    const titleAuthor = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */

    let html = '';

    /* get author from data-author attribute */

    const articleAuthors = article.getAttribute('data-author');
    console.log(articleAuthors);

    /* generate HTML of the link */

    const linkHTML = '<li><a href="#author-' + articleAuthors + '">' + articleAuthors + '</a></li> ';
    console.log(linkHTML);

    /* add generated code to html variable */

    html = html + linkHTML;
    console.log(html);

    /* insert HTML of all the links into the author wrapper */

    titleAuthor.innerHTML = html;

  /* END LOOP: for every article: */
  }
}


function generateAuthors(){

  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

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
  const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li> ';
  console.log(linkHTML);

/* add generated code to html variable */
  html = html + linkHTML;
  articleAuthor.innerHTML = html;

  if(!allAuthors.hasOwnProperty(author)){
    allAuthors[author] = 1;
    } else {
    allAuthors[author]++;
    }
  }


const authorsList = document.querySelector(optAuthorsListSelector);
authorsList.innerHTML = '';
let allAuthorsLinkData = {authors: []};
for(let author in allAuthors){
 allAuthorsLinkData.authors.push({
  author: author,
  count: allAuthors[author]
 });
}

authorsList.innerHTML = templates.authorsListLink(allAuthorsLinkData);
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



