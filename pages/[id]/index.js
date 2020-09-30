import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Spinner, Button, Modal } from 'react-bootstrap'
import { Confirm } from 'react-confirm-bootstrap'

const singleNote = ({ note }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [show, setShow] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteNote();
        }
    }, [isDeleting])

    const open = () => setShow(true);
    const close = () => setShow(false);

    const onConfirm = async () => {
        setIsDeleting(true);
        close();
    }

    const deleteNote = async () => {
        const noteID = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/notes/${noteID}`, {
                method: 'Delete'
            });
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="main__single__note">
            <div className="container text-left">
                <Link href="/"><a>Back to Board</a></Link>
            </div>
            <div className="container text-center">
                {
                    isDeleting
                    ?   <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    : <>
                        <h1>{note.title}</h1>
                        <p>{note.description}</p>
                        <Button variant="danger" type="submit" onClick={open}>Delete</Button>
                    </>
                }
                <Modal show={show} onHide={close} backdrop="static">
                    <Modal.Header>
                    <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onConfirm}>
                        Confirm
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>  
    )
}

singleNote.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`)
    const { data } = await res.json();

    return { note: data }
}

export default singleNote;   