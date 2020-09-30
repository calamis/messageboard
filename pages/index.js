import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {
  Row,
  Container,
  Col,
  Button, 
  Card,
  Jumbotron
} from 'react-bootstrap'

const Index = ({ notes }) => {
  return (
    <div className="main__home">
     
          {notes.length === 0 
            ?
            <Container fluid>
              <Jumbotron text-center>
                <h1>Hello, Welcome to Message Board!</h1>
                <a href="/new" className="btn btn-primary">Create a Message</a>
              </Jumbotron>
            </Container> 
            : notes.map(note => {
              return (
                <Container>
                  <h1> Messages</h1>
                  <Row>
                    <Col sm  key={note._id}>
                      <Card>
                        <Card.Body>
                          <Card.Title>{note.title}</Card.Title>
                          <Card.Text>{note.description}</Card.Text>
                          <Card.Link href={`/${note._id}`} variant="secondary">View More</Card.Link>
                          <Card.Link href={`/${note._id}/edit`} variant="dark">Edit</Card.Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              )
          })}

    </div>
  )
}


Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes');
  const { data } = await res.json();

  return { notes: data };
}

export default Index
