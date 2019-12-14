import React from 'react';
import renderer from 'react-test-renderer';
import { Row,Col } from './Grid';

describe('components/basic/Grid', () => {
  test('render', () => {
    const component = renderer.create(
      <Row />,
    );
    const row = component.toJSON();
    expect(row).toMatchSnapshot();
  });});

