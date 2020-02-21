```
interface Config {
    type: string;
    url: string;
    data?: string;
    dataType: string;
}
function ajax(config: Config): any {

    var xhr = new XMLHttpRequest();

    xhr.open(config.type, config.url+'?'+config.data, true);

    xhr.send(config.data);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {

            if (config.dataType == 'json') {
                console.log('josn')
                console.log( JSON.parse(xhr.responseText) )
            } else {
                // console.log(xhr.responseText)
            }

        }
    }
}

ajax({
    type: 'get',
    url: 'https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312',
    data: 'name=list',
    dataType: 'json'
})

```

