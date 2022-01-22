/* 
                                            API vs SSR
        API- JSON                                                               SSR- Template
        Send data                                                               Send template
        res.json()                                                              res.render()    
        In Express, when we use api, we mean http iterfaces with data.          Here we setup template and send entire 
                                                                                html, css and javascript 

        Data is send in the form JSON and will be send by res.json().           We will do this with the help of res.render()
        res.json() will help in setting up proper content-type 
        and stringify our data

    Note: Cover complex Express topics using one the above methods. We will be making API responses using advance Express
    setup. We use API method because it is easy to use and does not cause extra overhead like Templates
    If you know API method then it is easy to switch to Server Side Rendering as most of the concepts remain same
*/