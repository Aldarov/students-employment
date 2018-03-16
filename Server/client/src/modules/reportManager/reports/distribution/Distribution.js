import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
// import './styles.scss';

const styles = () => ({
  main: {
    display: 'flex'
  },
  stretch: {
    flex: 1
  },
  center: {
    justifyContent: 'center'
  },
  flexEnd: {
    justifyContent: 'flex-end'
  }
});

@withStyles(styles)
class Distribution extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <div className={classNames(classes.stretch, classes.center)}>{'sdfsd df sd dsfsd fsd fs'}</div>
        {/* <div className='flex-end'>sdsd ddddddd: 1</div>
        <div className='stretch center'>sdsdsd dsdsdsddddd ddddddddds sssss #1</div>
        <div>{'dfffffff ssssssss ddddddd dd: '}</div>
        <div className='stretch'>
          <div className='stretch center'>
            <div>ddddddd:</div>
            <div>sss dddddd:</div>
          </div>
          <div className='stretch center'>
            <div>sss ddddddd:</div>
            <div>dddd:</div>
          </div>
        </div> */}

      </div>
    );
  }
}

Distribution.propTypes = {
  classes: PropTypes.object,
};

export default Distribution;

// export default function Distribution(props) {
//   //const {  } = props;

//   return (
//     <div className='main'>
//       <div className='stretch center'>{'ФГБОУ ВО "БУРЯТСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ"'}</div>
//       <div className='flex-end'>код протокола: 1</div>
//       <div className='stretch center'>Протокол распределения выпускников №1</div>
//       <div>{'Подразделение, специальность/направление: '}</div>
//       <div className='stretch'>
//         <div className='stretch center'>
//           <div>Год приема:</div>
//           <div>Форма обучения:</div>
//         </div>
//         <div className='stretch center'>
//           <div>Год выпуска:</div>
//           <div>Дата:</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// Distribution.propTypes = {

// };
