//You can edit ALL of the code here
//Global Variable
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root-grid");
const container=document.getElementById("container");
const searchCont=document.getElementById("search");
let txtSelect=document.createElement("select");
let txtSearch=document.createElement("input");
let match=document.createElement("spam");
let btnBack=document.createElement("button");
txtSearch.setAttribute("type","text");
txtSearch.classList.add("txtSearch");
txtSelect.classList.add("txtSelect");
searchCont.appendChild(txtSelect);
searchCont.appendChild(txtSearch);
searchCont.appendChild(match);
//*******************8loading time function
function setup() {
  makePageForEpisodes(allEpisodes);
}
//*****************************display one episode */
function displayOne(width,height,length){
  if(length===1){
    document.getElementsByClassName("episode-img")[0].setAttribute("style",`width:${width}rem;height:${height}rem`);
    document.getElementsByClassName("episode-description")[0].setAttribute("style",`width:${width}rem;height:auto`);
  }
  if(length===2){
    document.getElementsByClassName("episode-img")[0].setAttribute("style",`width:${width}rem;height:${height}rem`);
    document.getElementsByClassName("episode-description")[0].setAttribute("style",`width:${width}rem;height:auto`);

  }
}
//**************this function return the episodecode
function episodeCode(sNo,epNo){
  //convert sno
    if(sNo>=10){
      sNo="S"+sNo.toString();
    }
    else{
      sNo="S0"+sNo;
    }
  //convert epNo
    if(epNo>=10){
      epNo="E"+epNo.toString();
    }
    else{
      epNo="E0"+epNo;
    }
    return sNo+epNo;
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
  if(searchList.length>0){
    for(let j=0;j<searchList.length;j++){
      display(searchList[j].name,searchList[j].img,searchList[j].summary,
        searchList[j].season,searchList[j].number);
    }  
  } 
  if(searchList.length===1){
    displayOne(32,20,1);
  }
  if(searchList.length===2){
    displayOne(25,13,2);
  }
  
  matchItem.textContent="Displaying "+searchList.length+"/"+allEpisodes.length+" Episodes";
}
//**********automatically display content by default
//******************function display episode */
function display(name,img,summary,season,number){
       //create html elements;
       episodeContainer=document.createElement("div");
      // searchContainer=document.createElement("div");
       heading=document.createElement("h4");
       image=document.createElement("img");
       description=document.createElement("p");
       //assign classes to html elements
       episodeContainer.classList.add("episode-container");
       heading.classList.add("episode-title");
       image.classList.add("episode-img");
       description.classList.add("episode-description");
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
       //add all episode into select
       var option = document.createElement('option');
        option.text = option.value = episodeCodeNumber+"-"+name;
        txtSelect.add(option);
}
//*******************search the episode */
txtSearch.addEventListener("keyup",function(){
  if(txtSearch.value===""){
    match.innerHTML="";
    match.textContent="Displaying "+allEpisodes.length+"/"+allEpisodes.length+" Episodes";
     for(i=0;i<episodeList.length;i++){  //create html elements;
       display(episodeList[i].name,episodeList[i].image.medium,episodeList[i].summary,
       episodeList[i].season,episodeList[i].number,txtSelect);
     }    
   }else{
     search(txtSearch,match);
   }
})
//********************back to all episode */
btnBack.addEventListener("click",function(){
  rootElem.innerHTML="";
  searchCont.setAttribute("style","width:75%")
  makePageForEpisodes(allEpisodes);
  btnBack.remove();
  searchCont.appendChild(txtSearch);
  searchCont.appendChild(match);
});
//*******************select the episodes */
txtSelect.addEventListener("change",function(e){
// searchCont.remove();
  let chk=allEpisodes.filter(function(obj){
    return obj.name==txtSelect.value.slice(7);
  })
  if(chk.length>0){
    
    txtSearch.remove();
    
    searchCont.setAttribute("style","width:100%")
    rootElem.innerHTML="";
    display(chk[0].name,chk[0].image.medium,chk[0].summary,
    chk[0].season,chk[0].number);
    match.textContent="Displaying:"+chk.length+"/"+allEpisodes.length+" Episodes";
    btnBack.textContent="<<";
    btnBack.setAttribute("style","width:5rem;height:3rem;font-weight:bold")
    searchCont.appendChild(btnBack);
    displayOne(32,20,1);
  }
  
 
});

function makePageForEpisodes(episodeList) {

 //by default setting of grid.all episode display
  match.textContent="Displaying "+allEpisodes.length+"/"+allEpisodes.length+" Episodes";
  for(i=0;i<episodeList.length;i++){  //create html elements;
    display(episodeList[i].name,episodeList[i].image.medium,episodeList[i].summary,
    episodeList[i].season,episodeList[i].number);
  }
}
//*************load event */
window.onload = setup;
