import React from 'react';
import Layout from '~components/layout';
import withStore from '~components/hoc/withStore';
import { Col, Container, Row } from '~components/basic/Grid';
import Button from '~components/basic/Button';
import {
  ButtonGroup, CheckboxGroup, FormDescription, FormLabel, FormStatic,
  InputGroup, RadioGroup
} from '~components/basic/Form';
import Dropdown from '~components/basic/Dropdown';
import '../../style/basic/index.scss';
import '../../style/styleDemo/index.scss';
import Alert from '~components/basic/Alert';
import Input from '~components/basic/Input';
import Select from '~components/basic/Select';
import Checkbox from '~components/basic/CheckBox';
import Radio from '~components/basic/Radio';
import ToggleBox from '~components/basic/ToggleBox';
import { Card, CardBody, CardFooter, CardHeader } from '~components/basic/Card';
import { Table, TableFilters, TableHeader, TableInformation, TablePagination } from '~components/basic/Table';
import Modal, { modalController, ModalFooter, ModalForm, ModalBody, ModalHeader } from '~components/basic/Modal';
import Textarea from '~components/basic/Textarea';

@withStore({})
class StylePage extends React.Component<any, any> {
  static getInitialProps = async function () {
    return {};
  };

  state = {
    dropdownValue: null
  };


  dropdownOptions = [
    {
      label: '옵션1',
      value: 'option1'
    },
    {
      label: '옵션2',
      value: 'option2'
    },
    {
      label: '옵션3',
      value: 'option3'
    },
    {
      label: '옵션4',
      value: 'option4'
    },
    {
      label: '옵션5',
      value: 'option5'
    },
  ];

  selectOption = [
    {
      label: '옵션1',
      value: 'option1'
    },
    {
      label: '옵션2',
      value: 'option2'
    },
    {
      label: '옵션3',
      value: 'option3'
    },
    {
      label: '옵션4',
      value: 'option4'
    },
    {
      label: '옵션5',
      value: 'option5'
    },
  ];

  tableData = [
    { idx: 1, data1: 'Neque adipiscing diam', data2: 'amet', data3: 3092 },
    { idx: 2, data1: 'Class aptent taciti', data2: 'lacinia', data3: 12930 },
    { idx: 3, data1: 'In scelerisque sem', data2: 'amet', data3: 5943 },
    { idx: 4, data1: 'Aenean lectus elit', data2: 'amet', data3: 149 },
    { idx: 5, data1: 'Quisque nisl felis, venenatis', data2: 'amet', data3: 2743 },
    { idx: 6, data1: 'neque adipiscing diam', data2: 'amet', data3: 284 },
  ];
  tableFormat = [
    {
      label: 'tortor',
      render: 'idx',
    },
    {
      label: 'sodales',
      render: 'data1',
    },
    {
      label: 'neque',
      render: 'data2'
    },
    {
      label: 'lectus',
      render: 'data3'
    },
  ];
  closeModal: void = () => {
    this.setState({
      selectedTask: null,
      taskCreateModal: false
    });
  };
  onClickOpenCreateFormButton = () => {
    this.setState({
      selectedTask: null,
      taskCreateModal: true
    });
  };

  constructor(props) {
    super(props);
    modalController(this, 'modal');
  }

  onChangeDropdownValue = (value) => {
    this.setState({
      dropdownValue: value
    });
  };

  render() {
    const { dropdownValue } = this.state;
    // const { modal } = this.state.modalState;
    return (
      <Layout>
        <section>
          <h4 className={'section-header'}>{'Grid System'}</h4>
          <div className={'section-description'}>
            {'Column은 최대 12개로 구성되어있습니다. 각 column의 너비는 상위 요소의 너비에 비례해 유동적으로 변화하며, 각 column 사이의 gutter는 30px입니다. 좁은 너비에서는 column의 너비를 적절히 확보하기 위해 2배수의 column을 사용하기를 권장합니다.'}
          </div>
          <Container>
            <Row>
              <Col size={1}><Box /></Col>
              <Col size={1}><Box /></Col>
              <Col size={1}><Box /></Col>
              <Col size={1}><Box /></Col>
              <Col size={1}><Box /></Col>
              <Col size={1}><Box /></Col>
              <Col size={1}><Box /></Col>
              <Col size={1}><Box /></Col>
              <Col size={1}><Box /></Col>
              <Col size={1}><Box /></Col>
              <Col size={1}><Box /></Col>
              <Col size={1}><Box /></Col>
            </Row>
            <Row>
              <Col size={2}><Box /></Col>
              <Col size={2}><Box /></Col>
              <Col size={2}><Box /></Col>
              <Col size={2}><Box /></Col>
              <Col size={2}><Box /></Col>
              <Col size={2}><Box /></Col>
            </Row>
            <Row>
              <Col size={3}><Box /></Col>
              <Col size={3}><Box /></Col>
              <Col size={3}><Box /></Col>
              <Col size={3}><Box /></Col>
            </Row>
            <Row>
              <Col size={4}><Box /></Col>
              <Col size={4}><Box /></Col>
              <Col size={4}><Box /></Col>
            </Row>
            <Row>
              <Col size={6}><Box /></Col>
              <Col size={6}><Box /></Col>
            </Row>
            <Row>
              <Col size={12}><Box /></Col>
            </Row>
          </Container>
        </section>
        <section>
          <h4 className={'section-header'}>{'Buttons'}</h4>
          <div className={'section-description'}>
            {'버튼은 5가지 종류가 있으며 세가지 크기로 구분합니다. 이 이외의 버튼 스타일은 사용하지 않습니다. 각 버튼의 설명을 숙지하고 목적에 맞게 사용하도록합니다.'}
          </div>
          <section>
            <h5 className={'section-subtitle'}>{'Button Default'}</h5>
            <div className={'section-description'}>
              {'가장 기본이 되는 버튼입니다 일반적인 상황에 사용합니다.'}
            </div>

            <Row>
              <Col className={'form-group'} size={6}>
                <Button>Button default</Button>
              </Col>
            </Row>
            <Row>
              <Col className={'form-group'} size={6}>
                <Button disabled>Button default</Button>
              </Col>
            </Row>
          </section>


          <section>
            <h5 className={'section-subtitle'}>{'Button Danger'}</h5>
            <div className={'section-description'}>
              {'삭제, 탈퇴 등 주의를 요하는 액션에 사용하는 버튼입니다. Normal 상태일때는 Button default와 똑같이 보이도록 하여 불필요한 주의를 끌지 않지만 hover, focus, active 상태에선 버튼이 붉게 변하며 사용자에게 경고 메시지를 전달하는 역할을 합니다.'}
            </div>

            <Row>
              <Col className={'form-group'} size={6}>
                <Button shape={'danger'}>Button danger</Button>
              </Col>
            </Row>
            <Row>
              <Col className={'form-group'} size={6}>
                <Button shape={'danger'} disabled>Button danger</Button>
              </Col>
            </Row>
          </section>
          <section>
            <h5 className={'section-subtitle'}>{'Button Primary'}</h5>
            <div className={'section-description'}>
              {'Button Default와 Button Solid의 중간정도 위계를 갖는 액션에 사용합니다. 가급적 한 페이지에서 중복하지 않고, 한 번만 사용하도록 합니다.'}
            </div>

            <Row>
              <Col className={'form-group'} size={6}>
                <Button shape={'primary'}>Button primary</Button>
              </Col>
            </Row>
            <Row>
              <Col className={'form-group'} size={6}>
                <Button shape={'primary'} disabled>Button primary</Button>
              </Col>
            </Row>
          </section>

          <section>
            <h5 className={'section-subtitle'}>{'Button Solid'}</h5>
            <div className={'section-description'}>
              {'강력한 시선의 환기 또는 해당 페이지의 키액션 등에 사용하는 버튼입니다. 한 페이지에 한 번만 쓰입니다.'}
            </div>

            <Row>
              <Col className={'form-group'} size={6}>
                <Button shape={'solid'}>Button solid</Button>
              </Col>
            </Row>
            <Row>
              <Col className={'form-group'} size={6}>
                <Button shape={'solid'} disabled>Button solid</Button>
              </Col>
            </Row>
          </section>

          <section>
            <h5 className={'section-subtitle'}>{'Button Convex'}</h5>
            <div className={'section-description'}>
              {'강력한 시선의 환기 또는 해당 페이지의 키액션 등에 사용하는 버튼입니다. 한 페이지에 한 번만 쓰입니다.'}
            </div>

            <Row>
              <Col className={'form-group'} size={6}>
                <Button shape={'convex'}>Button convex</Button>
              </Col>
            </Row>
            <Row>
              <Col className={'form-group'} size={6}>
                <Button shape={'convex'} disabled>Button convex</Button>
              </Col>
            </Row>
          </section>

          <section>
            <h5 className={'section-subtitle'}>{'Button Size'}</h5>
            <div className={'section-description'}>
              {'버튼 크기는 normal과 large가 있습니다. 일반적으로는 normal 버튼을 사용하지만, 버튼의 크기가 강조되어야할 경우엔 large 버튼을 사용합니다.'}
            </div>

            <Row>
              <Col className={'form-group'} size={6} sm={12}>
                <Button>Button defefault</Button>
              </Col>
              <Col className={'form-group'} size={6} sm={12}>
                <Button lg>Button default large</Button>
              </Col>
            </Row>
          </section>


          <section>
            <h5 className={'section-subtitle'}>{'Button Block'}</h5>
            <div className={'section-description'}>
              {'일반적인 버튼 너비는 버튼 레이블에 따라 결정됩니다. 이와 달리 column의 너비에 꽉 채운 버튼을 button block이라고 부릅니다. 관습적으로 button large와 button block은 자주 같이 사용합니다.'}
            </div>

            <Row>
              <Col className={'form-group'} size={6} sm={12}>
                <Button block>Button default</Button>
              </Col>
              <Col className={'form-group'} size={6} sm={12}>
                <Button block lg>Button default large</Button>
              </Col>
            </Row>
          </section>

          <section>
            <h5 className={'section-subtitle'}>{'Button Group'}</h5>
            <div className={'section-description'}>
              {'비슷한 액션을 하는 버튼을 모아서 group으로 만들어 사용합니다.'}
            </div>

            <Row>
              <Col className={'form-group'} size={12}>
                <ButtonGroup>
                  <Button>Button 1</Button>
                  <Button>Button 2</Button>
                  <Button>Button 3</Button>
                  <Button>Button 4</Button>
                  <Button>Button 5</Button>
                  <Button>Button 6</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </section>
        </section>
        <section>
          <h4 className={'section-header'}>{'Dropdowns'}</h4>
          <div className={'section-description'}>
            {'드롭다운은 버튼과 생김새가 거의 동일합니다 드롭다운 메뉴 간에 구분이 필요한 경우 메뉴 제목을 사용할 수 있습니다.'}
          </div>
          <section>
            <Row>
              <Col size={6}>
                <FormLabel>{'Dropdown normal'}</FormLabel>
                <Dropdown placeholder={'Dropdown'} options={this.dropdownOptions} onChange={this.onChangeDropdownValue} value={dropdownValue} />
              </Col>
              <Col size={6}>
                {/*<FormLabel>{'Dropdown withHeader'}</FormLabel>*/}
                {/*<Dropdown placeholder={'Dropdown'} options={this.dropdownOptions} onChange={this.onChangeDropdownValue} value={dropdownValue} />*/}
              </Col>
            </Row>

          </section>
        </section>
        <section>
          <h4 className={'section-header'}>{'Alerts'}</h4>
          <div className={'section-description'}>
            {'얼럿은 사용자의 행동에 피드백이 필요할 때 사용합니다. 상황에따라 Info, Success, Danger의 세가지 종류를 적절히 사용합니다.'}
          </div>
          <section>
            <Row>
              <FormLabel>{'Alert info'}</FormLabel>
              <Alert>{'Curabitur tortor. Pellentesque nibh. Aenean quam.'}</Alert>
            </Row>
            <Row>
              <FormLabel>{'Alert success'}</FormLabel>
              <Alert type={'success'}>{'Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.'}</Alert>
            </Row>
            <Row>
              <FormLabel>{'Alert info'}</FormLabel>
              <Alert type={'danger'}>{'Curabitur tortor. Pellentesque nibh. Aenean quam.\n'}</Alert>
            </Row>
          </section>
        </section>

        {/*<section>*/}
        {/*<h4 className={'section-header'}>{'Toasts'}</h4>*/}
        {/*<div className={'section-description'}>*/}
        {/*{'얼럿은 사용자의 행동에 피드백이 필요할 때 사용합니다. 상황에따라 Info, Success, Danger의 세가지 종류를 적절히 사용합니다.'}*/}
        {/*</div>*/}
        {/*<section>*/}
        {/*<Row>*/}
        {/*<FormLabel>{'Alert info'}</FormLabel>*/}
        {/*<Alert>{'Curabitur tortor. Pellentesque nibh. Aenean quam.'}</Alert>*/}
        {/*</Row>*/}
        {/*<Row>*/}
        {/*<FormLabel>{'Alert success'}</FormLabel>*/}
        {/*<Alert type={'success'}>{'Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.'}</Alert>*/}
        {/*</Row>*/}
        {/*<Row>*/}
        {/*<FormLabel>{'Alert info'}</FormLabel>*/}
        {/*<Alert type={'danger'}>{'Curabitur tortor. Pellentesque nibh. Aenean quam.\n'}</Alert>*/}
        {/*</Row>*/}
        {/*</section>*/}
        {/*</section>*/}
        <section>
          <h4 className={'section-header'}>{'Forms'}</h4>
          <section>
            <h5 className={'section-subtitle'}>{'Button Default'}</h5>
            <div className={'section-description'}>
              {'모든 입력창에 공통적으로 적용되는 기본적인 스타일입니다. 상태에 맞게 적절한 스타일을 적용해, 사용자가 현재 상태를 파악하기 쉽도록 합니다.'}
            </div>
            <Row>
              <Col size={6}>
                <FormLabel>{'normal form'}</FormLabel>
                <Input name={'normal-input'} />
              </Col>
              <Col size={6}>
                <FormLabel>{'Disabled form'}</FormLabel>
                <Input name={'normal-input'} value={'this is readonly'} disabled />
              </Col>
              <Col size={6}>
                <FormLabel>{'Form with description'}</FormLabel>
                <Input name={'normal-input'} value={'form with description'} />
                <FormDescription>
                  {'Class aptent taciti sociosqu ad litora torquent per conubia nostra'}
                </FormDescription>
              </Col>
              <Col size={6}>
                <FormLabel>{'Readyonly form'}</FormLabel>
                <Input name={'normal-input'} value={'form with readyonly'} readOnly />
              </Col>
            </Row>
          </section>


          <section>
            <h5 className={'section-subtitle'}>{'Group of Form'}</h5>
            <div className={'section-description'}>
              {'경우에 따라 폼은 버튼이나 셀렉트, 다른 폼들과 그룹으로 묶어 함께 사용할 수 있습니다.'}
            </div>
            <Row>
              <Col size={6}>
                <FormLabel>{'Form with select'}</FormLabel>
                <InputGroup>
                  <Dropdown placeholder={'Dropdown'} options={this.dropdownOptions} onChange={this.onChangeDropdownValue} value={dropdownValue} />
                  <Input name={'normal-input'} />
                </InputGroup>
              </Col>
              <Col size={6}>
                <FormLabel>{'Form with button'}</FormLabel>
                <InputGroup>
                  <Input name={'normal-input'} />
                  <Button shape={'primary'}>
                    {'button'}
                  </Button>
                </InputGroup>
              </Col>
              <Col size={6}>
                <FormLabel>{'Form with button'}</FormLabel>
                <InputGroup>
                  <Input name={'normal-input'} />
                  <Select placeholder={'Dropdown'} options={this.dropdownOptions} onChange={this.onChangeDropdownValue} value={dropdownValue} />
                  <Button shape={'solid'}>
                    {'button'}
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </section>


          <section>
            <h5 className={'section-subtitle'}>{'Date & Period Form'}</h5>
            <div className={'section-description'}>
              {'날짜 입력창입니다. 기간을 입력할 때에는 아래와 같이 시작일과 끝일의 창을 붙여 연관관계를 나타냅니다.'}
            </div>
            <Row>
              <Col size={4}>
                <FormLabel>{'Date Form'}</FormLabel>
                <Input name={'normal-input'} type={'date'} />
              </Col>
              <Col size={8}>
                <FormLabel>{'Datetime form'}</FormLabel>
                <Input name={'normal-input'} type={'datetime-local'} />
              </Col>
            </Row>
          </section>


          {/*<section>*/}
          {/*<h5 className={'section-subtitle'}>{'Form add-on'}</h5>*/}
          {/*<div className={'section-description'}>*/}
          {/*{'입력창의 앞뒤에 단위 등 고정된 텍스트를 넣고 싶을 때 아래와 add-on을 붙입니다.'}*/}
          {/*</div>*/}
          {/*<Row>*/}
          {/*<Col size={4}>*/}
          {/*<FormLabel>{'Prefix'}</FormLabel>*/}
          {/*<Input name={'normal-input'} prefix={'event'}/>*/}
          {/*</Col>*/}
          {/*<Col size={4}>*/}
          {/*<FormLabel>{'Suffix'}</FormLabel>*/}
          {/*<Input name={'normal-input'} />*/}
          {/*</Col>*/}
          {/*<Col size={4}>*/}
          {/*<FormLabel>{'Prefix & Suffix'}</FormLabel>*/}
          {/*<Input name={'normal-input'} />*/}
          {/*</Col>*/}
          {/*</Row>*/}
          {/*</section>*/}


          <section>
            <h5 className={'section-subtitle'}>{'Static Text'}</h5>
            <div className={'section-description'}>
              {'레이블과 데이터는 아래과 같이 상하배열 합니다. 데이터가 입력창 사이에 표기될 경우엔 텍스트의 위치가 입력창에 중앙정렬 되도록 레이블과의 간격을 넓힙니다.'}
            </div>
            <Row>
              <Col size={4}>
                <FormLabel>{'Static form'}</FormLabel>
                <FormStatic sm>{'Nam nec ant'}</FormStatic>
              </Col>
              <Col size={4}>
                <FormLabel>{'Static form'}</FormLabel>
                <FormStatic sm>{'029-1929-4738'}</FormStatic>
              </Col>
              <Col size={4}>
                <FormLabel>{'Static form'}</FormLabel>
                <FormStatic sm>{'2015-03-05'}</FormStatic>
              </Col>
            </Row>
            <Row>
              <Col size={4}>
                <FormLabel>{'Datetime form'}</FormLabel>
                <Input name={'normal-input'} />
              </Col>
              <Col size={4}>
                <FormLabel>{'Datetime form'}</FormLabel>
                <FormStatic>{'Litora torquent'}</FormStatic>
              </Col>
              <Col size={4}>
                <FormLabel>{'Datetime form'}</FormLabel>
                <Select placeholder={'Dropdown'} options={this.dropdownOptions} onChange={this.onChangeDropdownValue} value={dropdownValue} />
              </Col>
            </Row>
          </section>

          <section>
            <h5 className={'section-subtitle'}>{'Checkboxes & Radios'}</h5>
            <div className={'section-description'}>
              {'체크박스와 라디오버튼은 상황에 맞게 세로 정렬과 가로 정렬을 혼용해 사용합니다.'}
            </div>
            <Row>
              <Col size={6}>
                <FormLabel>{'Checkboxes'}</FormLabel>
                <CheckboxGroup align={'row'}>
                  <Checkbox label={'Integer euismod'} />
                  <Checkbox label={'Quisque cursus, metus vitae pharetra auctor'} />
                  <Checkbox label={'Morbi in dui quis est pulvinar ullamcorper'} disabled />
                </CheckboxGroup>
              </Col>
              <Col size={6}>
                <FormLabel>{'Radios'}</FormLabel>
                <RadioGroup align={'row'}>
                  <Radio name={'radio'} label={'Aenean lectus elit, fermentum non'} />
                  <Radio name={'radio'} label={'Sed aliquet risus a tortor ultrices sit amet augue'} />
                  <Radio name={'radio'} label={'Ut eu diam at pede suscipit sodales'} disabled />
                </RadioGroup>
              </Col>
            </Row>
            <Row>
              <Col size={6}>
                <FormLabel>{'Inline checkboxes'}</FormLabel>
                <CheckboxGroup>
                  <Checkbox label={'fermen'} />
                  <Checkbox label={'pulvinar'} />
                  <Checkbox label={'luctus'} disabled />
                </CheckboxGroup>
              </Col>
              <Col size={6}>
                <FormLabel>{'Inline radios'}</FormLabel>
                <RadioGroup>
                  <Radio name={'radio'} label={'aliguet'} />
                  <Radio name={'radio'} label={'quam'} />
                  <Radio name={'radio'} label={'ullamceo'} disabled />
                </RadioGroup>
              </Col>
            </Row>
          </section>

          <section>
            <h5 className={'section-subtitle'}>{'Toggle'}</h5>
            <div className={'section-description'}>
              {'토글의 원리는 체크박스와 같지만 체크박스로는 상태를 분명히 나타낼 수 없을 때 사용합니다 체크박스 대신에 남용되지 않도록 주의합니다.'}
            </div>
            <Row>
              <Col size={6}>
                <FormLabel>{'Toggle off'}</FormLabel>
                <ToggleBox />
              </Col>
              <Col size={6}>
                <FormLabel>{'Toggle on'}</FormLabel>
                <ToggleBox />
              </Col>
            </Row>
          </section>

          <section>
            <h5 className={'section-subtitle'}>{'Form Section'}</h5>
            <div className={'section-description'}>
              {'하나의 액션 버튼으로 묶이는 모든 폼은 한 카드로 묶으며 하단 액션 버튼이 sticky footer임을 유의합니다 카드 내의 레이아웃은 어떤 환경에서도 쾌적하게 보이도록 가능한한 6 column으로 배치합니다.'}
            </div>
            <Card>
              <CardHeader>
                {'Form Section Title'}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col size={6}>
                    <FormLabel>
                      {'Form 01'}
                    </FormLabel>
                    <Input block />
                  </Col>
                  <Col size={6}>
                    <FormLabel>
                      {'Form 02'}
                    </FormLabel>
                    <Input block />
                  </Col>
                  <Col size={6}>
                    <FormLabel>
                      {'Form 03'}
                    </FormLabel>
                    <Input type={'date'} block />
                  </Col>
                  <Col size={6}>
                    <FormLabel>
                      {'Form 04'}
                    </FormLabel>
                    <Checkbox label={'Integer euismod'} />
                  </Col>
                  <Col size={12}>
                    <FormLabel>
                      {'Form 05'}
                    </FormLabel>
                    <Textarea />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button>{'Cancel'}</Button>
                <Button shape={'solid'}>{'Submit'}</Button>
              </CardFooter>
            </Card>
          </section>
        </section>

        <section>
          <h5 className={'section-subtitle'}>{'Form Section'}</h5>
          <div className={'section-description'}>
            {'하나의 액션 버튼으로 묶이는 모든 폼은 한 카드로 묶으며 하단 액션 버튼이 sticky footer임을 유의합니다 카드 내의 레이아웃은 어떤 환경에서도 쾌적하게 보이도록 가능한한 6 column으로 배치합니다.'}
          </div>
          <Card>
            <TableHeader>
              {'Table title'}
            </TableHeader>
            <TableFilters>
              <InputGroup>
                <Select placeholder={'Dropdown'} options={this.dropdownOptions} onChange={this.onChangeDropdownValue} value={dropdownValue} />
                <Input />
                <Button shape={'solid'}>{'검색'}</Button>
              </InputGroup>
            </TableFilters>
            <TableInformation>
              {'Table Information'}
            </TableInformation>
            <Table data={this.tableData} format={this.tableFormat} />
            <TablePagination totalCount={12345} currentPage={67} pageSize={10} />
          </Card>
        </section>


        <section>
          <h4 className={'section-header'}>{'Modals'}</h4>
          <div className={'section-description'}>
            {'모달은 강제로 사용자 경험을 막는 특성을 이용해, 사용자의 집중을 환기시킬 때, 꼭 필요한 것을 결정하도록 할 때, 되돌릴 수 없는 결정을 경고할 때 등에 사용합니다. 불필요한 모달 사용은 사용성을 저해하므로 꼭 필요한 곳에만 사용하도록 합니다.'}
          </div>

          <section>
            <h4 className={'section-header'}>{'Modal Basic'}</h4>
            <div className={'section-description'}>
              {'기본적인 모달 스타일입니다. 모달의 제목 텍스트는 좌측정렬을 기본으로 하지만, 경우에 따라 중앙 정렬도 사용 가능합니다. 모달의 닫기 버튼은 모달 외 배경을 누르면 모달이 닫히는 기능을 암시하며, 모달 내부의 컨텐츠를 방해하지 않기 위해 모달 바깥에 있습니다. 단 디스플레이의 너비가 좁아지면 화면의 여백이 거의 사라지며 닫기 버튼도 모달 내부로 들어옵니다.'}
            </div>
          </section>
          <Button shape={'primary'} onClick={this.openModalModal}>모달열기</Button>
          {this.state.modalState.modal ?
            <Modal requestClose={this.closeModalModal}>
              <ModalForm>
                <ModalHeader>
                  {'모달 헤더'}
                </ModalHeader>
                <ModalBody>
                  {'모달 바디'}
                </ModalBody>
                <ModalFooter>
                  <Button shape={'solid'} onClick={this.closeModalModal}>{'submit'}</Button>
                </ModalFooter>
              </ModalForm>
            </Modal>
            : null}
        </section>

      </Layout>
    );
  }

}


const Box = () => {
  return <div className={'box'}>

  </div>;
};


export default StylePage;