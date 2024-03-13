
export async function create_semi_wallet  () {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "M1S8rBLftYC6xhMu");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "password": "Qwerrty@z2"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://api.shyft.to/sol/v1/semi_wallet/create", requestOptions)
    .then(response => {
        console.log(response)
        response.text()
    })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

}

export async function get_semi_wallet (apikey , adress) {

  var myHeaders = new Headers();
myHeaders.append("x-api-key", apikey);
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://api.shyft.to/sol/v1/nft/read_all?network=devnet&address=${adress}`, requestOptions)
  .then(response =>response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
export default {create_semi_wallet , get_semi_wallet};