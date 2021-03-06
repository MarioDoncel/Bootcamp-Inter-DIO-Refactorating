import { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';

const Contatos = () => {

    const url = 'http://localhost:5000/message'
    const [message, setMessage] = useState([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [validator, setValidator] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect( () => {
        (async()=>{
            const data = await fetch(url).then((response) => response.json())
            setMessage(data);
        })()    
    }, [success])

    const sendMessage = async () => {
        setValidator(false);
        if(author.length <= 0 || content.length <= 0) return setValidator(!validator)

        const bodyForm = {
            email: author,
            message: content,
        }

        const {id} = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyForm)
            })
            .then((response) => response.json())

        if(id){
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000)
            setAuthor('');
            setContent('');
        }

       
    }

    return(
        <>
            <Grid container direction="row" xs={12}>
                <TextField id="name" label="Name" value={author} onChange={(event)=>{setAuthor(event.target.value)}} fullWidth/>
                <TextField id="message" label="Message" value={content} onChange={(event)=>{setContent(event.target.value)}} fullWidth/>
            </Grid>

            {validator && 
                <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                    <strong>Por favor preencha todos os campos!</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            {success && 
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Mensagem foi enviada</strong>
                </div>
            }

            <Button onClick={sendMessage} className="mt-2" variant="contained" color="primary">
                Sent
            </Button>

            {message.map(({id, email, message, created_at}) => {
                return(
                    <div className="card mt-2" key={id}>
                        <div className="card-body">
                            <h5 className="card-title">{email}</h5>
                            <p className="card-text">{message}</p>
                            <p className="card-text">
                                <small className="text-muted">{created_at}</small>
                            </p>
                        </div>
                    </div>
                )
            } )}
        </>
    )
}

export default Contatos;
