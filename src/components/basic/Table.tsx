import React from 'react';
import cn from 'classnames';

const TableHeader = ({ children, className, ...props }) => {
  return <div className={cn('_table-header', className)} {...props}>
    {children}
  </div>;
};

const TableFilters = ({ children, className, ...props }) => {
  return <div className={cn('_table-filters', className)} {...props}>
    {children}
  </div>;
};

const TableInformation = ({ children, className, ...props }) => {
  return <div className={cn('_table-information', className)} {...props}>
    {children}
  </div>;
};

// const TablePagination = ({ totalCount, pageSize,currentPage, className, ...props }) => {
//   return <div className={cn('_table-pagination', className)} {...props}>
//     <span className={'page-prev'} onClick={}></span>
//     <span className={'page-number'}></span>
//     <span className={'page-next'}></span>
//   </div>;
// };
class TablePagination extends React.Component<any, any> {
  static defaultProps = {
    onClickPage:function(page){
      console.log(page)
    }
  }
  shownLength = 7;

  get pages() {
    const { totalCount, currentPage, pageSize } = this.props;

    let totalPage = Math.floor(totalCount / pageSize);
    let startPage = Math.floor(currentPage / this.shownLength) * this.shownLength + 1;
    let endPage = startPage + this.shownLength - 1;
    let prevPage = startPage - 1;
    prevPage = prevPage < 0 ? 0 : prevPage;

    let nextPage = startPage + this.shownLength;
    nextPage = nextPage > totalPage ? totalPage : nextPage;

    let shownPages = [];
    for (let targetPage = startPage; targetPage <= endPage; targetPage++) {
      shownPages.push(targetPage);
    }

    console.log(shownPages, startPage, endPage);
    // const totalPage = Math.floor(totalCount/pageSize);
    // let startPage = (currentPage - Math.floor(this.shownLength/2));
    // startPage = startPage < 0 ? 0 : startPage;
    // let endPage = startPage + this.shownLength;
    // endPage = endPage > totalPage ? endPage: endPage;

    // for(let targetPage = startPage;targetPage< endPage; targetPage++){
    //   shownPages.push(targetPage)
    // }
    //
    // let prevPage = currentPgae -1;
    // prevPage = prevPage < 0 ? 0 : prevPage;
    //
    // let nextPage = currentPgae -1;
    // nextPage = nextPage < 0 ? 0 : nextPage;

    return {
      prevPage,
      nextPage,
      shownPages
    };
  }

  onClickPage = (page) => {
    const { onClickPage, currentPage } = this.props;

    if (currentPage === page) {
      return;
    }
    onClickPage(page);
  };

  render() {
    const { totalCount, pageSize, currentPage, className, ...props } = this.props;
    const { prevPage, nextPage, shownPages } = this.pages;
    return <div className={cn('_table-pagination', className)} {...props}>
      <span className={'page-prev'} onClick={() => this.onClickPage(prevPage)}>{'Prev'}</span>
      {shownPages.map((page) => {
        return <span key={page} className={cn('page-number',{selected: currentPage === page})} onClick={() => this.onClickPage(page)}>{page}</span>;
      })}
      <span className={'page-next'} onClick={() => this.onClickPage(nextPage)}>{'Next'}</span>
    </div>;
  }
}


const Table = ({ format, data, row = null, className = null, ...props }) => {
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
    <table className={`_table-container${className ? ' ' + className : ''}`} {...props}>
      <thead>
      <tr>
        {labels}
      </tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>
  );
};


export {
  TableHeader,
  TableFilters,
  TablePagination,
  TableInformation,
  Table
};