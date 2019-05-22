import React from 'react';

import '../../style/panel.scss';


interface IProps {
  children: any,
}

class Panel extends React.Component<IProps, any> {

  constructor(props) {
    super(props);
  }

  render() {
    const { className = ''} = this.props;

    return (
      <div className={`${className ? className + ' ': ''}panel`}>
        {this.props.children}
      </div>
    );
  }
}

export const PanelHeader = ({ children, right = null }) => {
  return <div className={'panel-header'}>
    <h1>{children}</h1>{right}
  </div>;
};

export const PanelFooter = ({ children, right = null }) => {
  return <div className={'panel-footer'}>
    {children}{right}
  </div>;
};

export const PanelBody = ({ children, className = '', right = null }) => {
  return <div className={`panel-body${className ? " " + className : ''}`}>
    {children}{right}
  </div>;
};

// class PanelTable extends React.Component {


//     render() {
//         const { format = [] } = this.props
//         return <div className={'panel-table'}>
//             <table>
//                 <thead>
//                     <tr>
//                         {format.map((form) => {
//                             return <td>{form.label}</td>
//                         })}
//                     </tr>
//                 </thead>
//                 <tbody>
//                 </tbody>

//             </table>
//         </div>

//     }
// }

export const PanelTable = ({ format, data, row = null, className = null, ...props }) => {
  const labels = format.map((formatItem, index) =>
    <th key={index} width={formatItem.width} {...formatItem.th}>{formatItem.label}</th>);
  const rows = data.map((dataItem, dataIndex) => {
    let rowProps = null;
    if (typeof row === 'function') {
      rowProps = row(dataIndex, dataItem);
    }
    else if (typeof row === 'object') {
      rowProps = row;
    }
    else {
      rowProps = {};
    }
    return (
      <tr key={dataIndex} {...rowProps}>
        {
          format.map(function (formatItem, index) {
            let value = '';
            if (typeof formatItem.render === 'string') {
              value = dataItem[formatItem.render];
            }
            else if (typeof formatItem.render === 'function') {
              value = formatItem.render(dataItem);
            }
            // console.log(formatItem.render, value, dataItem)
            return <td key={`${dataIndex}_${index}`} {...formatItem.td}>{value}</td>;
          })
        }
      </tr>
    );
  });
  return (
    <div className={'table-container'}>
      <table className={`u-full-width${className ? ' ' + className : ''}`} {...props}>
        <thead>
        <tr>
          {labels}
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    </div>
  );
};
export default Panel;