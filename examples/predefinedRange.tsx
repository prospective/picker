import React from 'react';
import type { Moment } from 'moment';
import moment from 'moment';
import RangePicker from '../src/RangePicker';
import momentGenerateConfig from '../src/generate/moment';
import zhCN from '../src/locale/zh_CN';
import '../assets/index.less';
import './common.less';

const defaultStartValue = moment('2019-09-03 05:02:03');
const defaultEndValue = moment('2019-11-28 01:02:03');

function formatDate(date: Moment | null) {
  return date ? date.format('YYYY-MM-DD HH:mm:ss') : 'null';
}

export default () => {
  const [value, setValue] = React.useState<[Moment | null, Moment | null] | null>([
    defaultStartValue,
    defaultEndValue,
  ]);

  const onChange = (newValue: [Moment | null, Moment | null] | null, formatStrings?: string[]) => {
    console.log('Change:', newValue, formatStrings);
    setValue(newValue);
  };

  const onCalendarChange = (
    newValue: [Moment | null, Moment | null] | null,
    formatStrings?: string[],
  ) => {
    console.log('Calendar Change:', newValue, formatStrings);
  };

  const sharedProps = {
    generateConfig: momentGenerateConfig,
    value,
    onChange,
    onCalendarChange,
  };

  const rangePickerRef = React.useRef<RangePicker<Moment>>(null);

  return (
    <div>
      <h2>Value: {value ? `${formatDate(value[0])} ~ ${formatDate(value[1])}` : 'null'}</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ margin: '0 8px' }}>
          <h3>Basic</h3>
          <RangePicker<Moment>
            {...sharedProps}
            value={undefined}
            locale={zhCN}
            allowClear
            ref={rangePickerRef}
            defaultValue={[moment('1990-09-03'), moment('1989-11-28')]}
            clearIcon={<span>X</span>}
            suffixIcon={<span>O</span>}
            ranges={{
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
          />
        </div>
      </div>
    </div>
  );
};
