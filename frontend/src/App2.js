const options = {
  uri: "http://www.kma.go.kr/wid/queryDFS.jsp",
  qs:{
    gridx:nx,
    gridy:ny
  }
};
request(options,function(err,response,body){
  //callback
})