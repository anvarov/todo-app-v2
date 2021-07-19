import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { AiOutlineSearch } from 'react-icons/ai'
import { useFormik } from 'formik'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import * as Yup from 'yup'

function SearchInput({ filters, setFilters }) {
    const formik = useFormik({
        initialValues: {
            status: 0,
            startDate: new Date().toISOString().slice(0, 10),
            endDate: new Date().toISOString().slice(0, 10),
            searchTerm: ''
        },
        validationSchema: Yup.object({
            startDate: Yup.date().required().max(Yup.ref('endDate', 'start date cannot be higher than end date')),
            endDate: Yup.date().required().min(Yup.ref('startDate', 'end date cannot be lower than end date'))

        }),
        onSubmit: ({status, endDate, startDate}) => {
            setFilters({status, endDate, startDate})
            // showFilters(false)
        } 
    })
    const [isFiltersShown, showFilters] = React.useState(false)
    return (

        <>

            <InputGroup>
                <FormControl placeholder='Search for todos'
                    aria-label='search-todos'
                    type='text'
                    value={formik.values.searchTerm}
                    name='searchTerm'
                    onChange={formik.handleChange}
                />
                {/* <InputGroup.Text id='searchIcon'> */}
                <Button variant='outline-secondary' onClick={() => showFilters(state => !state)}>Filters</Button>
                <Button variant='outline-primary' as='span'>
                    <AiOutlineSearch />

                </Button>
                {/* </InputGroup.Text> */}

            </InputGroup>
            <Form>
                {isFiltersShown ? (
                    <Row className='mt-3'>
                        <Col xs={4}>
                            <Form.Group>

                                <Form.Label>Status</Form.Label>
                                <Form.Select>
                                    <option value={0}>Active</option>
                                    <option value={100}>Completed</option>
                                </Form.Select>

                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <Form.Group>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    name='startDate'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type='date'
                                    value={formik.values.startDate} />
                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <Form.Group>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    name='endDate'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type='date'
                                    value={formik.values.endDate} />
                            </Form.Group>
                        </Col>
                        <Col xs className='mt-3'>

                            {formik.errors.endDate && formik.touched.endDate ?
                                <Alert variant={'danger'}>{formik.errors.endDate}</Alert> : null
                            }
                            {formik.errors.startDate && formik.touched.startDate ?
                                <Alert variant={'danger'}>{formik.errors.startDate}</Alert> : null
                            }
                        </Col>

                        <Col xs={12} className={'d-flex justify-content-end'}>
                            <Button className='m-1' variant='outline-primary' onClick={() => formik.handleSubmit(formik.values)}>Apply</Button>
                            <Button className='m-1' variant='outline-danger' onClick={() => showFilters(false)}>Cancel</Button>
                        </Col>

                    </Row>


                ) : null}
            </Form>
        </>
    )
}

export default SearchInput
