document.getElementById('myForm').addEventListener('submit',saveBookMark)

function saveBookMark(e){
    e.preventDefault()
   
    var siteName = document.getElementById('siteName').value
    var siteURL = document.getElementById('siteUrl').value

    var bookMark = {
        name : siteName,
        url : siteURL
    }

    if(!ValidateForm(siteName,siteURL)){
        return false
    }

    /*
    localStorage.setItem('test','hello world')
    console.log(localStorage.getItem('test'))
    localStorage.removeItem('test')
    console.log(localStorage.getItem('test'))
    */

if(localStorage.getItem('bookmarks')=== null){
    var bookmarks  =[]
    bookmarks.push(bookMark)

    localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
}else{
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
bookmarks.push(bookMark)
localStorage.setItem('bookmarks',JSON.stringify(bookmarks))

}  
document.getElementById('myForm').reset()



GetBookMarks()

  
}
  
  function DeleteBookmark(URL){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    
    for(var i = 0;i< bookmarks.length;i++ ){
         if(bookmarks[i].url== URL){
            bookmarks.splice(i,1)
         }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    GetBookMarks()

}


function GetBookMarks(){ 
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    var bookmarksResults = document.getElementById('bookmarksResults')

    

    bookmarksResults.innerHTML = ''
    for(var i =0 ;i < bookmarks.length;i++){
   

       var name = bookmarks[i].name
        var URL= bookmarks[i].url
        bookmarksResults.innerHTML+='<div class="well">'+
                                                        '<h3>'+name+
                                                        '   <a class="btn btn-warning" target ="blank" href="'+URL+'">Visit</a>'+
                                                        '   <a onclick="DeleteBookmark(\''+URL+'\')" class="btn btn-danger" href="#">Delete</a>'+                                                                         
                                                        '</h3>'
                                                        '</div> '
    }
 document.getElementById('siteName').innerHTML = ''
    
}

function ValidateForm(siteName,siteURL){
    
    if(!siteName||!siteURL ){
        alert('Please Fill In the Input Spaces')
return false
    }
    
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
     var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
alert('Please Use A Valid URL')
return false
    }
    return true
}