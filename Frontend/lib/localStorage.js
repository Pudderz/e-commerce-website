export const getHistory =()=> {
    let browsingHistory = localStorage.getItem('history');
    if(browsingHistory=== null){
        console.log('history is not in storage')
        browsingHistory = [];
        localStorage.setItem('history', '[]')
    }else{
        return JSON.parse(browsingHistory); 
    }
    
    return browsingHistory;
}


export const addToHistory = (product) =>{
    console.log('Adding to history')

    //checks to see if object is empty
    if(Object.keys(product).length === 0)return;

    let browsingHistory = localStorage.getItem('history');
    let alreadyOccured = false;

    //Checks if the browsing history is null
    if(browsingHistory=== null){
        console.log('history is null')
        browsingHistory = [];
    }else{
       browsingHistory = JSON.parse(browsingHistory); 

       //if product appears in recent history remove it and add it to the front
       for(let i=0; i< browsingHistory.length; i++){
        let item = browsingHistory[i];
        if(item.id === product.id){
            browsingHistory.splice(i, 1);
            alreadyOccured = true;
        }
       }

    }
    
    console.log(browsingHistory);
    if(browsingHistory.length>=5 && typeof browsingHistory === 'object' && alreadyOccured === false ){
        browsingHistory.pop();
    }

    browsingHistory.unshift(product)
    localStorage.setItem('history', JSON.stringify(browsingHistory));

}


export const changeLightMode = (boolean) =>{
    localStorage.setItem('lightMode', boolean);
}

export const getLightMode = ()=>{
    const lightMode = localStorage.getItem('lightMode');
    if(lightMode === null){
        localStorage.setItem('lightMode', true);
        lightMode = true;
    }
    return lightMode;
}


export const loadState = () =>{
    try{
        const serializedState = localStorage.getItem("state");
        if(serializedState === null){
            return undefined
        }
        return JSON.parse(serializedState)
    } catch(err){
        console.log(err);
        return undefined;
    }
}

export const saveState = (state) =>{
    try{
        const serializedState = JSON.stringify(state); 
        
        
        localStorage.setItem("state", serializedState);

    } catch(err){
        console.log(err);
        return undefined;
    }
}