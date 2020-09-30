import Link from 'next/link'
import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    Spinner,
    Container
} from 'react-bootstrap'

const NewNote = () => {
    const [form, setForm] = useState({title: '', description: ''})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        console.log('useEffect');
        // Run for Errors
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                // console.log('check to success');
                createNote(); //http request to API
                // alert('Create note successfully!');
            } else {
                setIsSubmitting(false);
            }
        }   
    }, [errors])

    const createNote = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/notes`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = 'Title is required!';
        }
        if (!form.description) {
            err.description = 'Description is required!'
        }

        return err;
    }

    return (
        <Container>
            <h1>Create Message</h1>
            <div>
                {
                    isSubmitting 
                    ? <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    : <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="title.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                type="text" 
                                placeholder="New Note"
                                name="title"
                                onChange={handleChange} 
                            />
                            {
                              errors.title 
                                  ? <p className="error">{errors.title}</p> 
                                  : null 
                            }
                        </Form.Group>
                        <Form.Group controlId="description.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                required
                                as="textarea" 
                                placeholder="you are awesome"
                                name="description"
                                onChange={handleChange} 
                            />
                            {
                              errors.description 
                                  ? <p className="error">{errors.description}</p> 
                                  : null 
                            }
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                }
            </div>
        </Container>
    )
}

export default NewNote