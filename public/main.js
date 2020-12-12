
// console.log('main.js加载成功')

const  getCSS = document.querySelector("#getCSS");
getCSS.onclick = ()=>{
    const  requst = new XMLHttpRequest()
    requst.open('GET','/style.css');
    requst.onload = ()=>{
        console.log('成功了'+requst.response)
        const  styleEle =document.createElement('style')
        styleEle.innerHTML = requst.response;
        document.head.append(styleEle);
    }
    requst.onerror = ()=>{
        console.log('失败了')
    }
    requst.send();
}

const  getJS = document.querySelector("#getJS");
getJS.onclick = ()=>{
    const  requst = new XMLHttpRequest()
    requst.open('GET','/2.js');
    requst.onload = ()=>{
        console.log('成功了'+requst.response)
        const  scriptEle =document.createElement('script')
        scriptEle.innerHTML = requst.response;
        document.body.append(scriptEle);
    }
    requst.onerror = ()=>{
        console.log('失败了')
    }
    requst.send();
}

const  getHTML = document.querySelector("#getHTML");
getHTML.onclick = ()=>{
   const  request = new XMLHttpRequest();
   request.open("GET","/3.html");
   request.onload = ()=>{
       console.log("3.html加载成功")
     const divEle= document.createElement('div')
       divEle.innerHTML = request.response;
       document.body.append(divEle);
   }

   request.onerror = ()=>{//onerror并不能很好的兼容ajax，因为onerror在ajax之前出现，
       // 所以实际开发不适合用onload 和onerror ,用onreadyStateChange事件
       console.log("3.html加载失败")
   }
   request.send()
}

const  getXML = document.querySelector("#getXML");
getXML.onclick = ()=>{
    const  request = new XMLHttpRequest();
    request.open("GET","/4.xml");
    request.onreadystatechange = () =>{
        console.log(request.readyState);
        if (request.readyState ==4){//0,创建request对象； 1，open阶段；2，request.send()阶段；
            // 3，加载一个字完成之后；4加载完成
            if (request.status >= 200 && request.status <300){//加载内容成功，而不是404或者505啥的
                console.log(request.responseXML);
                 const  dom = request.responseXML;
                 const text =dom.getElementsByTagName('warning')[0].textContent;
                 console.log(text.trim());
            }
            else {
                alert("加载json失败")
            }

        }
    }
    request.send()
}

const  getJSON = document.querySelector("#getJSON");
getJSON.onclick = ()=>{
    const  request = new XMLHttpRequest();
    request.open('GET','/5.json')
    request.onreadystatechange = ()=>{
        if (request.readyState ==4){
            if (request.status >=200 &&request .status < 300){
                const obj = JSON.parse(request.response);//window.JSON是全局变量，一般需要try/catch;json有6中数据类型
                myName.textContent = obj.name;
            }else {
                alert("加载json失败")
            }
        }
    }
    request.send();

}

const  getPage = document.querySelector("#getPage");
let n =1;
getPage.onclick = ()=>{
    const  request = new XMLHttpRequest();
    request.open('GET',`/page${n+1}`);
    request.onreadystatechange = ()=>{
        if (request.readyState ==4){
            if (request.status >=200 &&request .status < 300){
                const arry = JSON.parse(request.response);//window.JSON是全局变量，一般需要try/catch;json有6中数据类型
               arry.forEach(item => {
                   const  liEle = document.createElement('li');
                   liEle.textContent = item.id;
                   xxx.append(liEle);
               })
                n+=1;
            }else {
                alert(`加载json${n+1}失败`)
            }
        }
    }
    request.send();

}