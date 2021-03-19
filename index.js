const express = require('express');
const bodyParser = require('body-parser');
const port=process.env.PORT||3000
const N=9;

const app=express();
app.set('view engine', 'ejs');
function isvalid(grid,r,c,num){
  for(var x=0;x<=N-1;x++){
    
    if(x!=c && grid[r][x]==num){
      console.log('r');
      return false;
    }
  }
  for(var x=0;x<=N-1;x++){
    if(x!=r && grid[x][c]==num){
      console.log('c');
      return false;
    }
 
  }
  var startRow=r-r%3;
  var startCol=c-c%3;
  for(var i=0;i<3;i++)
  {
    for(var j=0;j<3;j++){
      
      if(grid[i+startRow][j+startCol]==num)
      {if(r==i+startRow && c==j+startCol)
        {
          continue;
        }
        else{
          console.log('cir')
          return false;

        }
       
      }
    }
  }
  return true;
}

function isSafe(grid,r,c,num){
  for(var x=0;x<=N-1;x++){
    
    if( grid[r][x]==num){
      return false;
    }
  }
  for(var x=0;x<=N-1;x++){
    if(grid[x][c]==num){
      return false;
    }
 
  }
  var startRow=r-r%3;
  var startCol=c-c%3;
  for(var i=0;i<3;i++)
  {
    for(var j=0;j<3;j++){
      if(grid[i+startRow][j+startCol]==num)
      {
        return false;
      }
    }
  }
  return true;
}
function soverSuduko(grid,r,c){
  if(r==N-1 && c==N){
return true;
  }
  if(c==N)
  {
    r++;
    c=0;
  }
  if(grid[r][c]!=0){
    return soverSuduko(grid,r,c+1);

  }
  for(var num=1;num<10;num++){
    if(isSafe(grid,r,c,num)){
      grid[r][c]=num;
      if(soverSuduko(grid,r,c+1)){
        return true;
      }
    }
    // else{
    //   return false;
    // }
    grid[r][c]=0;

  }

  return false;

}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const hostname = '127.0.0.1';

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.post('/',(req,res)=>{
  

var data=req.body;


var grid=[
  [data.c1r1,data.c2r1,data.c3r1,data.c4r1,data.c5r1,data.c6r1,data.c7r1,data.c8r1,data.c9r1],
  [data.c1r2,data.c2r2,data.c3r2,data.c4r2,data.c5r2,data.c6r2,data.c7r2,data.c8r2,data.c9r2],
  [data.c1r3,data.c2r3,data.c3r3,data.c4r3,data.c5r3,data.c6r3,data.c7r3,data.c8r3,data.c9r3],
  [data.c1r4,data.c2r4,data.c3r4,data.c4r4,data.c5r4,data.c6r4,data.c7r4,data.c8r4,data.c9r4],
  [data.c1r5,data.c2r5,data.c3r5,data.c4r5,data.c5r5,data.c6r5,data.c7r5,data.c8r5,data.c9r5],
  [data.c1r6,data.c2r6,data.c3r6,data.c4r6,data.c5r6,data.c6r6,data.c7r6,data.c8r6,data.c9r6],
  [data.c1r7,data.c2r7,data.c3r7,data.c4r7,data.c5r7,data.c6r7,data.c7r7,data.c8r7,data.c9r7],
  [data.c1r8,data.c2r8,data.c3r8,data.c4r8,data.c5r8,data.c6r8,data.c7r8,data.c8r8,data.c9r8],
  [data.c1r9,data.c2r9,data.c3r9,data.c4r9,data.c5r9,data.c6r9,data.c7r9,data.c8r9,data.c9r9]
];
 
for(var i=0;i<9;i++){
  for(var j=0;j<9;j++){
    if(grid[i][j]=="")
    {grid[i][j]=0;
    }
    else{
      grid[i][j]=Number(grid[i][j]);
    }
  }
}
var f=0;
for(var i=0;i<9;i++){
  for(var j=0;j<9;j++){
  if(grid[i][j]!=0 && isvalid(grid,i,j,grid[i][j])==false)
  {console.log(grid[i][j]);
    f=1;
    break;
  }
  }
  if(f==1)
  {
    break;
  }
}

if(f==0){
  var a=soverSuduko(grid,0,0);
  console.log('valid');
  res.render('out',{a:grid});
}
else{
  console.log('invalid');
  res.render('invalid');
}

})


app.listen(port, () => {
  console.log(`Server running at ${port}`);
});