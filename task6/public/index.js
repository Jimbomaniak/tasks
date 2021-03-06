( function() {
  console.log('start')
  let userHeader = document.getElementById('userHeader')
  let nameButton = document.getElementById('nameButton')
  let nameInput = document.getElementById('nameInput')
  let messages = document.getElementById('messages')
  let text = document.getElementById('text')
  let textSubmit = document.getElementById('textSubmit')

  let userName = 'User name';
  userHeader.innerText = userName;

  nameButton.onclick = () => {
    userName = nameInput.value || 'User name';
    userHeader.innerText = userName;
  };

  textSubmit.onclick = () => {
    let data = {
      name: userName,
      text: text.value
    };
    text.value = '';
    ajaxRequest({
      method: 'POST',
      url: '/messages',
      data: data
    })
  };

  let ajaxRequest = (options) => {
    let url = options.url || '/';
    let method = options.method || 'GET';
    let callback = options.callback || function() {};
    let data = options.data || {};
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.open(method, url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(data));

    xmlHttp.onreadystatechange = () => {
      if(xmlHttp.status == 200 && xmlHttp.readyState == 4) {
        callback(xmlHttp.responseText);
      }
    };
  };

  let getData = () => {
    ajaxRequest({
      url: '/messages',
      method: 'GET',
      callback: (msg) => {
        msg = JSON.parse(msg);
        messages.innerHTML = '';
        for(let i in msg) {
          if(msg.hasOwnProperty(i)) {
            let el = document.createElement('li');
            el.innerText = msg[i].name + ': ' + msg[i].text;
            messages.appendChild(el);
          }
        }
      }
    });
  };

  getData();

  setInterval(() => {
    getData();
  }, 1000);

})();
