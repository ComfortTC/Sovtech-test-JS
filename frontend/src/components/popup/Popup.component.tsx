import React, { Suspense, useEffect } from 'react';
import CSS from 'csstype'
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-apollo-hooks';

// import {RootStore} from '../../Store'
import { GET_RANDOM_JOKE } from '../../GraphQL/Queries';
import { RootStore } from '../../Store';
import { GetRandomJokeAction } from '../../actions/GetRandomJoke.action';
import SingleJoke from '../single-joke/SingleJoke.component';
import { TogglePopup } from '../../actions/TogglePopup.action';

import {ReactComponent as Spinner} from '../../assets/spinner.svg'


interface PopupComponentI{
    category : string | undefined
}

async function getJoke(){

}
const PopupComponent =  ({ category}: PopupComponentI)=> {

    const dispatch = useDispatch();
    const popupState = useSelector((state:RootStore)=>state.popup)
    const {data, error, loading} =  useQuery(GET_RANDOM_JOKE, {
        variables: {category},
        suspend:true
    })  
    // const [joke, setJoke] = useState()
    const jokeState = useSelector((state: RootStore)=>state.joke)

    

    useEffect(()=>{
        // setJoke(data)
        console.log(data, "before dispatch")
        
        if(data){
            const payload = {
                icon_url:data.randomeJoke.icon_url,
                value: data.randomeJoke.value
            }
            console.log(payload, 'Action Trigger')
            dispatch(GetRandomJokeAction(payload))
        }
        

    },[data])

    function handleClick(e:any){
        e.stopPropagation()
        // debugger
        dispatch(TogglePopup(popupState.isOpen))
    }

    return (
        <div style={style.root} onClick={handleClick} className ='popup-root'>
            <div style={style.placer} className='popup-placer'>
                <Suspense fallback={<Spinner />}>
                <SingleJoke value={jokeState.value} icon_url={jokeState.icon_url} />

                </Suspense>

            </div>

        </div>
    )
}



const rootStyle: CSS.Properties = {
    width:'100vw',
    height: '100%',
    position:'absolute',
    top: 0,
    left: 0,
    background:'#131313cf',
    display: 'flex',
    justifyContent: "center",
    alignContent: "center",

}
const placer: CSS.Properties = {
    position:'relative',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",

}
const style = {

    root: rootStyle,
    placer:placer

}




export default PopupComponent