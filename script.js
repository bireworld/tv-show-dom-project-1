//You can edit ALL of the code here
//Global Variable
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root-grid");
const searchCont=document.getElementById("search");

//*******************8loading time function
function setup() {
  makePageForEpisodes(allEpisodes);
}
//**************this function return the episodecode
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
//******************function display episode */
function display(name,img,summary,season,number){
       //create html elements;
       episodeContainer=document.createElement("div");
       searchContainer=document.createElement("div");
       heading=document.createElement("h4");
       image=document.createElement("img");
       description=document.createElement("p");
     
       //assign classes to html elements
       episodeContainer.classList.add("episode-container");
       heading.classList.add("episode-title");
       image.classList.add("episode-img");
       description.classList.add("episode-description");
     //
       //putting contents in html elements
       heading.textContent=name;
       image.src=img;
       description.innerHTML=summary;
       //making episode code number
       let sNo=season;
       let epN0=number;
       let episodeCodeNumber=episodeCode(sNo,epN0);
       //adjust html elements in document
       heading.textContent+="-"+episodeCodeNumber;
       episodeContainer.appendChild(heading);
       episodeContainer.appendChild(image);
       episodeContainer.appendChild(description);
       rootElem.appendChild(episodeContainer);
}
//*******************search the content
function search(txtSearch,matchItem){
  let searchList=[];
  //console.log(txtSearch.value);
  rootElem.innerHTML="";
  for(let i=0;i<allEpisodes.length;i++){

    if((allEpisodes[i].name.toLowerCase().includes(txtSearch.value.toLowerCase()))
    ||(allEpisodes[i].summary.toLowerCase().includes(txtSearch.value.toLowerCase()))){
      searchList.push({name:allEpisodes[i].name,img:allEpisodes[i].image.medium,
        summary:allEpisodes[i].summary,season:allEpisodes[i].season,number:allEpisodes[i].number});
    }
  }
  console.log(searchList.length);
  for(let j=0;j<searchList.length;j++){
    display(searchList[j].name,searchList[j].img,searchList[j].summary,
      searchList[j].season,searchList[j].number);
  }
            
  matchItem.textContent="Displaying "+searchList.length+"/"+allEpisodes.length+" Episodes";
}

//**********automatically display content on loading
function makePageForEpisodes(episodeList) {
//create and set the html elements of searching
  let txtSearch=document.createElement("input");
  let match=document.createElement("spam");
  txtSearch.setAttribute("type","text");
  txtSearch.classList.add("txtSearch");
  searchCont.appendChild(txtSearch);
  searchCont.appendChild(match);
  txtSearch.onkeyup=function(){
    if(txtSearch.value==""){
      for(i=0;i<episodeList.length;i++){  //create html elements;
        display(episodeList[i].name,episodeList[i].image.medium,episodeList[i].summary,
          episodeList[i].season,episodeList[i].number);
      
     }
    }else{
      search(txtSearch,match);
    }
  };

  
 //by default setting of grid.all episode display

  for(i=0;i<episodeList.length;i++){  //create html elements;
    display(episodeList[i].name,episodeList[i].image.medium,episodeList[i].summary,
      episodeList[i].season,episodeList[i].number);
  
 }
 
 
}
//*************load event */
window.onload = setup;
