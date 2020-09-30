import React from 'react'
import Layout from '../components/Layout'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { useFetchUser } from '../utils/user'

const Profile = () => {
    const { user, loading = false } = useFetchUser();

    return (
        <div className="main__profile" user={user} loading={loading} >
            <div className="container">
                <h1>Profile</h1>
                {loading && <Spinner animation="border" /> }

                {!loading && user && (
                    <>
                    <Container>
                        <Row>
                            <Col>
                                <p>Profile</p>
                                <pre>{JSON.stringify(user, null, 2)}</pre>
                            </Col>
                        </Row>
                    </Container>
                    </>
                )}
            </div>
        </div>
    )
}

export default Profile