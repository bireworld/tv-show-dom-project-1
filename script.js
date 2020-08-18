//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
//search the content
function search(){

}
//this function return the episodecode
function episodeCode(sNo,epNo){
  //convert sno
    if(sNo>10){
      sNo="S"+sNo.toString();
    }
    else{
      sNo="S0"+sNo;
    }
  //convert epNo
    if(epNo>10){
      epNo="E"+epNo.toString();
    }
    else{
      epNo="E0"+epNo;
    }
    return sNo+epNo;
}
//automatically display content on loading
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
 for(i=0;i<episodeList.length;i++){
    episodeContainer=document.createElement("div");
    //create html elements;
    heading=document.createElement("h4");
    image=document.createElement("img");
    description=document.createElement("p");
    //assign classes to html elements
    episodeContainer.classList.add("episode-container");
    heading.classList.add("episode-title");
    image.classList.add("episode-img");
    description.classList.add("episode-description");
    //putting contents in html elements
    heading.textContent=episodeList[i].name;
    image.src=episodeList[i].image.medium;
    description.innerHTML=episodeList[i].summary;
    //making episode code number
    let sNo=episodeList[i].season;
    let epN0=episodeList[i].number
    let episodeCodeNumber=episodeCode(sNo,epN0);
    //adjust html elements in document
    heading.textContent+="-"+episodeCodeNumber;
    episodeContainer.appendChild(heading);
    episodeContainer.appendChild(image);
    episodeContainer.appendChild(description);
    rootElem.appendChild(episodeContainer);
    container.appendChild(rootElem);
 }
  
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
