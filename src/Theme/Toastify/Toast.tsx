import { Cancel, CheckCircle, Error } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import styles from './toast.module.css'
import React, { useCallback } from 'react'
import { lightBlue } from '@mui/material/colors'

const Toast = ({listToast, position, setList}:{listToast:any,position:any, setList:any}) => {
    const handleDeleteToast = useCallback((id: any) => {
        console.log("id: ",id)
        const toastListItem = listToast.filter((e: { id: any }) => e.id !== id)
        setList(toastListItem);
    },[listToast, setList])
  return (
    <div className={`${styles.container} ${styles[position]}`}>
        {
            listToast.map((toast:any, index:number)=>(
            <div className={`${styles.notification} ${styles.toast} ${styles[position]} `} key={index} style={{backgroundColor:toast.backgroundColor}}>
                <button
                  style={{color: `${toast.id === 1?'#5cb85c':'#d9534f' }` }}
                  onClick={()=> handleDeleteToast(toast.id)}>X</button>
                <div className={styles.contentToast}>
                    <p className={styles.title}>
                        {
                            toast.id === 1 ? <CheckCircle sx={{size:'14px', color:'#5cb85c',marginRight:'10px',marginBottom:'3px'}}/> :
                             <Error sx={{size:'14px',color:'#d9534f',marginRight:'10px',marginBottom:'3px'}}/>
                        }
                        
                        {toast.title}
                    </p>
                    <p className={styles.description}>{toast.description}</p>
                </div>

                <p className={styles.progressBar} style={{ width: `${toast.progress}%`, backgroundColor: `${toast.id === 1?'#5cb85c':'#d9534f' }` }}></p>
    
            </div>
            ))
        }
    </div>
  )
}

export default Toast