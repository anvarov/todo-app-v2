import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {FaSpinner} from 'react-icons/fa'
import styles from './FullPageSpinner.module.css'
import ErrorFallback from './ErrorFallback'

function FullPageSpinner() {
    return (
        <Row className={styles.row}>
            <Col xs={2}>
                <p className='d-inline-block' style={{transform: 'scale(2)'}}>
                <FaSpinner  className={styles.spinner} />
                </p>
                {/* <ErrorFallback /> */}
            </Col>
        </Row>
    )
}

export default FullPageSpinner
