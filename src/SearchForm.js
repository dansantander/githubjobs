import React from 'react';
import { Form, Col } from 'react-bootstrap';
/* eslint-disable */
function SearchForm({ params, onParamChange }) {
  return (
    <div>
      <Form>
        <Form.Row className="align-items-end">
          <Form.Group as={Col}>
            <Form.Label> Description </Form.Label>
            <Form.Control
              onChange={onParamChange}
              value={params.description}
              name="description"
              type="text"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label> Location </Form.Label>
            <Form.Control
              onChange={onParamChange}
              value={params.location}
              name="location"
              type="text"
            />
          </Form.Group>
          <Form.Group as={Col} xs="auto" className="ml-2">
            <Form.Check
              onChange={onParamChange}
              value={params.full_time}
              name="full_time"
              id="full_time"
              label="Only Full Time"
              className="mb-2"
              type="checkbox"/>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
}

export default SearchForm;
