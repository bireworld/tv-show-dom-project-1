
let load=false;
let url="https://api.tvmaze.com/shows/82/episodes";
let total;
let List=[];
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
function search(txtSearch){
  let searchList=[];
  rootElem.innerHTML="";
    for(let i=0;i<List.length;i++){
      if((List[i].name.toLowerCase().includes(txtSearch.value.toLowerCase()))
      ||(List[i].summary.toLowerCase().includes(txtSearch.value.toLowerCase()))){
        searchList.push({name:List[i].name,img:List[i].image.medium,
          summary:List[i].summary,season:List[i].season,number:List[i].number});
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
  match.textContent="";
match.textContent="Displaying "+searchList.length+"/"+List.length+" Episodes";
}
//**********automatically display content by default
//******************function display episode */
function display(name,img,summary,season,number,load){
       episodeContainer=document.createElement("div");
       heading=document.createElement("h4");
       image=document.createElement("img");
       description=document.createElement("p");
       episodeContainer.classList.add("episode-container");
       heading.classList.add("episode-title");
       image.classList.add("episode-img");
       description.classList.add("episode-description");
       heading.textContent=name;
       image.src=img;
       description.innerHTML=summary;
       let sNo=season;
       let epN0=number;
       let episodeCodeNumber=episodeCode(sNo,epN0);
       heading.textContent+="-"+episodeCodeNumber;
       episodeContainer.appendChild(heading);
       episodeContainer.appendChild(image);
       episodeContainer.appendChild(description);
       rootElem.appendChild(episodeContainer);
       if(load===true){
          var option = document.createElement('option');
          option.text = option.value = episodeCodeNumber+"-"+name;
          txtSelect.add(option);
          load=false;
       }
}
//*******************search the episode */
txtSearch.addEventListener("keyup",function(){
  if(txtSearch.value===""){
    rootElem.innerHTML="";
    btnBack.remove();
     for(i=0;i<List.length;i++){  //create html elements;
       display(List[i].name,List[i].image.medium,List[i].summary,
       List[i].season,List[i].number,txtSelect);
      }  
     match.textContent="Displaying "+List.length+"/"+List.length+" Episodes";
   }else{
    btnBack.remove();
     search(txtSearch);
   }
});
//********************back to all episode */
btnBack.addEventListener("click",function(){
  rootElem.innerHTML="";
  searchCont.setAttribute("style","width:75%")
   makePageForEpisodes(List);
  btnBack.remove();
  searchCont.appendChild(txtSearch);
  searchCont.appendChild(match);
});
//*******************select the episodes */
txtSelect.addEventListener("change",function(e){
    let epName=txtSelect.value.slice(7);
    for(let obj of List){
      if(obj.name===epName){
       txtSearch.value="";
        searchCont.setAttribute("style","width:100%")
        rootElem.innerHTML="";
        display(obj.name,obj.image.medium,obj.summary,
        obj.season,obj.number);
        match.textContent="Displaying:"+obj.number+"/"+List.length+" Episodes";
        btnBack.textContent="<<";
        btnBack.setAttribute("style","width:5rem;height:3rem;font-weight:bold")
        searchCont.appendChild(btnBack);
        displayOne(32,20,1);
      }
    }
 });
//display the episodes at the loading time
function makePageForEpisodes(episodeList) {
load=true;
 List=episodeList;
  match.textContent="Displaying "+episodeList.length+"/"+episodeList.length+" Episodes";
  for(i=0;i<episodeList.length;i++){  //create html elements;
    display(episodeList[i].name,episodeList[i].image.medium,episodeList[i].summary,
    episodeList[i].season,episodeList[i].number,load);
  }
}
//*******************8loading time function
function setup() {
    url="https://api.tvmaze.com/shows/82/episodes";
    fetch(url).then(function response(res){
    
      return res.json();
    })
    .then(function data(d){
        let allEpisodes=d;
        makePageForEpisodes(allEpisodes);
     });
}

//*************load event */
window.onload = setup;
