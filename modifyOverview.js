module.exports=function(database){
var output="";

for(var i=0;i<database.length;i++){

 var card=`<figure class="card">
  <div class="card__emoji">${database[i].image}</div>
  <div class="card__title-box">
    <h2 class="card__title">${database[i].productName}</h2>
  </div>
  <div class="card__details">
  <div class="card__detail-box">
    <h6 class="card__detail card__detail--organic">${database[i].organic==true?"Organic!":""}</h6>
  </div>
  <div class="card__details">
    <div class="card__detail-box">
      <h6 class="card__detail">${database[i].quantity} per 📦</h6>
    </div>

    <div class="card__detail-box">
      <h6 class="card__detail card__detail--price">${database[i].price} </h6>
    </div>
  </div>

  <a class="card__link" href="#">
    <span>Detail <i class="emoji-right">👉</i></span>
  </a>
</figure>`
output+=card;
}
return output;
}
