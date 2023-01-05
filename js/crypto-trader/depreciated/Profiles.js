import React from 'react'
import {useDispatch} from 'react-redux'

export const UserComponent = ({user_id}) => {
    const dispatch = useDispatch()
    return <div>{dispatch({type: 'SIGN_IN', user_id: user_id})}</div>
}